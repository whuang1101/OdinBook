import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
// Gets all posts and stores so it can be used wherever in the front end
const profileSlice = createSlice({
  name: "profile", 
  initialState,
  reducers: {
    updateProfile: (state, action) => {
        return action.payload; 
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;

