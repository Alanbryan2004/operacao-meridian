import React from "react";

/**
 * Componente de Modal padronizado conforme solicitação do usuário.
 * Refatorado para usar estilos "Meridian" (Glassmorphism + Vibrant) sem Tailwind.
 */
export default function ModalMsg({
    message,
    onClose,
    type = "SUCCESS",
    confirmText = "OK",
    isConfirm = false,
    onConfirm
}) {
    const isSuccess = type === "SUCCESS";
    const accentColor = isSuccess ? "#4ade80" : "#ff4d6a";

    return (
        <div style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            padding: 20
        }}>
            <style>{`
                @keyframes modalAppear {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
            <div style={{
                backgroundColor: "rgba(13, 33, 55, 0.98)",
                padding: "24px",
                borderRadius: "24px",
                border: `1px solid ${accentColor}44`,
                boxShadow: `0 30px 60px rgba(0,0,0,0.9), 0 0 30px ${accentColor}11`,
                textAlign: "center",
                maxWidth: "340px",
                width: "100%",
                color: "#fff",
                animation: "modalAppear 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}>
                <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    background: `${accentColor}11`,
                    border: `1px solid ${accentColor}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    margin: "0 auto 16px"
                }}>
                    {isSuccess ? "✅" : "⚠️"}
                </div>

                <div style={{
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 2,
                    color: accentColor,
                    marginBottom: 8,
                    opacity: 0.8
                }}>
                    {isSuccess ? "CONFIRMADO" : "ATENÇÃO"}
                </div>

                <p style={{
                    fontSize: 15,
                    fontWeight: 600,
                    marginBottom: 28,
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.95)",
                    whiteSpace: "pre-wrap"
                }}>
                    {message}
                </p>

                <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                    {isConfirm && (
                        <button
                            style={{
                                flex: 1,
                                padding: "12px",
                                borderRadius: "14px",
                                border: "1px solid rgba(255,255,255,0.12)",
                                background: "rgba(255,255,255,0.04)",
                                color: "rgba(255,255,255,0.6)",
                                fontSize: 12,
                                fontWeight: 800,
                                cursor: "pointer",
                                transition: "all 0.2s"
                            }}
                            onClick={onClose}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                                e.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                            }}
                        >
                            CANCELAR
                        </button>
                    )}
                    <button
                        style={{
                            flex: 1,
                            padding: "12px",
                            borderRadius: "14px",
                            border: `1px solid ${accentColor}88`,
                            background: `${accentColor}22`,
                            color: accentColor,
                            fontSize: 12,
                            fontWeight: 900,
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                        onClick={() => {
                            if (isConfirm && onConfirm) {
                                onConfirm();
                            } else {
                                onClose();
                            }
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = `${accentColor}33`}
                        onMouseLeave={(e) => e.currentTarget.style.background = `${accentColor}22`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
