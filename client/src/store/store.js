// import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './userslice.js'

// export const store = configureStore({
//   reducer: {
//     user :userReducer
//   },
// })


// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer, // ✅ REQUIRED
  },
});
