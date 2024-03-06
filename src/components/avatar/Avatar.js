import React from "react";
import userimg from "../../asset/user-image-with-black-background.png";
import "./Avatar.scss";
const Avatar = ({ imgavt }) => {
  return (
    <div className="avatar">
      <img src={imgavt ? imgavt : userimg} className="imguser" alt="" />
    </div>
  );
};

export default Avatar;
