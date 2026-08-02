"use client";

import { useEffect, useState } from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";
import { Book } from "./BookCard";

interface BookFormProps {
  initialData?: Book | null;
  onSubmit: (book: {
    title: string;
    author: string;
    tags: string[];
    status: "WANT_TO_READ" | "READING" | "COMPLETED";
  }) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function BookForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<
    "WANT_TO_READ" | "READING" | "COMPLETED"
  >("WANT_TO_READ");

  useEffect(() => {
    if (!initialData) return;

    setTitle(initialData.title);
    setAuthor(initialData.author);
    setTags(initialData.tags.join(", "));
    setStatus(initialData.status);
  }, [initialData]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSubmit({
      title: title.trim(),
      author: author.trim(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <Input
        id="title"
        label="Book Title"
        placeholder="Atomic Habits"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Input
        id="author"
        label="Author"
        placeholder="James Clear"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />

      <Input
        id="tags"
        label="Tags"
        placeholder="Self Help, Productivity"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <div className="space-y-2">
        <label
          htmlFor="status"
          className="text-sm font-medium text-foreground"
        >
          Status
        </label>

        <select
          id="status"
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as
                | "WANT_TO_READ"
                | "READING"
                | "COMPLETED"
            )
          }
          className="
            w-full
            rounded-xl
            border
            bg-white
            px-4
            py-3
            outline-none
            transition
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
          "
        >
          <option value="WANT_TO_READ">
            Want To Read
          </option>

          <option value="READING">
            Reading
          </option>

          <option value="COMPLETED">
            Completed
          </option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={loading}
        >
          {initialData ? "Update Book" : "Add Book"}
        </Button>
      </div>
    </form>
  );
}