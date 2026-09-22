import { IVisit } from "@/providers/VisitProvider/context";
import { createContext } from "react";

// ==================== ENTITIES ====================
export interface IAddress {
  id?: string;
  street?: string;
  suburb?: string;
  city?: string;
  postalCode?: string;
  province?: string;
  country?: string;
}

export interface IVisitor {
  id?: string;
  name?: string;
  surname?: string;
  visitorAddress?: IAddress;
  contactNumber?: string;
  emailAddress?: string;
  wardNumber?: number;
  sexuality?: number;
  dateOfBirth: string;
  residence?: number;
  sex?: number;
  isDisabled: boolean;
  isCsg: boolean;
  visits?: IVisit[];
}

// ==================== VISITOR CONTEXT ====================
export interface IVisitorStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  visitor?: IVisitor;
  visitors?: IVisitor[];
}

export interface IVisitorActionContext {
  create: (input: IVisitor) => Promise<void>;
  getAll: (skipCount: number, maxResultCount: number, sorting?: string) => Promise<void>;
  get: (id: string) => Promise<void>;
  update: (input: IVisitor) => Promise<void>;
  lookup: (emailAddress: string) => Promise<void>;
}

export const VisitorStateContext = createContext<IVisitorStateContext | undefined>(undefined);

export const VisitorActionContext = createContext<IVisitorActionContext | undefined>(undefined);