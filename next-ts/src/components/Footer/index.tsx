'use client';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { useFooterStyles } from "./style";
import { useRouter } from "next/navigation";
import { CONTACT_DETAILS } from "@/src/lib/common/constants";

const Footer : React.FC = () => {
  const { styles } = useFooterStyles();
  const router = useRouter();

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <p className={styles.brandDescription}>
              A community-driven science centre committed to empowering youth
              through real-world education in South Africa.
            </p>
            <div className={styles.socialLinks}>
              <a className={styles.socialLink}>
                <FacebookOutlined />
              </a>
              <a className={styles.socialLink}>
                <TwitterOutlined />
              </a>
              <a className={styles.socialLink}>
                <InstagramOutlined />
              </a>
              <a className={styles.socialLink}>
                <LinkedinOutlined />
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Programmes</h4>
            <div className={styles.columnLinks}>
              <a className={styles.columnLink}>Computer Literacy</a>
              <a className={styles.columnLink}>Robotics & Coding</a>
              <a className={styles.columnLink}>Life Skills</a>
              <a className={styles.columnLink}>Career Guidance</a>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Get Involved</h4>
            <div className={styles.columnLinks} onClick={() => {router.push('/apply')}}>
              <a className={styles.columnLink}>Apply Now</a>
              <a className={styles.columnLink}>Volunteer</a>
              <a className={styles.columnLink}>Partner With Us</a>
              <a className={styles.columnLink}>Donate</a>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact</h4>
            <div className={styles.columnLinks}>
              <a className={styles.columnLink}>{CONTACT_DETAILS.email}</a>
              <a className={styles.columnLink}>{CONTACT_DETAILS.phone}</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Moipone Academy. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <a className={styles.bottomLink}>Privacy Policy</a>
            <a className={styles.bottomLink}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
