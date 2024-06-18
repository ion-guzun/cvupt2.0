import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IQuizFeedback } from "@/lib/database/models/quiz.models";
import { IStudent } from "@/lib/database/models/student.model";
import Image from "next/image";

type QuizFeedbackCardProps = {
  qFeedback: IQuizFeedback;
  studentPopulated: IStudent;
};

const QuizFeedbackCard = ({ qFeedback, studentPopulated }: QuizFeedbackCardProps) => {
  const feedbackDate = qFeedback.createdAt ? new Date(qFeedback.createdAt).toLocaleDateString() : "Date not available";
  const markColor = qFeedback.mark >= 5 ? "text-green-500" : "text-red-500";
  const imageSrc = qFeedback.mark >= 5 ? 'https://img.icons8.com/3d-fluency/94/ok.png' : 'https://img.icons8.com/3d-fluency/94/cancel.png';

  return (
    <Card className="shadow-lg rounded-lg p-2 bg-white w-full max-w-3xl relative">
      <CardHeader className="flex items-center">
        <Image 
          src={studentPopulated.photo}
          alt={`${studentPopulated.firstName} ${studentPopulated.lastName}`}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex flex-col ml-2">
          <CardTitle className="text-sm font-semibold">
            {studentPopulated.firstName} {studentPopulated.lastName}
          </CardTitle>
          <p className="text-xs text-gray-500">Mark: <span className={`font-semibold ${markColor}`}>{qFeedback.mark}</span></p>
          <p className="text-xs text-gray-400">Feedback: {feedbackDate}</p>
        </div>
      </CardHeader>
      {/* Absolute positioning for the bottom right corner */}
      <div className="absolute bottom-2 right-2">
        <Image src={imageSrc} alt="" width={40} height={40} />
      </div>
    </Card>
  );
};

export default QuizFeedbackCard;
