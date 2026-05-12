import { INITIAL_STATE } from "@/src/lib/common/constants";
import { createContext } from "react";

// ==================== ENTITIES ====================
export interface ILogin {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient?: boolean;
}

// ==================== AUTH CONTEXT ====================
export interface IAuthStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  userId?: number;
}

export interface IAuthActionContext {
  authenticate: (credentials: ILogin, redirectPath?: string) => Promise<void>;
  logout: () => void;
}

export const AuthStateContext = createContext<IAuthStateContext>(INITIAL_STATE);
export const AuthActionContext = createContext<IAuthActionContext | undefined>(undefined);
