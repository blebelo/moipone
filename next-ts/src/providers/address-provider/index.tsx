"use client";
import React, { useContext, useReducer } from "react";
import { AddressActionContext, AddressStateContext, IAddress } from "./context";
import {
  createAddressPending,
  createAddressSuccess,
  createAddressError,
  getAllAddressesPending,
  getAllAddressesSuccess,
  getAllAddressesError,
  getAddressByIdPending,
  getAddressByIdSuccess,
  getAddressByIdError,
  updateAddressPending,
  updateAddressSuccess,
  updateAddressError,
  deleteAddressPending,
  deleteAddressSuccess,
  deleteAddressError,
} from "./actions";
import { axiosInstance } from "../../lib/utils/axiosInstance";
import { AddressReducer } from "./reducer";
import { INITIAL_STATE } from "@/src/lib/common/constants";


export const AddressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(AddressReducer, INITIAL_STATE);
  const instance = axiosInstance();

  const createAddress = async (address?: IAddress) => {
    dispatch(createAddressPending());
    const endpoint = "Address/Create";

    await instance
      .post(endpoint, address)
      .then((response) => {
        dispatch(createAddressSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(createAddressError(err.message));
      });
  };

  const getAllAddresses = async () => {
    dispatch(getAllAddressesPending());
    const endpoint = "Address/GetAll";
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getAllAddressesSuccess(response.data.result.items));
      })
      .catch((err) => {
        dispatch(getAllAddressesError(err.message));
      });
  };

  const getAddressById = async (id?: string) => {
    dispatch(getAddressByIdPending());
    const endpoint = `Address/Get?Id=${id}`;

    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getAddressByIdSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(getAddressByIdError(err.message));
      });
  };

  const updateAddress = async (id?: string, address?: IAddress) => {
    dispatch(updateAddressPending());
    const endpoint = "Address/Update";

    await instance
      .put(endpoint, { ...address, id })
      .then((response) => {
        dispatch(updateAddressSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(updateAddressError(err.message));
      });
  };

  const deleteAddress = async (id?: string) => {
    dispatch(deleteAddressPending());
    const endpoint = `Address/Delete?Id=${id}`;

    await instance
      .delete(endpoint)
      .then(() => {
        dispatch(deleteAddressSuccess());
      })
      .catch((err) => {
        dispatch(deleteAddressError(err.message));
      });
  };

  return (
    <AddressActionContext.Provider
      value={{
        createAddress,
        getAllAddresses,
        getAddressById,
        updateAddress,
        deleteAddress,
      }}
    >
      <AddressStateContext.Provider value={state}>
        {children}
      </AddressStateContext.Provider>
    </AddressActionContext.Provider>
  );
};

export const useAddressState = () => {
  const context = useContext(AddressStateContext);
  if (!context) {
    throw new Error("useAddressState must be used within an AddressProvider");
  }
  return context;
};

export const useAddressActions = () => {
  const context = useContext(AddressActionContext);
  if (!context) {
    throw new Error("useAddressActions must be used within an AddressProvider");
  }
  return context;
};
