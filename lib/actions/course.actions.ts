'use server'

import { getUserObjectId } from "@/helpers";
import { connectToDatabase } from "../database";
import Course, { CreateCourseParams } from "../database/models/course.model";

export async function createCourse(course: CreateCourseParams) {
    try {
        await connectToDatabase();

        const newCourse = await Course.create(course);
        return JSON.parse(JSON.stringify(newCourse));

    } catch (error) {
        console.log(error);
    }
}

export async function getStudentCourses(forMajor: string, forYear: number) {
    try {
        await connectToDatabase();

        const courses = await Course.find({forMajor, forYear});
        return JSON.parse(JSON.stringify(courses));
    } catch (error) {
        console.log(error);
    }
}

export async function getTeacherCreatedCourses() {

    try {
        await connectToDatabase();

        const courses = await Course.find({createdBy: getUserObjectId()});
        return JSON.parse(JSON.stringify(courses));
    } catch (error) {
        console.log(error);
    }
}