import { StudentProvider } from "@/src/providers/student-provider";
import { CourseProvider } from "@/src/providers/course-provider";
import { ApplicationProvider } from "@/src/providers/application-provider";
import { ContactProvider } from "@/src/providers/contact-provider";
import { AuthProvider } from "@/src/providers/auth-provider";
import AuthGuard from "@/src/components/AuthGuard";

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <StudentProvider>
        <CourseProvider>
          <ApplicationProvider>
            <ContactProvider>
              <AuthGuard redirectTo="/admin">
                {children}
              </AuthGuard>
            </ContactProvider>
          </ApplicationProvider>
        </CourseProvider>
      </StudentProvider>
    </AuthProvider>
  );
}
