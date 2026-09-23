"use client";
import { useCallback, useContext, useMemo, useReducer } from "react";
import { AttendanceRegisterReducer } from "./reducer";
import { INITIAL_STATE } from "@/lib/common/constants";
import { axiosInstance } from "@/lib/utils/axiosInstance";
import { getErrorMessage } from "@/lib/common/helper-methods";
import {closeError, closePending, closeSuccess,
  createError, createPending, createSuccess,
  getAllError, getAllPending, getAllSuccess,
  getError, getPending, getSuccess,
  getTodayError, getTodayPending, getTodaySuccess,
  reopenError, reopenPending, reopenSuccess} from "./actions";
import {AttendanceRegisterActionContext, AttendanceRegisterStateContext, IAttendanceRegister} from "./context";

export const AttendanceRegisterProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AttendanceRegisterReducer, { ...INITIAL_STATE });
  const instance = useMemo(() => axiosInstance(true), []);

  const create = useCallback(async (input: IAttendanceRegister) => {
    dispatch(createPending());
    const endpoint = "AttendanceRegister/Create";

    await instance.post(endpoint, input)
      .then((response) => {
        dispatch(createSuccess(response.data.result));
      })
    .catch((error) => {
      dispatch(createError());
      throw new Error(getErrorMessage(error));
    });
  }, [instance]);

  const getAll = useCallback(async (skipCount: number, maxResultCount: number, sorting?: string) => {
    dispatch(getAllPending());
    const endpoint = "AttendanceRegister/GetAll";

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
        throw new Error(getErrorMessage(error, "Unable to load attendance registers."));
      });
  }, [instance]);

  const get = useCallback(async (id: number) => {
    dispatch(getPending());
    const endpoint = "AttendanceRegister/Get";

    await instance.get(endpoint, {params: { Id: id }})
      .then((response) => {
        dispatch(getSuccess(response.data.result));
      })
      .catch((error) => {
        dispatch(getError());
        throw new Error(getErrorMessage(error, "Unable to load the attendance register."));
      });
  }, [instance]);

  const getToday = useCallback(async () => {
    dispatch(getTodayPending());
    const endpoint = "AttendanceRegister/GetToday";

    await instance.get(endpoint)
      .then((response) => {
        dispatch(getTodaySuccess(response.data.result));
      })
      .catch((error) => {
        dispatch(getTodayError());
        throw new Error(getErrorMessage(error, "Unable to load today's attendance register."));
      });
  }, [instance]);

  const close = useCallback(async (id: number) => {
    dispatch(closePending());
    const endpoint = "AttendanceRegister/Close";

    await instance.post(endpoint, { id })
      .then((response) => {
        dispatch(closeSuccess(response.data.result));
      })
      .catch((error) => {
        dispatch(closeError());
        throw new Error(getErrorMessage(error, "Unable to close the attendance register."));
      });
  }, [instance]);

  const reopen = useCallback(async (id: number) => {
    dispatch(reopenPending());
    const endpoint = "AttendanceRegister/Reopen";

    await instance.post(endpoint, { id })
      .then((response) => {
        dispatch(reopenSuccess(response.data.result));
      })
      .catch((error) => {
        dispatch(reopenError());
        throw new Error(getErrorMessage(error, "Unable to reopen the attendance register."));
      });
  }, [instance]);

  const actions = useMemo(
    () => ({ create, getAll, get, getToday, close, reopen }),
    [create, getAll, get, getToday, close, reopen],
  );

  return (
    <AttendanceRegisterActionContext.Provider value={actions}>
      <AttendanceRegisterStateContext.Provider value={state}>
        {children}
      </AttendanceRegisterStateContext.Provider>
    </AttendanceRegisterActionContext.Provider>
  );
};

export const useAttendanceRegisterState = () => {
  const context = useContext(AttendanceRegisterStateContext);
  if (!context) {
    throw new Error("useAttendanceRegisterState must be used within a AttendanceRegisterProvider");
  }
  return context;
};

export const useAttendanceRegisterActions = () => {
  const context = useContext(AttendanceRegisterActionContext);
  if (!context) {
    throw new Error("useAttendanceRegisterActions must be used within a AttendanceRegisterProvider");
  }
  return context;
};