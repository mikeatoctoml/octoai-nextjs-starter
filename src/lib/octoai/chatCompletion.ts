"use server";

import { octoAIClient } from "@/lib/octoaiClient";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatState {
  messages: Message[];
}

export async function chatCompletion(
  _: ChatState,
  formData: FormData
): Promise<ChatState> {
  const userPrompt = formData.get("userPrompt") as string;

  const chatResponse = await octoAIClient.textGen.createChatCompletion({
    model: "meta-llama-3.1-8b-instruct",
    maxTokens: 128,
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant.`,
      },
      { role: "user", content: userPrompt },
    ],
  });

  const responseMessage = chatResponse.choices[0].message.content;
  if (!responseMessage) {
    throw "Invalid response from LLM";
  }

  return {
    messages: [
      { role: "user", content: userPrompt },
      { role: "assistant", content: responseMessage },
    ],
  };
}
