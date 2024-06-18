import QuizFeedbackCard from "@/components/QuizFeedbackCard";
import { Button } from "@/components/ui/button";
import { getQuizById, getQuizFeedbacksByQuiz } from "@/lib/actions/quiz.actions";
import { getStudentById } from "@/lib/actions/student.actions";
import { IQuiz, IQuizFeedback } from "@/lib/database/models/quiz.models";
import { IStudent } from "@/lib/database/models/student.model";
import { SearchParamProps } from "@/types";
import Link from "next/link";

const viewQuizResults = async ({ params: { _id } }: SearchParamProps) => {
  const qFeedbacks: IQuizFeedback[] = await getQuizFeedbacksByQuiz(_id);
  const studentFeedbacks = [];

  let gradesTotal = 0;
  for (const qFeedback of qFeedbacks) {
    const student = await getStudentById(qFeedback.student as unknown as string);
    studentFeedbacks.push({ qFeedback, student });
    gradesTotal += qFeedback.mark;
  }

  const quiz: IQuiz = await getQuizById(_id);
  const averageGrade = gradesTotal / qFeedbacks.length || 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{quiz.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full">
        <h2 className="text-xl font-semibold mb-4">Quiz Details</h2>
        <p className="mb-2"><strong>Submissions count:</strong> {qFeedbacks.length}</p>
        <p className="mb-4"><strong>Mean Grade:</strong> {averageGrade.toFixed(2)}</p>
        <div className="space-y-4">
          {studentFeedbacks.map(({ qFeedback, student }) => (
            <QuizFeedbackCard
              key={qFeedback._id}
              qFeedback={qFeedback}
              studentPopulated={student}
            />
          ))}
        </div>
      </div>
      <Link href='/'>
        <Button className="mt-4">Back to dashboard</Button>
      </Link>
    </div>
  );
};

export default viewQuizResults;
