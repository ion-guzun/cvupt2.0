import { auth } from "@clerk/nextjs/server"

export const getUserObjectId = () => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;
    return userId;
}

export const isStudent = () => {
    const {sessionClaims} = auth();
    const userType = sessionClaims?.userType as string;
    return userType === 'student';
}

export const isTeacher = () => {
    const {sessionClaims} = auth();
    const userType = sessionClaims?.userType as string;
    return userType === 'teacher';
}

export const isUnauthorized = () => {
    const {sessionClaims} = auth();
    const userType = sessionClaims?.userType as string;
    return userType !== 'student' && userType !== 'teacher';
}












