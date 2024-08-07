import { Message } from "@/app/page";
import { octoAIClient } from "@/lib/octoaiClient";

interface SummarizeResult {
  summary: string;
  error?: string;
}

export async function summarizeChat(
  currentChat: Message[]
): Promise<SummarizeResult> {
  try {
    const chatResponse = await octoAIClient.textGen.createChatCompletion({
      model: "meta-llama-3.1-8b-instruct",
      maxTokens: 256,
      messages: [
        {
          role: "system",
          content:
            "Your goal is to summarize the current chat history to feed as a context to the next iteration of a chat completion for an LLM. Do not include a status of the context so far, just provide a summary of key details that would be relevant for continuing the conversation",
        },
        {
          role: "user",
          content: JSON.stringify(currentChat),
        },
      ],
    });
    const responseMessage = chatResponse.choices[0].message.content;
    return { summary: responseMessage as string };
  } catch (error) {
    return { summary: "", error: "Failed to summarize chat" };
  }
}
