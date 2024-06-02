import { UserButton } from "@clerk/nextjs";
import { CompleteProfileButton } from "./CompleteProfileButton";
import { hasCompletedStudentProfile } from "@/lib/actions/student.actions";
import { getUserObjectId } from "@/helpers";
export const Header = async () => {
    
    const hasCompleted = await hasCompletedStudentProfile(getUserObjectId());

    return (
        <header className="h-12 w-full border-b-2 border-slate-200 px-4 flex items-center justify-between">
            <div>Header</div>
            {!hasCompleted && <CompleteProfileButton/>}
            <UserButton/>
        </header>
    );
};
