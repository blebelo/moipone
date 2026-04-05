import { StudentProvider } from "@/src/providers/student-provider";
import { CourseProvider } from "@/src/providers/course-provider";
import { ApplicationProvider } from "@/src/providers/application-provider";
import { ContactProvider } from "@/src/providers/contact-provider";
import { AuthProvider } from "@/src/providers/auth-provider";


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <StudentProvider>
        <CourseProvider>
          <ApplicationProvider>
            <CourseProvider>
              <ContactProvider>
                {children}
              </ContactProvider>
            </CourseProvider>
          </ApplicationProvider>
        </CourseProvider>
      </StudentProvider>
    </AuthProvider>
  );
}
