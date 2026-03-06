import { createStyles } from "antd-style";

export const useContactStyles = createStyles(() => ({
  contactSection: {
    padding: "7.5rem 1.5rem",
    background: "var(--background)",
    position: "relative",
    overflow: "hidden",
    "@media (max-width: 56.25rem)": {
      padding: "6rem 1.25rem",
    },
    "@media (max-width: 48rem)": {
      padding: "5rem 1rem",
    },
    "@media (max-width: 30rem)": {
      padding: "4rem 0.875rem",
    },
  },
  container: {
    maxWidth: "75rem",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    gap: "5rem",
    alignItems: "center",
    "@media (max-width: 75rem)": {
      gap: "3.5rem",
    },
    "@media (max-width: 56.25rem)": {
      gridTemplateColumns: "1fr",
      gap: "2.5rem",
    },
  },
  content: {
    minWidth: 0,
    "@media (max-width: 56.25rem)": {
      textAlign: "center" as const,
    },
  },
  tag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background:
      "linear-gradient(135deg, rgba(44, 53, 49, 0.1) 0%, rgba(17, 100, 102, 0.1) 100%)",
    borderRadius: "3.125rem",
    padding: "0.5rem 1.25rem",
    marginBottom: "1.25rem",
    color: "var(--color-dark-teal)",
    fontSize: "0.875rem",
    fontWeight: 600,
    border: "0.0625rem solid rgba(44, 53, 49, 0.2)",
    fontFamily: "var(--font-primary)",
    "@media (max-width: 30rem)": {
      fontSize: "0.8125rem",
      padding: "0.45rem 1rem",
    },
  },
  title: {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 800,
    color: "var(--color-teal)",
    lineHeight: 1.2,
    marginBottom: "1.5rem",
    fontFamily: "var(--font-primary)",
    "@media (max-width: 30rem)": {
      marginBottom: "1rem",
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
    fontFamily: "var(--font-primary)",
    "@media (max-width: 48rem)": {
      fontSize: "0.975rem",
      marginBottom: "1.5rem",
    },
    "@media (max-width: 30rem)": {
      fontSize: "0.9375rem",
      lineHeight: 1.7,
      marginBottom: "1.25rem",
    },
  },
  infoCards: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    "@media (max-width: 30rem)": {
      gap: "0.75rem",
    },
  },
  infoCard: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1.25rem 1.5rem",
    background: "#ffffff",
    borderRadius: "1rem",
    border: "0.0625rem solid color-mix(in srgb, var(--color-mint) 65%, transparent)",
    boxShadow: "0 0.5rem 2rem -1rem rgba(9, 51, 52, 0.25)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateX(0.375rem)",
      borderColor: "color-mix(in srgb, var(--color-peach) 65%, transparent)",
      boxShadow: "0 0.75rem 2.25rem -1rem rgba(9, 51, 52, 0.28)",
    },
    "@media (max-width: 56.25rem)": {
      justifyContent: "flex-start",
      textAlign: "left" as const,
    },
    "@media (max-width: 30rem)": {
      padding: "1rem",
      gap: "0.75rem",
      borderRadius: "0.875rem",
    },
  },
  infoIcon: {
    width: "3rem",
    height: "3rem",
    borderRadius: "0.75rem",
    background: "linear-gradient(135deg, var(--color-teal) 0%, var(--color-dark-teal) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontSize: "1.125rem",
    flexShrink: 0,
    "@media (max-width: 30rem)": {
      width: "2.5rem",
      height: "2.5rem",
      fontSize: "1rem",
      borderRadius: "0.625rem",
    },
  },
  infoContent: {},
  infoLabel: {
    fontSize: "0.75rem",
    color: "var(--color-dark-teal)",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    marginBottom: "0.25rem",
    opacity: 0.8,
    fontFamily: "var(--font-primary)",
    "@media (max-width: 30rem)": {
      fontSize: "0.6875rem",
    },
  },
  infoValue: {
    fontSize: "1rem",
    color: "var(--color-text-dark)",
    fontWeight: 600,
    fontFamily: "var(--font-primary)",
    lineHeight: 1.4,
    wordBreak: "break-word" as const,
    "@media (max-width: 30rem)": {
      fontSize: "0.9375rem",
    },
  },
  formWrapper: {
    position: "relative",
    minWidth: 0,
  },
  formCard: {
    background: "#ffffff",
    borderRadius: "1.5rem",
    padding: "2.5rem",
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
    "@media (max-width: 56.25rem)": {
      padding: "2rem",
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
  formTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "var(--color-teal)",
    marginBottom: "0.5rem",
    fontFamily: "var(--font-primary)",
    "@media (max-width: 30rem)": {
      fontSize: "1.25rem",
    },
  },
  formSubtitle: {
    fontSize: "0.9375rem",
    color: "var(--color-dark-teal)",
    marginBottom: "2rem",
    fontFamily: "var(--font-primary)",
    opacity: 0.85,
    "@media (max-width: 30rem)": {
      fontSize: "0.875rem",
      marginBottom: "1.5rem",
    },
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
  },
  requiredMarkAsterisk: {
    color: "#ff4d4f",
    marginLeft: "0.25rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
    marginBottom: "1rem",
    "@media (max-width: 48rem)": {
      gridTemplateColumns: "1fr",
    },
  },
  inputGroup: {
    marginBottom: "1rem",
    ".ant-form-item-label > label": {
      fontSize: "0.875rem",
      fontWeight: 600,
      color: "var(--color-dark-teal)",
      paddingLeft: "0.125rem",
      fontFamily: "var(--font-primary)",
    },
    "@media (max-width: 30rem)": {
      marginBottom: "0.875rem",
      ".ant-form-item-label > label": {
        fontSize: "0.8125rem",
      },
    },
  },
  formGroupFull: {
    gridColumn: "span 2",
    "@media (max-width: 48rem)": {
      gridColumn: "span 1",
    },
  },
  inputIcon: {
    color: "var(--color-dark-teal)",
    padding: "0 0.35rem 0 0.25rem",
    opacity: 0.65,
  },
  input: {
    height: "3rem",
    borderRadius: "0.75rem",
    opacity: 0.9,
    "&& .ant-input": {
      fontFamily: "var(--font-primary)",
      fontSize: "0.9375rem",
      background: "#fdfcfa",
      color: "var(--color-text-dark)",
    },
    "&& input": {
      fontFamily: "var(--font-primary)",
    },
    "&:hover": {
      borderColor: "var(--color-teal)",
    },
    "&.ant-input-affix-wrapper-focused": {
      borderColor: "var(--color-teal)",
      boxShadow: "0 0 0 0.25rem color-mix(in srgb, var(--color-mint) 55%, transparent)",
    },
    "&& .ant-input::placeholder": {
      color: "color-mix(in srgb, var(--color-dark-teal) 45%, #ffffff)",
    },
    "@media (max-width: 30rem)": {
      height: "2.75rem",
      "&& .ant-input": {
        fontSize: "0.875rem",
      },
    },
  },
  otherInput: {
    height: "3rem",
    borderRadius: "0.75rem",
    opacity: 0.75,
    width: "100%",
    fontFamily: "var(--font-primary)",
    "&& .ant-select-selector": {
      height: "3rem !important",
      borderRadius: "0.75rem !important",
      fontFamily: "var(--font-primary) !important",
      fontSize: "0.9375rem !important",
    },
    "&& .ant-select-selection-item, && .ant-select-selection-placeholder, && .ant-select-selection-search-input": {
      fontFamily: "var(--font-primary) !important",
      fontSize: "0.9375rem !important",
    },
    "&:hover": {
      borderColor: "var(--color-teal)",
    },
    "@media (max-width: 30rem)": {
      height: "2.75rem",
      "&& .ant-select-selector": {
        height: "2.75rem !important",
      },
      "&& .ant-select-selection-item, && .ant-select-selection-placeholder, && .ant-select-selection-search-input": {
        fontSize: "0.875rem !important",
      },
    },
  },
  textarea: {
    width: "100%",
    padding: "0.875rem 1rem",
    borderColor: "color-mix(in srgb, var(--color-mint) 72%, #ffffff)",
    borderRadius: "0.75rem",
    fontSize: "0.9375rem",
    transition: "all 0.3s ease",
    background: "#fdfcfa",
    color: "var(--color-text-dark)",
    fontFamily: "var(--font-primary)",
    minHeight: "7.5rem",
    resize: "vertical" as const,
    "&:hover": {
      borderColor: "var(--color-teal)",
    },
    "&:focus": {
      outline: "none",
      borderColor: "var(--color-teal)",
      background: "#ffffff",
      boxShadow: "0 0 0 0.25rem color-mix(in srgb, var(--color-mint) 55%, transparent)",
    },
    "&::placeholder": {
      color: "color-mix(in srgb, var(--color-dark-teal) 45%, #ffffff)",
    },
    "@media (max-width: 30rem)": {
      minHeight: "6.5rem",
      fontSize: "0.875rem",
    },
  },
  submitButton: {
    width: "100%",
    height: "3.5rem",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "0.75rem",
    background: "var(--color-teal) !important",
    border: "none",
    color: "var(--color-text-light)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    boxShadow: "0 0.5rem 2rem -0.5rem rgba(17, 100, 102, 0.45)",
    fontFamily: "var(--font-primary)",
    "&:hover": {
      background: "var(--color-dark-teal) !important",
      transform: "translateY(-0.125rem)",
      boxShadow: "0 0.75rem 2.25rem -0.5rem rgba(9, 51, 52, 0.5)",
    },
    "&:disabled": {
      opacity: 0.75,
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "0 0.5rem 1.5rem -0.5rem rgba(17, 100, 102, 0.3)",
    },
    "@media (max-width: 30rem)": {
      height: "3.125rem",
      fontSize: "0.9375rem",
    },
  },
  floatingShape: {
    position: "absolute",
    width: "6rem",
    height: "6rem",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, color-mix(in srgb, var(--color-teal) 35%, transparent) 0%, color-mix(in srgb, var(--color-mint) 35%, transparent) 100%)",
    top: "-1.5rem",
    right: "-1.5rem",
    zIndex: -1,
    "@media (max-width: 37.5rem)": {
      display: "none",
    },
  },
}));
