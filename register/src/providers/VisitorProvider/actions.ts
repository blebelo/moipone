"use client";

import { createAction } from "redux-actions";
import { IVisitorStateContext, IVisitor } from "./context";
import { INITIAL_STATE, RequestState } from "@/lib/common/constants";

export enum VisitorActionEnums {
  // Create
  createPending = "VISITOR_CREATE_PENDING",
  createSuccess = "VISITOR_CREATE_SUCCESS",
  createError = "VISITOR_CREATE_ERROR",

  // Get All
  getAllPending = "VISITOR_GET_ALL_PENDING",
  getAllSuccess = "VISITOR_GET_ALL_SUCCESS",
  getAllError = "VISITOR_GET_ALL_ERROR",

  // Get
  getPending = "VISITOR_GET_PENDING",
  getSuccess = "VISITOR_GET_SUCCESS",
  getError = "VISITOR_GET_ERROR",

  // Update
  updatePending = "VISITOR_UPDATE_PENDING",
  updateSuccess = "VISITOR_UPDATE_SUCCESS",
  updateError = "VISITOR_UPDATE_ERROR",

  // Lookup
  lookupPending = "VISITOR_LOOKUP_PENDING",
  lookupSuccess = "VISITOR_LOOKUP_SUCCESS",
  lookupError = "VISITOR_LOOKUP_ERROR",

  // Reset
  resetState = 'RESET_STATE'
}

// ==================== CREATE ====================
export const createPending = createAction<IVisitorStateContext>(
  VisitorActionEnums.createPending,
  () => RequestState.Pending,
);

export const createSuccess = createAction<IVisitorStateContext, IVisitor>(
  VisitorActionEnums.createSuccess,
  (visitor: IVisitor) => ({
    ...RequestState.Success,
    visitor
  }),
);

export const createError = createAction<IVisitorStateContext>(
  VisitorActionEnums.createError,
  () => RequestState.Error,
);

// ==================== GET ALL ====================
export const getAllPending = createAction<IVisitorStateContext>(
  VisitorActionEnums.getAllPending,
  () => RequestState.Pending,
);

export const getAllSuccess = createAction<IVisitorStateContext, IVisitor[]>(
  VisitorActionEnums.getAllSuccess,
  (visitors: IVisitor[]) => ({
    ...RequestState.Success,
    visitors
  }),
);

export const getAllError = createAction<IVisitorStateContext>(
  VisitorActionEnums.getAllError,
  () => RequestState.Error,
);

// ==================== GET ====================
export const getPending = createAction<IVisitorStateContext>(
  VisitorActionEnums.getPending,
  () => RequestState.Pending,
);

export const getSuccess = createAction<IVisitorStateContext, IVisitor>(
  VisitorActionEnums.getSuccess,
  (visitor: IVisitor) => ({
    ...RequestState.Success,
    visitor
  }),
);

export const getError = createAction<IVisitorStateContext>(
  VisitorActionEnums.getError,
  () => RequestState.Error,
);

// ==================== UPDATE ====================
export const updatePending = createAction<IVisitorStateContext>(
  VisitorActionEnums.updatePending,
  () => RequestState.Pending,
);

export const updateSuccess = createAction<IVisitorStateContext, IVisitor>(
  VisitorActionEnums.updateSuccess,
  (visitor: IVisitor) => ({
    ...RequestState.Success,
    visitor
  }),
);

export const updateError = createAction<IVisitorStateContext>(
  VisitorActionEnums.updateError,
  () => RequestState.Error,
);

// ==================== LOOKUP ====================
export const lookupPending = createAction<IVisitorStateContext>(
  VisitorActionEnums.lookupPending,
  () => RequestState.Pending,
);

export const lookupSuccess = createAction<IVisitorStateContext, IVisitor>(
  VisitorActionEnums.lookupSuccess,
  (visitor: IVisitor) => ({
    ...RequestState.Success,
    visitor
  }),
);

export const lookupError = createAction<IVisitorStateContext>(
  VisitorActionEnums.lookupError,
  () => RequestState.Error,
);

// ==================== RESET ====================
export const resetState = createAction<IVisitorStateContext>(
  VisitorActionEnums.resetState,
  () => INITIAL_STATE,
);