import { z } from "zod"
export const courseFormSchema = z.object({
    name: z.string().min(2, {message: "Course name must be at least 2 characters."}),
    forFaculty: z.string().min(2, {message: 'you need to choose a faculty'}),
    forMajor: z.string().min(2, {message: 'you need to choose a speciality'}),
    forYear: z.string().min(1, {message: 'you need to choose the year'}),
    forSemester: z.string().min(1, {message: 'you need to choose the year'}),
    // imageUrl: z.string().url(),
    // pdfUrls: z.string().url().array(),
    // startDate: z.date(),
    // endDate: z.date()
})

export const initialValues = {
    name: '',
    forFaculty: '',
    forMajor: '',
    forYear: '',
    forSemester: '',
    // imageUrl: '',
    // pdfUrls: [],
    // startDate: new Date(),
    // endDate: new Date()
}