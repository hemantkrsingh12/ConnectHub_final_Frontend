import React, { useEffect, useRef, useState } from "react";
import iconimg from "../../asset/social-media_6433685.png";
import userimg from "../../asset/user-image-with-black-background.png";
import { AiOutlineLogout } from "react-icons/ai";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setToast } from "../../redux/slices/Appconfigslice";
import { axiosClient } from "../../Utiles/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../Utiles/localStorage";
import { TOAST_SUCCESS } from "../../App";

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

  async function topbar() {
    dispatch(setLoading(true));
    const response = await axiosClient.get("/auth/logout");
    dispatch(
      setToast({
        type: TOAST_SUCCESS,
        message: response?.result,
      })
    );
    removeItem(KEY_ACCESS_TOKEN);
    navigate("/login");
    dispatch(setLoading(false));
  }
  return (
    <div>
      <div className="navbar">
        <div className="container">
          <div
            className="left-side hover-link"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={iconimg} className="iconimg" alt="Icon" />
            <h1 className="title">ConnectHub</h1>
          </div>
          <div className="right-side">
            <img
              src={useravatar ? useravatar : userimg}
              alt="Userimg"
              className="hover-link userimg"
              onClick={() => {
                navigate(`/profile/${id}`);
              }}
            />
            <AiOutlineLogout
              className="hover-link"
              size={25}
              onClick={topbar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
