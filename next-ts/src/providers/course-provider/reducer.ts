'use client'
import { handleActions } from "redux-actions";
import { CourseActionEnums } from "./actions";
import { INITIAL_STATE } from "@/src/lib/common/constants";
import { ICourseStateContext } from "./context";

export const CourseReducer = handleActions<ICourseStateContext, ICourseStateContext>({
    // Create Course
    [CourseActionEnums.createCoursePending]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.createCourseSuccess]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.createCourseError]: (state, action) => (
        { ...state,...action.payload }),
   
    // Get All Courses
    [CourseActionEnums.getAllCoursesPending]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.getAllCoursesSuccess]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.getAllCoursesError]: (state, action) => (
        { ...state,...action.payload }),

    // Get Course By ID
    [CourseActionEnums.getCourseByIdPending]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.getCourseByIdSuccess]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.getCourseByIdError]: (state, action) => (
        { ...state,...action.payload }),

    // Get Course By Code
    [CourseActionEnums.getCourseByCodePending]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.getCourseByCodeSuccess]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.getCourseByCodeError]: (state, action) => (
        { ...state,...action.payload }),

    // Update Course
    [CourseActionEnums.updateCoursePending]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.updateCourseSuccess]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.updateCourseError]: (state, action) => (
        { ...state,...action.payload }),

    // Delete Course
    [CourseActionEnums.deleteCoursePending]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.deleteCourseSuccess]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.deleteCourseError]: (state, action) => (
        { ...state,...action.payload }),

    // Open Applications
    [CourseActionEnums.openApplicationsPending]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.openApplicationsSuccess]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.openApplicationsError]: (state, action) => (
        { ...state,...action.payload }),

    // Close Applications
    [CourseActionEnums.closeApplicationsPending]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.closeApplicationsSuccess]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.closeApplicationsError]: (state, action) => (
        { ...state,...action.payload }),

    // Get Open Courses
    [CourseActionEnums.getOpenCoursesPending]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.getOpenCoursesSuccess]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.getOpenCoursesError]: (state, action) => (
        { ...state,...action.payload }),
}, INITIAL_STATE)