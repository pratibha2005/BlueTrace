// utils/aiSuggestions.js (CommonJS version)
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function getAISuggestions({ totalEmissions, vehicleType }) {
  try {
    console.log("🧠 Generating AI suggestion for:", totalEmissions, vehicleType);

    const prompt = `Suggest eco-friendly actions for ${Number(totalEmissions).toFixed(2)} kg CO2 emissions ...`;

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const message = response.choices?.[0]?.message?.content || 
      "Try carpooling, maintaining your vehicle regularly, and avoiding unnecessary trips to reduce emissions.";

    return message;

  } catch (error) {
    console.error("AI suggestion error:", error.message);
    return "Could not generate suggestions right now. Please try again later.";
  }
}

module.exports = { getAISuggestions };
