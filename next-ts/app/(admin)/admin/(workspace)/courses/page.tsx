'use client';
import { useState } from 'react';
import { Modal } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  BookOutlined,
  UserOutlined,
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { mockCourses, Course } from '@/src/lib/common/mockData';
import { useStyles } from './style';
import CourseForm from '@/src/components/CourseForm';


const Courses = () => {
  const { styles } = useStyles();
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCourse = async (formData: any) => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: formData.title,
      description: formData.description,
      duration: `${formData.duration} days`,
      schedule: '',
      capacity: formData.capacity || 0,
      enrolled: 0,
      status: formData.isActive ? 'active' : 'upcoming',
      instructor: '',
      startDate: formData.startDate instanceof Date 
        ? formData.startDate.toISOString().split('T')[0]
        : formData.startDate,
    };
    
    setCourses([newCourse, ...courses]);
    setIsCreating(false);
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
    message.success('Course deleted successfully!');
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return styles.statusActive;
      case 'upcoming': return styles.statusUpcoming;
      case 'completed': return styles.statusCompleted;
      default: return '';
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Courses</h1>
          <p className={styles.subtitle}>Manage and create educational programmes</p>
        </div>
        <div className={styles.actions}>
          <div className={styles.searchWrapper}>
            <SearchOutlined className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search courses..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className={styles.addButton} onClick={() => setIsCreating(true)}>
            <PlusOutlined /> Add Course
          </button>
        </div>
      </div>

      <Modal
        open={isCreating}
        onCancel={() => setIsCreating(false)}
        width={700}
        footer={null}
        destroyOnClose
        styles={{
          body: {
            overflow: "visible",
            maxHeight: "none",
          },
        }}
        centered
      >
        <CourseForm
          onSubmit={handleCreateCourse}
          onSuccess={() => setIsCreating(false)}
          onError={() => {}}
        />
      </Modal>

      <div className={styles.grid}>
        {filteredCourses.map(course => (
          <div key={course.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <BookOutlined />
              </div>
              <div className={styles.cardTitleSection}>
                <h3 className={styles.cardTitle}>{course.name}</h3>
                <p className={styles.cardInstructor}>
                  <UserOutlined /> {course.instructor}
                </p>
              </div>
              <span className={`${styles.statusBadge} ${getStatusClass(course.status)}`}>
                {course.status}
              </span>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardDescription}>{course.description}</p>
              <div className={styles.cardMeta}>
                <span className={styles.metaItem}>
                  <CalendarOutlined /> {course.duration}
                </span>
                <span className={styles.metaItem}>
                  <UserOutlined /> {course.capacity} max
                </span>
              </div>
              <div className={styles.progressSection}>
                <div className={styles.progressHeader}>
                  <span className={styles.progressLabel}>Enrollment</span>
                  <span className={styles.progressValue}>{course.enrolled}/{course.capacity}</span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className={styles.cardActions}>
              <button className={styles.actionButton}>
                <EditOutlined /> Edit
              </button>
              <button 
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={() => handleDeleteCourse(course.id)}
              >
                <DeleteOutlined /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Courses;

//       <div className={styles.grid}>
//         {filteredCourses.map(course => (
//           <div key={course.id} className={styles.card}>
//             <div className={styles.cardHeader}>
//               <div className={styles.cardIcon}>
//                 <BookOutlined />
//               </div>
//               <div className={styles.cardTitleSection}>
//                 <h3 className={styles.cardTitle}>{course.name}</h3>
//                 <p className={styles.cardInstructor}>
//                   <UserOutlined /> {course.instructor}
//                 </p>
//               </div>
//               <span className={`${styles.statusBadge} ${getStatusClass(course.status)}`}>
//                 {course.status}
//               </span>
//             </div>
//             <div className={styles.cardBody}>
//               <p className={styles.cardDescription}>{course.description}</p>
//               <div className={styles.cardMeta}>
//                 <span className={styles.metaItem}>
//                   <CalendarOutlined /> {course.duration}
//                 </span>
//                 <span className={styles.metaItem}>
//                   <UserOutlined /> {course.capacity} max
//                 </span>
//               </div>
//               <div className={styles.progressSection}>
//                 <div className={styles.progressHeader}>
//                   <span className={styles.progressLabel}>Enrollment</span>
//                   <span className={styles.progressValue}>{course.enrolled}/{course.capacity}</span>
//                 </div>
//                 <div className={styles.progressBar}>
//                   <div 
//                     className={styles.progressFill} 
//                     style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className={styles.cardActions}>
//               <button className={styles.actionButton}>
//                 <EditOutlined /> Edit
//               </button>
//               <button 
//                 className={`${styles.actionButton} ${styles.deleteButton}`}
//                 onClick={() => handleDeleteCourse(course.id)}
//               >
//                 <DeleteOutlined /> Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Courses;
