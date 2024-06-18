'use client';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { IQuiz, IQuestion, IOption, IQuizFeedback } from '@/lib/database/models/quiz.models';
import { Button } from './ui/button';
import { IStudent } from '@/lib/database/models/student.model';
import { createQuizFeedback } from '@/lib/actions/quiz.actions';

interface IResponse {
  question: IQuestion;
  selectedOption: string;
  isCorrect: boolean;
}

interface IFeedbackData {
  student: IStudent;
  quiz: IQuiz;
  responses: IResponse[];
  mark: number;
}

interface QuizFormProps {
  quiz: IQuiz;
  student: IStudent;
}

const QuizTakingForm: React.FC<QuizFormProps> = ({ quiz, student }) => {
  const router = useRouter();
  const { control, handleSubmit, setValue, getValues } = useForm<IQuiz>({
    defaultValues: quiz
  });

  const [secondsLeft, setSecondsLeft] = useState(quiz.timeLimit * 60);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    const timerId = timerActive && setInterval(() => {
      setSecondsLeft(prev => prev > 0 ? prev - 1 : 0);
      if (secondsLeft <= 0) {
        //@ts-ignore
        clearInterval(timerId);
        handleSubmit(onSubmit)();
      }
    }, 1000);
        //@ts-ignore
    return () => clearInterval(timerId);
  }, [secondsLeft, timerActive, handleSubmit]);

  const calculateMark = (responses: IResponse[]): number => {
    const totalQuestions = responses.length;
    const correctAnswers = responses.filter(response => response.isCorrect).length;
    return (correctAnswers / totalQuestions) * 10;
  };

  const handleRadioChange = (questionIndex: number, optionText: string) => {
    const fieldName = `questions.${questionIndex}.selectedOption`;
    //@ts-ignore
    const currentValue = getValues(fieldName);

    if (currentValue === optionText) {
      //@ts-ignore
      setValue(fieldName, null);
    } else {
      //@ts-ignore
      setValue(fieldName, optionText);
    }
  };

  const onSubmit = async (data: IQuiz) => {
    setTimerActive(false);

    const responses = data.questions.map((question, index) => {
      //@ts-ignore
      const selectedOption = getValues(`questions.${index}.selectedOption`);
      const correctOption = question.options.find(option => option.isCorrect);
      return {
        question: question,
        selectedOption: selectedOption || '',
        isCorrect: correctOption ? correctOption.optionText === selectedOption : false,
      };
    });

    const feedbackData: IFeedbackData = {
      student,
      quiz,
      //@ts-ignore
      responses,
      
      //@ts-ignore
      mark: calculateMark(responses)
    };

    const createdQuizFeedback: IQuizFeedback = await createQuizFeedback(feedbackData);
    router.push(`/student/quiz-results/${createdQuizFeedback._id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="text-right text-lg mb-4">
        Time Remaining: {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
      </div>
      {quiz.questions.map((question, index) => (
        <div key={question._id} className="mb-4">
          <h3 className="block text-gray-700 text-lg font-bold mb-2">{question.questionText}</h3>
          {question.options.map((option, idx) => (
            <div key={option._id} className="mb-2">
              <label className="block text-gray-800 font-medium">
                <input
                  type="radio"
                  name={`questions.${index}.selectedOption`}
                  //@ts-ignore
                  checked={getValues(`questions.${index}.selectedOption`) === option.optionText}
                  onChange={() => handleRadioChange(index, option.optionText)}
                  className="mr-2 leading-tight"
                  value={option.optionText}
                />
                {option.optionText}
              </label>
            </div>
          ))}
        </div>
      ))}
      <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit Quiz</Button>
    </form>
  );
};

export default QuizTakingForm;
