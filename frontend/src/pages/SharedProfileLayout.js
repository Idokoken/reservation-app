import React, { useContext } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/userContext";

const Wrapper = styled.div`
  margin: 0;
  min-height: 50vh;

  nav {
    display: flex;
    justify-content: center;
  }
  .link {
    text-decoration: none;
    color: inherit;
  }
  .active {
    border-radius: 30px;
  }
`;

function SharedProfileLayout() {
  let location = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const { ready, user } = useContext(UserContext);

  if (!ready) {
    return "loading...";
  }
  if (ready && !user) {
    navigate("/login");
  }

  if (location === undefined) {
    location = "profile";
  }

  const linkClasses = (type = null) => {
    let classes = "py-1 px-3 link";
    if (type === location) {
      classes += " bg-primary text-white active";
    }
    // console.log(type);
    return classes;
  };
  // console.log(location);

  return (
    <Wrapper>
      <nav className="my-4 gap-2">
        <Link className={linkClasses("")} to={"/account/"}>
          Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My Accommodations
        </Link>
      </nav>

      <div className="dashboard-pages">
        <Outlet />
      </div>
    </Wrapper>
  );
}

export default SharedProfileLayout;
