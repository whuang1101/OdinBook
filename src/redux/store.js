import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import pageReducer from  "./pageSlice"
import postReducer from "./postSlice"
import hostReducer from "./hostSlice"
import allPostsReducer from "./allPostsSlice"
import friendSelectionReducer from "./friendSelectSlice"
import profileReducer from "./profileSlice"
import commentModalReducer from "./commentModalSlice";
import editCommentReducer from "./editCommentSlice"
export default configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
        post: postReducer,
        host: hostReducer,
        allPosts: allPostsReducer,
        friendSelection: friendSelectionReducer,
        profile: profileReducer,
        commentModal: commentModalReducer,
        editComment: editCommentReducer,
    }
})