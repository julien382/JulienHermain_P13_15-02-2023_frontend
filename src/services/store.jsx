/*import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.token // mettre le bon chemin
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false
      state.token = null
    },
  },
})

export const { loginSuccess, logoutSuccess } = authSlice.actions
export default authSlice.reducer*/



import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const isLoggedIn = (state) => state.auth.isLoggedIn; // définir isLoggedIn comme fonction

const store = configureStore({
  reducer: authSlice.reducer,
});

export default store;
