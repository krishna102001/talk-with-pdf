import express from "express";
import { createClient } from "redis";

export const client = createClient();
client.on("error", (error) => console.log("Redis Client Error", error));

export const handleUploadfile = async (
  req: express.Request,
  res: express.Response
) => {
  const file = req.file;
  if (!file) {
    res.status(404).json({ success: false, message: "No file found!!" });
    return;
  }
  try {
    await client.lPush(
      "files",
      JSON.stringify({
        filename: req.file?.filename,
        destination: req.file?.destination,
        path: req.file?.path,
      })
    );
    res.status(200).json({
      success: true,
      message: "Successfully uploaded and added to queue!!",
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Failed to upload the file" });
  }
  console.log(file);
};

export async function startClientServer() {
  try {
    await client.connect();
    console.log("redis is connected");
  } catch (error) {
    console.log(error);
  }
}
