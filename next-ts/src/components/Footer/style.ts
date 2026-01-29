import { createStyles } from "antd-style";

export const useFooterStyles = createStyles(() => ({
  footer: {
    background: "var(--color-teal)",
    color: "var(--color-text-light)",
    padding: "5rem 1.5rem 2.5rem",
  },
  container: {
    maxWidth: "75rem",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "2fr repeat(3, 1fr)",
    gap: "3.75rem",
    marginBottom: "2rem",
    "@media (max-width: 56.25rem)": {
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "2.5rem",
    },
    "@media (max-width: 37.5rem)": {
      gridTemplateColumns: "1fr",
    },
  },
  brand: {},

  brandDescription: {
    fontSize: "0.9375rem",
    color: "rgba(209, 232, 226, 0.65)",
    lineHeight: 1.7,
    marginBottom: "1.5rem",
    maxWidth: "18.75rem",
  },
  socialLinks: {
    display: "flex",
    gap: "0.75rem",
  },
  socialLink: {
    width: "2.625rem",
    height: "2.625rem",
    borderRadius: "0.75rem",
    background: "rgba(209, 232, 226, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(209, 232, 226, 0.7)",
    fontSize: "1.125rem",
    transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      background:
        "linear-gradient(135deg, var(--color-peach) 0%, var(--color-light-peach) 100%)",
      color: "var(--color-text-dark)",
      transform: "translateY(-0.125rem)",
    },
  },
  column: {},
  columnTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--color-text-light)",
    marginBottom: "1.25rem",
    fontFamily: "Outfit, sans-serif",
  },
  columnLinks: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.75rem",
  },
  columnLink: {
    fontSize: "0.9375rem",
    color: "rgba(209, 232, 226, 0.6)",
    textDecoration: "none",
    transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      color: "var(--color-peach)",
    },
  },
  bottom: {
    borderTop: "0.0625rem solid rgba(209, 232, 226, 0.1)",
    paddingTop: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap" as const,
    gap: "1rem",
  },
  copyright: {
    fontSize: "0.875rem",
    color: "rgba(209, 232, 226, 0.5)",
  },
  bottomLinks: {
    display: "flex",
    gap: "1.5rem",
  },
  bottomLink: {
    fontSize: "0.875rem",
    color: "rgba(209, 232, 226, 0.5)",
    textDecoration: "none",
    transition: "color 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      color: "var(--color-peach)",
    },
  },
}));
