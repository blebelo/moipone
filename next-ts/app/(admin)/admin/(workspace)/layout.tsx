import WithAuth from '@/src/components/AuthGuard';
import AdminLayout from '@/src/components/Admin/AdminLayout';

export default function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminLayout>
      <WithAuth redirectTo="/">
        {children}
      </WithAuth>
    </AdminLayout>
  );
}
