'use client'

import { useContext, useReducer } from "react"
import { AuthReducer } from "./reducer"
import { INITIAL_STATE } from "@/src/lib/common/constants"
import { axiosInstance } from "@/src/lib/utils/axiosInstance"
import { useRouter } from "next/navigation"
import { AuthActionContext, AuthStateContext, ILogin } from "./context"
import { authenticateError, authenticatePending, authenticateSuccess, logoutError, logoutPending, logoutSuccess } from "./actions"
import { AbpTokenProperies, decodeToken } from "@/src/lib/utils/decoder"

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const instance = axiosInstance(false);
  const router = useRouter();

const authenticate = async (user: ILogin) => {
    dispatch(authenticatePending());
    const endpoint = 'TokenAuth/Authenticate';

    await instance.post(endpoint, user)
      .then(
        (response) => {
          const token = response.data.result.accessToken;
          if (token == undefined || null)
            {
              throw new Error('Null or invalid token found. Authentication Failed')
            }

          const decoded = decodeToken(token);
          const userRole = decoded[AbpTokenProperies.role];
          const userId = decoded[AbpTokenProperies.nameidentifier];

          document.cookie = `token=${token}; path=/; secure; samesite=strict`;

          sessionStorage.setItem("token", token);
          sessionStorage.setItem("role", userRole);
          sessionStorage.setItem("Id", userId);

          dispatch(authenticateSuccess());
          router.push('/dashboard');
        }
      ).catch(
        () => {
          dispatch(authenticateError())
        }
      )
  }

  const logout = () => {
    dispatch(logoutPending());

    try {
      sessionStorage.clear();
      dispatch(logoutSuccess());
      router.push('/')
    }
    catch {
      dispatch(logoutError());
      throw new Error('Logout Failed')
    }
  }

  return(
    <AuthActionContext.Provider value={{authenticate, logout}}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthActionContext.Provider>
  )
}

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
}

export const useAuthActions = () => {
  const context = useContext(AuthActionContext);
  if (!context) {
    throw new Error('useAuthActions must be used within a AuthProvider');
  }
  return context;
}