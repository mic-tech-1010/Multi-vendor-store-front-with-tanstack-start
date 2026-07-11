import { createServerFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'

export type SessionUser = {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export type UserSession = {
  user: SessionUser
} | null

const API_URL = 'http://localhost:4000';

export const getUserSession = createServerFn({ method: 'GET' }).handler(async (): Promise<UserSession> => {

  const cookies = getRequestHeader('cookie') ?? ''

  const response = await fetch(`${API_URL}/api/auth/get-session`, {
    method: 'GET',
    headers: {
      'cookie': cookies,
    },
    credentials: 'include',
  })

  if (!response.ok) {
    return null
  }


  return response.json();
})