'use server'
import { connectToDatabase } from "../database";
import Teacher from "../database/models/teacher.model";
import UnauthorizedUser from "../database/models/unauthorized_user.model";
import { CreateUserParams } from "../database/models/user.model";

export async function createUnathorizedUser(unauthorized_user: CreateUserParams) {
    try {
      await connectToDatabase();

      const newUnauthorizedUser = await UnauthorizedUser.create(unauthorized_user);  
      return JSON.parse(JSON.stringify(newUnauthorizedUser));

    } catch (error) {
      console.log(error);
    }
}