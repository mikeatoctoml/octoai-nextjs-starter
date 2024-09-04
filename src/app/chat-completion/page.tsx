"use client";

import { useFormState, useFormStatus } from "react-dom";
import { chatCompletion } from "@/lib/octoai/chatCompletion";
import { Card, CardContent } from "@/components/ui/Card";
import { ChatInput } from "@/components/ChatInput";
import { ChatContent } from "@/components/ChatContent";
import { useEffect, useRef } from "react";

export default function Home() {
  const [state, formAction] = useFormState(chatCompletion, { messages: [] });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-between py-24 px-4 md:px-8">
      <form action={formAction} className="w-full">
        <ChatContent messages={state.messages}>
          <h2 className="text-3xl font-bold tracking-tight mb-4">Hello!</h2>
          <p className="mb-4">
            This chat completions example takes a single user input and returns
            a response from the model. For this example, we default to using
            Meta's Llama 3.1 8b model.
          </p>
          <p className="mb-4">
            This file can be found in the <b>app/chat-completion/page.tsx</b>
          </p>
          <p className="mb-4">
            The form submits a form action to
            <b>lib/octoai/chatCompletion.ts</b>
          </p>
        </ChatContent>

        <div ref={messagesEndRef} />
        <ChatInput />
      </form>
    </main>
  );
}
