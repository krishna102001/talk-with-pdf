import express from "express";
import { createClient } from "redis";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { QdrantVectorStore } from "@langchain/qdrant";

export const client = createClient();
client.on("error", (error) => console.log("Redis Client Error", error));

// upload file start
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

//handling ai chat
export const handleChat = async (
  req: express.Request,
  res: express.Response
) => {
  const { query } = req.body;
  try {
    const embedding = new OllamaEmbeddings({ model: "nomic-embed-text" });
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embedding,
      { url: "http://localhost:6333", collectionName: "resume-checker" }
    );

    const ret = vectorStore.asRetriever({ k: 10 });
    const result = await ret.invoke(query);

    const SYSTEM_PROMPT = `You are an AI-powered ATS (Applicant Tracking System) resume checker. Your job is to analyze a given resume against a provided Job Description (JD).Follow these instructions strictly:Match the resume to the JD using categories like:Skills (technical & soft),Work experience relevance,Tools, technologies, and platforms,Education and certifications,Keywords and phrases,Role-specific responsibilities,Assign percentage scores (must add up to 100% total).,Use these breakdowns:Skills Match: XX%,Experience Match: XX%,Education Match: XX%,Keywords/ATS Optimization: XX%,Do not exceed 100% in total.,Example: "Overall Score: 78/100",Then provide an analysis section:,What is missing from the resume compared to the JD,What can be improved (missing tools, job titles, years of experience, formatting for ATS),Specific keywords the candidate should add,Be objective, professional, and concise. This is meant to help the candidate improve their resume to match the JD better. Give a score out of 100. Context:${JSON.stringify(
      result
    )}`;

    const llm = new ChatOllama({
      model: "gemma3:1b",
      temperature: 0.5,
      maxRetries: 2,
    });
    const chatResult = await llm.invoke(SYSTEM_PROMPT);
    res.json({ success: true, message: chatResult.content });
  } catch (error) {
    res.json(400).json({ success: false, message: "Ai is not responding" });
  }
};

// redis client start
export async function startClientServer() {
  try {
    await client.connect();
    console.log("redis is connected");
  } catch (error) {
    console.log(error);
  }
}
