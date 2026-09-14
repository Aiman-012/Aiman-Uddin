import type { VercelRequest, VercelResponse } from "@vercel/node";
import Groq from "groq-sdk";
import { profileData } from "../src/data/profile.js";

let groq: Groq | null = null;
try {
  if (process.env.GROQ_API_KEY) {
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
} catch (e) {
  console.warn("Groq SDK initialization failed.");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!groq) {
      return res.status(500).json({
        error: "Groq is not configured. Please add GROQ_API_KEY to your Vercel project's Environment Variables.",
      });
    }

    const { message, history = [] } = req.body ?? {};

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemMessage = {
      role: "system" as const,
      content: `You are an AI assistant for Aiman Uddin Siam's developer portfolio website.
Your goal is to answer visitor questions based on Aiman's profile, experience, and projects.
Here is Aiman's profile data:
${JSON.stringify(profileData)}

Important Rules:
1. If the user wants to build a website or asks if you have experience in a specific domain, recommend relevant projects from the portfolio and provide their demo/github links.
2. ALWAYS provide the contact number +8801538288739 and mention they can reach out on WhatsApp.
3. Be professional, concise, and friendly. Answer in the language the user speaks (English or Bengali).
4. CRITICAL: Always format all URLs, emails, and phone numbers as Markdown links so they are clickable. For example: [+8801538288739](tel:+8801538288739), [Email](mailto:ausiaam54@gmail.com), or [GitHub](https://github.com/...).`,
    };

    const formattedHistory = history.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    const messages = [systemMessage, ...formattedHistory, { role: "user" as const, content: message }];

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "openai/gpt-oss-20b",
      temperature: 0.5,
      max_tokens: 1024,
    });

    res.json({ text: chatCompletion.choices[0]?.message?.content || "I couldn't process that right now." });
  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: "Failed to process chat message" });
  }
}