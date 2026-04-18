"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "gastech-theme";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const preferred = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(preferred);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    window.localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  return {
    isDark,
    toggleDarkMode: () => setIsDark((prev) => !prev)
  };
}
