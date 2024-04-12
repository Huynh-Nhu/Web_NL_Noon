import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
      
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
    refresh:{
      currentUser: null,
      isFetching: false,
      error: false,
    },
       
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
      
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
    },
    logoutStart: (state) => {
      state.login.isFetching = true;
    },
    logoutSuccess: (state,action) => {
      state.login.isFetching = false;
      state.login.currentUser= action.payload = null;
      state.login.error = false;
    },
    logoutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    refreshTokenStart: (state) => {
      state.login.isFetching = true;
    },
    refreshTokenSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    refreshTokenFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
   
    

  },
});

export const {
  loginStart,
  loginFailed,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
  refreshTokenStart,
  refreshTokenSuccess,
  refreshTokenFailed,
  
} = authSlice.actions;

export default authSlice.reducer;