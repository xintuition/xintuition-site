// /api/chat.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No message provided" });

    // Make a chat completion call
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful luxury real estate AI assistant." },
        { role: "user", content: message }
      ],
      temperature: 0.7
    });

    const reply = response.choices?.[0]?.message?.content || "Sorry, no response.";
    return res.status(200).json({ reply });

  } catch (err) {
    console.error("OpenAI API Call Failed:", err);
    return res.status(500).json({ error: "Internal server error", details: err.message || err });
  }
}
