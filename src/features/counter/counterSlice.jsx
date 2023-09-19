import { createSlice } from "@reduxjs/toolkit";

// The initial state of the counter slice
const initialState = {
  count: 0,
};

// The counter slice
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },

    decrement: (state) => {
      state.count -= 1;
    },

    reset: (state) => {
      state.count = 0;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

// The counter actions
export const { increment, decrement, reset, incrementByAmount } =
  counterSlice.actions;

// The counter reducer
export default counterSlice.reducer;
