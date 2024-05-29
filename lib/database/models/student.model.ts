import { Schema, model, models } from "mongoose";
import { IUser, UserSchema } from "./user.model";

export interface IStudent extends IUser {
    faculty: string
    major: string
    year: number
    coursesEnrolledIn: string[]
}


const StudentSchema = new Schema({
    ...UserSchema.obj,
    faculty: {type: String, default: ''},
    major: {type: String, default: ''},
    year: {type: Number, default: 0},
    coursesEnrolledIn: [{type: Schema.Types.ObjectId, ref: 'Course'}]
})

const Student = models.Student || model('Student', StudentSchema);

export default Student;