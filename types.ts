import { Schema } from "mongoose";
import { IAssignment } from "./lib/database/models/assignment.model";
import { ICourse } from "./lib/database/models/course.model";
import { ILab } from "./lib/database/models/lab.model";
import { IStudent } from "./lib/database/models/student.model";
import { ITeacher } from "./lib/database/models/teacher.model";
import { IQuiz } from "./lib/database/models/quiz.models";

// types.ts
export interface Content {
  title: string;
  body?: string | undefined;
  courses?: ICourse[]
  labs?: ILab[]; 
  assignments?: IAssignment[]; 
  quizes?: IQuiz[];
  students?: IStudent[];
  teacher?: ITeacher
  
  actionButtons?: React.ReactNode[]
  courseObjectId?: string;
}
  
  export interface SubItem {
    id: number;
    title: string;
    content: Content;
  }
  
  export interface Item {
    id: number;
    title: string;
    subItems: SubItem[];
  }
  
  export interface SidebarProps {
    items: Item[];
    onSelectItem: (subItem: SubItem) => void;
  }
  
  export interface MainContentProps {
    content: Content;
  }

  export interface ICompleteStudentProfile {
    faculty: string;
    major: string
    year: number | null
  }

  export type SearchParamProps = {
    params: { _id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }

export type TeacherFeedback = {
  feedback: string
  grade: string
}

  