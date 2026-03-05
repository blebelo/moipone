import { IStudent } from "@/src/providers/student-provider/context";
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


export const renameFile = (userFile: File, baseName: string): string => {
  const cleanBase = baseName.replace(/\.[^/.]+$/, "");

  const match = userFile.name.match(/\.[^/.]+$/);
  const extension = match ? match[0].toLowerCase() : "";

  return `${cleanBase}${extension}`;
};

export const handleUpload = async (
  file: File,
  studentId: string,
  filename: string
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

  } catch (error) {
    console.error('File Upload Failed', error);
    message.error("Upload failed");
    throw new Error('File Upload Failed')
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
  const digits = value.replace(/\D/g, "").slice(0, 13);
  if (digits.length === 13) {
    return `${digits.slice(0, 6)} ${digits.slice(6, 10)} ${digits.slice(10, 12)} ${digits.slice(12)}`;
  }
  return [digits.slice(0, 6), digits.slice(6, 10), digits.slice(10, 12), digits.slice(12)]
    .filter(Boolean)
    .join(" ");
};

export const parseDateOfBirth = (dob: string): dayjs.Dayjs => dayjs(dob, "YYYY-MM-DD");

export const sanitizeStudentData = (student?: IStudent): IStudent => {
    if (!student) return {} as IStudent;
    delete student.id;
    delete student.proofOfResidence;
    delete student.certifiedHighestQualification;
    delete student.certifiedId;
    delete student.curriculumVitae;
    delete student.residentialAddress?.id
    student.idNumber = student.idNumber?.replace(/\s+/g, "");
    student.dateOfBirth = dayjs(student.dateOfBirth).format('YYYY-MM-DD');
    student.age = calculateAge(student.dateOfBirth)

    return student;
}