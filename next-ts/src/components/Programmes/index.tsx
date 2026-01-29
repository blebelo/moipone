import { ArrowRightOutlined, CheckCircleOutlined, DesktopOutlined, RobotOutlined, TeamOutlined } from "@ant-design/icons";
import { useProgrammesStyles } from "./style";

const programmes = [
  {
    icon: <DesktopOutlined />,
    title: "Computer Literacy",
    description:
      "Foundational digital skills for learners of all ages, building confidence and capability in the digital world.",
    features: [
      "Microsoft Office Suite",
      "Internet & Email",
      "Digital Citizenship",
    ]
  },
  {
    icon: <RobotOutlined />,
    title: "Robotics & Coding",
    description:
      "Hands-on workshops teaching robotics fundamentals, problem solving, and creative thinking.",
    features: ["Scratch Programming", "Arduino Projects", "Robot Building"]
  },
  {
    icon: <TeamOutlined/>,
    title: "Life Skills & Career",
    description:
      "Supporting youth with practical life tools, career talks, and pathways to employment.",
    features: ["CV Writing", "Interview Skills", "Financial Literacy"]
  },
];

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
