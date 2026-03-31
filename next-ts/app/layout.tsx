import type { Metadata } from "next";
import "./(public)/globals.css";
import favicon from "./(public)/favicon.png";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "Moipone Academy",
  icons: {
    icon: favicon.src,
    shortcut: favicon.src,
    apple: favicon.src,
  },
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
