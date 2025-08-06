const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: "",
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "AIzaSyAndwrF4Vcncxj-CqUTPSBNg2A-Jwi9VFQ",
  });
  console.log(response.text);
}

main();
