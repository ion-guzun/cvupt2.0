import { z } from "zod"
const today = new Date();
const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

export const courseFormSchema = z.object({
    name: z.string().min(2, {message: "Course name must be at least 2 characters."}),
    forFaculty: z.string().min(2, {message: 'you need to choose a faculty'}),
    forMajor: z.string().min(2, {message: 'you need to choose a speciality'}),
    forYear: z.string().min(1, {message: 'you need to choose the year'}),
    forSemester: z.string().min(1, {message: 'you need to choose the semester'}),
    imageUrl: z.string().url({ message: 'Invalid URL' }).optional().or(z.literal('')),
    pdfUrls: z.string().url().array(),
    startDate: z.date().min(currentDate),
    endDate: z.date().min(currentDate)
})

export const initialValues = {
    name: '',
    forFaculty: '',
    forMajor: '',
    forYear: '',
    forSemester: '',
    imageUrl: '',
    pdfUrls: [],
    startDate: new Date(),
    endDate: new Date()
}

export const labFormSchema = z.object({
    name: z.string().min(2, {
      message: "name of the lab must be at least 2 characters.",
    }),
    labPdfUrls: z.string().url().array()
})

export const labInitialValues = {
    name: '',
    labPdfUrls: []
}

export const assignmentFormSchema = z.object({
    title: z.string().min(2, {message: 'assigment title must be at least 2 characters'})
                     .max(15, {message: 'assigment title must be at max 15 characters'}),
    description: z.string().min(2, {message: 'assigment title must be at least 2 characters'})
                     .max(400, {message: 'assigment title must be at max 400 characters'}),
    deadline: z.date().min(currentDate),
    maxGrade: z.string()
})

export const assignmentInitialValues = {
    title: '',
    description: '',
    deadline: new Date(),
    maxGrade: '',
}


