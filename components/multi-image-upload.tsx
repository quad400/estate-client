import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { FileCheck2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ImageUploadProps {
  values: string[];
  onChange: (images: string[]) => void;
}

const MultiImageUpload = ({ values, onChange }: ImageUploadProps) => {
  const [images, setImages] = useState<string[]>([...values]);

  useEffect(() => {
    setImages(values);
  }, [values]);

  console.log("Values", values);

  return (
    <div className="flex justify-start items-end space-x-3 flex-wrap">
      <UploadDropzone
        endpoint="imageUploader"
        appearance={{
          container: { height: "180px" },
          button: {
            accentColor: "black",
            backgroundColor: "black",
            padding: "15px 30px",
          },
        }}
        onClientUploadComplete={(res) => {
          onChange([...images, res?.[0].url]);
          setImages([...images, res?.[0].url]);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      <div className="flex flex-wrap justify-start space-x-2 items-center">
        {images.map((item, index) => (
          <div key={index} className="h-[150px] w-[150px] rounded-sm relative">
            <div className="h-[150px] w-[150px] relative">
              <Image
                src={item}
                alt={`${index}`}
                fill
                className="object-contain"
              />
            </div>
            <button
              className="flex items-center absolute top-0 right-0 justify-center bg-red-500 text-white rounded-full w-6 h-6"
              onClick={() => {
                setImages(images.filter((img) => img !== item));
                onChange(images.filter((img) => img !== item));
              }}
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiImageUpload;
