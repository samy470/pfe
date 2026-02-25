import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./shopSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;