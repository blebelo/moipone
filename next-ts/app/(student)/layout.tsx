import { ApplicationProvider } from '@/src/providers/application-provider';

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ApplicationProvider>{children}</ApplicationProvider>;
}
