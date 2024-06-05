import React, { useEffect, useState } from "react";
import "./Updateprofile.scss";
import userimg from "../../asset/user-image-with-black-background.png";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setToast, updateinfo } from "../../redux/slices/Appconfigslice";
import { axiosClient } from "../../Utiles/axiosClient";
import { useNavigate } from "react-router-dom";
import { TOAST_SUCCESS } from "../../App";
import { KEY_ACCESS_TOKEN, removeItem } from "../../Utiles/localStorage";

const UpdateProfile = () => {
  const [img, setImg] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.loadingreducer.datainfo);
  const navigate = useNavigate();

  useEffect(() => {
    setImg(data?.avatar?.url);
    setBio(data?.bio || "");
    setName(data?.name || "");
  }, [data]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === FileReader.DONE) {
        setImg(fileReader.result);
      }
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateinfo({ img, name, bio }));
    navigate('/')
  };

  const handleDeleteConfirmation = async () => {
    setShowModal(false);
    const response = await axiosClient.delete("/user/deleteprofile");
    dispatch(
      setToast({
        type: TOAST_SUCCESS,
        message: response?.result,
      })
    );
    removeItem(KEY_ACCESS_TOKEN);
    navigate("/login");
  };

  return (
    <Container component="div" className="updateprofile" sx={{ marginTop: 20 }}>
      <div className="container">
        <div className="imguser">
          <label htmlFor="avatar">
            <img src={img ? img : userimg} alt="img of user" />
          </label>
          <input
            type="file"
            id="avatar"
            hidden
            accept="image/*"
            onChange={handleImage}
          />
        </div>

        <div className="forms">
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              label="Your name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              type="text"
              label="Your Bio"
              variant="outlined"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              sx={{ mb: 2, backgroundColor: 'aqua', color: 'black' }}
            >
              Submit
            </Button>
          </form>

          <Button
            variant="contained"
            color="error"
            onClick={() => setShowModal(true)}
            fullWidth
          >
            Delete Profile
          </Button>
        </div>
      </div>

      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirmation}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowModal(false)}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UpdateProfile;
