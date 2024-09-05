"use server";

// Import the OctoAI client
import { octoAIClient } from "@/lib/octoaiClient";

// Define the structure for a chat message
export interface Message {
  role: "user" | "assistant";
  content: string;
}

// Define the structure for the chat state
export interface ChatState {
  messages: Message[];
}

// Server action for handling chat completion
export async function chatCompletion(
  _: ChatState, // Unused parameter (prevState required for server actions)
  formData: FormData
): Promise<ChatState> {
  // Extract the user's prompt from the form data
  const userPrompt = formData.get("userPrompt") as string;

  // Call OctoAI's chat completion API
  const chatResponse = await octoAIClient.textGen.createChatCompletion({
    model: "meta-llama-3.1-8b-instruct", // Specify the model to use
    maxTokens: 128, // Limit the response length
    messages: [
      {
        role: "system", // Set the AI's role
        content: `You are a helpful assistant.`,
      },
      {
        role: "user", // Add the user's prompt
        content: userPrompt,
      },
    ],
  });

  // Extract the AI's response from the API result
  const responseMessage = chatResponse.choices[0].message.content;
  if (!responseMessage) {
    throw "Invalid response from LLM";
  }

  // Return the updated chat state with new messages
  return {
    messages: [
      { role: "user", content: userPrompt },
      { role: "assistant", content: responseMessage },
    ],
  };
}
