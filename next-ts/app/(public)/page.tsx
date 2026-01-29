"use client";
import React from "react";
import Header from "@/src/components/Header";
import { Button } from "antd";
import {
  ArrowRightOutlined,
  PlayCircleOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { useHomePageStyles } from "./style";
import About from "@/src/components/About";
import Programmes from "@/src/components/Programmes";
import Footer from "@/src/components/Footer";
import { scrolltoSection } from "@/src/lib/common/helper-methods"

const HomePage: React.FC = () => {
  const { styles } = useHomePageStyles();

  return (
    <div>
      <Header />
      <section className={styles.heroSection}>
        <div className={styles.heroBackground} />


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

        <div className={styles.scrollIndicator} 
        onClick={() => scrolltoSection("about")}
        onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              scrolltoSection("about");
            }
        }}>
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
