"use client";
import { Image } from "antd";
import { useAboutStyles } from "./style";

interface Stat {
  number: string;
  label: string;
}

const About: React.FC = () => {
  const { styles } = useAboutStyles();

  const stats: Stat[] = [
    { number: "500+", label: "Students Trained" },
    { number: "7", label: "Active Programmes" },
    { number: "95%", label: "Success Rate" },
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.tag}>
            <span>About Us</span>
          </div>
        </div>
        <div className={styles.grid}>
          {/* Hero Image Section */}
          <div className={styles.imageWrapper}>
            <div className={styles.imageGrid}>
              <div className={styles.imageBox}>
                <Image
                  src="/images/hero-pic.jpg"
                  alt="Students working on robotics"
                  className={styles.image}
                  style={{ objectFit: "cover", borderRadius: "0.75rem" }}
                />
              </div>
            </div>

            {/* Floating Card */}
            <div className={styles.floatingCard}>
              <div className={styles.floatingCardTitle}>Our Mission</div>
              <div className={styles.floatingCardText}>
                Empowering underprivileged youth with real-world skills
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={styles.content}>
            <h2 className={styles.title}>
              Building Tomorrow's{" "}
              <span className={styles.titleHighlight}>Innovators</span> Today
            </h2>

            <p className={styles.description}>
              Moipone Academy is a community-driven science and skills
              development centre committed to empowering youth through
              real-world education. We focus on computer literacy, robotics, and
              life skills to help learners prepare for employment and
              self-sufficiency in a rapidly changing digital economy.
            </p>

            <p className={styles.description}>
              Located in South Africa, we serve underprivileged communities by
              providing accessible, hands-on learning experiences that inspire
              curiosity and build confidence in young minds.
            </p>

            <div className={styles.stats}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <div
                    className={styles.statNumber}
                    style={{ color: "var(--color-peach)" }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className={styles.statLabel}
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
