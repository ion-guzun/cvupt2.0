import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { hasCompletedStudentProfile } from "@/lib/actions/student.actions";
import { getUserObjectId } from "@/helpers";


    
export const Header = async () => {
    
    const hasCompletedProfile = await hasCompletedStudentProfile(getUserObjectId());

    return (
        <header className="h-12 w-full border-b-2 border-slate-200 px-4 flex items-center justify-between">
            <div>
                <Image src='/cvuptro.png'
                    alt=''
                    width={100}
                    height={100}
                />
            </div>
            {!hasCompletedProfile && 
                <Link href='/student/complete-profile'>
                    <Button>Complete profile</Button>
                </Link>
            }
            <UserButton/>
        </header>
    );
};
