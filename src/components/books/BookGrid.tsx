"use client";

import BookCard, { Book } from "./BookCard";
import EmptyState from "./EmptyState";

interface BookGridProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  onAddBook: () => void;
}

export default function BookGrid({
  books,
  onEdit,
  onDelete,
  onAddBook,
}: BookGridProps) {
  if (books.length === 0) {
    return (
      <EmptyState
        onAddBook={onAddBook}
      />
    );
  }

  return (
    <section
      className="
        grid
        gap-6
        sm:grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}