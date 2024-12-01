"use client"; // Error boundaries must be Client Components

import { useEffect, useState } from "react";

export default function Error({ error }) {
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    // Log the error to an error reporting service
    setErrorMessage(error.message);
    console.log("digest", error.digest);
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{errorMessage}</p>
      <p>Please search for a new summoner</p>
    </div>
  );
}
