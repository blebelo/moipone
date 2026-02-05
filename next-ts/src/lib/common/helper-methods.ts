import { MAX_SIZE, StateMap } from "./constants";
import { getPresignedPost } from "./server-actions";
import { message, Upload } from "antd";

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