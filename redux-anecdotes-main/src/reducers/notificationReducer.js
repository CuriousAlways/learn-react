// import { createSlice } from "@reduxjs/toolkit";

// const notificationSlice = createSlice({
//   name: "notification",
//   initialState: null,
//   reducers: {
//     createNotification(state, action) {
//       return action.payload;
//     },
//   },
// });

// export const { createNotification } = notificationSlice.actions;
// export default notificationSlice.reducer;

/**********NOTIIIFICATION REDUCERS VIA REACT useReducer*********/
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return action.payload;
    default:
      return null;
  }
};

export default notificationReducer;
