import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ILab } from "./database/models/lab.model"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)
export const formatDate = (dateInput?: Date | string): string => {
  if (!dateInput) {
      return 'Date not provided';
  }

  // Ensure the date is a Date object, even if an ISO string is passed
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
      return 'Invalid date';
  }

  return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
  }).format(date);
}


