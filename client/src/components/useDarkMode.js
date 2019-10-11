import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useDarkMode = initialValue => {
  const [darkMode, setValue] = useLocalStorage("darkMode", initialValue);

  const darkClass = darkMode => {
    if (darkMode) {
      document.querySelector(".App").classList.add("dark-mode");
      // document.querySelector("body").classList.add("dark-mode");
    } else {
      document.querySelector(".App").classList.remove("dark-mode");
    }
  };

  useEffect(() => {
    darkClass(darkMode);
  }, [darkMode]);
  return [darkMode, setValue, darkClass];
};

export default useDarkMode;
