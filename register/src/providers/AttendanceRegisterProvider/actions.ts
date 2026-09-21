import { createAction } from "redux-actions";
import { IAttendanceRegisterStateContext, IAttendanceRegister } from "./context";
import { RequestState } from "@/lib/common/constants";


export enum AttendanceRegisterActionEnums {
  // Create
  createPending = "ATTENDANCE_REGISTER_CREATE_PENDING",
  createSuccess = "ATTENDANCE_REGISTER_CREATE_SUCCESS",
  createError = "ATTENDANCE_REGISTER_CREATE_ERROR",

  // Get All
  getAllPending = "ATTENDANCE_REGISTER_GET_ALL_PENDING",
  getAllSuccess = "ATTENDANCE_REGISTER_GET_ALL_SUCCESS",
  getAllError = "ATTENDANCE_REGISTER_GET_ALL_ERROR",

  // Get
  getPending = "ATTENDANCE_REGISTER_GET_PENDING",
  getSuccess = "ATTENDANCE_REGISTER_GET_SUCCESS",
  getError = "ATTENDANCE_REGISTER_GET_ERROR",

  // Get Today
  getTodayPending = "ATTENDANCE_REGISTER_GET_TODAY_PENDING",
  getTodaySuccess = "ATTENDANCE_REGISTER_GET_TODAY_SUCCESS",
  getTodayError = "ATTENDANCE_REGISTER_GET_TODAY_ERROR",

  // Close
  closePending = "ATTENDANCE_REGISTER_CLOSE_PENDING",
  closeSuccess = "ATTENDANCE_REGISTER_CLOSE_SUCCESS",
  closeError = "ATTENDANCE_REGISTER_CLOSE_ERROR",

  // Reopen
  reopenPending = "ATTENDANCE_REGISTER_REOPEN_PENDING",
  reopenSuccess = "ATTENDANCE_REGISTER_REOPEN_SUCCESS",
  reopenError = "ATTENDANCE_REGISTER_REOPEN_ERROR",
}

// ==================== CREATE ====================
export const createPending = createAction<IAttendanceRegisterStateContext>(
  AttendanceRegisterActionEnums.createPending,
  () => RequestState.Pending,
);

export const createSuccess = createAction<IAttendanceRegisterStateContext, IAttendanceRegister>(
  AttendanceRegisterActionEnums.createSuccess,
  (attendanceRegister: IAttendanceRegister) => ({
    ...RequestState.Success,
    attendanceRegister
  }),
);

export const createError = createAction<IAttendanceRegisterStateContext>(
  AttendanceRegisterActionEnums.createError,
  () => RequestState.Error,
);

// ==================== GET ALL ====================
export const getAllPending = createAction<IAttendanceRegisterStateContext>(
  AttendanceRegisterActionEnums.getAllPending,
  () => RequestState.Pending,
);

export const getAllSuccess = createAction<IAttendanceRegisterStateContext, IAttendanceRegister[]>(
  AttendanceRegisterActionEnums.getAllSuccess,
  (attendanceRegisters: IAttendanceRegister[]) => ({
    ...RequestState.Success,
    attendanceRegisters
  }),
);

export const getAllError = createAction<IAttendanceRegisterStateContext>(
  AttendanceRegisterActionEnums.getAllError,
  () => RequestState.Error,
);

// ==================== GET ====================
export const getPending = createAction<IAttendanceRegisterStateContext>(
  AttendanceRegisterActionEnums.getPending,
  () => RequestState.Pending,
);

export const getSuccess = createAction<IAttendanceRegisterStateContext, IAttendanceRegister>(
  AttendanceRegisterActionEnums.getSuccess,
  (attendanceRegister: IAttendanceRegister) => ({
    ...RequestState.Success,
    attendanceRegister
  }),
);

export const getError = createAction<IAttendanceRegisterStateContext>(
  AttendanceRegisterActionEnums.getError,
  () => RequestState.Error,
);

// ==================== GET TODAY ====================
export const getTodayPending = createAction<IAttendanceRegisterStateContext>(
  AttendanceRegisterActionEnums.getTodayPending,
  () => RequestState.Pending,
);

export const getTodaySuccess = createAction<IAttendanceRegisterStateContext, IAttendanceRegister>(
  AttendanceRegisterActionEnums.getTodaySuccess,
  (attendanceRegister: IAttendanceRegister) => ({
    ...RequestState.Success,
    attendanceRegister
  }),
);

export const getTodayError = createAction<IAttendanceRegisterStateContext>(
  AttendanceRegisterActionEnums.getTodayError,
  () => RequestState.Error,
);

// ==================== CLOSE ====================
export const closePending = createAction<IAttendanceRegisterStateContext>(
  AttendanceRegisterActionEnums.closePending,
  () => RequestState.Pending,
);

export const closeSuccess = createAction<IAttendanceRegisterStateContext, IAttendanceRegister>(
  AttendanceRegisterActionEnums.closeSuccess,
  (attendanceRegister: IAttendanceRegister) => ({
    ...RequestState.Success,
    attendanceRegister
  }),
);

export const closeError = createAction<IAttendanceRegisterStateContext>(
  AttendanceRegisterActionEnums.closeError,
  () => RequestState.Error,
);

// ==================== REOPEN ====================
export const reopenPending = createAction<IAttendanceRegisterStateContext>(
  AttendanceRegisterActionEnums.reopenPending,
  () => RequestState.Pending,
);

export const reopenSuccess = createAction<IAttendanceRegisterStateContext, IAttendanceRegister>(
  AttendanceRegisterActionEnums.reopenSuccess,
  (attendanceRegister: IAttendanceRegister) => ({
    ...RequestState.Success,
    attendanceRegister
  }),
);

export const reopenError = createAction<IAttendanceRegisterStateContext>(
  AttendanceRegisterActionEnums.reopenError,
  () => RequestState.Error,
);