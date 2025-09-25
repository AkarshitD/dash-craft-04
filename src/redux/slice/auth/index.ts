import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearStorage } from "../../../utils/common";
import { AppDisptach, RootState } from "@/redux/store";

interface AuthState {
    userData: any | Record<string, any>
}
const initialState: AuthState = {
    userData: {}
}

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        userData: {}
    },
    reducers: {
        loginAction: (state, action: PayloadAction<Record<string, any>>) => {
            return (
                state = {
                    ...state,
                    userData: {...action.payload }
                }
            )
        },
        logoutAction: (state) => {
            return (state = {
                ...state,
                userData: {},
            });
        },
    }
})

export const {
    loginAction,
    logoutAction
} = authSlice.actions


export const login = (data: Record<string, any>) => async (dispatch: AppDisptach) => {
    try {
        dispatch(loginAction(data));
    } catch (error) {
        console.log(error);
    }   
};


export const logout = () => async (dispatch: AppDisptach) => {
    try {
        dispatch(logoutAction());
        window.location.href = "/"
    } catch (error) {
        console.log(error);
    }
};

export const selectUserData = (state: RootState) => state?.auth?.userData


export default authSlice.reducer;
