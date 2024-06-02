'use server'

import { connectToDatabase } from "../database";
import Course, { CreateCourseParams } from "../database/models/course.model";

export async function createCourse(course: CreateCourseParams) {
    try {
        await connectToDatabase();

        const newCourse = await Course.create(course);
        return JSON.parse(JSON.stringify(newCourse));

    } catch (error) {
        
    }
}