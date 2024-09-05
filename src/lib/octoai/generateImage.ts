"use server";

import { octoAIClient } from "@/lib/octoaiClient";

// Define the structure for the image generation result
interface ImageResult {
  image?: string; // Base64 encoded image data
  error?: string; // Error message if generation fails
  seed?: number; // Seed used for image generation
  duration?: number; // Time taken to generate the image
  prompt?: string; // User's input prompt
}

// Server action for generating an image
export async function generateImage(
  _: {}, // Unused parameter (prevState required for server actions)
  formData: FormData
): Promise<ImageResult> {
  // Extract the user's prompt from the form data
  const userPrompt = formData.get("userPrompt") as string;

  try {
    // Call OctoAI's Stable Diffusion 3 image generation API
    const imageResponse = await octoAIClient.imageGen.generateSd3({
      prompt: userPrompt,
      width: 1024,
      height: 1024,
      cfgScale: 5, // Controls how closely the image follows the prompt
      numImages: 1, // Number of images to generate
      steps: 16, // Number of denoising steps
    });

    // Extract the base64 encoded image from the response
    const image = imageResponse.images[0].imageB64;

    // Return the successful result
    return {
      image: image as string,
      seed: imageResponse.images[0].seed,
      duration: imageResponse.predictionTimeMs,
      prompt: userPrompt,
    };
  } catch (error) {
    // Return an error message if image generation fails
    return { error: "Failed to generate image" };
  }
}
