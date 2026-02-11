import { MAX_SIZE, StateMap } from "./constants";
import { getPresignedPost } from "./server-actions";
import { message, Upload } from "antd";
import dayjs from "dayjs";

export const mergePayloadHandler = (
  state: StateMap,
  action: { payload: StateMap },
) => ({
  ...state,
  ...action.payload,
});

export const scrolltoSection = (sectionId: string) => {
  if (sectionId === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};

export const uploadFile = async (
  file: File,
  studentId: string,
  filename: string,
) => {
  const { url, fields } = await getPresignedPost(studentId, filename);

  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
  formData.append("file", file);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    console.error(`S3 upload failed: ${response.statusText}`);
    throw new Error(`S3 upload failed: ${response.status}`);
  }
};

export const renameFile = (userFile: File, baseName: string): string => {
  const extension = userFile.name.split(".").pop()?.toLowerCase() || "";
  return extension ? `${baseName}.${extension}` : baseName;
};

export const handleUpload = async (
  file: File,
  studentId: string,
  filename: string,
  label: string,
) => {
  if (file.size > MAX_SIZE) {
    message.error("File must be 5MB or smaller");
    return Upload.LIST_IGNORE;
  }
  filename = renameFile(file, filename);

  try {
    const { url, fields } = await getPresignedPost(studentId, filename);

    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) =>
      formData.append(key, value),
    );
    formData.append("file", file);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    message.success(`${capitalizeWords(label)} uploaded successfully`);
  } catch (error) {
    console.error(error);
    message.error("Upload failed");
  }
};

export const capitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const calculateAge = (dateOfBirth: string | Date): number => {
  const today = dayjs();
  const dob = dayjs(dateOfBirth);

  let age = today.year() - dob.year();

  if (
    today.month() < dob.month() ||
    (today.month() === dob.month() && today.date() < dob.date())
  ) {
    age--;
  }

  return age;
};


export const formatPhoneNumber = (number: string): string => {
  const digits = number.replace(/\D/g, '');
  if (digits.length === 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }
  return digits.match(/.{1,3}/g)?.join(' ') ?? number;
};

export const formatSaIdNumber = (value: string): string => {
  if (!value) return "";

  const digits = value.replace(/\D/g, "").slice(0, 13);

  const part1 = digits.slice(0, 6);
  const part2 = digits.slice(6, 10);
  const part3 = digits.slice(10, 12);
  const part4 = digits.slice(12, 13);

  return [part1, part2, part3, part4]
    .filter(Boolean)
    .join(" ");
};
