import { createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../lib/apiClient";

const initialState = API_BASE_URL;

const hostSlice = createSlice({
  name: "post", 
  initialState,
});

export default hostSlice.reducer;
