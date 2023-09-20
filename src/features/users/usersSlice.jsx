import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USERS_URL } from "../../app/constants";

const initialState = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(USERS_URL);
    return [...response.data];
  } catch (error) {
    return error.message;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

// users actions creator
export const {} = usersSlice.actions;

// custom user selector
export const selectAllUsers = (state) => state.users;

// users reducer
export default usersSlice.reducer;
