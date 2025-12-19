'use client'
import { createAction } from 'redux-actions';
import { IStudent, IStudentStateContext} from './context';

export enum StudentActionEnums {
  // Create Student
  createStudentPending = 'CREATE_STUDENT_PENDING',
  createStudentSuccess = 'CREATE_STUDENT_SUCCESS',
  createStudentError = 'CREATE_STUDENT_ERROR',
  
  // Get All Students
  getAllStudentsPending = 'GET_ALL_STUDENTS_PENDING',
  getAllStudentsSuccess = 'GET_ALL_STUDENTS_SUCCESS',
  getAllStudentsError = 'GET_ALL_STUDENTS_ERROR',
  
  // Get Student By ID
  getStudentByIdPending = 'GET_STUDENT_BY_ID_PENDING',
  getStudentByIdSuccess = 'GET_STUDENT_BY_ID_SUCCESS',
  getStudentByIdError = 'GET_STUDENT_BY_ID_ERROR',
  
  // Update Student
  updateStudentPending = 'UPDATE_STUDENT_PENDING',
  updateStudentSuccess = 'UPDATE_STUDENT_SUCCESS',
  updateStudentError = 'UPDATE_STUDENT_ERROR',
  
  // Delete Student
  deleteStudentPending = 'DELETE_STUDENT_PENDING',
  deleteStudentSuccess = 'DELETE_STUDENT_SUCCESS',
  deleteStudentError = 'DELETE_STUDENT_ERROR',
  
  // Get Student By Email
  getStudentByEmailPending = 'GET_STUDENT_BY_EMAIL_PENDING',
  getStudentByEmailSuccess = 'GET_STUDENT_BY_EMAIL_SUCCESS',
  getStudentByEmailError = 'GET_STUDENT_BY_EMAIL_ERROR',
  
}

export const RequestState = {
  Pending: { isPending: true, isSuccess: false, isError: false },
  Success: { isPending: false, isSuccess: true, isError: false },
  Error: { isPending: false, isSuccess: false, isError: true },
};

// ==================== CREATE STUDENT ====================
export const createStudentPending = createAction<IStudentStateContext>(
  StudentActionEnums.createStudentPending,
  () => RequestState.Pending
);

export const createStudentSuccess = createAction<IStudentStateContext, IStudent>(
  StudentActionEnums.createStudentSuccess,
  (student: IStudent) => ({
    ...RequestState.Success,
    student
  })
);

export const createStudentError = createAction<IStudentStateContext>(
  StudentActionEnums.createStudentError,
  () => RequestState.Error
);

// ==================== GET ALL STUDENTS ====================
export const getAllStudentsPending = createAction<IStudentStateContext>(
  StudentActionEnums.getAllStudentsPending,
  () => RequestState.Pending
);

export const getAllStudentsSuccess = createAction<IStudentStateContext, IStudent[]>(
  StudentActionEnums.getAllStudentsSuccess,
  (students: IStudent[]) => ({
    ...RequestState.Success,
    students
  })
);

export const getAllStudentsError = createAction<IStudentStateContext>(
  StudentActionEnums.getAllStudentsError,
  () => RequestState.Error
);

// ==================== GET STUDENT BY ID ====================
export const getStudentByIdPending = createAction<IStudentStateContext>(
  StudentActionEnums.getStudentByIdPending,
  () => RequestState.Pending
);

export const getStudentByIdSuccess = createAction<IStudentStateContext, IStudent>(
  StudentActionEnums.getStudentByIdSuccess,
  (student: IStudent) => ({
    ...RequestState.Success,
    student
  })
);

export const getStudentByIdError = createAction<IStudentStateContext>(
  StudentActionEnums.getStudentByIdError,
  () => RequestState.Error
);

// ==================== UPDATE STUDENT ====================
export const updateStudentPending = createAction<IStudentStateContext>(
  StudentActionEnums.updateStudentPending,
  () => RequestState.Pending
);

export const updateStudentSuccess = createAction<IStudentStateContext, IStudent>(
  StudentActionEnums.updateStudentSuccess,
  (student: IStudent) => ({
    ...RequestState.Success,
    student
  })
);

export const updateStudentError = createAction<IStudentStateContext>(
  StudentActionEnums.updateStudentError,
  () => RequestState.Error
);

// ==================== DELETE STUDENT ====================
export const deleteStudentPending = createAction<IStudentStateContext>(
  StudentActionEnums.deleteStudentPending,
  () => RequestState.Pending
);

export const deleteStudentSuccess = createAction<IStudentStateContext>(
  StudentActionEnums.deleteStudentSuccess,
  () => RequestState.Success
);

export const deleteStudentError = createAction<IStudentStateContext>(
  StudentActionEnums.deleteStudentError,
  () => RequestState.Error
);

// ==================== GET STUDENT BY EMAIL ====================
export const getStudentByEmailPending = createAction<IStudentStateContext>(
  StudentActionEnums.getStudentByEmailPending,
  () => RequestState.Pending
);

export const getStudentByEmailSuccess = createAction<IStudentStateContext, IStudent>(
  StudentActionEnums.getStudentByEmailSuccess,
  (student: IStudent) => ({
    ...RequestState.Success,
    student
  })
);

export const getStudentByEmailError = createAction<IStudentStateContext>(
  StudentActionEnums.getStudentByEmailError,
  () => RequestState.Error
);
