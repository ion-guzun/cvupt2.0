'use client'
import React from 'react';
import { useForm, useFieldArray, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { IQuiz } from '@/lib/database/models/quiz.models';
import { SearchParamProps } from '@/types';
import { createQuiz, getQuizById } from '@/lib/actions/quiz.actions';
import { Schema } from 'mongoose';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Option {
  optionText: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  options: Option[];
}

interface QuizFormInputs {
  title: string;
  description: string;
  timeLimit: string;
  scheduledFor: string;
  questions: Question[];
}

interface OptionsFieldArrayProps {
  form: UseFormReturn<QuizFormInputs>;
  questionIndex: number;
}

const QuizCreationForm = ({params: {_id}}: SearchParamProps) => {
    const r = useRouter();
  const form = useForm<QuizFormInputs>({
    defaultValues: {
      title: '',
      description: '',
      timeLimit: '',
      scheduledFor: new Date().toISOString().slice(0, 10), 
      questions: [{
        questionText: '',
        options: [{ optionText: '', isCorrect: false }]
      }]
    }
  });

  const { fields: questionFields, append: appendQuestion, remove: removeQuestion } = useFieldArray({
    control: form.control,
    name: 'questions'
  });

  const onSubmit: SubmitHandler<QuizFormInputs> = async (data) => {
    //@ts-ignore
    const quiz: IQuiz = {
        courseRef: _id,
        title: data.title,
        description: data.description,
        timeLimit: parseInt(data.timeLimit),
        scheduledFor: new Date(data.scheduledFor), 
        questions: data.questions.map(question => ({
          ...question,
          options: question.options.map(option => ({
            optionText: option.optionText,
            isCorrect: option.isCorrect
          }))
        }))
    };
    
    try {
        const createdQuiz: IQuiz = await createQuiz(quiz);
        console.log(createdQuiz._id);
    } catch (error) {
        console.log(error);
    }
    r.push('/');
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 shadow-lg rounded-md max-w-4xl mx-auto my-10">
      <input {...form.register('title')} placeholder="Quiz Title" className="input input-bordered w-full mb-4" />
      <textarea {...form.register('description')} placeholder="Quiz Description" className="textarea textarea-bordered w-full mb-4" />
      <input {...form.register('timeLimit')} placeholder="Time Limit (in minutes)" className="input input-bordered w-full mb-4" />
      <input type="date" {...form.register('scheduledFor')} className="input input-bordered w-full mb-4" />

      {questionFields.map((question, questionIndex) => (
        <fieldset key={question.id} className="p-4 border rounded bg-gray-100 shadow-sm">
          <label>
            Question {questionIndex + 1}
            <input {...form.register(`questions.${questionIndex}.questionText`)} placeholder="Enter question text" className="input input-bordered w-full my-2" />
          </label>

          <Button type="button" onClick={() => removeQuestion(questionIndex)} className="btn btn-error">Remove Question</Button>

          <OptionsFieldArray form={form} questionIndex={questionIndex} />

          <Button type="button" onClick={() => appendQuestion({
            questionText: '',
            options: [{ optionText: '', isCorrect: false }]
          })} className="btn btn-primary">Add Question</Button>
        </fieldset>
      ))}

      <Button type="submit" className="btn btn-success">Submit</Button>
      <Link href='/'>
        <Button className='mx-4'>Back to dashboard</Button>
      </Link>
    </form>
  );
};

const OptionsFieldArray = ({ form, questionIndex }: OptionsFieldArrayProps) => {
  const { fields: optionFields, append, remove } = useFieldArray({
    control: form.control,
    name: `questions.${questionIndex}.options`
  });

  return (
    <div>
      {optionFields.map((option, optionIndex) => (
        <div key={option.id} className="flex items-center mt-2">
          <input {...form.register(`questions.${questionIndex}.options.${optionIndex}.optionText`)} placeholder="Option text" className="input input-bordered flex-1 mr-2" />
          <label className="flex items-center">
            <input type="checkbox" {...form.register(`questions.${questionIndex}.options.${optionIndex}.isCorrect`)} className="checkbox checkbox-primary mr-2" />
            Correct?
          </label>
          <Button type="button" onClick={() => remove(optionIndex)} className="btn btn-error ml-2">Remove Option</Button>
        </div>
      ))}
      <Button type="button" onClick={() => append({ optionText: '', isCorrect: false })} className="btn btn-primary my-4">Add Option</Button>
    </div>
  );
};

export default QuizCreationForm;
