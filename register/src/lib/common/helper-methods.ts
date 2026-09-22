import { StateMap, Stringify } from "./constants";
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

export const getTodaysDate = () => {
  return new Date().toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

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
  return error instanceof Error && error.message ? error.message : fallback;
};