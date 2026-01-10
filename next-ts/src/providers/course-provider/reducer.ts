'use client'
import { handleActions } from "redux-actions";
import { CourseActionEnums } from "./actions";
import { INITIAL_STATE } from "@/src/lib/common/constants";
import { ICourseStateContext } from "./context";
import { mergePayloadHandler } from "@/src/lib/common/helper-methods";

export const CourseReducer = handleActions<
  ICourseStateContext,
  ICourseStateContext
>(
  {
    // Create Course
    [CourseActionEnums.createCoursePending]: mergePayloadHandler,
    [CourseActionEnums.createCourseSuccess]: mergePayloadHandler,
    [CourseActionEnums.createCourseError]: mergePayloadHandler,

    // Get All Courses
    [CourseActionEnums.getAllCoursesPending]: mergePayloadHandler,
    [CourseActionEnums.getAllCoursesSuccess]: mergePayloadHandler,
    [CourseActionEnums.getAllCoursesError]: mergePayloadHandler,

    // Get Course By ID
    [CourseActionEnums.getCourseByIdPending]: mergePayloadHandler,
    [CourseActionEnums.getCourseByIdSuccess]: mergePayloadHandler,
    [CourseActionEnums.getCourseByIdError]: mergePayloadHandler,

    // Get Course By Code
    [CourseActionEnums.getCourseByCodePending]: mergePayloadHandler,
    [CourseActionEnums.getCourseByCodeSuccess]: mergePayloadHandler,
    [CourseActionEnums.getCourseByCodeError]: mergePayloadHandler,

    // Update Course
    [CourseActionEnums.updateCoursePending]: mergePayloadHandler,
    [CourseActionEnums.updateCourseSuccess]: mergePayloadHandler,
    [CourseActionEnums.updateCourseError]: mergePayloadHandler,

    // Delete Course
    [CourseActionEnums.deleteCoursePending]: mergePayloadHandler,
    [CourseActionEnums.deleteCourseSuccess]: mergePayloadHandler,
    [CourseActionEnums.deleteCourseError]: mergePayloadHandler,

    // Open Applications
    [CourseActionEnums.openApplicationsPending]: mergePayloadHandler,
    [CourseActionEnums.openApplicationsSuccess]: mergePayloadHandler,
    [CourseActionEnums.openApplicationsError]: mergePayloadHandler,

    // Close Applications
    [CourseActionEnums.closeApplicationsPending]: mergePayloadHandler,
    [CourseActionEnums.closeApplicationsSuccess]: mergePayloadHandler,
    [CourseActionEnums.closeApplicationsError]: mergePayloadHandler,

    // Get Open Courses
    [CourseActionEnums.getOpenCoursesPending]: mergePayloadHandler,
    [CourseActionEnums.getOpenCoursesSuccess]: mergePayloadHandler,
    [CourseActionEnums.getOpenCoursesError]: mergePayloadHandler,
  },
  INITIAL_STATE
);
