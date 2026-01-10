"use client";
import { handleActions } from "redux-actions";
import { IStudentStateContext } from "./context";
import { StudentActionEnums } from "./actions";
import { INITIAL_STATE } from "@/src/lib/common/constants";
import { mergePayloadHandler } from "@/src/lib/common/helper-methods";

export const StudentReducer = handleActions<
  IStudentStateContext,
  IStudentStateContext
>(
  {
    // createStudent
    [StudentActionEnums.createStudentPending]: mergePayloadHandler,
    [StudentActionEnums.createStudentSuccess]: mergePayloadHandler,
    [StudentActionEnums.createStudentError]: mergePayloadHandler,

    // getAllStudents
    [StudentActionEnums.getAllStudentsPending]: mergePayloadHandler,
    [StudentActionEnums.getAllStudentsSuccess]: mergePayloadHandler,
    [StudentActionEnums.getAllStudentsError]: mergePayloadHandler,

    // getStudentById
    [StudentActionEnums.getStudentByIdPending]: mergePayloadHandler,
    [StudentActionEnums.getStudentByIdSuccess]: mergePayloadHandler,
    [StudentActionEnums.getStudentByIdError]: mergePayloadHandler,

    // updateStudent
    [StudentActionEnums.updateStudentPending]: mergePayloadHandler,
    [StudentActionEnums.updateStudentSuccess]: mergePayloadHandler,
    [StudentActionEnums.updateStudentError]: mergePayloadHandler,

    // deleteStudent
    [StudentActionEnums.deleteStudentPending]: mergePayloadHandler,
    [StudentActionEnums.deleteStudentSuccess]: mergePayloadHandler,
    [StudentActionEnums.deleteStudentError]: mergePayloadHandler,

    // getStudentByEmail
    [StudentActionEnums.getStudentByEmailPending]: mergePayloadHandler,
    [StudentActionEnums.getStudentByEmailSuccess]: mergePayloadHandler,
    [StudentActionEnums.getStudentByEmailError]: mergePayloadHandler,
  },
  INITIAL_STATE
);