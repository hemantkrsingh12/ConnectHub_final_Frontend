import React, { useState } from "react";
import "./Login.scss";
import { Link,useNavigate } from "react-router-dom";
import { axiosClient } from "../../Utiles/axiosClient";
import { setItem,KEY_ACCESS_TOKEN} from "../../Utiles/localStorage";
import { useDispatch } from "react-redux";
import { setToast } from "../../redux/slices/Appconfigslice";
import { TOAST_SUCCESS } from "../../App";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate= useNavigate();
const dispatch = useDispatch();
  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      dispatch(
        setToast({
          type: TOAST_SUCCESS,
          message: response?.result.message,
        })
      );
      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      navigate("/")
    } catch (error) {
      console.log("Error:", error);
    }
  }
  
  return (
    <div className="login_cont">
      <div className="login_box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handlesubmit}>
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
        Do not have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
