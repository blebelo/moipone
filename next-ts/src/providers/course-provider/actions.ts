'use client'
import { createAction } from 'redux-actions';
import { ICourse,ICourseStateContext } from './context';

export enum CourseActionEnums  {
    // Create Course
    createCoursePending = 'CREATE_COURSE_PENDING',
    createCourseSuccess = 'CREATE_COURSE_SUCCESS',
    createCourseError = 'CREATE_COURSE_ERROR',

    // Get All Courses
    getAllCoursesPending = 'GET_ALL_COURSES_PENDING',
    getAllCoursesSuccess = 'GET_ALL_COURSES_SUCCESS',
    getAllCoursesError = 'GET_ALL_COURSES_ERROR',

    // Get Course By Title
    getCourseByTitlePending = 'GET_COURSE_BY_TITLE_PENDING',
    getCourseByTitleSuccess = 'GET_COURSE_BY_TITLE_SUCCESS',
    getCourseByTitleError = 'GET_COURSE_BY_TITLE_ERROR',

    // Get Course By ID
    getCourseByIdPending = 'GET_COURSE_BY_ID_PENDING',
    getCourseByIdSuccess = 'GET_COURSE_BY_ID_SUCCESS',
    getCourseByIdError = 'GET_COURSE_BY_ID_ERROR',

    //Get Course By Code
    getCourseByCodePending = 'GET_COURSE_BY_CODE_PENDING',
    getCourseByCodeSuccess = 'GET_COURSE_BY_CODE_SUCCESS',
    getCourseByCodeError = 'GET_COURSE_BY_CODE_ERROR',

    // Update Course
    updateCoursePending = 'UPDATE_COURSE_PENDING',
    updateCourseSuccess = 'UPDATE_COURSE_SUCCESS',
    updateCourseError = 'UPDATE_COURSE_ERROR',
    
    // Remove/Deactivate Course
    deleteCoursePending = 'DELETE_COURSE_PENDING',
    deleteCourseSuccess = 'DELETE_COURSE_SUCCESS',
    deleteCourseError = 'DELETE_COURSE_ERROR',

    // Enroll Student
    enrollStudentPending = 'ENROLL_STUDENT_PENDING',
    enrollStudentSuccess = 'ENROLL_STUDENT_SUCCESS',
    enrollStudentError = 'ENROLL_STUDENT_ERROR',
}

export const RequestState = {
    Pending: { isPending: true, isSuccess: false, isError: false },
    Success: { isPending: false, isSuccess: true, isError: false },
    Error: { isPending: false, isSuccess: false, isError: true },
}

// ==================== CREATE COURSE ====================
export const createCoursePending = createAction<ICourseStateContext,ICourse>(
    CourseActionEnums.createCoursePending,
    () => RequestState.Pending
);

export const createCourseSuccess = createAction<ICourseStateContext,ICourse>(
    CourseActionEnums.createCourseSuccess,
    (course: ICourse) => ({ 
        ...RequestState.Success,
        course })
);

export const createCourseError = createAction<ICourseStateContext,string>(
    CourseActionEnums.createCourseError,
    (error: string) => ({ 
        ...RequestState.Error,
        error })
);

// ==================== GET ALL COURSES ====================
export const getAllCoursesPending = createAction<ICourseStateContext, ICourse>(
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
        error })
);

// ==================== GET COURSE BY ID ====================
export const getCourseByIdPending = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.getCourseByIdPending,
    () => RequestState.Pending
);

export const getCourseByIdSuccess = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.getCourseByIdSuccess,
    (course: ICourse) => ({ 
        ...RequestState.Success,
        course })
);

export const getCourseByIdError = createAction<ICourseStateContext, string>(
    CourseActionEnums.getCourseByIdError,
    (error: string) => ({ 
        ...RequestState.Error,
        error })
);

// ==================== GET COURSE BY TITLE ====================
export const getCourseByTitlePending = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.getCourseByTitlePending,
    () => RequestState.Pending
);

export const getCourseByTitleSuccess = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.getCourseByTitleSuccess,
    (course: ICourse) => ({ 
        ...RequestState.Success,
        course })
);

export const getCourseByTitleError = createAction<ICourseStateContext, string>(
    CourseActionEnums.getCourseByTitleError,
    (error: string) => ({ 
        ...RequestState.Error,
        error })
);

// ==================== GET COURSE BY CODE ====================
export const getCourseByCodePending = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.getCourseByCodePending,
    () => RequestState.Pending
);

export const getCourseByCodeSuccess = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.getCourseByCodeSuccess,
    (course: ICourse) => ({ 
        ...RequestState.Success,
        course })
);

export const getCourseByCodeError = createAction<ICourseStateContext, string>(
    CourseActionEnums.getCourseByCodeError,
    (error: string) => ({ 
        ...RequestState.Error,
        error })
);

// ==================== UPDATE COURSE ====================
export const updateCoursePending = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.updateCoursePending,
    () => RequestState.Pending
);

export const updateCourseSuccess = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.updateCourseSuccess,
    (course: ICourse) => ({ 
        ...RequestState.Success,
        course })
);

export const updateCourseError = createAction<ICourseStateContext, string>(
    CourseActionEnums.updateCourseError,
    (error: string) => ({ 
        ...RequestState.Error,
        error })
);

// ==================== DELETE COURSE ====================
export const deleteCoursePending = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.deleteCoursePending,
    () => RequestState.Pending
);

export const deleteCourseSuccess = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.deleteCourseSuccess,
    (course: ICourse) => ({ 
        ...RequestState.Success,
        course })
);

export const deleteCourseError = createAction<ICourseStateContext, string>(
    CourseActionEnums.deleteCourseError,
    (error: string) => ({ 
        ...RequestState.Error,
        error })
);

// ==================== ENROLL STUDENT ====================
export const enrollStudentPending = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.enrollStudentPending,
    () => RequestState.Pending
);

export const enrollStudentSuccess = createAction<ICourseStateContext, ICourse>(
    CourseActionEnums.enrollStudentSuccess,
    (course: ICourse) => ({ 
        ...RequestState.Success,
        course })
);

export const enrollStudentError = createAction<ICourseStateContext, string>(
    CourseActionEnums.enrollStudentError,
    (error: string) => ({ 
        ...RequestState.Error,
        error })
);
