"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { BuildOutlined, CalendarOutlined, CheckCircleOutlined, CheckOutlined, ExclamationCircleFilled, GlobalOutlined, HomeOutlined, IdcardOutlined, InboxOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { useApplicationFormStyles } from "./style";
import {
  genderOptions,
  IApplicationFormProps,
  provinceOptions,
  steps,
} from "@/src/lib/common/constants";
import {
  ICourseApplication,
  RefListApplicationStatus,
} from "@/src/providers/application-provider/context";
import { FileUpload } from "../FileUpload";
import dayjs from "dayjs";
import {
  formatSaIdNumber,
  formatPhoneNumber,
  sanitizeStudentData,
} from "@/src/lib/common/helper-methods";
import { IStudent } from "@/src/providers/student-provider/context";
import { useRouter } from "next/navigation";

const ApplicationForm: React.FC<IApplicationFormProps> = ({
  courseList,
  createStudent,
  applicationState,
  resetApplicationState,
  submitApplication,
  registerDocs,
  getStudentByIdNumber,
}) => {
  const router = useRouter();
  const { styles } = useApplicationFormStyles();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [existingStudent, setExistingStudent] = useState<IStudent | null>(null);
  const hasResetStateOnMount = useRef(false);
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
        province: undefined,
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
 
  useEffect(() => {
    if (hasResetStateOnMount.current) return;
    hasResetStateOnMount.current = true;
    resetApplicationState();
  }, [resetApplicationState]);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [submitted, router]);

  const handleNext = async () => {
    try {
      const values = await form.validateFields();

      const merged: ICourseApplication = {
        ...formData,
        ...values,
        student: {
          ...formData.student,
          ...(values?.student),
          residentialAddress: {
            ...formData.student?.residentialAddress,
            ...(values?.student?.residentialAddress),
          },
        },
      };

      setFormData(merged);
      form.setFieldsValue(merged);

      if (currentStep === 0) {
        if (existingStudent?.id) {
          setFormData((prev) => ({
            ...prev,
            studentId: existingStudent.id,
          }));

          setCurrentStep((s) => s + 1);
          message.success("Student loaded. Proceeding.");
          return;
        }

        createStudent(sanitizeStudentData(merged.student))
          .then((created) => {
            setExistingStudent(created);

            const id = created?.id || "";

            setFormData((prev) => ({
              ...prev,
              studentId: id,
              student: created,
            }));

            form.setFieldsValue({
              ...merged,
              studentId: id,
              student: created,
            });

            setCurrentStep((s) => s + 1);
            message.success("Student profile created successfully.");
          })
          .catch(() => {
            message.error("Failed to save student information.");
          });

        return;
      };

      if (currentStep === 1) {
        if (merged.studentId && !existingStudent?.id) {
          await registerDocs(`${merged.studentId}`);
        }
        existingStudent?.id ==='' 
          ? message.success("Documents uploaded successfully! Please review your application before submitting.")
          : message.success("Course selected successfully! Proceeding to review.");
        setCurrentStep((s) => s + 1);
        return;
      }

      if (currentStep === 2) {
        try {
          await submitApplication(merged);
          setSubmitted(true);
          console.log("Submitted application:", applicationState);
          console.log("Submit Flag:", true);
        } catch (error) {
          setSubmitted(false);
          console.error("Failed to submit application.", error);
          console.error("Application State at submission: ", applicationState);
          console.log("Submit Flag:", false);
        }
        return;
      }

      setCurrentStep((s) => s + 1);
    } catch (err) {
      console.error(err);
      message.error(
        "An error occurred. Please check the form for errors and try again.",
      );
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const lookupStudent = () => {
    const raw = form.getFieldValue(["student", "idNumber"]) as string;
    const idNumber = (raw || "").replaceAll(/\s+/g, "");
    if (!idNumber) return;

    getStudentByIdNumber(idNumber)
      .then((existingStudent) => {
        if (!existingStudent) {
          setExistingStudent(null);
          return;
        }
        setExistingStudent(existingStudent);

        const updated: ICourseApplication = {
          ...formData,
          student: {...existingStudent,
            dateOfBirth: dayjs(existingStudent.dateOfBirth).toISOString(),
          },
          studentId: existingStudent.id || "",
        };

        setFormData(updated);
        form.setFieldsValue(updated);
        setCurrentStep((s) => s + 1);
        message.success("Existing student found. Form pre-filled.");
      })
      .catch(() => {
        message.info("Couldn’t verify student right now. Proceed Manually");
      });
  };

  if (applicationState.isSuccess === true && submitted === true) {
    return (
        <div className={styles.section}>
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={styles.formCard}>
                <div className={styles.outcomeContainer}>
                  <div className={styles.icon}>
                    <CheckOutlined />
                  </div>
                  <h2 className={styles.outcomeTitle}>Application Submitted!</h2>
                  <p className={styles.outcomeMessage}>
                    Thank you for applying to Moipone Academy. We will review your
                    application and contact you within 5-7 business days.
                  </p>
                  <Button type="primary" 
                    size="large" 
                    href="/"
                    className={styles.fillButton}>
                    Return to Homepage
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
    );
  }

  if (applicationState.isError === true && submitted === false) {
    return (
        <div className={styles.section}>
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={styles.formCard}>
                <div className={styles.outcomeContainer}>
                  <div className={styles.icon}>
                    <ExclamationCircleFilled />
                  </div>
                  <h2 className={styles.outcomeTitle}>Duplicate Application Detected</h2>
                  <p className={styles.outcomeMessage}>
                    Your application was rejected due to a duplicate submission. If you
                    believe this is a mistake, please contact us.
                  </p>

                  <div className={styles.outcomeActions}>
                    <Button size="large" 
                      href="/"
                      className={styles.outlineButton}>
                      Return to Homepage
                    </Button>
                    <Button type="primary" 
                        size="large"
                        className={styles.fillButton} >
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
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
            <Steps 
              className={styles.formSteps}
              current={currentStep} 
              items={steps} />
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
                    ...(allValues?.student),
                    residentialAddress: {
                      ...prev.student?.residentialAddress,
                      ...(allValues?.student?.residentialAddress),
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
                      prefix={<UserOutlined  className={styles.inputIcon}/>}
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
                      prefix={<UserOutlined  className={styles.inputIcon}/>}
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
                    prefix={<MailOutlined className={styles.inputIcon}/>}
                    placeholder="your.email@example.com"
                  />
                </Form.Item>

                <Form.Item
                  label="ID Number"
                  className={styles.inputGroup}
                  name={["student", "idNumber"]}
                  rules={[
                    { required: true, message: "Please input your ID Number" },
                    {
                      validator: (_, value) => {
                        const digits = value?.replace(/\D/g, "") ?? "";
                        if (digits.length === 0 || digits.length === 13)
                          return Promise.resolve();
                        return Promise.reject("ID Number must be 13 digits");
                      },
                    },
                  ]}
                >
                  <Input
                    className={styles.input}
                    placeholder="XXXXXX XXXX XX X"
                    prefix={<IdcardOutlined className={styles.inputIcon}/>}
                    onBlur={lookupStudent}
                    onChange={(e) => {
                      const formatted = formatSaIdNumber(e.target.value);
                      form.setFieldValue(["student", "idNumber"], formatted);
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
                      { len: 12, message: "Phone number must be 10 digits" },
                    ]}
                  >
                    <Input
                      className={styles.input}
                      placeholder="XXX XXX XXXX"
                      prefix={<PhoneOutlined className={styles.inputIcon}/>}
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
                      { required: true, message: "Please select your date of birth" },
                      {
                        validator: (_, value) => {
                          if (!value) return Promise.resolve();
                          const age = dayjs().diff(dayjs(value, "YYYY-MM-DD"), "year");
                          return age >= 18
                            ? Promise.resolve()
                            : Promise.reject(new Error("You must be at least 18 years old"));
                        },
                      },
                    ]}
                    getValueProps={(value) => ({
                      value: value ? dayjs(value, "YYYY-MM-DD") : null,
                    })}
                    getValueFromEvent={(date: dayjs.Dayjs | null) =>
                      date ? date.format("YYYY-MM-DD") : undefined
                    }
                  >
                    <DatePicker
                      className={styles.otherInput}
                      placeholder="Select date"
                      suffixIcon={<CalendarOutlined  className={styles.inputIcon}/>}
                      disabledDate={(current) =>
                        !!current && current > dayjs().subtract(18, "year")
                      }
                      onChange={(date) => {
                        setFormData((prev) => ({
                          ...prev,
                          student: {
                            ...prev.student,
                            age: date ? dayjs().diff(date, "year") : undefined,
                          },
                        }));
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
                    className={styles.otherInput}
                    placeholder="Select gender"
                    prefix={<UserOutlined className={styles.inputIcon}/>}
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
                    prefix={<HomeOutlined className={styles.inputIcon}/>}
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
                    <Input 
                      className={styles.input} 
                      placeholder="City" 
                      prefix={<BuildOutlined className={styles.inputIcon}/>}   
                      />
                  </Form.Item>

                  <Form.Item
                    label="Postal Code"
                    className={styles.inputGroup}
                    name={["student", "residentialAddress", "postalCode"]}
                    rules={[
                      { required: true, message: "Please input postal code" },
                    ]}
                  >
                    <Input 
                      className={styles.input} 
                      placeholder="Postal Code" 
                      prefix={<InboxOutlined className={styles.inputIcon}/>}   
                      />
                  </Form.Item>

                  <Form.Item
                    label="Province"
                    className={styles.inputGroup}
                    name={["student", "residentialAddress", "province"]}
                    rules={[{ required: true, message: "Please select province" }]}
                  >
                    <Select
                      className={styles.otherInput}
                      placeholder="Select province"
                      prefix={<UserOutlined className={styles.inputIcon}/>}
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
                      prefix={<GlobalOutlined className={styles.inputIcon}/>}
                    />
                  </Form.Item>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 1 && (
              <div className={styles.formSection}>
                <Form.Item
                  name="shortCourseId"
                  rules={[
                    { required: true, message: "Please select a course" },
                  ]}
                >
                  <Radio.Group
                    value={formData.shortCourseId}
                    onChange={(e) => {
                      const next = e.target.value;
                      form.setFieldValue("shortCourseId", next);
                      setFormData((p) => ({ ...p, shortCourseId: next }));
                    }}
                    style={{ width: "100%" }}
                  >
                    {courseList?.map((course) => {
                      const selected = formData.shortCourseId === course.id;

                      const setSelected = () => {
                        form.setFieldValue("shortCourseId", course.id);
                        setFormData((p) => ({
                          ...p,
                          shortCourseId: course.id,
                        }));
                      };

                      return (
                        <div
                          key={course.id}
                          className={`${styles.programmeOption} ${
                            selected ? styles.programmeOptionSelected : ""
                          }`}
                          onClick={setSelected}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSelected();
                            }
                          }}
                        >
                          <CheckCircleOutlined
                            className={`programme-check-icon ${styles.programmeCheckIcon} ${
                              selected ? styles.programmeCheckIconSelected : ""
                            }`}
                          />
                          <Radio className={styles.programmeRadioHidden} value={course.id}>
                            <span className={styles.programmeTitle}>
                              {course.title}
                            </span>
                            <p className={styles.programmeDesc}>
                              {course.description}
                            </p>
                          </Radio>
                        </div>
                      );
                    })}
                  </Radio.Group>
                </Form.Item>

                {existingStudent !== null && (
                  <>
                    <Form.Item
                    className={styles.inputGroup}
                    style={{ marginTop: "24px" }}
                    label="Identity Document"
                  >
                    <FileUpload
                      studentId={`${formData?.studentId}`}
                      filename="id-document"
                      label="Upload Identity Document"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Proof Of Residence"
                    className={styles.inputGroup}
                  >
                    <FileUpload
                      studentId={`${formData?.studentId}`}
                      filename="proof-of-residence"
                      label="Upload proof of residence"
                    />
                  </Form.Item>

                  <Form.Item
                    className={styles.inputGroup}
                    label="Curriculum VItae (CV)"
                  >
                    <FileUpload
                      studentId={`${formData?.studentId}`}
                      filename="cv"
                      label="Upload CV / Resume"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Highest Qualification"
                    className={styles.inputGroup}
                  >
                    <FileUpload
                      studentId={
                        formData?.studentId || `${formData.student?.idNumber}`
                      }
                      filename="highest-qualification"
                      label="Upload qualification document"
                    />
                  </Form.Item>
                </>
                )}
              </div>
            )}

            {/* Step 3 Review */}
            {currentStep === 2 && (
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Review Your Application</h3>

                <div className={styles.reviewCards}>
                  <div className={styles.reviewCard}>
                    <h4 className={styles.reviewCardTitle}>Personal Information</h4>
                    <div className={styles.reviewList}>
                      <p className={styles.reviewRow}>
                        <span className={styles.reviewLabel}>Name</span>
                        <span className={styles.reviewValue}>
                          {`${formData?.student?.name ?? ""} ${formData?.student?.surname ?? ""}`.trim() || "Not provided"}
                        </span>
                      </p>
                      <p className={styles.reviewRow}>
                        <span className={styles.reviewLabel}>Email</span>
                        <span className={styles.reviewValue}>
                          {formData?.student?.emailAddress || "Not provided"}
                        </span>
                      </p>
                      <p className={styles.reviewRow}>
                        <span className={styles.reviewLabel}>Phone</span>
                        <span className={styles.reviewValue}>
                          {formData?.student?.phoneNumber || "Not provided"}
                        </span>
                      </p>
                      <p className={styles.reviewRow}>
                        <span className={styles.reviewLabel}>Location</span>
                        <span className={styles.reviewValue}>
                          {[
                            formData?.student?.residentialAddress?.street,
                            formData?.student?.residentialAddress?.city,
                            formData?.student?.residentialAddress?.province,
                          ]
                            .filter(Boolean)
                            .join(", ") || "Not provided"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className={styles.reviewCard}>
                    <h4 className={styles.reviewCardTitle}>Programme Selection</h4>
                    <div className={styles.reviewList}>
                      <p className={styles.reviewRow}>
                        <span className={styles.reviewLabel}>Programme</span>
                        <span className={styles.reviewValue}>
                          {courseList?.find((c) => c.id === formData?.shortCourseId)
                            ?.title || "Not selected"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Form>

          <div className={styles.buttonGroup}>
            {currentStep == 2 && (
              <Button
                className={styles.prevButton}
                onClick={handlePrev}
              >
                Previous
              </Button>
            )}
            <Button
              type="primary"
              className={styles.nextButton}
              onClick={handleNext}
            >
              {currentStep === 2 ? "Submit Application" : "Next Step"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
