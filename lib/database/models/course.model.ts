import { Schema, model, models } from "mongoose";

export type CreateCourseParams = {
    name: string
    forFaculty: string
    forMajor: string
    forYear: number
    forSemester: number
    pdfs?: string[]
    photo: string | undefined
    startDate: Date
    endDate: Date
}

export interface ICourse {
    _id: string
    name: string
    createdBy: string
    forFaculty: string
    forMajor: string
    forYear: number
    forSemester: number
    studentsEnrolledIn: string[]
    pdfs?: string[]
    photo: string
    startDate: Date
    endDate: Date
}

export const CourseSchema = new Schema({
    name: {type: String, required: true},
    createdBy: {type: Schema.Types.ObjectId, ref: 'Teacher'},
    forFaculty: {type: String, required: true},
    forMajor: {type: String, required: true},
    forYear: {type: Number, required: true},
    forSemester: {type: Number, required: true, enum: [1, 2]},
    studentsEnrolledIn: [{type: Schema.Types.ObjectId, ref: 'Student'}],
    pdfs: {type: [String], required: true},
    photo: {type: String, required: true},
    startDate: {type: Date, default: Date.now()},
    endDate: {type: Date, default: Date.now()}
})

const Course = models.Course || model('Course', CourseSchema);

export default Course;