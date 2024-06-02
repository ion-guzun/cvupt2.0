import CourseForm from "@/components/CourseForm"
import { getUserObjectId } from "@/helpers"

const CreateCourse = () => {
  return (
      <CourseForm teacherRef={getUserObjectId()} type="create"
      />
  )
}

export default CreateCourse