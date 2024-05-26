'use server'

import { connectToDatabase } from "../database"
import Student, { InitialCreateStudentParams } from "../database/models/student.model";
import { CreateUserParams } from "../database/models/user.model";

export async function createStudent(student: CreateUserParams) {
    try {
      await connectToDatabase();

      const newStudent = await Student.create(student);  
      return JSON.parse(JSON.stringify(newStudent));

    } catch (error) {
      console.log(error);
    }
}