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

export default function Analisar({ onBack, filters, setFilters, warrantId, setWarrantId }) {
    const toggleFilter = (key, val) => {
        setFilters(prev => {
            const current = prev[key];
            if (current.includes(val)) {
                return { ...prev, [key]: current.filter(v => v !== val) };
            } else {
                return { ...prev, [key]: [...current, val] };
            }
        });
    };

    const [selectedSuspect, setSelectedSuspect] = useState(null);
    const [isDossierExpanded, setIsDossierExpanded] = useState(false);
    const [selectedId, setSelectedId] = useState(null); // Para seleção local (checkbox)
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
            corOlhos: getUniques("corOlhos"),
            esporte: getUniques("esporte"),
            comidaFavorita: getUniques("comidaFavorita"),
            caracteristica: getUniques("caracteristica"),
            origem: getUniques("origem")
        };
    }, []);

    const filteredSuspects = useMemo(() => {
        const list = suspectsSeed.filter(s => {
            return Object.entries(filters).every(([key, selectedValues]) => {
                if (selectedValues.length === 0) return true;
                const suspectVal = s[key];

                if (Array.isArray(suspectVal)) {
                    // Se o suspeito tem múltiplos valores (ex: aparência), 
                    // checa se QUALQUER um dos valores do suspeito está nos selecionados
                    return suspectVal.some(v => selectedValues.includes(v));
                }

                // Se o suspeito tem valor único, checa se está na lista selecionada
                return selectedValues.includes(suspectVal);
            });
        });
        setCurrentPage(1); // Reset page on filter change
        return list;
    }, [filters]);

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
                .om-suspect-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 20px; }
                .om-suspect-card { position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.15); cursor: pointer; transition: transform 0.2s; background: #000; height: 130px; }
                .om-suspect-card.selected { border: 2px solid #ffd700; box-shadow: 0 0 15px rgba(255,215,0,0.3); }
                .om-suspect-card:active { transform: scale(0.96); }
                .om-suspect-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
                .om-suspect-name { position: absolute; bottom: 0; left: 0; right: 0; padding: 6px; background: linear-gradient(transparent, rgba(0,0,0,0.95)); font-size: 9px; font-weight: 800; text-align: center; color: #80bdff; text-transform: uppercase; }
                
                .om-selection-badge { position: absolute; top: 6px; right: 6px; width: 14px; height: 14px; border-radius: 7px; background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.4); display: flex; align-items: center; justifyContent: center; font-size: 8px; }
                .om-selection-badge.active { background: #ffd700; color: #000; border-color: #ffd700; }
                
                .om-warrant-badge { position: absolute; top: 6px; left: 6px; background: #ff3b3b; color: #fff; font-size: 7px; font-weight: 900; padding: 2px 4px; border-radius: 4px; text-transform: uppercase; box-shadow: 0 0 5px rgba(255,0,0,0.5); }
                
                .om-pagination { display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 20px; }
                .om-pag-btn { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 8px 15px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; }
                .om-pag-btn:disabled { opacity: 0.3; cursor: not-allowed; }
                .om-pag-info { font-size: 12px; font-weight: 800; color: #80bdff; }

                .om-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 2000; display: flex; align-items: flex-end; justifyContent: center; }
                .om-modal-content { width: 100%; height: 95vh; overflow: hidden; background: #000; border: 1px solid rgba(128,189,255,0.3); border-radius: 20px 20px 0 0; position: relative; padding: 0; }
                
                .om-dossier-panel { position: absolute; left: 0; right: 0; bottom: 0; background: #071a26; transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1); display: flex; flexDirection: column; border-top: 1px solid rgba(128,189,255,0.3); }
                .om-dossier-header { padding: 12px 15px; background: rgba(0,0,0,0.3); display: flex; justify-content: space-between; align-items: center; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .om-dossier-content { flex: 1; overflow-y: auto; padding-bottom: 20px; }

                .om-detail-row { padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .om-detail-label { font-size: 8px; color: #80bdff; font-weight: 800; text-transform: uppercase; margin-bottom: 2px; letter-spacing: 1px; }
                .om-detail-value { font-size: 11px; opacity: 0.95; line-height: 1.2; }
                .om-badge-list { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 3px; }
                .om-badge-mini { padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,0.1); font-size: 9px; }
            `}</style>

            <Panel style={{ marginBottom: "15px", maxHeight: "280px", overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", sticky: "top" }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "#80bdff" }}>FILTRAR PERFIL</div>
                    <div style={{ fontSize: "10px", opacity: 0.7, fontWeight: 700, letterSpacing: 0.5 }}>
                        {filteredSuspects.length} SUSPEITOS
                    </div>
                    <button
                        onClick={() => setFilters({ sexo: [], corCabelo: [], corOlhos: [], esporte: [], comidaFavorita: [], caracteristica: [], origem: [] })}
                        style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "11px", cursor: "pointer" }}
                    >
                        LIMPAR
                    </button>
                </div>

                <div style={{ display: "grid", gap: 15 }}>
                    {Object.keys(filters).filter(key => options[key]).map(key => (
                        <div key={key}>
                            <div style={{ fontSize: 9, fontWeight: 900, color: "#80bdff", marginBottom: 6, textTransform: "uppercase", opacity: 0.6 }}>
                                {{ sexo: "Sexo", corCabelo: "Cor do Cabelo", corOlhos: "Cor dos Olhos", esporte: "Esporte", comidaFavorita: "Comida Favorita", caracteristica: "Característica", origem: "Origem" }[key] || key}
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {(options[key] || []).map(opt => {
                                    const isSelected = filters[key].includes(opt);
                                    return (
                                        <button
                                            key={opt}
                                            onClick={() => toggleFilter(key, opt)}
                                            style={{
                                                padding: "4px 10px",
                                                borderRadius: "6px",
                                                fontSize: "10px",
                                                border: "1px solid",
                                                borderColor: isSelected ? "#ffd700" : "rgba(255,255,255,0.1)",
                                                background: isSelected ? "rgba(255,215,0,0.2)" : "rgba(255,255,255,0.05)",
                                                color: isSelected ? "#ffd700" : "rgba(255,255,255,0.7)",
                                                cursor: "pointer",
                                                transition: "all 0.2s"
                                            }}
                                        >
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </Panel>

            <div className="om-suspect-grid">
                {paginatedSuspects.map(s => (
                    <div
                        key={s.id}
                        className={`om-suspect-card ${selectedId === s.id ? "selected" : ""}`}
                        onClick={() => setSelectedId(s.id)}
                        onDoubleClick={() => setSelectedSuspect(s)}
                    >
                        <img src={`/Suspeitos/${s.id}.png`} className="om-suspect-img" alt={s.codinome} />
                        <div className="om-suspect-name">{s.codinome}</div>
                        <div className={`om-selection-badge ${selectedId === s.id ? "active" : ""}`}>
                            {selectedId === s.id ? "✓" : ""}
                        </div>
                        {warrantId === s.id && <div className="om-warrant-badge">Busca de Prisão</div>}
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedSuspect(s); }}
                            style={{ position: "absolute", bottom: 25, right: 5, background: "rgba(0,0,0,0.5)", border: "none", borderRadius: 4, width: 24, height: 24, padding: 0, color: "#fff", fontSize: 10, cursor: "pointer" }}
                        >
                            ℹ️
                        </button>
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

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                    className="om-btn"
                    style={{ flex: 1, background: "transparent", borderColor: "rgba(255,255,255,0.3)" }}
                    onClick={onBack}
                >
                    VOLTAR
                </button>
                <button
                    className="om-btn om-btn-primary"
                    style={{ flex: 1.5, background: selectedId ? "#ff3b3b" : "rgba(255,255,255,0.1)", borderColor: selectedId ? "#ff3b3b" : "rgba(255,255,255,0.1)" }}
                    disabled={!selectedId}
                    onClick={() => {
                        if (window.confirm("Deseja emitir Mandado de Prisão para este suspeito?")) {
                            setWarrantId(selectedId);
                        }
                    }}
                >
                    MANDADO
                </button>
            </div>

            {selectedSuspect && (
                <div className="om-modal-overlay" onClick={() => { setSelectedSuspect(null); setIsDossierExpanded(false); }}>
                    <div className="om-modal-content" onClick={e => e.stopPropagation()}>
                        {/* Foto de Fundo (Sempre visível) */}
                        <div style={{ height: "100%", width: "100%", position: "relative" }}>
                            <img
                                src={`/Suspeitos/${selectedSuspect.id}.png`}
                                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                                alt={selectedSuspect.codinome}
                            />
                            <button
                                onClick={() => { setSelectedSuspect(null); setIsDossierExpanded(false); }}
                                style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.5)", border: "none", color: "#fff", width: 32, height: 32, borderRadius: 16, fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
                            >
                                ×
                            </button>
                        </div>

                        {/* Painel Deslizante */}
                        <div
                            className="om-dossier-panel"
                            style={{ height: isDossierExpanded ? "85%" : "80px" }}
                        >
                            <div className="om-dossier-header" onClick={() => setIsDossierExpanded(!isDossierExpanded)}>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 900, textTransform: "uppercase" }}>{selectedSuspect.codinome}</div>
                                    <div style={{ fontSize: 8, color: "#ffd700", fontWeight: 800 }}>{isDossierExpanded ? "FECHAR DETALHES" : "VER DOSSIÊ COMPLETO"}</div>
                                </div>
                                <div style={{ fontSize: 16 }}>{isDossierExpanded ? "▼" : "▲"}</div>
                            </div>

                            <div className="om-dossier-content">
                                <div className="om-detail-row">
                                    <div className="om-detail-label">INFORMAÇÕES BÁSICAS</div>
                                    <div className="om-detail-value">
                                        <b>Nome Real:</b> {selectedSuspect.nomeReal}<br />
                                        <b>Origem:</b> {selectedSuspect.origem}<br />
                                        <b>Idade:</b> {selectedSuspect.idadeAparente} anos<br />
                                        <b>Raridade:</b> {selectedSuspect.raridade || "Normal"}
                                    </div>
                                </div>

                                <div className="om-detail-row">
                                    <div className="om-detail-label">PERFIL FÍSICO E HABILIDADES</div>
                                    <div className="om-detail-value">
                                        <b>Sexo:</b> {selectedSuspect.sexo}<br />
                                        <b>Cabelo:</b> {selectedSuspect.corCabelo}<br />
                                        <b>Olhos:</b> {selectedSuspect.corOlhos}<br />
                                        <b>Esporte:</b> {selectedSuspect.esporte}<br />
                                        <b>Comida Favorita:</b> {selectedSuspect.comidaFavorita}
                                    </div>
                                    <div className="om-badge-list">
                                        {selectedSuspect.caracteristica.map(a => <span key={a} className="om-badge-mini">{a}</span>)}
                                    </div>
                                </div>

                                <div className="om-detail-row">
                                    <div className="om-detail-label">ASSINATURA DO CRIME</div>
                                    <div className="om-detail-value">
                                        {selectedSuspect.assinatura.map(ass => <div key={ass}>• {ass}</div>)}
                                    </div>
                                </div>

                                <div className="om-detail-row">
                                    <div className="om-detail-label">IDIOMAS</div>
                                    <div className="om-badge-list">
                                        {selectedSuspect.idiomas.map(i => (
                                            <span key={i.idioma} className="om-badge-mini">{i.idioma} ({i.nivel})</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="om-detail-row">
                                    <div className="om-detail-label">OBSERVAÇÕES DA A.T.L.A.S.</div>
                                    <div className="om-detail-value" style={{ fontStyle: "italic" }}>
                                        "{selectedSuspect.relacaoMeridian}"
                                    </div>
                                </div>

                                <div style={{ padding: "15px" }}>
                                    <button
                                        className="om-btn"
                                        style={{ width: "100%", background: "rgba(255,255,255,0.05)" }}
                                        onClick={() => setIsDossierExpanded(false)}
                                    >
                                        RECOLHER PERFIL
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
