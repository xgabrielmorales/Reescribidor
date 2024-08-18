import { OpenAI } from "openai";

const model = "gpt-4o-mini";
const client = new OpenAI({
  apiKey: "",
  dangerouslyAllowBrowser: true,
});

export const gptAssistant = async (options) => {
  return await client.chat.completions.create({
    ...options,
    model: model,
    stream: false,
  });
};
