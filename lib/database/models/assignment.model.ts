import { Schema, model, models } from "mongoose";

// export type CreateAssignmentParams = {
//     title: string
//     description: string
//     deadline: Date
//     maxGrade: number
// }

export interface IAssignment {
    _id?: string
    createdBy: string
    courseRef: string
    title: string
    description: string
    deadline: Date
    maxGrade: number
    createdAt: Date
}

export const AssignmentSchema = new Schema({
    createdBy: {type: Schema.Types.ObjectId, ref: 'Teacher'},
    courseRef: {type: Schema.Types.ObjectId, ref: 'Course'},
    title: {type: String, required: true},
    description: {type: String, required: true},
    deadline: {type: Date, required: true},
    maxGrade: {type: Number, required: true, min: 0},
    createdAt: {type: Date, default: Date.now()}
})

const Assignment = models.Assignment || model('Assignment', AssignmentSchema);

export default Assignment;