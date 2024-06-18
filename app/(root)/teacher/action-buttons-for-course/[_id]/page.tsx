import { Button } from "@/components/ui/button"
import { getStudentAssignmentsByCourse } from "@/lib/actions/assignment.actions";
import { getCourseById } from "@/lib/actions/course.actions"
import { getLabsByCourse } from "@/lib/actions/lab.actions";
import { getAllQuizesByCourse } from "@/lib/actions/quiz.actions";
import { IAssignment } from "@/lib/database/models/assignment.model";
import { ICourse } from "@/lib/database/models/course.model";
import { ILab } from "@/lib/database/models/lab.model";
import { IQuiz } from "@/lib/database/models/quiz.models";
import { SearchParamProps } from "@/types"
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Link from "next/link";
import ActionButtons from "@/components/ActionButtons";

const actionButtons = async ({params: {_id}}: SearchParamProps) => {
    const course: ICourse = await getCourseById(_id);
    const courseLabs: ILab[] = await getLabsByCourse(course._id);
    const courseAssignments: IAssignment[] = await getStudentAssignmentsByCourse(course._id);
    const courseExams: IQuiz[] = await getAllQuizesByCourse(course._id);

    return (
        <ActionButtons
            course={course}
            courseLabs={courseLabs}
            courseAssignments={courseAssignments}
            courseExams={courseExams}
        />
    );
}

export default actionButtons