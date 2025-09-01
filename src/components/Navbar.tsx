'use client';

import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  return (
    <header className="w-full border-b px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Should I buy it?</h1>
      <div className="flex gap-3 items-center justify-center">
        {/*<a href='\'><h1 className="text-l font-semibold">Privacy policy</h1></a>*/}
        <LanguageSwitcher />
      </div>
    </header>
  );
}
