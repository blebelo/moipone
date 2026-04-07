import { createStyles } from 'antd-style';

export const useAdminDashboardStyles = createStyles(() => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  header: {
    marginBottom: '0.5rem',
  },
  greeting: {
    marginBottom: '0.2rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'color-mix(in srgb, var(--color-dark-teal) 58%, #6f7c7d)',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 800,
    lineHeight: 1.2,
    color: 'var(--color-dark-teal)',
    fontFamily: 'var(--font-primary)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '1rem',
    '@media (max-width: 87.5rem)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    '@media (max-width: 43.75rem)': {
      gridTemplateColumns: '1fr',
    },
  },
  statCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.9rem',
    padding: '1.2rem',
    borderRadius: '1rem',
    background: '#fff',
    border: '0.0625rem solid color-mix(in srgb, var(--color-mint) 55%, #fff)',
    boxShadow: '0 0.5rem 1.5rem -1rem rgba(0, 0, 0, 0.28)',
  },
  statIcon: {
    width: '3.05rem',
    height: '3.05rem',
    borderRadius: '0.8rem',
    display: 'grid',
    placeItems: 'center',
    flexShrink: 0,
    fontSize: '1.2rem',
  },
  statIconPrimary: {
    color: 'var(--color-teal)',
    background:
      'linear-gradient(135deg, color-mix(in srgb, var(--color-mint) 70%, #fff) 0%, color-mix(in srgb, var(--color-mint) 35%, #fff) 100%)',
  },
  statIconSecondary: {
    color: 'var(--color-dark-teal)',
    background:
      'linear-gradient(135deg, color-mix(in srgb, var(--color-teal) 16%, #fff) 0%, color-mix(in srgb, var(--color-mint) 50%, #fff) 100%)',
  },
  statIconAccent: {
    color: 'color-mix(in srgb, #b0630f 80%, #000)',
    background:
      'linear-gradient(135deg, color-mix(in srgb, var(--color-light-peach) 80%, #fff) 0%, color-mix(in srgb, var(--color-peach) 42%, #fff) 100%)',
  },
  statIconTertiary: {
    color: 'var(--color-dark-teal)',
    background:
      'linear-gradient(135deg, color-mix(in srgb, var(--color-mint) 55%, #fff) 0%, color-mix(in srgb, var(--color-peach) 28%, #fff) 100%)',
  },
  statContent: {
    minWidth: 0,
  },
  statLabel: {
    marginBottom: '0.25rem',
    fontSize: '0.84rem',
    fontWeight: 500,
    color: 'color-mix(in srgb, var(--color-dark-teal) 58%, #6f7c7d)',
  },
  statValue: {
    fontSize: '1.7rem',
    fontWeight: 800,
    lineHeight: 1.1,
    color: 'var(--color-dark-teal)',
    fontFamily: 'var(--font-primary)',
  },
  statTrend: {
    marginTop: '0.35rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.74rem',
    fontWeight: 600,
    color: 'var(--color-teal)',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '1rem',
    '@media (max-width: 75rem)': {
      gridTemplateColumns: '1fr',
    },
  },
  card: {
    borderRadius: '1rem',
    overflow: 'hidden',
    border: '0.0625rem solid color-mix(in srgb, var(--color-mint) 55%, #fff)',
    background: '#fff',
    boxShadow: '0 0.6rem 1.8rem -1.1rem rgba(0, 0, 0, 0.3)',
  },
  cardHeader: {
    padding: '1rem 1.2rem',
    borderBottom: '0.0625rem solid color-mix(in srgb, var(--color-mint) 50%, #fff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
  },
  cardTitle: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: 'var(--color-dark-teal)',
    fontFamily: 'var(--font-primary)',
  },
  viewAllLink: {
    border: 'none',
    padding: 0,
    background: 'transparent',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.84rem',
    fontWeight: 600,
    color: 'var(--color-teal)',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: 'var(--color-dark-teal)',
    },
  },
  cardBody: {
    padding: '0.25rem 1.2rem 0.3rem',
  },
  courseItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.95rem 0',
    borderBottom: '0.0625rem solid color-mix(in srgb, var(--color-mint) 35%, #fff)',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  courseIcon: {
    width: '2.8rem',
    height: '2.8rem',
    borderRadius: '0.75rem',
    display: 'grid',
    placeItems: 'center',
    color: 'var(--color-text-light)',
    background: 'linear-gradient(135deg, var(--color-dark-teal) 0%, var(--color-teal) 100%)',
    flexShrink: 0,
  },
  courseInfo: {
    flex: 1,
    minWidth: 0,
  },
  courseName: {
    fontSize: '0.92rem',
    fontWeight: 600,
    color: 'var(--color-dark-teal)',
    marginBottom: '0.2rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  courseDetails: {
    fontSize: '0.79rem',
    color: 'color-mix(in srgb, var(--color-dark-teal) 58%, #6f7c7d)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  courseStats: {
    flexShrink: 0,
    textAlign: 'right',
  },
  courseEnrolled: {
    fontSize: '0.88rem',
    fontWeight: 700,
    color: 'var(--color-dark-teal)',
  },
  courseCapacity: {
    marginTop: '0.1rem',
    fontSize: '0.72rem',
    color: 'color-mix(in srgb, var(--color-dark-teal) 58%, #6f7c7d)',
  },
  progressBar: {
    marginTop: '0.32rem',
    width: '4.75rem',
    height: '0.33rem',
    borderRadius: '1rem',
    overflow: 'hidden',
    background: 'color-mix(in srgb, var(--color-mint) 50%, #fff)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 'inherit',
    background: 'linear-gradient(90deg, var(--color-teal) 0%, var(--color-dark-teal) 100%)',
    transition: 'width 0.25s ease',
  },
  applicationItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
    padding: '0.85rem 0',
    borderBottom: '0.0625rem solid color-mix(in srgb, var(--color-mint) 35%, #fff)',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  applicantAvatar: {
    width: '2.4rem',
    height: '2.4rem',
    borderRadius: '0.68rem',
    display: 'grid',
    placeItems: 'center',
    color: 'var(--color-dark-teal)',
    background:
      'linear-gradient(135deg, color-mix(in srgb, var(--color-light-peach) 85%, #fff) 0%, color-mix(in srgb, var(--color-peach) 42%, #fff) 100%)',
    flexShrink: 0,
  },
  applicantInfo: {
    flex: 1,
    minWidth: 0,
  },
  applicantName: {
    marginBottom: '0.15rem',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--color-dark-teal)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  applicantCourse: {
    fontSize: '0.75rem',
    color: 'color-mix(in srgb, var(--color-dark-teal) 58%, #6f7c7d)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  statusBadge: {
    padding: '0.22rem 0.58rem',
    borderRadius: '999rem',
    fontSize: '0.66rem',
    fontWeight: 700,
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
  },
  statusPending: {
    color: 'color-mix(in srgb, #a15a00 90%, #000)',
    background: 'color-mix(in srgb, var(--color-light-peach) 68%, #fff)',
  },
  statusApproved: {
    color: 'color-mix(in srgb, #0b5a4e 90%, #000)',
    background: 'color-mix(in srgb, var(--color-mint) 72%, #fff)',
  },
  statusRejected: {
    color: 'color-mix(in srgb, #8f1f1f 90%, #000)',
    background: 'color-mix(in srgb, #f4d3d3 86%, #fff)',
  },
}));
