import { createStyles } from 'antd-style';

export const useAuthPageStyles = createStyles(() => ({
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background:
      'linear-gradient(145deg, color-mix(in srgb, var(--color-dark-teal) 92%, #000) 0%, var(--color-teal) 48%, color-mix(in srgb, var(--color-teal) 82%, var(--color-mint)) 100%)',
    padding: '1.5rem',
    position: 'relative',
    fontFamily: 'var(--font-primary)',
  },

  card: {
    width: '100%',
    maxWidth: '29rem',
    background: '#ffffff',
    border: '0.0625rem solid color-mix(in srgb, var(--color-mint) 58%, #fff)',
    borderRadius: '1.25rem',
    padding: '2.5rem 2.25rem',
    boxShadow: '0 1rem 2.25rem -1.25rem rgba(0, 0, 0, 0.18)',
    position: 'relative',
    zIndex: 10,

    '@media (max-width: 37.5rem)': {
      padding: '2rem 1.5rem',
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
  },

  title: {
    textAlign: 'center',
    fontFamily: 'var(--font-primary)',
    fontSize: '1.875rem',
    fontWeight: 700,
    color: 'var(--color-teal)',
    marginBottom: '0.5rem',
  },

  subtitle: {
    textAlign: 'center',
    fontSize: '1rem',
    color: 'var(--color-dark-teal)',
    fontFamily: 'var(--font-primary)',
    marginBottom: '2rem',
    lineHeight: 1.5,
  },

  form: {
    '&& .ant-form-item-required::before': {
      display: 'none',
    },
  },

  requiredMarkAsterisk: {
    color: '#ff4d4f',
    fontWeight: 600,
    marginLeft: '0.25rem',
  },

  inputGroup: {
    marginBottom: '1rem',
    '.ant-form-item-label > label': {
      fontSize: '0.9375rem',
      fontWeight: 500,
      fontFamily: 'var(--font-primary) !important',
      color: 'var(--color-dark-teal)',
      paddingLeft: '0.25rem',
    },
  },

  rememberRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.25rem',
    gap: '1rem',

    '.ant-checkbox-wrapper': {
      color: 'var(--color-text-dark)',
      fontFamily: 'var(--font-primary)',
    },

    '.ant-checkbox .ant-checkbox-inner': {
      borderRadius: '0.35rem',
      borderColor: 'color-mix(in srgb, var(--color-teal) 35%, #c7d0d4)',
      transition: 'all 0.2s ease',
    },

    '.ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-wrapper:hover .ant-checkbox-inner': {
      borderColor: 'var(--color-teal)',
    },

    '.ant-checkbox-checked .ant-checkbox-inner': {
      backgroundColor: 'var(--color-teal)',
      borderColor: 'var(--color-teal)',
    },

    '.ant-checkbox-checked:hover .ant-checkbox-inner': {
      backgroundColor: 'var(--color-dark-teal)',
      borderColor: 'var(--color-dark-teal)',
    },

    '.ant-checkbox-checked::after': {
      borderColor: 'color-mix(in srgb, var(--color-teal) 50%, transparent)',
    },

    '.ant-checkbox-input:focus + .ant-checkbox-inner, .ant-checkbox-input:focus-visible + .ant-checkbox-inner': {
      borderColor: 'var(--color-teal)',
      boxShadow: '0 0 0 0.2rem color-mix(in srgb, var(--color-mint) 50%, transparent)',
    },
  },

  input: {
    height: '3rem',
    borderRadius: '0.75rem',
    borderColor: 'color-mix(in srgb, var(--color-teal) 22%, #d9d9d9)',
    fontFamily: 'var(--font-primary) !important',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    '&& .ant-input': {
      fontFamily: 'var(--font-primary) !important',
    },
    '&& input': {
      fontFamily: 'var(--font-primary) !important',
    },
    '&& .ant-input-prefix': {
      color: 'color-mix(in srgb, var(--color-dark-teal) 64%, #5f6c72)',
    },
    '&:hover': {
      borderColor: 'var(--color-teal)',
    },
    '&.ant-input-affix-wrapper-focused': {
      borderColor: 'var(--color-teal)',
      boxShadow: '0 0 0 0.25rem color-mix(in srgb, var(--color-mint) 55%, transparent)',
    },
  },

  forgotLink: {
    fontSize: '0.875rem',
    color: 'var(--color-teal)',
    cursor: 'pointer',
    fontFamily: 'var(--font-primary)',
    whiteSpace: 'nowrap',

    '&:hover': {
      color: 'var(--color-dark-teal)',
    },
  },

  errorMessage: {
    width: '100%',
    marginBottom: '1rem',
    padding: '0.75rem 0.875rem',
    borderRadius: '0.625rem',
    border: '0.0625rem solid color-mix(in srgb, #ff4d4f 45%, #fff)',
    background: 'color-mix(in srgb, #ff4d4f 12%, #fff)',
    color: 'color-mix(in srgb, #b42318 90%, #000)',
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.35,
    fontFamily: 'var(--font-primary)',
  },

  submitButton: {
    width: '100%',
    height: '3rem',
    fontSize: '1rem',
    fontWeight: 700,
    fontFamily: 'var(--font-primary)',
    borderRadius: '0.75rem',
    background: 'var(--color-teal) !important',
    color: 'var(--color-text-light) !important',
    border: 'none !important',
    boxShadow: '0 0.375rem 1.125rem -0.5rem rgba(17, 100, 102, 0.45)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',

    '&:hover, &:focus': {
      transform: 'translateY(-0.0625rem)',
      background: 'var(--color-dark-teal) !important',
      color: 'var(--color-text-light) !important',
      boxShadow: '0 0.625rem 1.375rem -0.6rem rgba(17, 100, 102, 0.52)',
    },

    '&:active': {
      transform: 'translateY(0)',
    },
  },

  backLink: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.875rem',
    color: 'var(--color-text-dark)',
    fontFamily: 'var(--font-primary)',
  },

  backLinkAnchor: {
    color: 'var(--color-teal)',
    marginLeft: '0.25rem',
    cursor: 'pointer',
    fontWeight: 600,

    '&:hover': {
      color: 'var(--color-dark-teal)',
      textDecoration: 'underline',
    },
  },
}));
