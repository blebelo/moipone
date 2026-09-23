"use client";
import { AuthReducer } from "./reducer";
import { INITIAL_STATE } from "@/lib/common/constants";
import { useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { axiosInstance } from "@/lib/utils/axiosInstance";
import { AbpTokenProperies, decodeToken } from "@/lib/utils/decoder";
import {AuthActionContext, AuthStateContext, ICurrentUser, IUser,} from "./context";
import {authenticateError, authenticatePending, authenticateSuccess,
  logoutError, logoutPending, logoutSuccess,} from "./actions";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, { ...INITIAL_STATE });
  const instance = useMemo(() => axiosInstance(false), []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const decoded = decodeToken(token);
      const exp = Number(decoded.exp);

      if (!exp || Date.now() >= exp * 1000) {
        localStorage.removeItem("token");
        return;
      }

      const authenticatedUser: ICurrentUser = {
        userRole: decoded[AbpTokenProperies.role],
        userId: decoded[AbpTokenProperies.nameidentifier],
        userName: decoded[AbpTokenProperies.name],
      };

      dispatch(authenticateSuccess(authenticatedUser));
    } catch {
      localStorage.removeItem("token");
      sessionStorage.clear();
    }
  }, []);

  const authenticate = useCallback(async (user: IUser) => {
    dispatch(authenticatePending());
    const endpoint = "TokenAuth/Authenticate";

    await instance
      .post(endpoint, user)
      .then((response) => {
        const token = response.data.result.accessToken;
        if (!token) {
          throw new Error("Null or invalid token found. Authentication Failed");
        }

        const decoded = decodeToken(token);
        const userRole = decoded[AbpTokenProperies.role];
        const userId = decoded[AbpTokenProperies.nameidentifier];
        const userName = decoded[AbpTokenProperies.name];

        localStorage.setItem("token", token);

        dispatch(authenticateSuccess({ userRole, userId, userName }));
      })
      .catch((error) => {
        const message =
          error.message === "Network Error"
            ? "An error occurred during authentication. Please contact admin"
            : error.response?.data?.error?.details;

        dispatch(authenticateError(message));
        throw new Error(message);
      });
  }, [instance]);

  const logout = useCallback(() => {
    dispatch(logoutPending());

    try {
      localStorage.removeItem("token");
      sessionStorage.clear();
      dispatch(logoutSuccess());
    } catch {
      dispatch(logoutError());
      throw new Error("Logout Failed");
    }
  }, []);

  const actions = useMemo(
    () => ({ authenticate, logout }),
    [authenticate, logout],
  );

  return (
    <AuthActionContext.Provider value={actions}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthActionContext.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
};

export const useAuthActions = () => {
  const context = useContext(AuthActionContext);
  if (!context) {
    throw new Error("useAuthActions must be used within a AuthProvider");
  }
  return context;
};