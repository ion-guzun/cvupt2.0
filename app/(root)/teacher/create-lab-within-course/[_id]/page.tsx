import { LabForm } from "@/components/LabForm"
import { getUserObjectId } from "@/helpers"
import { SearchParamProps } from "@/types"

const createLab = ({params: {_id}}: SearchParamProps) => {
  return (
      <LabForm 
        teacherRef={getUserObjectId()} 
        type="create"
        courseId={_id}
      />
  )
}

export default createLab