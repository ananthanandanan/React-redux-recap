import { createSlice } from "@reduxjs/toolkit";

// The initial state of the posts slice

const initialState = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
];

// The posts slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

// The posts actions
export const {} = postsSlice.actions;
// The posts selector
export const selectAllPosts = (state) => state.posts;

// The posts reducer
export default postsSlice.reducer;
