'use server'

import { ObjectId } from "mongoose";
import { connectToDatabase } from "../database"
import Student, { IStudent } from "../database/models/student.model";
import { CreateUserParams } from "../database/models/user.model";
import { getUserObjectId, isStudent } from "@/helpers";
import Course, { ICourse } from "../database/models/course.model";

export async function createStudent(student: CreateUserParams) {
    try {
      await connectToDatabase();

      const newStudent = await Student.create(student);  
      return JSON.parse(JSON.stringify(newStudent));

    } catch (error) {
      console.log(error);
    }
}

export async function hasCompletedStudentProfile(studentRef: string) {
  try {
    await connectToDatabase();

    const student: IStudent | null = await Student.findById(studentRef);
    return student?.major !== '' && student?.year !== 0 && student?.faculty != '';

  } catch (error) {
    console.log(error);
  }
}



export async function enrollStudentInCourse(studentRef: string, courseRef: string) {
  try {
    await connectToDatabase();

    const student = await Student.findById(studentRef);
    const course = await Course.findById(courseRef);

    if (!student || !course) {
      console.log('Student or course not found');
      return;
    }

    await Course.findByIdAndUpdate(courseRef, {
      $addToSet: { studentsEnrolledIn: student._id }  
    });

    await Student.findByIdAndUpdate(studentRef, {
      $addToSet: { coursesEnrolledIn: course._id }  
    });
    
  } catch (error) {
    console.error('Error enrolling student in course:', error);
  }
}

export async function currentStudent() {
  try {
    await connectToDatabase();

    const student = await Student.findById(getUserObjectId());
    return JSON.parse(JSON.stringify(student));
  } catch (error) {
    console.log(error);
  }
}

export async function getStudentById(studentRef: string) {
  try {
    await connectToDatabase();

    const stud = await Student.findById(studentRef);
    return JSON.parse(JSON.stringify(stud));
  } catch (error) {
    console.log(error);
  }
}

















