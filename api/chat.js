import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).end();
  const { question } = req.body;

  const listings = [
    { title:"1557 Andrew Hills Ct", price:"$529,000" },
    { title:"1368 Low Water Way", price:"$429,000" }
  ];

  const prompt = `You are a luxury real estate AI assistant.
User asked: "${question}"
Respond in friendly tone.
Include HTML preview of the first listing.
Listings: ${JSON.stringify(listings)}
`;

  const aiResponse = await openai.chat.completions.create({
    model:"gpt-4-turbo",
    messages:[{role:"user", content:prompt}]
  });

  const previewHTML=`<strong>${listings[0].title}</strong><br>${listings[0].price}`;

  res.status(200).json({answer:aiResponse.choices[0].message.content, previewHTML});
}
