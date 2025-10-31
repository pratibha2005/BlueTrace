// utils/aiSuggestions.js
const OpenAI = require("openai");

// Initialize OpenAI client using your environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate AI suggestions based on emission data
 */
async function getAISuggestions({ totalEmissions, vehicleType }) {
  // Default fallback suggestion
  let suggestion =
    "Try carpooling, maintaining your vehicle regularly, and avoiding unnecessary trips to reduce emissions.";

  try {
    // Build prompt for OpenAI
    const prompt = `
You are an eco-awareness assistant. 
A user just generated ${Number(totalEmissions).toFixed(2)} kg of CO₂ using a ${vehicleType}.
Provide 2-3 practical and friendly tips to reduce carbon emissions for future trips.
Keep the tone short, positive, and actionable.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful environmental assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 80,
      temperature: 0.7,
    });

    // Extract the AI's suggestion
    const aiMessage = response.choices?.[0]?.message?.content?.trim();

    if (aiMessage) suggestion = aiMessage;
  } catch (error) {
    console.error("AI suggestion error:", error.message);
  }

  return suggestion;
}

module.exports = { getAISuggestions };
