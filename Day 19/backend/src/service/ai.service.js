const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
  const contents = [
    {
      // inline image data ka use kar rahe hai
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    // and ai ko bol rahe ki caption generate karke de do
    { text: "Caption this image." },
  ];

  // ye kar kya raha hai vo imp hai kaise kar raha hai vo hamein nahi samjhna hai
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents, // jo hamere contents array ke pass  jo data hai vo ai ko pass kar rahe hai
    config:{
      systemInstruction:`
      you are an expert in generating captions for images.
      you generate single caption for the image.
      you caption should be short and concise.
      you use hastags and emojis in the caption.      `
      
    }
  });
  // jo bhi ai se response aaya use return kar rahe hai
  return response.text;
}

module.exports = generateCaption;
