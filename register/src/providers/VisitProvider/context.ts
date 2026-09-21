import { INITIAL_STATE } from "@/lib/common/constants";
import { createContext } from "react";

// ==================== ENTITIES ====================
export interface IVisit {
  id?: string;
  checkinDate?: string;
  checkOutDate?: string;
  visitReason: string;
  otherReason?: string;
  visitorId: string;
  attendanceRegisterId: number;
}

export interface ICheckin {
  id?: string;
  visitReason: string;
  otherReason?: string;
  visitor?: [];
  attendanceRegisterId: number;
}

// ==================== VISIT CONTEXT ====================
export interface IVisitStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  visit?: IVisit;
}

export interface IVisitActionContext {
  create: (input: IVisit) => Promise<void>;
  getAll: (skipCount: number, maxResultCount: number, sorting?: string) => Promise<void>;
  get: (id: string) => Promise<void>;
  update: (input: IVisit) => Promise<void>;
  checkIn: (input: ICheckin) => Promise<void>;
  checkOut: (visitId: string) => Promise<void>;
}

export const VisitStateContext = createContext<IVisitStateContext>(INITIAL_STATE);

export const VisitActionContext = createContext<IVisitActionContext | undefined>(undefined);