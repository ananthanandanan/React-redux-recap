import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

// The initial state of the posts slice

const initialState = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
];

// The posts slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        // push only works here because toolkit uses immer.js under the hood
        state.push(action.payload);
      },
      // prepare is a callback function that lets us define the action payload

      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
          },
        };
      },
    },
  },
});

// The posts actions
export const { postAdded } = postsSlice.actions;
// The posts selector
export const selectAllPosts = (state) => state.posts;
// The posts reducer
export default postsSlice.reducer;
