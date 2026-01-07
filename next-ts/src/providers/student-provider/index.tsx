'use client'
import React, { useContext, useReducer } from "react";
import { STUDENT_INITIAL_STATE, IStudent, StudentStateContext, StudentActionContext } from "./context";
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

} from "./actions";
import { axiosInstance } from "../../lib/utils/axiosInstance";
import { StudentReducer } from "./reducer";

export const StudentProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(StudentReducer, STUDENT_INITIAL_STATE)
    const instance = axiosInstance();
    
    const createStudent = async (student: IStudent) => {
        dispatch(createStudentPending());
        const endpoint = 'services/app/Student/Create';
        
        await instance.post(endpoint, student)
        .then(
            (response) => {
                dispatch(createStudentSuccess(response.data.result));
            }
        ).catch(
            (err) => {
                dispatch(createStudentError(err.message));
            }
        )        
    };
    
    const getAllStudents = async () => {
        dispatch(getAllStudentsPending());
        const endpoint = 'services/app/Student/GetAll';       
        await instance.get(endpoint)
        .then(
            (response) => {
                dispatch(getAllStudentsSuccess(response.data.result));
            }
        ).catch(
            (err) => {
                dispatch(getAllStudentsError(err.message));
            }
        )        
    };
    
    const getStudentById = async (id: string) => {
        dispatch(getStudentByIdPending());
        const endpoint = `services/app/Student/Get?Id=${id}`;
        
        await instance.get(endpoint)
        .then(
            (response) => {
                dispatch(getStudentByIdSuccess(response.data.result));
            }
        ).catch(
            (err) => {
                dispatch(getStudentByIdError(err.message));
            }
        )        
    };
    
    const updateStudent = async (id: string, student: IStudent) => {
        dispatch(updateStudentPending());
        const endpoint = 'services/app/Student/Update';
        
        await instance.put(endpoint, { ...student, id })
        .then(
            (response) => {
                dispatch(updateStudentSuccess(response.data.result));
            }
        ).catch(
            (err) => {
                dispatch(updateStudentError(err.message));
            }
        )        
    };
    
    const deleteStudent = async (id: string) => {
        dispatch(deleteStudentPending());
        const endpoint = `services/app/Student/Delete?Id=${id}`;
        
        await instance.delete(endpoint)
        .then(
            () => {
                dispatch(deleteStudentSuccess());
            }
        ).catch(
            (err) => {
                dispatch(deleteStudentError(err.message));
            }
        )        
    };
    
    const getStudentByEmail = async (email: string) => {
        dispatch(getStudentByEmailPending());
        const endpoint = `services/app/Student/GetByEmail?email=${encodeURIComponent(email)}`;
        
        await instance.get(endpoint)
        .then(
            (response) => {
                dispatch(getStudentByEmailSuccess(response.data.result));
            }
        ).catch(
            (err) => {
                dispatch(getStudentByEmailError(err.message));
            }
        )        
    };

    return (
        <StudentActionContext.Provider value={{
          createStudent,
          getAllStudents,
          getStudentById,
          updateStudent,
          deleteStudent,
          getStudentByEmail
        }}>
          <StudentStateContext.Provider value={state}>
            {children}
          </StudentStateContext.Provider>
        </StudentActionContext.Provider>
      )
      
}

export const useStudentState = () => {
    const context = useContext(StudentStateContext);
    if (!context) {
        throw new Error('useStudentState must be used within a StudentProvider');
    }
    return context;
}

export const useStudentActions = () => {
    const context = useContext(StudentActionContext);
    if (!context) {
        throw new Error('useStudentActions must be used within a StudentProvider');
    }
    return context;
}