import Button from "../ui/Button";

interface EmptyStateProps {
  onAddBook: () => void;
}

export default function EmptyState({
  onAddBook,
}: EmptyStateProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-border
        bg-surface
        px-8
        py-20
        text-center
      "
    >
      <div
        className="
          mb-6
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-primary/10
          text-4xl
        "
      >
        📚
      </div>

      <h2 className="text-2xl font-semibold text-foreground">
        No books yet
      </h2>

      <p className="mt-3 max-w-md text-muted">
        Your personal library is empty.
        Add your first book to begin tracking
        your reading journey.
      </p>

      <div className="mt-8">
        <Button onClick={onAddBook}>
          + Add Your First Book
        </Button>
      </div>
    </div>
  );
}