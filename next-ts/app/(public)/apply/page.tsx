'use client';
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import ApplicationForm from "@/src/components/ApplicationForm";
import { useStudentActions, useStudentState } from "@/src/providers/student-provider";
import { IAddress } from "@/src/providers/address-provider/context";
import { IStudent } from "@/src/providers/student-provider/context";
import { ICourseApplication } from "@/src/providers/application-provider/context";
import { useAddressState } from "@/src/providers/address-provider";
import { useApplicationActions, useApplicationState } from "@/src/providers/application-provider";
import Loader from "@/src/components/Loader";
import { useCourseActions, useCourseState } from "@/src/providers/course-provider";
import { useEffect } from "react";
import dayjs from "dayjs";
import { calculateAge } from "@/src/lib/common/helper-methods";
import { message } from "antd";


const Apply : React.FC = () => {
  const studentActions = useStudentActions();
  const applicationActions = useApplicationActions();
  const courseActions = useCourseActions()

  const studentState = useStudentState();
  const addressState = useAddressState()
  const applicationState = useApplicationState()
  const courseState = useCourseState();

  useEffect(() => {
    courseActions.getAllCourses();
  }, [])
  
  const createStudent = async (address?: IAddress, student?: IStudent): Promise<void> => {
    try {
      if (address) {
        delete address.id;
      }

      if (student) {
        delete student.id;
        delete student.proofOfResidence;
        delete student.certifiedHighestQualification;
        delete student.certifiedId;
        delete student.curriculumVitae;
        student.idNumber = student.idNumber?.replace(/\s+/g, "");
        student.dateOfBirth = dayjs(student.dateOfBirth).format('YYYY-MM-DD');
        student.age = calculateAge(student.dateOfBirth)
    
        // console.log(student)
        studentActions.createStudent(student);
        console.log("Student Info Saved:", studentState.student);
      }
    } catch (error) {
      console.error("Error creating student:", error);
      message.error("An error occurred while registering student. Please try again."); 
    }
  };

  const submitApplication = async (application?: ICourseApplication): Promise<void> => {
    try {
      if (!application) return;

      applicationActions.createApplication(application);

      console.log("Application submitted successfully");
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };
  
  return (
      <div>
        {(addressState.isPending || studentState.isPending  || applicationState.isPending || courseState.isPending) && (
          <Loader />
        )}
        <Header />
          <ApplicationForm
            courseList={courseState.courses}
            createStudent={createStudent}
            submitApplication={submitApplication}
            registerDocs={studentActions.registerStudentDocuments}
            currentStudent={studentState.student}
           />
        <Footer />
      </div>
  );
};

export default Apply;
