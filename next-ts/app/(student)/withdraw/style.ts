import { createStyles } from 'antd-style';

export const useWithdrawFormStyles = createStyles(() => ({
  section: {
    minHeight: '100vh',
    paddingTop: '5.75rem',
    paddingBottom: '5rem',
    background:
      'linear-gradient(180deg, color-mix(in srgb, var(--color-light-peach) 35%, #ffffff) 0%, #ffffff 60%, color-mix(in srgb, #ef4444 8%, #ffffff) 100%)',
    position: 'relative' as const,
    overflow: 'hidden',
    fontFamily: 'var(--font-primary)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-10rem',
      right: '-10rem',
      width: '30rem',
      height: '30rem',
      background:
        'radial-gradient(circle, color-mix(in srgb, var(--color-light-peach) 35%, transparent) 0%, transparent 70%)',
      borderRadius: '50%',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-10rem',
      left: '-10rem',
      width: '30rem',
      height: '30rem',
      background:
        'radial-gradient(circle, color-mix(in srgb, var(--color-teal) 15%, transparent) 0%, transparent 70%)',
      borderRadius: '50%',
    },
    '@media (max-width: 768px)': {
      paddingTop: '4.75rem',
      paddingBottom: '4rem',
    },
    '@media (max-width: 480px)': {
      paddingTop: '4.25rem',
      paddingBottom: '3.5rem',
    },
  },
  container: {
    maxWidth: '50rem',
    margin: '0 auto',
    padding: '0 1.5rem',
    position: 'relative' as const,
    zIndex: 1,
    '@media (max-width: 480px)': {
      padding: '0 1rem',
    },
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '3rem',
    '@media (max-width: 768px)': {
      marginBottom: '2rem',
    },
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.25rem',
  },
  logoImage: {
    height: '5rem !important',
    width: 'auto !important',
    '@media (max-width: 480px)': {
      height: '4rem !important',
    },
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'color-mix(in srgb, var(--color-light-peach) 38%, transparent)',
    color: 'var(--color-dark-teal)',
    borderRadius: '999px',
    fontSize: '0.875rem',
    fontWeight: 600,
    marginBottom: '1.25rem',
    '@media (max-width: 480px)': {
      fontSize: '0.8125rem',
      padding: '0.45rem 0.85rem',
    },
  },
  title: {
    fontSize: 'clamp(1.9rem, 6vw, 2.625rem)',
    fontWeight: 700,
    color: 'var(--color-text-dark)',
    marginBottom: '1rem',
    fontFamily: 'var(--font-primary)',
    lineHeight: 1.15,
  },
  subtitle: {
    fontSize: 'clamp(0.95rem, 3.5vw, 1.125rem)',
    color: 'var(--color-dark-teal)',
    maxWidth: '37.5rem',
    margin: '0 auto',
    lineHeight: 1.6,
    fontFamily: 'var(--font-primary)',
  },
  card: {
    background: '#ffffff',
    borderRadius: '1.5rem',
    padding: '3rem',
    boxShadow: '0 1.25rem 3.75rem -1.25rem rgba(0, 0, 0, 0.12)',
    border: '1px solid rgba(0, 0, 0, 0.04)',
    '@media (max-width: 768px)': {
      padding: '1.75rem',
    },
    '@media (max-width: 480px)': {
      padding: '1.25rem',
      borderRadius: '1rem',
    },
  },
  noticeBox: {
    display: 'flex',
    gap: '1rem',
    padding: '1.25rem',
    background:
      'linear-gradient(135deg, color-mix(in srgb, var(--color-light-peach) 24%, transparent) 0%, color-mix(in srgb, var(--color-peach) 18%, transparent) 100%)',
    border: '1px solid color-mix(in srgb, var(--color-peach) 45%, transparent)',
    borderRadius: '1rem',
    marginBottom: '2rem',
    '@media (max-width: 480px)': {
      flexDirection: 'column' as const,
      gap: '0.75rem',
      padding: '1rem',
    },
  },
  noticeIcon: {
    fontSize: '1.5rem',
    color: 'var(--color-peach)',
    flexShrink: 0,
    marginTop: '0.125rem',
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--color-text-dark)',
    marginBottom: '0.25rem',
    fontFamily: 'var(--font-primary)',
  },
  noticeText: {
    fontSize: '0.875rem',
    color: 'var(--color-dark-teal)',
    lineHeight: 1.6,
    fontFamily: 'var(--font-primary)',
  },
  formSection: {
    marginBottom: '1.75rem',
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-dark-teal)',
    marginBottom: '0.5rem',
    fontFamily: 'var(--font-primary)',
  },
  textarea: {
    borderRadius: '0.75rem',
    fontSize: '0.9375rem',
    fontFamily: 'var(--font-primary)',
    borderColor: 'color-mix(in srgb, var(--color-teal) 35%, #d9d9d9)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    '&:hover, &:focus, &.ant-input-focused': {
      borderColor: 'var(--color-teal)',
      boxShadow:
        '0 0 0 0.25rem color-mix(in srgb, var(--color-mint) 55%, transparent)',
    },
  },
  reasonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.75rem',
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
  reasonOption: {
    padding: '1rem',
    border: '0.125rem solid #e8e8e8',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    fontSize: '0.9375rem',
    fontWeight: 500,
    color: 'var(--color-dark-teal)',
    fontFamily: 'var(--font-primary)',
    textAlign: 'center' as const,
    '&:hover': {
      borderColor: 'var(--color-peach)',
      background: 'color-mix(in srgb, var(--color-light-peach) 18%, transparent)',
      transform: 'translateY(-0.125rem)',
    },
    '@media (max-width: 480px)': {
      padding: '0.875rem',
      fontSize: '0.875rem',
    },
  },
  reasonOptionSelected: {
    borderColor: 'var(--color-peach)',
    background: 'color-mix(in srgb, var(--color-light-peach) 35%, transparent)',
    color: 'var(--color-text-dark)',
    fontWeight: 600,
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '2rem',
    '@media (max-width: 600px)': {
      flexDirection: 'column-reverse' as const,
      gap: '0.75rem',
      '& .ant-btn': {
        width: '100%',
      },
    },
  },
  cancelButton: {
    height: '3rem',
    padding: '0 2rem',
    borderRadius: '0.75rem',
    fontSize: '0.9375rem',
    fontWeight: 600,
    color: 'var(--color-teal) !important',
    borderColor: 'color-mix(in srgb, var(--color-teal) 35%, #d9d9d9)',
    fontFamily: 'var(--font-primary)',
    '&:hover': {
      color: 'var(--color-dark-teal) !important',
      borderColor: 'var(--color-teal) !important',
    },
  },
  submitButton: {
    height: '3rem',
    padding: '0 2rem',
    borderRadius: '0.75rem',
    fontSize: '0.9375rem',
    fontWeight: 600,
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    border: '1px solid transparent !important',
    color: '#fff !important',
    boxShadow: '0 0.25rem 1rem -0.25rem rgba(220, 38, 38, 0.5)',
    fontFamily: 'var(--font-primary)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
    '&, &:hover, &:focus, &:focus-visible, &:active, &.ant-btn-focused': {
      borderColor: 'transparent !important',
    },
    '&& .ant-btn-icon, && .ant-btn-loading-icon': {
      color: '#fff !important',
    },
    '&:not(:disabled):hover': {
      background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%) !important',
      boxShadow: '0 0.625rem 1.25rem -0.375rem rgba(220, 38, 38, 0.55)',
      transform: 'translateY(-0.0625rem)',
      color: '#fff !important',
    },
    '&:not(:disabled):focus, &:not(:disabled).ant-btn-focused, &:not(:disabled):focus-visible': {
      background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%) !important',
      boxShadow:
        '0 0 0 0.25rem color-mix(in srgb, #ef4444 35%, transparent), 0 0.625rem 1.25rem -0.375rem rgba(220, 38, 38, 0.55)',
      color: '#fff !important',
    },
    '&:not(:disabled):active': {
      transform: 'translateY(0)',
      boxShadow: '0 0.25rem 0.875rem -0.25rem rgba(220, 38, 38, 0.45)',
      color: '#fff !important',
    },
    '@media (max-width: 480px)': {
      height: '2.875rem',
    },
  },
  successContainer: {
    textAlign: 'center' as const,
    padding: '2.5rem 0',
    '@media (max-width: 480px)': {
      padding: '1.5rem 0',
    },
  },
  successIcon: {
    width: '5rem',
    height: '5rem',
    background:
      'linear-gradient(135deg, color-mix(in srgb, var(--color-dark-teal) 75%, #000000) 0%, var(--color-teal) 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
    fontSize: '2.5rem',
    color: '#ffffff',
    boxShadow: '0 0.625rem 1.875rem -0.625rem color-mix(in srgb, var(--color-dark-teal) 45%, transparent)',
    '@media (max-width: 480px)': {
      width: '4rem',
      height: '4rem',
      fontSize: '2rem',
      margin: '0 auto 1rem',
    },
  },
  dangerIcon: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    boxShadow: '0 0.625rem 1.875rem -0.625rem rgba(220, 38, 38, 0.5)',
  },
  successTitle: {
    fontSize: 'clamp(1.4rem, 5vw, 1.75rem)',
    fontWeight: 700,
    color: 'var(--color-text-dark)',
    marginBottom: '0.75rem',
    fontFamily: 'var(--font-primary)',
  },
  successMessage: {
    fontSize: '1rem',
    color: 'var(--color-dark-teal)',
    marginBottom: '2rem',
    maxWidth: '28rem',
    margin: '0 auto 2rem',
    lineHeight: 1.6,
    fontFamily: 'var(--font-primary)',
  },
  homeButton: {
    height: '3rem',
    padding: '0 2rem',
    borderRadius: '0.75rem',
    fontSize: '0.9375rem',
    fontWeight: 600,
    background:
      'linear-gradient(135deg, var(--color-peach) 0%, var(--color-light-peach) 100%)',
    border: 'none',
    color: 'var(--color-text-dark)',
    fontFamily: 'var(--font-primary)',
    '&:hover': {
      background:
        'linear-gradient(135deg, var(--color-light-peach) 0%, color-mix(in srgb, var(--color-peach) 70%, #ffffff) 100%) !important',
      color: 'var(--color-text-dark) !important',
    },
    '@media (max-width: 480px)': {
      width: '100%',
    },
  },
  helpLink: {
    textAlign: 'center' as const,
    marginTop: '1.5rem',
    fontSize: '0.875rem',
    color: 'var(--color-dark-teal)',
    lineHeight: 1.6,
    textWrap: 'balance' as const,
    fontFamily: 'var(--font-primary)',
    '& a': {
      color: 'var(--color-teal)',
      fontWeight: 600,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}));
