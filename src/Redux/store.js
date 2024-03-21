import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.admin = null;
      state.token = null;
    },
    setCord: (state, action) => {
      state.admin = action.payload.admin;
    },
  },
});

export const { setMode, setLogin, setLogout, setCord } = authSlice.actions;
export default authSlice.reducer;
