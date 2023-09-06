import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import pageReducer from  "./pageSlice"
import postReducer from "./postSlice"
export default configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
        post: postReducer
    }
})