import { createStyles } from 'antd-style';

export const useStyles = createStyles(() => ({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 'inherit',
    gap: '1.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    zIndex: 0,
  },
  loader: {
    fontSize: '2.5rem',
    color: 'white !important',
  },
}));
