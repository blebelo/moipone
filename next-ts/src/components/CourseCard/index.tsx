'use client';

import React from 'react';
import * as Icons from '@ant-design/icons';
import {
  BookOutlined,
  CalendarOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  ExceptionOutlined,
} from '@ant-design/icons';
import { ICourse } from '@/src/providers/course-provider/context';
import { useCourseCardStyles } from './style';


interface CourseCardProps {
  course: ICourse;
  onEdit?: (course: ICourse) => void;
  onDelete?: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEdit,
  onDelete,
}) => {
  const { styles } = useCourseCardStyles();

  const DynamicIcon = Icons[
    course.displayIcon as keyof typeof Icons
  ] as React.ComponentType<any>;

  const totalstudents = course.enrolledStudents?.length ?? 0;
  const percentage =
    course.capacity && totalstudents 
      ? Math.min((totalstudents / course.capacity) * 100, 100)
      : 0;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>
          {DynamicIcon ? <DynamicIcon /> : <BookOutlined />}
        </div>

        <div className={styles.headerContent}>
          <h3 className={styles.title}>{course.title}</h3>

          {course && (
            <p className={styles.instructor}>
              <UserOutlined />
              {/* {course.instructor} */}
              John Doe
            </p>
          )}
          {/* TODO: Implement Instructor Logic In Backend + Integrate - CodeRabbit Remind Me*/}
        </div>

        {course && (
          <span className={styles.statusBadge}>
            {course.isActive} 
            {/* TODO: Change Status To RefList before PR - CodeRabbit Remind Me*/}
          </span>
        )}
      </div>

      <div className={styles.body}>
        <p className={styles.description}>
          {course.description || (
            <>
              <ExceptionOutlined /> No description available.
            </>
          )}
        </p>

        <div className={styles.meta}>
          {course.duration && (
            <div className={styles.metaItem}>
              <CalendarOutlined />
              <span>{course.duration}</span>
            </div>
          )}

          {course.capacity && (
            <div className={styles.metaItem}>
              <UserOutlined />
              <span>{course.capacity} max</span>
            </div>
          )}
        </div>

        {course &&
          course && (
            <div className={styles.progressSection}>
              <div className={styles.progressHeader}>
                <span>Enrollment</span>
                <span>
                  {totalstudents}/{course.capacity}
                </span>
              </div>

              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )}
      </div>

      {(onEdit || onDelete) && (
        <div className={styles.actions}>
          {onEdit && (
            <button
              className={styles.actionButton}
              onClick={() => onEdit(course)}
            >
              <EditOutlined />
              Edit
            </button>
          )}

          {onDelete && (
            <button
              className={`${styles.actionButton} ${styles.deleteButton}`}
              onClick={() => onDelete(course?.id)}
            >
              <DeleteOutlined />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseCard;