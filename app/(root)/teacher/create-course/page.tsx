import CourseForm from "@/components/CourseForm"
import { Button } from "@/components/ui/button"
import { getUserObjectId } from "@/helpers"
import Link from "next/link"

const CreateCourse = () => {
  return (
    <div>
      <Link href='/'>
        <Button className="px-2 py-2">
          Back to dasboard
        </Button>
      </Link>
      <CourseForm teacherRef={getUserObjectId()} type="create"/>
    </div>
  )
}

export default CreateCourse