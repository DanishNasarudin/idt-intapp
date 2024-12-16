"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error);
    if (Object.keys(error).length > 0) {
      console.log(error.message);
      toast.error(`Error:${error.message}`);
      setMessage(error.message);
    }
  }, [error]);

  return (
    <div className="h-screen">
      <h2>Something went wrong!</h2>
      <p>Error: {message}</p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
