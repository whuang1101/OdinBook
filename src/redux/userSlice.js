import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return action.payload;
    }
  }
});

export const { updateUser } = usersSlice.actions;
export default usersSlice.reducer;