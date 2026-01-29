import { createStyles } from "antd-style";

export const useHeaderStyles = createStyles(() => ({
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    zIndex: 1000,
    padding: "0.25rem",
    margin: 0,
    transition: "all 0.3s ease",
    background: "transparent",
  },

  headerScrolled: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(0.75rem)",
    boxShadow: "0 0.25rem 1.5rem -0.25rem rgba(0, 0, 0, 0.08)",
    padding: "0.75rem 0",
  },

  container: {
    maxWidth: "95vw",
    margin: "0 auto",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    height: "7.5rem !important",
    width: "auto !important",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },

  desktopNav: {
    "@media (max-width: 48rem)": {
      display: "none",
    },
  },

  navLink: {
    padding: "0.625rem 1.125rem",
    fontSize: "0.9375rem",
    fontWeight: 500,
    borderRadius: "0.625rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  navLinkLight: {
    color: "rgba(255, 255, 255, 0.85)",
    "&:hover": {
      color: "#ffffff",
      background: "rgba(255, 255, 255, 0.1)",
    },
  },

  navLinkDark: {
    color: "var(--color-dark-teal)",
    "&:hover": {
      color: "var(--color-teal)",
      background: "var(--color-mint)",
    },
  },

  applyButton: {
    height: "2.75rem",
    padding: "0 1.5rem",
    marginLeft: "0.5rem",
    fontSize: "0.9375rem",
    fontWeight: 600,
    borderRadius: "0.625rem",
    backgroundColor: "var(--color-light-peach)",
    color: "var(--color-text-dark)",
    boxShadow: "0 0.25rem 1rem -0.25rem rgba(17, 100, 102, 0.4)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "var(--color-peach)",
      transform: "translateY(-0.0625rem)",
    },
  },

  mobileMenuButton: {
    display: "none",
    "@media (max-width: 48rem)": {
      display: "block",
    },
  },

  mobileMenu: {
    padding: "1rem 1.5rem",
    borderTop: `1px solid var(--color-mint)`,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    "@media (min-width: 48.0625rem)": {
      display: "none",
    },
  },

  drawerLink: {
    display: "block",
    padding: "1rem 0",
    fontSize: "1rem",
  },

  drawerButton: {
    marginTop: "1rem",
  },
}));
