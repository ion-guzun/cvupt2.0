import { Schema, model, models } from 'mongoose';
import { IStudent } from './student.model';

export interface IOption {
  _id?: string
  optionText: string;
  isCorrect: boolean;
}

export interface IQuestion {
  _id?: string
  questionText: string;
  options: IOption[];
}

export interface IQuiz {
  _id?: string
  student: IStudent;
  courseRef?: string;
  title: string;
  description: string;
  timeLimit: number;
  createdAt?: Date; 
  updatedAt?: Date; 
  scheduledFor: Date;
  questions: IQuestion[];
}

export interface IQuizFeedback {
  _id?: string;
  student: IStudent 
  quiz: IQuiz;
  responses: {
    question: IQuestion;
    selectedOption: string; 
    isCorrect: boolean; 
  }[];
  mark: number; 
  createdAt?: Date;
}


//-------------------------------------------------------------------------

const optionSchema = new Schema({
  optionText: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true,
    default: false
  }
});

const questionSchema = new Schema({
  questionText: {
    type: String,
    required: true
  },
  options: [optionSchema]  // Embedding Option schema here
});

const quizSchema = new Schema({
  courseRef: {type: Schema.Types.ObjectId, ref: 'Course', default: ''},
  student: {type: Schema.Types.ObjectId, ref: 'Student'},
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timeLimit: {
    type: Number,  
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  scheduledFor: {
    type: Date,
    required: true
  },
  questions: [questionSchema]  
});

export const responseSchema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  selectedOption: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

export const quizFeedbackSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  responses: [responseSchema],
  mark: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Using the models object to avoid recompilation errors
export const Option = models.Option || model('Option', optionSchema);
export const Question = models.Question || model('Question', questionSchema);
export const Quiz = models.Quiz || model('Quiz', quizSchema);
export const QuizFeedback = models.QuizFeedback || model('QuizFeedback', quizFeedbackSchema);

export default {Option, Question, Quiz, QuizFeedback};
