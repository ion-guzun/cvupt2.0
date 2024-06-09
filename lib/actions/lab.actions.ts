'use server';

import { connectToDatabase } from "../database";
import Lab, { ILab } from "../database/models/lab.model";

export async function createLab(lab: ILab) {
    try {
        await connectToDatabase();

        const newLab = await Lab.create(lab);
        return JSON.parse(JSON.stringify(newLab));
    } catch (error) {
        console.log(error);
    }
}

export async function getLabsByCourse(courseRef: string) {
    try {
        await connectToDatabase();

        const labs = await Lab.find({courseRef});
        return JSON.parse(JSON.stringify(labs));
    } catch (error) {
        console.log(error);
    }
}