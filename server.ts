import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Groq from "groq-sdk";
import { profileData } from "./src/data/profile";
import dotenv from "dotenv";

dotenv.config();

let groq: Groq | null = null;
try {
  if (process.env.GROQ_API_KEY) {
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
} catch (e) {
  console.warn("Groq SDK initialization failed.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Chat Route
  app.post("/api/chat", async (req, res) => {
    try {
      if (!groq) {
        return res.status(500).json({ error: "Groq is not configured. Please add GROQ_API_KEY to your environment variables." });
      }

      const { message, history = [] } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }
      
      const systemMessage = {
        role: "system",
        content: `You are an AI assistant for Aiman Uddin Siam's developer portfolio website. 
Your goal is to answer visitor questions based on Aiman's profile, experience, and projects.
Here is Aiman's profile data:
${JSON.stringify(profileData)}

Important Rules:
1. If the user wants to build a website or asks if you have experience in a specific domain, recommend relevant projects from the portfolio and provide their demo/github links.
2. ALWAYS provide the contact number +8801538288739 and mention they can reach out on WhatsApp.
3. Be professional, concise, and friendly. Answer in the language the user speaks (English or Bengali).`
      };

      // Map existing history to Groq format
      const formattedHistory = history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const messages = [
        systemMessage,
        ...formattedHistory,
        { role: 'user', content: message }
      ];

      const chatCompletion = await groq.chat.completions.create({
        messages: messages,
        model: "llama3-8b-8192", // Using Meta's fast and efficient Llama 3 on Groq
        temperature: 0.5,
        max_tokens: 1024,
      });

      res.json({ text: chatCompletion.choices[0]?.message?.content || "I couldn't process that right now." });
    } catch (error) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
