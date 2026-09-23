"use client";

import { createAction } from "redux-actions";
import { IVisitStateContext, IVisit } from "./context";
import { INITIAL_STATE, RequestState } from "@/lib/common/constants";

export enum VisitActionEnums {
  // Create
  createPending = "VISIT_CREATE_PENDING",
  createSuccess = "VISIT_CREATE_SUCCESS",
  createError = "VISIT_CREATE_ERROR",

  // Get All
  getAllPending = "VISIT_GET_ALL_PENDING",
  getAllSuccess = "VISIT_GET_ALL_SUCCESS",
  getAllError = "VISIT_GET_ALL_ERROR",

  // Get
  getPending = "VISIT_GET_PENDING",
  getSuccess = "VISIT_GET_SUCCESS",
  getError = "VISIT_GET_ERROR",

  // Update
  updatePending = "VISIT_UPDATE_PENDING",
  updateSuccess = "VISIT_UPDATE_SUCCESS",
  updateError = "VISIT_UPDATE_ERROR",

  // Delete
  deletePending = "VISIT_DELETE_PENDING",
  deleteSuccess = "VISIT_DELETE_SUCCESS",
  deleteError = "VISIT_DELETE_ERROR",

  // Check In
  checkInPending = "VISIT_CHECK_IN_PENDING",
  checkInSuccess = "VISIT_CHECK_IN_SUCCESS",
  checkInError = "VISIT_CHECK_IN_ERROR",

  // Check Out
  checkOutPending = "VISIT_CHECK_OUT_PENDING",
  checkOutSuccess = "VISIT_CHECK_OUT_SUCCESS",
  checkOutError = "VISIT_CHECK_OUT_ERROR",

  // Reset
  resetState = 'RESET_STATE'
}

// ==================== CREATE ====================
export const createPending = createAction<IVisitStateContext>(
  VisitActionEnums.createPending,
  () => RequestState.Pending,
);

export const createSuccess = createAction<IVisitStateContext, IVisit>(
  VisitActionEnums.createSuccess,
  (visit: IVisit) => ({
    ...RequestState.Success,
    visit
  }),
);

export const createError = createAction<IVisitStateContext>(
  VisitActionEnums.createError,
  () => RequestState.Error,
);

// ==================== GET ALL ====================
export const getAllPending = createAction<IVisitStateContext>(
  VisitActionEnums.getAllPending,
  () => RequestState.Pending,
);

export const getAllSuccess = createAction<IVisitStateContext, IVisit[]>(
  VisitActionEnums.getAllSuccess,
  (visits: IVisit[]) => ({
    ...RequestState.Success,
    visits
  }),
);

export const getAllError = createAction<IVisitStateContext>(
  VisitActionEnums.getAllError,
  () => RequestState.Error,
);

// ==================== GET ====================
export const getPending = createAction<IVisitStateContext>(
  VisitActionEnums.getPending,
  () => RequestState.Pending,
);

export const getSuccess = createAction<IVisitStateContext, IVisit>(
  VisitActionEnums.getSuccess,
  (visit: IVisit) => ({
    ...RequestState.Success,
    visit
  }),
);

export const getError = createAction<IVisitStateContext>(
  VisitActionEnums.getError,
  () => RequestState.Error,
);

// ==================== UPDATE ====================
export const updatePending = createAction<IVisitStateContext>(
  VisitActionEnums.updatePending,
  () => RequestState.Pending,
);

export const updateSuccess = createAction<IVisitStateContext, IVisit>(
  VisitActionEnums.updateSuccess,
  (visit: IVisit) => ({
    ...RequestState.Success,
    visit
  }),
);

export const updateError = createAction<IVisitStateContext>(
  VisitActionEnums.updateError,
  () => RequestState.Error,
);

// ==================== DELETE ====================
export const deletePending = createAction<IVisitStateContext>(
  VisitActionEnums.deletePending,
  () => RequestState.Pending,
);

export const deleteSuccess = createAction<IVisitStateContext>(
  VisitActionEnums.deleteSuccess,
  () => RequestState.Success,
);

export const deleteError = createAction<IVisitStateContext>(
  VisitActionEnums.deleteError,
  () => RequestState.Error,
);

// ==================== CHECK IN ====================
export const checkInPending = createAction<IVisitStateContext>(
  VisitActionEnums.checkInPending,
  () => RequestState.Pending,
);

export const checkInSuccess = createAction<IVisitStateContext, IVisit>(
  VisitActionEnums.checkInSuccess,
  (visit: IVisit) => ({
    ...RequestState.Success,
    visit
  }),
);

export const checkInError = createAction<IVisitStateContext>(
  VisitActionEnums.checkInError,
  () => RequestState.Error,
);

// ==================== CHECK OUT ====================
export const checkOutPending = createAction<IVisitStateContext>(
  VisitActionEnums.checkOutPending,
  () => RequestState.Pending,
);

export const checkOutSuccess = createAction<IVisitStateContext, IVisit>(
  VisitActionEnums.checkOutSuccess,
  (visit: IVisit) => ({
    ...RequestState.Success,
    visit
  }),
);

export const checkOutError = createAction<IVisitStateContext>(
  VisitActionEnums.checkOutError,
  () => RequestState.Error,
);

// ==================== RESET ====================
export const resetState = createAction<IVisitStateContext>(
  VisitActionEnums.resetState,
  () => ({...INITIAL_STATE, visit: undefined}),
);
