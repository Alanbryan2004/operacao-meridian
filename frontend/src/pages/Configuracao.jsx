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
            background: "radial-gradient(circle at center, #071a26 0%, #000 70%)",
            color: "#fff",
            padding: "20px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <style>{`
                .cfg-panel { 
                    width: 100%;
                    max-width: 450px;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.12);
                    background: rgba(255,255,255,0.05);
                    backdrop-filter: blur(15px);
                    padding: 24px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.6);
                }
                .cfg-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                }
                .cfg-item:last-child { border-bottom: none; }
                .cfg-label { font-size: 15px; font-weight: 600; color: rgba(255,255,255,0.9); }
                .cfg-desc { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px; }
                
                .toggle-btn {
                    width: 50px;
                    height: 26px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 13px;
                    position: relative;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .toggle-btn.active {
                    background: rgba(128,189,255,0.25);
                    border-color: #80bdff;
                }
                .toggle-thumb {
                    width: 20px;
                    height: 20px;
                    background: #fff;
                    border-radius: 50%;
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                }
                .toggle-btn.active .toggle-thumb {
                    left: 26px;
                    background: #80bdff;
                }
                .back-btn {
                    align-self: flex-start;
                    background: transparent;
                    border: none;
                    color: rgba(255,255,255,0.5);
                    font-size: 14px;
                    cursor: pointer;
                    margin-bottom: 24px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: color 0.2s;
                    max-width: 450px;
                    width: 100%;
                    margin: 0 auto 24px;
                }
                .back-btn:hover { color: #80bdff; }
            `}</style>

            <button className="back-btn" onClick={() => nav(-1)}>← VOLTAR</button>

            <div className="cfg-panel">
                <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 24, letterSpacing: 1, color: "#80bdff" }}>CONFIGURAÇÃO</h1>
                
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

                <div style={{ marginTop: 32, fontSize: 11, textAlign: "center", opacity: 0.3 }}>
                    VERSÃO 1.4.0 • OPERAÇÃO MERIDIAN
                </div>
            </div>
        </div>
    );
}
