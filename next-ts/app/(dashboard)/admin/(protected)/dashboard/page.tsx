'use client'

import { ArrowRightOutlined, ArrowUpOutlined, BookOutlined, FileTextOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { dashboardStats, mockApplications, mockCourses } from '@/src/lib/common/mockData';
import { useAdminDashboardStyles } from './style';
import { getTimeGreeting } from '@/src/lib/common/helper-methods';


const DashboardPage = () => {
  const { styles } = useAdminDashboardStyles();
  const router = useRouter();
  const [greeting, setGreeting] = useState(getTimeGreeting);

  const pendingApps = mockApplications.filter((app) => app.status === 'pending').slice(0, 5);
  const activeCourses = mockCourses.filter((course) => course.status === 'active').slice(0, 4);

  useEffect(() => {
    const updateGreeting = () => setGreeting(getTimeGreeting());

    updateGreeting();
    const timer = window.setInterval(updateGreeting, 60_000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.greeting}>{greeting}</p>
        <h1 className={styles.title}>Welcome Back, Admin!</h1>
      </header>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconPrimary}`}>
            <UserOutlined />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Active Students</p>
            <p className={styles.statValue}>{dashboardStats.activeStudents}</p>
            <div className={styles.statTrend}>
              <ArrowUpOutlined /> +12% this month
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconSecondary}`}>
            <BookOutlined />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Active Courses</p>
            <p className={styles.statValue}>{dashboardStats.activeCourses}</p>
            <div className={styles.statTrend}>
              <ArrowUpOutlined /> 1 new this quarter
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconAccent}`}>
            <FileTextOutlined />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Pending Applications</p>
            <p className={styles.statValue}>{dashboardStats.pendingApplications}</p>
            <div className={styles.statTrend}>
              <ArrowUpOutlined /> 5 new today
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconTertiary}`}>
            <TrophyOutlined />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Graduated Students</p>
            <p className={styles.statValue}>{dashboardStats.graduatedStudents}</p>
            <div className={styles.statTrend}>
              <ArrowUpOutlined /> +24 this year
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mainGrid}>
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Active Courses</h3>
            <button type="button" className={styles.viewAllLink} onClick={() => router.push('/admin/courses')}>
              View All <ArrowRightOutlined />
            </button>
          </div>
          <div className={styles.cardBody}>
            {activeCourses.map((course) => {
              const fillPercent = course.capacity > 0
                ? Math.min(100, Math.round((course.enrolled / course.capacity) * 100))
                : 0;

              return (
                <div key={course.id} className={styles.courseItem}>
                  <div className={styles.courseIcon}>
                    <BookOutlined />
                  </div>
                  <div className={styles.courseInfo}>
                    <p className={styles.courseName}>{course.name}</p>
                    <p className={styles.courseDetails}>
                      {course.instructor} • {course.duration}
                    </p>
                  </div>
                  <div className={styles.courseStats}>
                    <p className={styles.courseEnrolled}>
                      {course.enrolled}/{course.capacity}
                    </p>
                    <p className={styles.courseCapacity}>enrolled</p>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: `${fillPercent}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Recent Applications</h3>
            <button
              type="button"
              className={styles.viewAllLink}
              onClick={() => router.push('/admin/applications')}
            >
              View All <ArrowRightOutlined />
            </button>
          </div>
          <div className={styles.cardBody}>
            {pendingApps.map((app) => (
              <div key={app.id} className={styles.applicationItem}>
                <div className={styles.applicantAvatar}>
                  <UserOutlined />
                </div>
                <div className={styles.applicantInfo}>
                  <p className={styles.applicantName}>{app.applicantName}</p>
                  <p className={styles.applicantCourse}>{app.course}</p>
                </div>
                <span
                  className={`${styles.statusBadge} ${app.status === 'pending'
                    ? styles.statusPending
                    : app.status === 'approved'
                      ? styles.statusApproved
                      : styles.statusRejected
                    }`}
                >
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default DashboardPage;
