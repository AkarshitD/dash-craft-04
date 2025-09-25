import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import config from "../config";
import { authSlice } from "./slice"

const RootReducer = combineReducers({
    auth: authSlice.reducer,
});


const store = configureStore({
    reducer: RootReducer,
    devTools: config.NODE_ENV !== "production"
})

export type RootState = ReturnType<typeof store.getState>
export type AppDisptach = typeof store.dispatch

export default store