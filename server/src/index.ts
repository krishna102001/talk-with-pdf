import express from "express";
import multer from "multer";
import cors from "cors";
import {
  handleChat,
  handleUploadfile,
  startClientServer,
} from "./routes/route";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello world");
});

const storage = multer.diskStorage({});

const upload = multer({ storage });
app.post("/upload/pdf", upload.single("file"), handleUploadfile);
app.post("/resume/chat", handleChat);

startClientServer();

app.listen(8080);
