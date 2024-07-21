import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refreshToken: '',
  token: '',
  userData: null,
  forgotEmailOrPhone: '',
  correctOTP: '',
  userType: "",
  availableUserTypes: []
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    setForgotCreds(state, action) {
      state.forgotEmailOrPhone = action.payload.emailOrPhone;
      state.correctOTP = action.payload.OTP;
    },
    setUserType(state, action) {
      state.userType = action.payload;
    },
    setAvailableUserTypes(state, action) {
      state.availableUserTypes = action.payload;
    },
    resetAuthState(state) {
      Object.assign(state, initialState);
    }
  }
});

export const { setUserData, setToken, setForgotCreds, setRefreshToken, setUserType, setAvailableUserTypes, resetAuthState } = AuthSlice.actions;
export default AuthSlice.reducer;