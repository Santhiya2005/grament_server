
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import express from 'express';

// Fix __dirname for ES Modules
const __dirname = new URL('.', import.meta.url).pathname;

// Define the path to the 'uploads' directory inside the 'server' folder
const uploadDir = path.join(__dirname, 'uploads');  // Ensures 'uploads' is in the server folder

// Ensure the 'uploads' directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();

// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

app.post('/upload/image', upload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = path.join(uploadDir, `${Date.now()}_${req.file.originalname}`);
  fs.writeFileSync(filePath, req.file.buffer);

  return res.json({
    message: 'Image uploaded successfully',
    data: { url: filePath },
  });
});

export default app;




