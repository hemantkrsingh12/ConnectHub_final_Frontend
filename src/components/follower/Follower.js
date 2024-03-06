import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import "./Follower.scss";
import { useDispatch, useSelector } from "react-redux";
import {  followunfollow } from "../../redux/slices/FeedSlice";
import { useNavigate } from "react-router-dom";

const Follower = ({ data }) => {
  const dispatch = useDispatch();
  const [following, setFollowing] = useState();
  const followdata = useSelector((state) => state.feedMedia.feedinfo);
  const navigate= useNavigate();
  const userid= data._id;
  useEffect(() => {
    setFollowing(followdata.following.find((item) => item._id === data._id));
  });
  const handlefollow = () => {
    dispatch(followunfollow({ idtofollow: data._id }));

  };
  return (
    <div className="follower" >
      <Avatar imgavt={data?.avatar?.url} onClick={()=>navigate(`/profile/${userid}`)} />
      <h4 onClick={()=>navigate(`/profile/${userid}`)}>{data?.name}</h4>
      <h5
        className={following ? "hover-link" : "hover-link btn-primary"}
        onClick={handlefollow}
      >
        {following ? "Unfollow" : "Follow"}
      </h5>
    </div>
  );
};

export default Follower;
