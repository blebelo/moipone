import { IAddressStateContext } from "@/src/providers/address-provider/context";
import { IApplicationStateContext } from "@/src/providers/application-provider/context";
import { ICourseStateContext } from "@/src/providers/course-provider/context";
import { IStudentStateContext } from "@/src/providers/student-provider/context";
import {
  DesktopOutlined,
  RobotOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export const RequestState = {
  Pending: { isPending: true, isSuccess: false, isError: false },
  Success: { isPending: false, isSuccess: true, isError: false },
  Error: { isPending: false, isSuccess: false, isError: true },
};

export const INITIAL_STATE = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export type StateMap = IStudentStateContext | ICourseStateContext | IAddressStateContext | IApplicationStateContext;

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
    { title: "Personal Info" },
    { title: "Programme" },
    { title: "Guardian" },
    { title: "Review" },
  ];

export const MAX_SIZE = 5 * 1024 * 1024;

export const stats: Stat[] = [
  { number: "500+", label: "Students Trained" },
  { number: "7", label: "Active Programmes" },
  { number: "95%", label: "Success Rate" },
];


export const programmes = [
  {
    icon: <DesktopOutlined />,
    title: "Computer Literacy",
    description:
      "Foundational digital skills for learners of all ages, building confidence and capability in the digital world.",
    features: [
      "Microsoft Office Suite",
      "Internet & Email",
      "Digital Citizenship",
    ],
  },
  {
    icon: <RobotOutlined />,
    title: "Robotics & Coding",
    description:
      "Hands-on workshops teaching robotics fundamentals, problem solving, and creative thinking.",
    features: ["Scratch Programming", "Arduino Projects", "Robot Building"],
  },
  {
    icon: <TeamOutlined />,
    title: "Life Skills & Career",
    description:
      "Supporting youth with practical life tools, career talks, and pathways to employment.",
    features: ["CV Writing", "Interview Skills", "Financial Literacy"],
  },
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

