 "use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/layout/Navbar";

import DashboardStats from "@/components/dashboard/DashboardStats";

import SearchBar from "@/components/books/SearchBar";
import FilterBar from "@/components/books/FilterBar";
import BookGrid from "@/components/books/BookGrid";
import BookModal from "@/components/books/BookModal";
import { Book } from "@/components/books/BookCard";

import Button from "@/components/ui/Button";
import { getCurrentUser } from "../../services/auth";

import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../../services/books";

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);

  const [userName, setUserName] = useState("Reader");

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");

  const [open, setOpen] = useState(false);

  const [selectedBook, setSelectedBook] =
    useState<Book | null>(null);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [user, fetchedBooks] = await Promise.all([
          getCurrentUser(),
          getBooks(),
        ]);

        setUserName(user.name);
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Failed to load dashboard:", error);

        setError(
          "Unable to load your dashboard. Please try again."
        );

        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const filteredBooks = books.filter((book) => {
    const searchTerm = search.toLowerCase().trim();

    const matchesSearch =
      book.title
        .toLowerCase()
        .includes(searchTerm) ||
      book.author
        .toLowerCase()
        .includes(searchTerm);

    const matchesStatus =
      status === "ALL" ||
      book.status === status;

    return matchesSearch && matchesStatus;
  });

  const totalBooks = books.length;

  const reading = books.filter(
    (book) => book.status === "READING"
  ).length;

  const completed = books.filter(
    (book) => book.status === "COMPLETED"
  ).length;

  const wantToRead = books.filter(
    (book) => book.status === "WANT_TO_READ"
  ).length;

  function handleAddBook() {
    setSelectedBook(null);
    setOpen(true);
  }

  function handleEdit(book: Book) {
    setSelectedBook(book);
    setOpen(true);
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteBook(id);

      setBooks((prev) =>
        prev.filter((book) => book._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete book:", error);

      setError(
        "Unable to delete the book. Please try again."
      );
    }
  }
    async function handleSubmit(data: {
  title: string;
  author: string;
  tags: string[];
  status:
    | "WANT_TO_READ"
    | "READING"
    | "COMPLETED";
}) {
  try {
    setSubmitting(true);
    setError("");

    if (selectedBook) {
      const updatedBook = await updateBook(
        selectedBook._id,
        data
      );

      setBooks((prev) =>
        prev.map((book) =>
          book._id === selectedBook._id
            ? updatedBook
            : book
        )
      );
    } else {
      const newBook = await createBook(data);

      setBooks((prev) => [
        newBook,
        ...prev,
      ]);
    }

    setOpen(false);
    setSelectedBook(null);
  } catch (error) {
    console.error("Failed to save book:", error);

    setError(
      "Unable to save the book. Please try again."
    );
  } finally {
    setSubmitting(false);
  }}

  return (
    <>
      <Navbar userName={userName} />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}

        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              My Library
            </h1>

            <p className="mt-2 text-muted">
              Manage and organize your books.
            </p>
          </div>

          <Button onClick={handleAddBook}>
            + Add Book
          </Button>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Stats */}

        <DashboardStats
          totalBooks={totalBooks}
          reading={reading}
          completed={completed}
          wantToRead={wantToRead}
        />

        {/* Search + Filter */}

        <div className="my-8 flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
            />
          </div>

          <FilterBar
            value={status}
            onChange={setStatus}
          />
        </div>

        {/* Loading */}

        {loading ? (
          <div className="flex min-h-60 items-center justify-center rounded-2xl border border-border bg-surface">
            <p className="text-muted">
              Loading your books...
            </p>
          </div>
        ) : (
          <BookGrid
            books={filteredBooks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddBook={handleAddBook}
          />
        )}

        {/* Add/Edit Modal */}

        <BookModal
          open={open}
          onClose={() => {
            if (submitting) {
              return;
            }

            setOpen(false);
            setSelectedBook(null);
          }}
          initialData={selectedBook}
          loading={submitting}
          onSubmit={handleSubmit}
        />
      </main>
    </>
  );
}