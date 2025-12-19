import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Bot, User, Sparkles } from "lucide-react";

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: "assistant",
            content: "👋 Bonjour ! Je suis l'assistant EnergiFlow. Comment puis-je vous aider ?"
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const responses = {
        "relevé": "📊 Les relevés permettent de suivre la consommation d'eau et d'électricité. Allez dans le menu **Relevés** pour voir l'historique complet.",
        "compteur": "🔢 Chaque compteur a un numéro unique à 9 chiffres. Vous pouvez les gérer dans le menu **Compteurs**.",
        "agent": "👷 Les agents sont responsables des relevés terrain. Le menu **Agents** permet de gérer leurs affectations.",
        "quartier": "🗺️ Les quartiers définissent les zones d'intervention. Consultez le menu **Quartiers** pour la carte interactive.",
        "statistique": "📈 Le **Dashboard** affiche toutes les statistiques en temps réel : compteurs, relevés, consommation.",
        "aide": "💡 Je peux vous aider avec : relevés, compteurs, agents, quartiers, statistiques. Posez votre question !",
        "bonjour": "👋 Bonjour ! Je suis ravi de vous aider. Que souhaitez-vous savoir ?",
        "merci": "🙏 Je vous en prie ! N'hésitez pas si vous avez d'autres questions.",
    };

    const getAIResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();

        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        return "🤔 Je ne suis pas sûr de comprendre. Essayez de me poser une question sur les **relevés**, **compteurs**, **agents** ou **statistiques**.";
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                role: "assistant",
                content: getAIResponse(input)
            };
            setMessages((prev) => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    position: "fixed",
                    bottom: "24px",
                    right: "24px",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                    border: "none",
                    boxShadow: "0 8px 24px rgba(139, 92, 246, 0.4)",
                    cursor: "pointer",
                    display: isOpen ? "none" : "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                    transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
                <MessageCircle size={28} color="white" />
                <div style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-4px",
                    width: "20px",
                    height: "20px",
                    background: "#10b981",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Sparkles size={10} color="white" />
                </div>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="animate-slide-up"
                    style={{
                        position: "fixed",
                        bottom: "24px",
                        right: "24px",
                        width: "380px",
                        height: "500px",
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "20px",
                        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        zIndex: 1001,
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: "16px 20px",
                        background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{
                                width: 40,
                                height: 40,
                                borderRadius: "10px",
                                background: "rgba(255,255,255,0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Bot size={22} color="white" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, color: "white" }}>Assistant IA</div>
                                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.8)" }}>EnergiFlow</div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                width: 32,
                                height: 32,
                                padding: 0,
                                background: "rgba(255,255,255,0.2)",
                                boxShadow: "none"
                            }}
                        >
                            <X size={18} color="white" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div style={{
                        flex: 1,
                        overflow: "auto",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                    }}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    display: "flex",
                                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                                }}
                            >
                                <div style={{
                                    maxWidth: "80%",
                                    padding: "12px 16px",
                                    borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                                    background: msg.role === "user"
                                        ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                                        : "var(--bg-tertiary)",
                                    color: msg.role === "user" ? "white" : "var(--text-primary)",
                                    fontSize: "0.9rem",
                                    lineHeight: 1.5
                                }}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                <div style={{
                                    padding: "12px 16px",
                                    borderRadius: "16px 16px 16px 4px",
                                    background: "var(--bg-tertiary)",
                                    color: "var(--text-muted)"
                                }}>
                                    <span className="animate-pulse">●</span>
                                    <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>●</span>
                                    <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>●</span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div style={{
                        padding: "16px",
                        borderTop: "1px solid var(--border-color)",
                        display: "flex",
                        gap: "12px"
                    }}>
                        <input
                            type="text"
                            placeholder="Tapez votre question..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            style={{
                                flex: 1,
                                padding: "12px 16px",
                                borderRadius: "12px",
                                background: "var(--bg-tertiary)",
                                border: "1px solid var(--border-color)",
                                fontSize: "0.9rem"
                            }}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            style={{
                                width: 48,
                                height: 48,
                                padding: 0,
                                opacity: input.trim() ? 1 : 0.5
                            }}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChatbot;
