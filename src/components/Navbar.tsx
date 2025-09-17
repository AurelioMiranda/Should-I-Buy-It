'use client';

import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  return (
    <header className="w-full border-b px-4 py-3 flex justify-between items-center">
      <a href="/"><h1 className="text-xl font-semibold">Should I buy it?</h1></a>
      <div className="flex gap-3 items-center justify-center">
        <LanguageSwitcher />
      </div>
    </header>
  );
}
