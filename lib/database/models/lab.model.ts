import { Schema, model, models } from "mongoose";

// export type CreateLabParams = {
//     name: string
//     labPdfs: string[]
// }

export interface ILab {
    _id?: string
    name: string
    courseRef: string
    teachers: string[]
    labPdfs: string[]
}

export const LabSchema = new Schema({
    name: {type: String, required: true},
    courseRef: {type: Schema.Types.ObjectId, ref: 'Course'},
    teachers: [{type: Schema.Types.ObjectId, ref: 'Teacher'}],
    labPdfs: {type: [String], required: true}
});

const Lab = models.Lab || model('Lab', LabSchema);

export default Lab;