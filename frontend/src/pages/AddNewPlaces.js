import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { Tablet } from "../Responsive";
import Perks from "./Perks";
import PhotosUploader from "./PhotosUploader";
import axios from "axios";

const Wrapper = styled.div`
  label {
    font-weight: 500;
  }
  .photos {
    border: 2px solid black;
  }
  .img-link {
    display: grid;
    grid-template-columns: 80% 20%;
  }
  .perks {
    display: grid;
    gap: 5px;
    grid-template-columns: auto;
    ${Tablet({ gridTemplateColumns: "auto auto auto" })}
  }
  .perk-item {
    display: flex;
    border: 1px solid gray;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
  }
  .perks .icon {
    margin: 10px 0;
  }
  .check-info {
    display: flex;
    flex-direction: column;
    ${Tablet({ flexDirection: "row" })}
  }
`;

function AddNewPlaces() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/places", {
        title,
        address,
        photos,
        description,
        perks,
        checkIn,
        checkOut,
        maxGuest,
      });
      //   console.log(resp.data);
      navigate("/account/places");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper className="container">
      <Link className="btn btn-info m-2" to="/account/places">
        Back
      </Link>
      <h3 className="m-2">Add new Accommodation</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <label className="form-label my-2">Title</label>
          <p className="text-secondary">your title should be short</p>
          <input
            type="text"
            name="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
          <label className="form-label my-2">Address</label>
          <p className="text-secondary">address to this place</p>
          <input
            type="text"
            name="address"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="address"
          />
          <PhotosUploader photos={photos} setPhotos={setPhotos} />
          <br />
          <div>
            <h2>Description</h2>
            <p>Description of the place</p>
            <textarea
              className="form-control"
              rows="5"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Perks perks={perks} setPerks={setPerks} />
          </div>
          <div>
            <h2>ExtraInfo</h2>
            <p>house rules etc</p>
            <textarea
              className="form-control"
              name="extraInfo"
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              rows="5"
            />
          </div>
          <div>
            <h2>CheckIn and CheckOut times, max Guests</h2>
            <p>
              add check in and check out time, remember to have some time window
              for cleaning the room
            </p>
            <div className="check-info">
              <div className="me-2">
                <h4>Check in time</h4>
                <input
                  type="text"
                  placeholder="14:00"
                  name="checkIn"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div className="me-2">
                <h4>Check out time</h4>
                <input
                  type="text"
                  placeholder="16:00"
                  name="checkOut"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div className="me-2">
                <h4>Max number Guest</h4>
                <input
                  type="number"
                  placeholder="1.0"
                  name="maxGuest"
                  value={maxGuest}
                  onChange={(e) => setMaxGuest(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary my-3 form-control" type="submit">
            save
          </button>
        </form>
      </div>
    </Wrapper>
  );
}

export default AddNewPlaces;
