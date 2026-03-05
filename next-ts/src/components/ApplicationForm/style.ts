import { createStyles } from "antd-style";

const newLocal = "Outfit, sans-serif";
export const useApplicationFormStyles = createStyles(() => ({
  section: {
    minHeight: "100vh",
    paddingTop: "7.5rem",
    paddingBottom: "5rem",
    background: "linear-gradient(180deg, #fef7ed 0%, #ffffff 100%)",
  },

  container: {
    maxWidth: "50rem",
    margin: "0 auto",
    padding: "0 1.5rem",
  },

  header: {
    textAlign: "center" as const,
    marginBottom: "3rem",
  },

  title: {
    fontSize: "2.625rem",
    fontWeight: 700,
    color: "var(--color-teal)",
    marginBottom: "1rem",

  },

  subtitle: {
    fontSize: "1.125rem",
    color: "var(--color-dark-teal)",
    maxWidth: "37.5rem",
    margin: "0 auto",
    lineHeight: 1.6,
  },

  formCard: {
    background: "#ffffff",
    borderRadius: "1.5rem",
    padding: "3rem",
    boxShadow: "0 20px 60px -20px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(0, 0, 0, 0.04)",
  },

  // ── Steps ──────────────────────────────────────────────────────────────────
  stepsContainer: {
    marginBottom: "2.5rem",
    padding: "1.25rem 1.75rem",
    borderRadius: "1rem",
  },

  formSteps: {
    // Waiting
    "&& .ant-steps-filled .ant-steps-item-wait":{
      color: "var(--color-teal) !important",
    },
    "&& .ant-steps-filled .ant-steps-item-wait .ant-steps-icon": { 
      color: "var(--color-teal) !important",
    },
    "&& .ant-steps-item-wait .ant-steps-item-icon": {
      color: "var(--color-teal) !important",
    },
    "&& .ant-steps-item-wait .ant-steps-icon": {
      color: "var(--color-teal) !important",
    },
    "&& .ant-steps-item-wait .ant-steps-item-title": {
      fontSize: "0.8125rem",
      fontWeight: 600,
      color: "var(--color-teal) !important",
      fontFamily: "var(--font-primary) !important",
    },

    // Active
    "&& .ant-steps-item-process .ant-steps-item-icon": {
      color: "var(--color-teal) !important",
      borderColor: "transparent",
    },
    "&& .ant-steps-item-process .ant-steps-icon": {
      color: "var(--color-teal) !important",
    },
    "&& .ant-steps-item-process .ant-steps-item-title": {
      fontSize: "0.975rem",
      fontWeight: 700,
      color: "var(--color-teal) !important",
      fontFamily: "var(--font-primary) !important",

    },

    // Finished
    "&& .ant-steps-item-finish .ant-steps-item-icon": {
      background: "var(--color-teal) !important",
      color: "white !important",
    },
    "&& .ant-steps-item-finish .ant-steps-icon": {
      color: "var(--color-teal) !important",
    },
    "&& .ant-steps-item-finish .ant-steps-item-title": {
      fontSize: "0.8125rem",
      fontWeight: 600,
      color: "var(--color-teal) !important",
      fontFamily: "var(--font-primary)",
    },

    // Connector lines 
    "&& .ant-steps-item-rail": {
      borderColor: "var(--color-teal) !important",
    },
    "&& .ant-steps-item-rail-wait": {
      borderColor: "var(--color-teal) !important",
    },
    "&& .ant-steps-item-rail-process": {
      borderColor: "var(--color-teal) !important",
    },
    "&& .ant-steps-item-rail-finish": {
      borderColor: "var(--color-teal) !important",
    },
  },

  // ── Form ──────────────────────────────────────────────────────────────────
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

  formSection: {
    marginBottom: "2rem",
  },

  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "var(--color-teal)",
    marginBottom: "1.5rem",
    fontFamily: "var(--font-primary)",
  },

  inputGroup: {
    marginBottom: "1.25rem",
    fontFamily: "var(--font-primary) !important",
    ".ant-form-item-label > label": {
      fontSize: "0.9375rem",
      fontWeight: 500,
      fontFamily: "var(--font-primary) !important",
      color: "var(--color-dark-teal) ",
      paddingLeft: '0.25rem',
    },
  },

  input: {
    height: "3rem",
    borderRadius: "0.75rem",
    opacity: 0.75,
    fontFamily: "var(--font-primary) !important",
    "&& .ant-input": {
      fontFamily: "var(--font-primary) !important",
    },
    "&& input": {
      fontFamily: "var(--font-primary) !important",
    },

    "&:hover": {
      borderColor: "var(--color-teal)",
    },
  },

  inputIcon: {
    color: "var(--color-dark-teal)",
    padding: "0 0.35rem 0 0.25rem",
    opacity: 0.6,
  },

  otherInput: {
    height: "3rem",
    borderRadius: "0.75rem",
    opacity: 0.75,
    fontFamily: "var(--font-primary)",
    width: "100%",

    "&:hover": {
      borderColor: "var(--color-teal)",
    },
  },

  textarea: {
    borderRadius: "0.75rem",
    fontSize: "0.9375rem",
  },

  // ── Buttons ───────────────────────────────────────────────────────────────
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    marginTop: "2rem",
    "& > :only-child": {
      marginLeft: "auto", 
    },
  },


  prevButton: {
    height: "3rem",
    padding: "0 2rem",
    borderRadius: "0.75rem",
    
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: "var(--color-teal) !important",
    transition: "transform 0.75s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 20px -8px rgba(247, 147, 30, 0.45)",
      borderColor: "var(--color-teal) !important",
    },
  },

  nextButton: {
    height: "3rem",
    padding: "0 2rem",
    borderRadius: "0.75rem",
    fontSize: "0.9375rem",
    fontWeight: 600,
    background: "var(--color-teal) !important",
    border: "none",
    boxShadow: "0 4px 16px -4px rgba(247, 147, 30, 0.4)",
    transition: "transform 0.75s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 20px -8px rgba(247, 147, 30, 0.45)",
    },
  },

  // ── Programme cards ───────────────────────────────────────────────────────
  programmeRadioHidden: {
    width: "100%",
    ".ant-radio": { display: "none" },
    ".ant-radio + span": {
      width: "100%",
      display: "block",
      padding: 0,
      paddingInlineStart: "2rem",
    },
  },

  programmeCheckIcon: {
    position: "absolute" as const,
    top: "50%",
    left: "1rem",
    transform: "translateY(-50%)",
    fontSize: "1.125rem",
    opacity: 0,
    color: "var(--color-teal)",
    transition: "opacity 0.2s ease, transform 0.2s ease",
    pointerEvents: "none",
  },

  programmeCheckIconSelected: {
    opacity: 1,
  },

  programmeOption: {
    position: "relative" as const,
    padding: "1rem",
    border: "2px solid #e8e8e8",
    borderRadius: "0.75rem",
    marginBottom: "0.75rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: "var(--color-teal)",
    },
    "&:hover .programme-check-icon": {
      opacity: 1,
      transform: "translateY(-50%)",
    },
  },

  programmeOptionSelected: {
    borderColor: "var(--color-teal)",
    background: "rgba(247, 147, 30, 0.08)",
    "& .programme-check-icon": {
      opacity: 1,
      transform: "translateY(-50%)",
    },
  },

  programmeTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    fontFamily: "var(--font-primary)",
    color: "var(--color-teal)",
    marginBottom: "0.25rem",
  },

  programmeDesc: {
    fontSize: "0.875rem",
    color: "var(--color-dark-teal)",
    fontFamily: "var(--font-primary)",
  },

  // ── Review cards (Step 3) ────────────────────────────────────────────────
  reviewCards: {
    display: "grid",
    gap: "1rem",
  },

  reviewCard: {
    background: "linear-gradient(180deg, #f3faf8 0%, #ffffff 100%)",
    border: "1px solid rgba(17, 100, 102, 0.2)",
    borderRadius: "0.875rem",
    padding: "1.25rem 1.5rem",
    boxShadow: "0 12px 30px -24px rgba(9, 51, 52, 0.35)",
  },

  reviewCardTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--color-teal)",
    marginBottom: "0.75rem",
    fontFamily: "var(--font-primary)",
  },

  reviewList: {
    display: "grid",
    gap: "0.5rem",
  },

  reviewRow: {
    margin: 0,
    display: "grid",
    gridTemplateColumns: "8rem 1fr",
    gap: "0.5rem",
    alignItems: "start",
  },

  reviewLabel: {
    color: "var(--color-dark-teal)",
    fontWeight: 600,
    fontSize: "0.875rem",
    fontFamily: "var(--font-primary)",
  },

  reviewValue: {
    color: "var(--color-text-dark)",
    fontSize: "0.9375rem",
    fontFamily: "var(--font-primary)",
    lineHeight: 1.5,
  },

  reviewEmpty: {
    opacity: 0.75,
    fontStyle: "italic",
  },

  
  icon: {
    width: "5rem",
    height: "5rem",
    background: "linear-gradient(135deg, var(--color-teal) 0%, white 100%)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
    fontSize: "2.5rem",
    color: "#ffffff",
  },

  errorIcon: {
    width: "5rem",
    height: "5rem",
    background: "linear-gradient(135deg, var(--color-teal) 0%, white 100%)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
    fontSize: "2.5rem",
    color: "#ffffff",
    boxShadow: "0 14px 30px rgba(255, 77, 79, 0.25)",
  },

  outcomeContainer: {
    textAlign: "center" as const,
    padding: "2.5rem 0",
  },

  outcomeTitle: {
    fontSize: "2.5rem",
    fontWeight: 800,
    color: "var(--color-teal)",
    marginBottom: "0.75rem",
  },

  outcomeMessage: {
    fontSize: "1rem",
    color: "var(--color-dark-teal)",
    marginBottom: "1.5rem",
    maxWidth: "38rem",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.6,
  },

  outcomeActions: {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "center",
    flexWrap: "wrap" as const,
  },

  fillButton: {
    background: "var(--color-teal) !important",
    border: "none",
    fontSize: "0.9375rem",
    fontFamily: "var(--font-primary)"
  },

  outlineButton: {
    borderColor: "var(--color-teal) !important",
    color: "var(--color-teal)",
    fontSize: "0.9375rem",
    fontFamily: "var(--font-primary)"
  }
}));
