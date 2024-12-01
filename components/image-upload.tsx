import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { FileCheck2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ImageUploadProps {
  onChange: (url?: string) => void;
  value: string;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-40 w-40">
        <Image
          fill
          src={value}
          alt="Upload"
          className="object-cover rounded-full"
        />
        <button
          onClick={() => onChange("")}
          type="button"
          className="bg-rose-500 text-white p-1.5 rounded-full absolute -top-1 -right-1 shadow-sm"
        >
          <X className="h-5 w-5 " />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint="imageUploader"
      
      appearance={{ container: { height: "180px" },button: {
        accentColor: "black",
        backgroundColor: "black",
        padding: "15px 30px"
      } }}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default ImageUpload;
