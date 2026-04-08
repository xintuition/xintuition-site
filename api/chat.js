export default async function handler(req, res) {
  // Allow CORS (important)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "No message provided" });
    }

    // 🔥 REPLACE THIS WITH YOUR NGROK URL
    const COLAB_URL = "https://YOUR-NGROK-URL.ngrok.io/chat";

    const response = await fetch(COLAB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: message })
    });

    const data = await response.json();

    return res.status(200).json({
      reply: data.reply || "No response from AI"
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return res.status(500).json({
      reply: "AI is temporarily unavailable"
    });
  }
}
