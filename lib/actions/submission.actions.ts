'use server'

import { getUserObjectId } from "@/helpers";
import { connectToDatabase } from "../database";
import Submission, { ISubmission } from "../database/models/submission.model";
import { utapi } from "@/server/uploadthing";
import { currentStudent } from "./student.actions";
import Student, { IStudent } from "../database/models/student.model";

export async function createStudentSubmition(submission: ISubmission) {
    try {
        await connectToDatabase();
        const submittedData = await Submission.create(submission);
        return submittedData; //bc we dont need to parse the json twice
    } catch (error) {
        console.log(error);
    }
}

export async function uploadFiles(formData: FormData) {
    const files = formData.getAll("files");
    //@ts-ignore
    const response = await utapi.uploadFiles(files);
    if (response) {
        const submission: ISubmission = {
            // assignmentRef: '',
            studentRef: getUserObjectId(),
            submittedFileUrl: response[0].data?.url!,
            status: 'Submitted'
        };

        try {
            const createdSubmission = await createStudentSubmition(submission);
            if (createdSubmission) {
                const createdSubmissionJSON = JSON.parse(JSON.stringify(createdSubmission));
                console.log(`student with id: ${getUserObjectId()} submitted: `, createdSubmissionJSON);
                return {
                    success: true,
                    message: "Folder uploaded successfully"
                };
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Error during submission"
            };
        }
    }
}

export async function getSubmissionsByAssignment(assignmentRef: string) {
    try {
        await connectToDatabase();

        const submissions = await Submission.find({assignmentRef});
        return JSON.parse(JSON.stringify(submissions));
    } catch (error) {
        console.log(error);
    }
}

export async function hasSubmitted() {
    try {
        await connectToDatabase();

        const allSubmissions: ISubmission[] = await Submission.find();
        const student: IStudent | null = await Student.findById(getUserObjectId());

        const allSubmissionsObjectIds: string[] = [];
        for(const submission of allSubmissions) {
            allSubmissionsObjectIds.push(submission._id!);
        }

        if(allSubmissionsObjectIds.find(submissionId => submissionId === student?._id)) {
            return true;
        } return false;

    } catch (error) {
        console.log(error);
    }
}