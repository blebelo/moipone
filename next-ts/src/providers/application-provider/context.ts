import { INITIAL_STATE } from "@/src/lib/common/constants";
import { createContext } from "react";
import { IStudent } from "../student-provider/context";
import { ICourse } from "../course-provider/context";

// ==================== ENUMS ====================
export enum RefListApplicationStatus {
  Pending = 1,
  Approved = 2,
  Declined = 3,
}

// ==================== ENTITIES ====================
export interface ICourseApplication {
  id?: string;
  student?: IStudent
  studentId?: string;
  shortCourse?: ICourse;
  shortCourseId?: string;
  status?: RefListApplicationStatus;
  decisionReason?: string;
  decisionDate?: Date;
  creationTime: Date;
}

// ==================== ADDRESS CONTEXT ====================
export interface IApplicationStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: string;
  application?: ICourseApplication;
  applications?: ICourseApplication[];
  creationTime?: Date;
}

export interface IApplicationActionContext {
  resetApplicationState: () => void;
  createApplication: (application: ICourseApplication) => Promise<void>;
  getApplicationById: (id: string) => Promise<void>;
  getAllApplications: () => Promise<void>;
  updateApplication: (id: string, application: ICourseApplication) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  getApplicationsByCourseId: (courseId: string) => Promise<void>;
  approveApplication: (id: string, reason?: string) => Promise<void>;
  rejectApplication: (id: string, reason?: string) => Promise<void>;
  withdrawApplication: (id: string, reason?: string) => Promise<void>;
}


export const ApplicationStateContext = createContext<IApplicationStateContext>(INITIAL_STATE);
export const ApplicationActionContext = createContext<IApplicationActionContext | undefined>(undefined);
