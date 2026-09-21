import { IAttendanceRegister, IAttendanceRegisterStateContext } from "@/providers/AttendanceRegisterProvider/context";
import { IVisitor, IVisitorStateContext } from "@/providers/VisitorProvider/context";
import { IVisit, IVisitStateContext } from "@/providers/VisitProvider/context";

export const RequestState = {
  Pending: { isPending: true, isSuccess: false, isError: false, error: undefined },
  Success: { isPending: false, isSuccess: true, isError: false , error: undefined},
  Error: { isPending: false, isSuccess: false, isError: true },
};

export const INITIAL_STATE = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export type StateMap =
  | IAttendanceRegisterStateContext
  | IVisitStateContext
  | IVisitorStateContext
  ;

export type EntityMap =
  | IAttendanceRegister
  | IVisit
  | IVisitor
  ;
