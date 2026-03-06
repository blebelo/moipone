import type { Metadata } from "next";
import "./globals.css";
import { AddressProvider } from "@/src/providers/address-provider";
import { StudentProvider } from "@/src/providers/student-provider";
import { CourseProvider } from "@/src/providers/course-provider";
import { ApplicationProvider } from "@/src/providers/application-provider";
import { ContactProvider } from "@/src/providers/contact-provider";
import favicon from "./favicon.png";

export const metadata: Metadata = {
  title: "Moipone Academy",
  icons: {
    icon: favicon.src,
    shortcut: favicon.src,
    apple: favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <AddressProvider>
          <StudentProvider>
            <CourseProvider>
              <ApplicationProvider>
                <ContactProvider>
                  {children}
                </ContactProvider>
              </ApplicationProvider>
            </CourseProvider>
          </StudentProvider>
        </AddressProvider>
      </body>
    </html>
  );
}
