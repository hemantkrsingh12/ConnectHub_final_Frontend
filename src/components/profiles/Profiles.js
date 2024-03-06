import React, { useEffect, useState } from "react";
import "./Profiles.scss";
import Postsdata from "../postsdata/Postsdata";
import mendp from "../../asset/user-image-with-black-background.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../Utiles/axiosClient";
import { setLoading } from "../../redux/slices/Appconfigslice";
import { getuserProfile } from "../../redux/slices/postsSlice";
import Follower from "../follower/Follower";
import { followunfollow } from "../../redux/slices/FeedSlice";
const Profiles = () => {
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(false);
  const [name, setname] = useState("");
  const [img, setimg] = useState("");
  const [postimg, setPostimg] = useState("");
  const [caption, setCaption] = useState("");
  const [allProfiledata, setallProfiledata] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const data = useSelector((state) => state.loadingreducer.datainfo);
  const profiledata = useSelector((state) => state.userprofile.userprofile);
  console.log("profiledata", allProfiledata);
  console.log("Userdata", data._id);

  useEffect(() => {
    // allProfiledata.unshift(params.userid)
    const isFollower = allProfiledata?.follower?.find(item => item === data._id);
    setCheck(!!isFollower); 
  }, [allProfiledata?.follower, data._id]);
  
 
  const handleimg = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.onload = () => {
      if (filereader.readyState === FileReader.DONE) {
        setPostimg(filereader.result);
        console.log("Updated postimg: ", filereader.result);
      }
    };

    if (file) {
      filereader.readAsDataURL(file);
    }
  };
  const handlePost = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const data = await axiosClient.post("/post/", {
      img: postimg,
      caption,
    });
    dispatch(setLoading(false));
    dispatch(getuserProfile({ userid }));
    setPostimg(" ");
    setCaption(" ");
  };
  const handlefollow = () => {
    console.log("follow");
     dispatch(followunfollow({ idtofollow: allProfiledata._id}));

  };
  // profile User
  const userid = params?.userid;

  useEffect(() => {
    dispatch(getuserProfile({ userid }));
  }, [params.userId, data]);

  useEffect(() => {
    setimg(data?.avatar?.url);
    setname(data?.name);
    setallProfiledata(profiledata);
    if (userid === data?._id) {
      setShow(true);
    }
  });
  const navigate = useNavigate();
  return (
    <div className="profile">
      <div className="container">
        <div className="left-side">
         {
          show &&(
            <>
             <h4>Create Post</h4>
          <div className="box">
            <input
              type="text"
              placeholder="Write caption here"
              onChange={(e) => {
                setCaption(e.target.value);
              }}
            />
            <div className="content">
              {postimg && <img src={postimg} alt="" srcset="" />}
            </div>
            <div className="footer">
              <label htmlFor="postupload" className="btn-primary hover-link">
                <span> Upload Image</span>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  id="postupload"
                  onChange={handleimg}
                />
              </label>

              <button className="btn-primary hover-link" onClick={handlePost}>
                Submit
              </button>
            </div>
          </div>
            </>
          )
         }
          {allProfiledata?.posts?.map((item, id) => {
            return <Postsdata data={item} id={id} key={id} />;
          })}
        </div>
        <div className="right-side">
          <div className="profile-card">
            <img
              src={
                allProfiledata?.avatar?.url
                  ? allProfiledata?.avatar?.url
                  : mendp
              }
              alt=""
            />
            <p className="username">{allProfiledata?.name}</p>
            <p className="bio">{allProfiledata?.bio}</p>
            <div className="followenum">
              <h4>
                {allProfiledata?.follower?.length} <br /> Follower
              </h4>
              <h4>
                {allProfiledata?.following?.length} <br /> Following
              </h4>
            </div>
           {
            !show &&(
              <div onClick={handlefollow}> 
           {check ? (
              <button className="btn-secondary hover-link">Following</button>
            ) : (
              <button className="btn-primary hover-link">Follow</button>
            )}
           </div>
            )
           }
            {show && (
              <button
                className="btn-secondary hover-link btn-pad"
                onClick={() => {
                  navigate("/updateprofile");
                }}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
