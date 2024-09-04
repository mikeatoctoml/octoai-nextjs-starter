import { useFormStatus } from "react-dom";
import { Card, Skeleton } from "./ui";
import { CardContent } from "./ui/Card";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatContentProps = {
  children: React.ReactNode;
  messages: Message[];
};

export function ChatContent({ children, messages }: ChatContentProps) {
  const { pending } = useFormStatus();
  if (messages.length === 0 && !pending) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <div className="h-full w-full">
      <div className="w-full mb-8 overflow-y-auto grid">
        {messages.map((message, index) => (
          <Card
            key={index}
            className={`mb-4 max-w-[80%] ${
              message.role === "user"
                ? "justify-self-end text-right"
                : "text-left"
            }`}
          >
            <CardContent className="pt-6">{message.content}</CardContent>
          </Card>
        ))}
      </div>
      {pending && (
        <div className="flex flex-col h-full">
          <Skeleton className="w-2/3 h-10 mb-4 self-end" />
          <Skeleton className="w-2/3 h-40" />
        </div>
      )}
    </div>
  );
}
