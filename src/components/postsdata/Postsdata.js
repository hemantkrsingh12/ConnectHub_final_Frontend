import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getuserProfile, likeandunlike } from "../../redux/slices/postsSlice";
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./Postsdata.scss";
import axios from "axios";
import { axiosClient } from "../../Utiles/axiosClient";

const Postsdata = ({ data }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const[show,setShow] = useState(false);
  const datas = useSelector((state) => state.loadingreducer.datainfo);


  useEffect(() => {
  
    if (data?.owner?._id === datas?._id) {
      setShow(true);
    }
  });

  const handleLike = () => {
    const postid = data?._id;
    dispatch(likeandunlike({ postid }));
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = async() => {
    setAnchorEl(null);
  };
  const deletePost=async()=>{
    const postid = data?._id;
    const response = await axiosClient.post("/post/deletepost", {
      postid
      
    });
    window.location.reload();
    setAnchorEl(null);
  }

  return (
    <Card className="post" sx={{ marginBottom: 2 }}>
      <CardHeader
        avatar={
          <Avatar imgavt={data?.owner?.avatar?.url} />
        }
        action={
          <IconButton onClick={handleMenuOpen}>
          {
            show && (
              <MoreVertIcon />
            )
          }
          </IconButton>
        }
        title={data?.owner?.name}
        onClick={() => navigate(`/profile/${data?.owner?._id}`)}
        sx={{ cursor: 'pointer' }}
      />
      {
        show &&(
          <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Edit Post</MenuItem>
        <MenuItem onClick={deletePost}>Delete Post</MenuItem>
      </Menu>
        )
      }
      <CardMedia
        component="img"
        image={data?.image?.url}
        alt="Post image"
        sx={{ height: 400, objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {data?.caption}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {data?.timeAgo}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleLike}>
          {data?.isliked ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon sx={{ color: 'grey' }} />}
        </IconButton>
        <Typography variant="body2" color="textSecondary">
          {data?.likecount} likes
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Postsdata;
