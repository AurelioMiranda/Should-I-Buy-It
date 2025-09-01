"use client";

import { usePathname, useRouter, useParams } from "next/navigation";
import { useTransition } from "react";

const locales = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "fr", label: "Français" }
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = params.locale as string;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;

    // 1. Set cookie on client
    document.cookie = `locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 30}`;


    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <select
      onChange={handleChange}
      value={currentLocale}
      disabled={isPending}
      className="
    border 
    rounded 
    px-2 
    py-1 
    bg-gray-800 
    text-white 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-500
  "
    >
      {locales.map(locale => (
        <option
          key={locale.code}
          value={locale.code}
          className="bg-gray-800 text-white"
        >
          {locale.label}
        </option>
      ))}
    </select>
  );
}
