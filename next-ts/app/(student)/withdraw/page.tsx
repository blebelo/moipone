'use client';

import { useEffect, useMemo, useState } from 'react';
import { Input, Button, Image, message, Modal } from 'antd';
import {
  ExclamationCircleOutlined,
  CheckOutlined,
  WarningFilled,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useWithdrawFormStyles } from './style';
import { useApplicationActions } from '@/src/providers/application-provider';
import { withdrawalReasons } from '@/src/lib/common/constants';

const GUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const WithdrawPage: React.FC = () => {
  const { styles } = useWithdrawFormStyles();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const applicationActions = useApplicationActions();
  const [queryParams, setQueryParams] = useState({ input: '', reason: '' });
  const [hasCapturedQueryParams, setHasCapturedQueryParams] = useState(false);

  useEffect(() => {
    if (hasCapturedQueryParams) return;

    const input =
      searchParams.get('input')?.trim() ?? searchParams.get('studentId')?.trim() ?? '';
    const reason = searchParams.get('reason')?.trim() ?? '';

    setQueryParams({ input, reason });
    setHasCapturedQueryParams(true);

    if (reason) {
      setReason('Other');
      setDetails(reason);
    }

    if (searchParams.toString()) {
      router.replace(pathname, { scroll: false });
    }
  }, [hasCapturedQueryParams, pathname, router, searchParams]);

  const applicationId = queryParams.input;

  const isValidLink = useMemo(
    () => GUID_REGEX.test(applicationId),
    [applicationId],
  );

  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!hasCapturedQueryParams) return null;

  const handleSubmit = () => {
    if (!isValidLink) {
      message.error('Invalid or missing application reference');
      return;
    }

    Modal.confirm({
      title: 'Withdraw your application?',
      icon: <WarningFilled style={{ color: '#ef4444' }} />,
      content:
        'This action cannot be undone. Your application will be permanently removed and you will need to reapply if you change your mind.',
      okText: 'Yes, withdraw',
      okButtonProps: { danger: true },
      cancelText: 'Keep application',
      onOk: async () => {
        setLoading(true);
        const finalReason =
          reason === 'Other' ? details : [reason, details].filter(Boolean).join(' - ');

        try {
          await applicationActions.withdrawApplication(
            applicationId,
            finalReason,
          );
          setSubmitted(true);
        } catch {
          message.error("We're unable to withdraw your application right now.");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  if (submitted) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.successContainer}>
              <div className={styles.successIcon}>
                <CheckOutlined />
              </div>
              <h2 className={styles.successTitle}>Application Withdrawn</h2>
              <p className={styles.successMessage}>
                Your application has been withdrawn successfully. A confirmation email
                will be sent to the address on file.
              </p>
              <Button className={styles.homeButton} onClick={() => router.push('/')}>
                Return to Homepage
              </Button>
              <div className={styles.helpLink}>
                Changed your mind? <Link href="/apply">Submit a new application</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!isValidLink) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.successContainer}>
              <div
                className={`${styles.successIcon} ${styles.dangerIcon}`}
              >
                <WarningFilled />
              </div>
              <h2 className={styles.successTitle}>Invalid withdrawal link</h2>
              <p className={styles.successMessage}>
                This withdrawal link is missing or malformed. Please use the link from
                your application confirmation email, or contact us for help.
              </p>
              <Button className={styles.homeButton} onClick={() => router.push('/')}>
                Return to Homepage
              </Button>
              <div className={styles.helpLink}>
                Need assistance? <Link href="/#contact">Contact our team</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Image
              src="/images/moipone-logo.png"
              alt="Moipone Academy Logo"
              className={styles.logoImage}
              preview={false}
            />
          </div>
          <div className={styles.badge}>
            <ExclamationCircleOutlined /> Withdraw Application
          </div>
          <h1 className={styles.title}>We are sorry to see you go</h1>
          <p className={styles.subtitle}>
            If you no longer wish to proceed with your application, you can withdraw it
            below. We would love to hear why so we can keep improving.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.noticeBox}>
            <WarningFilled className={styles.noticeIcon} />
            <div className={styles.noticeContent}>
              <div className={styles.noticeTitle}>Before you withdraw</div>
              <div className={styles.noticeText}>
                Withdrawing is permanent. You will lose your spot in the review queue
                and any uploaded documents will be removed. You can always reapply for a
                future intake.
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <label className={styles.label}>Reason for withdrawal (optional)</label>
            <div className={styles.reasonGrid}>
              {withdrawalReasons.map((r) => (
                <div
                  key={r}
                  className={`${styles.reasonOption} ${
                    reason === r ? styles.reasonOptionSelected : ''
                  }`}
                  onClick={() => setReason(r)}
                >
                  {r}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formSection}>
            <label className={styles.label}>Additional comments (optional)</label>
            <Input.TextArea
              className={styles.textarea}
              rows={4}
              placeholder="Tell us more about your decision..."
              value={details}
              onChange={(event) => setDetails(event.target.value)}
            />
          </div>

          <div className={styles.buttonGroup}>
            <Button className={styles.submitButton} loading={loading} onClick={handleSubmit}>
              Withdraw Application
            </Button>
          </div>
        </div>

        <div className={styles.helpLink}>
          Need help instead? <Link href="/#contact">Contact our team</Link>
        </div>
      </div>
    </section>
  );
};

export default WithdrawPage;
