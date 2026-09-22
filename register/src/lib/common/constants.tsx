import { IAttendanceRegister, IAttendanceRegisterStateContext } from "@/providers/AttendanceRegisterProvider/context";
import { IVisitor, IVisitorStateContext } from "@/providers/VisitorProvider/context";
import { ICheckin, IVisit, IVisitStateContext } from "@/providers/VisitProvider/context";

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
  checkInVisitor: (visitData: ICheckin) => Promise<void>;
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

export type CheckInFormErrors = Stringify<ICheckin>;

export const defaultFormValues : ICheckin = {
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
    isDisabled: false,
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

