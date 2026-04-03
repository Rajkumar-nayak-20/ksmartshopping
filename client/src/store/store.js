// import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './userslice.js'

// export const store = configureStore({
//   reducer: {
//     user :userReducer
//   },
// })


// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import productReducer from "./productSlice";
import addresReducer from "./addressSlice";
import cartReducer from "./cartproduct.js";
import orderReducer from "./orderSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer, 
    cartItem:cartReducer,// ✅ REQUIRED
    addresses : addresReducer,
    orders : orderReducer
  },
});
