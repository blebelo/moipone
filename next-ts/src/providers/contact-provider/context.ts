import { INITIAL_STATE } from "@/src/lib/common/constants";
import { createContext } from "react";

// ==================== ENTITIES ====================
export interface IContact {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

// ==================== CONTACT CONTEXT ====================
export interface IContactStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: string;
  contact?: IContact;
  contacts?: IContact[];
  totalContactCount?: number;
}

export interface IContactActionContext {
  createContact: (contact?: IContact) => Promise<void>;
  getAllContacts: () => Promise<void>;
  getContactById: (id?: string) => Promise<void>;
  updateContact: (id?: string, contact?: IContact) => Promise<void>;
  deleteContact: (id?: string) => Promise<void>;
}

export const ContactStateContext =
  createContext<IContactStateContext>(INITIAL_STATE);
export const ContactActionContext =
  createContext<IContactActionContext | undefined>(undefined);
