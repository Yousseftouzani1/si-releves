import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            title={isDark ? "Mode clair" : "Mode sombre"}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                padding: 0,
                borderRadius: "12px",
                background: isDark
                    ? "linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(249, 115, 22, 0.1))"
                    : "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                border: `1px solid ${isDark ? "rgba(251, 191, 36, 0.3)" : "rgba(59, 130, 246, 0.3)"}`,
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "none",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Animated icon container */}
            <div
                style={{
                    position: "relative",
                    width: "20px",
                    height: "20px",
                }}
            >
                {/* Sun icon */}
                <Sun
                    size={20}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        color: "#fbbf24",
                        transform: isDark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
                        opacity: isDark ? 1 : 0,
                        transition: "all 0.3s ease",
                    }}
                />
                {/* Moon icon */}
                <Moon
                    size={20}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        color: "#3b82f6",
                        transform: isDark ? "rotate(-90deg) scale(0)" : "rotate(0deg) scale(1)",
                        opacity: isDark ? 0 : 1,
                        transition: "all 0.3s ease",
                    }}
                />
            </div>
        </button>
    );
};

export default ThemeToggle;
