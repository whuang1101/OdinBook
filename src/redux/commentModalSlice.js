import { createSlice } from "@reduxjs/toolkit";
const initialState = ""

const commentModal = createSlice({
    name:"commentModal",
    initialState,
    reducers: {
        updateCommentModal: (state, action) => {
            return action.payload; 
        },
      },
    });
    
export const { updateCommentModal } = commentModal.actions;
export default commentModal.reducer;

