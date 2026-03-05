"use client";
import React, { useContext, useReducer } from "react";
import { ApplicationStateContext, ApplicationActionContext, ICourseApplication } from "./context";
import {
  resetApplicationState,
  createApplicationPending,
  createApplicationSuccess,
  createApplicationError,
  getAllApplicationsPending,
  getAllApplicationsSuccess,
  getAllApplicationsError,
  getApplicationByIdPending,
  getApplicationByIdSuccess,
  getApplicationByIdError,
  updateApplicationPending,
  updateApplicationSuccess,
  updateApplicationError,
  deleteApplicationPending,
  deleteApplicationSuccess,
  deleteApplicationError,
  approveApplicationPending,
  approveApplicationSuccess,
  approveApplicationError,
  rejectApplicationPending,
  rejectApplicationSuccess,
  rejectApplicationError,
  getApplicationsByCourseIdPending,
  getApplicationsByCourseIdSuccess,
  getApplicationsByCourseIdError,
} from "./actions";
import { axiosInstance } from "../../lib/utils/axiosInstance";
import { ApplicationReducer } from "./reducer";
import { INITIAL_STATE } from "@/src/lib/common/constants";

export const ApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(ApplicationReducer, INITIAL_STATE);
  const instance = axiosInstance();

  const resetState = () => {
    dispatch(resetApplicationState());
  };

  const createApplication = async (application: ICourseApplication) => {
    dispatch(createApplicationPending());
    const endpoint = "CourseApplication/Create";

    try {
      const response = await instance.post(endpoint, application);
      dispatch(createApplicationSuccess(response.data.result));
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message ||
        (err instanceof Error ? err.message : "Failed to create application.");
      dispatch(createApplicationError(errorMessage));
      throw new Error(errorMessage);
    }
  };

  const getAllApplications = async () => {
    dispatch(getAllApplicationsPending());
    const endpoint = "CourseApplication/GetAll";
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getAllApplicationsSuccess(response.data.result.items));
      })
      .catch((err) => {
        dispatch(getAllApplicationsError(err.message));
      });
  };

  const getApplicationById = async (id: string) => {
    dispatch(getApplicationByIdPending());
    const endpoint = `CourseApplication/Get?Id=${id}`;

    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getApplicationByIdSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(getApplicationByIdError(err.message));
      });
  };

  const updateApplication = async (id: string, application: ICourseApplication) => {
    dispatch(updateApplicationPending());
    const endpoint = "CourseApplication/Update";

    await instance
      .put(endpoint, { ...application, id })
      .then((response) => {
        dispatch(updateApplicationSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(updateApplicationError(err.message));
      });
  };

  const deleteApplication = async (id: string) => {
    dispatch(deleteApplicationPending());
    const endpoint = `CourseApplication/Delete?Id=${id}`;

    await instance
      .delete(endpoint)
      .then(() => {
        dispatch(deleteApplicationSuccess());
      })
      .catch((err) => {
        dispatch(deleteApplicationError(err.message));
      });
  };

  const getApplicationsByCourseId = async (id: string) => {
    dispatch(getApplicationsByCourseIdPending());
    const endpoint = `CourseApplication/GetByCourseId?CourseId=${id}`;

    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getApplicationsByCourseIdSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(getApplicationsByCourseIdError(err.message));
      });
  };
  const approveApplication = async (id: string) => {
    dispatch(approveApplicationPending());
    const endpoint = `CourseApplication/Approve?Id=${id}`;

    await instance
      .put(endpoint)
      .then((response) => {
        dispatch(approveApplicationSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(approveApplicationError(err.message));
      });
  };

  const rejectApplication = async (id: string) => {
    dispatch(rejectApplicationPending());
    const endpoint = `CourseApplication/Reject?Id=${id}`;

    await instance
      .put(endpoint)
      .then((response) => {
        dispatch(rejectApplicationSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(rejectApplicationError(err.message));
      });
  };

  return (
    <ApplicationActionContext.Provider
      value={{
        resetApplicationState: resetState,
        createApplication,
        getAllApplications,
        getApplicationById,
        updateApplication,
        deleteApplication,
        getApplicationsByCourseId,
        approveApplication,
        rejectApplication,
      }}
    >
      <ApplicationStateContext.Provider value={state}>
        {children}
      </ApplicationStateContext.Provider>
    </ApplicationActionContext.Provider>
  );
};

export const useApplicationState = () => {
  const context = useContext(ApplicationStateContext);
  if (!context) {
    throw new Error("useApplicationState must be used within an ApplicationProvider");
  }
  return context;
};

export const useApplicationActions = () => {
  const context = useContext(ApplicationActionContext);
  if (!context) {
    throw new Error("useApplicationActions must be used within an ApplicationProvider");
  }
  return context;
};
