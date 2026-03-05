import { createStyles } from "antd-style";

export const useFileUploadStyles = createStyles(({ token }) => ({
  wrapper: {
    width: "100%",
  },

  uploadBox: {
    border: `2px dashed ${token.colorBorder}`,
    borderRadius: "16px",
    padding: "20px 24px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    justifyContent: "center",
    position: "relative",
    "&:hover": {
      borderColor: "var(--color-teal)",
      background: "rgba(247, 147, 30, 0.04)",
    },

    "&.disabled": {
      cursor: "not-allowed",
      background: token.colorFillAlter,
      borderColor: token.colorBorder,
    },
  },

  icon: {
    fontSize: "28px",
    color: "var(--color-teal)",
  },

  textGroup: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  title: {
    fontSize: "15px",
    fontWeight: 600,
    color: "var(--color-teal)",
    marginBottom: "4px",
  },

  subtitle: {
    fontSize: "13px",
    color: "var(--color-dark-teal)",
  },

  filePreview: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#1a1a2e",
  },

  fileIcon: {
    fontSize: "24px",
    color: "var(--color-teal)",
  },

  removeIcon: {
    fontSize: "18px",
    color: "#ff4d4f",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      color: "#d9363e",
    },
  },

  error: {
    marginTop: "6px",
    fontSize: "12px",
    color: token.colorError,
  },

  success: {
    marginTop: "6px",
    fontSize: "12px",
    color: token.colorSuccess,
  },
}));
