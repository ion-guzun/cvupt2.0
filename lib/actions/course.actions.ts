'use server'

import { getUserObjectId } from "@/helpers";
import { connectToDatabase } from "../database";
import Course, { CreateCourseParams, ICourse } from "../database/models/course.model";
import Student, { IStudent, StudentSchema } from "../database/models/student.model";
import Teacher, { ITeacher, TeacherSchema } from "../database/models/teacher.model";
import mongoose from "mongoose";
import Lab from "../database/models/lab.model";
import Assignment from "../database/models/assignment.model";
import { Quiz } from "../database/models/quiz.models";

export async function createCourse(course: CreateCourseParams) {
    try {
        await connectToDatabase();

        const newCourse = await Course.create(course);
        return JSON.parse(JSON.stringify(newCourse));

    } catch (error) {
        console.log(error);
    }
}

export async function getStudentCourses(forMajor: string, forYear: number) {
    try {
        await connectToDatabase();

        const courses = await Course.find({forMajor, forYear});
        return JSON.parse(JSON.stringify(courses));
    } catch (error) {
        console.log(error);
    }
}

export async function getTeacherCreatedCourses() {

    try {
        await connectToDatabase();

        const courses = await Course.find({createdBy: getUserObjectId()});
        return JSON.parse(JSON.stringify(courses));
    } catch (error) {
        console.log(error);
    }
}

export async function populateCourses(courses: ICourse[]): Promise<ICourse[]> {
    try {
        await connectToDatabase(); 

        const populatedCourses = await Promise.all(courses.map(async (course) => {
            const populatedCourse = await Course.findById(course._id)
                .populate({
                    path: 'studentsEnrolledIn',
                    model: Student, 
                    select: 'firstName lastName photo lastSignedInAt joinedAt'
                })
                .populate({
                    path: 'createdBy',
                    model: Teacher, 
                    select: 'firstName lastName photo lastSignedInAt joinedAt'
                });

            return populatedCourse ? populatedCourse.toObject() : course;
        }));

        return populatedCourses;
    } catch (error) {
        console.error('Error populating courses:', error);
        return []; 
    }
}

export async function populateSingleCourse(courseId: string) {
    try {
        await connectToDatabase();

        const course = await Course.findById(courseId).populate({
            path: 'studentsEnrolledIn',
            model: Student,
            select: 'firstName lastName photo lastSignedInAt joinedAt' 
        });

        return course ? course.toObject() : null;
    } catch (error) {
        console.error('Error populating course:', error);
        return null; 
    }
}

export async function deleteCourseById(courseRef: string) {
    try {
      await connectToDatabase();
  
      // Step 1: Find the course to be deleted
      const deletedCourse = await Course.findByIdAndDelete(courseRef);
      if (!deletedCourse) {
          throw new Error(`Course with ID ${courseRef} not found.`);
      }

      // Step 2: Remove course reference from teachers
      await Teacher.updateMany(
          { coursesCreated: courseRef },
          { $pull: { coursesCreated: courseRef } }
      );

      // Step 3: Remove course reference from students
      await Student.updateMany(
          { coursesEnrolledIn: courseRef },
          { $pull: { coursesEnrolledIn: courseRef } }
      );

      await Lab.deleteMany({courseRef});
      await Assignment.deleteMany({courseRef});
      await Quiz.deleteMany({courseRef});


      return JSON.parse(JSON.stringify(deletedCourse));
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error; 
    }
  }