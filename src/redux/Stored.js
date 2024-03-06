import { configureStore } from "@reduxjs/toolkit";
import Appconfigslice from "./slices/Appconfigslice";
import postsSlice from "./slices/postsSlice";
import FeedSlice from "./slices/FeedSlice";


export default configureStore({
    reducer:{
        loadingreducer:Appconfigslice,
        userprofile:postsSlice,
        feedMedia:FeedSlice
        
    }
});