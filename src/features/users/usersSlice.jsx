import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Tomas" },
  { id: "1", name: "Sarah" },
  { id: "2", name: "Edgar" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

// users actions creator
export const {} = usersSlice.actions;

// custom user selector
export const selectAllUsers = (state) => state.users;

// users reducer
export default usersSlice.reducer;
