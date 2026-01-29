import { createStyles } from "antd-style";

export const useHomePageStyles = createStyles(() => ({
  /* Hero Section */
  heroSection: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: "0 1rem", 
  },
  heroBackground: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    "&::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(135deg, rgba(44, 53, 49, 0.85) 0%, rgba(17, 100, 102, 0.85) 100%)",
    },
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

/* Hero Content */
heroContent: {
  position: "relative",
  zIndex: 10,
  textAlign: "center",
  maxWidth: "60vw",
  width: "100%",
  padding: "0 1rem",

  "@media(max-width: 1024px)": { // tablet
    maxWidth: "70vw",
    padding: "0 0.75rem",
  },
  "@media(max-width: 768px)": { // small tablet
    maxWidth: "85vw",
    padding: "0 0.5rem",
  },
  "@media(max-width: 480px)": { // mobile
    maxWidth: "95vw",
    padding: "0 0.5rem",
  },
},

heroTitle: {
  fontSize: "clamp(2rem, 6vw, 4.5rem)",
  fontWeight: 800,
  color: "var(--color-text-light)",
  lineHeight: 1.1,
  padding: "1rem 0 2rem",
  marginBottom: "1.5rem",
  fontFamily: "Lexend, sans-serif",
  textShadow: "0 0.25rem 1.5rem rgba(0, 0, 0, 0.3)",

  "@media(max-width: 1024px)": {
    fontSize: "clamp(1.75rem, 5vw, 4rem)",
    marginBottom: "1.25rem",
  },
  "@media(max-width: 768px)": {
    fontSize: "clamp(1.5rem, 6vw, 3.5rem)",
    marginBottom: "1rem",
  },
  "@media(max-width: 480px)": {
    fontSize: "clamp(1.25rem, 7vw, 3rem)",
    marginBottom: "0.75rem",
  },
},

heroHighlight: {
  color: "var(--color-peach)",
},

heroSubtitle: {
  fontSize: "clamp(0.9rem, 2vw, 1.35rem)",
  color: "rgba(255, 255, 255, 0.85)",
  lineHeight: 1.5,
  marginBottom: "2rem",
  maxWidth: "45vw",
  marginLeft: "auto",
  marginRight: "auto",
  fontWeight: 400,

  "@media(max-width: 1024px)": {
    maxWidth: "60vw",
    fontSize: "clamp(0.85rem, 2vw, 1.25rem)",
    marginBottom: "1.75rem",
  },
  "@media(max-width: 768px)": {
    maxWidth: "80vw",
    fontSize: "clamp(0.8rem, 2.5vw, 1.1rem)",
    marginBottom: "1.5rem",
  },
  "@media(max-width: 480px)": {
    maxWidth: "95vw",
    fontSize: "clamp(0.75rem, 3vw, 1rem)",
    marginBottom: "1rem",
  },
},


  /* Hero Buttons */
  heroButtons: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "0.75rem", // smaller gap on small screens
  },
  primaryButton: {
    height: "3.375rem",
    padding: "0 1.75rem",
    fontSize: "clamp(0.9rem, 1vw, 1rem)", // scale on small screens
    fontWeight: 600,
    borderRadius: "0.75rem",
    background:
      "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
    boxShadow: "0 0.5rem 2rem -0.5rem rgba(247, 147, 30, 0.5)",
    transition: "all 0.3s ease",
    "&:hover": {
      background:
        "linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%) !important",
      transform: "translateY(-0.125rem)",
      boxShadow: "0 0.75rem 2.5rem -0.5rem rgba(247, 147, 30, 0.6)",
    },
  },
  secondaryButton: {
    height: "3.375rem",
    padding: "0 1.75rem",
    fontSize: "clamp(0.9rem, 1vw, 1rem)",
    fontWeight: 600,
    borderRadius: "0.75rem",
    color: "var(--color-peach)",
    background: "rgba(255, 255, 255, 0.1)",
    border: "0.125rem solid rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(0.5rem)",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "var(--color-dark-teal) !important",
      background: "var(--color-light-peach) !important",
      backgroundOpacity: "0.01",
      borderColor: "var(--color-peach) !important",
    },
  },

  /* Scroll Indicator */
  scrollIndicator: {
    position: "absolute",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
    animation: "bounce 2s infinite",
    color: "var(--color-peach)",
    cursor: "pointer",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "rgba(255, 255, 255, 0.9)",
    },
  },

  /* Media queries */
  "@media(max-width: 768px)": {
    
    heroTitle: {
      fontSize: "clamp(1.8rem, 7vw, 3rem)",
    },
    heroSubtitle: {
      fontSize: "clamp(0.85rem, 3vw, 1.1rem)",
      maxWidth: "90%",
    },
    heroButtons: {
      flexDirection: "column",
      gap: "0.5rem",
    },
    heroContent: {
      maxWidth: "95%",
    },
  },

  "@media(max-width: 480px)": {
      heroBackground: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    "&::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(135deg, rgba(44, 53, 49, 0.85) 0%, rgba(17, 100, 102, 0.85) 100%)",
    },
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
    heroTitle: {
      fontSize: "clamp(1.5rem, 8vw, 2.5rem)",
    },
    heroSubtitle: {
      fontSize: "clamp(0.8rem, 3.5vw, 1rem)",
      maxWidth: "95%",
    },
    primaryButton: {
      width: "100%",
    },
    secondaryButton: {
      width: "100%",
    },
  },
}));
