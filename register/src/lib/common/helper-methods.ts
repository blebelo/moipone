import { StateMap, Stringify } from "./constants";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export const mergePayloadHandler = (
  state: StateMap,
  action: { payload: StateMap },
) => ({
  ...state,
  ...action.payload,
});

export const mergeClasses = (...inputs: ClassValue[]) =>
  twMerge(clsx(inputs));

export const formatRegisterDate = (value?: string | null) => {
  const date = value ? new Date(`${value.slice(0, 10)}T00:00:00`) : new Date();
  const validDate = Number.isNaN(date.getTime()) ? new Date() : date;
  return validDate.toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatTime = (
  value?: string | null,
  locales: string | string[] = "en-ZA",
) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleTimeString(locales, { hour: "2-digit", minute: "2-digit" });
};

export const formatDate = (value?: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
};

export const labelFor = (
  values: Record<string, { value: number; label: string }>,
  value?: number,
) => value == null
  ? null
  : Object.values(values).find((option) => option.value === value)?.label ?? "Unknown";

export const toErrorDefaults = <T>(value: T): Stringify<T> => {
  if (typeof value !== "object" || value === null) {
    return "" as Stringify<T>;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, value]) => [
      key,
      toErrorDefaults(value),
    ]),
  ) as Stringify<T>;
};

export const getErrorMessage = (
  error: unknown,
  fallback = "An unexpected error occurred.",
): string => {
  if (axios.isAxiosError(error)) {
    const payload = error.response?.data;
    const backendError = payload?.error ?? payload;
    return backendError?.message ?? backendError?.details ?? fallback;
  }

  return error instanceof Error && error.message ? error.message : fallback;
};

export const formatCheckInTime = (date?: string): string => {
  if (!date) return "Checked in";
  const time = formatTime(date, []);
  return time === "—" ? "Checked in" : `Checked in ${time}`;
};