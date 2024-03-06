import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoading } from "./Appconfigslice";
import { axiosClient } from "../../Utiles/axiosClient";
import axios from "axios";

export const feeddata = createAsyncThunk(
  "/user/getdata",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const response = await axiosClient.get("/user/getpost");
      console.log("Hemant singh baghel", response.result);
      return response.result;
    } catch (e) {
      thunkApi.dispatch(setLoading(false));
      return Promise.reject(e);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);
export const followunfollow = createAsyncThunk(
  "/user/followunfollow",
  async (body, thunkApi) => {
    try {
      const response = await axiosClient.post("/user/follow", body);
      window.location.reload();
      return response.result.usertofollow;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
const FeedSlice = createSlice({
  name: "feeddata",
  initialState: {
    feedinfo: {},
  },
  extraReducers: function (builder) {
    builder.addCase(feeddata.fulfilled, (state, action) => {
      state.feedinfo = action.payload;
    });
    builder.addCase(followunfollow.fulfilled, (state, action) => {
      const user = action.payload;
      const index = state?.feedinfo?.following.findIndex(
        (item) => item._id == user._id
      );
      if (index != -1) {
        console.log("index will be in if " + index);
        console.log("followinng info in if ", state.feedinfo.following);
        state?.feedinfo.following.splice(index, 1);
        // state?.feedinfo?.posts.splice(index, state.feedinfo.posts.length);
        // state?.feedinfo.suggestions.splice(index, 1);
      } else {
        console.log("index will be in else " + index);
        console.log("followinng info in else ", state.feedinfo.following);
        state?.feedinfo.following.push(user);
        // state?.feedinfo?.posts.push(user);
      }
    });
  },
});
export default FeedSlice.reducer;
export const { setFeeddata } = FeedSlice.actions;
