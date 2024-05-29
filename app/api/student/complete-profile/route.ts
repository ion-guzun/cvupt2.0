import { getUserObjectId } from "@/helpers";
import { connectToDatabase } from "@/lib/database";
import Student from "@/lib/database/models/student.model";
import { ICompleteStudentProfile } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const userObjectId = getUserObjectId();
    const formData: ICompleteStudentProfile = await req.json();
    const {faculty, major, year} = formData;

    try {
        await connectToDatabase();

        const updatedStudent = await Student.findByIdAndUpdate(userObjectId, 
            {faculty, major, year}, 
            {new: true}
        );
        if(!updatedStudent) {
            return new NextResponse('student not found', {status: 404})
        }
        console.log('updated student: ', updatedStudent);
        return new NextResponse('ok', {status: 200})

    } catch (error) {
        console.error('error updating student', error);
        return new NextResponse('interal server error', {status: 500})
    }

}