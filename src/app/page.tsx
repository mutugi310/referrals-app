"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background text-foreground transition-colors">
        <main className="flex flex-col items-center justify-center flex-1 px-4">
          <section className="text-center max-w-2xl mt-16">
            <h2 className="text-5xl font-extrabold mb-4">
              Build & Manage Your Referral Tree
            </h2>
            <p className="text-lg mb-8">
              Easily add, remove, and manage agents using an intuitive interface
              built with Next.js, TypeScript, Tailwind CSS, and shadcn UI
              components.
            </p>
            <Link href="/tree">
              <Button className="px-8 py-4 text-lg">Get Started</Button>
            </Link>
          </section>
        </main>
        <footer className="p-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Referral Tree Manager. All rights
            reserved.
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
}
