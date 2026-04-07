'use client'

import { useEffect, useState } from 'react';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import AdminSidebar from '../AdminSidebar';
import { useAdminLayoutStyles } from './style';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { styles } = useAdminLayoutStyles();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 64rem)');

    const syncSidebarState = (isMobile: boolean) => {
      setSidebarCollapsed(isMobile);
    };

    syncSidebarState(mobileQuery.matches);

    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      syncSidebarState(event.matches);
    };

    mobileQuery.addEventListener('change', handleBreakpointChange);
    return () => {
      mobileQuery.removeEventListener('change', handleBreakpointChange);
    };
  }, []);

  return (
    <div className={styles.layout}>
      <button
        type="button"
        className={`${styles.mobileDrawerButton} ${sidebarCollapsed ? styles.mobileDrawerButtonVisible : ''}`}
        onClick={() => setSidebarCollapsed(false)}
        aria-label="Open sidebar"
      >
        <MenuUnfoldOutlined />
      </button>

      <button
        type="button"
        className={`${styles.mobileBackdrop} ${!sidebarCollapsed ? styles.mobileBackdropVisible : ''}`}
        aria-label="Close sidebar"
        onClick={() => setSidebarCollapsed(true)}
      />

      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`${styles.main} ${sidebarCollapsed ? styles.mainCollapsed : styles.mainExpanded}`}>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
