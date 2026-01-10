'use client'
import { createAction } from 'redux-actions';
import { ICourse, ICourseStateContext } from './context';
import { RequestState } from '@/src/lib/common/constants';

export enum CourseActionEnums {
    // Create Course
    createCoursePending = 'CREATE_COURSE_PENDING',
    createCourseSuccess = 'CREATE_COURSE_SUCCESS',
    createCourseError = 'CREATE_COURSE_ERROR',

    // Get All Courses
    getAllCoursesPending = 'GET_ALL_COURSES_PENDING',
    getAllCoursesSuccess = 'GET_ALL_COURSES_SUCCESS',
    getAllCoursesError = 'GET_ALL_COURSES_ERROR',

    // Get Course By ID
    getCourseByIdPending = 'GET_COURSE_BY_ID_PENDING',
    getCourseByIdSuccess = 'GET_COURSE_BY_ID_SUCCESS',
    getCourseByIdError = 'GET_COURSE_BY_ID_ERROR',

    // Update Course
    updateCoursePending = 'UPDATE_COURSE_PENDING',
    updateCourseSuccess = 'UPDATE_COURSE_SUCCESS',
    updateCourseError = 'UPDATE_COURSE_ERROR',

    // Delete Course
    deleteCoursePending = 'DELETE_COURSE_PENDING',
    deleteCourseSuccess = 'DELETE_COURSE_SUCCESS',
    deleteCourseError = 'DELETE_COURSE_ERROR',

    //Get Course By Code
    getCourseByCodePending = 'GET_COURSE_BY_CODE_PENDING',
    getCourseByCodeSuccess = 'GET_COURSE_BY_CODE_SUCCESS',
    getCourseByCodeError = 'GET_COURSE_BY_CODE_ERROR',

    // Open Applications
    openApplicationsPending = 'OPEN_APPLICATIONS_PENDING',
    openApplicationsSuccess = 'OPEN_APPLICATIONS_SUCCESS',
    openApplicationsError = 'OPEN_APPLICATIONS_ERROR',

    // Close Applications
    closeApplicationsPending = 'CLOSE_APPLICATIONS_PENDING',
    closeApplicationsSuccess = 'CLOSE_APPLICATIONS_SUCCESS',
    closeApplicationsError = 'CLOSE_APPLICATIONS_ERROR',

    // Get Open Courses
    getOpenCoursesPending = 'GET_OPEN_COURSES_PENDING',
    getOpenCoursesSuccess = 'GET_OPEN_COURSES_SUCCESS',
    getOpenCoursesError = 'GET_OPEN_COURSES_ERROR',
}

// ==================== CREATE COURSE ====================
export const createCoursePending = createAction<ICourseStateContext>(
    CourseActionEnums.createCoursePending,
    () => RequestState.Pending
);

export const createCourseSuccess = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.createCourseSuccess,
    (course: ICourse) => ({
        ...RequestState.Success,
        course
    })
);

export const createCourseError = createAction<ICourseStateContext, string>(
    CourseActionEnums.createCourseError,
    (error: string) => ({
        ...RequestState.Error,
        error
    })
);

// ==================== GET ALL COURSES ====================
export const getAllCoursesPending = createAction<ICourseStateContext>(
    CourseActionEnums.getAllCoursesPending,
    () => RequestState.Pending
);

export const getAllCoursesSuccess = createAction<ICourseStateContext, ICourse[]>(
    CourseActionEnums.getAllCoursesSuccess,
    (courses: ICourse[]) => ({
        ...RequestState.Success,
        courses
    })
);

export const getAllCoursesError = createAction<ICourseStateContext, string>(
    CourseActionEnums.getAllCoursesError,
    (error: string) => ({
        ...RequestState.Error,
        error
    })
);

// ==================== GET COURSE BY ID ====================
export const getCourseByIdPending = createAction<ICourseStateContext>(
    CourseActionEnums.getCourseByIdPending,
    () => RequestState.Pending
);

export const getCourseByIdSuccess = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.getCourseByIdSuccess,
    (course: ICourse) => ({
        ...RequestState.Success,
        course
    })
);

export const getCourseByIdError = createAction<ICourseStateContext, string>(
    CourseActionEnums.getCourseByIdError,
    (error: string) => ({
        ...RequestState.Error,
        error
    })
);

// ==================== GET COURSE BY CODE ====================
export const getCourseByCodePending = createAction<ICourseStateContext>(
    CourseActionEnums.getCourseByCodePending,
    () => RequestState.Pending
);

export const getCourseByCodeSuccess = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.getCourseByCodeSuccess,
    (course: ICourse) => ({
        ...RequestState.Success,
        course
    })
);

export const getCourseByCodeError = createAction<ICourseStateContext, string>(
    CourseActionEnums.getCourseByCodeError,
    (error: string) => ({
        ...RequestState.Error,
        error
    })
);

// ==================== UPDATE COURSE ====================
export const updateCoursePending = createAction<ICourseStateContext>(
    CourseActionEnums.updateCoursePending,
    () => RequestState.Pending
);

export const updateCourseSuccess = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.updateCourseSuccess,
    (course: ICourse) => ({
        ...RequestState.Success,
        course
    })
);

export const updateCourseError = createAction<ICourseStateContext, string>(
    CourseActionEnums.updateCourseError,
    (error: string) => ({
        ...RequestState.Error,
        error
    })
);

// ==================== DELETE COURSE ====================
export const deleteCoursePending = createAction<ICourseStateContext>(
    CourseActionEnums.deleteCoursePending,
    () => RequestState.Pending
);

export const deleteCourseSuccess = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.deleteCourseSuccess,
    (course: ICourse) => ({
        ...RequestState.Success,
        course
    })
);

export const deleteCourseError = createAction<ICourseStateContext, string>(
    CourseActionEnums.deleteCourseError,
    (error: string) => ({
        ...RequestState.Error,
        error
    })
);

// ==================== OPEN APPLICATIONS ====================
export const openApplicationsPending = createAction<ICourseStateContext>(
    CourseActionEnums.openApplicationsPending,
    () => RequestState.Pending
);

export const openApplicationsSuccess = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.openApplicationsSuccess,
    (course: ICourse) => ({
        ...RequestState.Success,
        course
    })
);

export const openApplicationsError = createAction<ICourseStateContext, string>(
    CourseActionEnums.openApplicationsError,
    (error: string) => ({
        ...RequestState.Error,
        error
    })
);

// ==================== CLOSE APPLICATIONS ====================
export const closeApplicationsPending = createAction<ICourseStateContext>(
    CourseActionEnums.closeApplicationsPending,
    () => RequestState.Pending
);

export const closeApplicationsSuccess = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.closeApplicationsSuccess,
    (course: ICourse) => ({
        ...RequestState.Success,
        course
    })
);

export const closeApplicationsError = createAction<ICourseStateContext, string>(
    CourseActionEnums.closeApplicationsError,
    (error: string) => ({
        ...RequestState.Error,
        error
    })
);

// ==================== GET OPEN COURSES ====================
export const getOpenCoursesPending = createAction<ICourseStateContext>(
    CourseActionEnums.getOpenCoursesPending,
    () => RequestState.Pending
);

export const getOpenCoursesSuccess = createAction<ICourseStateContext, ICourse[]>(
    CourseActionEnums.getOpenCoursesSuccess,
    (courses: ICourse[]) => ({
        ...RequestState.Success,
        courses
    })
);

export const getOpenCoursesError = createAction<ICourseStateContext, string>(
    CourseActionEnums.getOpenCoursesError,
    (error: string) => ({
        ...RequestState.Error,
        error
    })
);
