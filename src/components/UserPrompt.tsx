import { useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button, Card, Input } from "./ui";
import { CardContent } from "./ui/Card";

export function UserPrompt() {
  const { pending } = useFormStatus();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!pending && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [pending]);

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8">
      <CardContent className="pt-6 flex w-full items-end">
        <Input
          className="flex-grow rounded-r-none"
          ref={inputRef}
          placeholder="User prompt"
          type="text"
          name="userPrompt"
          disabled={pending}
        />
        <Button
          variant="secondary"
          disabled={pending}
          className="rounded-l-none"
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}
