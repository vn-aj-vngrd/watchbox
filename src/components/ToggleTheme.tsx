// components/ToggleTheme.tsx

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import ReactTooltip from "react-tooltip";

type Props = {
  isButton?: boolean;
};

const ToogleTheme = ({ isButton }: Props) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [tooltip, showTooltip] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (currentTheme === "dark") {
    return (
      <>
        {tooltip && <ReactTooltip id="light" effect="float" place="bottom" />}

        {isButton ? (
          <button
            data-for="light"
            data-tip="Light Mode"
            onMouseLeave={() => {
              showTooltip(false);
              setTimeout(() => showTooltip(true), 50);
            }}
            onClick={() => setTheme("light")}
            type="button"
            className="inline-flex items-center p-1 text-gray-700 bg-white border border-gray-300 shadow-sm rounded-2xl hover:bg-gray-200 focus:outline-none dark:bg-darkColor dark:text-white dark:border-transparent dark:hover:bg-grayColor"
          >
            <SunIcon className="h-5" />
          </button>
        ) : (
          <button
            onClick={() => setTheme("light")}
            className="w-full justify-start flex px-4 py-2 text-sm text-darkerColor dark:text-white"
          >
            Light Mode
          </button>
        )}
      </>
    );
  } else {
    return (
      <>
        {tooltip && <ReactTooltip id="dark" effect="float" place="bottom" />}

        {isButton ? (
          <button
            data-for="dark"
            data-tip="Dark Mode"
            onMouseLeave={() => {
              showTooltip(false);
              setTimeout(() => showTooltip(true), 50);
            }}
            onClick={() => setTheme("dark")}
            type="button"
            className="inline-flex items-center p-1 text-gray-700 bg-white border border-gray-300 shadow-sm rounded-2xl hover:bg-gray-200 focus:outline-none dark:bg-darkColor dark:text-white dark:border-transparent dark:hover:bg-grayColor"
          >
            <MoonIcon className="h-5" />
          </button>
        ) : (
          <button
            onClick={() => setTheme("dark")}
            className="w-full justify-start flex px-4 py-2 text-sm text-darkerColor dark:text-white"
          >
            Dark Mode
          </button>
        )}
      </>
    );
  }
};

export default ToogleTheme;
