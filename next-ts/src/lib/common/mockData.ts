// Mock data for admin dashboard

export interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  status: 'active' | 'upcoming' | 'completed';
  instructor: string;
  startDate: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  course: string;
  enrollmentDate: string;
  status: 'active' | 'graduated' | 'dropped';
  guardianName?: string;
  guardianPhone?: string;
}

export interface Application {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  course: string;
  guardianName: string;
  guardianPhone: string;
  guardianRelationship: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  documents: {
    id: string;
    name: string;
    type: string;
    url: string;
  }[];
  notes?: string;
}

export const mockCourses: ICourse[] = [
  {
    id: "1",
    title: "Computer Literacy Basics",
    code: "CLB-001",
    description:
      "Learn fundamental computer skills including Microsoft Office, internet navigation, and digital citizenship.",
    duration: 8,
    capacity: 25,
    startDate: new Date("2024-01-15"),
    isActive: true,
    displayIcon: "LaptopOutlined",
    requirements: "No prior computer experience required.",
    features: [
      "Microsoft Office",
      "Internet Navigation",
      "Digital Citizenship",
      "Practical Exercises",
    ],
    creationTime: new Date(),
  },
  {
    id: "2",
    title: "Introduction to Robotics",
    code: "ROB-001",
    description:
      "Hands-on robotics course teaching basic programming, electronics, and mechanical design using Arduino.",
    duration: 12,
    capacity: 20,
    startDate: new Date("2024-01-22"),
    isActive: true,
    displayIcon: "RobotOutlined",
    requirements: "Basic computer literacy recommended.",
    features: [
      "Arduino Programming",
      "Electronics",
      "Mechanical Design",
      "Practical Projects",
    ],
    creationTime: new Date(),
  },
  {
    id: "3",
    title: "Coding for Beginners",
    code: "COD-001",
    description:
      "Learn the fundamentals of programming using Python. Perfect for absolute beginners.",
    duration: 10,
    capacity: 30,
    startDate: new Date("2024-02-01"),
    isActive: true,
    displayIcon: "CodeOutlined",
    requirements: "No programming experience required.",
    features: [
      "Python Fundamentals",
      "Problem Solving",
      "Algorithms",
      "Hands-on Coding",
    ],
    creationTime: new Date(),
  },
  {
    id: "4",
    title: "Life Skills & Career Guidance",
    code: "LSC-001",
    description:
      "Develop essential life skills including communication, financial literacy, and career planning.",
    duration: 6,
    capacity: 40,
    startDate: new Date("2024-02-10"),
    isActive: true,
    displayIcon: "TeamOutlined",
    requirements: "Open to all students.",
    features: [
      "Communication Skills",
      "Financial Literacy",
      "Career Planning",
      "Personal Development",
    ],
    creationTime: new Date(),
  },
  {
    id: "5",
    title: "Advanced Robotics",
    code: "ROB-002",
    description:
      "Build on your robotics knowledge with advanced projects, sensors, and autonomous systems.",
    duration: 16,
    capacity: 15,
    startDate: new Date("2024-04-01"),
    isActive: false,
    displayIcon: "ExperimentOutlined",
    requirements: "Completion of Introduction to Robotics.",
    enrolledStudents: [
      {
        id: 's1',
        name: 'Lerato Molefe',
        email: 'lerato.m@email.com',
        phone: '+27 71 234 5678',}
        , {
        id: 's2',
        name: 'Thabo Sithole',
        email: 'thabo.s@email.com',
        phone: '+27 72 345 6789',
      }
    ],
    features: [
      "Advanced Sensors",
      "Autonomous Systems",
      "Complex Projects",
      "Industry Concepts",
    ],
    creationTime: new Date(),
  },
];

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Lerato Molefe',
    email: 'lerato.m@email.com',
    phone: '+27 71 234 5678',
    dateOfBirth: '2008-03-15',
    gender: 'female',
    course: 'Computer Literacy Basics',
    enrollmentDate: '2024-01-15',
    status: 'active',
    guardianName: 'Maria Molefe',
    guardianPhone: '+27 82 345 6789',
  },
  {
    id: '2',
    name: 'Thabo Sithole',
    email: 'thabo.s@email.com',
    phone: '+27 72 345 6789',
    dateOfBirth: '2007-07-22',
    gender: 'male',
    course: 'Introduction to Robotics',
    enrollmentDate: '2024-01-22',
    status: 'active',
    guardianName: 'Peter Sithole',
    guardianPhone: '+27 83 456 7890',
  },
  {
    id: '3',
    name: 'Naledi Khumalo',
    email: 'naledi.k@email.com',
    phone: '+27 73 456 7890',
    dateOfBirth: '2009-11-08',
    gender: 'female',
    course: 'Coding for Beginners',
    enrollmentDate: '2024-02-01',
    status: 'active',
    guardianName: 'Grace Khumalo',
    guardianPhone: '+27 84 567 8901',
  },
  {
    id: '4',
    name: 'Kabelo Ndaba',
    email: 'kabelo.n@email.com',
    phone: '+27 74 567 8901',
    dateOfBirth: '2006-05-30',
    gender: 'male',
    course: 'Life Skills & Career Guidance',
    enrollmentDate: '2024-02-10',
    status: 'active',
  },
  {
    id: '5',
    name: 'Mpho Tshabalala',
    email: 'mpho.t@email.com',
    phone: '+27 75 678 9012',
    dateOfBirth: '2008-09-14',
    gender: 'female',
    course: 'Introduction to Robotics',
    enrollmentDate: '2024-01-22',
    status: 'active',
    guardianName: 'John Tshabalala',
    guardianPhone: '+27 85 678 9012',
  },
  {
    id: '6',
    name: 'Sizwe Mkhize',
    email: 'sizwe.m@email.com',
    phone: '+27 76 789 0123',
    dateOfBirth: '2007-12-03',
    gender: 'male',
    course: 'Coding for Beginners',
    enrollmentDate: '2024-02-01',
    status: 'graduated',
  },
];

