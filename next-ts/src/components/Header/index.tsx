'use client';
import { useState, useEffect } from "react";
import { Button, Drawer, Image } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useHeaderStyles } from "./style";
import { useRouter } from "next/navigation";
import { scrolltoSection } from "@/src/lib/common/helper-methods";
import { navItems } from "@/src/lib/common/constants";

const Header : React.FC = () => {
  const { styles } = useHeaderStyles();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goHome = () => router.push("/");

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <div className={styles.container}>
        <Image
          src="/images/moipone-logo.png"
          alt="Moipone Academy Logo"
          className={styles.logo}
          preview={false}
          onClick={goHome}
        />

        <nav className={`${styles.nav} ${styles.desktopNav}`}>
          {navItems.map((item) => (
            <a
              key={item.label}
              className={`${styles.navLink} ${scrolled ? styles.navLinkDark : styles.navLinkLight}`}
              onClick={() => scrolltoSection(item.label.toLowerCase())}
            >
              {item.label}
            </a>
          ))}
          <Button type="primary" className={styles.applyButton}>
            Apply Now
          </Button>
        </nav>

        <Button
          type="text"
          icon={<MenuOutlined />}
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(true)}
          style={{ color: scrolled ? "var(--color-dark-teal)" : "var(--color-peach)" }}
        />
      </div>

      <Drawer
        title={<Image src="/images/moipone-logo.png" alt="Moipone Academy Logo" width={120} preview={false} />}
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        className={styles.drawer}
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className={styles.drawerLink}
            style={{ color: "var(--color-dark-teal)" }}
          >
            {item.label}
          </a>
        ))}
        <Button type="primary" block className={`${styles.applyButton} ${styles.drawerButton}`}>
          Apply Now
        </Button>
      </Drawer>
    </header>
  );
};

export default Header;
