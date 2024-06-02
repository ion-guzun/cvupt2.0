import { auth } from "@clerk/nextjs/server"

export const getUserObjectId = () => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;
    return userId;
}





