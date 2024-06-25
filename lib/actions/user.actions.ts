'use server'

import { connectToDatabase } from "../database";
import Course, { ICourse } from "../database/models/course.model";
import Student, { IStudent } from "../database/models/student.model";
import Teacher, { ITeacher } from "../database/models/teacher.model";
import { getAllStudentsByCourse, getStudentById } from "./student.actions";

export type IUserCombined = IStudent | ITeacher;

export async function getAllUsers() {
    try {
        await connectToDatabase();

        const allStudents: IStudent[] = await Student.find();
        const allTeachers: ITeacher[] = await Teacher.find();

        const allUsers: IUserCombined[] = [...allStudents, ...allTeachers];
        
        return JSON.parse(JSON.stringify(allUsers));
    } catch (error) {
        console.log(error);
        throw error; 
    }
}

export async function getAllUsersByCourse(courseRef: string) {
    try {
        await connectToDatabase();

        const course: ICourse | null = await Course.findById(courseRef);
        if (!course) {
            throw new Error('Course not found');
        }

        const studentsRefs = course.studentsEnrolledIn || []; // Ensuring it defaults to an empty array if null
        let studentsPopulated: IStudent[] = [];
        for (const studentRef of studentsRefs) {
            const student: IStudent | null = await Student.findById(studentRef);
            if (student) {  // Ensure only non-null students are added to the array
                studentsPopulated.push(student);
            }
        }

        const teacher: ITeacher | null = await Teacher.findById(course.createdBy);

        const allUsers: IUserCombined[] = [...studentsPopulated];
        if (teacher) {  // Only add the teacher to the array if they are not null
            allUsers.push(teacher);
        }

        return JSON.parse(JSON.stringify(allUsers));  // Return the combined array of students and teacher

    } catch (error) {
        console.log('Error retrieving users by course:', error);
        throw error;  // Rethrow the error for higher-level handling
    }
}

export async function getUserById(userRef: string) {
    try {
        await connectToDatabase();

        const student = await Student.findById(userRef);
        if (student) {
            return JSON.parse(JSON.stringify(student));
        }

        const teacher = await Teacher.findById(userRef);
        if (teacher) {
            return JSON.parse(JSON.stringify(teacher));
        }

        console.log('User not found as either student or teacher');
        return null;

    } catch (error) {
        console.log(error);
        throw error;
    }
}
