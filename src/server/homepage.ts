import { createServerFn } from "@tanstack/react-start";

const API_URL = "http://localhost:4000";
const BASE_URL = `${API_URL}/public/homepage`;

export const getHomepageGroups = createServerFn({ method: "GET" }).handler(async () => {
  const res = await fetch(BASE_URL);
   
  if (!res.ok) {
    throw new Error("Failed to fetch homepage data");
  }

  const json = await res.json();

  return json.data;
});