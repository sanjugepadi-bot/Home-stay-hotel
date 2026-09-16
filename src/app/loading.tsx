import { Leaf } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Leaf className="h-8 w-8 animate-pulse text-gold-deep" />
    </div>
  );
}
