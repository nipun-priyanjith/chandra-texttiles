import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
// Create a Redux store using configureStore from Redux Toolkit
export const store = configureStore({
    reducer :{
        cart : cartSlice // Assign the cartSlice reducer to the 'cart' key in the store's root reducer
    },
    devTools : true // Enable Redux DevTools for debugging
})




