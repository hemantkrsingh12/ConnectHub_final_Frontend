import axios from "axios";
import { KEY_ACCESS_TOKEN, setItem } from "./localStorage";
import { getItem, removeItem } from "./localStorage";
import store from "../redux/Stored";
import { TOAST_FAILURE, TOAST_SUCCESS } from "../App";
import { setToast } from "../redux/slices/Appconfigslice";
import { useDispatch } from "react-redux";
export const axiosClient = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  // console.log("headerrequest",accessToken);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

axiosClient.interceptors.response.use(
  async (response) => {
    const data = response.data;
    if (data.status === "ok") {
      console.log("response of api data", response.data);
      return data;
    }

    const statusCode = data.statusCode;
    const original = response.config;
    const originalrequest = response.config.baseURL + response.config.url;
    const error = data.result;
    console.log("Aman is king",data.result);
   store.dispatch(
      setToast({
        type: TOAST_FAILURE,
        message: error,
      })
    );
    console.log("Response Status Code:", statusCode);
    console.log("Original Request URL:", originalrequest);

    if (
      statusCode === 401 &&
      originalrequest === "http://localhost:4000/auth/refresh"
    ) {
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/login", "_self");

      return Promise.reject(error);
    }

    if (statusCode === 401) {
      const response = await axiosClient.get("/auth/refresh");
      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      original.headers[
        "Authorization"
      ] = `Bearer ${response.result.accessToken}`;

      return axios(original);
    }
    return Promise.reject(error);
  },
  async (error) => {
    store.dispatch(
      setToast({
        type: TOAST_FAILURE,
        message: error,
      })
    );
    return Promise.reject(error);
  }
);
