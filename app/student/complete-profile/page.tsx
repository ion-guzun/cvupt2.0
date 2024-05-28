import {
    Command,
    CommandInput,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"; // Assuming these are your custom components
import { faculties } from "@/real_data"; // Assuming this is your data import
import Image from "next/image";

const CompleteProfile = () => {
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Command className="w-full max-w-lg shadow">
                <CommandInput placeholder="Choose a specialty..." />
                <CommandList>
                    {faculties.map((faculty) => (
                        <CommandGroup key={faculty.name} className="mb-4">
                            <div className="flex items-center mb-2">
                                <Image
                                    src={`/${faculty.name.toLowerCase()}.png`}
                                    alt={faculty.name}
                                    height={30}
                                    width={30}
                                    className="mr-2"
                                />
                                <span className="font-semibold text-lg">{faculty.name}</span>
                            </div>
                            {faculty.specialities.map((speciality) => (
                                <CommandItem className="px-5 py-1" key={speciality}>
                                    {speciality}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    ))}
                </CommandList>
            </Command>
        </div>
    );
};

export default CompleteProfile;
