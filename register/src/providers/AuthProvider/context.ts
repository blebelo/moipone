
import { createContext } from "react";

// ==================== ENTITIES ====================
export interface IUser {
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
  authenticate: (credentials: IUser) => Promise<void>;
  logout: () => void;
}

export const AuthStateContext = createContext<IAuthStateContext | undefined>(undefined);
export const AuthActionContext = createContext<IAuthActionContext | undefined>(undefined);