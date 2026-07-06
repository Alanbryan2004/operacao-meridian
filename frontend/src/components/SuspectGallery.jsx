import React, { useState } from "react";
import { suspectsSeed, getUnlockedLeaders, FACTIONS } from "../game/store";

const ITEMS_PER_PAGE = 9;

const FACTION_COLORS = {
    "F1": {
        text: "#4fd1c5", // Soft Teal/Cyan
        bg: "rgba(79, 209, 197, 0.035)",
        border: "rgba(79, 209, 197, 0.12)"
    },
    "F2": {
        text: "#63b3ed", // Soft Blue
        bg: "rgba(99, 179, 237, 0.035)",
        border: "rgba(99, 179, 237, 0.12)"
    },
    "F3": {
        text: "#ffd700", // Gold / Yellow
        bg: "rgba(255, 215, 0, 0.035)",
        border: "rgba(255, 215, 0, 0.12)"
    },
    "F4": {
        text: "#c084fc", // Purple/Violet
        bg: "rgba(192, 132, 252, 0.035)",
        border: "rgba(192, 132, 252, 0.12)"
    },
    "F5": {
        text: "#4ade80", // Soft Green/Emerald
        bg: "rgba(74, 222, 128, 0.035)",
        border: "rgba(74, 222, 128, 0.12)"
    },
    "F6": {
        text: "#f87171", // Soft Red/Crimson
        bg: "rgba(248, 113, 113, 0.035)",
        border: "rgba(248, 113, 113, 0.12)"
    },
    "F7": {
        text: "#fb923c", // Soft Orange/Amber
        bg: "rgba(251, 146, 60, 0.035)",
        border: "rgba(251, 146, 60, 0.12)"
    }
};

const getFactionColors = (factionId) => {
    return FACTION_COLORS[factionId] || FACTION_COLORS["F3"];
};

