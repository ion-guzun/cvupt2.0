import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'; 

type QuizCardProps = {
  title: string
  description: string
  questionCount: number
  timeLimit: number
  userEmail: string
  quizId: string
}

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  description,
  questionCount,
  timeLimit,
  userEmail,
  quizId
}) => {
  const router = useRouter();

  const handleAction = () => {
    if (userEmail.endsWith('@student.upt.ro')) {
      router.push(`student/start-quiz/${quizId}`);
    } else {
      router.push(`teacher/view-results-for-quiz/${quizId}`);
    }
  };

  return (
    <Card className="m-4 shadow-xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{`Questions: ${questionCount}`}</p>
        <p>{`Time Limit: ${timeLimit} minutes`}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAction} className={`btn ${userEmail.endsWith('@student.upt.ro') ? 'btn-success' : 'btn-primary'}`}>
          {userEmail.endsWith('@student.upt.ro') ? 'Begin Quiz' : 'View Results'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
