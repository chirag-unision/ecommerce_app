import { configureStore } from "@reduxjs/toolkit";
import Reducers from "./appSlice";

export const store= configureStore({
    reducer: Reducers 
})