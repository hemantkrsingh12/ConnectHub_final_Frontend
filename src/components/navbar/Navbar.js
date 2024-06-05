import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from "@mui/material";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setToast } from "../../redux/slices/Appconfigslice";
import { axiosClient } from "../../Utiles/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../Utiles/localStorage";
import { TOAST_SUCCESS } from "../../App";
import iconimg from "../../asset/social-media_6433685.png";
import userimg from "../../asset/user-image-with-black-background.png";

const Navbar = () => {
  const [useravatar, setuseravatar] = useState("");
  const [id, setid] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.loadingreducer.datainfo);

  useEffect(() => {
    setuseravatar(data?.avatar?.url);
    setid(data?._id);
  }, [data]);

  async function handleLogout() {
    dispatch(setLoading(true));
    try {
      const response = await axiosClient.get("/auth/logout");
      dispatch(
        setToast({
          type: TOAST_SUCCESS,
          message: response?.result,
        })
      );
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'aqua', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate("/")}>
          <Avatar src={iconimg} alt="Icon" sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{color:'black'}}>
            ConnectHub
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate(`/profile/${id}`)} sx={{ p: 0 }}>
            <Avatar src={useravatar ? useravatar : userimg} alt="User Avatar" />
          </IconButton>
          <IconButton onClick={handleLogout} color="inherit">
            <AiOutlineLogout size={25} color="black"/>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
