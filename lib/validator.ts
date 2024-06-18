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
    description: z.string()
    .min(2, {
      message: "name of the lab must be at least 2 characters."
    })
    .max(300, {
      message: "name of the lab must be max 300 characters."
    }),
    labPdfUrls: z.string().url().array()
})

export const labInitialValues = {
    name: '',
    description: '',
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


export const TeacherSubmissionFeedbackFormSchema = z.object({
    feedback: z.string().min(2, {message: 'feedback must be at least 2 characters'})
    .max(100, {message: 'feedback must be at max 15 characters'}),
    grade: z.string()
})

export const teacherFeedbackInitialValues = {
    feedback: '',
    grade: ''
}

import { formatISO, parseISO } from 'date-fns'; // For date manipulation

export const quizFormSchema = z.object({
  title: z.string().min(2).max(15),
  description: z.string().min(2).max(300),
  timeLimit: z.string(),
  scheduledFor: z.date(), // Validates as Date object
  questions: z.array(
    z.object({
      questionText: z.string().min(1, "Question text is required"),
      options: z.array(
        z.object({
          optionText: z.string().min(1, "Option text is required"),
          isCorrect: z.boolean()
        })
      )
    })
  )
});

export const quizFormInitialValues = {
  title: '',
  description: '',
  timeLimit: '',
  scheduledFor: formatISO(new Date(), { representation: 'date' }), // Format to "yyyy-MM-dd"
  questions: [{
    questionText: '',
    options: [{ optionText: '', isCorrect: false }]
  }]
};

