import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Tablet } from "../Responsive";

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

const RegisterPage = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = values;
    if (!name || !email || !password) {
      console.log("enter all fields");
    }
    try {
      const resp = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
    // const user = { name, email, password };
    // console.log(user);

    // navigate("/");
  };

  useEffect(() => {}, []);
  return (
    <Wrapper>
      <div className="main">
        <div className="heading">
          <img src="/assets/brand.png" alt="brand" />
          <h4>PiTravel</h4>
        </div>
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="form-control"
            value={values.name}
            onChange={handleChange}
            placeholder="name"
          />

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
          <p>Already a member?</p>
          <NavLink className="link" to="/login">
            Login
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

export default RegisterPage;
