"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({ error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <p>Please search for a new summoner</p>
    </div>
  );
}
