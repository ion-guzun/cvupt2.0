import { Schema, model, models } from "mongoose";
import { User, UserSchema } from "./user.model";

export interface Teacher extends User {
    coursesCreated: string[]
}

const TeacherSchema = new Schema({
    ...UserSchema.obj,
    coursesCreated: [{type: Schema.Types.ObjectId, ref: 'Course'}]
})

const Teacher = models.Teacher || model('Teacher', TeacherSchema);

export default Teacher;