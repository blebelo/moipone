"use client";
import { useContext, useReducer } from "react";
import { AttendanceRegisterReducer } from "./reducer";
import {
  AttendanceRegisterActionContext,
  AttendanceRegisterStateContext,
  IAttendanceRegister
} from "./context";
import {closeError, closePending, closeSuccess,
  createError, createPending, createSuccess,
  getAllError, getAllPending, getAllSuccess,
  getError, getPending, getSuccess,
  getTodayError, getTodayPending, getTodaySuccess,
  reopenError, reopenPending, reopenSuccess
} from "./actions";
import { INITIAL_STATE } from "@/lib/common/constants";
import { axiosInstance } from "@/lib/utils/axiosInstance";

export const AttendanceRegisterProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AttendanceRegisterReducer, { ...INITIAL_STATE });
  const instance = axiosInstance(true);

  const create = async (input: IAttendanceRegister) => {
    dispatch(createPending());
    const endpoint = "services/app/AttendanceRegister/Create";

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
    const endpoint = "services/app/AttendanceRegister/GetAll";

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

  const get = async (id: number) => {
    dispatch(getPending());
    const endpoint = "services/app/AttendanceRegister/Get";

    await instance.get(endpoint, {params: { Id: id }})
      .then((response) => {
        dispatch(getSuccess(response.data.result));
      })
      .catch(() => {
        dispatch(getError());
      });
  };

  const getToday = async () => {
    dispatch(getTodayPending());
    const endpoint = "services/app/AttendanceRegister/GetToday";

    await instance.get(endpoint)
      .then((response) => {
        dispatch(getTodaySuccess(response.data.result));
      })
      .catch(() => {
        dispatch(getTodayError());
      });
  };

  const close = async (id: number) => {
    dispatch(closePending());
    const endpoint = "services/app/AttendanceRegister/Close";

    await instance.post(endpoint, { id })
      .then((response) => {
        dispatch(closeSuccess(response.data.result));
      })
      .catch(() => {
        dispatch(closeError());
      });
  };

  const reopen = async (id: number) => {
    dispatch(reopenPending());
    const endpoint = "services/app/AttendanceRegister/Reopen";

    await instance.post(endpoint, { id })
      .then((response) => {
        dispatch(reopenSuccess(response.data.result));
      })
      .catch(() => {
        dispatch(reopenError());
      });
  };

  return (
    <AttendanceRegisterActionContext.Provider value={{ create, getAll, get, getToday, close, reopen }}>
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