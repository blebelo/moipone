import WithAuth from '@/src/lib/AuthGuard';
import AdminLayout from '@/src/components/Admin/AdminLayout';

export default function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminLayout>
      <WithAuth>
        {children}
      </WithAuth>
    </AdminLayout>
  );
}
