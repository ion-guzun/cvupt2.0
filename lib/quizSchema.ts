import { z } from 'zod';

const optionSchema = z.object({
  optionText: z.string(),
  isCorrect: z.boolean()
});

const questionSchema = z.object({
  questionText: z.string(),
  options: z.array(optionSchema)
});

export const quizSchema = z.object({
  title: z.string(),
  description: z.string(),
  timeLimit: z.number().min(1),
  scheduledFor: z.date(),
  questions: z.array(questionSchema)
});