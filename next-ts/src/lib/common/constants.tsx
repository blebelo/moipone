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
