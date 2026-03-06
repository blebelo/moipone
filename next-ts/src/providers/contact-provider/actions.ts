'use client'
import { createAction } from "redux-actions";
import { IContact, IContactStateContext } from "./context";
import { RequestState } from "@/src/lib/common/constants";

export enum ContactActionEnums {
  // Create Contact
  createContactPending = "CREATE_CONTACT_PENDING",
  createContactSuccess = "CREATE_CONTACT_SUCCESS",
  createContactError = "CREATE_CONTACT_ERROR",

  // Get All Contacts
  getAllContactsPending = "GET_ALL_CONTACTS_PENDING",
  getAllContactsSuccess = "GET_ALL_CONTACTS_SUCCESS",
  getAllContactsError = "GET_ALL_CONTACTS_ERROR",

  // Get Contact By ID
  getContactByIdPending = "GET_CONTACT_BY_ID_PENDING",
  getContactByIdSuccess = "GET_CONTACT_BY_ID_SUCCESS",
  getContactByIdError = "GET_CONTACT_BY_ID_ERROR",

  // Update Contact
  updateContactPending = "UPDATE_CONTACT_PENDING",
  updateContactSuccess = "UPDATE_CONTACT_SUCCESS",
  updateContactError = "UPDATE_CONTACT_ERROR",

  // Delete Contact
  deleteContactPending = "DELETE_CONTACT_PENDING",
  deleteContactSuccess = "DELETE_CONTACT_SUCCESS",
  deleteContactError = "DELETE_CONTACT_ERROR",
}

// ==================== CREATE CONTACT ====================
export const createContactPending = createAction<IContactStateContext>(
  ContactActionEnums.createContactPending,
  () => RequestState.Pending,
);

export const createContactSuccess = createAction<IContactStateContext, IContact>(
  ContactActionEnums.createContactSuccess,
  (contact: IContact) => ({
    ...RequestState.Success,
    contact,
  }),
);

export const createContactError = createAction<IContactStateContext, string>(
  ContactActionEnums.createContactError,
  (error: string) => ({ ...RequestState.Error, error }),
);

// ==================== GET ALL CONTACTS ====================
export const getAllContactsPending = createAction<IContactStateContext>(
  ContactActionEnums.getAllContactsPending,
  () => RequestState.Pending,
);

export const getAllContactsSuccess = createAction<IContactStateContext, IContact[]>(
  ContactActionEnums.getAllContactsSuccess,
  (contacts: IContact[]) => ({
    ...RequestState.Success,
    contacts,
  }),
);

export const getAllContactsError = createAction<IContactStateContext, string>(
  ContactActionEnums.getAllContactsError,
  (error: string) => ({ ...RequestState.Error, error }),
);

// ==================== GET CONTACT BY ID ====================
export const getContactByIdPending = createAction<IContactStateContext>(
  ContactActionEnums.getContactByIdPending,
  () => RequestState.Pending,
);

export const getContactByIdSuccess = createAction<IContactStateContext, IContact>(
  ContactActionEnums.getContactByIdSuccess,
  (contact: IContact) => ({
    ...RequestState.Success,
    contact,
  }),
);

export const getContactByIdError = createAction<IContactStateContext, string>(
  ContactActionEnums.getContactByIdError,
  (error: string) => ({ ...RequestState.Error, error }),
);

// ==================== UPDATE CONTACT ====================
export const updateContactPending = createAction<IContactStateContext>(
  ContactActionEnums.updateContactPending,
  () => RequestState.Pending,
);

export const updateContactSuccess = createAction<IContactStateContext, IContact>(
  ContactActionEnums.updateContactSuccess,
  (contact: IContact) => ({
    ...RequestState.Success,
    contact,
  }),
);

export const updateContactError = createAction<IContactStateContext, string>(
  ContactActionEnums.updateContactError,
  (error: string) => ({ ...RequestState.Error, error }),
);

// ==================== DELETE CONTACT ====================
export const deleteContactPending = createAction<IContactStateContext>(
  ContactActionEnums.deleteContactPending,
  () => RequestState.Pending,
);

export const deleteContactSuccess = createAction<IContactStateContext>(
  ContactActionEnums.deleteContactSuccess,
  () => RequestState.Success,
);

export const deleteContactError = createAction<IContactStateContext, string>(
  ContactActionEnums.deleteContactError,
  (error: string) => ({ ...RequestState.Error, error }),
);
