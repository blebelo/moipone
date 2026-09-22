"use client";
import { useCallback, useContext, useMemo, useReducer } from "react";
import { VisitActionContext, VisitStateContext, IVisit, ICreateVisitDto } from "./context";
import { checkInError, checkInPending, checkInSuccess,
  checkOutError, checkOutPending, checkOutSuccess,
  createError, createPending, createSuccess,
  getAllError, getAllPending, getAllSuccess,
  getError, getPending,getSuccess,
  updateError, updatePending, updateSuccess
} from "./actions";
import { axiosInstance } from "@/lib/utils/axiosInstance";
import { getErrorMessage } from "@/lib/common/helper-methods";
import { INITIAL_STATE } from "@/lib/common/constants";
import { VisitReducer } from "./reducer";

export const VisitProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(VisitReducer, { ...INITIAL_STATE });
  const instance = useMemo(() => axiosInstance(true), []);

  const create = useCallback(async (input: ICreateVisitDto) => {
    dispatch(createPending());
    const endpoint = "Visit/Create";

    await instance.post(endpoint, input)
      .then((response) => {
        dispatch(createSuccess(response.data.result));
      })
      .catch((error) => {
        dispatch(createError());
        throw new Error(getErrorMessage(error, "Unable to create the visit."));
      });
  }, [instance]);

  const getAll = useCallback(async (skipCount: number, maxResultCount: number, sorting?: string) => {
    dispatch(getAllPending());
    const endpoint = "Visit/GetAll";

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
        throw new Error(getErrorMessage(error, "Unable to load visits."));
      });
  }, [instance]);

  const get = useCallback(async (id: string) => {
    dispatch(getPending());
    const endpoint = "Visit/Get";

    await instance.get(endpoint, {params: { Id: id }})
      .then((response) => {
        dispatch(getSuccess(response.data.result));
      })
      .catch((error) => {
        dispatch(getError());
        throw new Error(getErrorMessage(error, "Unable to load the visit."));
      });
  }, [instance]);

  const update = useCallback(async (input: IVisit) => {
    dispatch(updatePending());
    const endpoint = "Visit/Update";

    await instance.put(endpoint, input)
      .then((response) => {
        dispatch(updateSuccess(response.data.result));
      })
      .catch((error) => {
        dispatch(updateError());
        throw new Error(getErrorMessage(error, "Unable to update the visit."));
      });
  }, [instance]);


  const checkIn = useCallback(async (input: IVisit) => {
    dispatch(checkInPending());
    const endpoint = "Visit/CheckIn";

    await instance.post(endpoint, input)
      .then((response) => {
        dispatch(checkInSuccess(response.data.result));
      })
      .catch((error) => {
        dispatch(checkInError());
        throw new Error(getErrorMessage(error, "Unable to check in the visitor."));
      });
  }, [instance]);

  const checkOut = useCallback(async (visitId: string) => {
    dispatch(checkOutPending());

    const endpoint = "Visit/CheckOut";

    await instance.post(endpoint, null, {
      params: { visitId }
    })
      .then((response) => {
        dispatch(checkOutSuccess(response.data.result));
      })
      .catch((error) => {
        dispatch(checkOutError());
        throw new Error(getErrorMessage(error, "Unable to check out the visitor."));
      });
  }, [instance]);

  const actions = useMemo(
    () => ({ create, getAll, get, update, checkIn, checkOut }),
    [create, getAll, get, update, checkIn, checkOut],
  );

  return (
    <VisitActionContext.Provider value={actions}>
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