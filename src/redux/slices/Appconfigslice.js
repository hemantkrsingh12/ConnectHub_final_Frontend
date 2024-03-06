import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../Utiles/axiosClient";

export const getmyinfo = createAsyncThunk(
  "/usersdata/getmyinfo",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const response = await axiosClient.get("/user/getmyinfo");
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);
export const updateinfo = createAsyncThunk(
  "/user/updateprofile",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const response = await axiosClient.put("/user/updateprofile", body);
      return response.result;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      thunkApi.dispatch(setLoading(false));
      // window.location.reload();
    }
  }
);
const appconfigslice = createSlice({
  name: "appconfigSlice",
  initialState: {
    isLoading: false,
    toastdata:{},
    datainfo: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setToast:(state,action)=>{
      state.toastdata = action.payload;
    }
  },
  extraReducers: function (builder) {
    builder
      .addCase(getmyinfo.fulfilled, (state, action) => {
        state.datainfo = action?.payload?.user;
      })
      .addCase(updateinfo.fulfilled, (state, action) => {
        state.datainfo = action?.payload?.user;
      });
  },
});
export default appconfigslice.reducer;
export const { setLoading,setToast } = appconfigslice.actions;
