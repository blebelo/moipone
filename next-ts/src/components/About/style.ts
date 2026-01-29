import { createStyles } from "antd-style";

export const useAboutStyles = createStyles(() => ({
  aboutSection: {
    padding: "4rem 1.5rem 1rem ",
  },
  container: {
    maxWidth: "75rem",
    margin: "0 auto",
    padding: "0 1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "5rem",
    alignItems: "center",
    "@media (max-width: 56.25rem)": {
      gridTemplateColumns: "1fr",
      gap: "3rem",
    },
  },
  content: {
    order: 2,
    "@media (max-width: 56.25rem)": {
      order: 1,
    },
  },
  header: {
    textAlign: "center",
    maxWidth: "43.75rem",
    margin: "0 auto 2rem",
  },
  tag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background:
      "linear-gradient(135deg, rgba(44, 53, 49, 0.1) 0%, rgba(17, 100, 102, 0.1) 100%)",
    borderRadius: "3.125rem",
    padding: "0.5rem 1.25rem",
    color: "var(--color-dark-teal)",
    fontSize: "0.875rem",
    fontWeight: 600,
    border: "1px solid rgba(44, 53, 49, 0.2)",
  },
  title: {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 800,
    color: "var(--color-text-dark)",
    lineHeight: 1.2,
    marginBottom: "1.5rem",
    fontFamily: "Outfit, sans-serif",
    "@media (max-width: 48rem)": {
      fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
    },
    "@media (max-width: 30rem)": {
      fontSize: "clamp(1.25rem, 7vw, 2rem)",
    },
  },
  titleHighlight: {
    color: "var(--color-dark-teal)",
  },
  description: {
    fontSize: "1.0625rem",
    color: "var(--color-dark-teal)",
    lineHeight: 1.8,
    marginBottom: "2rem",
    "@media (max-width: 48rem)": {
      fontSize: "0.9375rem",
      marginBottom: "1.5rem",
    },
    "@media (max-width: 30rem)": {
      fontSize: "0.875rem",
      marginBottom: "1rem",
    },
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.5rem",
    marginTop: "2.5rem",
    "@media (max-width: 56.25rem)": {
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1rem",
    },
    "@media (max-width: 30rem)": {
      gridTemplateColumns: "1fr",
      gap: "0.75rem",
    },
  },
  statItem: {
    textAlign: "center",
    padding: "1.5rem 1rem",
    background: "var(--color-background)",
    borderRadius: "1rem",
    boxShadow: "0 0.25rem 1.5rem -0.5rem rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-0.25rem)",
    },
    "@media (max-width: 30rem)": {
      padding: "1rem 0.75rem",
    },
  },
  statNumber: {
    fontSize: "2rem",
    fontWeight: 800,
    color: "var(--color-peach)",
    fontFamily: "Outfit, sans-serif",
    "@media (max-width: 30rem)": {
      fontSize: "1.5rem",
    },
  },
  statLabel: {
    fontSize: "0.875rem",
    color: "var(--color-teal-dark)",
    marginTop: "0.25rem",
    fontWeight: 500,
    "@media (max-width: 30rem)": {
      fontSize: "0.75rem",
    },
  },
  imageWrapper: {
    order: 1,
    position: "relative",
    "@media (max-width: 56.25rem)": {
      order: 2,
    },
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
    "@media (max-width: 37.5rem)": {
      gridTemplateColumns: "1fr",
    },
  },
  imageBox: {
    borderRadius: "1.25rem",
    overflow: "hidden",
    boxShadow: "0 0.5rem 2rem -0.5rem rgba(0,0,0,0.1)",
    "&:first-child": {
      gridColumn: "span 2",
    },
    "@media (max-width: 37.5rem)": {
      "&:first-child": {
        gridColumn: "span 1",
      },
    },
  },
  image: {
    width: "100%",
    height: "12.5rem",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.5s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
    "@media (max-width: 56.25rem)": {
      height: "11.25rem",
    },
    "@media (max-width: 30rem)": {
      height: "8.75rem",
    },
  },
  imageLarge: {
    height: "17.5rem",
    "@media (max-width: 56.25rem)": {
      height: "13.75rem",
    },
    "@media (max-width: 30rem)": {
      height: "10rem",
    },
  },
  floatingCard: {
    position: "absolute",
    bottom: "-1.5rem",
    right: "-1.5rem",
    background:
      "linear-gradient(135deg, rgb(44, 53, 49) 35%, rgba(17, 100, 102, 0.85) 100%)",
    borderRadius: "1rem",
    padding: "1.5rem",
    color: "var(--color-text-light)",
    boxShadow: "0 0.75rem 2.5rem -0.5rem rgba(0, 77, 64, 0.4)",
    "@media (max-width: 56.25rem)": {
      position: "static",
      marginTop: "1.5rem",
    },
    "@media (max-width: 30rem)": {
      padding: "1rem",
    },
  },
  floatingCardTitle: {
    fontSize: "1.125rem",
    fontWeight: 700,
    marginBottom: "0.25rem",
    "@media (max-width: 30rem)": {
      fontSize: "1rem",
    },
  },
  floatingCardText: {
    fontSize: "0.875rem",
    opacity: 0.85,
    "@media (max-width: 30rem)": {
      fontSize: "0.8125rem",
    },
  },
}));
