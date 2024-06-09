import { UserButton } from "@clerk/nextjs";
export const Header = () => {
    
    return (
        <header className="h-12 w-full border-b-2 border-slate-200 px-4 flex items-center justify-between bg-slate-50">
            <div>Header</div>
            <UserButton/>
        </header>
    );
};
