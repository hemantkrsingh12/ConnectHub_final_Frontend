import React, { useEffect, useState } from "react";
import "./Updateprofile.scss";
import userimg from "../../asset/user-image-with-black-background.png";
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
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const dispatch = useDispatch();
  const data = useSelector((state) => state.loadingreducer.datainfo);
  const navigate = useNavigate();

  useEffect(() => {
    setImg(data?.avatar?.url);
    setBio(data?.bio || " ");
    setName(data?.name || " ");
  }, [data]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === FileReader.DONE) {
        setImg(fileReader.result);
        console.log("Base64 encoded image:", fileReader.result);
      }
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateinfo({ img, name, bio }));
  };

  const handleDeleteConfirmation = async () => {
    setShowModal(false); // Close the modal
    const response = await axiosClient.delete("/user/deleteprofile");
    dispatch(
      setToast({
        type: TOAST_SUCCESS,
        message: response?.result,
      })
    );
    removeItem(KEY_ACCESS_TOKEN);
    navigate("/login");
    console.log("Clicked on the model");
  };

  return (
    <div className="updateprofile">
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
            <input
              type="text"
              placeholder="Your name"
              value={name}
              id="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />{" "}
            <br />
            <input
              type="text"
              value={bio}
              placeholder="Your Bio"
              id="bio"
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
            <button
              className="btn-primary sub-btn hover-link"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>

          <button
            className="btn-primary del-btn hover-link"
            onClick={() => setShowModal(true)}
          >
            Delete Profile
          </button>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmation</h2>
            <p>Are you sure you want to delete your account?</p>
            <div className="modal-buttons">
              <button onClick={handleDeleteConfirmation} className="yes">Yes</button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
