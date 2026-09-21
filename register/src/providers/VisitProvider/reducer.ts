import { handleActions } from "redux-actions";
import { VisitActionEnums } from "./actions";
import { IVisitStateContext } from "./context";
import { mergePayloadHandler } from "@/lib/common/helper-methods";
import { INITIAL_STATE } from "@/lib/common/constants";
;

export const VisitReducer = handleActions<IVisitStateContext, IVisitStateContext>(
  {
    // Create
    [VisitActionEnums.createPending]: mergePayloadHandler,
    [VisitActionEnums.createSuccess]: mergePayloadHandler,
    [VisitActionEnums.createError]: mergePayloadHandler,

    // Get All
    [VisitActionEnums.getAllPending]: mergePayloadHandler,
    [VisitActionEnums.getAllSuccess]: mergePayloadHandler,
    [VisitActionEnums.getAllError]: mergePayloadHandler,

    // Get
    [VisitActionEnums.getPending]: mergePayloadHandler,
    [VisitActionEnums.getSuccess]: mergePayloadHandler,
    [VisitActionEnums.getError]: mergePayloadHandler,

    // Update
    [VisitActionEnums.updatePending]: mergePayloadHandler,
    [VisitActionEnums.updateSuccess]: mergePayloadHandler,
    [VisitActionEnums.updateError]: mergePayloadHandler,

    // Delete
    [VisitActionEnums.deletePending]: mergePayloadHandler,
    [VisitActionEnums.deleteSuccess]: mergePayloadHandler,
    [VisitActionEnums.deleteError]: mergePayloadHandler,

    // Check In
    [VisitActionEnums.checkInPending]: mergePayloadHandler,
    [VisitActionEnums.checkInSuccess]: mergePayloadHandler,
    [VisitActionEnums.checkInError]: mergePayloadHandler,

    // Check Out
    [VisitActionEnums.checkOutPending]: mergePayloadHandler,
    [VisitActionEnums.checkOutSuccess]: mergePayloadHandler,
    [VisitActionEnums.checkOutError]: mergePayloadHandler,
  },
  INITIAL_STATE
);