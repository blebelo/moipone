import { createStyles } from 'antd-style';

export const useApplicationFormStyles = createStyles(() => ({
  section: {
    minHeight: '100vh',
    paddingTop: '7.5rem',
    paddingBottom: '5rem',
    background:
      'linear-gradient(180deg, var(--color-light-peach) 0%, #ffffff 100%)',
  },

  container: {
    maxWidth: '50rem',
    margin: '0 auto',
    padding: '0 1.5rem',
  },

  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },

  title: {
    fontSize: '2.625rem',
    fontWeight: 700,
    color: 'var(--color-text-dark)',
    marginBottom: '1rem',
    fontFamily: 'Lexend, sans-serif',
  },

  subtitle: {
    fontSize: '1.125rem',
    color: 'var(--color-dark-teal)',
    maxWidth: '37.5rem',
    margin: '0 auto',
    lineHeight: 1.6,
  },

  formCard: {
    background: '#ffffff',
    borderRadius: '1.5rem',
    padding: '3rem',
    boxShadow: '0 1.25rem 3.75rem -1.25rem rgba(0, 0, 0, 0.1)',
    border: '0.0625rem solid rgba(0, 0, 0, 0.04)',
  },

  stepsContainer: {
    marginBottom: '2.5rem',
  },

  formSection: {
    marginBottom: '2rem',
  },

  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'var(--color-text-dark)',
    marginBottom: '1.5rem',
    fontFamily: 'Lexend, sans-serif',
  },

  inputGroup: {
    marginBottom: '1.25rem',
  },

  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-dark-teal)',
    marginBottom: '0.5rem',
  },

  input: {
    height: '3rem',
    borderRadius: '0.75rem',
    fontSize: '0.9375rem',
  },

  select: {
    width: '100%',
    height: '3rem',
  },

  textarea: {
    borderRadius: '0.75rem',
    fontSize: '0.9375rem',
  },

  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    marginTop: '2rem',
  },

  prevButton: {
    height: '3rem',
    padding: '0 2rem',
    borderRadius: '0.75rem',
    fontSize: '0.9375rem',
    fontWeight: 600,
  },

  prefix: {
    padding: '0.25rem',
    color: 'var(--color-teal) !important',
  },

  nextButton: {
    height: '3rem',
    padding: '0 2rem',
    borderRadius: '0.75rem',
    fontSize: '0.9375rem',
    fontWeight: 600,
    background:
      'linear-gradient(135deg, var(--color-peach) 0%, var(--color-light-peach) 100%)',
    border: 'none',
    boxShadow:
      '0 0.25rem 1rem -0.25rem rgba(217, 176, 140, 0.5)',
    '&:hover': {
      background:
        'linear-gradient(135deg, var(--color-light-peach) 0%, var(--color-mint) 100%)',
    },
  },

  successContainer: {
    textAlign: 'center',
    padding: '2.5rem 0',
  },

  successIcon: {
    width: '5rem',
    height: '5rem',
    background:
      'linear-gradient(135deg, var(--color-teal) 0%, var(--color-mint) 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
    fontSize: '2.5rem',
    color: '#ffffff',
  },

  successTitle: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: 'var(--color-text-dark)',
    marginBottom: '0.75rem',
  },

  successMessage: {
    fontSize: '1rem',
    color: 'var(--color-dark-teal)',
    marginBottom: '2rem',
  },

  programmeOption: {
    padding: '1rem',
    border: '0.125rem solid #e8e8e8',
    borderRadius: '0.75rem',
    marginBottom: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: 'var(--color-peach)',
      background: 'rgba(217, 176, 140, 0.08)',
    },
  },

  programmeOptionSelected: {
    borderColor: 'var(--color-peach)',
    background: 'rgba(217, 176, 140, 0.15)',
  },

  programmeTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--color-text-dark)',
    marginBottom: '0.25rem',
  },

  programmeDesc: {
    fontSize: '0.875rem',
    color: 'var(--color-dark-teal)',
  },
}));
