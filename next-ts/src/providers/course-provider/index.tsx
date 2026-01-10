'use client'
import React, { useContext, useReducer } from "react";
import { ICourse, CourseStateContext, CourseActionContext } from "./context";
import {
  createCoursePending,
  createCourseSuccess,
  createCourseError,
  getAllCoursesPending,
  getAllCoursesSuccess,
  getAllCoursesError,
  getCourseByIdPending,
  getCourseByIdSuccess,
  getCourseByIdError,
  getCourseByCodePending,
  getCourseByCodeSuccess,
  getCourseByCodeError,
  updateCoursePending,
  updateCourseSuccess,
  updateCourseError,
  deleteCoursePending,
  deleteCourseSuccess,
  deleteCourseError,
  openApplicationsPending,
  openApplicationsSuccess,
  openApplicationsError,
  closeApplicationsPending,
  closeApplicationsSuccess,
  closeApplicationsError,
  getOpenCoursesPending,
  getOpenCoursesSuccess,
  getOpenCoursesError,
} from "./actions";
import { axiosInstance } from "../../lib/utils/axiosInstance";
import { CourseReducer } from "./reducer";
import { INITIAL_STATE } from "@/src/lib/common/constants";

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(CourseReducer, INITIAL_STATE);
    const instance = axiosInstance();

    const createCourse = async (course: ICourse) => {
        dispatch(createCoursePending());
        const endpoint = 'ShortCourse/Create';

        await instance.post(endpoint, course)
        .then(
            (response) => {
                dispatch(createCourseSuccess(response.data.result));
            }
        )
        .catch(
            (error) => {
                dispatch(createCourseError(error.message));
            }
        )
    };

    const getAllCourses = async () => {
        dispatch(getAllCoursesPending());
        const endpoint = 'ShortCourse/GetAll';

        await instance.get(endpoint)
        .then(
            (response) => {
                dispatch(getAllCoursesSuccess(response.data.result));
            }
        )
        .catch(
            (error) => {
                dispatch(getAllCoursesError(error.message));
            }
        )
    };

    const getCourseById = async (id: string) => {
        dispatch(getCourseByIdPending());
        const endpoint = `ShortCourse/Get?Id=${id}`;

        await instance.get(endpoint)
        .then(
            (response) => {
                dispatch(getCourseByIdSuccess(response.data.result));
            }
        )
        .catch(
            (error) => {
                dispatch(getCourseByIdError(error.message));
            }
        )
    };

    const updateCourse = async (course: ICourse) => {
        dispatch(updateCoursePending());
        const endpoint = `ShortCourse/Update`;

        await instance.put(endpoint, course)
        .then(
            (response) => {
                dispatch(updateCourseSuccess(response.data.result));
            }
        )
        .catch(
            (error) => {
                dispatch(updateCourseError(error.message));
            }
        )
    };

    const deleteCourse = async (id: string) => {
        dispatch(deleteCoursePending());
        const endpoint = `ShortCourse/Delete?Id=${id}`;

        await instance.delete(endpoint)
        .then(
            (response) => {
                dispatch(deleteCourseSuccess(response.data.result));
            }
        )
        .catch(
            (error) => {
                dispatch(deleteCourseError(error.message));
            }
        )
    };

    const getCourseByCode = async (code: string) => {
        dispatch(getCourseByCodePending());
        const endpoint = `ShortCourse/GetByCode?code=${code}`;

        await instance.get(endpoint)
        .then(
            (response) => {
                dispatch(getCourseByCodeSuccess(response.data.result));
            }
        )
        .catch(
            (error) => {
                dispatch(getCourseByCodeError(error.message));
            }
        )
    };

    const openApplications = async (id: string) => {
        dispatch(openApplicationsPending());
        const endpoint = `ShortCourse/OpenApplications?id=${id}`;

        await instance.post(endpoint)
        .then(
            (response) => {
                dispatch(openApplicationsSuccess(response.data.result));
            }
        )
        .catch(
            (error) => {
                dispatch(openApplicationsError(error.message));
            }
        )
    };

    const closeApplications = async (id: string) => {
        dispatch(closeApplicationsPending());
        const endpoint = `ShortCourse/CloseApplications?id=${id}`;

        await instance.post(endpoint)
        .then(
            (response) => {
                dispatch(closeApplicationsSuccess(response.data.result));
            }
        )
        .catch(
            (error) => {
                dispatch(closeApplicationsError(error.message));
            }
        )
    };
    
    const getOpenCourses = async () => {
        dispatch(getOpenCoursesPending());
        const endpoint = `ShortCourse/GetOpenCourses`;

        await instance.get(endpoint)
        .then(
            (response) => {
                dispatch(getOpenCoursesSuccess(response.data.result));
            }
        )
        .catch(
            (error) => {
                dispatch(getOpenCoursesError(error.message));
            }
        )
    };

    return (
        <CourseActionContext.Provider value={{
            createCourse,
            getAllCourses,
            getCourseById,
            updateCourse,
            deleteCourse,
            getCourseByCode,
            openApplications,
            closeApplications,
            getOpenCourses
        }}>
            <CourseStateContext.Provider value={state}>
                {children}
            </CourseStateContext.Provider>
        </CourseActionContext.Provider>
    )
}
            
export const useCourseState = () => {
    const context = useContext(CourseStateContext);
    if (!context) {
        throw new Error("useCourseState must be used within a CourseProvider");
    }
    return context;
}

export const useCourseAction = () => {
    const context = useContext(CourseActionContext);
    if (!context) {
        throw new Error("useCourseAction must be used within a CourseProvider");
    }
    return context;
}
