'use client'
import { createContext } from "react";
import { IStudent } from "../student-provider/context";

// ==================== ENUMS ====================
export enum RefListCourseLevel {
  Beginner = 1,
  Intermediate = 2,
  Advanced = 3,
}

// ==================== ENTITIES ====================
export interface ICourse {
  id?: string;
  title: string;
  description: string;
  capacity?: number;
  requirements?: string;
  code?: string;
  isActive?: boolean;
  level: RefListCourseLevel;
  startDate: string;
  duration: number;
  endDate: string;
  instructorId?: string;
  instructorName: string;
  enrolledStudents?: IStudent[];
}

// ==================== COURSE STATE CONTEXT ====================
export interface ICourseStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: string;
  course?: ICourse;
  courses?: ICourse[];
  totalCourseCount?: number;
}

// ==================== COURSE ACTION CONTEXT ====================
export interface ICourseActionContext {
  createCourses: (course: ICourse) => Promise<void>;
  getAllCourses: () => Promise<void>;
  getCourseById: (id: string) => Promise<void>;
  updateCourse: (id: string, course: ICourse) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  getCourseByTitle: (title: string) => Promise<void>;
  enrollStudent?: (courseId: string, studentId: string) => Promise<void>; 
}

// ==================== INITIAL STATE ====================
export const COURSE_INITIAL_STATE: ICourseStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

// ==================== CONTEXTS ====================
export const CourseStateContext = createContext<ICourseStateContext>(COURSE_INITIAL_STATE);
export const CourseActionContext = createContext<ICourseActionContext | undefined>(undefined);
