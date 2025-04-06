"use client";
import { createContext, useContext, useEffect, useState } from "react";
const initialState = {
    theme: "system",
    setTheme: () => null,
};
const ThemeProviderContext = createContext(initialState);
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("system");
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.add(systemTheme);
            return;
        }
        root.classList.add(theme);
    }, [theme]);
    const value = {
        theme,
        setTheme: (theme) => {
            localStorage.setItem("theme", theme);
            setTheme(theme);
        },
    };
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        }
        else {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            setTheme(systemTheme);
        }
    }, []);
    return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}
export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
