import { OpenAI } from "openai";

const MODEL = "gpt-4o-mini";
const client = new OpenAI({
  apiKey:"",
  dangerouslyAllowBrowser: true
});

export const gptAssistant = async (messages) => {
  return await client.chat.completions.create({
    messages: messages,
    model: MODEL,
    stream: false,
  });
};
