import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  cart: {},
  subTotal: 0,
  user: { value: null },
  key: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: InitialState,
  reducers: {
    getCart: (state, action) => {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart"));
        let subt = 0;
        let allCarts = JSON.parse(localStorage.getItem("cart"));
        let keys = Object.keys(allCarts);
        for (let i = 0; i < keys.length; i++) {
          subt += allCarts[keys[i]].price * allCarts[keys[i]].qty;
        }
        state.subTotal = subt;
        console.log(
          "Here is the subtotal from local storage: ",
          state.subTotal
        );
      } else {
      }
    },
    addToCart: (state, action) => {
      if (Object.keys(state.cart).length == 0) {
        state.key = Math.random();
      }
      let newCart = state.cart;
      if (action.payload.itemCode in state.cart) {
        newCart[action.payload.itemCode].qty =
          state.cart[action.payload.itemCode].qty + action.payload.qty;
      } else {
        newCart[action.payload.itemCode] = {
          qty: 1,
          price: action.payload.price,
          name: action.payload.name,
          size: action.payload.size,
          variant: action.payload.variant,
        };
      }
      console.log("New Cart is: ", newCart);
      state.cart = newCart;
      localStorage.setItem("cart", JSON.stringify(newCart));
      let subt = 0;
      let keys = Object.keys(state.cart);
      for (let i = 0; i < keys.length; i++) {
        subt += newCart[keys[i]].price * newCart[keys[i]].qty;
      }
      state.subTotal = subt;
      console.log("Sub Total is here brother: ", subt);
    },
    removeFromCart: (state, action) => {
      console.log("This is start.", action.payload.itemCode);
      let newCart = state.cart;
      if (action.payload.itemCode in state.cart) {
        newCart[action.payload.itemCode].qty =
          state.cart[action.payload.itemCode].qty - action.payload.qty;
      }
      console.log("Bro, I am here: ", newCart[action.payload.itemCode]);
      if (newCart[action.payload.itemCode]["qty"] <= 0) {
        delete newCart[action.payload.itemCode];
      }
      state.cart = newCart;
      localStorage.setItem("cart", JSON.stringify(newCart));
      let subt = 0;
      let keys = Object.keys(state.cart);
      for (let i = 0; i < keys.length; i++) {
        subt += newCart[keys[i]].price * newCart[keys[i]].qty;
      }
      state.subTotal = subt;
      console.log("Sub Total is here brother: ", subt);
    },
    clearCart: (state, action) => {
      state.cart = {};
      localStorage.setItem("cart", JSON.stringify({}));
      state.subTotal = 0;
    },
    buyNow: (state, action) => {
      let newCart = {};
      newCart[action.payload.itemCode] = {
        qty: 1,
        price: action.payload.price,
        name: action.payload.name,
        size: action.payload.size,
        variant: action.payload.variant,
      };
      state.cart = newCart;
      localStorage.setItem("cart", JSON.stringify(newCart));
      let subt = 0;
      let keys = Object.keys(state.cart);
      for (let i = 0; i < keys.length; i++) {
        subt += newCart[keys[i]].price * newCart[keys[i]].qty;
      }
      state.subTotal = subt;
      state.subTotal = action.payload.price;
      // router.push("/checkout");
    },
  },
});

export const { getCart, addToCart, removeFromCart, clearCart, buyNow } =
  cartSlice.actions;

export default cartSlice.reducer;
