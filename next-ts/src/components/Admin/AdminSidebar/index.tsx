'use client'

import {
  LeftOutlined,
  LogoutOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminSidebarStyles } from './style';
import { useAuthActions, useAuthState } from '@/src/providers/auth-provider';
import { AdminSidebarProps, dashboardNavItems } from '@/src/lib/common/constants';


const AdminSidebar = ({ collapsed, onToggle }: AdminSidebarProps) => {
  const { styles } = useAdminSidebarStyles();
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuthActions();
  const { currentUser } = useAuthState();

  const isItemActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);
  const isMobileViewport = () => globalThis.matchMedia('(max-width: 64rem)').matches;
  const dashboardUserName = currentUser?.userName;
  const roleLabel = currentUser?.userRole;

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
            className={`${styles.logoImage} ${collapsed ? '' : styles.logoImageExpanded}`}
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
        {dashboardNavItems.map((section) => (
          <div key={section.section} className={`${styles.navSection} ${collapsed ? styles.navSectionCollapsed : ''}`}>
            {collapsed ? null : <p className={styles.navSectionTitle}>{section.section}</p>}
            {section.items.map((item) => {
              return (
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
                  {collapsed ? null : (
                    <>
                      <span className={`${styles.navText} ${isItemActive(item.path) ? styles.navTextActive : ''}`}>
                        {item.label}
                      </span>
                      {item.badge ? <span className={styles.navBadge}>{item.badge}</span> : null}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userCard}>
          <div className={styles.userAvatar}>
            <UserOutlined />
          </div>
          {collapsed ? null : (
            <div className={styles.userInfo}>
              <p className={styles.userName}>{dashboardUserName}</p>
              <p className={styles.userRole}>{roleLabel}</p>
            </div>
          )}
        </div>
        {collapsed ? null : (
          <button type="button" className={styles.logoutButton} onClick={logout}>
            <LogoutOutlined /> Sign Out
          </button>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;
