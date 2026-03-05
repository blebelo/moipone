'use client';

import React from 'react';
import { useStyles } from './style';
import { MESSAGE_ICONS, MessageVariant } from '@/src/lib/common/constants';

interface StatusMessageProps {
  message: string;
  variant?: MessageVariant;
}

const StatusBanner: React.FC<StatusMessageProps> = ({
  message,
  variant = 'info',
}) => {
  const { styles } = useStyles();

  return (
    <p className={styles[variant]} role="alert" aria-live="polite">
      {MESSAGE_ICONS[variant]}
      {message}
    </p>
  );
};

export default StatusBanner;