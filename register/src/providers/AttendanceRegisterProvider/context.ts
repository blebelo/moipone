import { createContext } from "react";
import { IVisit } from "../VisitProvider/context";
import { IVisitor } from "../VisitorProvider/context";

// ==================== ENTITIES ====================

export interface IAttendanceRegister {
  id?: number;
  date: string;
  isClosed: boolean;
  visits?: IVisit[];
}

// ==================== ATTENDANCE REGISTER CONTEXT ====================

export interface IAttendanceRegisterStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  attendanceRegister?: IAttendanceRegister;
  attendanceRegisters?: IAttendanceRegister[];
  // visits?: IVisit[];
  // visitors?: IVisitor[];
}

export interface IAttendanceRegisterActionContext {
  create: (input: IAttendanceRegister) => Promise<void>;
  getAll: (skipCount: number, maxResultCount: number, sorting?: string) => Promise<void>;
  get: (id: number) => Promise<void>;
  getToday: () => Promise<void>;
  close: (id: number) => Promise<void>;
  reopen: (id: number) => Promise<void>;
}

export const AttendanceRegisterStateContext = createContext<IAttendanceRegisterStateContext | undefined>(undefined);

export const AttendanceRegisterActionContext =createContext<IAttendanceRegisterActionContext | undefined>(undefined);