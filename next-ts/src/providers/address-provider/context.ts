import { INITIAL_STATE } from "@/src/lib/common/constants";
import { createContext } from "react";

// ==================== ENTITIES ====================
export interface IAddress {
  id?: string;
  street: string;
  suburb: string;
  city: string;
  postalCode: string;
}

// ==================== ADDRESS CONTEXT ====================
export interface IAddressStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: string;
  address?: IAddress;
  addresses?: IAddress[];
  totalAddressCount?: number;
}

export interface IAddressActionContext {
  createAddress: (address: IAddress) => Promise<void>;
  getAllAddresses: () => Promise<void>;
  getAddressById: (id: string) => Promise<void>;
  updateAddress: (id: string, address: IAddress) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
}


export const AddressStateContext = createContext<IAddressStateContext>(INITIAL_STATE);
export const AddressActionContext = createContext<IAddressActionContext | undefined>(undefined);