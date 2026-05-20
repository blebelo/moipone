import { createStyles } from 'antd-style';

export const useStyles = createStyles(() => ({
  '@keyframes loaderRotation': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },

  '@keyframes loaderRoundness': {
    '0%': {
      filter: 'contrast(15)',
    },
    '20%': {
      filter: 'contrast(3)',
    },
    '40%': {
      filter: 'contrast(3)',
    },
    '60%': {
      filter: 'contrast(15)',
    },
    '100%': {
      filter: 'contrast(15)',
    },
  },

  '@keyframes loaderColorize': {
    '0%': {
      filter: 'hue-rotate(0deg)',
    },
    '20%': {
      filter: 'hue-rotate(-30deg)',
    },
    '40%': {
      filter: 'hue-rotate(-60deg)',
    },
    '60%': {
      filter: 'hue-rotate(-90deg)',
    },
    '80%': {
      filter: 'hue-rotate(-45deg)',
    },
    '100%': {
      filter: 'hue-rotate(0deg)',
    },
  },

  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'inherit',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    zIndex: 9999,
  },

  loaderRoot: {
    '--loader-color-one': 'var(--color-light-peach)',
    '--loader-color-two': 'var(--color-teal)',
    '--loader-color-three': 'rgba(255, 203, 154, 0.5)',
    '--loader-color-four': 'rgba(17, 100, 102, 0.5)',
    '--loader-color-five': 'rgba(255, 203, 154, 0.25)',
    '--loader-time-animation': '2s',
    '--loader-size': '1',
    position: 'relative',
    width: 'calc(100px * var(--loader-size))',
    height: 'calc(100px * var(--loader-size))',
    borderRadius: '50%',
    boxShadow:
      '0 0 calc(25px * var(--loader-size)) 0 var(--loader-color-three), 0 calc(20px * var(--loader-size)) calc(50px * var(--loader-size)) 0 var(--loader-color-four)',
    animation:
      'loaderColorize calc(var(--loader-time-animation) * 3) ease-in-out infinite',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      borderTop:
        'solid calc(1px * var(--loader-size)) var(--loader-color-one)',
      borderBottom:
        'solid calc(1px * var(--loader-size)) var(--loader-color-two)',
      background:
        'linear-gradient(180deg, var(--loader-color-five), var(--loader-color-four))',
      boxShadow:
        'inset 0 calc(10px * var(--loader-size)) calc(10px * var(--loader-size)) 0 var(--loader-color-three), inset 0 calc(-10px * var(--loader-size)) calc(10px * var(--loader-size)) 0 var(--loader-color-four)',
    },
  },

  loaderInline: {
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 0,
  },

  loaderSvg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
  },

  loaderMask: {
    filter: 'contrast(15)',
    animation:
      'loaderRoundness calc(var(--loader-time-animation) / 2) linear infinite',

    '& polygon': {
      filter: 'blur(7px)',
    },

    '& polygon:nth-child(1)': {
      transformOrigin: '75% 25%',
      transform: 'rotate(90deg)',
    },

    '& polygon:nth-child(2)': {
      transformOrigin: '50% 50%',
      animation:
        'loaderRotation var(--loader-time-animation) linear infinite reverse',
    },

    '& polygon:nth-child(3)': {
      transformOrigin: '50% 60%',
      animation: 'loaderRotation var(--loader-time-animation) linear infinite',
      animationDelay: 'calc(var(--loader-time-animation) / -3)',
    },

    '& polygon:nth-child(4)': {
      transformOrigin: '40% 40%',
      animation:
        'loaderRotation var(--loader-time-animation) linear infinite reverse',
    },

    '& polygon:nth-child(5)': {
      transformOrigin: '40% 40%',
      animation:
        'loaderRotation var(--loader-time-animation) linear infinite reverse',
      animationDelay: 'calc(var(--loader-time-animation) / -2)',
    },

    '& polygon:nth-child(6)': {
      transformOrigin: '60% 40%',
      animation: 'loaderRotation var(--loader-time-animation) linear infinite',
    },

    '& polygon:nth-child(7)': {
      transformOrigin: '60% 40%',
      animation: 'loaderRotation var(--loader-time-animation) linear infinite',
      animationDelay: 'calc(var(--loader-time-animation) / -1.5)',
    },
  },

  loaderBox: {
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(180deg, var(--loader-color-one) 30%, var(--loader-color-two) 70%)',
  },
}));
