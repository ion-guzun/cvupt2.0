import AssignmentForm from "@/components/AssignmentForm"
import { getUserObjectId } from "@/helpers"
import { SearchParamProps } from "@/types"

const createAssignment = ({params: {_id}}: SearchParamProps) => {
  return (
    <AssignmentForm
        teacherRef={getUserObjectId()} 
        courseRef={_id}
        type="create"
    />
  )
}

export default createAssignment