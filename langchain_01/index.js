import { config } from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: process.env.GEMINI_API_kEY,
});

// prompt template
const prompt = PromptTemplate.fromTemplate(`
  explain {topic} in very simple way like ELI5,
  make sure to include the core concept and avoid unnecessary jargon.
  make the answar as consise as possible.
  `);

const chain = prompt.pipe(model);

chain.invoke({ topic: "express" }).then((res) => 
  console.log(res.content);
});
