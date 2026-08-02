export interface User {
  id: string;
  name: string;
  email: string;
}

export async function getCurrentUser(): Promise<User> {
  const response = await fetch("/api/auth/me", {
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  const data = await response.json();

  return data.user;
}