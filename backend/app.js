const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const download = require("image-downloader");
const User = require("./models/userModel");
const userRouter = require("./routes/userRouter");
const placesRouter = require("./routes/placesRouter");
const multer = require("multer");
const fs = require("fs");

// const { upload } = require("./configs/uploads");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

//Middleware setup
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);
app.use("/uploads", express.static(__dirname + "/uploads"));

//Database setup
mongoose.connect(process.env.MONGO_URI2, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", () => console.log(`error connecting to PiTravel database`));
db.once("open", () =>
  console.log(`successfully connected to ${chalk.magenta("PiTravel database")}`)
);

// Routes setup
app.get("/profile", (req, res) => {
  // res.json({ msg: "Welcome to PiTravel" });
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userInfo.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});
app.post("/uplaodbylink", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  try {
    await download.image({
      url: link,
      dest: `${__filename}/uploads/${newName}`,
    });
    res.json(newName);
  } catch (error) {
    console.log(error);
  }
});

const upload = multer({ dest: "uploads/" });
app.post("/upload", upload.array("photos", 100), (req, res) => {
  let uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  // console.log(uploadedFiles);
  res.json(uploadedFiles);
});
app.use("/auth", userRouter);
app.use("/places", placesRouter);

app.listen(port, () => console.log(`Listening on port ${chalk.magenta(4000)}`));
