// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const API_KEY = process.env.GEMINI_API_KEY;

async function generateWebsiteInfo(prompt) {
  const body = {
    contents: [
      {
        parts: [{ text: `Generate a complete HTML website with CSS included in style tags based on this prompt: ${prompt}. 
        Include modern design, responsive layout, and proper HTML5 structure. 
        For images, use only these sources:
        - https://source.unsplash.com/random/
        - https://picsum.photos/
        - https://placehold.co/
        Make sure all image URLs are complete and valid. Return only valid HTML content.` }]
      }
    ]
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (response.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  } else {
    console.error('Gemini API error:', data);
    throw new Error(data.error?.message || 'Failed to generate content');
  }
}

function writeFile(filePath, content) {
  return fs.promises.writeFile(filePath, content);
}

function createZip(sourceDir, outPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => resolve());
    archive.on('error', err => reject(err));

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

app.post('/generate-website', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

    const htmlContent = await generateWebsiteInfo(prompt);
    
    // Create unique folder for this generation
    const timestamp = Date.now();
    const outDir = path.join(__dirname, 'generated', `website_${timestamp}`);
    const htmlPath = path.join(outDir, 'index.html');
    const zipPath = path.join(outDir, 'website.zip');

    // Ensure directory exists
    await fs.promises.mkdir(outDir, { recursive: true });

    // Write HTML file
    await writeFile(htmlPath, htmlContent);
    
    // Create ZIP file
    await createZip(outDir, zipPath);

    res.json({ 
      success: true, 
      message: 'Website generated successfully.', 
      download: `/download/${timestamp}/website.zip`,
      preview: htmlContent
    });
  } catch (error) {
    console.error('Error generating site:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update download endpoint to handle timestamped folders
app.get('/download/:timestamp/website.zip', (req, res) => {
  const { timestamp } = req.params;
  const file = path.join(__dirname, 'generated', `website_${timestamp}`, 'website.zip');
  res.download(file);
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
