import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../Utiles/axiosClient";
import "./Signup.scss";
import { TOAST_SUCCESS } from "../../App";
import { setToast } from "../../redux/slices/Appconfigslice";
import { useDispatch } from "react-redux";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate=useNavigate();
  const dispatch = useDispatch();
  async function handlesubmit(e) {
    e.preventDefault();
    const response = await axiosClient.post("/auth/signup", {
      name,
      email,
      password,
    });
    dispatch(
      setToast({
        type: TOAST_SUCCESS,
        message: response?.result,
      })
    );
    
if(response.status === "ok"){
    navigate("/login")
}
  }
  return (
    <div className="login_cont">
      <div className="login_box">
        <h2 className="heading">Signup</h2>
        <form onSubmit={handlesubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <input type="submit" id="submit" />
        </form>
        <p className="subheading">
          Already have an account <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
