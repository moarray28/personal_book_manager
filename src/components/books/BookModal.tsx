"use client";

import { Book } from "./BookCard";
import BookForm from "./BookForm";
import Modal from "../ui/Modal";

interface BookModalProps {
  open: boolean;
  onClose: () => void;

  initialData?: Book | null;

  loading?: boolean;

  onSubmit: (book: {
    title: string;
    author: string;
    tags: string[];
    status: "WANT_TO_READ" | "READING" | "COMPLETED";
  }) => void;
}

export default function BookModal({
  open,
  onClose,
  initialData,
  loading = false,
  onSubmit,
}: BookModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        initialData
          ? "Edit Book"
          : "Add New Book"
      }
    >
      <BookForm
        initialData={initialData}
        loading={loading}
        onCancel={onClose}
        onSubmit={(data) => {
          onSubmit(data);
        }}
      />
    </Modal>
  );
}