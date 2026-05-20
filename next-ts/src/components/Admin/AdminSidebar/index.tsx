'use client'

import {
  BookOutlined,
  DashboardOutlined,
  FileTextOutlined,
  LeftOutlined,
  LogoutOutlined,
  RightOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ComponentType } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminSidebarStyles } from './style';
import { useAuthActions, useAuthState } from '@/src/providers/auth-provider';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  path: string;
  icon: ComponentType;
  label: string;
  badge?: string;
}

const navItems: { section: string; items: NavItem[] }[] = [
  {
    section: 'Main',
    items: [
      { path: '/admin/dashboard', icon: DashboardOutlined, label: 'Dashboard' },
      { path: '/admin/courses', icon: BookOutlined, label: 'Courses' },
      { path: '/admin/students', icon: UserOutlined, label: 'Students' },
      { path: '/admin/applications', icon: FileTextOutlined, label: 'Applications', badge: '12' },
    ],
  },
  {
    section: 'Settings',
    items: [{ path: '/admin/settings', icon: SettingOutlined, label: 'Settings' }],
  },
];

const AdminSidebar = ({ collapsed, onToggle }: AdminSidebarProps) => {
  const { styles } = useAdminSidebarStyles();
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuthActions();
  const { userName, userRole } = useAuthState();

  const isItemActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);
  const isMobileViewport = () => window.matchMedia('(max-width: 64rem)').matches;
  const dashboardUserName = userName
    ? (userName.includes('@') ? userName.split('@')[0] : userName).trim()
    : 'Admin User';
  const roleLabel = userRole
    ? userRole.split('.').pop()?.replace(/_/g, ' ').trim() ?? 'Administrator'
    : 'Administrator';

  const handleNavigate = (path: string) => {
    router.push(path);
    if (isMobileViewport() && !collapsed) {
      onToggle();
    }
  };

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : styles.sidebarExpanded}`}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.logo}
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Image
            src="/images/moipone-logo.png"
            alt="Moipone Academy"
            width={598}
            height={302}
            quality={100}
            className={`${styles.logoImage} ${!collapsed ? styles.logoImageExpanded : ''}`}
            priority
          />
        </button>
      </div>

      <button
        type="button"
        className={`${styles.drawerToggle} ${collapsed ? styles.drawerToggleCollapsed : ''}`}
        onClick={onToggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <RightOutlined /> : <LeftOutlined />}
      </button>

      <nav className={styles.nav}>
        {navItems.map((section) => (
          <div key={section.section} className={`${styles.navSection} ${collapsed ? styles.navSectionCollapsed : ''}`}>
            {!collapsed ? <p className={styles.navSectionTitle}>{section.section}</p> : null}
            {section.items.map((item) => (
              <button
                key={item.path}
                type="button"
                className={`${styles.navItem} ${collapsed ? styles.navItemCollapsed : ''} ${isItemActive(item.path) ? styles.navItemActive : ''}`}
                onClick={() => handleNavigate(item.path)}
                title={collapsed ? item.label : undefined}
              >
                <span className={`${styles.navIcon} ${isItemActive(item.path) ? styles.navIconActive : ''}`}>
                  <item.icon />
                </span>
                {!collapsed ? (
                  <>
                    <span className={`${styles.navText} ${isItemActive(item.path) ? styles.navTextActive : ''}`}>
                      {item.label}
                    </span>
                    {item.badge ? <span className={styles.navBadge}>{item.badge}</span> : null}
                  </>
                ) : null}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userCard}>
          <div className={styles.userAvatar}>
            <UserOutlined />
          </div>
          {!collapsed ? (
            <div className={styles.userInfo}>
              <p className={styles.userName}>{dashboardUserName}</p>
              <p className={styles.userRole}>{roleLabel}</p>
            </div>
          ) : null}
        </div>
        {!collapsed ? (
          <button type="button" className={styles.logoutButton} onClick={logout}>
            <LogoutOutlined /> Sign Out
          </button>
        ) : null}
      </div>
    </aside>
  );
};

export default AdminSidebar;
