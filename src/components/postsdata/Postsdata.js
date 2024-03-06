import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import postimg from "../../asset/pexels-nathan-tran-16776159.jpg";
import { FaHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Postsdata.scss";
import { useDispatch } from "react-redux";
import { getuserProfile, likeandunlike } from "../../redux/slices/postsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
const Postsdata = ({ data, id }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const userid = params?.userid;
  const [showModal, setShowModal] = useState(false);
  const navigate=useNavigate();
  const handlelike = () => {
    const postid = data?._id;
    dispatch(likeandunlike({ postid }));
  };

  return (
    <div className="post">
      <div className="heading" onClick={()=>navigate(`/profile/${data?.owner?._id}`)}>
       <div className="innerhead">
       <Avatar imgavt={data?.owner?.avatar?.url} />
        <h4>{data?.owner?.name}</h4>
       </div>
        <BsThreeDotsVertical className="three-dot" onClick={()=>setShowModal(!showModal)}/>
        
      </div>
      {showModal && (
        <div className="modal">
          <div className="modals-content">
            <p  style={{marginBottom:"4px"}}>Edit Post</p>
            <hr />
           <p style={{marginTop:"4px"}}>Delete Post</p>
          </div>
        </div>
      )}
      <div className="content">
        <img src={data?.image?.url} alt="" />
      </div>
      <div className="footer">
        <span id="liked" onClick={handlelike}  className='hover-link'>
          {data?.isliked ? (
            <FaHeart size={30} color="red" />
          ) : (
            <AiOutlineHeart size={30} />
          )}
          <h4>{data?.likecount} likes</h4>
        </span>
        <br />
       
      </div>
      <p>{data?.caption}</p>
      <p>{data?.timeAgo}</p>
    </div>
  );
};

export default Postsdata;
