import { createClient } from "redis";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const client = createClient();

const handlePdfLoadData = async (pdfFile: {
  filename: string;
  destination: string;
  path: string;
}) => {
  console.log("Processing started");
  try {
    const loader = new PDFLoader(pdfFile.path);
    const docs = await loader.load();
    console.log(docs[0]);
  } catch (error) {
    console.log(error);
  }
};

export async function GetData() {
  try {
    await client.connect();
    console.log("redis worker client connected");
    while (true) {
      //   console.log("print huva");
      const fileData = await client.brPop("files", 0);
      const data = fileData?.element;
      const pdfFile = JSON.parse(data || "");
      handlePdfLoadData(pdfFile);
      console.log(pdfFile);
    }
  } catch (error) {
    console.log(error);
  }
}

GetData();
