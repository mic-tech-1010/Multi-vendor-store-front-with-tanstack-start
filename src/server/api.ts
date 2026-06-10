
const API_URL = "http://localhost:4000";

export async function api<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      credentials: 'include',

      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },

      ...options,
    }
  );

  if (!response.ok) {

    const error = await response.json();

    throw new Error(
      error.message || 'Request failed'
    );
  }

  return response.json();
}