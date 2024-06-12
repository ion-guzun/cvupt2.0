import { Schema, model, models } from "mongoose";


export interface ISubmission {
    _id?: string
    assignmentRef?: string
    studentRef?: string
    submittedFileUrl: string
    grade?: number
    submittedTime?: Date
    status?: string
}

export const SubmissionSchema = new Schema({
    assignmentRef: {type: Schema.Types.ObjectId, ref: 'Assignment'},
    studentRef: {type: Schema.Types.ObjectId, ref: 'Student'},
    submittedFileUrl: {type: String, default: ''},
    grade: {type: Number, min: 0, default: 0},
    submittedTime: {type: Date, default: Date.now()},
    status: {
        type: String, 
        enum: ['Submitted', 'Not Submitted', 'Graded'], 
        default: 'Not Submitted'
    }
})

const Submission = models.Submission || model('Submission', SubmissionSchema);

export default Submission;