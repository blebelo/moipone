"use client";
import { createAction } from "redux-actions";
import { IAuthStateContext } from "./context";
import { RequestState } from "@/src/lib/common/constants";

export enum AuthActionEnums {
  // Authenticate
  authenticatePending = "AUTHENTICATE_PENDING",
  authenticateSuccess = "AUTHENTICATE_SUCCESS",
  authenticateError = "AUTHENTICATE_ERROR",
  setSessionUser = "SET_SESSION_USER",

  // Logout
  logoutPending = "LOGOUT_PENDING",
  logoutSuccess = "LOGOUT_SUCCESS",
  logoutError = "LOGOUT_ERROR",
}

// ==================== AUTHENTICATE ====================
export const authenticatePending = createAction<IAuthStateContext>(
  AuthActionEnums.authenticatePending,
  () => RequestState.Pending,
);

export const authenticateSuccess = createAction<IAuthStateContext>(
  AuthActionEnums.authenticateSuccess,
  (authState: Partial<IAuthStateContext> = {}) => ({
    ...RequestState.Success,
    ...authState,
  }),
);

export const authenticateError = createAction<IAuthStateContext>(
  AuthActionEnums.authenticateError,
  () => RequestState.Error,
);

// ==================== LOGOUT ====================
export const logoutPending = createAction<IAuthStateContext>(
  AuthActionEnums.logoutPending,
  () => RequestState.Pending,
);

export const logoutSuccess = createAction<IAuthStateContext>(
  AuthActionEnums.logoutSuccess,
  () => ({
    ...RequestState.Success,
    userId: undefined,
    userRole: undefined,
    userName: undefined,
  }),
);

export const logoutError = createAction<IAuthStateContext>(
  AuthActionEnums.logoutError,
  () => RequestState.Error,
);

export const setSessionUser = createAction<IAuthStateContext>(
  AuthActionEnums.setSessionUser,
  (authState: Partial<IAuthStateContext> = {}) => ({
    ...authState,
  }),
);
