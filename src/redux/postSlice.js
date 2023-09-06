import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const postSlice = createSlice({
  name: "post", 
  initialState,
  reducers: {
    updatePost: (state, action) => {
        return action.payload; 
    },
  },
});

export const { updatePost } = postSlice.actions;
export default postSlice.reducer;

