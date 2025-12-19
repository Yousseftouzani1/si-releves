import { useState } from "react";
import { Brain, TrendingUp, AlertTriangle, Sparkles, RefreshCw } from "lucide-react";

const AIPredictionCard = () => {
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState({
        eau: { predicted: 5420, trend: "+8.2%", status: "normal" },
        elec: { predicted: 4890, trend: "+3.1%", status: "normal" },
    });

    const refresh = () => {
        setLoading(true);
        setTimeout(() => {
            setPrediction({
                eau: {
                    predicted: Math.floor(5000 + Math.random() * 1000),
                    trend: `+${(Math.random() * 10).toFixed(1)}%`,
                    status: Math.random() > 0.7 ? "warning" : "normal"
                },
                elec: {
                    predicted: Math.floor(4500 + Math.random() * 800),
                    trend: `+${(Math.random() * 8).toFixed(1)}%`,
                    status: Math.random() > 0.8 ? "warning" : "normal"
                },
            });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="card" style={{ position: "relative", overflow: "hidden" }}>
            {/* AI Badge */}
            <div style={{
                position: "absolute",
                top: 16,
                right: 16,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#a78bfa"
            }}>
                <Sparkles size={12} />
                IA
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)"
                }}>
                    <Brain size={24} color="white" />
                </div>
                <div>
                    <h3 style={{ marginBottom: "2px" }}>Prédiction Consommation</h3>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Mois prochain (IA)</p>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                {/* Eau */}
                <div style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: prediction.eau.status === "warning"
                        ? "rgba(251, 191, 36, 0.1)"
                        : "rgba(6, 182, 212, 0.1)",
                    border: `1px solid ${prediction.eau.status === "warning" ? "rgba(251, 191, 36, 0.3)" : "rgba(6, 182, 212, 0.3)"}`
                }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>💧 Eau</span>
                        {prediction.eau.status === "warning" && <AlertTriangle size={14} color="#fbbf24" />}
                    </div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#06b6d4" }}>
                        {loading ? "..." : prediction.eau.predicted.toLocaleString()}
                    </div>
                    <div style={{
                        fontSize: "0.75rem",
                        color: "#10b981",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                    }}>
                        <TrendingUp size={12} />
                        {prediction.eau.trend}
                    </div>
                </div>

                {/* Électricité */}
                <div style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: prediction.elec.status === "warning"
                        ? "rgba(251, 191, 36, 0.1)"
                        : "rgba(249, 115, 22, 0.1)",
                    border: `1px solid ${prediction.elec.status === "warning" ? "rgba(251, 191, 36, 0.3)" : "rgba(249, 115, 22, 0.3)"}`
                }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>⚡ Électricité</span>
                        {prediction.elec.status === "warning" && <AlertTriangle size={14} color="#fbbf24" />}
                    </div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f97316" }}>
                        {loading ? "..." : prediction.elec.predicted.toLocaleString()}
                    </div>
                    <div style={{
                        fontSize: "0.75rem",
                        color: "#10b981",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                    }}>
                        <TrendingUp size={12} />
                        {prediction.elec.trend}
                    </div>
                </div>
            </div>

            <button
                onClick={refresh}
                disabled={loading}
                style={{
                    width: "100%",
                    background: "var(--bg-tertiary)",
                    boxShadow: "none",
                    opacity: loading ? 0.6 : 1
                }}
            >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                {loading ? "Calcul en cours..." : "Actualiser la prédiction"}
            </button>
        </div>
    );
};

export default AIPredictionCard;
