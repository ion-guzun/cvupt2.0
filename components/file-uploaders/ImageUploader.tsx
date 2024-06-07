'use client'
import { UploadButton } from "@/utils/uploadthing";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "../ui/use-toast";

type ImageUploaderProps = {
  imageUrl: string | undefined
  onFieldChange: (value: string) => void
  setFiles: Dispatch<SetStateAction<File[]>>  
}

export const ImageUploader = ({imageUrl, onFieldChange, setFiles}: ImageUploaderProps) => {
  const {toast} = useToast();

  return (
    
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res && res.length > 0) {
            const fileUrl = res[0].url;
            onFieldChange(fileUrl);
            toast({
              title: "Image uploaded succesfully",
              duration: 5000
            });
          }
        }}
        onUploadError={(error: Error) => {
          toast({
            title: "image uploaded unsuccesfully",
            variant: "destructive",
            duration: 5000
          });
        }}
      />
  );
}
