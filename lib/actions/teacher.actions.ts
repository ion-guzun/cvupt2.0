'use server'
import { getUserObjectId } from "@/helpers";
import { connectToDatabase } from "../database";
import Teacher, { ITeacher } from "../database/models/teacher.model";
import { CreateUserParams } from "../database/models/user.model";
import Submission, { ISubmission } from "../database/models/submission.model";
import { TeacherFeedback } from "@/types";
import Course, { ICourse } from "../database/models/course.model";

export async function createTeacher(teacher: CreateUserParams) {
    try {
      await connectToDatabase();

      const newTeacher = await Teacher.create(teacher);  
      return JSON.parse(JSON.stringify(newTeacher));

    } catch (error) {
      console.log(error);
    }
}

export async function currentTeacher() {
  try {
    await connectToDatabase();

    const teacher = await Teacher.findById(getUserObjectId());
    return JSON.parse(JSON.stringify(teacher));
  } catch (error) {
    console.log(error);
  }
}

export async function feedbackSubmission(submissionRef: string, 
                                         teacherFeedback: TeacherFeedback) 
{
  try {
    await connectToDatabase();
    const updatedSubmission = await Submission.findByIdAndUpdate(
      submissionRef, 
      {
        status: 'Graded', 
        grade: teacherFeedback.grade, 
        teacherFeedbackText: teacherFeedback.feedback,
        gradedTime: Date.now()
      },
      { new: true } 
    )

    return JSON.parse(JSON.stringify(updatedSubmission));
    
  } catch (error) {
    console.log(error);
  }
}

export async function isFeedbacked(submissionRef: string) {
  try {
    await connectToDatabase();

    const submission: ISubmission | null = await Submission.findOne({submissionRef}!);
    if(submission) {
      console.log('feedbacked the submission.');
      return submission.status === 'Graded';
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getTeacherByCourse(courseRef: string) {
  try {
    await connectToDatabase();

    const course: ICourse | null = await Course.findById(courseRef);
    const teacherRef = course?.createdBy;
    const teacher: ITeacher | null = await Teacher.findById(teacherRef);

    return JSON.parse(JSON.stringify(teacher));
  } catch (error) {
    console.log(error);
  }
}




