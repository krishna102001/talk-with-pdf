import ChatComponent from "@/components/chat";
import FileUploadComponent from "@/components/file-upload";

export default function Home() {
  return (
    <div className='min-h-screen w-screen flex '>
      <div className='w-[40vw] border-r-1 border-black/50 flex justify-center items-center'>
        <FileUploadComponent />
      </div>
      <div className='w-[60vw]'>
        <ChatComponent />
      </div>
    </div>
  );
}
