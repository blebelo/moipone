'use client';

import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  message,
  Checkbox,
  Select,
} from 'antd';
import {
  CheckOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import dayjs from 'dayjs';

import { useCourseFormStyles } from './style';
import { ICourse } from '@/src/providers/course-provider/context';

interface ICourseFormProps {
  onSubmit?: (data: ICourse) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const iconOptions = [
  { label: 'Book', value: 'book' },
  { label: 'Code', value: 'code' },
  { label: 'Laptop', value: 'laptop' },
  { label: 'Graduation Cap', value: 'graduation' },
  { label: 'Beaker', value: 'beaker' },
  { label: 'Lightbulb', value: 'lightbulb' },
];

const CourseForm: React.FC<ICourseFormProps> = ({
  onSubmit,
  onSuccess,
  onError,
}) => {
  const { styles } = useCourseFormStyles();

  const [submitted, setSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [featuresInput, setFeaturesInput] = useState('');

  const [form] = Form.useForm<ICourse>();
  const [formData, setFormData] = useState<ICourse>({
    title: '',
    description: '',
    code: '',
    capacity: undefined,
    requirements: '',
    startDate: undefined,
    duration: 0,
    displayIcon: '',
    features: [],
    isActive: true,
  });


  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload: ICourse = {
        ...formData,
        ...values,
      };

      await onSubmit?.(payload);

      setSubmitted(true);
      setIsError(false);

      onSuccess?.();
      message.success('Course created successfully!');
    } catch (error) {
      console.error(error);

      setIsError(true);

      onError?.(
        error instanceof Error
          ? error.message
          : 'Failed to create course'
      );

      message.error('Failed to create course');
    }
  };

  const addFeature = () => {
    if (!featuresInput.trim()) return;

    const updated = [
      ...(formData.features || []),
      featuresInput.trim(),
    ];

    setFormData((prev) => ({
      ...prev,
      features: updated,
    }));

    form.setFieldValue('features', updated);
    setFeaturesInput('');
  };

  const removeFeature = (index: number) => {
    const updated = formData.features.filter(
      (_, i) => i !== index
    );

    setFormData((prev) => ({
      ...prev,
      features: updated,
    }));

    form.setFieldValue('features', updated);
  };

  if (submitted && !isError) {
    return (
      <div className={styles.section}>
        <div className={styles.container}>
          <div className={styles.formCard}>
            <div className={styles.outcomeContainer}>
              <div className={styles.icon}>
                <CheckOutlined
                  style={{
                    color: '#16a34a',
                    fontSize: '3rem',
                  }}
                />
              </div>

              <h2 className={styles.outcomeTitle}>
                Course Created Successfully!
              </h2>

              <p className={styles.outcomeMessage}>
                Your course has been added to the system
                and is ready for students to apply.
              </p>

              <Button
                type="primary"
                size="large"
                className={styles.fillButton}
                onClick={() => window.location.reload()}
              >
                Return to Courses
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError && !submitted) {
    return (
      <div className={styles.section}>
        <div className={styles.container}>
          <div className={styles.formCard}>
            <div className={styles.outcomeContainer}>
              <div className={styles.icon}>
                <ExclamationCircleFilled
                  style={{
                    color: '#ef4444',
                    fontSize: '3rem',
                  }}
                />
              </div>

              <h2 className={styles.outcomeTitle}>
                Course Creation Failed
              </h2>

              <p className={styles.outcomeMessage}>
                An error occurred while creating the
                course. Please try again.
              </p>

              <Button
                size="large"
                className={styles.outlineButton}
                onClick={() => {
                  setIsError(false);
                }}
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Create New Course
          </h1>

          <p className={styles.subtitle}>
            Add a new educational programme to the
            system
          </p>
        </div>

        <div className={styles.formCard}>
          <Form<ICourse>
            form={form}
            layout="vertical"
            colon={false}
            initialValues={formData}
            className={styles.form}
            requiredMark={(label, { required }) => (
              <>
                {label}
                {required && (
                  <span
                    style={{
                      color: '#ff4d4f',
                      marginLeft: 4,
                    }}
                  >
                    *
                  </span>
                )}
              </>
            )}
            onValuesChange={(_, allValues) => {
              setFormData((prev) => ({
                ...prev,
                ...allValues,
              }));
            }}
          >
            <div className={styles.formSection}>
              <Form.Item
                label="Course Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message:
                      'Please enter course title',
                  },
                ]}
              >
                <Input
                  className={styles.input}
                  placeholder="Introduction to Robotics"
                />
              </Form.Item>

              <Form.Item
                label="Course Code"
                name="code"
                rules={[
                  {
                    required: true,
                    message:
                      'Please enter course code',
                  },
                ]}
              >
                <Input
                  className={styles.input}
                  placeholder="ROB101"
                />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message:
                      'Please enter description',
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  className={styles.input}
                />
              </Form.Item>

              <Form.Item
                label="Requirements"
                name="requirements"
              >
                <Input.TextArea
                  rows={3}
                  className={styles.input}
                />
              </Form.Item>

              <Form.Item
                label="Display Icon"
                name="displayIcon"
                rules={[
                  {
                    required: true,
                    message:
                      'Please select an icon',
                  },
                ]}
              >
                <Select
                  options={iconOptions}
                  placeholder="Select course icon"
                />
              </Form.Item>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: 16,
                }}
              >
                <Form.Item
                  label="Start Date"
                  name="startDate"
                  rules={[
                    {
                      required: true,
                      message:
                        'Please select start date',
                    },
                  ]}
                  getValueProps={(value) => ({
                    value: value
                      ? dayjs(value)
                      : null,
                  })}
                  getValueFromEvent={(date) =>
                    date
                      ? date.toDate()
                      : undefined
                  }
                >
                  <DatePicker
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                <Form.Item
                  label="Duration (days)"
                  name="duration"
                  rules={[
                    {
                      required: true,
                      message:
                        'Please enter duration',
                    },
                  ]}
                >
                  <InputNumber
                    min={1}
                    max={365}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </div>

              <Form.Item
                label="Capacity"
                name="capacity"
              >
                <InputNumber
                  min={1}
                  max={500}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <div
                style={{
                  border: '1px solid #e8e6e1',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  background: '#f9f8f6',
                }}
              >
                <label
                  style={{
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '0.75rem',
                  }}
                >
                  Features
                </label>

                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  <Input
                    value={featuresInput}
                    placeholder="Hands-on Labs"
                    onChange={(e) =>
                      setFeaturesInput(
                        e.target.value
                      )
                    }
                    onPressEnter={addFeature}
                  />

                  <Button
                    type="primary"
                    onClick={addFeature}
                  >
                    Add
                  </Button>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  {formData.features?.map(
                    (feature, index) => (
                      <div
                        key={index}
                        style={{
                          background: '#f7931e',
                          color: '#fff',
                          padding:
                            '0.4rem 0.75rem',
                          borderRadius:
                            '0.375rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        {feature}

                        <button
                          type="button"
                          onClick={() =>
                            removeFeature(index)
                          }
                          style={{
                            border: 'none',
                            background: 'none',
                            color: '#fff',
                            cursor: 'pointer',
                          }}
                        >
                          ×
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>

              <Form.Item
                name="isActive"
                valuePropName="checked"
                style={{ marginTop: 24 }}
              >
              <Checkbox
                style={{
                  color: "var(--color-dark-teal)",
                  fontWeight: 500,
                  fontFamily: "var(--font-primary)",
                }}
              >
                Publish this course immediately
              </Checkbox>
              </Form.Item>
            </div>
          </Form>

          <div className={styles.formActions}>
            <Button
              type="primary"
              size="large"
              className={styles.primaryButton}
              onClick={handleSubmit}
            >
              Create Course
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;