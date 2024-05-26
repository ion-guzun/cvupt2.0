import { Schema, model, models } from "mongoose";

export const CourseSchema = new Schema({
    name: {type: String, required: true},
    createdBy: {type: Schema.Types.ObjectId, ref: 'Teacher'},
    forMajor: {type: String, required: true},
    forYear: {type: Number, required: true},
    forSemester: {type: Number, required: true},
    studentsEnrolledIn: [{type: Schema.Types.ObjectId, ref: 'Student'}],
    pdfs: {type: [String], required: true},
    photo: {type: String, required: true},
})

const Course = models.Course || model('Course', CourseSchema);

export default Course;