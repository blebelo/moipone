'use client';
import * as Icons from "@ant-design/icons";
import { CheckCircleOutlined, ExceptionOutlined } from "@ant-design/icons";
import { useProgrammesStyles } from "./style";
import { ICourse } from "@/src/providers/course-provider/context";

interface ICourseProps{
  courseList?: ICourse[];
}; 

const Courses: React.FC<ICourseProps> = ({courseList}) => {
  const { styles } = useProgrammesStyles();

  return (
    <div id="programmes" className={styles.programmesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.tag}>
            <span>Our Courses</span>
          </div>
          <h2 className={styles.title}>Skills for the Future</h2>
          <p className={styles.subtitle}>
            We offer a range of programmes designed to equip young people with
            the skills they need to thrive in the modern economy.
          </p>
        </div>
        {courseList?.length == 0  
        ? 

        (<div className={styles.header}>
          <ExceptionOutlined className={styles.cardFeatureIcon}/>
        {/* <h2 className={styles.title}>No Courses Available</h2>  */}
        </div>)

        :
        (<div className={styles.grid}>
          {courseList?.map((course, index) => {
            const DynamicIcon = Icons[course.displayIcon as keyof typeof Icons] as
              | React.ComponentType<any>
              | undefined;

            return (
              <div key={index} className={styles.card}>
                <div
                  className={`${styles.cardIcon}`}
                >
                  {DynamicIcon ? <DynamicIcon /> : <ExceptionOutlined />}
                </div>
                <h3 className={styles.cardTitle}>{course.title}</h3>
                <p className={styles.cardDescription}>{course.description}</p>
                <div className={styles.cardFeatures}>
                  {course.features.map((feature, idx) => (
                    <div key={idx} className={styles.cardFeature}>
                      <CheckCircleOutlined className={styles.cardFeatureIcon} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                {/* TODO: Add link to course details page dynamically*/}
                {/* <div className={styles.cardLink}>
                  Learn more <ArrowRightOutlined />
                </div> */}
              </div>
            );
          })}
        </div>)}
      </div>
    </div>
  );
};

export default Courses;
