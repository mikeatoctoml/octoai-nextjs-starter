import { useState, useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button, Card, Input, Label } from "./ui";
import { CardContent } from "./ui/Card";

export function ChatInput() {
  const { pending } = useFormStatus();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pending) {
      setInput("");
    } else {
      inputRef.current?.focus();
    }
  }, [pending]);

  return (
    <Card className="fixed bottom-4 left-4 right-4 md-left:8 md:right:8">
      <CardContent className="pt-6 flex gap-4 w-full items-end">
        <div
          className={`flex flex-col w-full gap-2 ${
            pending ? "opacity-50" : "opacity-100"
          }`}
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
      </CardContent>
    </Card>
  );
}
