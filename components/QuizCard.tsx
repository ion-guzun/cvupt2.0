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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type QuizCardProps = {
  title: string;
  description: string;
  questionCount: number;
  timeLimit: number;
  userEmail: string;
  quizId: string;
};

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
        {userEmail.endsWith('@student.upt.ro') ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="btn btn-success">Begin Exam</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Start Exam</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to start the quiz? Once started, you cannot go back.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAction}>Start Exam</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button onClick={handleAction} className="btn btn-primary">
            View Results
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
