"use client";
import React, { useContext, useReducer } from "react";
import { IStudent, StudentStateContext, StudentActionContext } from "./context";
import {
  createStudentPending,
  createStudentSuccess,
  createStudentError,
  getAllStudentsPending,
  getAllStudentsSuccess,
  getAllStudentsError,
  getStudentByIdPending,
  getStudentByIdSuccess,
  getStudentByIdError,
  updateStudentPending,
  updateStudentSuccess,
  updateStudentError,
  deleteStudentPending,
  deleteStudentSuccess,
  deleteStudentError,
  getStudentByEmailPending,
  getStudentByEmailSuccess,
  getStudentByEmailError,
  registerStudentDocumentsPending,
  registerStudentDocumentsSuccess,
  registerStudentDocumentsError,
  getStudentByIdNumberError,
  getStudentByIdNumberSuccess,
  getStudentByIdNumberPending,
} from "./actions";
import { axiosInstance } from "../../lib/utils/axiosInstance";
import { StudentReducer } from "./reducer";
import { INITIAL_STATE } from "@/src/lib/common/constants";

export const StudentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(StudentReducer, INITIAL_STATE);
  const instance = axiosInstance();

  const createStudent = async (student?: IStudent): Promise<IStudent> => {
    dispatch(createStudentPending());
    const endpoint = "Student/Create";

    return await instance
      .post(endpoint, student)
      .then((response) => {
        const createdStudent = response.data.result as IStudent;
        dispatch(createStudentSuccess(createdStudent));
        
        return createdStudent; 
      })
      .catch((err) => {
        dispatch(createStudentError(err.message));
        throw err;
      });
  };

  const getAllStudents = async () => {
    dispatch(getAllStudentsPending());
    const endpoint = "Student/GetAll";
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getAllStudentsSuccess(response.data.result.items));
      })
      .catch((err) => {
        dispatch(getAllStudentsError(err.message));
      });
  };

  const getStudentById = async (id?: string) => {
    dispatch(getStudentByIdPending());
    const endpoint = `Student/Get?Id=${id}`;

    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getStudentByIdSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(getStudentByIdError(err.message));
      });
  };

  const updateStudent = async (id?: string, student?: IStudent) => {
    dispatch(updateStudentPending());
    const endpoint = "Student/Update";

    await instance
      .put(endpoint, { ...student, id })
      .then((response) => {
        dispatch(updateStudentSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(updateStudentError(err.message));
      });
  };

  const deleteStudent = async (id?: string) => {
    dispatch(deleteStudentPending());
    const endpoint = `Student/Delete?Id=${id}`;

    await instance
      .delete(endpoint)
      .then(() => {
        dispatch(deleteStudentSuccess());
      })
      .catch((err) => {
        dispatch(deleteStudentError(err.message));
      });
  };

  const getStudentByEmail = async (email?: string) => {
    dispatch(getStudentByEmailPending());
    const endpoint = `Student/GetByEmail?email=${encodeURIComponent(email || "")}`;

    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getStudentByEmailSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(getStudentByEmailError(err.message));
      });
  };

  const registerStudentDocuments = async (studentId: string) => {
    dispatch(registerStudentDocumentsPending());
    const endpoint = `Student/RegisterStudentDocuments?studentId=${studentId}`;

    await instance
      .post(endpoint)
      .then(() => {
        dispatch(registerStudentDocumentsSuccess());
      })
      .catch((err) => {
        dispatch(registerStudentDocumentsError(err.message));
      });
  };

  const getStudentByIdNumber = async (idNumber: string): Promise<IStudent | null> => {
    dispatch(getStudentByIdNumberPending());
    const endpoint = `Student/GetByIdNumber?idNumber=${encodeURIComponent(idNumber)}`;

    return await instance
      .get(endpoint)
      .then((response) => {
        const student = response.data.result as IStudent;

        dispatch(getStudentByIdNumberSuccess(student));

        return student;
      })
      .catch((err) => {
        const status = err?.response?.status;

        if (status === 404) {
          dispatch(getStudentByIdNumberError("NOT_FOUND"));
          return null;
        }

        dispatch(getStudentByIdNumberError(err.message));
        throw err;
      });
  };

  return (
    <StudentActionContext.Provider
      value={{
        createStudent,
        getAllStudents,
        getStudentById,
        updateStudent,
        deleteStudent,
        getStudentByEmail,
        registerStudentDocuments,
        getStudentByIdNumber,
      }}
    >
      <StudentStateContext.Provider value={state}>
        {children}
      </StudentStateContext.Provider>
    </StudentActionContext.Provider>
  );
};

export const useStudentState = () => {
  const context = useContext(StudentStateContext);
  if (!context) {
    throw new Error("useStudentState must be used within a StudentProvider");
  }
  return context;
};

export const useStudentActions = () => {
  const context = useContext(StudentActionContext);
  if (!context) {
    throw new Error("useStudentActions must be used within a StudentProvider");
  }
  return context;
};
