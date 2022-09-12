import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const ToggleTheme = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (currentTheme === "dark") {
    return (
      <button
        onClick={() => setTheme("light")}
        type="button"
        className="p-1 text-sm text-black bg-white rounded-full hover:bg-white focus:outline-none focus:ring-white dark:bg-white dark:hover:bg-white dark:focus:ring-white dark:border-white"
      >
        <SunIcon className="h-5" />
      </button>
    );
  } else {
    return (
      <button
        onClick={() => setTheme("dark")}
        type="button"
        className="p-1 text-sm text-white bg-gray-800 rounded-full hover:bg-gray-900 focus:outline-none focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        <MoonIcon className="h-5" />
      </button>
    );
  }
};

export default ToggleTheme;
