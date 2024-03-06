import React, { useEffect } from "react";
import { useState } from "react";
import { axiosClient } from "../../Utiles/axiosClient";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getmyinfo } from "../../redux/slices/Appconfigslice";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getmyinfo());
  }, []);
  return (
    <div> 
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Home;
