import { Schema, model, models } from "mongoose";
import { UserSchema } from "./user.model";

const TeacherSchema = new Schema({
    ...UserSchema.obj,
    coursesCreated: [{type: Schema.Types.ObjectId, ref: 'Course'}]
})

const Teacher = models.Teacher || model('Teacher', TeacherSchema);

export default Teacher;