import type { Metadata } from "next";
import { Manrope, Public_Sans } from "next/font/google";
import "./globals.css";
import { AttendanceRegisterProvider } from "@/providers/AttendanceRegisterProvider";
import { VisitProvider } from "@/providers/VisitProvider";
import { VisitorProvider } from "@/providers/VisitorProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Moipone Attendance",
    template: "%s | Moipone Attendance",
  },
  description: "Visitor check-in and attendance register for Moipone.",
  openGraph: {
    type: "website",
    title: "Moipone Attendance",
    description: "Visitor check-in and attendance register for Moipone.",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AttendanceRegisterProvider>
          <VisitorProvider>
            <VisitProvider>{children}</VisitProvider>
          </VisitorProvider>
        </AttendanceRegisterProvider>
      </body>
    </html>
  );
}
