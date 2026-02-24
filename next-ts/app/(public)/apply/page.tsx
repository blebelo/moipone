'use client';
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import ApplicationForm from "@/src/components/ApplicationForm";
import { useStudentActions, useStudentState } from "@/src/providers/student-provider";
import { IStudent } from "@/src/providers/student-provider/context";
import { ICourseApplication } from "@/src/providers/application-provider/context";
import { useAddressState } from "@/src/providers/address-provider";
import { useApplicationActions, useApplicationState } from "@/src/providers/application-provider";
import Loader from "@/src/components/Loader";
import { useCourseActions, useCourseState } from "@/src/providers/course-provider";
import { useEffect } from "react";


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
            createStudent={studentActions.createStudent}
            submitApplication={submitApplication}
            registerDocs={studentActions.registerStudentDocuments}
            studentState={studentState}
            getStudentByIdNumber={studentActions.getStudentByIdNumber}
           />
        <Footer />
      </div>
  );
};

export default Apply;
