import React from 'react'
import { KEY_ACCESS_TOKEN, getItem } from '../Utiles/localStorage'
import Home from '../Pages/Home/Home';
import { Navigate, Outlet } from 'react-router-dom';

const StopnavigateLogin = () => {
    const token = getItem(KEY_ACCESS_TOKEN);
  return (
    token? <Navigate to="/"/> : <Outlet/>
  )
}

export default StopnavigateLogin