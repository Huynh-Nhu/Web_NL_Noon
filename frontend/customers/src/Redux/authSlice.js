import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "loginCustom",
    initialState: {
        login: {
            currentCustomer: null,
            
        }
    },
    reducers: {
        loginSuccess: (state,action) => {
            state.login.currentCustomer = action.payload
        },
        logoutSuccess: (state,action) => {
            state.login.currentCustomer = action.payload = null

        }
    }
})
export const {
    loginSuccess,
    logoutSuccess
} = loginSlice.actions

export default loginSlice.reducer;