import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./slices/postSlice";
import tokenSlice from "./slices/tokenSlice";

export const store = configureStore({
    reducer: {
       posts:postSlice,
       accessToken:tokenSlice
    }
})