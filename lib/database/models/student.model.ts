import { Schema, model, models } from "mongoose";
import { CreateUserParams, User, UserSchema } from "./user.model";

export type InitialCreateStudentParams = CreateUserParams;

export interface Student extends User {
    major: string
    year: number
    coursesEnrolledIn: string[]
}


const StudentSchema = new Schema({
    ...UserSchema.obj,
    major: {type: String},
    year: {type: Number},
    coursesEnrolledIn: [{type: Schema.Types.ObjectId, ref: 'Course'}]
})

const Student = models.Student || model('Student', StudentSchema);

export default Student;