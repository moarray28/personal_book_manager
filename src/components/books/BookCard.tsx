"use client";

import Button from "../ui/Button";

export interface Book {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  status: "WANT_TO_READ" | "READING" | "COMPLETED";
}

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const statusStyles = {
  WANT_TO_READ:
    "bg-gray-100 text-gray-700",

  READING:
    "bg-blue-100 text-blue-700",

  COMPLETED:
    "bg-green-100 text-green-700",
};

const statusLabels = {
  WANT_TO_READ: "Want To Read",
  READING: "Reading",
  COMPLETED: "Completed",
};

export default function BookCard({
  book,
  onEdit,
  onDelete,
}: BookCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-border
        bg-surface
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {book.title}
          </h2>

          <p className="mt-1 text-sm text-muted">
            {book.author}
          </p>
        </div>

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${statusStyles[book.status]}
          `}
        >
          {statusLabels[book.status]}
        </span>
      </div>

      {/* Tags */}

      {book.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="
                rounded-full
                bg-primary/10
                px-3
                py-1
                text-xs
                font-medium
                text-primary
              "
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}

      <div className="mt-6 flex gap-3">
        <Button
          variant="outline"
          onClick={() => onEdit(book)}
          className="flex-1"
        >
          Edit
        </Button>

        <Button
          variant="danger"
          onClick={() => onDelete(book._id)}
          className="flex-1"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}