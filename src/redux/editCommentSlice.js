import { createSlice } from "@reduxjs/toolkit";
const initialState = ""

const editCommentSlice = createSlice({
    name:"editComment",
    initialState,
    reducers: {
        updateComment: (state, action) => {
            return action.payload; 
        },
      },
    });
    
export const { updateComment } = editCommentSlice.actions;
export default editCommentSlice.reducer;

