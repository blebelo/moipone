"use client";
import { useContext, useReducer } from "react";
import { VisitActionContext, VisitStateContext, ICheckin, IVisit } from "./context";
import { checkInError, checkInPending, checkInSuccess,
  checkOutError, checkOutPending, checkOutSuccess,
  createError, createPending, createSuccess,
  getAllError, getAllPending, getAllSuccess,
  getError, getPending,getSuccess,
  updateError, updatePending, updateSuccess
} from "./actions";
import { axiosInstance } from "@/lib/utils/axiosInstance";
import { INITIAL_STATE } from "@/lib/common/constants";
import { VisitReducer } from "./reducer";

export const VisitProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(VisitReducer, { ...INITIAL_STATE });
  const instance = axiosInstance(true);

  const create = async (input: IVisit) => {
    dispatch(createPending());
    const endpoint = "services/app/Visit/Create";

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
    const endpoint = "services/app/Visit/GetAll";

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
    const endpoint = "services/app/Visit/Get";

    await instance.get(endpoint, {params: { Id: id }})
      .then((response) => {
        dispatch(getSuccess(response.data.result));
      })
      .catch(() => {
        dispatch(getError());
      });
  };

  const update = async (input: IVisit) => {
    dispatch(updatePending());
    const endpoint = "services/app/Visit/Update";

    await instance.put(endpoint, input)
      .then((response) => {
        dispatch(updateSuccess(response.data.result));
      })
      .catch(() => {
        dispatch(updateError());
      });
  };


  const checkIn = async (input: ICheckin) => {
    dispatch(checkInPending());
    const endpoint = "services/app/Visit/CheckIn";

    await instance.post(endpoint, input)
      .then((response) => {
        dispatch(checkInSuccess(response.data.result));
      })
      .catch(() => {
        dispatch(checkInError());
      });
  };

  const checkOut = async (visitId: string) => {
    dispatch(checkOutPending());

    const endpoint = "services/app/Visit/CheckOut";

    await instance.post(endpoint, null, {
      params: { visitId }
    })
      .then((response) => {
        dispatch(checkOutSuccess(response.data.result));
      })
      .catch(() => {
        dispatch(checkOutError());
      });
  };

  return (
    <VisitActionContext.Provider
      value={{ create, getAll, get, update,  checkIn, checkOut }}
    >
      <VisitStateContext.Provider value={state}>
        {children}
      </VisitStateContext.Provider>
    </VisitActionContext.Provider>
  );
};

export const useVisitState = () => {
  const context = useContext(VisitStateContext);
  if (!context) {
    throw new Error("useVisitState must be used within a VisitProvider");
  }
  return context;
};

export const useVisitActions = () => {
  const context = useContext(VisitActionContext);
  if (!context) {
    throw new Error("useVisitActions must be used within a VisitProvider");
  }
  return context;
};