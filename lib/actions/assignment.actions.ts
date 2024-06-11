'use server'

import { connectToDatabase } from "../database";
import Assignment, { IAssignment } from "../database/models/assignment.model";

export async function createAssignment(assignment: IAssignment) {
    try {
        await connectToDatabase();
        const newAssignment = await Assignment.create(assignment);
        return JSON.parse(JSON.stringify(newAssignment));
    } catch (error) {
        console.log(error);
    }
}

export async function getStudentAssignmentsByCourse(courseRef: string) {
    try {
        await connectToDatabase();
        const assignments = await Assignment.find({courseRef});
        return JSON.parse(JSON.stringify(assignments));
    } catch (error) {
        console.log(error);
    }
}