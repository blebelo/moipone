"use client";
import React, { useContext, useReducer } from "react";
import { ContactActionContext, ContactStateContext, IContact } from "./context";
import {
  createContactPending,
  createContactSuccess,
  createContactError,
  getAllContactsPending,
  getAllContactsSuccess,
  getAllContactsError,
  getContactByIdPending,
  getContactByIdSuccess,
  getContactByIdError,
  updateContactPending,
  updateContactSuccess,
  updateContactError,
  deleteContactPending,
  deleteContactSuccess,
  deleteContactError,
} from "./actions";
import { axiosInstance } from "../../lib/utils/axiosInstance";
import { ContactReducer } from "./reducer";
import { INITIAL_STATE } from "@/src/lib/common/constants";

export const ContactProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(ContactReducer, INITIAL_STATE);
  const instance = axiosInstance();

  const createContact = async (contact?: IContact) => {
    dispatch(createContactPending());
    const endpoint = "Contact/Create";

    await instance
      .post(endpoint, contact)
      .then((response) => {
        dispatch(createContactSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(createContactError(err.message));
        throw err;
      });
  };

  const getAllContacts = async () => {
    dispatch(getAllContactsPending());
    const endpoint = "Contact/GetAll";

    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getAllContactsSuccess(response.data.result.items));
      })
      .catch((err) => {
        dispatch(getAllContactsError(err.message));
      });
  };

  const getContactById = async (id?: string) => {
    dispatch(getContactByIdPending());
    const endpoint = `Contact/Get?Id=${id}`;

    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getContactByIdSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(getContactByIdError(err.message));
      });
  };

  const updateContact = async (id?: string, contact?: IContact) => {
    dispatch(updateContactPending());
    const endpoint = "Contact/Update";

    await instance
      .put(endpoint, { ...contact, id })
      .then((response) => {
        dispatch(updateContactSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(updateContactError(err.message));
      });
  };

  const deleteContact = async (id?: string) => {
    dispatch(deleteContactPending());
    const endpoint = `Contact/Delete?Id=${id}`;

    await instance
      .delete(endpoint)
      .then(() => {
        dispatch(deleteContactSuccess());
      })
      .catch((err) => {
        dispatch(deleteContactError(err.message));
      });
  };

  return (
    <ContactActionContext.Provider
      value={{
        createContact,
        getAllContacts,
        getContactById,
        updateContact,
        deleteContact,
      }}
    >
      <ContactStateContext.Provider value={state}>
        {children}
      </ContactStateContext.Provider>
    </ContactActionContext.Provider>
  );
};

export const useContactState = () => {
  const context = useContext(ContactStateContext);
  if (!context) {
    throw new Error("useContactState must be used within a ContactProvider");
  }
  return context;
};

export const useContactActions = () => {
  const context = useContext(ContactActionContext);
  if (!context) {
    throw new Error("useContactActions must be used within a ContactProvider");
  }
  return context;
};
