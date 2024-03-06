import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import toast, { Toaster } from "react-hot-toast";
import Signup from "./Pages/Signup/Signup";
import Requireuser from "./components/Requireuser";
import Feed from "./components/feed/Feed";
import UpdateProfile from "./components/updateprofile/UpdateProfile";
import Profiles from "./components/profiles/Profiles";
import LoadingBar from "react-top-loading-bar";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import StopnavigateLogin from "./components/StopnavigateLogin";
import { setToast } from "./redux/slices/Appconfigslice";
export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";
function App() {
  const loader = useRef();
  const Loading = useSelector((state) => state.loadingreducer.isLoading);
  const toastdata = useSelector((state) => state.loadingreducer.toastdata);
  const dispatch=useDispatch();
  useEffect(() => {
    if (Loading) {
      loader.current?.continuousStart();
    } else {
      loader.current?.complete();
    }
  }, [Loading]);

  useEffect(() => {
    switch (toastdata.type) {
      case TOAST_SUCCESS:
        toast.success(toastdata.message);
        break;
      case TOAST_FAILURE:
        toast.error(toastdata.message);
        break;
    }
  },[toastdata]);
  
  

  return (
    <div className="App">
      <LoadingBar color="#f11946" ref={loader} />
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route element={<Requireuser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userid" element={<Profiles />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
          </Route>
        </Route>
        <Route element={<StopnavigateLogin />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
