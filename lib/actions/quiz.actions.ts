'use server'

import { connectToDatabase } from "../database";
import { IQuiz, IQuizFeedback, Quiz, QuizFeedback } from "../database/models/quiz.models";

export async function createQuiz(quiz: IQuiz) {
    try {
        await connectToDatabase();

        const createdQuiz = await Quiz.create(quiz);
        return JSON.parse(JSON.stringify(createdQuiz));
    } catch (error) {
        console.log(error);
    }
}

export async function getQuizById(quizRef: string) {
    try {
        const quizz = await Quiz.findById(quizRef);
        return JSON.parse(JSON.stringify(quizz));
    } catch (error) {
        console.log(error);
    }
}

export async function getAllQuizesByCourse(courseRef: string) {
    try {
        await connectToDatabase();

        const exams = await Quiz.find({courseRef});
        return JSON.parse(JSON.stringify(exams));
    } catch (error) {
        console.log(error);
    }
}

export async function createQuizFeedback(quizFeedback: IQuizFeedback) {
    try {
        await connectToDatabase();

        const qFeedback = await QuizFeedback.create(quizFeedback);
        return JSON.parse(JSON.stringify(qFeedback));
    } catch (error) {
        console.log(error);
    }
}

export async function getQuizFeedbackById(quizFeedbackRef: string) {
    try {
        await connectToDatabase();

        const qFeedback = await QuizFeedback.findById(quizFeedbackRef);
        return JSON.parse(JSON.stringify(qFeedback));
    } catch (error) {
        console.log(error);
    }
}

export async function getQuizFeedbacksByQuiz(quizRef: string) {
    try {
        await connectToDatabase();

        const qFeedbacks = await QuizFeedback.find({quiz: quizRef});
        return JSON.parse(JSON.stringify(qFeedbacks));
    } catch (error) {
        console.log(error);
    }
}