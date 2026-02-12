"use client";
import { createAction } from "redux-actions";
import { ICourseApplication, IApplicationStateContext } from "./context";
import { RequestState } from "@/src/lib/common/constants";

export enum ApplicationActionEnums {
  // Create Application
  createApplicationPending = "CREATE_APPLICATION_PENDING",
  createApplicationSuccess = "CREATE_APPLICATION_SUCCESS",
  createApplicationError = "CREATE_APPLICATION_ERROR",

  // Get All Applications
  getAllApplicationsPending = "GET_ALL_APPLICATIONS_PENDING",
  getAllApplicationsSuccess = "GET_ALL_APPLICATIONS_SUCCESS",
  getAllApplicationsError = "GET_ALL_APPLICATIONS_ERROR",

  // Get Application By ID
  getApplicationByIdPending = "GET_APPLICATION_BY_ID_PENDING",
  getApplicationByIdSuccess = "GET_APPLICATION_BY_ID_SUCCESS",
  getApplicationByIdError = "GET_APPLICATION_BY_ID_ERROR",

  // Update Application
  updateApplicationPending = "UPDATE_APPLICATION_PENDING",
  updateApplicationSuccess = "UPDATE_APPLICATION_SUCCESS",
  updateApplicationError = "UPDATE_APPLICATION_ERROR",

  // Delete Application
  deleteApplicationPending = "DELETE_APPLICATION_PENDING",
  deleteApplicationSuccess = "DELETE_APPLICATION_SUCCESS",
  deleteApplicationError = "DELETE_APPLICATION_ERROR",

  // Get Application By CourseId
  getApplicationsByCourseIdPending = "GET_APPLICATIONS_BY_COURSE_ID_PENDING",
  getApplicationsByCourseIdSuccess = "GET_APPLICATIONS_BY_COURSE_ID_SUCCESS",
  getApplicationsByCourseIdError = "GET_APPLICATIONS_BY_COURSE_ID_ERROR",

  // Approve Application
  approveApplicationPending = "APPROVE_APPLICATION_PENDING",
  approveApplicationSuccess = "APPROVE_APPLICATION_SUCCESS",
  approveApplicationError = "APPROVE_APPLICATION_ERROR",

  // Reject Application
  rejectApplicationPending = "REJECT_APPLICATION_PENDING",
  rejectApplicationSuccess = "REJECT_APPLICATION_SUCCESS",
  rejectApplicationError = "REJECT_APPLICATION_ERROR",
}

// ==================== CREATE APPLICATION ====================
export const createApplicationPending = createAction<IApplicationStateContext>(
  ApplicationActionEnums.createApplicationPending,
  () => RequestState.Pending,
);

export const createApplicationSuccess = createAction<
  IApplicationStateContext,
  ICourseApplication
>(ApplicationActionEnums.createApplicationSuccess, (application: ICourseApplication) => ({
  ...RequestState.Success,
  application,
}));

export const createApplicationError = createAction<IApplicationStateContext, string>(
  ApplicationActionEnums.createApplicationError,
  (error: string) => ({ ...RequestState.Error, error }),
);

// ==================== GET ALL APPLICATIONS ====================
export const getAllApplicationsPending = createAction<IApplicationStateContext>(
  ApplicationActionEnums.getAllApplicationsPending,
  () => RequestState.Pending,
);

export const getAllApplicationsSuccess = createAction<
  IApplicationStateContext,
  ICourseApplication[]
>(ApplicationActionEnums.getAllApplicationsSuccess, (applications: ICourseApplication[]) => ({
  ...RequestState.Success,
  applications,
}));

export const getAllApplicationsError = createAction<IApplicationStateContext, string>(
  ApplicationActionEnums.getAllApplicationsError,
  (error: string) => ({ ...RequestState.Error, error }),
);

