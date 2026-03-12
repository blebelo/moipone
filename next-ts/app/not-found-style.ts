import { createStyles } from "antd-style";

export const useNotFoundStyles = createStyles(() => ({
  section: {
    minHeight: "100vh",
    padding: "7.5rem 1.5rem 5rem",
    background: "var(--background)",
    display: "flex",
    alignItems: "center",
    "@media (max-width: 48rem)": {
      padding: "6rem 1rem 4rem",
    },
    "@media (max-width: 30rem)": {
      padding: "5rem 0.875rem 3rem",
    },
  },
  container: {
    width: "100%",
    maxWidth: "50rem",
    margin: "0 auto",
  },
  formCard: {
    background: "#ffffff",
    borderRadius: "1.5rem",
    padding: "2.5rem",
    width: "100%",
    boxShadow: "0 1rem 3rem -0.75rem rgba(9, 51, 52, 0.18)",
    border: "0.0625rem solid color-mix(in srgb, var(--color-mint) 65%, transparent)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "0.25rem",
      background:
        "linear-gradient(90deg, var(--color-dark-teal) 0%, var(--color-teal) 50%, var(--color-teal) 100%)",
    },
    "@media (max-width: 37.5rem)": {
      padding: "1.5rem 1.25rem",
      borderRadius: "1.25rem",
    },
    "@media (max-width: 30rem)": {
      padding: "1.25rem 1rem",
      borderRadius: "1rem",
    },
  },
  outcomeContainer: {
    textAlign: "center" as const,
    padding: "2.5rem 0",
    "@media (max-width: 30rem)": {
      padding: "1.5rem 0",
    },
  },
  icon: {
    width: "5rem",
    height: "5rem",
    background: "linear-gradient(135deg, var(--color-teal) 0%, #ffffff 100%)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
    fontSize: "2.25rem",
    color: "#ffffff",
    "@media (max-width: 30rem)": {
      width: "4rem",
      height: "4rem",
      fontSize: "1.875rem",
      marginBottom: "1rem",
    },
  },
  outcomeTitle: {
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
    fontWeight: 800,
    color: "var(--color-teal)",
    marginBottom: "0.75rem",
    fontFamily: "var(--font-primary)",
  },
  outcomeMessage: {
    fontSize: "clamp(0.9375rem, 2.2vw, 1rem)",
    color: "var(--color-dark-teal)",
    marginBottom: "1.5rem",
    maxWidth: "38rem",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.6,
    fontFamily: "var(--font-primary)",
  },
  outcomeActions: {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "center",
    flexWrap: "wrap" as const,
    "@media (max-width: 30rem)": {
      flexDirection: "column" as const,
      width: "100%",
    },
  },
  fillButton: {
    background: "var(--color-teal) !important",
    border: "none",
    fontSize: "0.9375rem",
    fontFamily: "var(--font-primary)",
    "@media (max-width: 30rem)": {
      width: "100%",
    },
  },
  countdownValue: {
    color: "var(--color-teal)",
    fontWeight: 700,
  },
}));
