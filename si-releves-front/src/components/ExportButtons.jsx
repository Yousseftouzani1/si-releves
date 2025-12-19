import { useState } from "react";
import { Download, FileSpreadsheet, FileText, Loader2 } from "lucide-react";

const ExportButtons = ({ data, filename = "export" }) => {
    const [exporting, setExporting] = useState(null);

    const exportToCSV = () => {
        if (!data || data.length === 0) return;

        setExporting("csv");
        setTimeout(() => {
            const headers = Object.keys(data[0]);
            const csvContent = [
                headers.join(","),
                ...data.map(row => headers.map(h => row[h] ?? "").join(","))
            ].join("\n");

            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${filename}.csv`;
            link.click();
            URL.revokeObjectURL(url);
            setExporting(null);
        }, 1000);
    };

    const exportToJSON = () => {
        if (!data || data.length === 0) return;

        setExporting("json");
        setTimeout(() => {
            const jsonContent = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonContent], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${filename}.json`;
            link.click();
            URL.revokeObjectURL(url);
            setExporting(null);
        }, 1000);
    };

    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <button
                onClick={exportToCSV}
                disabled={exporting !== null}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "10px 16px",
                    background: "rgba(16, 185, 129, 0.1)",
                    color: "#10b981",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    boxShadow: "none",
                    fontSize: "0.85rem"
                }}
            >
                {exporting === "csv" ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    <FileSpreadsheet size={16} />
                )}
                CSV
            </button>

            <button
                onClick={exportToJSON}
                disabled={exporting !== null}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "10px 16px",
                    background: "rgba(59, 130, 246, 0.1)",
                    color: "#3b82f6",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                    boxShadow: "none",
                    fontSize: "0.85rem"
                }}
            >
                {exporting === "json" ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    <FileText size={16} />
                )}
                JSON
            </button>
        </div>
    );
};

export default ExportButtons;
