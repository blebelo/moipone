import { createStyles } from "antd-style";

export const useCourseFormStyles = createStyles(() => ({
  formCard: {
    background: "#ffffff",
    borderRadius: "1.5rem",
    padding: "2rem",
    boxShadow: "0 20px 60px -20px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(0, 0, 0, 0.04)",
    width: "100%",
    maxHeight: "70vh",
    overflowY: "auto",

    "&::-webkit-scrollbar": {
      width: "0.5rem",
    },

    "&::-webkit-scrollbar-thumb": {
      background: "rgba(17, 100, 102, 0.2)",
      borderRadius: "999px",
    },
  },

  header: {
    textAlign: "center" as const,
    marginBottom: "2rem",
  },

  title: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "var(--color-teal)",
    fontFamily: "var(--font-primary)",
    marginBottom: "0.5rem",
  },

  subtitle: {
    fontSize: "1rem",
    color: "var(--color-dark-teal)",
    lineHeight: 1.6,
    maxWidth: "32rem",
    margin: "0 auto",
    fontFamily: "var(--font-primary)",
  },

  form: {
    "&& .ant-form-item-required::before": {
      display: "none",
    },

    "&& .ant-form-item-required::after": {
      content: '" *"',
      color: "#ff4d4f",
      fontWeight: 600,
    },

    "& .ant-form-item": {
      marginBottom: "1rem",
    },
  },

  formSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.75rem",
  },

  sectionTitle: {
    fontSize: "1.125rem",
    fontWeight: 700,
    color: "var(--color-teal)",
    marginBottom: "1rem",
    fontFamily: "var(--font-primary)",
  },

  inputGroup: {
    marginBottom: "1rem",

    ".ant-form-item-label > label": {
      fontSize: "0.9375rem",
      fontWeight: 500,
      color: "var(--color-dark-teal)",
      fontFamily: "var(--font-primary)",
      paddingLeft: "0.25rem",
    },
  },

  input: {
    minHeight: "3rem",
    borderRadius: "0.75rem",
    fontFamily: "var(--font-primary)",

    "&:hover": {
      borderColor: "var(--color-teal)",
    },

    "&:focus": {
      borderColor: "var(--color-teal)",
      boxShadow: "0 0 0 3px rgba(17, 100, 102, 0.12)",
    },

    "&& .ant-input": {
      fontFamily: "var(--font-primary)",
    },

    "&& input": {
      fontFamily: "var(--font-primary)",
    },
  },

  textarea: {
    borderRadius: "0.75rem",

    "& textarea": {
      fontFamily: "var(--font-primary)",
    },
  },

  otherInput: {
    width: "100%",
    fontFamily: "var(--font-primary)",

    "& .ant-picker": {
      width: "100%",
      height: "3rem",
      borderRadius: "0.75rem",

      "&:hover": {
        borderColor: "var(--color-teal)",
      },
    },

    "& .ant-select-selector": {
      minHeight: "3rem !important",
      borderRadius: "0.75rem !important",
      display: "flex",
      alignItems: "center",
    },

    "& .ant-input-number": {
      width: "100%",
      minHeight: "3rem",
      borderRadius: "0.75rem",

      "&:hover": {
        borderColor: "var(--color-teal)",
      },
    },
  },

  featureContainer: {
    border: "1px solid rgba(17, 100, 102, 0.12)",
    borderRadius: "1rem",
    padding: "1.25rem",
    background:
      "linear-gradient(180deg, #f3faf8 0%, #ffffff 100%)",
  },

  featureLabel: {
    display: "block",
    marginBottom: "0.875rem",
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: "var(--color-teal)",
    fontFamily: "var(--font-primary)",
  },

  featureInputRow: {
    display: "flex",
    gap: "0.75rem",
    marginBottom: "1rem",
  },

  featureChipContainer: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "0.5rem",
  },

  featureChip: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",

    padding: "0.5rem 0.875rem",

    background: "rgba(17, 100, 102, 0.08)",
    color: "var(--color-teal)",

    border: "1px solid rgba(17, 100, 102, 0.15)",
    borderRadius: "999px",

    fontSize: "0.8125rem",
    fontWeight: 500,

    fontFamily: "var(--font-primary)",
  },

  featureChipRemove: {
    border: "none",
    background: "transparent",
    color: "var(--color-teal)",
    cursor: "pointer",
    padding: 0,
    fontSize: "1rem",
    lineHeight: 1,
  },

  formActions: {
    position: "sticky" as const,
    bottom: 0,

    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",

    marginTop: "2rem",
    paddingTop: "1rem",

    background: "#ffffff",

    borderTop:
      "1px solid rgba(17, 100, 102, 0.08)",
  },

  primaryButton: {
    height: "3rem",
    padding: "0 2rem",

    borderRadius: "0.75rem",

    background: "var(--color-teal) !important",
    border: "none",

    fontSize: "0.9375rem",
    fontWeight: 600,

    fontFamily: "var(--font-primary)",

    boxShadow:
      "0 4px 16px -4px rgba(17, 100, 102, 0.3)",

    transition: "all 0.3s ease",

    "&:hover": {
      transform: "translateY(-2px)",

      boxShadow:
        "0 8px 20px -8px rgba(17, 100, 102, 0.45)",
    },
  },

  outlineButton: {
    height: "3rem",
    padding: "0 2rem",

    borderRadius: "0.75rem",

    borderColor: "var(--color-teal) !important",

    color: "var(--color-teal) !important",

    fontWeight: 600,

    fontSize: "0.9375rem",

    fontFamily: "var(--font-primary)",

    "&:hover": {
      borderColor: "var(--color-teal) !important",

      background:
        "rgba(17, 100, 102, 0.06) !important",
    },
  },

  outcomeContainer: {
    textAlign: "center" as const,
    padding: "2rem 0",
  },

  icon: {
    width: "5rem",
    height: "5rem",

    margin: "0 auto 1.5rem",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: "50%",

    background:
      "linear-gradient(135deg, var(--color-teal) 0%, white 100%)",

    color: "#ffffff",

    fontSize: "2.5rem",
  },

  outcomeTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    color: "var(--color-teal)",
    marginBottom: "0.75rem",
    fontFamily: "var(--font-primary)",
  },

  outcomeMessage: {
    fontSize: "1rem",
    color: "var(--color-dark-teal)",
    lineHeight: 1.6,

    maxWidth: "36rem",

    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "1.5rem",

    fontFamily: "var(--font-primary)",
  },

  fillButton: {
    background: "var(--color-teal) !important",
    border: "none",

    color: "#ffffff",

    fontWeight: 600,

    fontSize: "0.9375rem",

    fontFamily: "var(--font-primary)",
  },
}));