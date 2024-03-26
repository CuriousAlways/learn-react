import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./reducers/filterReducer";
import anecdoteReducer from "./reducers/anecdoteReducer";
// import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    searchTerm: filterReducer,
    anecdotes: anecdoteReducer,
    // notification: notificationReducer,
  },
});

export default store;
