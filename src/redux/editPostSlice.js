import { createSlice } from "@reduxjs/toolkit";
const initialState = ""

const editPostSlice = createSlice({
    name:"editPost",
    initialState,
    reducers: {
        updateEditPost: (state, action) => {
            return action.payload; 
        },
      },
    });
    
export const { updateEditPost } = editPostSlice.actions;
export default editPostSlice.reducer;

