import { UploadButton } from "@/utils/uploadthing";
import { useState, Dispatch, SetStateAction } from "react";
import { useToast } from "../ui/use-toast";

interface PdfUploaderProps {
    setPdfUrls: Dispatch<SetStateAction<string[]>>;
}

export const PdfUploader: React.FC<PdfUploaderProps> = ({ setPdfUrls }) => {
    const [localPdfUrls, setLocalPdfUrls] = useState<string[]>([]);
    const {toast} = useToast();

    const handleUploadComplete = (res: { url: string }[]) => {
        const newUrl = res[0].url;
        setLocalPdfUrls(current => [...current, newUrl]);
        setPdfUrls(current => [...current, newUrl]); // pass data to the parent component
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
        <div>
            <UploadButton
                className="ut-button:bg-slate-600"
                endpoint="pdfUploader"
                onClientUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
            />
            <ul>
              {localPdfUrls.map((url, index) => <li key={index}>{url}</li>)}
            </ul>
        </div>
    );
};
