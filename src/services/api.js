export const getRandomQuote = async () => {
  const response = await fetch("https://api.quotable.io/random");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};
