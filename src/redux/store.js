import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import pageReducer from  "./pageSlice"
import postReducer from "./postSlice"
import hostReducer from "./hostSlice"
import allPostsReducer from "./allPostsSlice"
import friendSelectionReducer from "./friendSelectSlice"
export default configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
        post: postReducer,
        host: hostReducer,
        allPosts: allPostsReducer,
        friendSelection: friendSelectionReducer,
    }
})