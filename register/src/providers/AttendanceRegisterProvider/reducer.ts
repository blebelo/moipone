import { handleActions } from "redux-actions";
import { AttendanceRegisterActionEnums } from "./actions";
import { IAttendanceRegisterStateContext } from "./context";
import { mergePayloadHandler } from "@/lib/common/helper-methods";
import { INITIAL_STATE } from "@/lib/common/constants";

export const AttendanceRegisterReducer = handleActions<IAttendanceRegisterStateContext, IAttendanceRegisterStateContext>(
  {
    // Create
    [AttendanceRegisterActionEnums.createPending]: mergePayloadHandler,
    [AttendanceRegisterActionEnums.createSuccess]: mergePayloadHandler,
    [AttendanceRegisterActionEnums.createError]: mergePayloadHandler,

    // Get All
    [AttendanceRegisterActionEnums.getAllPending]: mergePayloadHandler,
    [AttendanceRegisterActionEnums.getAllSuccess]: mergePayloadHandler,
    [AttendanceRegisterActionEnums.getAllError]: mergePayloadHandler,

    // Get
    [AttendanceRegisterActionEnums.getPending]: mergePayloadHandler,
    [AttendanceRegisterActionEnums.getSuccess]: mergePayloadHandler,
    [AttendanceRegisterActionEnums.getError]: mergePayloadHandler,

    // Get Today
    [AttendanceRegisterActionEnums.getTodayPending]: mergePayloadHandler,
    [AttendanceRegisterActionEnums.getTodaySuccess]: mergePayloadHandler,
    [AttendanceRegisterActionEnums.getTodayError]: mergePayloadHandler,

    // Close
    [AttendanceRegisterActionEnums.closePending]: mergePayloadHandler,
    [AttendanceRegisterActionEnums.closeSuccess]: mergePayloadHandler,
    [AttendanceRegisterActionEnums.closeError]: mergePayloadHandler,

    // Reopen
    [AttendanceRegisterActionEnums.reopenPending]: mergePayloadHandler,
    [AttendanceRegisterActionEnums.reopenSuccess]: mergePayloadHandler,
    [AttendanceRegisterActionEnums.reopenError]: mergePayloadHandler,
  },
  INITIAL_STATE
);