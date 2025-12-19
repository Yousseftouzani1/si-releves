import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Rabat quartiers with coordinates
const quartiersData = [
    { id: 1, nom: "Agdal", lat: 33.9897, lng: -6.8498, agents: 5, compteurs: 234 },
    { id: 2, nom: "Hay Riad", lat: 33.9632, lng: -6.8722, agents: 4, compteurs: 189 },
    { id: 3, nom: "Océan", lat: 34.0162, lng: -6.8397, agents: 3, compteurs: 156 },
    { id: 4, nom: "Hassan", lat: 34.0209, lng: -6.8141, agents: 6, compteurs: 312 },
    { id: 5, nom: "Yacoub El Mansour", lat: 34.0044, lng: -6.8744, agents: 4, compteurs: 198 },
    { id: 6, nom: "Souissi", lat: 33.9799, lng: -6.8574, agents: 3, compteurs: 142 },
    { id: 7, nom: "Akkari", lat: 34.0089, lng: -6.8611, agents: 2, compteurs: 98 },
    { id: 8, nom: "Takaddoum", lat: 33.9756, lng: -6.8967, agents: 5, compteurs: 267 },
    { id: 9, nom: "Youssoufia", lat: 33.9644, lng: -6.9089, agents: 3, compteurs: 178 },
    { id: 10, nom: "Médina", lat: 34.0242, lng: -6.8228, agents: 4, compteurs: 203 },
];

const getMarkerColor = (compteurs) => {
    if (compteurs > 250) return "#ef4444"; // Red - high
    if (compteurs > 150) return "#f97316"; // Orange - medium
    return "#10b981"; // Green - low
};

const InteractiveMap = ({ height = "400px", onQuartierClick }) => {
    const rabatCenter = [33.9911, -6.8476];

    return (
        <div
            style={{
                height,
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(148, 163, 184, 0.2)",
            }}
        >
            <MapContainer
                center={rabatCenter}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {quartiersData.map((quartier) => (
                    <CircleMarker
                        key={quartier.id}
                        center={[quartier.lat, quartier.lng]}
                        radius={Math.sqrt(quartier.compteurs) * 1.5}
                        pathOptions={{
                            fillColor: getMarkerColor(quartier.compteurs),
                            fillOpacity: 0.7,
                            color: getMarkerColor(quartier.compteurs),
                            weight: 2,
                        }}
                        eventHandlers={{
                            click: () => onQuartierClick && onQuartierClick(quartier),
                        }}
                    >
                        <Popup>
                            <div style={{ textAlign: "center", minWidth: "150px" }}>
                                <h4 style={{ margin: "0 0 8px 0", color: "#1e293b" }}>
                                    📍 {quartier.nom}
                                </h4>
                                <div style={{ fontSize: "0.85rem", color: "#475569" }}>
                                    <div>👥 {quartier.agents} agents</div>
                                    <div>⚡ {quartier.compteurs} compteurs</div>
                                </div>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    );
};

export default InteractiveMap;
export { quartiersData };
