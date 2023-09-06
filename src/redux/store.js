import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import pageReducer from  "./pageSlice"
export default configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
    }
})