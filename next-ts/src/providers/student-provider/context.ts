import { INITIAL_STATE } from "@/src/lib/common/constants";
import { createContext } from "react";

// ==================== ENUMS ====================
export enum RefListGender {
  Male = 1,
  Female = 2,
  Other = 3,
  PreferNotToSay = 4,
}

// ==================== ENTITIES ====================
export interface IAddress {
  id?: string;
  street: string;
  suburb: string;
  city: string;
  postalCode: string;
}

export interface IStudent {
  id?: string;
  name: string;
  surname: string;
  age: number;
  gender: RefListGender;
  emailAddress: string;
  idNumber: string;
  dateOfBirth: string;
  phoneNumber: string;
  residentialAddress?: IAddress;
  certifiedId: string;
  proofOfResidence: string;
  curriculumVitae: string;
  certifiedHighestQualification: string;
}

// ==================== STUDENT CONTEXT ====================
export interface IStudentStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: string;
  student?: IStudent;
  students?: IStudent[];
  totalStudentCount?: number;
}

export interface IStudentActionContext {
  createStudent: (student: IStudent) => Promise<void>;
  getAllStudents: () => Promise<void>;
  getStudentById: (id: string) => Promise<void>;
  updateStudent: (id: string, student: IStudent) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  getStudentByEmail: (email: string) => Promise<void>;
}


export const StudentStateContext = createContext<IStudentStateContext>(INITIAL_STATE);
export const StudentActionContext = createContext<IStudentActionContext | undefined>(undefined);
