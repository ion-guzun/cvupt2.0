import QuizTakingForm from "@/components/QuizTakingForm";
import { getQuizById } from "@/lib/actions/quiz.actions"
import { currentStudent } from "@/lib/actions/student.actions";
import { IQuiz } from "@/lib/database/models/quiz.models";
import { IStudent } from "@/lib/database/models/student.model";
import { SearchParamProps } from "@/types"

const startQuiz = async ({params: {_id}}: SearchParamProps) => {
 
  const quiz: IQuiz = await getQuizById(_id);
  

  return (
    <QuizTakingForm 
        quiz={quiz} 
        student={await currentStudent()}
    />
  )
}

export default startQuiz