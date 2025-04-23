"use client";
import axios from "axios";
import { FileUp } from "lucide-react";
import { toast } from "sonner";

const FileUploadComponent = () => {
  const handleUpload = () => {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "file");
    inputElement.setAttribute("accept", "application/pdf");
    inputElement.click();
    inputElement.addEventListener("change", async (e: Event) => {
      console.log(e);
      try {
        const formData = new FormData();
        if (inputElement.files && inputElement.files.length > 0) {
          //   setPdfFile(inputElement.files[0]);
          formData.append("file", inputElement?.files[0] || "");
        }
        const { data } = await axios.post(
          "http://localhost:8080/upload/pdf",
          formData
        );
        if (data.success) {
          toast.success(data.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message || "Something went wrong");
        }

        console.error(error);
      }
    });
  };
  return (
    <div
      className='flex flex-col justify-center items-center cursor-pointer'
      onClick={handleUpload}
    >
      <FileUp size={50} />
      <h2 className='capitalize text-xl font-semibold'>
        Click to Upload the file
      </h2>
    </div>
  );
};

export default FileUploadComponent;
