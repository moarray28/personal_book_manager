"use client";

import { useRouter } from "next/navigation";
import Button from "../ui/Button";

interface NavbarProps {
  userName?: string;
  isPublic?: boolean; // Added this prop to handle non-logged-in pages
}

export default function Navbar({
  userName = "Reader",
  isPublic = false,
}: NavbarProps) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        
        {/* Logo / Brand (Clickable to Home) */}
        <button 
          onClick={() => router.push("/")}
          className="group flex items-center gap-3 text-left transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-primary">
              BookManager
            </h1>
            <p className="text-xs font-medium text-muted">
              Your digital shelf
            </p>
          </div>
        </button>

        {/* Dynamic Actions based on Login State */}
        <div className="flex items-center gap-6">
          {isPublic ? (
            /* Show this on Login & Sign Up pages */
            <Button
              variant="outline"
              className="border-border bg-surface text-primary shadow-none transition-colors hover:border-pink-border hover:bg-pink-soft"
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
          ) : (
            /* Show this on the Dashboard */
            <>
              <div className="hidden h-8 w-px bg-border sm:block"></div>

              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-primary">
                  {userName}
                </p>
                <p className="text-xs font-medium text-muted">
                  Welcome back
                </p>
              </div>

              <Button
                variant="outline"
                className="border-border bg-surface text-primary shadow-none transition-colors hover:border-pink-border hover:bg-pink-soft"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}