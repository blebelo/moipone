'use client';
import { useEffect } from "react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Loader from "@/src/components/Loader";
import ApplicationForm from "@/src/components/ApplicationForm";
import { ICourseApplication } from "@/src/providers/application-provider/context";
import { useCourseActions, useCourseState } from "@/src/providers/course-provider";
import { useStudentActions, useStudentState } from "@/src/providers/student-provider";
import { useApplicationActions, useApplicationState } from "@/src/providers/application-provider";


const Apply : React.FC = () => {
  const studentActions = useStudentActions();
  const applicationActions = useApplicationActions();
  const courseActions = useCourseActions()

  const studentState = useStudentState();
  const applicationState = useApplicationState()
  const courseState = useCourseState();

  useEffect(() => {
    courseActions.getAllCourses();
  }, [])
  

  const submitApplication = async (application?: ICourseApplication): Promise<void> => {
    try {
      if (!application) {
        throw new Error("Application payload is required.");
      }
      const payload = { ...application };
      delete payload.id;
      await applicationActions.createApplication(payload);
    } catch (error) {
      console.error("Error submitting application:", error);
      throw error;
    }
  };
  
  return (
      <div>
        {(studentState.isPending  || applicationState.isPending || courseState.isPending) && (
          <Loader />
        )}
        <Header />
          <ApplicationForm
            courseList={courseState.courses}
            applicationState={applicationState}
            resetApplicationState={applicationActions.resetApplicationState}
            createStudent={studentActions.createStudent}
            submitApplication={submitApplication}
            registerDocs={studentActions.registerStudentDocuments}
            getStudentByIdNumber={studentActions.getStudentByIdNumber}
           />
        <Footer />
      </div>
  );
};

export default Apply;
