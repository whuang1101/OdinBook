import { createSlice } from "@reduxjs/toolkit";

const initialState = "https://odinbook-server-production-a812.up.railway.app";

const hostSlice = createSlice({
  name: "post", 
  initialState,
});

export default hostSlice.reducer;

