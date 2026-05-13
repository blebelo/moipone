'use client'

import { ArrowRightOutlined, ArrowUpOutlined, BookOutlined, FileTextOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { dashboardStats, mockApplications, mockCourses } from '@/src/lib/common/mockData';
import { useAdminDashboardStyles } from './style';
import { getTimeGreeting } from '@/src/lib/common/helper-methods';
import { useStudentActions, useStudentState } from '@/src/providers/student-provider';


const DashboardPage : React.FC = () => {
  const router = useRouter();
  const studentActions = useStudentActions();
  const studentState = useStudentState();
  const { styles } = useAdminDashboardStyles();
  const [greeting, setGreeting] = useState(getTimeGreeting);

  const pendingApps = mockApplications.filter((app) => app.status === 'pending').slice(0, 5);
  const activeCourses = mockCourses.filter((course) => course.status === 'active').slice(0, 4);
  const students = studentState.students ?? [];
  const studentPreview = students.slice(0, 5);
  const hasLoadedStudents = useRef(false);

  useEffect(() => {
    const updateGreeting = () => setGreeting(getTimeGreeting());

    updateGreeting();
    const timer = globalThis.setInterval(updateGreeting, 60_000);

    studentActions.getAllStudents();
    return () => {
      globalThis.clearInterval(timer);
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
            <p className={styles.statValue}>{students.length}</p>
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

      <section className={styles.kanbanGrid}>
        <article className={styles.kanbanCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Applications</h3>
          </div>
          <div className={styles.kanbanBody}>
            <div className={styles.kanbanList}>
              {pendingApps.map((app) => (
                <div key={app.id} className={styles.applicationItem}>
                  <div className={styles.listItemIcon}>
                    <FileTextOutlined />
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
            <button
              type="button"
              className={styles.seeMoreButton}
              onClick={() => router.push('/admin/applications')}
            >
              See More <ArrowRightOutlined />
            </button>
          </div>
        </article>

        <article className={styles.kanbanCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Courses</h3>
          </div>
          <div className={styles.kanbanBody}>
            <div className={styles.kanbanList}>
              {activeCourses.map((course) => {
                const fillPercent = course.capacity > 0
                  ? Math.min(100, Math.round((course.enrolled / course.capacity) * 100))
                  : 0;

                return (
                  <div key={course.id} className={styles.courseItem}>
                    <div className={styles.listItemIcon}>
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
            <button
              type="button"
              className={styles.seeMoreButton}
              onClick={() => router.push('/admin/courses')}
            >
              See More <ArrowRightOutlined />
            </button>
          </div>
        </article>

        <article className={styles.kanbanCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Students</h3>
          </div>
          <div className={styles.kanbanBody}>
            <div className={styles.kanbanList}>
              {studentState.isPending && studentPreview.length === 0 ? (
                <p className={styles.emptyState}>Loading students...</p>
              ) : null}

              {studentState.isError ? (
                <p className={styles.emptyState}>Couldn&apos;t load students right now.</p>
              ) : null}

              {!studentState.isPending && !studentState.isError && studentPreview.length === 0 ? (
                <p className={styles.emptyState}>No students found.</p>
              ) : null}

              {!studentState.isError && studentPreview.map((student, index) => (
                <div key={`${student.id ?? student.emailAddress ?? index}`} className={styles.applicationItem}>
                  <div className={styles.listItemIcon}>
                    <UserOutlined />
                  </div>
                  <div className={styles.applicantInfo}>
                    <p className={styles.applicantName}>
                      {`${student.name ?? ''} ${student.surname ?? ''}`.trim() || 'Unnamed Student'}
                    </p>
                    <p className={styles.applicantCourse}>
                      {student.emailAddress || student.phoneNumber || 'No contact details'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className={styles.seeMoreButton}
              onClick={() => router.push('/admin/students')}
            >
              See More <ArrowRightOutlined />
            </button>
          </div>
        </article>
      </section>
    </div>
  );
};

export default DashboardPage;
