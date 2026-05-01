import { StudentProvider } from "@/src/providers/student-provider";
import { CourseProvider } from "@/src/providers/course-provider";
import { ApplicationProvider } from "@/src/providers/application-provider";
import { ContactProvider } from "@/src/providers/contact-provider";
import { AuthProvider } from "@/src/providers/auth-provider";
import WithAuth from "@/src/lib/AuthGuard";

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
              <ContactProvider>{children}</ContactProvider>
            </ApplicationProvider>
          </CourseProvider>
        </StudentProvider>
      </AuthProvider>
  );
}
