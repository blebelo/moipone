"use client";
import React, { useContext, useReducer } from "react";
import { ApplicationStateContext, ApplicationActionContext, ICourseApplication } from "./context";
import {
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
  getApplicationByCourseIdPending,
  getApplicationsByCourseIdSuccess,
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

  const createApplication = async (application: ICourseApplication) => {
    dispatch(createApplicationPending());
    const endpoint = "Application/Create";

    await instance
      .post(endpoint, application)
      .then((response) => {
        dispatch(createApplicationSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(createApplicationError(err.message));
      });
  };

  const getAllApplications = async () => {
    dispatch(getAllApplicationsPending());
    const endpoint = "Application/GetAll";
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
    const endpoint = `Application/Get?Id=${id}`;

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
    const endpoint = "Application/Update";

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
    const endpoint = `Application/Delete?Id=${id}`;

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
    dispatch(getApplicationByCourseIdPending());
    const endpoint = `Application/GetByCourseId?CourseId=${id}`;

    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getApplicationsByCourseIdSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(approveApplicationError(err.message));
      });
  };
  const approveApplication = async (id: string) => {
    dispatch(approveApplicationPending());
    const endpoint = `Application/Approve?Id=${id}`;

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
    const endpoint = `Application/Reject?Id=${id}`;

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
