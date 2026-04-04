"use client";
import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import {
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuthPageStyles } from "../style";
import { useRouter } from "next/navigation";
import { IAuthCredentials } from "@/src/providers/auth-provider/context";

const AdminLogin = () => {
  const { styles } = useAuthPageStyles();
  const router = useRouter();
  const [form] = Form.useForm<IAuthCredentials>();
  const [formData, setFormData] = useState<IAuthCredentials>({
    userNameOrEmailAddress: "",
    password: "",
    rememberClient: false,
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const merged: IAuthCredentials = { ...formData, ...values };
      setFormData(merged);
      form.setFieldsValue(merged);

      message.success("Login successful! Redirecting...");
      setTimeout(() => router.push("/home"), 1000);
    } catch {
      message.error("Please fill in all fields");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.decorCircle1} />
        <div className={styles.decorCircle2} />

        <div className={styles.logo}>
          <div className={styles.logoIcon}>M</div>
          <span className={styles.logoText}>Moipone</span>
        </div>

        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>
          Sign in to access the admin dashboard
        </p>

        <Form<IAuthCredentials>
          form={form}
          name="adminLogin"
          className={styles.form}
          layout="vertical"
          requiredMark={(label, { required }) => (
            <>
              {label}
              {required && <span className={styles.requiredMarkAsterisk}>*</span>}
            </>
          )}
          colon={false}
          initialValues={formData}
          onValuesChange={(_, allValues) => {
            setFormData((prev) => ({
              ...prev,
              ...allValues,
            }));
          }}
        >
          <Form.Item
            className={styles.formGroup}
            label="Email Address"
            name="userNameOrEmailAddress"
            rules={[
              { required: true, message: "Please enter your email address" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input
              className={styles.input}
              prefix={<UserOutlined className={styles.inputIcon} />}
              placeholder="admin@moipone.org"
            />
          </Form.Item>

          <Form.Item
            className={styles.formGroup}
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              className={styles.input}
              prefix={<LockOutlined className={styles.inputIcon} />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <div className={styles.rememberRow}>
            <Form.Item
              className={styles.rememberItem}
              name="rememberClient"
              valuePropName="checked"
            >
              <Checkbox className={styles.checkboxLabel}>Remember me</Checkbox>
            </Form.Item>
            <span className={styles.forgotLink}>
              Forgot password?
            </span>
          </div>

          <Button type="primary" className={styles.submitButton} onClick={handleSubmit} block>
            Sign In
          </Button>
        </Form>

        <p className={styles.backLink}>
          Back to
          <span
            className={styles.backLinkAnchor}
            onClick={() => router.push("/")}
          >
            Moipone Academy
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
