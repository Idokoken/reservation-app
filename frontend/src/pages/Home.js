import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    border: 2px solid black;
    padding: 5px 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
  }
  nav div {
    margin-right: 5px;
    border-right: 2px solid black;
    padding-right: 5px;
  }
  .search-icon {
    color: white;
  }
  button {
    background: red;
    border-radius: 50%;
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <div className="nav">
        <div>Anywhere</div>
        <div>Any week</div>
        <div>Add Guest</div>
        <button>
          <i className="fa fa-search me-1 search-icon"></i>
        </button>
      </div>
      <Link to="/login">
        <div>
          <i className="fa fa-menu me-1"></i>
        </div>
        <button>
          <i className="fa fa-user"></i>
        </button>
      </Link>
    </Wrapper>
  );
};

export default Home;
