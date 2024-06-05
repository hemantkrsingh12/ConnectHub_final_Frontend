import React, { useEffect, useState } from "react";
import "./Profiles.scss";
import Postsdata from "../postsdata/Postsdata";
import mendp from "../../asset/user-image-with-black-background.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../Utiles/axiosClient";
import { setLoading } from "../../redux/slices/Appconfigslice";
import { getuserProfile } from "../../redux/slices/postsSlice";
import { followunfollow } from "../../redux/slices/FeedSlice";
import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";

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
  const navigate = useNavigate();

  useEffect(() => {
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
    setPostimg("");
    setCaption("");
  };

  const handlefollow = () => {
    dispatch(followunfollow({ idtofollow: allProfiledata._id }));
  };

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

  return (
    <Container component="div" className="profile" sx={{ marginTop: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} className="left-side">
          {show && (
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6">Create Post</Typography>
              <TextField
                type="text"
                label="Write caption here"
                variant="outlined"
                fullWidth
                sx={{ mt: 2, mb: 2 }}
                onChange={(e) => setCaption(e.target.value)}
              />
              <div className="content">
                {postimg && <img src={postimg} alt="Post" style={{ maxWidth: '100%' }} />}
              </div>
              <div className="footer">
                <Button variant="contained" component="label" sx={{ backgroundColor: 'aqua', color: 'black' }}>
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleimg}
                  />
                </Button>
                <Button variant="contained" sx={{ backgroundColor: 'aqua', color: 'black' }} onClick={handlePost}>
                  Submit
                </Button>
              </div>
            </Paper>
          )}
          {allProfiledata?.posts?.map((item, id) => {
            return <Postsdata data={item} id={id} key={id} />;
          })}
        </Grid>
        <Grid item xs={12} md={4} sx={{ position: 'sticky', top: 0, height: 'fit-content' }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <div className="profile-card">
              <Avatar
                src={allProfiledata?.avatar?.url ? allProfiledata?.avatar?.url : mendp}
                alt="User Avatar"
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="h6" className="username">{allProfiledata?.name}</Typography>
              <Typography variant="body1" className="bio">{allProfiledata?.bio}</Typography>
              <div className="followenum" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                <div>
                  <Typography variant="h6">{allProfiledata?.follower?.length}</Typography>
                  <Typography variant="body2">Followers</Typography>
                </div>
                <div>
                  <Typography variant="h6">{allProfiledata?.following?.length}</Typography>
                  <Typography variant="body2" >Following</Typography>
                </div>
              </div>
              {!show && (
                <Button
                  variant={check ? "contained" : "outlined"}
                  color={check ? "primary" : "secondary"}
                  onClick={handlefollow}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  {check ? "Following" : "Follow"}
                </Button>
              )}
              {show && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate("/updateprofile")}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profiles;
