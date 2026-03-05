'use client'
import { handleActions } from "redux-actions";
import { ApplicationActionEnums } from "./actions";
import { INITIAL_STATE } from "@/src/lib/common/constants";
import { IApplicationStateContext } from "./context";
import { mergePayloadHandler } from "@/src/lib/common/helper-methods";

export const ApplicationReducer = handleActions<
  IApplicationStateContext,
  IApplicationStateContext
>(
  {
    // Reset Application State
    [ApplicationActionEnums.resetApplicationState]: () => INITIAL_STATE,

    // Create Application
    [ApplicationActionEnums.createApplicationPending]: mergePayloadHandler,
    [ApplicationActionEnums.createApplicationSuccess]: mergePayloadHandler,
    [ApplicationActionEnums.createApplicationError]: mergePayloadHandler,

    // Get All Applications
    [ApplicationActionEnums.getAllApplicationsPending]: mergePayloadHandler,
    [ApplicationActionEnums.getAllApplicationsSuccess]: mergePayloadHandler,
    [ApplicationActionEnums.getAllApplicationsError]: mergePayloadHandler,

    // Get Application By ID
    [ApplicationActionEnums.getApplicationByIdPending]: mergePayloadHandler,
    [ApplicationActionEnums.getApplicationByIdSuccess]: mergePayloadHandler,
    [ApplicationActionEnums.getApplicationByIdError]: mergePayloadHandler,

    // Update Application
    [ApplicationActionEnums.updateApplicationPending]: mergePayloadHandler,
    [ApplicationActionEnums.updateApplicationSuccess]: mergePayloadHandler,
    [ApplicationActionEnums.updateApplicationError]: mergePayloadHandler,

    // Delete Application
    [ApplicationActionEnums.deleteApplicationPending]: mergePayloadHandler,
    [ApplicationActionEnums.deleteApplicationSuccess]: mergePayloadHandler,
    [ApplicationActionEnums.deleteApplicationError]: mergePayloadHandler,

    // Get Application By CourseId
    [ApplicationActionEnums.getApplicationsByCourseIdPending]: mergePayloadHandler,
    [ApplicationActionEnums.getApplicationsByCourseIdSuccess]: mergePayloadHandler,
    [ApplicationActionEnums.getApplicationsByCourseIdError]: mergePayloadHandler,

    // Approve Application
    [ApplicationActionEnums.approveApplicationPending]: mergePayloadHandler,
    [ApplicationActionEnums.approveApplicationSuccess]: mergePayloadHandler,
    [ApplicationActionEnums.approveApplicationError]: mergePayloadHandler,

    // Reject Application
    [ApplicationActionEnums.rejectApplicationPending]: mergePayloadHandler,
    [ApplicationActionEnums.rejectApplicationSuccess]: mergePayloadHandler,
    [ApplicationActionEnums.rejectApplicationError]: mergePayloadHandler,
  },
  INITIAL_STATE
);
