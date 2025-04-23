import { createClient } from "redis";

const client = createClient();
export async function GetData() {
  try {
    await client.connect();
    console.log("redis worker client connected");
    while (true) {
      //   console.log("print huva");
      const fileData = await client.brPop("files", 0);
      const data = fileData?.element;
      const pdfFile = JSON.parse(data || "");
      console.log(pdfFile);
    }
  } catch (error) {
    console.log(error);
  }
}

GetData();
