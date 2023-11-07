import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/CartSlice";

const store = configureStore({
  reducer: cartSlice,
});

export default store;
