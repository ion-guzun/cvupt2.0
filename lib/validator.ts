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
    startDate: new Date(),
    endDate: new Date()
}
