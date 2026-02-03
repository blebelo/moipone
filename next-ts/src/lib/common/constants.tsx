import { RefListApplicationStatus } from "@/src/providers/application-provider/context";
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

export type StateMap = IStudentStateContext | ICourseStateContext;

// ==================== UI CONSTANTS ====================

// Component Data
interface Stat {
  number: string;
  label: string;
}

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

export const steps = [
  { title: "Personal Info" },
  { title: "Programme" },
  { title: "Guardian" },
  { title: "Review" },
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
  { value: "gauteng", label: "Gauteng" },
  { value: "western-cape", label: "Western Cape" },
  { value: "kwazulu-natal", label: "KwaZulu-Natal" },
  { value: "eastern-cape", label: "Eastern Cape" },
  { value: "free-state", label: "Free State" },
  { value: "limpopo", label: "Limpopo" },
  { value: "mpumalanga", label: "Mpumalanga" },
  { value: "north-west", label: "North West" },
  { value: "northern-cape", label: "Northern Cape" },
];

export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer-not", label: "Prefer not to say" },
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

