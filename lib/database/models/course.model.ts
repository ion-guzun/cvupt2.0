import { Schema, model, models } from "mongoose";

export type CreateCourseParams = {
    name: string
    forMajor: string
    forYear: number
    forSemester: 1 | 2
    pdfs: string[]
    photo: string
}

export interface ICourse {
    _id: string
    name: string
    createdBy: string
    forMajor: string
    forYear: number
    forSemester: 1 | 2
    studentsEnrolledIn: string[]
    pdfs: string[]
    photo: string
}

export const CourseSchema = new Schema({
    name: {type: String, required: true},
    createdBy: {type: Schema.Types.ObjectId, ref: 'Teacher'},
    forMajor: {type: String, required: true},
    forYear: {type: Number, required: true},
    forSemester: {type: Number, required: true, enum: [1, 2]},
    studentsEnrolledIn: [{type: Schema.Types.ObjectId, ref: 'Student'}],
    pdfs: {type: [String], required: true},
    photo: {type: String, required: true},
})

const Course = models.Course || model('Course', CourseSchema);

export default Course;