'use client'

import { Form, Input, Button, Checkbox, Image } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useStudentAuthPageStyles } from './style';
import { useRouter } from 'next/navigation';
import { ILogin } from '@/src/providers/auth-provider/context';
import { useAuthActions, useAuthState } from '@/src/providers/auth-provider';

const StudentLogin: React.FC = () => {
  const { styles } = useStudentAuthPageStyles();
  const router = useRouter();
  const [form] = Form.useForm<ILogin>();
  const authActions = useAuthActions();
  const { isPending, isError } = useAuthState();

  const handleSubmit = async (values: ILogin) => {
    const { userNameOrEmailAddress, password } = values;

    if (userNameOrEmailAddress && password) {
      await authActions.authenticate(values, '/withdraw');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <Image
            src="/images/moipone-logo.png"
            alt="Moipone Academy Logo"
            className={styles.logoImage}
            preview={false}
          />
        </div>

        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>
          Sign in to continue to the student withdrawal portal
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ rememberClient: false }}
          className={styles.form}
          requiredMark={(label, { required }) => (
            <>
              {label}
              {required ? (
                <span className={styles.requiredMarkAsterisk}>*</span>
              ) : null}
            </>
          )}
          colon={false}
        >
          <Form.Item
            label="Username or Email"
            name="userNameOrEmailAddress"
            className={styles.inputGroup}
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please enter your username or email',
              },
            ]}
          >
            <Input
              className={styles.input}
              prefix={<UserOutlined />}
              placeholder="Enter your username or email"
              autoComplete="username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            className={styles.inputGroup}
            rules={[
              { required: true, message: 'Please enter your password' },
            ]}
          >
            <Input.Password
              className={styles.input}
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          <div className={styles.rememberRow}>
            <Form.Item name="rememberClient" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <span className={styles.forgotLink}>
              Forgot password?
            </span>
          </div>

          {isError ? (
            <div className={styles.errorMessage} role="alert" aria-live="polite">
              Incorrect username or password. Please try again.
            </div>
          ) : null}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={styles.submitButton}
              loading={isPending}
              block
            >
              {isPending ? 'Signing In...' : 'Sign In'}
            </Button>
          </Form.Item>
        </Form>

        <p className={styles.backLink}>
          Back to
          <span
            className={styles.backLinkAnchor}
            onClick={() => router.push('/')}
          >
            Moipone Academy
          </span>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;
