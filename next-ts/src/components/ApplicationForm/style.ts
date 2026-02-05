import { createStyles } from 'antd-style';

export const useApplicationFormStyles = createStyles(() => ({
  section: {
    minHeight: '100vh',
    paddingTop: '120px',
    paddingBottom: '80px',
    background: 'linear-gradient(180deg, #fef7ed 0%, #ffffff 100%)',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 24px',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '48px',
  },
  title: {
    fontSize: '42px',
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: '16px',
    fontFamily: 'Outfit, sans-serif',
  },
  subtitle: {
    fontSize: '18px',
    color: '#4a4a68',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  formCard: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '48px',
    boxShadow: '0 20px 60px -20px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(0, 0, 0, 0.04)',
  },
  stepsContainer: {
    marginBottom: '40px',
  },
  formSection: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#1a1a2e',
    marginBottom: '24px',
    fontFamily: 'Outfit, sans-serif',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: '#4a4a68',
    marginBottom: '8px',
  },
  input: {
    height: '48px',
    borderRadius: '12px',
    fontSize: '15px',
  },
  select: {
    width: '100%',
    height: '48px',
  },
  textarea: {
    borderRadius: '12px',
    fontSize: '15px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    marginTop: '32px',
  },
  prevButton: {
    height: '48px',
    padding: '0 32px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
  },
  nextButton: {
    height: '48px',
    padding: '0 32px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    background: 'linear-gradient(135deg, #f7931e 0%, #ff9800 100%)',
    border: 'none',
    boxShadow: '0 4px 16px -4px rgba(247, 147, 30, 0.4)',
    '&:hover': {
      background: 'linear-gradient(135deg, #ff9800 0%, #ffc107 100%)',
    },
  },
  successContainer: {
    textAlign: 'center' as const,
    padding: '40px 0',
  },
  successIcon: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
    fontSize: '40px',
    color: '#ffffff',
  },
  successTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: '12px',
  },
  successMessage: {
    fontSize: '16px',
    color: '#4a4a68',
    marginBottom: '32px',
  },
  programmeOption: {
    padding: '16px',
    border: '2px solid #e8e8e8',
    borderRadius: '12px',
    marginBottom: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: '#f7931e',
      background: 'rgba(247, 147, 30, 0.04)',
    },
  },
  programmeOptionSelected: {
    borderColor: '#f7931e',
    background: 'rgba(247, 147, 30, 0.08)',
  },
  programmeTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#1a1a2e',
    marginBottom: '4px',
  },
  programmeDesc: {
    fontSize: '14px',
    color: '#4a4a68',
  },
}));
