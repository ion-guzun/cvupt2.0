import { UploadButton } from "@/utils/uploadthing";
import { useState, Dispatch, SetStateAction } from "react";
import { useToast } from "../ui/use-toast";
import Image from "next/image";

interface PdfUploaderProps {
    setPdfUrls: Dispatch<SetStateAction<string[]>>;
}

export const PdfUploader: React.FC<PdfUploaderProps> = ({ setPdfUrls }) => {
    const [localPdfUrls, setLocalPdfUrls] = useState<string[]>([]);
    const { toast } = useToast();

    const handleUploadComplete = (res: { url: string }[]) => {
        const newUrl = res[0].url;
        setLocalPdfUrls(current => [...current, newUrl]);
        setPdfUrls(current => [...current, newUrl]); // pass data to the parent component, (push the state up)
        toast({
            title: "PDF Uploaded Successfully",
            duration: 5000
        });
    };

    const handleUploadError = (error: { message: string }) => {
        toast({
            title: "Upload Unsuccessful",
            description: `${error.message}`,
            duration: 5000
        });
    };

    return (
        <div className="space-y-4 mt-4">
            <div className="flex flex-col items-center">
                <Image src='/pdf.svg' alt="PDF icon" width={50} height={50} />
                <UploadButton
                    className="ut-button:bg-slate-600 mt-2"
                    endpoint="pdfUploader"
                    onClientUploadComplete={handleUploadComplete}
                    onUploadError={handleUploadError}
                />
            </div>
            {localPdfUrls.length > 0 && (
                <div className="flex flex-wrap mt-4">
                    {localPdfUrls.map((url, index) => (
                        <div key={index} className="w-1/4 p-2">
                            <div className="border rounded-md overflow-hidden shadow-lg p-2 bg-gray-50">
                                <iframe
                                    src={url}
                                    width="100%"
                                    height="200"
                                    className="w-full h-[200px] border-none"
                                >
                                    This browser does not support PDFs. Please download the PDF to view it.
                                </iframe>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
