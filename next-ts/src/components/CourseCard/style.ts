import { createStyles } from 'antd-style';

export const useCourseCardStyles = createStyles(() => ({
  card: {
    background: '#fff',
    border: '1px solid color-mix(in srgb, var(--color-mint) 55%, #fff)',
    borderRadius: '1.25rem',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    transition: 'all .25s ease',
    boxShadow: '0 0.5rem 1.5rem rgba(0,0,0,.06)',

    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 1rem 2rem rgba(0,0,0,.12)',
    },
  },

  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
  },

  iconWrapper: {
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: '1rem',
    background:
      'linear-gradient(135deg,var(--color-teal),var(--color-dark-teal))',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    flexShrink: 0,
  },

  headerContent: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--color-dark-teal)',
    fontFamily: 'var(--font-primary)',
  },

  instructor: {
    marginTop: '.4rem',
    display: 'flex',
    alignItems: 'center',
    gap: '.4rem',
    color: 'var(--color-text-dark)',
    fontSize: '.875rem',
  },

  statusBadge: {
    padding: '.35rem .75rem',
    borderRadius: '999px',
    background:
      'color-mix(in srgb, var(--color-mint) 60%, white)',
    color: 'var(--color-dark-teal)',
    fontSize: '.75rem',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },

  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  description: {
    margin: 0,
    color: 'var(--color-text-dark)',
    lineHeight: 1.6,
    fontSize: '.95rem',
  },

  meta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },

  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '.45rem',
    color: 'var(--color-dark-teal)',
    fontSize: '.875rem',
    fontWeight: 500,
  },

  progressSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '.5rem',
  },

  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '.85rem',
    fontWeight: 600,
    color: 'var(--color-dark-teal)',
  },

  progressBar: {
    width: '100%',
    height: '.55rem',
    borderRadius: '999px',
    overflow: 'hidden',
    background:
      'color-mix(in srgb, var(--color-mint) 35%, #ececec)',
  },

  progressFill: {
    height: '100%',
    borderRadius: '999px',
    background:
      'linear-gradient(90deg,var(--color-teal),var(--color-mint))',
    transition: 'width .3s ease',
  },

  actions: {
    display: 'flex',
    gap: '.75rem',
    marginTop: 'auto',
  },

  actionButton: {
    flex: 1,
    height: '2.75rem',
    borderRadius: '.75rem',
    border: '1px solid color-mix(in srgb, var(--color-teal) 20%, #d9d9d9)',
    background: '#fff',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: 'var(--font-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.5rem',
    transition: 'all .2s ease',

    '&:hover': {
      borderColor: 'var(--color-teal)',
      color: 'var(--color-teal)',
    },
  },

  deleteButton: {
    color: '#ff4d4f',

    '&:hover': {
      borderColor: '#ff4d4f',
      color: '#ff4d4f',
    },
  },
}));