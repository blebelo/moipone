import { INITIAL_STATE } from "@/src/lib/common/constants";
import { createContext } from "react";

// ==================== ENTITIES ====================
export interface ILogin {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient?: boolean;
}

export interface ICurrentUser {
  userId?: string;
  userRole?: string;
  userName?: string;
}

// ==================== AUTH CONTEXT ====================
export interface IAuthStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  currentUser?: ICurrentUser;
}

export interface IAuthActionContext {
  authenticate: (credentials: ILogin, redirectPath?: string) => Promise<void>;
  logout: () => void;
}

export const AuthStateContext = createContext<IAuthStateContext>(INITIAL_STATE);
export const AuthActionContext = createContext<IAuthActionContext | undefined>(undefined);
