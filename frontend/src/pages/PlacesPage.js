import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PlacesPage() {
  const [places, setPlaces] = useState([]);

  const getPlaces = async () => {
    try {
      const resp = await axios.get("/places");
      console.log(resp.data);
      setPlaces(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <div className="container">
      <Link to="/account/places/new" className="btn btn-primary my-2">
        &plus, Add new Place
      </Link>
      <div className="m-2">
        {places.length > 0 &&
          places.map((place, i) => (
            <div className="">
              <div>
                {place.photos.length > 0 && (
                  <img src={place.photos[0]} alt="destination" />
                )}
              </div>
              <div>
                <h3>{place.title}</h3>
                <h5>{place.address}</h5>
              </div>
              {/* <div>{place.photos.map((photo)) => {<div><img src={photo} alt='destination photos' /></div>}}</div> */}
              <p>{place.description}</p>
              {/* <div>place.perks.map((perk) => (<div>{perk}</div>))</div> */}
              <p className="my-2">{place.extraInfo}</p>
              <div className="checkInfo">
                <div className="checkIn">{place.checkIn}</div>
                <div className="checkOut">{place.checkOut}</div>
              </div>
              <p>{place.maxGuest}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlacesPage;
