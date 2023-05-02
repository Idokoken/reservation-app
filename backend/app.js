const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

//Middleware setup
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.get("/", (req, res) => {
  console.log("Welcome to PiTravel");
});

app.listen(port, () => console.log(`Listening on port ${chalk.magenta(4000)}`));
