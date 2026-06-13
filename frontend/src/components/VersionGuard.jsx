import { useEffect, useRef, useState } from "react";

/**
 * VersionGuard — Detecta novas versões do app e força reload automático.
 * 
 * Como funciona:
 * 1. Ao montar, busca /version.json e salva a versão atual
 * 2. A cada 60 segundos, busca /version.json novamente (com cache-bust)
 * 3. Se a versão mudou → mostra aviso por 3s e faz reload forçado
 * 
 * Isso impede que jogadores fiquem com código antigo (e bugs já corrigidos).
 */
export default function VersionGuard() {
    const currentVersion = useRef(null);
    const [showBanner, setShowBanner] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        async function fetchVersion() {
            try {
                // Cache-bust: adiciona timestamp para evitar cache do browser
                const res = await fetch(`/version.json?t=${Date.now()}`, {
                    cache: "no-store",
                    headers: { "Cache-Control": "no-cache" }
                });
                if (!res.ok) return null;
                const data = await res.json();
                return data.version || null;
            } catch {
                return null;
            }
        }

        // Primeira verificação: salva a versão atual
        fetchVersion().then(v => {
            if (v) currentVersion.current = v;
        });

        // Verificação periódica a cada 60 segundos
        intervalRef.current = setInterval(async () => {
            const latest = await fetchVersion();
            if (!latest || !currentVersion.current) return;

            if (latest !== currentVersion.current) {
                console.log(`[VersionGuard] Nova versão detectada: ${currentVersion.current} → ${latest}. Recarregando...`);
                setShowBanner(true);

                // Aguarda 3 segundos para o jogador ver o aviso, depois recarrega
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        }, 60 * 1000); // Verifica a cada 1 minuto

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    if (!showBanner) return null;

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 99999,
            padding: "14px 20px",
            background: "linear-gradient(135deg, rgba(0,180,255,0.95), rgba(0,120,255,0.95))",
            color: "#fff",
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.5px",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            animation: "vg-slide-down 0.4s ease-out",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}>
            <style>{`
                @keyframes vg-slide-down {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes vg-spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
            <span style={{ 
                display: "inline-block", 
                width: 14, height: 14, 
                border: "2px solid rgba(255,255,255,0.3)", 
                borderTopColor: "#fff", 
                borderRadius: "50%", 
                animation: "vg-spin 0.8s linear infinite",
                marginRight: 10,
                verticalAlign: "middle"
            }} />
            🔄 ATUALIZAÇÃO DETECTADA — Recarregando protocolo...
        </div>
    );
}