// ==================== GET APPLICATION BY ID ====================
export const getApplicationByIdPending = createAction<IApplicationStateContext>(
  ApplicationActionEnums.getApplicationByIdPending,
  () => RequestState.Pending,
);

export const getApplicationByIdSuccess = createAction<
  IApplicationStateContext,
  ICourseApplication
>(ApplicationActionEnums.getApplicationByIdSuccess, (application: ICourseApplication) => ({
  ...RequestState.Success,
  application,
}));

export const getApplicationByIdError = createAction<IApplicationStateContext, string>(
  ApplicationActionEnums.getApplicationByIdError,
  (error: string) => ({ ...RequestState.Error, error }),
);

// ==================== UPDATE APPLICATION ====================
export const updateApplicationPending = createAction<IApplicationStateContext>(
  ApplicationActionEnums.updateApplicationPending,
  () => RequestState.Pending,
);

export const updateApplicationSuccess = createAction<
  IApplicationStateContext,
  ICourseApplication
>(ApplicationActionEnums.updateApplicationSuccess, (application: ICourseApplication) => ({
  ...RequestState.Success,
  application,
}));

export const updateApplicationError = createAction<IApplicationStateContext, string>(
  ApplicationActionEnums.updateApplicationError,
  (error: string) => ({ ...RequestState.Error, error }),
);

// ==================== DELETE APPLICATION ====================
export const deleteApplicationPending = createAction<IApplicationStateContext>(
  ApplicationActionEnums.deleteApplicationPending,
  () => RequestState.Pending,
);

export const deleteApplicationSuccess = createAction<IApplicationStateContext>(
  ApplicationActionEnums.deleteApplicationSuccess,
  () => RequestState.Success,
);

export const deleteApplicationError = createAction<IApplicationStateContext, string>(
  ApplicationActionEnums.deleteApplicationError,
  (error: string) => ({ ...RequestState.Error, error }),
);

// ==================== GET APPLICATIONS BY COURSE ====================
export const getApplicationsByCourseIdPending = createAction<IApplicationStateContext>(
  ApplicationActionEnums.getApplicationsByCourseIdPending,
  () => RequestState.Pending,
);

export const getApplicationsByCourseIdSuccess = createAction<
  IApplicationStateContext,
  ICourseApplication[]
>(ApplicationActionEnums.getApplicationsByCourseIdSuccess, (applications: ICourseApplication[]) => ({
  ...RequestState.Success,
  applications,
}));

export const getApplicationsByCourseIdError = createAction<IApplicationStateContext, string>(
  ApplicationActionEnums.getApplicationsByCourseIdError,
  (error: string) => ({ ...RequestState.Error, error }),
);

// ==================== APPROVE APPLICATION ====================
export const approveApplicationPending = createAction<IApplicationStateContext>(
  ApplicationActionEnums.approveApplicationPending,
  () => RequestState.Pending,
);

export const approveApplicationSuccess = createAction<
  IApplicationStateContext,
  ICourseApplication
>(ApplicationActionEnums.approveApplicationSuccess, (application: ICourseApplication) => ({
  ...RequestState.Success,
  application,
}));

export const approveApplicationError = createAction<IApplicationStateContext, string>(
  ApplicationActionEnums.approveApplicationError,
  (error: string) => ({ ...RequestState.Error, error }),
);

// ==================== REJECT APPLICATION ====================
export const rejectApplicationPending = createAction<IApplicationStateContext>(
  ApplicationActionEnums.rejectApplicationPending,
  () => RequestState.Pending,
);

export const rejectApplicationSuccess = createAction<
  IApplicationStateContext,
  ICourseApplication
>(ApplicationActionEnums.rejectApplicationSuccess, (application: ICourseApplication) => ({
  ...RequestState.Success,
  application,
}));

export const rejectApplicationError = createAction<IApplicationStateContext, string>(
  ApplicationActionEnums.rejectApplicationError,
  (error: string) => ({ ...RequestState.Error, error }),
);
