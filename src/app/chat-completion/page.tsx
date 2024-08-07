"use client";
import { useFormState, useFormStatus } from "react-dom";
import { chatCompletion } from "@/lib/octoai/chatCompletion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

function FormContent() {
  const { pending } = useFormStatus();

  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <Label>User Prompt</Label>
        <Input
          className=""
          placeholder="What would you like to say?"
          type="text"
          name="userPrompt"
          disabled={pending}
        />
      </div>
      <Button variant="secondary" disabled={pending}>
        Submit
      </Button>
    </>
  );
}

export default function Home() {
  const [state, formAction] = useFormState(chatCompletion, { messages: [] });

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-between py-24 px-4 md:px-8">
      <div className="w-full mb-8 overflow-y-auto grid">
        {state.messages.map((message, index) => (
          <Card
            key={index}
            className={`mb-4 max-w-[80%]  ${
              message.role === "user"
                ? "justify-self-end text-right"
                : "text-left"
            }`}
          >
            <CardContent className="pt-6">{message.content}</CardContent>
          </Card>
        ))}
      </div>
      <Card className="fixed bottom-4 left-4 right-4 md-left:8 md:right:8">
        <CardContent className="pt-6">
          <form action={formAction} className="flex gap-4 w-full items-end">
            <FormContent />
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
