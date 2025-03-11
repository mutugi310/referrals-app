"use client";

import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`bg-accent text-accent-foreground transition-all duration-300 ${
        scrolled
          ? "container max-w-full mx-auto rounded-2xl sticky top-0 z-50"
          : "w-full rounded-b-lg"
      } `}
    >
      <header className="flex items-center justify-between p-6 sm:p-8 w-full">
        <h1 className="text-xl sm:text-3xl font-bold flex flex-shrink-1">
          <span className="text-primary">🌲</span>
          <span className="text-destructive-foreground">R</span>eferral
          <span className="text-destructive-foreground">T</span>ree
          <span className="text-destructive-foreground">M</span>anager
        </h1>
        <ModeToggle />
      </header>
    </div>
  );
}
