import { IApplicationStateContext, ICourseApplication } from "@/src/providers/application-provider/context";
import { ICourse, ICourseStateContext } from "@/src/providers/course-provider/context";
import { IStudent, IStudentStateContext } from "@/src/providers/student-provider/context";
import { IContact, IContactStateContext } from "@/src/providers/contact-provider/context";
import {
  BookOutlined,
  BookTwoTone,
  CheckCircleOutlined,
  CheckCircleTwoTone,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";

export const RequestState = {
  Pending: { isPending: true, isSuccess: false, isError: false, error: undefined },
  Success: { isPending: false, isSuccess: true, isError: false , error: undefined},
  Error: { isPending: false, isSuccess: false, isError: true },
};

export const INITIAL_STATE = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export type StateMap =
  | IStudentStateContext
  | ICourseStateContext
  | IApplicationStateContext
  | IContactStateContext;

export interface IFileUploadProps {
  studentId: string;
  filename: string;
  label: string;
  accept?: string;
  disabled?: boolean;
};

// ==================== UI CONSTANTS ====================

// Component Data
interface Stat {
  number: string;
  label: string;
}

export const steps = [
    { title: "Personal Info", icon: <UserOutlined /> },
    { title: "Course", icon: <BookOutlined /> },
    { title: "Review", icon: <CheckCircleOutlined /> },
  ];

export const MAX_SIZE = 5 * 1024 * 1024;

export const stats: Stat[] = [
  { number: "500+", label: "Students Trained" },
  { number: "7", label: "Active Programmes" },
  { number: "95%", label: "Success Rate" },
];


export const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Programmes", href: "#programmes" },
  { label: "Contact", href: "#contact" },
];

export const programmesList = [
  {
    id: "computer-literacy",
    title: "Computer Literacy",
    description: "Basic to advanced computer skills training",
  },
  {
    id: "robotics",
    title: "Robotics & Coding",
    description: "Learn programming and build robots",
  },
  {
    id: "life-skills",
    title: "Life Skills Development",
    description: "Personal development and career readiness",
  },
  {
    id: "science-club",
    title: "Science Club",
    description: "Hands-on science experiments and projects",
  },
];

export const provinceOptions = [
  { value: "Gauteng", label: "Gauteng" },
  { value: "Western Cape", label: "Western Cape" },
  { value: "KwaZulu-Natal", label: "KwaZulu-Natal" },
  { value: "Eastern Cape", label: "Eastern Cape" },
  { value: "Free State", label: "Free State" },
  { value: "Limpopo", label: "Limpopo" },
  { value: "Mpumalanga", label: "Mpumalanga" },
  { value: "North West", label: "North West" },
  { value: "Northern Cape", label: "Northern Cape" },
];

export const genderOptions = [
  { value: 1, label: "Male" },
  { value: 2, label: "Female" },
  { value: 3, label: "Other" },
  { value: 4, label: "Prefer not to say" },
];

export const experienceOptions = [
  { value: "none", label: "No prior experience" },
  {
    value: "beginner",
    label: "Beginner - Some basic knowledge",
  },
  {
    value: "intermediate",
    label: "Intermediate - Have used before",
  },
  {
    value: "advanced",
    label: "Advanced - Comfortable with concepts",
  },
];

export interface IApplicationFormProps {
  courseList?: ICourse[];
  applicationState: IApplicationStateContext;
  resetApplicationState: () => void;
  createStudent: (student?: IStudent) => Promise<IStudent>;
  submitApplication: (application?: ICourseApplication) => Promise<void>;
  registerDocs: (studentId: string) => Promise<void>;
  getStudentByIdNumber: (idNumber: string) => Promise<IStudent | null>;
}

export type MessageVariant = 'success' | 'error' | 'warning' | 'info';

export const MESSAGE_ICONS: Record<MessageVariant, React.ReactNode> = {
  success: React.createElement(CheckCircleOutlined),
  error:   React.createElement(CloseCircleOutlined),
  warning: React.createElement(ExclamationCircleOutlined),
  info:    React.createElement(InfoCircleOutlined),
};

export const INITIAL_FORM_DATA: IContact = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};