// components/ToggleTheme.tsx

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
          className="inline-flex h-9 w-9  items-center justify-center rounded-full  bg-gray-100 focus:outline-none hover:bg-gray-200 dark:border-transparent dark:bg-darkColor dark:text-white dark:hover:bg-grayColor"
        >
          <SunIcon className="h-5 w-5 fill-gray-800 dark:fill-white" />
        </button>
      </>
    );
  } else {
    return (
      <>
        <button
          onClick={() => setTheme("dark")}
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full  bg-gray-100 focus:outline-none hover:bg-gray-200 dark:border-transparent dark:bg-darkColor dark:text-white dark:hover:bg-grayColor"
        >
          <MoonIcon className="h-5 w-5 fill-gray-800 dark:fill-white" />
        </button>
      </>
    );
  }
};

export default ToogleTheme;
