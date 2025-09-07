"use client";

import { usePathname, useRouter, useParams } from "next/navigation";
import { useTransition, useEffect, useState } from "react";

const locales = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "zh", label: "中文" }
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  // state for current locale
  const [currentLocale, setCurrentLocale] = useState<string>(params.locale as string);

  // detect cookie on client
  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/);
    if (match && locales.some(l => l.code === match[1])) {
      setCurrentLocale(match[1]);
    } else {
      setCurrentLocale(params.locale as string);
    }
  }, [params.locale]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;

    // set cookie
    document.cookie = `locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 30}`;

    setCurrentLocale(newLocale);

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
