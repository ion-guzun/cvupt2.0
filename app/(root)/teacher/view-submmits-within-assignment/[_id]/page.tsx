import SubmissionCard from "@/components/SubmissionCard";
import { getUserObjectId } from "@/helpers";
import { getSubmissionsByAssignment } from "@/lib/actions/submission.actions";
import { ISubmission } from "@/lib/database/models/submission.model";
import { SearchParamProps } from "@/types";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const viewSubmits = async ({ params: { _id } }: SearchParamProps) => { //_id for the assignment
  const submits: ISubmission[] = await getSubmissionsByAssignment(_id) || [];
  const handleGradedChange = (submissionId: string, isGraded: boolean) => {
    console.log(isGraded);
  }
  
  return (
    <div>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-2">
                <AccordionTrigger>Submit by: {_id}</AccordionTrigger>
                <AccordionContent>
                    {submits.map(sub => (
                        <SubmissionCard
                            key={sub._id}
                            submissionObjectId={sub._id}
                            studentRef={getUserObjectId()}
                            submittedFileUrl={sub.submittedFileUrl!}
                            submittedTime={sub.submittedTime!}
                            onGradedChange={handleGradedChange}
                        />
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
  );
}

export default viewSubmits;
