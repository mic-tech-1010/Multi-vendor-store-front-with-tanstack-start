import { createServerFn } from "@tanstack/react-start";
import { api } from "./api";


export const getHomepageGroups = createServerFn({ method: 'GET' }).handler(
  async () => {
    const response = await api<{ data: any[] }>('/public/homepage');
    return response.data;
  }
);