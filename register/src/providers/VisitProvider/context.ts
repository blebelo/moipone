import { createContext } from "react";
import { IVisitor } from "../VisitorProvider/context";

// ==================== ENTITIES ====================
export interface IVisit {
  id?: string;
  checkinDate?: string;
  checkOutDate?: string;
  visitReason?: number;
  otherReason?: string;
  visitorId: string;
  attendanceRegisterId: number;
}

export interface ICreateVisitDto {
  id?: string;
  visitReason?: number;
  otherReason?: string;
  visitor: IVisitor;
  attendanceRegisterId?: number;
}

// ==================== VISIT CONTEXT ====================
export interface IVisitStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  visit?: IVisit;
  visits?: IVisit[];
}

export interface IVisitActionContext {
  create: (input: ICreateVisitDto) => Promise<void>;
  getAll: (skipCount: number, maxResultCount: number, sorting?: string) => Promise<void>;
  get: (id: string) => Promise<void>;
  update: (input: IVisit) => Promise<void>;
  checkIn: (input: IVisit) => Promise<void>;
  checkOut: (visitId: string) => Promise<void>;
  reset: () => void;
}

export const VisitStateContext = createContext<IVisitStateContext | undefined>(undefined);

export const VisitActionContext = createContext<IVisitActionContext | undefined>(undefined);