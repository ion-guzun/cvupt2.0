'use server'
import { connectToDatabase } from "../database";
import Teacher from "../database/models/teacher.model";
import { CreateUserParams } from "../database/models/user.model";

export async function createTeacher(teacher: CreateUserParams) {
    try {
      await connectToDatabase();

      const newTeacher = await Teacher.create(teacher);  
      return JSON.parse(JSON.stringify(newTeacher));

    } catch (error) {
      console.log(error);
    }
}