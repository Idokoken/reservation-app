import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Tablet } from "../Responsive";
import { UserContext } from "../context/userContext";

//css section
const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  background: rgb(198, 208, 206);

  .main {
    background: white;
    width: 80%;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    ${Tablet({ width: "60%" })}
  }
  .heading {
    display: flex;
    margin: 30px 0;
    font-family: "Rampart One", cursive;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  h2 {
    color: rgba(38, 112, 223, 1);
    font-weight: 600;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 30px;
  }
  label {
    margin-top: 15px;
  }
  label:nth-child(1) {
    margin-top: 0;
  }
  input {
    margin-bottom: 20px;
  }
  .btn {
    font-weight: 400;
    background: rgba(38, 112, 223, 1);
    color: white;
    padding: 5px;
    margin-top: 30px;
  }
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    padding: 0;
  }
  .link {
    text-decoration: none;
    color: blue;
    margin: 0;
    padding: 0;
  }
  p {
    margin: 0;
    padding: 0;
    margin-right: 5px;
  }
`;

const LoginPage = () => {
  // const location = useLocation();
  // const {message} = location.state;
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    try {
      const resp = await axios.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setValues(resp.data);
      window.location = "/";
      // navigate("/");
      console.log(resp.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
      }
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, []);

  return (
    <Wrapper>
      <div className="main">
        <div className="heading">
          <img src="/assets/brand.png" alt="brand" />
          <h4>PiTravel</h4>
        </div>
        <h2>User Login</h2>

        <form onSubmit={handleSubmit}>
          {/* {message !== "" && (
            <span className="alert alert-success">{message}</span>
          )} */}
          {error !== "" && <span className="alert alert-danger">{error}</span>}
          <input
            type="email"
            name="email"
            className="form-control"
            value={values.email}
            onChange={handleChange}
            placeholder="email"
          />

          <input
            type="password"
            name="password"
            className="form-control"
            value={values.password}
            onChange={handleChange}
            placeholder="password"
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
        <div className="login">
          <p>Not yet a member?</p>
          <NavLink className="link" to="/Register">
            Register
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginPage;
