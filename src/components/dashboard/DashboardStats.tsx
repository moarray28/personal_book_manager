import {
  BookOpen,
  BookMarked,
  CircleCheckBig,
  Clock3,
} from "lucide-react";

import StatsCard from "./StatsCard";

interface DashboardStatsProps {
  totalBooks: number;
  reading: number;
  completed: number;
  wantToRead: number;
}

export default function DashboardStats({
  totalBooks,
  reading,
  completed,
  wantToRead,
}: DashboardStatsProps) {
  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Books"
        value={totalBooks}
        icon={<BookOpen size={22} />}
      />

      <StatsCard
        title="Reading"
        value={reading}
        icon={<BookMarked size={22} />}
      />

      <StatsCard
        title="Completed"
        value={completed}
        icon={<CircleCheckBig size={22} />}
      />

      <StatsCard
        title="Want To Read"
        value={wantToRead}
        icon={<Clock3 size={22} />}
      />
    </section>
  );
}