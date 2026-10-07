import { IAttendanceRegister, IAttendanceRegisterStateContext } from "@/providers/AttendanceRegisterProvider/context";
import { IVisitor, IVisitorStateContext } from "@/providers/VisitorProvider/context";
import {  ICreateVisitDto, IVisit, IVisitStateContext } from "@/providers/VisitProvider/context";

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

export interface ICheckInFormProps {
  checkInVisitor: (visitData: ICreateVisitDto) => Promise<void>;
  lookupVisitor: (emailAddress: string) => Promise<void>;
  visitorState: IVisitorStateContext;
  visitState: IVisitStateContext;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export type Stringify<T> = {
  [K in keyof T]: NonNullable<T[K]> extends object
    ? Stringify<NonNullable<T[K]>>
    : string;
};

export type CheckInFormErrors = Stringify<ICreateVisitDto>;

export const defaultFormValues : ICreateVisitDto = {
  visitor: {
    name: "",
    surname: "",
    contactNumber: "",
    emailAddress: "",
    dateOfBirth: "",
    sex: undefined,
    residence: undefined,
    wardNumber: undefined,
    sexuality: undefined,
    isCsg: false,
    visitorAddress: {
      street: "",
      suburb: "",
      city: "",
      postalCode: "",
      province: "",
      country: "",
    },
  },
  visitReason: undefined,
  attendanceRegisterId: undefined
};

export type CheckOutFormProps = {
  open: boolean;
  registerState: IAttendanceRegisterStateContext;
  visitorState: IVisitorStateContext;
  checkOutVisitor: (visitId: string) => Promise<void>;
  onOpenChange: (open: boolean) => void;
};

export type ListedVisit = { visit: IVisit; name: string; searchText: string };

export const PAGE_SIZE = 10;

export type AttendanceEntry = { visit: IVisit; visitor?: IVisitor };

export interface CheckedInVisitorsProps {
  entries: AttendanceEntry[];
  loading: boolean;
  onDetails: (entry: AttendanceEntry) => void;
  onCheckout: (entry: AttendanceEntry) => void;
}