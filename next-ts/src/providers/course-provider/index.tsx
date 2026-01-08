'use client'
import React, { useContext, useReducer } from "react";
import { COURSE_INITIAL_STATE, ICourse, CourseStateContext, CourseActionContext } from "./context";
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
  getCourseByTitlePending,
  getCourseByTitleSuccess,
  getCourseByTitleError,
  getCourseByCodePending,
  getCourseByCodeSuccess,
  getCourseByCodeError,
  updateCoursePending,
  updateCourseSuccess,
  updateCourseError,
  deleteCoursePending,
  deleteCourseSuccess,
  deleteCourseError,
  enrollStudentPending,
  enrollStudentSuccess,
  enrollStudentError,
  openApplicationsPending,
  openApplicationsSuccess,
  openApplicationsError,
  closeApplicationsPending,
  closeApplicationsSuccess,
  closeApplicationsError,
  reopenApplicationsPending,
  reopenApplicationsSuccess,
  reopenApplicationsError,
  getOpenCoursesPending,
  getOpenCoursesSuccess,
  getOpenCoursesError,
  getCurrentCapacityPending,
  getCurrentCapacitySuccess,
  getCurrentCapacityError,
} from "./actions";
import { axiosInstance } from "../../lib/utils/axiosInstance";
import { CourseReducer } from "./reducer";

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(CourseReducer, COURSE_INITIAL_STATE);
    const instance = axiosInstance();

    const createCourse = async (course: ICourse) => {
        dispatch(createCoursePending());
        const endpoint = 'services/app/ShortCourse/Create';

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
        const endpoint = 'services/app/ShortCourse/GetAll';

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
        const endpoint = `services/app/ShortCourse/Get?Id=${id}`;

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
    const getCourseByTitle = async (title: string) => {
        dispatch(getCourseByTitlePending());
        const endpoint = `services/app/ShortCourse/Get?Title=${title}`;

        await instance.get(endpoint)
        .then(
            (response) => {
                dispatch(getCourseByTitleSuccess(response.data.result));
            }
        )
        .catch(
            (error) => {
                dispatch(getCourseByTitleError(error.message));
            }
        )
    };

    const updateCourse = async (id: string, course: ICourse) => {
        dispatch(updateCoursePending());
        const endpoint = `services/app/ShortCourse/Update/${id}`;

        await instance.put(endpoint, {...course, id})
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
        const endpoint = `services/app/ShortCourse/Delete?Id=${id}`;

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
    const enrollStudent = async (id: string) => {
        dispatch(enrollStudentPending());
        const endpoint = `services/app/ShortCourse/EnrollStudent?Id=${id}`;

        await instance.get(endpoint)
        .then(
            (response) => {
                dispatch(enrollStudentSuccess(response.data.result));
            }
        )
        .catch(
            (error) => {
                dispatch(enrollStudentError(error.message));
            }
        )
    };

    const getCourseByCode = async (code: string) => {
        dispatch(getCourseByCodePending());
        const endpoint = `services/app/ShortCourse/GetByCode?Code=${code}`;

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
        const endpoint = `services/app/ShortCourse/OpenApplications?Id=${id}`;

        await instance.get(endpoint)
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
        const endpoint = `services/app/ShortCourse/CloseApplications?Id=${id}`;

        await instance.get(endpoint)
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
    const ReopenApplications = async (id: string) => {
        dispatch(reopenApplicationsPending());
        const endpoint = `services/app/ShortCourse/ReopenApplications?Id=${id}`;

        await instance.get(endpoint)
        .then(
            (response) => {
                dispatch(reopenApplicationsSuccess(response.data.result));
            }
        )
        .catch(
            (error) => {
                dispatch(reopenApplicationsError(error.message));
            }
        )
    };
    const GetOpenCourses = async () => {
        dispatch(getOpenCoursesPending());
        const endpoint = `services/app/ShortCourse/GetOpenCourses`;

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
    const GetCurrentCapacity = async () => {
        dispatch(getCurrentCapacityPending());
        const endpoint = `services/app/ShortCourse/GetCurrentCapacity`;

        await instance.get(endpoint)
        .then(
            (response) => {
                dispatch(getCurrentCapacitySuccess(response.data.result));
            }
        )
        .catch(
            (error) => {
                dispatch(getCurrentCapacityError(error.message));
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
            enrollStudent,
            getCourseByTitle,
            getCourseByCode,
            openApplications,
            closeApplications,
            ReopenApplications,
            GetOpenCourses,
            GetCurrentCapacity
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
