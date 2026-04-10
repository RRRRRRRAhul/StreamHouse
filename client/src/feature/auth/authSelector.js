export const selectAuthState = (state) => state.auth;

export const selectIsAuthenticated = (state) =>
  state.auth.isAuthenticated;

export const selectAuthUser = (state) =>
  state.auth.user;

export const selectAccessToken = (state) =>
  state.auth.accessToken;

export const selectRefreshToken = (state) =>
  state.auth.refreshToken;

export const selectAuthLoading = (state) =>
  state.auth.loading;

export const selectAuthError = (state) =>
  state.auth.error;
