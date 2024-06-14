import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import TeacherSubmissionFeedback from "./TeacherSubmissionFeedbackForm"
import TeacherSubmissionFeedbackForm from "./TeacherSubmissionFeedbackForm"
import { getSubmissionById } from "@/lib/actions/submission.actions"
import { ISubmission } from "@/lib/database/models/submission.model"
 

type SubmissionCardProps = {
    submissionObjectId?: string
    studentRef: string
    submittedFileUrl: string
    submittedTime: Date
    onGradedChange: (submissionId: string, isGraded: boolean) => void; //to parent component
}

const SubmissionCard = async ({studentRef, submittedFileUrl, submittedTime, submissionObjectId, onGradedChange}: SubmissionCardProps) => {
    const currentSubmission: ISubmission = await getSubmissionById(submissionObjectId!);
    const isGraded = currentSubmission.status === 'Graded';
    onGradedChange(submissionObjectId!, isGraded);

    return (
        <Card className="m-4 mx-auto max-w-4xl shadow-xl">
            <CardHeader>
                <CardDescription>Submitted by: {studentRef}</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href={submittedFileUrl}>
                    <Button disabled={isGraded}>
                        Download submitted folder
                    </Button>
                </Link>
                <div className="my-2"> 
                  <TeacherSubmissionFeedbackForm 
                    submissionId={submissionObjectId!}
                    isGraded={isGraded}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-gray-600">Submitted at: {formatDate(submittedTime!)}</p>
            </CardFooter>
        </Card>
    );
  }
  

export default SubmissionCard