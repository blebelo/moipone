import React, { useState } from "react";
import { Button, Input, Select, DatePicker, Steps, Radio, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useApplicationFormStyles } from "./style";
import { genderOptions, programmesList, provinceOptions, steps } from "@/src/lib/common/constants";
import { ICourseApplication } from "@/src/providers/application-provider/context";
import { FileUpload } from "../FileUpload";


const ApplicationForm: React.FC = () => {
  const { styles } = useApplicationFormStyles();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ICourseApplication | null>(null);

  const updateForm = (field: string, value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.formCard}>
            <div className={styles.successContainer}>
              <div className={styles.successIcon}>
                <CheckOutlined />
              </div>
              <h2 className={styles.successTitle}>Application Submitted!</h2>
              <p className={styles.successMessage}>
                Thank you for applying to Moipone Academy. We will review your
                application and contact you within 5-7 business days.
              </p>
              <Button type="primary" size="large" href="/">
                Return to Homepage
              </Button>
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

          {/* Step 1: Personal Information ____________________________________________________________________________________________________ */}
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
                  <label className={styles.label}>First Name</label>
                  <Input
                    className={styles.input}
                    placeholder="Enter your first name"
                    value={formData?.student?.name}
                    onChange={(e) => updateForm("firstName", e.target.value)}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Surname</label>
                  <Input
                    className={styles.input}
                    placeholder="Enter your surname"
                    value={formData?.student?.surname}
                    onChange={(e) => updateForm("surname", e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <Input
                  className={styles.input}
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData?.student?.emailAddress}
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
                  <label className={styles.label}>Phone Number</label>
                  <Input
                    className={styles.input}
                    placeholder="+27 XX XXX XXXX"
                    value={formData?.student?.phoneNumber}
                    onChange={(e) => updateForm("phoneNumber", e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Date of Birth</label>
                  <DatePicker
                    style={{ width: "100%", height: "48px" }}
                    placeholder="Select date"
                    value={formData?.student?.dateOfBirth}
                    onChange={(date) => updateForm("dateOfBirth", date)}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Gender</label>
                <Select
                  className={styles.select}
                  placeholder="Select gender"
                  value={formData?.student?.gender || undefined}
                  onChange={(value) => updateForm("gender", value)}
                  options={genderOptions}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Address</label>
                <Input
                  className={styles.input}
                  placeholder="Street address"
                  value={formData?.student?.residentialAddress?.street}
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
                    value={formData?.student?.residentialAddress?.city}
                    onChange={(e) => updateForm("city", e.target.value)}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Postal Code</label>
                  <Input
                    className={styles.input}
                    placeholder="Postal Code"
                    value={formData?.student?.residentialAddress?.postalCode}
                    onChange={(e) => updateForm("postalCode", e.target.value)}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Province</label>
                  <Select
                    className={styles.select}
                    placeholder="Select province"
                    value={formData?.student?.residentialAddress?.province}
                    onChange={(value) => updateForm("province", value)}
                    options={provinceOptions}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Country</label>
                  <Input
                    className={styles.input}
                    placeholder="Select country"
                    value={formData?.student?.residentialAddress?.country}
                    onChange={(e) => updateForm("country", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Programme Selection ____________________________________________________________________________________________________ */}
          {currentStep === 1 && (
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Select Course</h3>

              <Radio.Group
                value={formData?.shortCourse}
                onChange={(e) => updateForm("programme", e.target.value)}
                style={{ width: "100%" }}
              >
                {programmesList.map((prog) => (
                  <div
                    key={prog.id}
                    className={`${styles.programmeOption} ${formData?.shortCourseId === prog.id ? styles.programmeOptionSelected : ""}`}
                    onClick={() => updateForm("shortCourseId", prog.id)}
                  >
                    <Radio value={prog.id}>
                      <span className={styles.programmeTitle}>
                        {prog.title}
                      </span>
                      <p className={styles.programmeDesc}>{prog.description}</p>
                    </Radio>
                  </div>
                ))}
              </Radio.Group>

              <div className={styles.inputGroup} style={{ marginTop: "24px" }}>
                <label className={styles.label}>ID Document</label>

                <FileUpload
                  studentId={formData?.student?.id || "dummy-id"}
                  filename="id-document"
                  label="Upload ID document"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Proof of Residence</label>

                <FileUpload
                  studentId={formData?.student?.id || "dummy-id"}
                  filename="proof-of-residence"
                  label="Upload proof of residence"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Curriculum Vitae (CV)</label>

                <FileUpload
                  studentId={formData?.student?.id || "dummy-id"}
                  filename="cv"
                  label="Upload CV / Resume"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Highest Qualification</label>
                <FileUpload
                  studentId={formData?.student?.id || "dummy-id"}
                  filename="highest-qualification"
                  label="Upload qualification document"
                />
              </div>
            </div>
          )}
          {/* Step 3: Review Application ____________________________________________________________________________________________________ */}
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
                  <strong>Name:</strong> {formData?.student?.name}{" "}
                  {formData?.student?.surname}
                </p>
                <p>
                  <strong>Email:</strong> {formData?.student?.emailAddress}
                </p>
                <p>
                  <strong>Phone:</strong> {formData?.student?.phoneNumber}
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  {formData?.student?.residentialAddress?.street},{" "}
                  {formData?.student?.residentialAddress?.city},{" "}
                  {formData?.student?.residentialAddress?.province}
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
                  {programmesList.find((p) => p.id === formData?.shortCourseId)
                    ?.title || "Not selected"}
                </p>
              </div>
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
  );
};

export default ApplicationForm;
