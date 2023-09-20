# Redux toolkit Recap

## What is Redux?

Redux is a state management library that is used to manage the state of an application. It is often used with React and Angular for building user interfaces. Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

## What is Redux Toolkit?

Redux Toolkit is our official, opinionated, batteries-included toolset for efficient Redux development. It is intended to be the standard way to write Redux logic.

## Setting up a store

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

### What is a Slice?

Simply put, a slice is a collection of Redux reducer logic and actions for a single feature of your app. A slice contains all the Redux logic needed to manage a piece of state. It contains the initial state value, the reducer function, and any Redux thunk functions or Redux Toolkit query endpoints.

For example, if you have a counter feature in your app, you might have a counter slice that looks like this:

```js
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
```

## What is a Reducer?

A reducer is a pure function that calculates a new state value based on previous state + an action payload. It must not mutate the previous state. It must return a new object instead.

## What is an Action?

An action is a plain object that represents an intention to change the state. Actions are the only way to get data into the store. Any data, whether from UI events, network callbacks, or other sources such as WebSockets needs to eventually be dispatched as actions.

## What is a Selector?

Selectors are functions that know how to extract specific pieces of information from a store state value. Selectors are used to "select" some state value and can be used to extract specific pieces of information from a store state value.

## What is a Thunk?

A thunk is a function that wraps an expression to delay its evaluation. Thunks are the recommended middleware for basic Redux side effects logic, including complex synchronous logic that needs access to the store, and simple async logic like AJAX requests.

eg:

```js
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};
```

- Here the thunk function is incrementAsync, which takes an amount as an argument and returns a function that takes dispatch as an argument. This function is called by the Redux store. We set a timeout of 1 second and then dispatch the incrementByAmount action with the amount passed as an argument.

### How to use a Thunk?

```js
import { incrementAsync } from "./counterSlice";

function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(incrementAsync(3))}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  );
}
```

## ExtraReducers

Extra reducers are reducers that respond to other action types besides the types they were created with. They are useful for responding to actions dispatched by other slices, or for defining reducers that only run under certain conditions.

## What is an Immer?

Immer is a library that allows you to write simpler immutable updates using normal mutative code, like const newState = state; newState.push(newItem);. Behind the scenes, Immer will detect the changes to the newState object, and will return a safely immutably updated value that you can return from your reducer.
