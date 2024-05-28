import { UserButton } from "@clerk/nextjs";
import { CompleteProfileButton } from "./CompleteProfileButton";
import { hasMajorAndYear } from "@/lib/actions/student.actions";
import { getUserObjectId } from "@/helpers";
export const Header = async () => {
    
    const hasMnY = await hasMajorAndYear(getUserObjectId());

    return (
        <header className="h-16 w-full border-b-2 border-slate-200 px-4 flex items-center justify-between">
            <div>Header</div>
            {!hasMnY && <CompleteProfileButton/>}
            <UserButton/>
        </header>
    );
};
