import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const authSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].qtyOrdered += 1;
      } else {
        const temp = { ...action.payload };
        state.cart = [...state.cart, temp];
      }
    },

    setCart: (state, action) => {
      state.cart = action.payload;
    },

    removeFromCart: (state, action) => {
      const updatedCart = state.cart.filter(
        (cartItem) => action.payload._id !== cartItem._id
      );
      state.cart = updatedCart;
    },

    deleteCart: (state, action) => {
      state.cart = [];
    },
  },
});

export default authSlice.reducer;
export const { addToCart, removeFromCart, deleteCart, setCart } =
  authSlice.actions;
