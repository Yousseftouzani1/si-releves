import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

const Toast = ({ toast, onClose }) => {
    const icons = {
        success: <CheckCircle size={20} />,
        error: <AlertCircle size={20} />,
        warning: <AlertTriangle size={20} />,
        info: <Info size={20} />,
    };

    const colors = {
        success: { bg: "rgba(16, 185, 129, 0.1)", border: "rgba(16, 185, 129, 0.3)", color: "#10b981" },
        error: { bg: "rgba(239, 68, 68, 0.1)", border: "rgba(239, 68, 68, 0.3)", color: "#ef4444" },
        warning: { bg: "rgba(251, 191, 36, 0.1)", border: "rgba(251, 191, 36, 0.3)", color: "#fbbf24" },
        info: { bg: "rgba(59, 130, 246, 0.1)", border: "rgba(59, 130, 246, 0.3)", color: "#3b82f6" },
    };

    const style = colors[toast.type] || colors.info;

    return (
        <div
            className="animate-slide-up"
            style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 16px",
                background: style.bg,
                border: `1px solid ${style.border}`,
                borderRadius: "12px",
                color: style.color,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(10px)",
                minWidth: "280px",
                maxWidth: "400px",
            }}
        >
            {icons[toast.type]}
            <span style={{ flex: 1, fontSize: "0.9rem" }}>{toast.message}</span>
            <button
                onClick={() => onClose(toast.id)}
                style={{
                    background: "transparent",
                    border: "none",
                    padding: "4px",
                    cursor: "pointer",
                    color: style.color,
                    opacity: 0.7,
                }}
            >
                <X size={16} />
            </button>
        </div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "info", duration = 4000) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const success = (message) => addToast(message, "success");
    const error = (message) => addToast(message, "error");
    const warning = (message) => addToast(message, "warning");
    const info = (message) => addToast(message, "info");

    return (
        <ToastContext.Provider value={{ addToast, removeToast, success, error, warning, info }}>
            {children}

            {/* Toast container */}
            <div
                style={{
                    position: "fixed",
                    bottom: "24px",
                    right: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    zIndex: 9999,
                }}
            >
                {toasts.map((toast) => (
                    <Toast key={toast.id} toast={toast} onClose={removeToast} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastContext;