export const mockApplications: Application[] = [
  {
    id: '1',
    applicantName: 'Ayanda Mthembu',
    email: 'ayanda.m@email.com',
    phone: '+27 77 890 1234',
    dateOfBirth: '2009-04-18',
    gender: 'female',
    address: '123 Main Street, Soweto, Johannesburg',
    course: 'Computer Literacy Basics',
    guardianName: 'Sarah Mthembu',
    guardianPhone: '+27 86 789 0123',
    guardianRelationship: 'Mother',
    status: 'pending',
    submittedDate: '2024-03-01',
    documents: [
      { id: 'd1', name: 'Birth Certificate', type: 'pdf', url: '/docs/birth-cert.pdf' },
      { id: 'd2', name: 'School Report', type: 'pdf', url: '/docs/school-report.pdf' },
      { id: 'd3', name: 'ID Copy', type: 'image', url: '/docs/id-copy.jpg' },
    ],
  },
  {
    id: '2',
    applicantName: 'Bongani Zulu',
    email: 'bongani.z@email.com',
    phone: '+27 78 901 2345',
    dateOfBirth: '2008-08-25',
    gender: 'male',
    address: '456 Freedom Road, Alexandra, Johannesburg',
    course: 'Introduction to Robotics',
    guardianName: 'Joseph Zulu',
    guardianPhone: '+27 87 890 1234',
    guardianRelationship: 'Father',
    status: 'pending',
    submittedDate: '2024-03-02',
    documents: [
      { id: 'd4', name: 'Birth Certificate', type: 'pdf', url: '/docs/birth-cert-2.pdf' },
      { id: 'd5', name: 'Parent ID', type: 'image', url: '/docs/parent-id.jpg' },
    ],
  },
  {
    id: '3',
    applicantName: 'Dineo Phiri',
    email: 'dineo.p@email.com',
    phone: '+27 79 012 3456',
    dateOfBirth: '2007-01-12',
    gender: 'female',
    address: '789 Unity Avenue, Diepsloot, Johannesburg',
    course: 'Coding for Beginners',
    guardianName: 'Elizabeth Phiri',
    guardianPhone: '+27 88 901 2345',
    guardianRelationship: 'Mother',
    status: 'pending',
    submittedDate: '2024-03-03',
    documents: [
      { id: 'd6', name: 'Birth Certificate', type: 'pdf', url: '/docs/birth-cert-3.pdf' },
      { id: 'd7', name: 'School Report', type: 'pdf', url: '/docs/school-report-2.pdf' },
      { id: 'd8', name: 'Proof of Address', type: 'pdf', url: '/docs/address-proof.pdf' },
    ],
  },
  {
    id: '4',
    applicantName: 'Emmanuel Naidoo',
    email: 'emmanuel.n@email.com',
    phone: '+27 70 123 4567',
    dateOfBirth: '2009-06-07',
    gender: 'male',
    address: '321 Hope Street, Orange Farm, Johannesburg',
    course: 'Life Skills & Career Guidance',
    guardianName: 'Priya Naidoo',
    guardianPhone: '+27 89 012 3456',
    guardianRelationship: 'Mother',
    status: 'approved',
    submittedDate: '2024-02-25',
    documents: [
      { id: 'd9', name: 'Birth Certificate', type: 'pdf', url: '/docs/birth-cert-4.pdf' },
    ],
    notes: 'Approved for Q2 intake.',
  },
  {
    id: '5',
    applicantName: 'Fatima Moosa',
    email: 'fatima.m@email.com',
    phone: '+27 71 234 5678',
    dateOfBirth: '2008-02-20',
    gender: 'female',
    address: '654 Progress Lane, Lenasia, Johannesburg',
    course: 'Introduction to Robotics',
    guardianName: 'Ahmed Moosa',
    guardianPhone: '+27 80 123 4567',
    guardianRelationship: 'Father',
    status: 'rejected',
    submittedDate: '2024-02-20',
    documents: [
      { id: 'd10', name: 'Birth Certificate', type: 'pdf', url: '/docs/birth-cert-5.pdf' },
    ],
    notes: 'Incomplete documentation. Asked to reapply.',
  },
];

// Dashboard stats
export const dashboardStats = {
  totalStudents: 105,
  activeStudents: 92,
  totalCourses: 5,
  activeCourses: 4,
  pendingApplications: 12,
  approvedThisMonth: 8,
  graduatedStudents: 156,
  volunteerHours: 2400,
};
