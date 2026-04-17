import { createStyles } from 'antd-style';

export const useAdminLayoutStyles = createStyles(() => ({
  layout: {
    position: 'relative',
    minHeight: '100vh',
    background:
      'linear-gradient(180deg, color-mix(in srgb, var(--color-mint) 40%, #fff) 0%, #fff 100%)',
  },
  main: {
    minHeight: '100vh',
    transition: 'margin-left 0.25s ease',
  },
  mainExpanded: {
    marginLeft: '17rem',
    '@media (max-width: 64rem)': {
      marginLeft: '0',
    },
  },
  mainCollapsed: {
    marginLeft: '5.25rem',
    '@media (max-width: 64rem)': {
      marginLeft: '0',
    },
  },
  content: {
    padding: '2rem',
    '@media (max-width: 64rem)': {
      padding: '1.25rem',
      paddingTop: '4.5rem',
    },
  },
  mobileDrawerButton: {
    position: 'fixed',
    top: '1rem',
    left: '1rem',
    width: '2.5rem',
    height: '2.5rem',
    border: 'none',
    borderRadius: '0.7rem',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-light)',
    background: 'var(--color-dark-teal)',
    boxShadow: '0 0.6rem 1.4rem -0.75rem rgba(0, 0, 0, 0.45)',
    cursor: 'pointer',
    zIndex: 111,
    '@media (max-width: 64rem)': {
      display: 'inline-flex',
      opacity: 0,
      pointerEvents: 'none',
      transform: 'translateY(-0.25rem)',
      transition: 'opacity 0.2s ease, transform 0.2s ease',
    },
  },
  mobileDrawerButtonVisible: {
    '@media (max-width: 64rem)': {
      opacity: 1,
      pointerEvents: 'auto',
      transform: 'translateY(0)',
    },
  },
  mobileBackdrop: {
    display: 'none',
    '@media (max-width: 64rem)': {
      display: 'block',
      position: 'fixed',
      inset: 0,
      zIndex: 95,
      border: 'none',
      background: 'rgba(6, 25, 25, 0.5)',
      opacity: 0,
      pointerEvents: 'none',
      transition: 'opacity 0.2s ease',
    },
  },
  mobileBackdropVisible: {
    '@media (max-width: 64rem)': {
      opacity: 1,
      pointerEvents: 'auto',
    },
  },
}));
