import { AddressProvider } from "@/src/providers/address-provider";
import { StudentProvider } from "@/src/providers/student-provider";
import { CourseProvider } from "@/src/providers/course-provider";
import { ApplicationProvider } from "@/src/providers/application-provider";
import { ContactProvider } from "@/src/providers/contact-provider";


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AddressProvider>
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
    </AddressProvider>
  );
}
