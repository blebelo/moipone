"use client";
import { useState } from "react";
import { Button, Input, Select, DatePicker, Steps, Radio, message } from "antd";
import {
  CalendarOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useApplicationFormStyles } from "./style";
import {
  experienceOptions,
  genderOptions,
  INITIAL_STATE,
  programmesList,
  provinceOptions,
  steps,
} from "@/src/lib/common/constants";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { ICourseApplication } from "@/src/providers/application-provider/context";

const { TextArea } = Input;

const ApplicationForm = () => {
  const { styles } = useApplicationFormStyles();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ICourseApplication | null>(null);
  const updateForm = (value: string, field: string) => {}
  
  // const updateForm = <K extends keyof ICourseApplication>(
  //   field: K,
  //   value: ICourseApplication[K],
  // ) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setSubmitted(true);
      message.success("Application submitted successfully!");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (submitted) {
    //Return sucess message
  }

  return (
    <div>
      <Header />
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Apply Now</h1>
            <p className={styles.subtitle}>
              Take the first step towards a brighter future. Complete your
              application to join one of our transformative programmes.
            </p>
          </div>

          <div className={styles.formCard}>
            <div className={styles.stepsContainer}>
              <Steps current={currentStep} items={steps} />
            </div>

            {currentStep === 0 && (
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Personal Information</h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>First Name *</label>
                    <Input
                      className={styles.input}
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      prefix={<UserOutlined className={styles.prefix} />}
                      onChange={(e) => updateForm("firstName", e.target.value)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Last Name *</label>
                    <Input
                      className={styles.input}
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      prefix={<UserOutlined className={styles.prefix} />}
                      onChange={(e) => updateForm("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Email Address *</label>
                  <Input
                    className={styles.input}
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    prefix={<MailOutlined className={styles.prefix} />}
                    onChange={(e) => updateForm("email", e.target.value)}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Phone Number </label>
                    <Input
                      className={styles.input}
                      placeholder="+27 XX XXX XXXX"
                      value={formData.phone}
                      prefix={<PhoneOutlined className={styles.prefix} />}
                      onChange={(e) => updateForm("phone", e.target.value)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Date of Birth *</label>
                    <DatePicker
                      style={{ width: "100%", height: "48px" }}
                      placeholder="Select date"
                      value={formData.dateOfBirth}
                      suffixIcon={
                        <CalendarOutlined className={styles.prefix} />
                      }
                      onChange={(date) => updateForm("dateOfBirth", date)}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Gender</label>
                  <Select
                    require
                    className={styles.select}
                    placeholder="Select gender"
                    value={formData.gender || undefined}
                    onChange={(value) => updateForm("gender", value)}
                    options={genderOptions}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Address</label>
                  <Input
                    className={styles.input}
                    placeholder="Street address"
                    value={formData.address}
                    onChange={(e) => updateForm("address", e.target.value)}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>City</label>
                    <Input
                      className={styles.input}
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => updateForm("city", e.target.value)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Province</label>
                    <Select
                      className={styles.select}
                      placeholder="Select province"
                      value={formData.province || undefined}
                      onChange={(value) => updateForm("province", value)}
                      options={provinceOptions}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Select Programme</h3>

                <Radio.Group
                  value={formData.programme}
                  onChange={(e) => updateForm("programme", e.target.value)}
                  style={{ width: "100%" }}
                >
                  {programmesList.map((prog) => (
                    <div
                      key={prog.id}
                      className={`${styles.programmeOption} ${formData.programme === prog.id ? styles.programmeOptionSelected : ""}`}
                      onClick={() => updateForm("programme", prog.id)}
                    >
                      <Radio value={prog.id}>
                        <span className={styles.programmeTitle}>
                          {prog.title}
                        </span>
                        <p className={styles.programmeDesc}>
                          {prog.description}
                        </p>
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>

                <div
                  className={styles.inputGroup}
                  style={{ marginTop: "24px" }}
                >
                  <label className={styles.label}>Previous Experience</label>
                  <Select
                    className={styles.select}
                    placeholder="Select your experience level"
                    value={formData.experience || undefined}
                    onChange={(value) => updateForm("experience", value)}
                    options={experienceOptions}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    Why do you want to join this programme?
                  </label>
                  <TextArea
                    className={styles.textarea}
                    rows={4}
                    placeholder="Tell us about your goals and what you hope to achieve..."
                    value={formData.motivation}
                    onChange={(e) => updateForm("motivation", e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>
                  Parent/Guardian Information
                </h3>
                <p style={{ color: "#4a4a68", marginBottom: "24px" }}>
                  Required for applicants under 18 years of age.
                </p>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    Parent/Guardian Full Name
                  </label>
                  <Input
                    className={styles.input}
                    placeholder="Enter full name"
                    value={formData.parentName}
                    onChange={(e) => updateForm("parentName", e.target.value)}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Contact Phone</label>
                    <Input
                      className={styles.input}
                      placeholder="+27 XX XXX XXXX"
                      value={formData.parentPhone}
                      onChange={(e) =>
                        updateForm("parentPhone", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Contact Email</label>
                    <Input
                      className={styles.input}
                      type="email"
                      placeholder="parent.email@example.com"
                      value={formData.parentEmail}
                      onChange={(e) =>
                        updateForm("parentEmail", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Review Your Application</h3>

                <div
                  style={{
                    background: "#f8f9fa",
                    borderRadius: "12px",
                    padding: "24px",
                    marginBottom: "24px",
                  }}
                >
                  <h4
                    style={{
                      fontWeight: 600,
                      marginBottom: "16px",
                      color: "#1a1a2e",
                    }}
                  >
                    Personal Information
                  </h4>
                  <p>
                    <strong>Name:</strong> {formData.firstName}{" "}
                    {formData.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                  <p>
                    <strong>Location:</strong> {formData.city},{" "}
                    {formData.province}
                  </p>
                </div>

                <div
                  style={{
                    background: "#f8f9fa",
                    borderRadius: "12px",
                    padding: "24px",
                    marginBottom: "24px",
                  }}
                >
                  <h4
                    style={{
                      fontWeight: 600,
                      marginBottom: "16px",
                      color: "#1a1a2e",
                    }}
                  >
                    Programme Selection
                  </h4>
                  <p>
                    <strong>Programme:</strong>{" "}
                    {programmesList.find((p) => p.id === formData.programme)
                      ?.title || "Not selected"}
                  </p>
                  <p>
                    <strong>Experience Level:</strong>{" "}
                    {formData.experience || "Not specified"}
                  </p>
                </div>

                {formData.parentName && (
                  <div
                    style={{
                      background: "#f8f9fa",
                      borderRadius: "12px",
                      padding: "24px",
                    }}
                  >
                    <h4
                      style={{
                        fontWeight: 600,
                        marginBottom: "16px",
                        color: "#1a1a2e",
                      }}
                    >
                      Guardian Information
                    </h4>
                    <p>
                      <strong>Name:</strong> {formData.parentName}
                    </p>
                    <p>
                      <strong>Phone:</strong> {formData.parentPhone}
                    </p>
                    <p>
                      <strong>Email:</strong> {formData.parentEmail}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className={styles.buttonGroup}>
              <Button
                className={styles.prevButton}
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                type="primary"
                className={styles.nextButton}
                onClick={handleNext}
              >
                {currentStep === 3 ? "Submit Application" : "Next Step"}
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ApplicationForm;
