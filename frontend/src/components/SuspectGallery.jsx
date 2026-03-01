import React, { useState } from "react";
import { suspectsSeed } from "../game/store";

const ITEMS_PER_PAGE = 12;

export default function SuspectGallery({ capturedSuspects = {} }) {
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(suspectsSeed.length / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const paginated = suspectsSeed.slice(start, start + ITEMS_PER_PAGE);

    return (
        <div>
            <style>{`
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
                .sg-locked-overlay {
                    position: absolute;
                    inset: 0;
                    background: #0a0a0a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .sg-question {
                    font-size: 28px;
                    font-weight: 900;
                    color: #ff3b3b;
                    text-shadow: 0 0 10px rgba(255,59,59,0.5);
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
                    margin-top: 16px;
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
            `}</style>

            <div className="sg-grid">
                {paginated.map(s => {
                    const count = capturedSuspects[s.id] || 0;
                    const isUnlocked = count > 0;
                    return (
                        <div key={s.id} className="sg-item">
                            <div className={`sg-circle ${isUnlocked ? "unlocked" : ""}`}>
                                {isUnlocked ? (
                                    <img src={`/Suspeitos/${s.id}.png`} alt={s.codinome} />
                                ) : (
                                    <div className="sg-locked-overlay">
                                        <span className="sg-question">?</span>
                                    </div>
                                )}
                            </div>
                            <div className={`sg-name ${isUnlocked ? "unlocked" : ""}`}>
                                {isUnlocked ? s.codinome : "???"}
                            </div>
                            <div className={`sg-count ${isUnlocked ? "unlocked" : ""}`}>
                                {isUnlocked
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
        </div>
    );
}
