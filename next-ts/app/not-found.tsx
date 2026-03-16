"use client";

import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { ExclamationCircleFilled, HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { useNotFoundStyles } from "./not-found-style";

const REDIRECT_SECONDS = 15;

const NotFoundPage: React.FC = () => {
  const { styles } = useNotFoundStyles();
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.replace("/");
    }, REDIRECT_SECONDS * 1000);

    const countdownTimer = setInterval(() => {
      setSecondsLeft((previous) => (previous <= 1 ? 0 : previous - 1));
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownTimer);
    };
  }, [router]);

  return (
    <div>
      <Header />
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.formCard}>
            <div className={styles.outcomeContainer}>
              <div className={styles.icon}>
                <ExclamationCircleFilled />
              </div>
              <h1 className={styles.outcomeTitle}>Page Not Found</h1>
              <p className={styles.outcomeMessage}>
                The page you are looking for does not exist or may have moved.
                You will be redirected to the homepage in{" "}
                <span className={styles.countdownValue}>{secondsLeft}</span>{" "}
                seconds.
              </p>

              <div className={styles.outcomeActions}>
                <Button
                  type="primary"
                  size="large"
                  className={styles.fillButton}
                  icon={<HomeOutlined />}
                  onClick={() => router.push("/")}
                >
                  Return to Homepage
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
