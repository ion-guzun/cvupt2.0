import { UserButton } from "@clerk/nextjs";

export const Header = () => {
    return (
        <header className="h-16 w-full border-b-2 border-slate-200 px-4 flex items-center justify-between">
            <div>Header</div>
            <UserButton/>
        </header>
    );
};
