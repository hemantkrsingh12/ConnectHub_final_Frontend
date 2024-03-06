import React from 'react'
import { KEY_ACCESS_TOKEN, getItem } from '../Utiles/localStorage'
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Requireuser = () => {
    const user = getItem(KEY_ACCESS_TOKEN);
  return (
    <div>{user ? <Outlet/> : <Navigate to="/login"/>}</div>
  )
}

export default Requireuser