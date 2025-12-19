import { useTheme } from "../context/ThemeContext";

/**
 * Professional EnergiFlow Logo Component
 * Clean SVG icon with no background - water droplet + lightning bolt
 */
const EnergiFlowLogo = ({ size = 52, showText = true, textSize = "1.5rem", collapsed = false }) => {
    const { theme } = useTheme();

    return (
        <div style={{ display: "flex", alignItems: "center", gap: collapsed ? 0 : 10 }}>
            {/* Icon - Clean SVG with no background carrier */}
            <svg
                width={size}
                height={size}
                viewBox="0 0 48 48"
                fill="none"
                style={{ flexShrink: 0 }}
            >
                {/* Water droplet (left) - filled with gradient */}
                <path
                    d="M18 6C18 6 8 20 8 28C8 35.18 12.82 41 19 41C22.5 41 25.5 39.5 27.5 37"
                    stroke="url(#water-stroke)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="url(#water-fill)"
                />

                {/* Inner water highlight */}
                <path
                    d="M19 15C19 15 13 24 13 29C13 33 16 36 19 36"
                    stroke="#67e8f9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.7"
                />

                {/* Lightning bolt (right) - bold */}
                <path
                    d="M30 6L21 24H32L23 42"
                    stroke="url(#bolt-stroke)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* Lightning inner glow */}
                <path
                    d="M30 6L21 24H32L23 42"
                    stroke="#fde047"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    opacity="0.6"
                />

                {/* Energy connection arc */}
                <path
                    d="M12 44C12 44 24 48 36 44"
                    stroke="url(#arc-main)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.9"
                />

                {/* Gradients */}
                <defs>
                    <linearGradient id="water-stroke" x1="8" y1="6" x2="27" y2="41">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#0891b2" />
                    </linearGradient>
                    <linearGradient id="water-fill" x1="8" y1="6" x2="27" y2="41">
                        <stop offset="0%" stopColor="rgba(34, 211, 238, 0.15)" />
                        <stop offset="100%" stopColor="rgba(8, 145, 178, 0.1)" />
                    </linearGradient>
                    <linearGradient id="bolt-stroke" x1="21" y1="6" x2="32" y2="42">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="50%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                    <linearGradient id="arc-main" x1="12" y1="44" x2="36" y2="44">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Text Logo */}
            {showText && !collapsed && (
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span
                        style={{
                            fontSize: textSize,
                            fontWeight: 700,
                            letterSpacing: "-0.5px",
                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                            background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        EnergiFlow
                    </span>
                    <span
                        style={{
                            fontSize: "0.65rem",
                            fontWeight: 600,
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            color: "var(--text-muted)",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                        }}
                    >
                        <span style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "#06b6d4",
                            display: "inline-block",
                        }} />
                        Rabat Énergie & Eau
                        <span style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "#f97316",
                            display: "inline-block",
                        }} />
                    </span>
                </div>
            )}
        </div>
    );
};

/**
 * Compact version for navbar/sidebar collapsed state
 */
export const EnergiFlowIcon = ({ size = 44 }) => {
    return <EnergiFlowLogo size={size} showText={false} />;
};

export default EnergiFlowLogo;
