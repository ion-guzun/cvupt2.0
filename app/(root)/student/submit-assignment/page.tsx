'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { uploadFiles } from "@/lib/actions/submission.actions";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

interface SubmitAssignmentFormProps {
    assignmentRef: string;
}

const SubmitAssignmentForm: React.FC<SubmitAssignmentFormProps> = ({ assignmentRef }) => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await uploadFiles(formData);
    const message = result?.message ?? "An error occurred";
    
    toast({
      title: message,
      duration: 5000
    });

    if (result?.success) {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4 bg-white p-8"
      >
        <Image 
          src='/zip-folder.svg'
          alt="Zip Folder"
          width={128}
          height={128}
        />
        <div className="border border-gray-300 rounded-md p-2">
          <input 
            name="files" 
            type="file" 
            multiple 
            className="cursor-pointer rounded-md border-0 p-2 text-sm font-semibold text-blue-700 w-full"
          />
        </div>
        <div className="flex space-x-4">
          <Button type="submit" className="w-40 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            Upload
          </Button>
          <Link href='/'>
              <Button className="w-40 bg-gray-600">Back to dashboard</Button>
          </Link>
        </div>
        <Separator />
        <p className="text-xs">All the files should be placed in a zip folder before uploading.</p>
      </form>
    </div>
  );
};

export default SubmitAssignmentForm;
