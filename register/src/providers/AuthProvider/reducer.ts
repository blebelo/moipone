import { handleActions } from "redux-actions";
import { IAuthStateContext } from "./context";
import { AuthActionEnums } from "./actions";
import { INITIAL_STATE } from "@/lib/common/constants";
import { mergePayloadHandler } from "@/lib/common/helper-methods";

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