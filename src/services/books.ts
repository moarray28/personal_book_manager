import { Book } from "@/components/books/BookCard";

const BASE_URL = "/api/books";

export type BookInput = {
  title: string;
  author: string;
  tags: string[];
  status: "WANT_TO_READ" | "READING" | "COMPLETED";
};

export async function getBooks(): Promise<Book[]> {
  const response = await fetch(BASE_URL, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch books");
  }

  return data.books;
}

export async function createBook(book: BookInput): Promise<Book> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create book");
  }

  return data.book;
}

export async function updateBook(
  id: string,
  book: BookInput
): Promise<Book> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update book");
  }

  return data.book;
}

export async function deleteBook(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete book");
  }
}