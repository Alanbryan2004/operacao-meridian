import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../game/GameProvider";

export default function Configuracao() {
    const nav = useNavigate();
    const { state, dispatch } = useGame();
    
    if (!state || !state.player) return null;
    const settings = state.player.settings || { musicEnabled: true, clickSoundEnabled: true };

    const toggleMusic = () => {
        dispatch({ type: "UPDATE_SETTINGS", payload: { musicEnabled: !settings.musicEnabled } });
    };

    const toggleClick = () => {
        dispatch({ type: "UPDATE_SETTINGS", payload: { clickSoundEnabled: !settings.clickSoundEnabled } });
    };

    return (
        <div style={{
            minHeight: "100dvh",
            width: "100vw",
            background: "#000",
            color: "#fff",
            padding: "30px 20px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "'Inter', sans-serif"
        }}>
            <style>{`
                .cfg-panel { 
                    width: 100%;
                    max-width: 450px;
                    border-radius: 28px;
                    border: 1px solid rgba(255,255,255,0.1);
                    background: rgba(255,255,255,0.03);
                    backdrop-filter: blur(20px);
                    padding: 32px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.8);
                }
                .cfg-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .cfg-item:last-child { border-bottom: none; }
                .cfg-label { font-size: 17px; font-weight: 700; color: #fff; }
                .cfg-desc { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 4px; }
                
                .toggle-btn {
                    width: 52px;
                    height: 28px;
                    background: #2a2a2a;
                    border-radius: 14px;
                    position: relative;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .toggle-btn.active {
                    background: #4a4a4a;
                }
                .toggle-thumb {
                    width: 22px;
                    height: 22px;
                    background: #fff;
                    border-radius: 50%;
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .toggle-btn.active .toggle-thumb {
                    left: 27px;
                }

                .back-btn {
                    align-self: flex-start;
                    background: transparent;
                    border: none;
                    color: rgba(255,255,255,0.6);
                    font-size: 14px;
                    font-weight: 800;
                    cursor: pointer;
                    margin-bottom: 30px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.2s;
                    max-width: 450px;
                    width: 100%;
                    margin: 0 auto 30px;
                }
                .back-btn:hover { color: #fff; transform: translateX(-5px); }
            `}</style>

            <button className="back-btn" onClick={() => nav(-1)}>
                <span style={{ fontSize: 20 }}>←</span> VOLTAR
            </button>

            <div className="cfg-panel">
                <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 32, color: "#80bdff", letterSpacing: "1px" }}>
                    CONFIGURAÇÃO
                </h1>
                
                <div className="cfg-item">
                    <div>
                        <div className="cfg-label">Áudio do Jogo</div>
                        <div className="cfg-desc">Música de fundo e trilha sonora</div>
                    </div>
                    <div 
                        className={`toggle-btn ${settings.musicEnabled ? 'active' : ''}`}
                        onClick={toggleMusic}
                    >
                        <div className="toggle-thumb" />
                    </div>
                </div>

                <div className="cfg-item">
                    <div>
                        <div className="cfg-label">Som do Clique</div>
                        <div className="cfg-desc">Feedback sonoro ao interagir com menus</div>
                    </div>
                    <div 
                        className={`toggle-btn ${settings.clickSoundEnabled ? 'active' : ''}`}
                        onClick={toggleClick}
                    >
                        <div className="toggle-thumb" />
                    </div>
                </div>

                <div style={{ marginTop: 40, fontSize: 11, textAlign: "center", opacity: 0.3, letterSpacing: "1px", fontWeight: 700 }}>
                    VERSÃO 1.4.0 • OPERAÇÃO MERIDIAN
                </div>
            </div>
        </div>
    );
}
