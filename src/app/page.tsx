"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import { getCurrentUser } from "@/services/auth";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      try {
        await getCurrentUser();
        router.replace("/dashboard");
      } catch {
        setLoading(false);
      }
    }
    checkUser();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-full w-full animate-ping rounded-full bg-pink-soft opacity-75"></div>
          <div className="relative h-8 w-8 rounded-full bg-primary"></div>
        </div>
        <p className="mt-6 text-sm font-medium uppercase tracking-widest text-muted">
          Loading Library
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-pink-border selection:text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-2">
            {/* Logo Mark */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">
              BookManager
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/login")}
              className="text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              Log in
            </button>
            <Button onClick={() => router.push("/signup")}>
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:py-32 lg:px-10">
        {/* Decorative background blur */}
        <div className="absolute -top-24 -z-10 h-96 w-96 rounded-full bg-pink-soft opacity-50 blur-3xl"></div>
        
        <div className="mx-auto max-w-3xl">
          <span className="mb-6 inline-flex items-center rounded-full border border-pink-border bg-surface px-4 py-1.5 text-sm font-semibold text-primary">
            ✨ Your Digital Bookshelf
          </span>
          
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-primary sm:text-7xl">
            Organize every book <br className="hidden sm:block" />
            in one place.
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Keep track of books you want to read, ones you're currently reading, and the stories you've already completed. A quiet, elegant space for your reading collection.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              className="h-12 px-8 text-base shadow-none"
              onClick={() => router.push("/signup")}
            >
              Start Your Library
            </Button>
            <Button
              variant="outline"
              className="h-12 border-border bg-surface px-8 text-base text-primary hover:border-pink-border hover:bg-pink-soft shadow-none"
              onClick={() => router.push("/login")}
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex-1 bg-surface-muted px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Everything you need to manage your reading life.
            </h2>
            <p className="mt-4 text-lg text-muted">
              Designed with simplicity and focus in mind, giving you the tools to curate your perfect collection.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-3xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-pink-border hover:bg-pink-soft">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background text-primary transition-colors group-hover:border-pink-border group-hover:bg-surface">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                Manage Collection
              </h3>
              <p className="text-muted leading-relaxed">
                Add new discoveries, update details, or remove books. Maintain complete control over your personal catalog.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-3xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-pink-border hover:bg-pink-soft">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background text-primary transition-colors group-hover:border-pink-border group-hover:bg-surface">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                Track Progress
              </h3>
              <p className="text-muted leading-relaxed">
                Categorize your books by "Want to read", "Currently reading", or "Completed" to see your journey at a glance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-3xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-pink-border hover:bg-pink-soft">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background text-primary transition-colors group-hover:border-pink-border group-hover:bg-surface">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                Search & Filter
              </h3>
              <p className="text-muted leading-relaxed">
                Instantly find exactly what you're looking for. Sort by author, title, or status without the clutter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-border bg-surface py-8 text-center">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Personal Book Manager. A quiet place for your books.
        </p>
      </footer>
    </main>
  );
}