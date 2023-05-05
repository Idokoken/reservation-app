import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Tablet } from "../Responsive";
import { UserContext } from "../context/userContext";
import axios from "axios";

const Wrapper = styled.div`
  margin: 0;

  nav {
    display: flex;
    justify-content: center;
  }
`;

const AcountPage = () => {
  const navigate = useNavigate();
  const { ready, user } = useContext(UserContext);
  let { subpage } = useParams();
  console.log(subpage);

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "loading...";
  }
  if (ready && !user) {
    navigate("/login");
  }

  const logout = async () => {
    await axios.post("/logout");
  };

  const linkClasses = (type = null) => {
    let classes = "py-2 px-4";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  };

  return (
    <Wrapper>
      <h3> Account page for {user?.name}</h3>
      <nav className="mt-4 gap-2">
        <Link className={linkClasses("profile")} to={"/account/"}>
          Account
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My Accommodations
        </Link>
      </nav>
      <div className="">
        {subpage === "profile" && (
          <div className="text-center mx-auto">
            Logged in as {user.name} ({user.email})
            <br />
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default AcountPage;
