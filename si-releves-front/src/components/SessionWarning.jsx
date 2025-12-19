import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { Clock, AlertTriangle } from "lucide-react";

const SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutes
const WARNING_BEFORE = 2 * 60 * 1000; // 2 minutes before

const SessionWarning = () => {
    const { logout } = useAuth();
    const [showWarning, setShowWarning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [lastActivity, setLastActivity] = useState(Date.now());

    const resetTimer = useCallback(() => {
        setLastActivity(Date.now());
        setShowWarning(false);
    }, []);

    // Track user activity
    useEffect(() => {
        const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];

        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [resetTimer]);

    // Check for timeout
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const timeSinceActivity = now - lastActivity;
            const remaining = SESSION_TIMEOUT - timeSinceActivity;

            if (remaining <= 0) {
                // Session expired
                logout();
            } else if (remaining <= WARNING_BEFORE) {
                // Show warning
                setShowWarning(true);
                setTimeLeft(Math.ceil(remaining / 1000));
            } else {
                setShowWarning(false);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [lastActivity, logout]);

    if (!showWarning) return null;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10000,
                backdropFilter: "blur(4px)",
            }}
        >
            <div
                className="animate-slide-up"
                style={{
                    background: "var(--bg-secondary, #1e293b)",
                    borderRadius: "20px",
                    padding: "32px",
                    maxWidth: "400px",
                    textAlign: "center",
                    border: "1px solid rgba(251, 191, 36, 0.3)",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                }}
            >
                <div
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: "rgba(251, 191, 36, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 20px",
                        animation: "pulse 1.5s infinite",
                    }}
                >
                    <AlertTriangle size={32} color="#fbbf24" />
                </div>

                <h3 style={{ fontSize: "1.25rem", marginBottom: "12px", color: "var(--text-primary, #f8fafc)" }}>
                    Session sur le point d'expirer
                </h3>

                <p style={{ color: "var(--text-secondary, #94a3b8)", marginBottom: "24px" }}>
                    Votre session expirera dans
                </p>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        marginBottom: "24px",
                    }}
                >
                    <Clock size={24} color="#fbbf24" />
                    <span
                        style={{
                            fontSize: "2rem",
                            fontWeight: 700,
                            fontFamily: "monospace",
                            color: "#fbbf24",
                        }}
                    >
                        {minutes}:{seconds.toString().padStart(2, "0")}
                    </span>
                </div>

                <button
                    onClick={resetTimer}
                    style={{
                        width: "100%",
                        padding: "14px 24px",
                        background: "linear-gradient(135deg, #fbbf24, #f97316)",
                        border: "none",
                        borderRadius: "12px",
                        color: "#1e293b",
                        fontWeight: 600,
                        fontSize: "1rem",
                        cursor: "pointer",
                    }}
                >
                    Rester connecté
                </button>
            </div>
        </div>
    );
};

export default SessionWarning;
