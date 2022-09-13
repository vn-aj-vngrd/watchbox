// components/ToggleTheme.tsx

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const ToogleTheme = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (currentTheme === "dark") {
    return (
      <>
        <button
          onClick={() => setTheme("light")}
          type="button"
          className="inline-flex items-center p-1 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-200 focus:outline-none dark:bg-darkColor dark:text-white dark:border-transparent dark:hover:bg-grayColor"
        >
          <SunIcon className="h-5" />
        </button>
      </>
    );
  } else {
    return (
      <>
        <button
          onClick={() => setTheme("dark")}
          type="button"
          className="inline-flex items-center p-1 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-200 focus:outline-none dark:bg-darkColor dark:text-white dark:border-transparent dark:hover:bg-grayColor"
        >
          <MoonIcon className="h-5" />
        </button>
      </>
    );
  }
};

export default ToogleTheme;
