import AuthGuard from '@/src/components/AuthGuard';
import { ApplicationProvider } from '@/src/providers/application-provider';
import { AuthProvider } from '@/src/providers/auth-provider';

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
          <ApplicationProvider>
            {children}
          </ApplicationProvider>
    </AuthProvider>
  );
}
