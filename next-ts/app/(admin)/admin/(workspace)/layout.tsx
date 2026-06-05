import WithAuth from '@/src/components/AuthGuard';
import AdminLayout from '@/src/components/Admin/AdminLayout';
import { ApplicationProvider } from '@/src/providers/application-provider';
import { ContactProvider } from '@/src/providers/contact-provider';
import { CourseProvider } from '@/src/providers/course-provider';
import { StudentProvider } from '@/src/providers/student-provider';

export default function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WithAuth redirectTo="/admin">
      <StudentProvider>
        <CourseProvider>
          <ApplicationProvider>
            <ContactProvider>
              <AdminLayout>{children}</AdminLayout>
            </ContactProvider>
          </ApplicationProvider>
        </CourseProvider>
      </StudentProvider>
    </WithAuth>
  );
}
