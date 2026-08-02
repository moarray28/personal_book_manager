import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

export default function StatsCard({
  title,
  value,
  icon,
}: StatsCardProps) {
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
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-foreground">
            {value}
          </h2>
        </div>

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-primary/10
            text-primary
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
}