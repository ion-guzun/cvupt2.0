'use server'

import { connectToDatabase } from "../database"
import Student, { IStudent } from "../database/models/student.model";
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

export async function hasMajorAndYear(studentRef: string) {
  try {
    await connectToDatabase();

    const student: IStudent | null = await Student.findById(studentRef);
    return student?.major !== '' && student?.year !== 0;

  } catch (error) {
    console.log(error);
  }
}

