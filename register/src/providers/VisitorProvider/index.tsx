"use client";
import { useContext, useReducer } from "react";
import { VisitorActionContext, VisitorStateContext, IVisitor } from "./context";
import {
  createError, createPending, createSuccess,
  getAllError, getAllPending, getAllSuccess,
  getError, getPending, getSuccess,
  lookupError, lookupPending, lookupSuccess,
  updateError, updatePending, updateSuccess
} from "./actions";
import { axiosInstance } from "@/lib/utils/axiosInstance";
import { INITIAL_STATE } from "@/lib/common/constants";
import { VisitorReducer } from "./reducer";

export const VisitorProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(VisitorReducer, { ...INITIAL_STATE });
  const instance = axiosInstance(true);

  const create = async (input: IVisitor) => {
    dispatch(createPending());
    const endpoint = "Visitor/Create";

    await instance.post(endpoint, input)
      .then((response) => {
        dispatch(createSuccess(response.data.result));
      })
      .catch(() => {
        dispatch(createError());
      });
  };

  const getAll = async (skipCount: number, maxResultCount: number, sorting?: string) => {
    dispatch(getAllPending());
    const endpoint = "Visitor/GetAll";

    await instance.get(endpoint, {
      params: {
        SkipCount: skipCount,
        MaxResultCount: maxResultCount,
        Sorting: sorting
      }
    })
      .then((response) => {
        dispatch(getAllSuccess(response.data.result.items));
      })
      .catch(() => {
        dispatch(getAllError());
      });
  };

  const get = async (id: string) => {
    dispatch(getPending());
    const endpoint = "Visitor/Get";

    await instance.get(endpoint, { params: { Id: id } })
      .then((response) => {
        dispatch(getSuccess(response.data.result));
      })
      .catch(() => {
        dispatch(getError());
      });
  };

  const update = async (input: IVisitor) => {
    dispatch(updatePending());
    const endpoint = "Visitor/Update";

    await instance.put(endpoint, input)
      .then((response) => {
        dispatch(updateSuccess(response.data.result));
      })
      .catch(() => {
        dispatch(updateError());
      });
  };

  const lookup = async (emailAddress: string) => {
    dispatch(lookupPending());
    const endpoint = "Visitor/LookupVisitor";

    await instance.get(endpoint, { params: { emailAddress } })
      .then((response) => {
        dispatch(lookupSuccess(response.data.result));
      })
      .catch(() => {
        dispatch(lookupError());
      });
  };

  return (
    <VisitorActionContext.Provider
      value={{ create, getAll, get, update, lookup }}
    >
      <VisitorStateContext.Provider value={state}>
        {children}
      </VisitorStateContext.Provider>
    </VisitorActionContext.Provider>
  );
};

export const useVisitorState = () => {
  const context = useContext(VisitorStateContext);
  if (!context) {
    throw new Error("useVisitorState must be used within a VisitorProvider");
  }
  return context;
};

export const useVisitorActions = () => {
  const context = useContext(VisitorActionContext);
  if (!context) {
    throw new Error("useVisitorActions must be used within a VisitorProvider");
  }
  return context;
};