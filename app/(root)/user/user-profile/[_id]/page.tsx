// import { getUserById } from "@/lib/actions/user.actions"
// import { IStudent } from "@/lib/database/models/student.model"
// import { ITeacher } from "@/lib/database/models/teacher.model"
// import { SearchParamProps } from "@/types"

// const userProfile = async ({params: {_id}}: SearchParamProps) => {
//   const user: IStudent | ITeacher | null = await getUserById(_id);
//   const teacher = user?.email.endsWith('github@gmail.com') && user as ITeacher;
//   const student = user?.email.endsWith('@student.upt.ro') && user as IStudent;

// //   const teacherCourses = teacher && teacher.coursesCreated;
// //   const studentCourses = student && student.coursesEnrolledIn;
// console.log(teacher);
  

//   return (
//     <div>
//         {/* {teacher && (
            
//         )}
//         {student && (

//         )} */}
//     </div>
//   )
// }

// export default userProfile