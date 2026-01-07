'use client'
import { handleActions } from "redux-actions";
import {COURSE_INITIAL_STATE , ICourseStateContext } from "./context";
import { CourseActionEnums } from "./actions";

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

    // Get Course By Title
    [CourseActionEnums.getCourseByTitlePending]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.getCourseByTitleSuccess]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.getCourseByTitleError]: (state, action) => (
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

    // Enroll Student
    [CourseActionEnums.enrollStudentPending]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.enrollStudentSuccess]: (state, action) => (
        { ...state,...action.payload }),
    [CourseActionEnums.enrollStudentError]: (state, action) => (
        { ...state,...action.payload }),
}, COURSE_INITIAL_STATE)