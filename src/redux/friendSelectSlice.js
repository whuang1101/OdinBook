import { createSlice } from "@reduxjs/toolkit";
const initialState = "Friend Requests"

const friendSlice = createSlice({
    name:"friendSelection",
    initialState,
    reducers: {
        updateFriendSelection: (state, action) => {
            return action.payload; 
        },
      },
    });
    
export const { updateFriendSelection } = friendSlice.actions;
export default friendSlice.reducer;

