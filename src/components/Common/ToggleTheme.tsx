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
        <button onClick={() => setTheme("light")} data-testid="sun-icon" type="button" className="nav-link inline-flex">
          <SunIcon className="nav-icon" />
        </button>
      </>
    );
  } else {
    return (
      <>
        <button onClick={() => setTheme("dark")} data-testid="moon-icon" type="button" className="nav-link inline-flex">
          <MoonIcon className="nav-icon" />
        </button>
      </>
    );
  }
};

export default ToogleTheme;
