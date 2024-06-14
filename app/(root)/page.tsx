import React from "react";
import { Header } from "@/components/Header";
import ContentManager from "@/components/ContentManager";
import { ICourse } from "@/lib/database/models/course.model";
import { IStudent } from "@/lib/database/models/student.model";
import { ILab } from "@/lib/database/models/lab.model";
import { isStudent, isTeacher } from "@/helpers";
import { currentStudent } from "@/lib/actions/student.actions";
import { getStudentCourses, getTeacherCreatedCourses } from "@/lib/actions/course.actions";
import { getLabsByCourse } from "@/lib/actions/lab.actions";
import { IAssignment } from "@/lib/database/models/assignment.model";
import { getStudentAssignmentsByCourse } from "@/lib/actions/assignment.actions";

type CourseRef = string;

const Home = async () => {  
  let relevantCourses: ICourse[] = [];
  let relevantLabsWithCourseRefs = new Map<CourseRef, ILab[]>();
  let relevantAssignmentsWithCourseRefs = new Map<CourseRef, IAssignment[]>
  

  if(isStudent()) {
    const student: IStudent = await currentStudent();
    const {major, year} = student;
    relevantCourses = await getStudentCourses(major, year);
  }
  else if(isTeacher()) {
    relevantCourses = await getTeacherCreatedCourses();
  }

  for (const course of relevantCourses) { //getting the labs and assignments for each course
    const labs = await getLabsByCourse(course._id) as ILab[];
    const assignments = await getStudentAssignmentsByCourse(course._id) as IAssignment[];

    relevantLabsWithCourseRefs.set(course._id, labs);
    relevantAssignmentsWithCourseRefs.set(course._id, assignments);
  }
  

  let initialItems = relevantCourses.map((course, index) => ({
    id: index + 1,
    title: course.name,
    subItems: [
        { 
            id: index + 1.1,
            title: "Courses",
            content: { 
                title: `Courses for: ${course.name}`,
                courses: [course]
            }
        },
        {
            id: index + 1.2,
            title: "Labs",
            content: {
                title: `Labs for course: ${course.name}`,
                labs: relevantLabsWithCourseRefs.get(course._id) || [],
                courseObjectId: course._id
            } 
        },
        {
            id: index + 1.3,
            title: "Assignments",
            content: {
                title: `Assignments for course: ${course.name}`,
                assignments: relevantAssignmentsWithCourseRefs.get(course._id) || [],
                courseObjectId: course._id
            }
        }
    ]
  }));

  const initialSelectedContent = initialItems[0]?.subItems[0]?.content;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ContentManager initialItems={initialItems} initialSelectedContent={initialSelectedContent} />
    </div>
  );
};

export default Home;
