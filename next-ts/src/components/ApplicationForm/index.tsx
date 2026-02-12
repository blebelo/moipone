"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  DatePicker,
  Steps,
  Radio,
  message,
  Form,
} from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useApplicationFormStyles } from "./style";
import {
  genderOptions,
  provinceOptions,
  steps,
} from "@/src/lib/common/constants";
import {
  ICourseApplication,
  RefListApplicationStatus,
} from "@/src/providers/application-provider/context";
import { FileUpload } from "../FileUpload";
import { IAddress } from "@/src/providers/address-provider/context";
import { IStudent } from "@/src/providers/student-provider/context";
import { ICourse } from "@/src/providers/course-provider/context";
import dayjs from "dayjs";
import { formatSaIdNumber, formatPhoneNumber } from "@/src/lib/common/helper-methods";

interface IApplicationFormMethods {
  courseList?: ICourse[];
  createStudent: (address?: IAddress, student?: IStudent) => Promise<void>;
  submitApplication: (application?: ICourseApplication) => Promise<void>;
  currentStudent?: IStudent
}

const ApplicationForm: React.FC<IApplicationFormMethods> = ({
  courseList,
  createStudent,
  submitApplication,
  currentStudent
}) => {
  const { styles } = useApplicationFormStyles();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);


  const [form] = Form.useForm<ICourseApplication>();

  const [formData, setFormData] = useState<ICourseApplication>({
    id: "",
    studentId: "",
    student: {
      id: "",
      name: "",
      surname: "",
      age: undefined,
      gender: undefined,
      emailAddress: "",
      idNumber: "",
      dateOfBirth: undefined,
      phoneNumber: "",
      residentialAddress: {
        id: "",
        street: "",
        suburb: "",
        city: "",
        postalCode: "",
        province: "",
        country: "",
      },
      certifiedId: "",
      proofOfResidence: "",
      curriculumVitae: "",
      certifiedHighestQualification: "",
    },
    shortCourseId: "",
    status: RefListApplicationStatus.Pending,
  });

  const handleNext = async () => {
    try {
      const values = await form.validateFields();

      const merged: ICourseApplication = {
        ...formData,
        ...values,
        student: {
          ...formData.student,
          ...(values?.student ?? {}),
          residentialAddress: {
            ...formData.student?.residentialAddress,
            ...(values?.student?.residentialAddress ?? {}),
          },
        },
      };

      setFormData(merged);
      form.setFieldsValue(merged);

      if (currentStep === 0) {
        await createStudent(merged.student?.residentialAddress, merged.student);
        
        setFormData(prev => ({
          ...prev,
          studentId: currentStudent?.id
        }));

        console.log('Created Student:', currentStudent)
        console.log('Current Form:', form)
        console.log('Current FormData:', formData)
        setCurrentStep((s) => s + 1);
        return;
      }

      if (currentStep === 3) {
        await submitApplication(merged);
        setSubmitted(true);
        message.success("Application submitted successfully!");
        return;
      }

      setCurrentStep((s) => s + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
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
    <div className={styles.section}>
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

          <Form
            form={form}
            name="courseApplication"
            className={styles.form}
            autoComplete="on"
            layout="vertical"
            requiredMark={(label, { required }) => (
              <>
                {label}
                {required && (
                  <span style={{ color: "#ff4d4f", marginLeft: 4 }}>*</span>
                )}
              </>
            )}
            colon={false}
            initialValues={formData}
            onValuesChange={(_, allValues) => {
              setFormData((prev) => {
                const merged: ICourseApplication = {
                  ...prev,
                  ...allValues,
                  student: {
                    ...prev.student,
                    ...(allValues?.student ?? {}),
                    residentialAddress: {
                      ...prev.student?.residentialAddress,
                      ...(allValues?.student?.residentialAddress ?? {}),
                    },
                  },
                };

                return merged;
              });
            }}
          >
            {/* Step 1 */}
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
                  <Form.Item
                    label="First Name"
                    className={styles.inputGroup}
                    name={["student", "name"]}
                    rules={[
                      { required: true, message: "Please input your Name" },
                    ]}
                  >
                    <Input
                      className={styles.input}
                      placeholder="Enter your first name"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Surname"
                    className={styles.inputGroup}
                    name={["student", "surname"]}
                    rules={[
                      { required: true, message: "Please input your surname" },
                    ]}
                  >
                    <Input
                      className={styles.input}
                      placeholder="Enter your surname"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Email Address"
                  className={styles.inputGroup}
                  name={["student", "emailAddress"]}
                  rules={[
                    { required: true, message: "Please input your email" },
                  ]}
                >
                  <Input
                    className={styles.input}
                    type="email"
                    placeholder="your.email@example.com"
                  />
                </Form.Item>

                <Form.Item
                  label="ID Number"
                  className={styles.inputGroup}
                  name={["student", "idNumber"]}
                  rules={[
                    { required: true, message: "Please input your ID Number" },
                    { len: 16, message: "ID Number must be valid" }, 
                  ]}
                >
                  <Input
                    className={styles.input}
                    placeholder="XXXXXX XXXX XX X"
                    maxLength={16}
                    onChange={(e) => {
                      const formatted = formatSaIdNumber(e.target.value);
                      e.target.value = formatted;
                    }}
                  />
                </Form.Item>


                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <Form.Item
                    label="Phone Number"
                    className={styles.inputGroup}
                    name={["student", "phoneNumber"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number",
                      },
                    ]}
                  >
                    <Input
                      className={styles.input}
                      placeholder="XXX XXX XXXX"
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        form.setFieldValue(
                          ["student", "phoneNumber"],
                          formatted,
                        );
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Date of Birth"
                    className={styles.inputGroup}
                    name={["student", "dateOfBirth"]}
                    rules={[
                      {
                        required: true,
                        message: "Please select your date of birth",
                      },
                      {
                        validator: (_, value) => {
                          if (!value) return Promise.resolve();
                          const age = dayjs().diff(dayjs(value), 'year');
                          return age >= 18
                            ? Promise.resolve()
                            : Promise.reject(new Error("You must be at least 18 years old"));
                        },
                      },
                    ]}
                  >
                    <DatePicker
                      style={{ width: "100%", height: "48px" }}
                      placeholder="Select date"
                      // disabledDate={(current) => current && current > dayjs().subtract(18, 'year')}
                      onChange={(date) => {
                        form.setFieldValue(["student", "dateOfBirth"], date)
                      }}
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Gender"
                  className={styles.inputGroup}
                  name={["student", "gender"]}
                  rules={[{ required: true, message: "Please select gender" }]}
                >
                  <Select
                    className={styles.select}
                    placeholder="Select gender"
                    options={genderOptions}
                  />
                </Form.Item>

                <Form.Item
                  label="Street Address"
                  className={styles.inputGroup}
                  name={["student", "residentialAddress", "street"]}
                  rules={[
                    { required: true, message: "Please input street address" },
                  ]}
                >
                  <Input
                    className={styles.input}
                    placeholder="Street address"
                  />
                </Form.Item>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <Form.Item
                    label="City"
                    className={styles.inputGroup}
                    name={["student", "residentialAddress", "city"]}
                    rules={[{ required: true, message: "Please input city" }]}
                  >
                    <Input className={styles.input} placeholder="City" />
                  </Form.Item>

                  <Form.Item
                    label="Postal Code"
                    className={styles.inputGroup}
                    name={["student", "residentialAddress", "postalCode"]}
                    rules={[
                      { required: true, message: "Please input postal code" },
                    ]}
                  >
                    <Input className={styles.input} placeholder="Postal Code" />
                  </Form.Item>

                  <Form.Item
                    label="Province"
                    className={styles.inputGroup}
                    name={["student", "residentialAddress", "province"]}
                    rules={[
                      { required: true, message: "Please select province" },
                    ]}
                  >
                    <Select
                      className={styles.select}
                      placeholder="Select province"
                      options={provinceOptions}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Country"
                    className={styles.inputGroup}
                    name={["student", "residentialAddress", "country"]}
                    rules={[
                      { required: true, message: "Please input country" },
                    ]}
                  >
                    <Input
                      className={styles.input}
                      placeholder="Select country"
                    />
                  </Form.Item>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 1 && (
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Select Course</h3>

                <Form.Item
                  name="shortCourseId"
                  rules={[
                    { required: true, message: "Please select a course" },
                  ]}
                >
                  <Radio.Group
                    value={formData.shortCourseId}
                    onChange={(e) => {
                      form.setFieldValue("shortCourseId", e.target.value);
                      setFormData((p) => ({
                        ...p,
                        shortCourseId: e.target.value,
                      }));
                    }}
                    style={{ width: "100%" }}
                  >
                    {courseList?.map((course) => (
                      <div
                        key={course.id}
                        className={`${styles.programmeOption} ${
                          formData.shortCourseId === course.id
                            ? styles.programmeOptionSelected
                            : ""
                        }`}
                        onClick={() => {
                          form.setFieldValue("shortCourseId", course.id);
                          setFormData((p) => ({
                            ...p,
                            shortCourseId: course.id,
                          }));
                        }}
                      >
                        <Radio value={course.id}>
                          <span className={styles.programmeTitle}>
                            {course.title}
                          </span>
                          <p className={styles.programmeDesc}>
                            {course.description}
                          </p>
                        </Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  className={styles.inputGroup}
                  style={{ marginTop: "24px" }}
                  label='Identity Document'
                >
                  <FileUpload
                    studentId={formData?.student?.id || "dummy-id"}
                    filename="id-document"
                    label="Upload Identity Document"
                  />
                </Form.Item>

                <Form.Item 
                label='Proof Of Residence'
                className={styles.inputGroup}>
                  <FileUpload
                    studentId={formData?.student?.id || "dummy-id"}
                    filename="proof-of-residence"
                    label="Upload proof of residence"
                  />
                </Form.Item>

                <Form.Item 
                className={styles.inputGroup}
                label='Curriculum VItae (CV)'
                >
                  <FileUpload
                    studentId={formData?.student?.id || "dummy-id"}
                    filename="cv"
                    label="Upload CV / Resume"
                  />
                </Form.Item>

                <Form.Item
                label='Highest Qualification'
                className={styles.inputGroup}>
                  <FileUpload
                    studentId={formData?.student?.id || "dummy-id"}
                    filename="highest-qualification"
                    label="Upload qualification document"
                  />
                </Form.Item>
              </div>
            )}

            {/* Step 3 Review */}
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
                    {courseList?.find((c) => c.id === formData?.shortCourseId)
                      ?.title || "Not selected"}
                  </p>
                </div>
              </div>
            )}
          </Form>

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
    </div>
  );
};

export default ApplicationForm;
