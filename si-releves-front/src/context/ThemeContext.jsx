import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem("energiflow-theme");
        return saved || "dark";
    });

    useEffect(() => {
        localStorage.setItem("energiflow-theme", theme);
        document.documentElement.setAttribute("data-theme", theme);

        // Apply theme class to body
        if (theme === "light") {
            document.body.classList.add("light-theme");
            document.body.classList.remove("dark-theme");
        } else {
            document.body.classList.add("dark-theme");
            document.body.classList.remove("light-theme");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
