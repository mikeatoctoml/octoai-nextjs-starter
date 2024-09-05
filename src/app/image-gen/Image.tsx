import { Badge, Card, Skeleton } from "@/components/ui";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { useFormStatus } from "react-dom";

export const Image = ({ state }: { state: any }) => {
  const { pending } = useFormStatus();

  if (pending) return <Skeleton className="w-full aspect-square" />;
  if (!state.image)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Image Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Enter a prompt in the input field below to generate an image. The generated image will be displayed here
            along with metadata such as the seed used and generation duration.
          </p>
          <p className="mb-4">
            This component can be found in <code>src/app/image-gen/page.tsx</code>.
          </p>
          <p className="mb-4">
            The image generation is handled by the <code>generateImage</code> function in{" "}
            <code>src/lib/octoai/generateImage.ts</code>.
          </p>
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardContent className="pt-6">
        <img
          className="w-full aspect-square object-contain rounded-sm"
          src={`data:image/png;base64,${state.image}`}
          alt="Generated Image"
        />
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-4">
          <div className="text-muted-foreground px-4 py-4 border border-muted rounded-sm">{state.prompt}</div>
          <div className="flex gap-2">
            <Badge variant="secondary">Seed: {state.seed}</Badge>
            <Badge variant="secondary">
              Duration: {typeof state.duration === "number" ? `${(state.duration / 1000).toFixed(2)}s` : "N/A"}
            </Badge>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
