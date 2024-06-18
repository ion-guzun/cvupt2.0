import React from 'react';
import { useForm, useFieldArray, SubmitHandler, UseFormReturn } from 'react-hook-form';

export interface Option {
  optionText: string;
  isCorrect: boolean;
}

export interface Question {
  questionText: string;
  options: Option[];
}

export interface QuizFormInputs {
  title: string;
  description: string;
  timeLimit: string;
  scheduledFor: string;
  questions: Question[];
}

export interface OptionsFieldArrayProps {
  form: UseFormReturn<QuizFormInputs>;
  questionIndex: number;
}
