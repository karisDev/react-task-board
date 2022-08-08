import React, { ReactElement, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  muiDarkThemeSettings,
  muiLightThemeSettings,
} from "./muiThemeSettings";

export const ThemeContext = React.createContext<{
  darkTheme: boolean | undefined;
  switchTheme: () => void;
}>(null as any);

interface ThemeWrapperProps {
  children: ReactElement<any | null>;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState<boolean | undefined>(undefined);

  // init theme
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (!localTheme) {
      localStorage.setItem("theme", "light");
      return;
    }
    setDarkTheme(localTheme === "dark");
  }, []);

  const switchTheme = () => {
    const isNewThemeDark = !darkTheme;
    localStorage.setItem("theme", isNewThemeDark ? "dark" : "light");

    setDarkTheme(isNewThemeDark);
  };
  return (
    <ThemeContext.Provider value={{ darkTheme, switchTheme }}>
      <ThemeProvider
        theme={createTheme(
          darkTheme ? muiDarkThemeSettings : muiLightThemeSettings
        )}
      >
        <div className={darkTheme ? "dark" : "light"}>{children}</div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeWrapper;
