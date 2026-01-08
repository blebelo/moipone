"use client";
import { handleActions } from "redux-actions";
import { IStudentStateContext } from "./context";
import { StudentActionEnums } from "./actions";
import { INITIAL_STATE } from "@/src/lib/common/constants";

export const StudentReducer = handleActions<
  IStudentStateContext,
  IStudentStateContext
>(
  {
    // createStudent
    [StudentActionEnums.createStudentPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StudentActionEnums.createStudentSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StudentActionEnums.createStudentError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // getAllStudents
    [StudentActionEnums.getAllStudentsPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StudentActionEnums.getAllStudentsSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StudentActionEnums.getAllStudentsError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // getStudentById
    [StudentActionEnums.getStudentByIdPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StudentActionEnums.getStudentByIdSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StudentActionEnums.getStudentByIdError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // updateStudent
    [StudentActionEnums.updateStudentPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StudentActionEnums.updateStudentSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StudentActionEnums.updateStudentError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // deleteStudent
    [StudentActionEnums.deleteStudentPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StudentActionEnums.deleteStudentSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StudentActionEnums.deleteStudentError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // getStudentByEmail
    [StudentActionEnums.getStudentByEmailPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StudentActionEnums.getStudentByEmailSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StudentActionEnums.getStudentByEmailError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
