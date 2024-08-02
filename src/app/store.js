import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "@/features/cartSlice";
import ordersSlice from "@/features/ordersSlice";
import userSlice from "@/features/userSlice";
import productsSlice from "@/features/productsSlice";
import feedbacksSlice from "@/features/feedbacksSlice";

export const store = configureStore({
    reducer : {
        cartSlice,
        ordersSlice,
        userSlice,
        productsSlice,
        feedbacksSlice
    }
})

