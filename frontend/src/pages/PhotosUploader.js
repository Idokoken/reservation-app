import React, { useState } from "react";
import axios from "axios";

const PhotosUploader = ({ photos, setPhotos }) => {
  const [photoLink, setPhotoLink] = useState("");

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = axios.post("/uplaodbylink", { link: photoLink });
    setPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };

  const uploadPhotos = (e) => {
    const { files } = e.target;
    let data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((resp) => {
        const { data: filenames } = resp;
        setPhotos((prev) => {
          console.log([...prev, ...filenames]);
          return [...prev, ...filenames];
        });
        // console.log(filenames);
      })
      .catch((err) => console.log(err));
    // console.log(files);
  };
  return (
    <>
      <label className="form-label my-2">Photos</label>
      <p className="text-secondary">the more = better</p>
      <div className="img-link">
        <input
          type="text"
          name="photoLink"
          className="form-control"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          placeholder={"add using a link...jpg"}
        />
        <button className="btn btn-secondary" onClick={addPhotoByLink}>
          Add photos
        </button>
      </div>

      {photos.length > 0 &&
        photos.map((link, i) => (
          <div key={i}>
            <div className="img-container">
              <img src={`${link}`} alt="cover" />
            </div>
          </div>
        ))}

      <br />
      <label name="photos" className="btn photos my-2">
        <input
          type="file"
          multiple
          className="hidden"
          onChange={uploadPhotos}
        />
        <i className="fa fa-upload"></i> Upload
      </label>
    </>
  );
};

export default PhotosUploader;
