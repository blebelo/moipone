import { createContext } from "react";
import { IStudent } from "../student-provider/context";
import { INITIAL_STATE } from "@/src/lib/common/constants";

// ==================== ENTITIES ====================
export interface ICourse {
  id?: string;
  title: string;
  description: string;
  capacity?: number;
  requirements?: string;
  code?: string;
  isActive?: boolean;
  startDate: Date;
  duration: number;
  enrolledStudents?: IStudent[];
  // applicaions: IApplication[];
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
  createCourse: (course: ICourse) => Promise<void>;
  getAllCourses: () => Promise<void>;
  getCourseById: (id: string) => Promise<void>;
  updateCourse: (course: ICourse) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  getCourseByCode: (code: string) => Promise<void>;
  openApplications: (id: string) => Promise<void>;
  closeApplications: (id: string) => Promise<void>;
  getOpenCourses: () => Promise<void>;
}

// ==================== CONTEXTS ====================
export const CourseStateContext = createContext<ICourseStateContext>(INITIAL_STATE);
export const CourseActionContext = createContext<ICourseActionContext | undefined>(undefined);
