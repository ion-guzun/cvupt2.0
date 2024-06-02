import CourseForm from "@/components/CourseForm"
import { getUserObjectId } from "@/helpers"

const UpdateCourse = () => {
  return (
    <CourseForm
      teacherRef={getUserObjectId()}
      type="update"
    />

  )
}

export default UpdateCourse