// server.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";
import ffmpeg from "fluent-ffmpeg";


dotenv.config();


const MODE = process.env.MODE || "demo"; // demo or provider
const PORT = process.env.PORT || 3000;


const app = express();
app.use(cors());
app.use(express.static(path.join(process.cwd(), "public")));


const upload = multer({ dest: "uploads/" });


// Helper: ensure upload dir
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("output")) fs.mkdirSync("output");


app.post("/generate", upload.single("image"), async (req, res) => {
try {
if (!req.file) return res.status(400).json({ error: "No image uploaded" });


const inputPath = req.file.path;
const outputName = `video_${Date.now()}.mp4`;
const outputPath = path.join("output", outputName);


if (MODE === "demo") {
// DEMO: generate a simple Ken Burns effect video (pan + zoom) using ffmpeg
// Requirements: ffmpeg must be installed on the system and available in PATH.


// Build ffmpeg command: show image for 6 seconds, apply zoompan and fade
// Note: fluent-ffmpeg uses filter_complex for complex filters


const duration = 6; // seconds


// Resize to 720p and apply zoompan animation
ffmpeg()
.input(inputPath)
.loop(duration)
.outputOptions([
`-vf scale=1280:720,zoompan=z='zoom+0.0007':d=125`,
`-t ${duration}`,
`-pix_fmt yuv420p`,
`-r 30`
])
.on("start", (cmd) => console.log("FFmpeg start:", cmd))
.on("error", (err, stdout, stderr) => {
console.error("FFmpeg error", err.message);
console.error(stderr);
res.status(500).json({ error: "Video generation failed", details: err.message });
})
.on("end", () => {
// send file
res.sendFile(path.resolve(outputPath), {}, (err) => {
// cleanup
try { fs.unlinkSync(inputPath); } catch(e){}
try { fs.unlinkSync(outputPath); } catch(e){}
});
})
.save(outputPath);


return;
}


// PROVIDER mode (stub): show where to implement real API call
// Example: call external API, upload the imageBuffer, receive videoBuffer, then send it back
// This is a placeholder — implement provider-specific authentication and request format.


if (MODE === "provider") {
// Read the file to buffer
const imageBuffer = fs.readFileSync(inputPath);


// PSEUDO: replace with real provider request
// const response = await fetch("https://api.your-provider.com/generate", { ... });
// const videoBuffer = await response.arrayBuffer();


// For now return 501
});