export default function SuspectGallery({ capturedSuspects = {} }) {
    const [page, setPage] = useState(1);
    const [factionPage, setFactionPage] = useState(1);
    const [activeTab, setActiveTab] = useState("ALL"); // "ALL" ou "FACTIONS"
    const [mockedFactions, setMockedFactions] = useState({});
    const [selectedSuspect, setSelectedSuspect] = useState(null);

    const toggleMockFaction = (factionId) => {
        setMockedFactions(prev => ({
            ...prev,
            [factionId]: !prev[factionId]
        }));
    };
    
    // Filtra os suspeitos para ocultar líderes bloqueados na visualização normal
    const unlockedLeaders = getUnlockedLeaders(capturedSuspects);
    const visibleSuspects = suspectsSeed.filter(s => {
        if (s.id.startsWith("L")) {
            return unlockedLeaders.includes(s.id);
        }
        return true;
    });

    const totalPages = Math.ceil(visibleSuspects.length / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const paginated = visibleSuspects.slice(start, start + ITEMS_PER_PAGE);

    // Dados da facção atualizada se estiver na aba de facções
    const factionsList = Object.values(FACTIONS);
    const currentFaction = factionsList[factionPage - 1];

    return (
        <div>
            <style>{`
                .sg-subtabs {
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                    margin-bottom: 20px;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    padding-bottom: 12px;
                    position: sticky;
                    top: -16px;
                    background: rgba(10, 24, 34, 0.95);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    z-index: 10;
                    
                    /* Preenche perfeitamente todo o topo do card .pf-panel horizontalmente e verticalmente */
                    margin-top: -16px;
                    margin-left: -16px;
                    margin-right: -16px;
                    padding-top: 16px;
                    padding-left: 16px;
                    padding-right: 16px;
                    
                    /* Segue exatamente o arredondamento de 18px do topo do .pf-panel */
                    border-top-left-radius: 17px;
                    border-top-right-radius: 17px;
                }
                .sg-subtab-btn {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.5);
                    padding: 8px 18px;
                    border-radius: 12px;
                    font-size: 11px;
                    font-weight: 800;
                    cursor: pointer;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .sg-subtab-btn:hover {
                    color: #fff;
                    background: rgba(255,255,255,0.05);
                }
                .sg-subtab-btn.active {
                    background: rgba(128,189,255,0.12);
                    border-color: #80bdff;
                    color: #80bdff;
                    box-shadow: 0 0 10px rgba(128,189,255,0.15);
                }
                .sg-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 14px;
                    padding: 4px;
                }
                .sg-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                }
                .sg-item:hover {
                    transform: scale(1.05);
                }
                .sg-circle {
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                    overflow: hidden;
                    position: relative;
                    border: 2px solid rgba(255,255,255,0.12);
                    background: #111;
                }
                .sg-circle.unlocked {
                    border-color: #ffd700;
                    box-shadow: 0 0 12px rgba(255,215,0,0.3);
                }
                .sg-circle img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top;
                }
                .sg-name {
                    font-size: 8px;
                    font-weight: 800;
                    text-transform: uppercase;
                    text-align: center;
                    color: rgba(255,255,255,0.7);
                    letter-spacing: 0.5px;
                    max-width: 80px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .sg-name.unlocked { color: #ffd700; }
                .sg-count {
                    font-size: 8px;
                    color: rgba(255,255,255,0.4);
                    text-align: center;
                }
                .sg-count.unlocked { color: rgba(255,215,0,0.7); }
                .sg-pagination {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                    margin-top: 20px;
                }
                .sg-pag-btn {
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.2);
                    color: #fff;
                    padding: 6px 14px;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                    cursor: pointer;
                }
                .sg-pag-btn:disabled { opacity: 0.3; cursor: not-allowed; }
                .sg-pag-info { font-size: 11px; font-weight: 800; color: #80bdff; }

                /* Factions Tab Styles */
                .faction-card {
                    position: relative;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 20px;
                    padding: 16px 12px; /* Reduzido padding lateral para ganhar espaço */
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                .faction-card.dismantled {
                    border: 1.5px solid #ffd700 !important;
                    animation: faction-dismantled-glow 3s infinite ease-in-out;
                }
                @keyframes faction-dismantled-glow {
                    0%, 100% { box-shadow: 0 0 15px rgba(255, 215, 0, 0.1), 0 10px 30px rgba(0,0,0,0.2); }
                    50% { box-shadow: 0 0 25px rgba(255, 215, 0, 0.25), 0 10px 30px rgba(0,0,0,0.2); }
                }
                .faction-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    padding-bottom: 8px;
                }
                .faction-title {
                    font-size: 13px;
                    font-weight: 900;
                    color: #ffd700;
                    letter-spacing: 0.5px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .faction-focus {
                    font-size: 8.5px;
                    color: rgba(255,255,255,0.45);
                    font-style: italic;
                    margin-top: 2px;
                    text-align: left;
                    line-height: 1.3;
                }
                .faction-prog {
                    font-size: 8px;
                    font-weight: 900;
                    color: #80bdff;
                    background: rgba(128,189,255,0.12);
                    padding: 4px 8px;
                    border-radius: 6px;
                    border: 1px solid rgba(128,189,255,0.2);
                }
                .faction-content {
                    display: flex;
                    gap: 6px; /* Super aproximado para evitar qualquer vazamento */
                    align-items: center;
                }
                .faction-leader-side {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-width: 90px; /* Ajustado para acomodar o avatar maior */
                    position: relative;
                    padding: 8px 4px;
                    background: rgba(255,215,0,0.01);
                    border: 1.5px dashed rgba(255,215,0,0.2);
                    border-radius: 14px;
                    gap: 4px;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                }
                .faction-leader-side:hover {
                    transform: translateY(-2px);
                    background: rgba(255,255,255,0.02);
                }
                .faction-leader-side.captured {
                    background: rgba(255,215,0,0.04);
                    border: 1.5px solid rgba(255,215,0,0.35);
                    box-shadow: 0 0 10px rgba(255,215,0,0.1);
                }
                .faction-leader-avatar {
                    width: 74px; /* Aumentado de 68px para 74px para dar mais foco e imponência */
                    height: 74px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid rgba(255,255,255,0.15);
                    background: #111;
                    transition: all 0.3s;
                }
                .faction-leader-side.captured .faction-leader-avatar {
                    border-color: #ffd700;
                    box-shadow: 0 0 10px rgba(255,215,0,0.35);
                }
                .faction-leader-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center !important; /* Centralização perfeita */
                }
                .faction-leader-name {
                    font-size: 8.5px;
                    font-weight: 900;
                    text-transform: uppercase;
                    text-align: center;
                    color: rgba(255,255,255,0.7);
                    max-width: 82px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .faction-leader-side.captured .faction-leader-name {
                    color: #ffd700;
                }
                .faction-leader-status {
                    font-size: 7.5px;
                    font-weight: 800;
                    color: rgba(255,255,255,0.4);
                }
                .faction-leader-side.captured .faction-leader-status {
                    color: rgba(255,215,0,0.7);
                }
                .faction-members-side {
                    flex: 1;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px 6px; /* Reduzido levemente o espaçamento horizontal */
                    justify-items: center;
                }
                .faction-member-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                }
                .faction-member-item:hover {
                    transform: scale(1.06);
                }
                .faction-member-circle {
                    width: 58px; /* Aumentado de 44px para 58px para ficar bem grande */
                    height: 58px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid rgba(255,255,255,0.12);
                    background: #111;
                }
                .faction-member-circle.captured {
                    border-color: #ffd700;
                    box-shadow: 0 0 8px rgba(255,215,0,0.22);
                }
                .faction-member-circle img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top;
                }
                .faction-member-name {
                    font-size: 8px;
                    font-weight: 800;
                    text-transform: uppercase;
                    text-align: center;
                    color: rgba(255,255,255,0.6);
                    max-width: 68px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .faction-member-name.captured {
                    color: #ffd700;
                }
                .faction-member-status {
                    font-size: 7px;
                    color: rgba(255,255,255,0.35);
                }
            `}</style>

            {/* Sub-Tabs de navegação interna */}
            <div className="sg-subtabs">
                <button 
                    className={`sg-subtab-btn ${activeTab === "ALL" ? "active" : ""}`}
                    onClick={() => setActiveTab("ALL")}
                >
                    Todos os Alvos
                </button>
                <button 
                    className={`sg-subtab-btn ${activeTab === "FACTIONS" ? "active" : ""}`}
                    onClick={() => setActiveTab("FACTIONS")}
                >
                    Divisão por Facções
                </button>
            </div>

            {activeTab === "ALL" ? (
                <>
                    {/* Visualização de Grade Clássica */}
                    <div className="sg-grid">
                        {paginated.map(s => {
                            const count = capturedSuspects[s.id] || 0;
                            const isCaptured = count > 0;
                            const isLeader = s.id.startsWith("L");
                            
                            const defaultImage = isLeader ? "/Suspeitos/NaoIdentificadoLider.png?v=2" : "/Suspeitos/NaoIdentificado.png?v=2";
                            const normalImage = `/Suspeitos/${s.id}.png?v=2`;
                            const imageSrc = isCaptured ? normalImage : defaultImage;

                            return (
                                <div key={s.id} className="sg-item" onClick={() => setSelectedSuspect(s)}>
                                    <div 
                                        className={`sg-circle ${isCaptured ? "unlocked" : ""}`}
                                        style={{
                                            borderColor: isLeader ? "#ffd700" : undefined,
                                            boxShadow: isLeader ? "0 0 12px rgba(255,215,0,0.45)" : undefined,
                                            background: isLeader ? "#07121a" : "#111"
                                        }}
                                    >
                                        <img 
                                            src={imageSrc} 
                                            alt={s.codinome}
                                            onError={(e) => { e.target.src = defaultImage; }}
                                        />
                                    </div>
                                    <div 
                                        className={`sg-name ${isCaptured ? "unlocked" : ""}`}
                                        style={{ color: isLeader && isCaptured ? "#ffd700" : undefined, fontWeight: isLeader ? 900 : undefined }}
                                    >
                                        {isCaptured ? (isLeader ? `👑 ${s.codinome}` : s.codinome) : "???"}
                                    </div>
                                    <div className={`sg-count ${isCaptured ? "unlocked" : ""}`}>
                                        {isCaptured
                                            ? `🔓 ${count} ${count > 1 ? "prisões" : "prisão"}`
                                            : "🔒 Não capturado"
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {totalPages > 1 && (
                        <div className="sg-pagination">
                            <button className="sg-pag-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>❮</button>
                            <span className="sg-pag-info">PÁGINA {page} DE {totalPages}</span>
                            <button className="sg-pag-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>❯</button>
                        </div>
                    )}
                </>
            ) : (
                /* Nova Visualização por Facção Única Pagina */
                <div>
                    {(() => {
                        const f = currentFaction;
                        if (!f) return null;
                        
                        const colors = getFactionColors(f.id);
                        const leader = suspectsSeed.find(s => s.id === f.leaderId) || {};
                        const members = suspectsSeed.filter(s => f.members.includes(s.id));
                        
                        const isMocked = mockedFactions[f.id];
                        const leaderCount = isMocked ? 1 : (capturedSuspects[f.leaderId] || 0);
                        const isLeaderCaptured = isMocked ? true : (leaderCount > 0);
                        const isLeaderUnlocked = isMocked ? true : unlockedLeaders.includes(f.leaderId);
                        
                        const capturedMembersCount = isMocked ? 5 : members.filter(m => (capturedSuspects[m.id] || 0) > 0).length;

                        // Imagem do Líder: LiderGrupo.png quando não capturado
                        const defaultLeaderImg = isLeaderCaptured ? "/Suspeitos/NaoIdentificadoLider.png?v=2" : "/Suspeitos/LiderGrupo.png?v=2";
                        const leaderImgSrc = isLeaderCaptured ? `/Suspeitos/${f.leaderId}.png?v=2` : "/Suspeitos/LiderGrupo.png?v=2";

                        const isFactionDismantled = isLeaderCaptured && capturedMembersCount === 5;

                        return (
                            <div className={`faction-card ${isFactionDismantled ? "dismantled" : ""}`} style={{ background: colors.bg, borderColor: isFactionDismantled ? "#ffd700" : colors.border }}>
                                {/* Dashed Golden border and Watermark background for Dismantled status */}
                                {isFactionDismantled && (
                                    <>
                                        <div style={{
                                            position: "absolute",
                                            inset: 4,
                                            border: "1.5px dashed rgba(255, 215, 0, 0.22)",
                                            borderRadius: 16,
                                            pointerEvents: "none",
                                            zIndex: 0
                                        }} />
                                        <div style={{
                                            position: "absolute",
                                            top: "55%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%) rotate(-8deg)",
                                            fontSize: 32,
                                            fontWeight: 950,
                                            color: "rgba(255, 215, 0, 0.04)",
                                            letterSpacing: 4,
                                            pointerEvents: "none",
                                            zIndex: 0,
                                            whiteSpace: "nowrap",
                                            textTransform: "uppercase"
                                        }}>
                                            NEUTRALIZADA
                                        </div>
                                    </>
                                )}

                                <div className="faction-header" style={{ position: "relative", zIndex: 1 }}>
                                    <div>
                                        <div className="faction-title" style={{ color: isFactionDismantled ? "#ffd700" : colors.text }}>
                                            {f.emoji} {f.name}
                                        </div>
                                        <div className="faction-focus">
                                            {f.description}
                                        </div>
                                    </div>
                                    {isFactionDismantled ? (
                                        <div className="faction-prog" style={{ color: "#ffd700", background: "rgba(255, 215, 0, 0.15)", borderColor: "#ffd700", fontWeight: 900, boxShadow: "0 0 10px rgba(255, 215, 0, 0.25)" }}>
                                            🏆 DESMANTELADA
                                        </div>
                                    ) : (
                                        <div className="faction-prog" style={{ color: colors.text, background: colors.border, borderColor: colors.border }}>
                                            {capturedMembersCount}/5 INTEGRANTES
                                        </div>
                                    )}
                                </div>

                                <div className="faction-content" style={{ position: "relative", zIndex: 1 }}>
                                    {/* Lado do Líder */}
                                    <div 
                                        className={`faction-leader-side ${isLeaderCaptured ? "captured" : ""}`}
                                        style={{
                                            borderColor: isLeaderCaptured ? (isFactionDismantled ? "#ffd700" : colors.text) : colors.border,
                                            background: isLeaderCaptured ? (isFactionDismantled ? "rgba(255, 215, 0, 0.03)" : colors.bg) : "rgba(255, 255, 255, 0.01)"
                                        }}
                                        onClick={() => setSelectedSuspect(leader)}
                                    >
                                        {/* Detido stamp overlay positioned relative to faction-leader-side (outside circle to avoid overflow clipping) */}
                                        {isLeaderCaptured && (
                                            <div style={{
                                                position: "absolute",
                                                top: 56, // positions it at bottom-right corner of 74px avatar
                                                right: 14,
                                                transform: "rotate(-12deg)",
                                                border: "1.5px solid #ff1a40",
                                                color: "#ff1a40",
                                                background: "transparent",
                                                textShadow: "0 0 3px rgba(8, 3, 3, 0.95)",
                                                fontSize: 8,
                                                fontWeight: 900,
                                                padding: "1px 4px",
                                                borderRadius: 3,
                                                textTransform: "uppercase",
                                                letterSpacing: 0.5,
                                                zIndex: 10,
                                                boxShadow: "0 0 5px rgba(255, 26, 64, 0.4)",
                                                pointerEvents: "none"
                                            }}>
                                                DETIDO
                                            </div>
                                        )}
                                        <div 
                                            className="faction-leader-avatar"
                                            style={{
                                                position: "relative",
                                                borderColor: isLeaderCaptured ? (isFactionDismantled ? "#ffd700" : colors.text) : "rgba(255, 255, 255, 0.15)",
                                                boxShadow: isLeaderCaptured ? (isFactionDismantled ? `0 0 12px rgba(255, 215, 0, 0.35)` : `0 0 10px ${colors.border}`) : undefined
                                            }}
                                        >
                                            <img 
                                                src={leaderImgSrc} 
                                                alt={leader.codinome || "Líder"}
                                                style={{
                                                    transform: !isLeaderCaptured ? "scale(1.35)" : "scale(1.02)",
                                                    transition: "transform 0.3s"
                                                }}
                                                onError={(e) => { e.target.src = defaultLeaderImg; }}
                                            />
                                        </div>
                                        <div className="faction-leader-name" style={{ color: isLeaderCaptured ? (isFactionDismantled ? "#ffd700" : colors.text) : undefined }}>
                                            {isLeaderCaptured ? leader.codinome : "???"}
                                        </div>
                                        <div className="faction-leader-status" style={{ color: isLeaderCaptured ? (isFactionDismantled ? "#ffd700" : colors.text) : undefined }}>
                                            {isLeaderCaptured ? (
                                                `🔓 ${leaderCount} ${leaderCount > 1 ? "prisões" : "prisão"}`
                                            ) : isLeaderUnlocked ? (
                                                "🔓 Exposto"
                                            ) : (
                                                "🔒 Bloqueado"
                                            )}
                                        </div>
                                    </div>

                                    {/* Lado dos Integrantes */}
                                    <div className="faction-members-side">
                                        {members.map(m => {
                                            const mCount = isMocked ? 1 : (capturedSuspects[m.id] || 0);
                                            const isMCaptured = isMocked ? true : (mCount > 0);
                                            const memColor = isFactionDismantled ? "#ffd700" : colors.text;
                                            const memBorder = isFactionDismantled ? "rgba(255, 215, 0, 0.2)" : colors.border;
                                            return (
                                                <div key={m.id} className="faction-member-item" onClick={() => setSelectedSuspect(m)}>
                                                    <div 
                                                        className={`faction-member-circle ${isMCaptured ? "captured" : ""}`}
                                                        style={{
                                                            borderColor: isMCaptured ? memColor : undefined,
                                                            boxShadow: isMCaptured ? `0 0 8px ${memBorder}` : undefined
                                                        }}
                                                    >
                                                        <img 
                                                            src={isMCaptured ? `/Suspeitos/${m.id}.png?v=2` : "/Suspeitos/NaoIdentificado.png?v=2"} 
                                                            alt={m.codinome}
                                                        />
                                                    </div>
                                                    <div className={`faction-member-name ${isMCaptured ? "captured" : ""}`} style={{ color: isMCaptured ? memColor : undefined }}>
                                                        {isMCaptured ? m.codinome.split(" ")[0] : "???"}
                                                    </div>
                                                    <div className="faction-member-status" style={{ color: isMCaptured ? memColor : undefined }}>
                                                        {isMCaptured ? `🔓 ${mCount}p` : "🔒"}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                    {/* Paginação de Facções (1 de 7) */}
                    <div className="sg-pagination">
                        <button className="sg-pag-btn" disabled={factionPage === 1} onClick={() => setFactionPage(p => p - 1)}>❮</button>
                        <span className="sg-pag-info">FACÇÃO {factionPage} DE 7</span>
                        <button className="sg-pag-btn" disabled={factionPage === 7} onClick={() => setFactionPage(p => p + 1)}>❯</button>
                    </div>
                </div>
            )}

            {/* FULLSCREEN SUSPECT DOSSIER MODAL OVERLAY */}
            {selectedSuspect && (() => {
                const s = selectedSuspect;
                const count = capturedSuspects[s.id] || 0;
                let isMockedCaptured = false;
                if (mockedFactions) {
                    const factionOfSuspect = Object.values(FACTIONS).find(fa => fa.leaderId === s.id || fa.members.includes(s.id));
                    if (factionOfSuspect && mockedFactions[factionOfSuspect.id]) {
                        isMockedCaptured = true;
                    }
                }
                const isCaptured = isMockedCaptured ? true : (count > 0);
                const isLeader = s.id.startsWith("L");
                
                const factionOfSuspect = Object.values(FACTIONS).find(fa => fa.leaderId === s.id || fa.members.includes(s.id));
                const colorsOfSuspect = factionOfSuspect ? getFactionColors(factionOfSuspect.id) : { text: "#80bdff", bg: "rgba(128,189,255,0.05)", border: "rgba(128,189,255,0.2)" };

                const defaultImg = isLeader ? "/Suspeitos/NaoIdentificadoLider.png?v=2" : "/Suspeitos/NaoIdentificado.png?v=2";
                const imageSrc = isCaptured ? `/Suspeitos/${s.id}.png?v=2` : defaultImg;

                return (
                    <div style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 10000,
                        background: "rgba(3, 8, 12, 0.9)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 20,
                        fontFamily: "'Inter', sans-serif",
                        animation: "sg-fade-in 0.25s ease-out"
                    }} onClick={() => setSelectedSuspect(null)}>
                        
                        <style>{`
                            @keyframes sg-fade-in { from { opacity: 0; } to { opacity: 1; } }
                            @keyframes sg-scale-up {
                                from { opacity: 0; transform: scale(0.92) translateY(20px); }
                                to { opacity: 1; transform: scale(1) translateY(0); }
                            }
                            @keyframes sg-scanbar {
                                0% { top: 0%; }
                                50% { top: 100%; }
                                100% { top: 0%; }
                            }
                            .dossier-card {
                                max-width: 380px;
                                width: 100%;
                                background: linear-gradient(135deg, rgba(10, 20, 30, 0.95) 0%, rgba(5, 10, 15, 0.98) 100%);
                                border: 1.5px solid ${isCaptured ? (isLeader ? "#ffd700" : colorsOfSuspect.text) : "rgba(255,255,255,0.15)"};
                                box-shadow: 0 20px 50px rgba(0,0,0,0.6), 0 0 30px ${isCaptured ? (isLeader ? "rgba(255,215,0,0.15)" : "rgba(128,189,255,0.1)") : "rgba(0,0,0,0)"};
                                border-radius: 24px;
                                padding: 20px;
                                box-sizing: border-box;
                                animation: sg-scale-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                                position: relative;
                                overflow: hidden;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                            }
                            .dossier-img-frame {
                                width: 150px;
                                height: 150px;
                                border-radius: 20px;
                                overflow: hidden;
                                border: 2px solid ${isCaptured ? (isLeader ? "#ffd700" : colorsOfSuspect.text) : "rgba(255,255,255,0.15)"};
                                box-shadow: 0 10px 25px rgba(0,0,0,0.4);
                                position: relative;
                                background: #111;
                                margin-bottom: 20px;
                            }
                            .dossier-scanline {
                                position: absolute;
                                left: 0;
                                right: 0;
                                height: 3px;
                                background: linear-gradient(to bottom, transparent, ${isCaptured ? colorsOfSuspect.text : "#ff4d4d"}, transparent);
                                box-shadow: 0 0 8px ${isCaptured ? colorsOfSuspect.text : "#ff4d4d"};
                                animation: sg-scanbar 4s infinite linear;
                                z-index: 5;
                                pointer-events: none;
                            }
                            .dossier-prop-row {
                                display: grid;
                                grid-template-columns: 1.2fr 2fr;
                                gap: 6px 12px;
                                width: 100%;
                                font-size: 12px;
                                margin-bottom: 6px;
                            }
                            .dossier-prop-label {
                                opacity: 0.5;
                                font-weight: 800;
                                text-align: right;
                            }
                            .dossier-prop-value {
                                color: #fff;
                                font-weight: 500;
                            }
                            .dossier-close-btn {
                                margin-top: 20px;
                                width: 100%;
                                padding: 12px 0;
                                border-radius: 12px;
                                background: rgba(255,255,255,0.04);
                                border: 1px solid rgba(255,255,255,0.08);
                                color: rgba(255,255,255,0.7);
                                font-size: 11px;
                                font-weight: 800;
                                letter-spacing: 1px;
                                cursor: pointer;
                                transition: all 0.2s;
                            }
                            .dossier-close-btn:hover {
                                background: rgba(255,255,255,0.08);
                                color: #fff;
                                border-color: rgba(255,255,255,0.15);
                            }
                        `}</style>

                        <div className="dossier-card" onClick={(e) => e.stopPropagation()}>
                            
                            {/* Header title */}
                            <div style={{ textAlign: "center", marginBottom: 16 }}>
                                <div style={{ fontSize: 9, letterSpacing: 3, color: isCaptured ? colorsOfSuspect.text : "#ff4d6a", fontWeight: 800, marginBottom: 4 }}>
                                    {isCaptured ? "🗄️ DOSSIÊ DE INVESTIGAÇÃO" : "🔒 ARQUIVO CRIPTOGRAFADO"}
                                </div>
                                <h3 style={{ fontSize: 18, fontWeight: 900, margin: 0, color: isCaptured ? (isLeader ? "#ffd700" : "#fff") : "rgba(255,255,255,0.4)" }}>
                                    {isCaptured ? (isLeader ? `👑 ${s.codinome}` : s.codinome) : "ALVO DESCONHECIDO"}
                                </h3>
                            </div>

                            {/* Avatar Frame */}
                            <div className="dossier-img-frame">
                                {isCaptured && <div className="dossier-scanline" />}
                                <img 
                                    src={imageSrc} 
                                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} 
                                    alt={s.codinome}
                                    onError={(e) => { e.target.src = defaultImg; }}
                                />
                            </div>

                            {/* Profile Information */}
                            {isCaptured ? (
                                <div style={{ width: "100%", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 14, boxSizing: "border-box" }}>
                                    <div className="dossier-prop-row">
                                        <div className="dossier-prop-label">NOME REAL:</div>
                                        <div className="dossier-prop-value">{s.nomeReal || "Desconhecido"}</div>
                                    </div>
                                    <div className="dossier-prop-row">
                                        <div className="dossier-prop-label">ORIGEM:</div>
                                        <div className="dossier-prop-value">{s.origem || "Desconhecida"}</div>
                                    </div>
                                    <div className="dossier-prop-row">
                                        <div className="dossier-prop-label">IDADE:</div>
                                        <div className="dossier-prop-value">{s.idadeAparente || "Desconhecida"}</div>
                                    </div>
                                    <div className="dossier-prop-row">
                                        <div className="dossier-prop-label">RARIDADE:</div>
                                        <div className="dossier-prop-value" style={{ color: s.raridade === "Raro" ? "#80bdff" : s.raridade === "Lendário" ? "#ffd700" : "#fff", fontWeight: 800 }}>
                                            {s.raridade || "Comum"}
                                        </div>
                                    </div>
                                    {factionOfSuspect && (
                                        <div className="dossier-prop-row">
                                            <div className="dossier-prop-label">ORGANIZAÇÃO:</div>
                                            <div className="dossier-prop-value" style={{ color: colorsOfSuspect.text, fontWeight: 800 }}>
                                                {factionOfSuspect.emoji} {factionOfSuspect.name}
                                            </div>
                                        </div>
                                    )}
                                    <div className="dossier-prop-row">
                                        <div className="dossier-prop-label">STATUS:</div>
                                        <div className="dossier-prop-value" style={{ color: "#3cffA0", fontWeight: 800 }}>
                                            🔓 CAPTURADO ({count || 1}x)
                                        </div>
                                    </div>
                                    
                                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 10, paddingTop: 8 }}>
                                        <div style={{ fontSize: 9, opacity: 0.5, fontWeight: 800, marginBottom: 4, textTransform: "uppercase" }}>Relação com a Meridian:</div>
                                        <div style={{ fontSize: 11, fontStyle: "italic", color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>
                                            "{s.relacaoMeridian || "Nenhuma informação adicional nos arquivos."}"
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ width: "100%", background: "rgba(255,70,70,0.02)", border: "1px dashed rgba(255,70,70,0.15)", borderRadius: 16, padding: 16, boxSizing: "border-box", textAlign: "center" }}>
                                    <div style={{ fontSize: 20, marginBottom: 6 }}>🔒</div>
                                    <div style={{ fontSize: 11, fontWeight: 800, color: "#ff4d6a", marginBottom: 6 }}>ARQUIVO CRIPTOGRAFADO</div>
                                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.4 }}>
                                        Este alvo ainda não foi localizado e detido pela agência A.T.L.A.S.<br/>
                                        Conclua investigações e localize o suspeito no mural para descriptografar sua ficha técnica.
                                    </p>
                                </div>
                            )}

                            {/* Close Button */}
                            <button className="dossier-close-btn" onClick={() => setSelectedSuspect(null)}>
                                FECHAR DOSSIÊ ➔
                            </button>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
