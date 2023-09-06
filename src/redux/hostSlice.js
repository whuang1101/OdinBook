import { createSlice } from "@reduxjs/toolkit";

const initialState = "http://localhost:3000";

const hostSlice = createSlice({
  name: "post", 
  initialState,
});

export default hostSlice.reducer;

