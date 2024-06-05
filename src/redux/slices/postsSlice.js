import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoading } from "./Appconfigslice";
import { axiosClient } from "../../Utiles/axiosClient";

export const getuserProfile = createAsyncThunk(
  "/userinfo/getuserProfile",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const response = await axiosClient.post("/user/getuserProfile", body);
      return response.result;
    } catch (e) {
      console.error("Error fetching user profile:", e);
      thunkApi.dispatch(setLoading(false));
      return Promise.reject(e);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);
export const likeandunlike = createAsyncThunk(
  "/user/likeandunlike",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const response = await axiosClient.post("/post/likeUnlike", body);
      console.log("likeandunlike", response.result.post);
      return response?.result?.post;
    } catch (e) {
      thunkApi.dispatch(setLoading(false));
      return Promise.reject(e);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

const userinfoSlice = createSlice({
  name: "userinfo",
  initialState: {
    userprofile: {},
  },
  extraReducers: function (builder) {
    builder
      .addCase(getuserProfile.fulfilled, (state, action) => {
        state.userprofile = action.payload;
      })
      .addCase(likeandunlike.fulfilled, (state, action) => {
        const data = action.payload;

        const index = state?.userprofile?.posts?.findIndex(
          (item) => item._id === data._id
        );
        console.log("index is ", index);
        if (index !== -1) {
          state.userprofile.posts[index] = data;
        }
      });
  },
});

export default userinfoSlice.reducer;
