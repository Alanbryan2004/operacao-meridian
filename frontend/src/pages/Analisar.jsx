import React, { useState, useMemo } from "react";
import { suspectsSeed } from "../game/store";

function Panel({ children, style = {} }) {
    return (
        <div
            style={{
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,.14)",
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
                padding: 14,
                ...style
            }}
        >
            {children}
        </div>
    );
}

export default function Analisar({ onBack }) {
    const [filters, setFilters] = useState({
        sexo: "",
        corCabelo: "",
        esporte: "",
        comidaFavorita: "",
        aparencia: "",
        origem: ""
    });

    const [selectedSuspect, setSelectedSuspect] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Lista única de opções para os filtros baseada no seed
    const options = useMemo(() => {
        const getUniques = (key) => {
            const vals = suspectsSeed.map(s => {
                const v = s[key];
                if (Array.isArray(v)) return v; // Se for array (como aparencia), retorna o array
                return [v];
            }).flat();
            return [...new Set(vals)].filter(Boolean).sort();
        };

        return {
            sexo: getUniques("sexo"),
            corCabelo: getUniques("corCabelo"),
            esporte: getUniques("esporte"),
            comidaFavorita: getUniques("comidaFavorita"),
            aparencia: getUniques("aparencia"),
            origem: getUniques("origem")
        };
    }, []);

    const filteredSuspects = useMemo(() => {
        const list = suspectsSeed.filter(s => {
            return Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                const suspectVal = s[key];
                if (Array.isArray(suspectVal)) {
                    return suspectVal.some(v => v.toLowerCase().includes(value.toLowerCase()));
                }
                return String(suspectVal).toLowerCase().includes(value.toLowerCase());
            });
        });
        setCurrentPage(1); // Reset page on filter change
        return list;
    }, [filters]);

    const handleFilterChange = (key, val) => {
        setFilters(prev => ({ ...prev, [key]: val }));
    };

    const paginatedSuspects = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredSuspects.slice(start, start + itemsPerPage);
    }, [filteredSuspects, currentPage]);

    const totalPages = Math.ceil(filteredSuspects.length / itemsPerPage);

    return (
        <div style={{ color: "#fff", paddingBottom: "40px" }}>
            <style>{`
                .om-filter-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 20px; }
                .om-filter-item { display: flex; flexDirection: column; gap: 4px; }
                .om-select { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 8px 6px; border-radius: 10px; font-size: 10px; outline: none; appearance: none; width: 100%; text-overflow: ellipsis; }
                .om-suspect-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
                .om-suspect-card { position: relative; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.15); cursor: pointer; transition: transform 0.2s; background: #000; height: 160px; }
                .om-suspect-card:active { transform: scale(0.96); }
                .om-suspect-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
                .om-suspect-name { position: absolute; bottom: 0; left: 0; right: 0; padding: 8px; background: linear-gradient(transparent, rgba(0,0,0,0.9)); font-size: 10px; font-weight: 800; text-align: center; color: #80bdff; text-transform: uppercase; }
                
                .om-pagination { display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 20px; }
                .om-pag-btn { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 8px 15px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; }
                .om-pag-btn:disabled { opacity: 0.3; cursor: not-allowed; }
                .om-pag-info { font-size: 12px; font-weight: 800; color: #80bdff; }

                .om-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 2000; display: flex; align-items: flex-end; justifyContent: center; }
                .om-modal-content { width: 100%; max-height: 92vh; overflow-y: auto; background: #071a26; border: 1px solid rgba(128,189,255,0.3); border-radius: 24px 24px 0 0; position: relative; padding: 0; }
                .om-detail-row { padding: 12px 15px; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .om-detail-label { font-size: 9px; color: #80bdff; font-weight: 800; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 1px; }
                .om-detail-value { font-size: 13px; opacity: 0.95; line-height: 1.4; }
                .om-badge-list { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 5px; }
                .om-badge-mini { padding: 4px 8px; border-radius: 6px; background: rgba(255,255,255,0.1); font-size: 10px; }
            `}</style>

            <Panel style={{ marginBottom: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#80bdff" }}>FILTRAR PERFIL</div>
                    <button
                        onClick={() => setFilters({ sexo: "", corCabelo: "", esporte: "", comidaFavorita: "", aparencia: "", origem: "" })}
                        style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "11px", cursor: "pointer" }}
                    >
                        LIMPAR
                    </button>
                </div>

                <div className="om-filter-grid">
                    {Object.keys(filters).map(key => (
                        <div key={key} className="om-filter-item">
                            <select
                                className="om-select"
                                value={filters[key]}
                                onChange={(e) => handleFilterChange(key, e.target.value)}
                            >
                                <option value="">{key.toUpperCase()}: TODOS</option>
                                {options[key].map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                <div style={{ fontSize: "10px", opacity: 0.5, textAlign: "center", marginBottom: "5px" }}>
                    {filteredSuspects.length} SUSPEITOS ENCONTRADOS
                </div>
            </Panel>

            <div className="om-suspect-grid">
                {paginatedSuspects.map(s => (
                    <div key={s.id} className="om-suspect-card" onClick={() => setSelectedSuspect(s)}>
                        <img src={`/Suspeitos/${s.id}.png`} className="om-suspect-img" alt={s.codinome} />
                        <div className="om-suspect-name">{s.codinome}</div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="om-pagination">
                    <button
                        className="om-pag-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                    >
                        ❮
                    </button>
                    <div className="om-pag-info">PÁGINA {currentPage} DE {totalPages}</div>
                    <button
                        className="om-pag-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                    >
                        ❯
                    </button>
                </div>
            )}

            <button
                className="om-btn"
                style={{ marginTop: "20px", background: "transparent", borderColor: "rgba(255,255,255,0.3)" }}
                onClick={onBack}
            >
                VOLTAR PARA CENTRAL
            </button>

            {/* Modal de Dossiê */}
            {selectedSuspect && (
                <div className="om-modal-overlay" onClick={() => setSelectedSuspect(null)}>
                    <div className="om-modal-content" onClick={e => e.stopPropagation()}>
                        <div style={{ position: "relative", height: "240px", background: "#000" }}>
                            <img
                                src={`/Suspeitos/${selectedSuspect.id}.png`}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                alt={selectedSuspect.codinome}
                            />
                            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px", background: "linear-gradient(transparent, #071a26)" }}>
                                <div style={{ fontSize: 24, fontWeight: 900, textTransform: "uppercase" }}>{selectedSuspect.codinome}</div>
                                <div style={{ fontSize: 11, color: "#ffd700", fontWeight: 700, letterSpacing: 1 }}>DOSSIÊ A.T.L.A.S.</div>
                            </div>
                            <button
                                onClick={() => setSelectedSuspect(null)}
                                style={{ position: "absolute", top: 15, right: 15, width: 32, height: 32, borderRadius: 16, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="om-detail-row">
                            <div className="om-detail-label">Informações Básicas</div>
                            <div className="om-detail-value"><b>Nome Real:</b> {selectedSuspect.nomeReal}</div>
                            <div className="om-detail-value"><b>Origem:</b> {selectedSuspect.origem}</div>
                            <div className="om-detail-value"><b>Idade:</b> {selectedSuspect.idadeAparente} anos</div>
                            <div className="om-detail-value"><b>Raridade:</b> {selectedSuspect.raridade}</div>
                        </div>

                        <div className="om-detail-row">
                            <div className="om-detail-label">Perfil Físico e Habilidades</div>
                            <div className="om-detail-value"><b>Sexo:</b> {selectedSuspect.sexo}</div>
                            <div className="om-detail-value"><b>Cabelo:</b> {selectedSuspect.corCabelo}</div>
                            <div className="om-detail-value"><b>Esporte:</b> {selectedSuspect.esporte}</div>
                            <div className="om-detail-value"><b>Comida Favorita:</b> {selectedSuspect.comidaFavorita}</div>
                            <div style={{ marginTop: 8 }}>
                                <div className="om-detail-label" style={{ color: "rgba(255,255,255,0.5)" }}>Aparência</div>
                                <div className="om-badge-list">
                                    {selectedSuspect.aparencia.map((a, i) => <span key={i} className="om-badge-mini">{a}</span>)}
                                </div>
                            </div>
                        </div>

                        <div className="om-detail-row">
                            <div className="om-detail-label">Assinatura do Crime</div>
                            <ul style={{ margin: "5px 0", paddingLeft: "18px", fontSize: "13px", opacity: 0.8, color: "#ffd700" }}>
                                {selectedSuspect.assinatura.map((a, i) => <li key={i}>{a}</li>)}
                            </ul>
                        </div>

                        <div className="om-detail-row">
                            <div className="om-detail-label">Idiomas</div>
                            <div className="om-badge-list">
                                {selectedSuspect.idiomas.map((idm, i) => (
                                    <span key={i} className="om-badge-mini">
                                        {idm.idioma} ({idm.nivel})
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="om-detail-row" style={{ background: "rgba(128,189,255,0.05)", borderBottom: "none" }}>
                            <div className="om-detail-label">Observações da A.T.L.A.S.</div>
                            <div className="om-detail-value" style={{ fontStyle: "italic", fontSize: 13 }}>
                                "{selectedSuspect.relacaoMeridian}"
                            </div>
                        </div>

                        <div style={{ padding: 20 }}>
                            <button className="om-btn om-btn-primary" onClick={() => setSelectedSuspect(null)}>FECHAR DOSSIÊ</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
