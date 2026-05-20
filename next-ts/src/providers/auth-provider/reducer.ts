"use client";
import { INITIAL_STATE } from "@/src/lib/common/constants";
import { mergePayloadHandler } from "@/src/lib/common/helper-methods";
import { handleActions } from "redux-actions";
import { AuthActionEnums } from "./actions";
import { IAuthStateContext } from "./context";

export const AuthReducer = handleActions<IAuthStateContext, IAuthStateContext>(
  {
    // Authenticate
    [AuthActionEnums.authenticatePending]: mergePayloadHandler,
    [AuthActionEnums.authenticateSuccess]: mergePayloadHandler,
    [AuthActionEnums.authenticateError]: mergePayloadHandler,

    // Log Out
    [AuthActionEnums.logoutPending]: mergePayloadHandler,
    [AuthActionEnums.logoutSuccess]: mergePayloadHandler,
    [AuthActionEnums.logoutError]: mergePayloadHandler,
  },
  INITIAL_STATE
);
