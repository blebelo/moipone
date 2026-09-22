"use client";

import React, { useEffect, useRef, useState, SubmitEvent } from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import {
  CheckInFormErrors,
  defaultFormValues,
  ICheckInFormProps,
} from "@/lib/common/constants";
import { toErrorDefaults } from "@/lib/common/helper-methods";
import SuccessBanner from "../SuccessBanner";
import {
  ResidenceType,
  SexType,
  SexualityType,
  VisitReason,
} from "@/lib/common/data";
import { ICreateVisitDto } from "@/providers/VisitProvider/context";

const CheckInForm: React.FC<ICheckInFormProps> = ({
  checkInVisitor,
  lookupVisitor,
  visitorState,
  visitState,
  open = false,
  onOpenChange,
}) => {
  const [formData, setFormData] = useState<ICreateVisitDto>(defaultFormValues);
  const [formError, setFormError] = useState<string>("");
  const [errors, setErrors] = useState<CheckInFormErrors>(toErrorDefaults(defaultFormValues));
  const lookupRequest = useRef(0);
  const [completedLookupRequest, setCompletedLookupRequest] = useState(0);
  const lookupEmailAddress = useRef("");
  const existingVisitor = Boolean(visitorState.visitor?.id);
  const visitorFieldsDisabled = visitorState.isPending || visitState.isPending || existingVisitor;
  const pending = visitState.isPending;
  

  const closeForm = (): void => {
    if (visitorState.isPending || visitState.isPending) {
      return;
    }

    setFormData(defaultFormValues);
    setFormError("");
    setErrors(toErrorDefaults(defaultFormValues));
    lookupRequest.current += 1;
    onOpenChange?.(false);
  }

  const handleEmailBlur = async (): Promise<void> => {
    const emailAddress = formData.visitor.emailAddress?.trim() ?? "";
    if (!emailAddress || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      return;
    }

    const requestId = ++lookupRequest.current;
    lookupEmailAddress.current = emailAddress;
    await lookupVisitor(emailAddress)
      .then(() => {
        if (requestId !== lookupRequest.current) {
          return;
        }

        setCompletedLookupRequest(requestId);
      })
      .catch(() => undefined);
  };

  useEffect(() => {
    if (completedLookupRequest !== lookupRequest.current) {
      return;
    }

    const visitor = visitorState.visitor;
    if (!visitorState.isSuccess || !visitor) {
      return;
    }

    const currentEmailAddress = lookupEmailAddress.current.toLowerCase();
    const visitorEmailAddress = visitor.emailAddress?.trim().toLowerCase();
    if (!visitorEmailAddress || visitorEmailAddress !== currentEmailAddress) {
      return;
    }

    setFormData((current) => ({
      ...current,
      visitor,
    }));
  }, [completedLookupRequest, visitorState.isSuccess, visitorState.visitor]);

  const validate = (): boolean => {
    const nextErrors: CheckInFormErrors = toErrorDefaults(defaultFormValues);

    if (!formData?.visitor?.name?.trim()) {
      nextErrors.visitor.name = "Name is required.";
    }

    if (!formData?.visitor?.surname?.trim()) {
      nextErrors.visitor.surname = "Surname is required.";
    }

    if (!formData?.visitor?.contactNumber?.trim()) {
      nextErrors.visitor.contactNumber = "Contact number is required.";
    } else if (
      !/^[+0-9 ()-]{7,20}$/.test(formData.visitor.contactNumber.trim())
    ) {
      nextErrors.visitor.contactNumber = "Enter a valid contact number.";
    }

    if (!formData?.visitor?.emailAddress?.trim()) {
      nextErrors.visitor.emailAddress = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.visitor.emailAddress.trim())
    ) {
      nextErrors.visitor.emailAddress = "Enter a valid email address.";
    }

    if (!formData?.visitor?.dateOfBirth) {
      nextErrors.visitor.dateOfBirth = "Date of birth is required.";
    }

    if (formData.visitor.sex === undefined || formData.visitor.sex === null) {
      nextErrors.visitor.sex = "Please select an option.";
    }

    if (
      formData.visitor.residence === undefined ||
      formData.visitor.residence === null
    ) {
      nextErrors.visitor.residence = "Please select an option.";
    }

    if (
      formData.visitor.wardNumber === undefined ||
      formData.visitor.wardNumber === null
    ) {
      nextErrors.visitor.wardNumber = "Ward number is required.";
    } else if (
      !Number.isInteger(formData.visitor.wardNumber) ||
      formData.visitor.wardNumber < 0 ||
      formData.visitor.wardNumber > 9999
    ) {
      nextErrors.visitor.wardNumber = "Ward number must be a number.";
    }

    if (
      formData.visitor.sexuality === undefined ||
      formData.visitor.sexuality === null
    ) {
      nextErrors.visitor.sexuality = "Please select an option.";
    }

    nextErrors.visitor.visitorAddress ??= {};

    if (!formData.visitor.visitorAddress?.street?.trim()) {
      nextErrors.visitor.visitorAddress.street = "Street is required.";
    }

    if (!formData.visitor.visitorAddress?.suburb?.trim()) {
      nextErrors.visitor.visitorAddress.suburb = "Suburb is required.";
    }

    if (!formData.visitor.visitorAddress?.city?.trim()) {
      nextErrors.visitor.visitorAddress.city = "City or town is required.";
    }

    if (!formData.visitor.visitorAddress?.postalCode?.trim()) {
      nextErrors.visitor.visitorAddress.postalCode = "Postal code is required.";
    }

    if (!formData.visitReason) {
      nextErrors.visitReason = "Please select a reason.";
    }

    if (formData.visitReason === 4 && !formData.otherReason?.trim()) {
      nextErrors.otherReason = "Please tell us the reason for your visit.";
    }

    setErrors(nextErrors);

    const hasErrors = (value: unknown): boolean => {
      if (typeof value === "string") {
        return value.length > 0;
      }

      if (value && typeof value === "object") {
        return Object.values(value).some(hasErrors);
      }

      return Boolean(value);
    };

    return !hasErrors(nextErrors);
  };

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const payload: ICreateVisitDto = {
        visitReason: formData.visitReason,

        ...(formData.visitReason === 4
          ? {
              otherReason: formData.otherReason?.trim(),
            }
          : {}),

        visitor: {
          id: formData.visitor.id,
          name: formData.visitor.name?.trim(),
          surname: formData.visitor.surname?.trim(),
          contactNumber: formData.visitor.contactNumber?.trim(),
          emailAddress: formData.visitor.emailAddress?.trim(),
          dateOfBirth: formData.visitor.dateOfBirth,
          sex: formData.visitor.sex,
          residence: formData.visitor.residence,
          wardNumber: formData.visitor.wardNumber,
          sexuality: formData.visitor.sexuality,
          isDisabled: formData.visitor.isDisabled,
          isCsg: formData.visitor.isCsg,
          visitorAddress: {
            street: formData.visitor.visitorAddress?.street?.trim(),
            suburb: formData.visitor.visitorAddress?.suburb?.trim(),
            city: formData.visitor.visitorAddress?.city?.trim(),
            postalCode: formData.visitor.visitorAddress?.postalCode?.trim(),
            province: formData.visitor.visitorAddress?.province?.trim(),
            country: "South Africa",
          },
        },
      };

      await checkInVisitor(payload);
      setFormError("");
    } catch (cause) {
      setFormError(
        cause instanceof Error
          ? cause.message
          : "We could not complete your check-in. Please try again.",
      );
    }
  };

  if (!open) {
    return null;
  }

  if (visitState.isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6">
        <SuccessBanner/>
      </div>
    );
  }

  return (
    <dialog
      open
      className="m-0 h-dvh w-dvw max-w-none border-0 bg-black/80 p-3 backdrop-blur-md sm:p-6"
      aria-labelledby="check-in-form-title"
    >
      <section
        id="check-in-form"
        className="relative mx-auto flex h-[calc(100dvh-1.5rem)] w-full max-w-xl flex-col overflow-hidden rounded-lg border border-border bg-background shadow-lg sm:h-[calc(100dvh-3rem)]"
      >
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex h-full w-full flex-col"
        >
          <div className="border-b border-border bg-background px-5 py-4 sm:px-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl">
                  <span id="check-in-form-title">Visitor Check-In</span>
                </h2>

                <p className="mt-1 max-w-lg font-body text-xs text-muted-foreground sm:text-sm">
                  Fields marked with * are required. This takes about a minute.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span className="material-symbols-outlined hidden text-2xl text-muted-foreground sm:block">
                  how_to_reg
                </span>
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={pending}
                  aria-label="Close check-in form"
                  className="grid size-9 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span
                    className="material-symbols-outlined"
                    aria-hidden="true"
                  >
                    close
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 space-y-7 overflow-y-auto bg-background px-5 py-5 sm:px-6">
            {formError && (
              <p
                id="check-in-form-error"
                role="alert"
                className="rounded-md border border-destructive/30 bg-destructive/10 p-3 font-body text-sm text-destructive"
              >
                {formError}
              </p>
            )}

            {visitorState.isPending && <Loading3QuartersOutlined />}

            <section className="space-y-4">
              <h3 className="font-label text-sm font-semibold tracking-tight text-foreground">
                Your Details
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="check-in-name"
                    className="mb-2 block font-label text-label-md uppercase text-on-surface"
                  >
                    Name *
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                      person
                    </span>

                    <input
                      id="check-in-name"
                      name="name"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.visitor.name}
                      onChange={(event) => {
                        setFormData((current) => ({
                          ...current,
                          visitor: {
                            ...current.visitor,
                            name: event.target.value,
                          },
                        }));
                        setFormError("");

                        if (errors.visitor?.name) {
                          setErrors((current) => ({
                            ...current,
                            visitor: { ...current.visitor, name: "" },
                          }));
                        }
                      }}
                      autoComplete="given-name"
                      disabled={visitorFieldsDisabled}
                      aria-invalid={Boolean(errors.visitor?.name)}
                      aria-describedby={
                        errors.visitor?.name ? "check-in-name-error" : undefined
                      }
                      className={`h-14 w-full rounded-none border-2 bg-surface-container-lowest px-4 pl-12 font-body text-body-md text-on-surface shadow-none outline-none transition-colors placeholder:text-muted-foreground hover:border-outline-variant focus:border-primary-container disabled:cursor-not-allowed disabled:opacity-60 ${
                        errors.visitor?.name
                          ? "border-error"
                          : "border-outline-variant"
                      }`}
                    />
                  </div>

                  {errors.visitor?.name && (
                    <p
                      id="check-in-name-error"
                      className="mt-2 font-body text-body-sm text-error"
                    >
                      {errors.visitor.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="check-in-surname"
                    className="mb-2 block font-label text-label-md uppercase text-on-surface"
                  >
                    Surname *
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                      badge
                    </span>

                    <input
                      id="check-in-surname"
                      name="surname"
                      type="text"
                      placeholder="Enter your surname"
                      value={formData.visitor.surname}
                      onChange={(event) => {
                        setFormData((current) => ({
                          ...current,
                          visitor: {
                            ...current.visitor,
                            surname: event.target.value,
                          },
                        }));
                        setFormError("");

                        if (errors.visitor?.surname) {
                          setErrors((current) => ({
                            ...current,
                            visitor: { ...current.visitor, surname: "" },
                          }));
                        }
                      }}
                      autoComplete="family-name"
                      disabled={visitorFieldsDisabled}
                      aria-invalid={Boolean(errors.visitor.surname)}
                      aria-describedby={
                        errors.visitor.surname
                          ? "check-in-surname-error"
                          : undefined
                      }
                      className={`h-14 w-full rounded-none border-2 bg-surface-container-lowest px-4 pl-12 font-body text-body-md text-on-surface shadow-none outline-none transition-colors placeholder:text-muted-foreground hover:border-outline-variant focus:border-primary-container disabled:cursor-not-allowed disabled:opacity-60 ${
                        errors.visitor.surname
                          ? "border-error"
                          : "border-outline-variant"
                      }`}
                    />
                  </div>

                  {errors.visitor.surname && (
                    <p
                      id="check-in-surname-error"
                      className="mt-2 font-body text-body-sm text-error"
                    >
                      {errors.visitor.surname}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="check-in-contactNumber"
                    className="mb-2 block font-label text-label-md uppercase text-on-surface"
                  >
                    Contact Number *
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                      call
                    </span>

                    <input
                      id="check-in-contactNumber"
                      name="contactNumber"
                      type="tel"
                      inputMode="tel"
                      value={formData.visitor.contactNumber}
                      onChange={(event) => {
                        setFormData((current) => ({
                          ...current,
                          visitor: {
                            ...current.visitor,
                            contactNumber: event.target.value,
                          },
                        }));
                        setFormError("");

                        if (errors.visitor?.contactNumber) {
                          setErrors((current) => ({
                            ...current,
                            visitor: { ...current.visitor, contactNumber: "" },
                          }));
                        }
                      }}
                      autoComplete="tel"
                      placeholder="+27 11 000 0000"
                      disabled={visitorFieldsDisabled}
                      aria-invalid={Boolean(errors.visitor?.contactNumber)}
                      aria-describedby={
                        errors.visitor?.contactNumber
                          ? "check-in-contactNumber-error"
                          : undefined
                      }
                      className={`h-14 w-full rounded-none border-2 bg-surface-container-lowest px-4 pl-12 font-body text-body-md text-on-surface shadow-none outline-none transition-colors placeholder:text-muted-foreground hover:border-outline-variant focus:border-primary-container disabled:cursor-not-allowed disabled:opacity-60 ${
                        errors.visitor?.contactNumber
                          ? "border-error"
                          : "border-outline-variant"
                      }`}
                    />
                  </div>

                  {errors.visitor?.contactNumber && (
                    <p
                      id="check-in-contactNumber-error"
                      className="mt-2 font-body text-body-sm text-error"
                    >
                      {errors.visitor.contactNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="check-in-emailAddress"
                    className="mb-2 block font-label text-label-md uppercase text-on-surface"
                  >
                    Email Address *
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                      mail
                    </span>

                    <input
                      id="check-in-emailAddress"
                      name="emailAddress"
                      type="email"
                      inputMode="email"
                      placeholder="you@example.com"
                      value={formData.visitor.emailAddress}
                      onChange={(event) => {
                        setFormData((current) => ({
                          ...current,
                          visitor: {
                            ...current.visitor,
                            emailAddress: event.target.value,
                          },
                        }));
                        lookupRequest.current += 1;
                        setFormError("");

                        if (errors.visitor?.emailAddress) {
                          setErrors((current) => ({
                            ...current,
                            visitor: { ...current.visitor, emailAddress: "" },
                          }));
                        }
                      }}
                      autoComplete="email"
                      onBlur={handleEmailBlur}
                      disabled={visitorFieldsDisabled}
                      aria-invalid={Boolean(errors.visitor?.emailAddress)}
                      aria-describedby={
                        errors.visitor?.emailAddress
                          ? "check-in-emailAddress-error"
                          : undefined
                      }
                      className={`h-14 w-full rounded-none border-2 bg-surface-container-lowest px-4 pl-12 font-body text-body-md text-on-surface shadow-none outline-none transition-colors placeholder:text-muted-foreground hover:border-outline-variant focus:border-primary-container disabled:cursor-not-allowed disabled:opacity-60 ${
                        errors.visitor?.emailAddress
                          ? "border-error"
                          : "border-outline-variant"
                      }`}
                    />
                  </div>

                  {errors.visitor?.emailAddress && (
                    <p
                      id="check-in-emailAddress-error"
                      className="mt-2 font-body text-body-sm text-error"
                    >
                      {errors.visitor.emailAddress}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="check-in-dateOfBirth"
                    className="mb-2 block font-label text-label-md uppercase text-on-surface"
                  >
                    Date of Birth *
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                      calendar_month
                    </span>

                    <input
                      id="check-in-dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      placeholder="Select your date of birth"
                      max="2026-12-31"
                      value={formData.visitor.dateOfBirth}
                      onChange={(event) => {
                        setFormData((current) => ({
                          ...current,
                          visitor: {
                            ...current.visitor,
                            dateOfBirth: event.target.value,
                          },
                        }));
                        setFormError("");

                        if (errors.visitor?.dateOfBirth) {
                          setErrors((current) => ({
                            ...current,
                            visitor: { ...current.visitor, dateOfBirth: "" },
                          }));
                        }
                      }}
                      disabled={visitorFieldsDisabled}
                      aria-invalid={Boolean(errors.visitor?.dateOfBirth)}
                      aria-describedby={
                        errors.visitor?.dateOfBirth
                          ? "check-in-dateOfBirth-error"
                          : undefined
                      }
                      className={`h-14 w-full rounded-none border-2 bg-surface-container-lowest px-4 pl-12 font-body text-body-md text-on-surface shadow-none outline-none transition-colors placeholder:text-muted-foreground hover:border-outline-variant focus:border-primary-container disabled:cursor-not-allowed disabled:opacity-60 ${
                        errors.visitor?.dateOfBirth
                          ? "border-error"
                          : "border-outline-variant"
                      }`}
                    />
                  </div>

                  {errors.visitor?.dateOfBirth && (
                    <p
                      id="check-in-dateOfBirth-error"
                      className="mt-2 font-body text-body-sm text-error"
                    >
                      {errors.visitor.dateOfBirth}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="check-in-sex"
                    className="mb-2 block font-label text-label-md uppercase text-on-surface"
                  >
                    Sex *
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-on-surface-variant">
                      person
                    </span>

                    <select
                      id="check-in-sex"
                      name="sex"
                      value={formData.visitor.sex ?? ""}
                      onChange={(event) => {
                        setFormData((current) => ({
                          ...current,
                          visitor: {
                            ...current.visitor,
                            sex: event.target.value
                              ? Number(event.target.value)
                              : undefined,
                          },
                        }));
                        setFormError("");

                        if (errors.visitor?.sex) {
                          setErrors((current) => ({
                            ...current,
                            visitor: { ...current.visitor, sex: undefined },
                          }));
                        }
                      }}
                      disabled={visitorFieldsDisabled}
                      aria-invalid={Boolean(errors.visitor?.sex)}
                      className={`h-14 w-full appearance-none rounded-none border-2 bg-surface-container-lowest px-4 pl-12 pr-10 font-body text-body-md text-on-surface outline-none transition-colors hover:border-outline-variant focus:border-primary-container disabled:cursor-not-allowed disabled:opacity-60 ${
                        errors.visitor?.sex
                          ? "border-error"
                          : "border-outline-variant"
                      }`}
                    >
                      <option value="">Select your sex</option>

                      {Object.values(SexType).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                      expand_more
                    </span>
                  </div>

                  {errors.visitor?.sex && (
                    <p className="mt-2 font-body text-body-sm text-error">
                      {errors.visitor.sex}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="check-in-residence"
                    className="mb-2 block font-label text-label-md uppercase text-on-surface"
                  >
                    Residence *
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-on-surface-variant">
                      home
                    </span>

                    <select
                      id="check-in-residence"
                      name="residence"
                      value={formData.visitor.residence ?? ""}
                      onChange={(event) => {
                        setFormData((current) => ({
                          ...current,
                          visitor: {
                            ...current.visitor,
                            residence: event.target.value
                              ? Number(event.target.value)
                              : undefined,
                          },
                        }));
                        setFormError("");

                        if (errors.visitor?.residence) {
                          setErrors((current) => ({
                            ...current,
                            visitor: {
                              ...current.visitor,
                              residence: undefined,
                            },
                          }));
                        }
                      }}
                      disabled={visitorFieldsDisabled}
                      aria-invalid={Boolean(errors.visitor?.residence)}
                      className={`h-14 w-full appearance-none rounded-none border-2 bg-surface-container-lowest px-4 pl-12 pr-10 font-body text-body-md text-on-surface outline-none transition-colors hover:border-outline-variant focus:border-primary-container disabled:cursor-not-allowed disabled:opacity-60 ${
                        errors.visitor?.residence
                          ? "border-error"
                          : "border-outline-variant"
                      }`}
                    >
                      <option value="">Select your residence</option>

                      {Object.values(ResidenceType).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                      expand_more
                    </span>
                  </div>

                  {errors.visitor?.residence && (
                    <p className="mt-2 font-body text-body-sm text-error">
                      {errors.visitor.residence}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="check-in-wardNumber"
                    className="mb-2 block font-label text-label-md uppercase text-on-surface"
                  >
                    Ward Number *
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                      pin
                    </span>

                    <input
                      id="check-in-wardNumber"
                      name="wardNumber"
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter ward number"
                      value={formData.visitor.wardNumber ?? ""}
                      onChange={(event) => {
                        setFormData((current) => ({
                          ...current,
                          visitor: {
                            ...current.visitor,
                            wardNumber: event.target.value
                              ? Number(event.target.value)
                              : undefined,
                          },
                        }));
                        setFormError("");

                        if (errors.visitor?.wardNumber) {
                          setErrors((current) => ({
                            ...current,
                            visitor: {
                              ...current.visitor,
                              wardNumber: undefined,
                            },
                          }));
                        }
                      }}
                      disabled={visitorFieldsDisabled}
                      aria-invalid={Boolean(errors.visitor?.wardNumber)}
                      className={`h-14 w-full rounded-none border-2 bg-surface-container-lowest px-4 pl-12 font-body text-body-md text-on-surface shadow-none outline-none transition-colors placeholder:text-muted-foreground hover:border-outline-variant focus:border-primary-container disabled:cursor-not-allowed disabled:opacity-60 ${
                        errors.visitor?.wardNumber
                          ? "border-error"
                          : "border-outline-variant"
                      }`}
                    />
                  </div>

                  {errors.visitor?.wardNumber && (
                    <p className="mt-2 font-body text-body-sm text-error">
                      {errors.visitor.wardNumber}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="check-in-sexuality"
                    className="mb-2 block font-label text-label-md uppercase text-on-surface"
                  >
                    Sexuality *
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-on-surface-variant">
                      diversity_1
                    </span>

                    <select
                      id="check-in-sexuality"
                      name="sexuality"
                      value={formData.visitor.sexuality ?? ""}
                      onChange={(event) => {
                        setFormData((current) => ({
                          ...current,
                          visitor: {
                            ...current.visitor,
                            sexuality: event.target.value
                              ? Number(event.target.value)
                              : undefined,
                          },
                        }));
                        setFormError("");
                      }}
                      disabled={visitorFieldsDisabled}
                      aria-invalid={Boolean(errors.visitor?.sexuality)}
                      className="h-14 w-full appearance-none rounded-none border-2 border-outline-variant bg-surface-container-lowest px-4 pl-12 pr-10 font-body text-body-md text-on-surface outline-none transition-colors hover:border-outline-variant focus:border-primary-container disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <option value="">Select sexuality</option>

                      {Object.values(SexualityType).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                      expand_more
                    </span>
                  </div>

                  {errors.visitor?.sexuality && (
                    <p className="mt-2 font-body text-body-sm text-error">
                      {errors.visitor.sexuality}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="font-label text-sm font-semibold tracking-tight text-foreground">
                Address
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="check-in-street"
                    className="mb-2 block font-label text-label-md uppercase text-on-surface"
                  >
                    Street *
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                      home
                    </span>

                    <input
                      id="check-in-street"
                      name="street"
                      type="text"
                      placeholder="Enter street address"
                      value={formData.visitor.visitorAddress?.street ?? ""}
                      onChange={(event) => {
                        setFormData((current) => ({
                          ...current,
                          visitor: {
                            ...current.visitor,
                            visitorAddress: {
                              ...current.visitor.visitorAddress,
                              street: event.target.value,
                            },
                          },
                        }));
                        setFormError("");
                      }}
                      autoComplete="address-line1"
                      disabled={visitorFieldsDisabled}
                      aria-invalid={Boolean(
                        errors.visitor?.visitorAddress?.street,
                      )}
                      className="h-14 w-full rounded-none border-2 border-outline-variant bg-surface-container-lowest px-4 pl-12 font-body text-body-md text-on-surface outline-none transition-colors placeholder:text-muted-foreground hover:border-outline-variant focus:border-primary-container disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>

                  {errors.visitor?.visitorAddress?.street && (
                    <p className="mt-2 font-body text-body-sm text-error">
                      {errors.visitor.visitorAddress.street}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="check-in-suburb"
                    className="mb-2 block font-label text-label-md uppercase text-on-surface"
                  >
                    Suburb *
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                      location_city
                    </span>

                    <input
                      id="check-in-suburb"
                      name="suburb"
                      type="text"
                      placeholder="Enter suburb"
                      value={formData.visitor.visitorAddress?.suburb ?? ""}
                      onChange={(event) => {
                        setFormData((current) => ({
                          ...current,
                          visitor: {
                            ...current.visitor,
                            visitorAddress: {
                              ...current.visitor.visitorAddress,
                              suburb: event.target.value,
                            },
                          },
                        }));
                        setFormError("");
                      }}
                      disabled={visitorFieldsDisabled}
                      aria-invalid={Boolean(
                        errors.visitor?.visitorAddress?.suburb,
                      )}
                      className="h-14 w-full rounded-none border-2 border-outline-variant bg-surface-container-lowest px-4 pl-12 font-body text-body-md text-on-surface outline-none transition-colors placeholder:text-muted-foreground hover:border-outline-variant focus:border-primary-container disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>

                  {errors.visitor?.visitorAddress?.suburb && (
                    <p className="mt-2 font-body text-body-sm text-error">
                      {errors.visitor.visitorAddress.suburb}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="check-in-city"
                    className="mb-2 block font-label text-label-md uppercase text-on-surface"
                  >
                    City / Town *
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                      location_city
                    </span>

                    <input
                      id="check-in-city"
                      name="city"
                      type="text"
                      placeholder="Enter city or town"
                      value={formData.visitor.visitorAddress?.city ?? ""}
                      onChange={(event) => {
                        setFormData((current) => ({
                          ...current,
                          visitor: {
                            ...current.visitor,
                            visitorAddress: {
                              ...current.visitor.visitorAddress,
                              city: event.target.value,
                            },
                          },
                        }));
                        setFormError("");
                      }}
                      autoComplete="address-level2"
                      disabled={visitorFieldsDisabled}
                      aria-invalid={Boolean(
                        errors.visitor?.visitorAddress?.city,
                      )}
                      className="h-14 w-full rounded-none border-2 border-outline-variant bg-surface-container-lowest px-4 pl-12 font-body text-body-md text-on-surface outline-none transition-colors placeholder:text-muted-foreground hover:border-outline-variant focus:border-primary-container disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>

                  {errors.visitor?.visitorAddress?.city && (
                    <p className="mt-2 font-body text-body-sm text-error">
                      {errors.visitor.visitorAddress.city}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="check-in-postalCode"
                    className="mb-2 block font-label text-label-md uppercase text-on-surface"
                  >
                    Postal Code *
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                      markunread_mailbox
                    </span>

                    <input
                      id="check-in-postalCode"
                      name="postalCode"
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter postal code"
                      value={formData.visitor.visitorAddress?.postalCode ?? ""}
                      onChange={(event) => {
                        setFormData((current) => ({
                          ...current,
                          visitor: {
                            ...current.visitor,
                            visitorAddress: {
                              ...current.visitor.visitorAddress,
                              postalCode: event.target.value,
                            },
                          },
                        }));
                        setFormError("");
                      }}
                      disabled={visitorFieldsDisabled}
                      aria-invalid={Boolean(
                        errors.visitor?.visitorAddress?.postalCode,
                      )}
                      className="h-14 w-full rounded-none border-2 border-outline-variant bg-surface-container-lowest px-4 pl-12 font-body text-body-md text-on-surface outline-none transition-colors placeholder:text-muted-foreground hover:border-outline-variant focus:border-primary-container disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>

                  {errors.visitor?.visitorAddress?.postalCode && (
                    <p className="mt-2 font-body text-body-sm text-error">
                      {errors.visitor.visitorAddress.postalCode}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="font-label text-sm font-semibold tracking-tight text-foreground">
                Your Visit
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="check-in-visitReason"
                    className="mb-2 block font-label text-label-md uppercase text-on-surface"
                  >
                    Reason for Visit *
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-on-surface-variant">
                      event_note
                    </span>

                    <select
                      id="check-in-visitReason"
                      name="visitReason"
                      value={formData.visitReason ?? ""}
                      onChange={(event) => {
                        setFormData((current) => ({
                          ...current,
                          visitReason: event.target.value
                            ? Number(event.target.value)
                            : undefined,
                          otherReason:
                            event.target.value === "4"
                              ? current.otherReason
                              : undefined,
                        }));
                        setFormError("");

                        if (errors.visitReason) {
                          setErrors((current) => ({
                            ...current,
                            visitReason: "",
                          }));
                        }

                        if (errors.otherReason) {
                          setErrors((current) => ({
                            ...current,
                            otherReason: "",
                          }));
                        }
                      }}
                      disabled={pending}
                      aria-invalid={Boolean(errors.visitReason)}
                      className={`h-14 w-full appearance-none rounded-none border-2 bg-surface-container-lowest px-4 pl-12 pr-10 font-body text-body-md text-on-surface outline-none transition-colors hover:border-outline-variant focus:border-primary-container disabled:cursor-not-allowed disabled:opacity-60 ${
                        errors.visitReason
                          ? "border-error"
                          : "border-outline-variant"
                      }`}
                    >
                      <option value="">Select a reason</option>

                      {Object.values(VisitReason).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                      expand_more
                    </span>
                  </div>

                  {errors.visitReason && (
                    <p className="mt-2 font-body text-body-sm text-error">
                      {errors.visitReason}
                    </p>
                  )}
                </div>

                {formData.visitReason === 4 && (
                  <div>
                    <label
                      htmlFor="check-in-otherReason"
                      className="mb-2 block font-label text-label-md uppercase text-on-surface"
                    >
                      Please Specify *
                    </label>

                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                        edit_note
                      </span>

                      <input
                        id="check-in-otherReason"
                        name="otherReason"
                        type="text"
                        placeholder="Tell us more"
                        value={formData.otherReason ?? ""}
                        onChange={(event) => {
                          setFormData((current) => ({
                            ...current,
                            otherReason: event.target.value,
                          }));
                          setFormError("");

                          if (errors.otherReason) {
                            setErrors((current) => ({
                              ...current,
                              otherReason: "",
                            }));
                          }
                        }}
                        disabled={pending}
                        aria-invalid={Boolean(errors.otherReason)}
                        className={`h-14 w-full rounded-none border-2 bg-surface-container-lowest px-4 pl-12 font-body text-body-md text-on-surface outline-none transition-colors placeholder:text-muted-foreground hover:border-outline-variant focus:border-primary-container disabled:cursor-not-allowed disabled:opacity-60 ${
                          errors.otherReason
                            ? "border-error"
                            : "border-outline-variant"
                        }`}
                      />
                    </div>

                    {errors.otherReason && (
                      <p className="mt-2 font-body text-body-sm text-error">
                        {errors.otherReason}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="grid gap-3 border-2 border-outline-variant bg-surface-container-lowest p-4 sm:grid-cols-2">
                <button
                  type="button"
                  disabled={visitorFieldsDisabled}
                  aria-pressed={formData.visitor.isDisabled}
                  onClick={() =>
                    setFormData((current) => ({
                      ...current,
                      visitor: {
                        ...current.visitor,
                        isDisabled: !current.visitor.isDisabled,
                      },
                    }))
                  }
                  className={`flex min-h-14 items-center gap-3 rounded-none border-2 px-4 text-left font-label text-label-md transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                    formData.visitor.isDisabled
                      ? "border-primary-container bg-primary-container text-on-primary-container"
                      : "border-outline-variant bg-surface-container-lowest text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {formData.visitor.isDisabled
                      ? "check_box"
                      : "check_box_outline_blank"}
                  </span>

                  <span>I am a person living with a disability</span>
                </button>

                <button
                  type="button"
                  disabled={visitorFieldsDisabled}
                  aria-pressed={formData.visitor.isCsg}
                  onClick={() =>
                    setFormData((current) => ({
                      ...current,
                      visitor: {
                        ...current.visitor,
                        isCsg: !current.visitor.isCsg,
                      },
                    }))
                  }
                  className={`flex min-h-14 items-center gap-3 rounded-none border-2 px-4 text-left font-label text-label-md transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                    formData.visitor.isCsg
                      ? "border-primary-container bg-primary-container text-on-primary-container"
                      : "border-outline-variant bg-surface-container-lowest text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {formData.visitor.isCsg
                      ? "check_box"
                      : "check_box_outline_blank"}
                  </span>

                  <span>I receive a Child Support Grant</span>
                </button>
              </div>
            </section>
          </div>

          <div className="flex justify-end gap-3 border-t border-border bg-background px-5 py-3 sm:px-6">
            <button
              type="button"
              onClick={closeForm}
              disabled={visitorState.isPending}
              className="rounded-md border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={pending}
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <Loading3QuartersOutlined spin />
              ) : (
                "Complete Check-In"
              )}
            </button>
          </div>
        </form>
      </section>
    </dialog>
  );
};

export default CheckInForm;