import { Schema, model, models } from "mongoose";
import { IUser, UserSchema } from "./user.model";

export interface ITeacher extends IUser {
    coursesCreated: string[]
}

export const TeacherSchema = new Schema({
    ...UserSchema.obj,
    coursesCreated: [{type: Schema.Types.ObjectId, ref: 'Course'}]
})

const Teacher = models.Teacher || model('Teacher', TeacherSchema);

export default Teacher;