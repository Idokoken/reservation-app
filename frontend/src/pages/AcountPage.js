import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
// import { Tablet } from "../Responsive";
import { UserContext } from "../context/userContext";
import axios from "axios";

const Wrapper = styled.div`
  margin: 0;
`;

const AcountPage = () => {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  // console.log(subpage);

  // if (subpage === undefined) {
  //   subpage = "profile";
  // }

  if (ready && !user && !redirect) {
    return <Navigate to={redirect} />;
  }

  const logout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };

  return (
    <Wrapper>
      <div className="container">
        <h3 className="my-2">hello</h3>
        <div className="text-center mx-auto">
          <h5 className="my-1">
            Logged in as {user.name} ({user.email})
          </h5>
          <br />
          <button onClick={logout} className="btn btn-primary">
            Logout
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default AcountPage;
