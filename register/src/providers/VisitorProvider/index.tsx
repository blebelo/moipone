"use client";
import { useCallback, useContext, useMemo, useReducer } from "react";
import { VisitorActionContext, VisitorStateContext, IVisitor } from "./context";
import {
  createError, createPending, createSuccess,
  getAllError, getAllPending, getAllSuccess,
  getError, getPending, getSuccess,
  lookupError, lookupPending, lookupSuccess,
  updateError, updatePending, updateSuccess
} from "./actions";
import { axiosInstance } from "@/lib/utils/axiosInstance";
import { getErrorMessage } from "@/lib/common/helper-methods";
import { INITIAL_STATE } from "@/lib/common/constants";
import { VisitorReducer } from "./reducer";

export const VisitorProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(VisitorReducer, { ...INITIAL_STATE });
  const instance = useMemo(() => axiosInstance(true), []);

  const create = useCallback(async (input: IVisitor) => {
    dispatch(createPending());
    const endpoint = "Visitor/Create";

    await instance.post(endpoint, input)
      .then((response) => {
        dispatch(createSuccess(response.data.result));
      })
      .catch((error) => {
        dispatch(createError());
        throw new Error(getErrorMessage(error, "Unable to create the visitor."));
      });
  }, [instance]);

  const getAll = useCallback(async (skipCount: number, maxResultCount: number, sorting?: string) => {
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
      .catch((error) => {
        dispatch(getAllError());
        throw new Error(getErrorMessage(error, "Unable to load visitors."));
      });
  }, [instance]);

  const get = useCallback(async (id: string) => {
    dispatch(getPending());
    const endpoint = "Visitor/Get";

    await instance.get(endpoint, { params: { Id: id } })
      .then((response) => {
        dispatch(getSuccess(response.data.result));
      })
      .catch((error) => {
        dispatch(getError());
        throw new Error(getErrorMessage(error, "Unable to load the visitor."));
      });
  }, [instance]);

  const update = useCallback(async (input: IVisitor) => {
    dispatch(updatePending());
    const endpoint = "Visitor/Update";

    await instance.put(endpoint, input)
      .then((response) => {
        dispatch(updateSuccess(response.data.result));
      })
      .catch((error) => {
        dispatch(updateError());
        throw new Error(getErrorMessage(error, "Unable to update the visitor."));
      });
  }, [instance]);

  const lookup = useCallback(async (emailAddress: string) => {
    dispatch(lookupPending());
    const endpoint = "Visitor/LookupVisitor";

    try {
      const response = await instance.get(endpoint, { params: { emailAddress } });
      const visitor = response.data.result;
      dispatch(lookupSuccess(visitor));

    } catch (error) {
      dispatch(lookupError());
      throw new Error(getErrorMessage(error, "Unable to look up the visitor."));
    }
  }, [instance]);

  const actions = useMemo(
    () => ({ create, getAll, get, update, lookup }),
    [create, getAll, get, update, lookup],
  );

  return (
    <VisitorActionContext.Provider
      value={actions}
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