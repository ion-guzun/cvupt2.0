import React from 'react';
import { getQuizFeedbackById } from "@/lib/actions/quiz.actions";
import { IQuizFeedback } from "@/lib/database/models/quiz.models";
import { SearchParamProps } from "@/types";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const QuizResult = async ({ params: { _id } }: SearchParamProps) => {
  const qF: IQuizFeedback = await getQuizFeedbackById(_id);
  const imageUrl = qF.mark >= 5 ? 'https://img.icons8.com/3d-fluency/94/checkmark.png' : 
                                  'https://img.icons8.com/3d-fluency/94/delete-sign.png';

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
      <Image
        src={imageUrl}
        alt=''
        width={40}
        height={40}
      />
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Quiz Results</h1>
      <div className="mb-6">
        <p className="text-gray-700"><strong>Student:</strong> {qF.student.firstName} {qF.student.lastName}</p>
        <p className="text-gray-700"><strong>Quiz Title:</strong> {qF.quiz.title}</p>
        <p className="text-gray-700"><strong>Mark:</strong> {qF.mark}/10</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Responses:</h2>
        <ul className="space-y-4">
          {qF.responses.map((response, index) => (
            <li key={index} className="border-b border-gray-200 pb-4">
              <p className="text-gray-600"><strong>Question:</strong> {response.question.questionText}</p>
              <p className="text-gray-600"><strong>Selected Option:</strong> {response.selectedOption}</p>
              <p className="text-gray-600"><strong>Correct:</strong> {response.isCorrect ? "Yes" : "No"}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <Link href='/'>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300">
            Back to dashboard
          </Button>
        </Link>
        {qF.mark < 5 && <p className="mt-4 text-red-600 text-lg font-semibold">Ne vedem la anu!</p>}
      </div>
    </div>
  );
}

export default QuizResult;
