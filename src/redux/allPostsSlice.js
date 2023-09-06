import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
// Gets all posts and stores so it can be used wherever in the front end
const allPostsSlice = createSlice({
  name: "allPosts", 
  initialState,
  reducers: {
    updateAllPosts: (state, action) => {
        return action.payload; 
    },
  },
});

export const { updateAllPosts } = allPostsSlice.actions;
export default allPostsSlice.reducer;

