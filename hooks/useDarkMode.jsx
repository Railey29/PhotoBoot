import React, { useState } from "react";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleMode = () => {
    setDarkMode(!darkMode);
  };
  return { darkMode, toggleMode };
}
