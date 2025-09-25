import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const adminSlice = createSlice({
    name: "admin",
    initialState: {},
    reducers: {
        profileAction: (state, action) => {
            return (
                state = {
                    ...state,
                    profile: action.payload
                }
            )
        }
    }
})

export const {
    profileAction
} = adminSlice.actions

export const setAdminProfile = (data) => async (dispatch) => {
    try {
        dispatch(profileAction(data));
    } catch (error) {
        console.log(error);
    }
}

export const selectAdminData = (state) => state.auth.userData
