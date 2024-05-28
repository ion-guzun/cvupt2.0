import { auth } from "@clerk/nextjs/server"
import { useRouter } from "next/navigation";

export const getUserObjectId = () => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;
    return userId;
}



