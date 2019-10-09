import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useDarkMode = initialValue => {
  const [darkMode, setValue] = useLocalStorage("darkMode", initialValue);

  useEffect(() => {
    if (darkMode) {
      document.querySelector("body").classList.add("dark-mode");
    } else {
      document.querySelector("body").classList.remove("dark-mode");
    }
  }, [darkMode]);
  return [darkMode, setValue];
};

export default useDarkMode;
