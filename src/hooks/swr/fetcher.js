export const fetcher = async (...args) => {
  const res = await fetch(...args);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    console.error("Fetch error:", error.info);
    throw error;
  }
  return res.json();
};
