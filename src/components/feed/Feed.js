import React, { useEffect, useState } from "react";
import { Box, Container, Paper, Typography, CircularProgress } from "@mui/material";
import Postsdata from "../postsdata/Postsdata";
import Follower from "../follower/Follower";
import { useDispatch, useSelector } from "react-redux";
import { feeddata } from "../../redux/slices/FeedSlice";
import Navbar from "../navbar/Navbar"; // Adjust the import path if needed

const Feed = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.feedMedia.feedinfo);
  const [feed, setFeed] = useState(null); // Initialize as null to represent loading state
  const [loading, setLoading] = useState(true); // Loading state
  const Loading = useSelector((state) => state.loadingreducer.isLoading);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(feeddata());
      setLoading(true); // Set loading to false after data is fetched
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setFeed(data);
  }, [data]);

  return (
    <>
      {Loading ? (
        <div style={{ display: 'flex', height:'400px',justifyContent:'center',alignItems:'center'}}>
          <CircularProgress /> 
        </div>// Or your custom loading component
      ) : (
        <>
          <Navbar />
          <Container component="main" sx={{ mt: 10 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box
                sx={{
                  flex: 2,
                  overflowY: "scroll",
                  height: "calc(100vh - 80px)",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  "-ms-overflow-style": "none", // IE and Edge
                  "scrollbar-width": "none", // Firefox
                }}
              >
                {feed?.posts?.map((item, id) => (
                  <Postsdata data={item} key={id} />
                ))}
              </Box>

              <Box sx={{ flex: 1, position: "sticky", top: 80 }}>
                <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6">You can Follow</Typography>
                  {feed?.following?.map((item, id) => (
                    <Follower data={item} key={id} />
                  ))}
                </Paper>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6">Suggestion for You</Typography>
                  {feed?.suggestions?.map((item, id) => (
                    <Follower data={item} key={id} />
                  ))}
                </Paper>
              </Box>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default Feed;
