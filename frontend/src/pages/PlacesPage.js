import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Tablet } from "../Responsive";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 20px;

  .img-container {
    width: 400px;
    height: 400px;
  }
  img {
    height: 100%;
    width: 100%;
  }
  .items {
    background-color: grey;
    display: grid;
    grid-template-columns: 100%;
    border-radius: 20px;
    ${Tablet({ gridTemplateColumns: "30% 70%" })}
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

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
      <Wrapper>
        {places.length > 0 &&
          places.map((place, i) => (
            <Link to={`/account/places/new/${place._id}`}>
              <div className="items m-3 p-3">
                <div className="img-container">
                  {place.photos.length > 0 && (
                    <img src={place.photos[0]} alt="destination" />
                  )}
                </div>
                <div className="content">
                  <h3>{place.title}</h3>
                  <h5>{place.address}</h5>

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
              </div>
            </Link>
          ))}
      </Wrapper>
    </div>
  );
}

export default PlacesPage;
