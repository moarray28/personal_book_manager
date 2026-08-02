"use client";

import Input from "../ui/Input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="w-full">
      <Input
        id="search"
        type="text"
        placeholder="Search by title or author..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}