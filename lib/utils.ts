import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ILab } from "./database/models/lab.model"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)



