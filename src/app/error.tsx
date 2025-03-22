"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
      <p className="mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
}