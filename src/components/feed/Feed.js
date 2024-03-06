import React, { useEffect, useState } from "react";
import "./Feed.scss";
import Postsdata from "../postsdata/Postsdata";
import Follower from "../follower/Follower";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { feeddata } from "../../redux/slices/FeedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const data = useSelector((state) => state.feedMedia.feedinfo);
  const [feed, setFeed] = useState();



  useEffect(() => {   
    dispatch(feeddata());   
  },[dispatch]);
  useEffect(()=>{
    setFeed(data);
  })
  return (
    <div className="feed">
      <div className="container">
        <div className="left-side">
          {feed?.posts?.map((item, id) => {
            return <Postsdata data={item} key={id} />;
          })}
        </div>

        <div className="right-side">
          <div className="top">
            <p className="heading">You can Follow</p>
            {feed?.following?.map((item, id) => {
              return <Follower data={item} key={id} />;
            })}
          </div>
          <div className="bottom">
            <p className="heading">Suggestion for You</p>
            {feed?.suggestions?.map((item, id) => {
              return <Follower data={item} key={id}/>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
