"use client";

interface FilterBarProps {
  value: string;
  onChange: (value: string) => void;
}

const statuses = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Want To Read",
    value: "WANT_TO_READ",
  },
  {
    label: "Reading",
    value: "READING",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
];

export default function FilterBar({
  value,
  onChange,
}: FilterBarProps) {
  return (
    <div className="w-full md:w-64">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          border
    
          bg-white
          px-4
          py-3
          text-sm
          text-foreground
          outline-none
          transition-all
          duration-200
          focus:border-primary
          focus:ring-2
          focus:ring-primary/20
        "
      >
        {statuses.map((status) => (
          <option
            key={status.value}
            value={status.value}
          >
            {status.label}
          </option>
        ))}
      </select>
    </div>
  );
}