"use client";
import React from "react";
import Header from "@/src/components/Header";
import { Button, Image } from "antd";
import {
  ArrowRightOutlined,
  PlayCircleOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { useHomePageStyles } from "./style";
import About from "@/src/components/About";
import Programmes from "@/src/components/Programmes";
import Footer from "@/src/components/Footer";


const scrollToAbout = () => {
  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
};

const HomePage: React.FC = () => {
  const { styles } = useHomePageStyles();

  return (
    <div>
      <Header />
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <Image
            src="/images/hero-pic.jpg"
            alt="Students learning robotics at Moipone Academy"
            className={styles.heroImage}
          />
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Empowering Youth Through{" "}
            <span className={styles.heroHighlight}>STEM Education</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Moipone Academy is a community-driven science centre committed to
            inspiring young minds with hands-on robotics, computer literacy, and
            life skills for a brighter future.
          </p>

          <div className={styles.heroButtons}>
            <Button type="primary" className={styles.primaryButton}>
              Apply for a Course <ArrowRightOutlined />
            </Button>
            <Button className={styles.secondaryButton}>
              <PlayCircleOutlined /> Watch Our Story
            </Button>
          </div>
        </div>

        <div className={styles.scrollIndicator} onClick={scrollToAbout}>
          <ArrowDownOutlined style={{ fontSize: "24px" }} />
        </div>
      </section>

      <About />
      <Programmes />
      <Footer />
    </div>
  );
};

export default HomePage;
