"use client";
import { createAction } from "redux-actions";
import { IAuthStateContext, ICurrentUser } from "./context";
import { RequestState } from "@/src/lib/common/constants";

export enum AuthActionEnums {
  // Authenticate
  authenticatePending = "AUTHENTICATE_PENDING",
  authenticateSuccess = "AUTHENTICATE_SUCCESS",
  authenticateError = "AUTHENTICATE_ERROR",

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

export const authenticateSuccess = createAction<IAuthStateContext, ICurrentUser>(
  AuthActionEnums.authenticateSuccess,
  (authenticatedUser : ICurrentUser) => ({
    ...RequestState.Success,
    currentUser: authenticatedUser
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
    currentUser: undefined
  }),
);

export const logoutError = createAction<IAuthStateContext>(
  AuthActionEnums.logoutError,
  () => RequestState.Error,
);
