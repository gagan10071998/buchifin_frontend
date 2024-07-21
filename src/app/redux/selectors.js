export const selectToken = (state) => state.auth.token || "";
export const selectRefreshToken = (state) => state.auth.refreshToken || "";
export const selectUserData = (state) => state.auth.userData || null;
export const selectUserTypes = (state) => state.auth.availableUserTypes || [];
export const selectForgotEmailOrPhone = (state) => state.auth.forgotEmailOrPhone || "";
export const selectCorrectOTP = (state) => state.auth.correctOTP || '';
export const selectUserType = (state) => state.auth.userType || '';