import { createSlice } from "@reduxjs/toolkit";

const initialState = "home";

const pageSlice = createSlice({
  name: "page", 
  initialState,
  reducers: {
    updatePage: (state, action) => {
        return action.payload; 
    },
  },
});

export const { updatePage } = pageSlice.actions;
export default pageSlice.reducer;

