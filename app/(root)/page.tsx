import React, { use } from "react";
import { Header } from "@/components/Header";
import ContentManager from "@/components/ContentManager";
import { Item } from "@/types";
import { getUserObjectId, isStudent, isTeacher, isUnauthorized } from "@/helpers";
import { auth } from "@clerk/nextjs/server";
import { ICourse } from "@/lib/database/models/course.model";
import { getStudentCourses, getTeacherCreatedCourses } from "@/lib/actions/course.actions";
import { currentStudent } from "@/lib/actions/student.actions";
import { IStudent } from "@/lib/database/models/student.model";
import { currentTeacher } from "@/lib/actions/teacher.actions";

// const initialItems: Item[] = [
//   {
//     id: 1,
//     title: "Item 1",
//     subItems: [
//       { id: 1.1, title: "Subitem 1.1", content: { title: "Subitem 1.1", body: "This is the content for Subitem 1.1. Lorem ipsum dolor sit amet, consectetur adipiscing elit." } },
//       { id: 1.2, title: "Subitem 1.2", content: { title: "Subitem 1.2", body: "This is the content for Subitem 1.2. Lorem ipsum dolor sit amet, consectetur adipiscing elit." } },
//     ],
//   },
//   {
//     id: 2,
//     title: "Item 2",
//     subItems: [
//       { id: 2.1, title: "Subitem 2.1", content: { title: "Subitem 2.1", body: "This is the content for Subitem 2.1. Lorem ipsum dolor sit amet, consectetur adipiscing elit." } },
//       { id: 2.2, title: "Subitem 2.2", content: { title: "Subitem 2.2", body: "This is the content for Subitem 2.2. Lorem ipsum dolor sit amet, consectetur adipiscing elit." } },
//     ],
//   },
// ];

// const initialSelectedContent = initialItems[0].subItems[0].content;

const Home = async () => {  

  let relevantCourses: ICourse[] = [];
  // let coursesNames: string[] = [];

  if(isStudent()) {
    //----------------GETTING THE COURSES THAT THE STUDENT IS ENROLLED IN-------------
    const student: IStudent = await currentStudent();
    const {major, year} = student;
    relevantCourses = await getStudentCourses(major, year);
    //----------------GETTING THE COURSES THAT THE STUDENT IS ENROLLED IN-------------
    // for(const course of relevantCourses) {
    //   coursesNames.push(course.name);
    // }
    
  }
  else if(isTeacher()) {
    //----------------GETTING THE COURSES THAT THE TEACHER HAS CREATED-------------
    relevantCourses = await getTeacherCreatedCourses();
    //----------------GETTING THE COURSES THAT THE TEACHER HAS CREATED-------------
    // for(const course of relevantCourses) {
    //   coursesNames.push(course.name);
    // }

  }

  
//----------------------------------COURSE TEMPLATE---------------------------------------
  let initialItems: Item[] = [
    { id: 1, title: "Item 1", subItems: [
        { id: 1.1, title: "Subitem1.1", content: { title: "Subitem 1.2", body: "" } },
        { id: 1.2, title: "Subitem 1.2", content: { title: "Subitem 1.2", body: "" } },
    ] },
    { id: 2, title: "Item 2", subItems: [
        { id: 2.1, title: "Subitem2.1", content: { title: "Subitem 1.2", body: "" } },
        { id: 2.2, title: "Subitem 2.2", content: { title: "Subitem 2.2", body: "" } },
    ] }
];
//--------------------------------COURSE TEMPLATE------------------------------------------

initialItems = relevantCourses.map((course, index) => ({
  id: index + 1, 
  title: course.name,
  subItems: [
      { 
          id: index + 1.1, 
          title: "Courses", 
          content: { title: `Courses for: ${course.name}`, body: course.pdfs?.join("\n") || "No PDFs available" }
      },
      // Add other subitems as needed
  ]
}));


  const initialSelectedContent = initialItems[0].subItems[0].content;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ContentManager initialItems={initialItems} initialSelectedContent={initialSelectedContent} />
    </div>
  );
};




export default Home;
