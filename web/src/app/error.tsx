"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Optional: report to an error service
    // console.error(error);
  }, [error]);

  return (
    <div className="container-px section">
      <h1 className="text-2xl md:text-3xl font-semibold">Something went wrong</h1>
      <p className="text-sm text-muted-foreground mt-2">We hit an unexpected error. You can try again.</p>
      <button onClick={reset} className="mt-4 px-5 py-2.5 rounded-full bg-primary text-primary-foreground">Try again</button>
    </div>
  );
}


