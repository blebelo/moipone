import { INITIAL_STATE } from "@/lib/common/constants";
import { mergePayloadHandler } from "@/lib/common/helper-methods";
import { handleActions } from "redux-actions";
import { VisitorActionEnums } from "./actions";
import { IVisitorStateContext } from "./context";

export const VisitorReducer = handleActions<IVisitorStateContext, IVisitorStateContext>(
  {
    // Create
    [VisitorActionEnums.createPending]: mergePayloadHandler,
    [VisitorActionEnums.createSuccess]: mergePayloadHandler,
    [VisitorActionEnums.createError]: mergePayloadHandler,

    // Get All
    [VisitorActionEnums.getAllPending]: mergePayloadHandler,
    [VisitorActionEnums.getAllSuccess]: mergePayloadHandler,
    [VisitorActionEnums.getAllError]: mergePayloadHandler,

    // Get
    [VisitorActionEnums.getPending]: mergePayloadHandler,
    [VisitorActionEnums.getSuccess]: mergePayloadHandler,
    [VisitorActionEnums.getError]: mergePayloadHandler,

    // Update
    [VisitorActionEnums.updatePending]: mergePayloadHandler,
    [VisitorActionEnums.updateSuccess]: mergePayloadHandler,
    [VisitorActionEnums.updateError]: mergePayloadHandler,

    // Lookup
    [VisitorActionEnums.lookupPending]: mergePayloadHandler,
    [VisitorActionEnums.lookupSuccess]: mergePayloadHandler,
    [VisitorActionEnums.lookupError]: mergePayloadHandler,

    // Reset
    [VisitorActionEnums.resetState]: mergePayloadHandler,
  },
  INITIAL_STATE
);