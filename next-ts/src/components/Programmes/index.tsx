'use client';
import { ArrowRightOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useProgrammesStyles } from "./style";
import { programmes } from "@/src/lib/common/constants";

const Programmes: React.FC = () => {
  const { styles } = useProgrammesStyles();

  return (
    <section id="programmes" className={styles.programmesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.tag}>
            <span>Our Programmes</span>
          </div>
          <h2 className={styles.title}>Skills for the Future</h2>
          <p className={styles.subtitle}>
            We offer a range of programmes designed to equip young people with
            the skills they need to thrive in the modern economy.
          </p>
        </div>

        <div className={styles.grid}>
          {programmes.map((programme, index) => (
            <div key={index} className={styles.card}>
              <div
                className={`${styles.cardIcon}`}
              >
                {programme.icon}
              </div>
              <h3 className={styles.cardTitle}>{programme.title}</h3>
              <p className={styles.cardDescription}>{programme.description}</p>
              <div className={styles.cardFeatures}>
                {programme.features.map((feature, idx) => (
                  <div key={idx} className={styles.cardFeature}>
                    <CheckCircleOutlined className={styles.cardFeatureIcon} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className={styles.cardLink}>
                Learn more <ArrowRightOutlined />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programmes;
