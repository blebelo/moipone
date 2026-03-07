"use client";
import { useState } from "react";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SendOutlined,
  UserOutlined,
  TagsOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select, message } from "antd";
import { useContactStyles } from "./style";
import { useContactActions, useContactState } from "@/src/providers/contact-provider";
import {
  IContact,
  RefListContactSubject,
} from "@/src/providers/contact-provider/context";
import { CONTACT_DETAILS, INITIAL_FORM_DATA } from "@/src/lib/common/constants";
import Loader from "../Loader";

const contactSubjectOptions = [
  { value: RefListContactSubject.ProgrammeEnquiry, label: "Programme Enquiry" },
  {
    value: RefListContactSubject.PartnershipEnquiry,
    label: "Partnership Enquiry",
  },
  { value: RefListContactSubject.Volunteer, label: "Volunteer" },
  { value: RefListContactSubject.Donation, label: "Donation" },
  { value: RefListContactSubject.Other, label: "Other" },
];

const Contact = () => {
  const { styles } = useContactStyles();
  const { createContact } = useContactActions();
  const { isPending} = useContactState();
  const [form] = Form.useForm<IContact>();
  const phoneHref = `tel:${CONTACT_DETAILS.phone.replace(/\s+/g, "")}`;
  const [submitted, setSubmitted] = useState(false);
  const [submitSucceeded, setSubmitSucceeded] = useState<boolean | null>(null);

  const handleSubmit = async (values: IContact) => {
    setSubmitted(true);
    try {
      await createContact(values);
      setSubmitSucceeded(true);
      form.resetFields();
    } catch {
      setSubmitSucceeded(false);
      message.error("Failed to send your message. Please try again.");
    }
  };

  const handleTryAgain = () => {
    setSubmitted(false);
    setSubmitSucceeded(null);
  };

  return (
    <section id="contact-form" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tag}>
            <span>Get in Touch</span>
          </div>
          <h2 className={styles.title}>
            Let&apos;s Start a{" "}
            <span className={styles.titleHighlight}>Conversation</span>
          </h2>
          <p className={styles.description}>
            Have questions about our programmes? Want to partner with us or
            volunteer? We&apos;d love to hear from you. Reach out and let&apos;s build a
            brighter future together.
          </p>
          
          <div className={styles.infoCards}>
            <a
              className={styles.infoCard}
              href={`mailto:${CONTACT_DETAILS.email}`}
              aria-label={`Email us at ${CONTACT_DETAILS.email}`}
            >
              <div className={styles.infoIcon}>
                <MailOutlined />
              </div>
              <div className={styles.infoContent}>
                <p className={styles.infoLabel}>Email Us</p>
                <p className={styles.infoValue}>{CONTACT_DETAILS.email}</p>
              </div>
            </a>
            <a
              className={styles.infoCard}
              href={phoneHref}
              aria-label={`Call us on ${CONTACT_DETAILS.phone}`}
            >
              <div className={styles.infoIcon}>
                <PhoneOutlined />
              </div>
              <div className={styles.infoContent}>
                <p className={styles.infoLabel}>Call Us</p>
                <p className={styles.infoValue}>{CONTACT_DETAILS.phone}</p>
              </div>
            </a>
            <a
              className={styles.infoCard}
              href={CONTACT_DETAILS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open directions to Moipone Academy in Google Maps"
            >
              <div className={styles.infoIcon}>
                <EnvironmentOutlined />
              </div>
              <div className={styles.infoContent}>
                <p className={styles.infoLabel}>Visit Us</p>
                <p className={styles.infoValue}>{CONTACT_DETAILS.location}</p>
              </div>
            </a>
          </div>
        </div>
      

        <div className={styles.formWrapper}>
          {(submitted && submitSucceeded === true) ?(
            <>
              <div className={styles.floatingShape} />
              <div className={styles.formCard}>
                <div className={styles.outcomeContainer}>
                  <div className={styles.outcomeIcon}>
                    <CheckOutlined />
                  </div>
                  <h2 className={styles.outcomeTitle}>Message Received</h2>
                  <p className={styles.outcomeMessage}>
                    Thank you for contacting Moipone Academy. Your message has been
                    received and our team will get back to you soon.
                  </p>
                  <div className={styles.outcomeActions}>
                    <Button
                      type="primary"
                      size="large"
                      className={styles.fillButton}
                      onClick={handleTryAgain}
                    >
                      Send Another Message
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.floatingShape} />
              <Form
                form={form}
                name="contactForm"
                className={`${styles.formCard} ${styles.form}`}
                layout="vertical"
                initialValues={INITIAL_FORM_DATA}
                onFinish={handleSubmit}
                requiredMark={(label, { required }) => (
                  <>
                    {label}
                    {required && (
                      <span className={styles.requiredMarkAsterisk}>*</span>
                    )}
                  </>
                )}
                colon={false}
              >
                <h3 className={styles.formTitle}>Send us a message</h3>
                <p className={styles.formSubtitle}>
                  Fill out the form below and we&apos;ll respond within 24 hours
                </p>
                
                <div className={styles.formGrid}>
                  <Form.Item
                    label="Full Name"
                    className={styles.inputGroup}
                    name="name"
                    rules={[{ required: true, message: "Please enter your full name" }]}
                  >
                    <Input
                      className={styles.input}
                      prefix={<UserOutlined className={styles.inputIcon} />}
                      placeholder="Your full name"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Email Address"
                    className={styles.inputGroup}
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email address" },
                      { type: "email", message: "Please enter a valid email address" },
                    ]}
                  >
                    <Input
                      className={styles.input}
                      prefix={<MailOutlined className={styles.inputIcon} />}
                      placeholder="you@example.com"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Phone Number"
                    className={styles.inputGroup}
                    name="phone"
                  >
                    <Input
                      className={styles.input}
                      prefix={<PhoneOutlined className={styles.inputIcon} />}
                      placeholder="+27 XX XXX XXXX"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Subject"
                    className={styles.inputGroup}
                    name="subject"
                    rules={[{ required: true, message: "Please select a subject" }]}
                  >
                    <Select
                      className={styles.otherInput}
                      prefix={<TagsOutlined className={styles.inputIcon} />}
                      placeholder="Select a subject"
                      options={contactSubjectOptions}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Your Message"
                    className={`${styles.inputGroup} ${styles.formGroupFull}`}
                    name="message"
                    rules={[{ required: true, message: "Please enter your message" }]}
                  >
                    <Input.TextArea
                      className={styles.textarea}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                    />
                  </Form.Item>
                </div>
                
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.submitButton}
                  loading={isPending}
                  icon={isPending ? <Loader /> : <SendOutlined />}
                >
                  {isPending ? "Sending" : "Send Message"}
                </Button>
              </Form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
