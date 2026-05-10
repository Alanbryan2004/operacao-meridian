// src/pages/CompetitiveLobby.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGame } from "../game/GameProvider";
import { supabase } from "../lib/supabase";
import { CASOS_SCENARIOS } from "../game/CasosScenarios";
import { useRef } from "react";

function Badge({ children, tone = "gray" }) {
    const map = {
        gray: { bg: "rgba(255,255,255,0.08)", bd: "rgba(255,255,255,0.14)", tx: "rgba(255,255,255,0.88)" },
        blue: { bg: "rgba(80,170,255,0.12)", bd: "rgba(80,170,255,0.22)", tx: "rgba(210,240,255,0.95)" },
        green: { bg: "rgba(60,255,160,0.10)", bd: "rgba(60,255,160,0.22)", tx: "rgba(200,255,235,0.95)" },
        amber: { bg: "rgba(255,190,90,0.12)", bd: "rgba(255,190,90,0.22)", tx: "rgba(255,240,215,0.95)" },
        red: { bg: "rgba(255,90,90,0.10)", bd: "rgba(255,90,90,0.22)", tx: "rgba(255,225,225,0.95)" },
        purple: { bg: "rgba(170,120,255,0.12)", bd: "rgba(170,120,255,0.22)", tx: "rgba(240,225,255,0.95)" },
    };
    const s = map[tone] || map.gray;
    return (
        <span style={{ fontSize: 11, padding: "4px 8px", borderRadius: 999, background: s.bg, border: `1px solid ${s.bd}`, color: s.tx, display: "inline-flex", alignItems: "center", gap: 6 }}>
            {children}
        </span>
    );
}

export default function CompetitiveLobby() {
    const { caseId } = useParams();
    const nav = useNavigate();
    const { state } = useGame();
    const [lobby, setLobby] = useState(null);
    const [players, setPlayers] = useState([]);
    const [status, setStatus] = useState("Acessando a Lista A.T.L.A.S...");
    const [timeLeft, setTimeLeft] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isExpiredWithoutPlayers, setIsExpiredWithoutPlayers] = useState(false);

    // --- MODO DE CONEXÃO ---
    const [joinMode, setJoinMode] = useState(null); // null, "PUBLIC", "PRIVATE_CREATE", "PRIVATE_JOIN"
    const [privateIdInput, setPrivateIdInput] = useState("");
    const [showPrivateInput, setShowPrivateInput] = useState(false);
    const [privateWaitSeconds, setPrivateWaitSeconds] = useState(60); // Tempo de espera da sala privada
    const [showPrivateTimeSelect, setShowPrivateTimeSelect] = useState(false);

    const playersRef = useRef([]);
    const statePlayerRef = useRef(state.player);

    useEffect(() => {
        playersRef.current = players;
    }, [players]);

    useEffect(() => {
        statePlayerRef.current = state.player;
    }, [state.player]);

    const fetchOrCreateLobby = useCallback(async () => {
        if (!joinMode) return; // Só busca se tiver escolhido o modo
        
        if (!state.player?.supabaseId) {
            setStatus("Erro: Agente não identificado. Verifique seu login.");
            return;
        }

        try {
            console.log(`[ATLAS] Buscando lobby (Modo: ${joinMode})...`);
            setStatus(
                joinMode === "PRIVATE_JOIN" ? "Buscando sala privada..." 
                : joinMode === "PRIVATE_CREATE" ? "Criando sala privada..."
                : "Buscando parceiros na Lista A.T.L.A.S.."
            );

            // --- Modo PRIVATE_CREATE: cria direto sem buscar ---
            if (joinMode === "PRIVATE_CREATE") {
                const { data: newLobby, error: createError } = await supabase
                    .from("competitive_lobbies")
                    .insert([{ case_id: caseId, status: "waiting", wait_seconds: privateWaitSeconds }])
                    .select()
                    .single();
                
                if (createError) {
                    console.error("[ATLAS] Erro createLobby:", createError);
                    setErrorMsg(`Erro ao criar sala: ${createError.message}`);
                    return;
                }

                setStatus("Sala privada criada! Compartilhe o código.");
                console.log("[ATLAS] Sala privada criada:", newLobby.id);
                
                const { error: joinError } = await supabase
                    .from("competitive_players")
                    .upsert([{ lobby_id: newLobby.id, player_id: state.player.supabaseId }], { onConflict: "lobby_id,player_id" });
                
                if (joinError) {
                    setErrorMsg(`Erro ao entrar na sala: ${joinError.message}`);
                    return;
                }

                setLobby(newLobby);
                return;
            }

            const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
            const sixtySecondsAgo = new Date(Date.now() - 60 * 1000).toISOString();

            const findLobby = async () => {
                if (joinMode === "PRIVATE_JOIN") {
                    // UUID não suporta ilike — busca todos os lobbies recentes e filtra pelo código no cliente
                    const code = privateIdInput.trim().toLowerCase();
                    const { data: lobbies, error } = await supabase
                        .from("competitive_lobbies")
                        .select("*")
                        .eq("case_id", caseId)
                        .eq("status", "waiting")
                        .gt("created_at", tenMinutesAgo)
                        .order("created_at", { ascending: true });
                    
                    if (error) return { data: null, error };
                    const match = (lobbies || []).find(l => l.id.toLowerCase().startsWith(code));
                    return { data: match || null, error: null };
                }

                return await supabase
                    .from("competitive_lobbies")
                    .select("*")
                    .eq("case_id", caseId)
                    .eq("status", "waiting")
                    .gt("created_at", sixtySecondsAgo)
                    .order("created_at", { ascending: true })
                    .limit(1)
                    .maybeSingle();
            };

            let { data: fetchLobby, error: fetchError } = await findLobby();

            if (fetchError) {
                console.error("[ATLAS] Erro fetchLobby:", fetchError);
                setErrorMsg(`Erro na busca: ${fetchError.message}`);
                return;
            }

            // Lógica de Retry com Jitter apenas para buscas públicas
            if (!fetchLobby && joinMode === "PUBLIC") {
                console.log("[ATLAS] Nenhum lobby público encontrado. Aguardando sincronia...");
                const jitter = Math.floor(Math.random() * 1500) + 500; 
                await new Promise(r => setTimeout(r, jitter));
                
                const retry = await findLobby();
                fetchLobby = retry.data;
            }

            let targetLobby = fetchLobby;

            if (!targetLobby && joinMode === "PRIVATE_JOIN") {
                // Tenta ver se a sala privada já está ativa (para entrar como retardatário)
                const code = privateIdInput.trim().toLowerCase();
                const { data: activeLobbies } = await supabase
                    .from("competitive_lobbies")
                    .select("*")
                    .eq("case_id", caseId)
                    .eq("status", "active")
                    .gt("created_at", tenMinutesAgo);

                const activeLobby = (activeLobbies || []).find(l => l.id.toLowerCase().startsWith(code));

                if (activeLobby) {
                    targetLobby = activeLobby;
                } else {
                    setErrorMsg("Sala não encontrada. Verifique o código e tente novamente.");
                    setJoinMode(null);
                    return;
                }
            }

            if (!targetLobby && joinMode === "PUBLIC") {
                const { data: activeLobby } = await supabase
                    .from("competitive_lobbies")
                    .select("*")
                    .eq("case_id", caseId)
                    .eq("status", "active")
                    .gt("created_at", sixtySecondsAgo)
                    .order("created_at", { ascending: false })
                    .limit(1)
                    .maybeSingle();
                
                if (activeLobby) {
                    console.log("[ATLAS] Lobby ativo recente encontrado. Entrando como retardatário.");
                    targetLobby = activeLobby;
                }
            }

            if (!targetLobby && (joinMode === "PUBLIC")) {
                console.log("[ATLAS] Criando novo lobby...");
                setStatus("Iniciando novo canal A.T.L.A.S...");
                const { data: newLobby, error: createError } = await supabase
                    .from("competitive_lobbies")
                    .insert([{ case_id: caseId, status: "waiting", wait_seconds: 60 }])
                    .select()
                    .single();
                
                if (createError) {
                    console.error("[ATLAS] Erro createLobby:", createError);
                    setErrorMsg(`Erro ao criar lobby: ${createError.message}`);
                    return;
                }
                targetLobby = newLobby;
            }

            if (!targetLobby) return;

            setStatus("Agente Sincronizado. Entrando na Missão...");

            console.log("[ATLAS] Entrando no lobby:", targetLobby.id);
            const { error: joinError } = await supabase
                .from("competitive_players")
                .upsert([{ lobby_id: targetLobby.id, player_id: state.player.supabaseId }], { onConflict: "lobby_id,player_id" });
            
            if (joinError) {
                console.error("[ATLAS] Erro joinLobby:", joinError);
                setErrorMsg(`Erro ao entrar no lobby: ${joinError.message}`);
                return;
            }

            setLobby(targetLobby);

        } catch (e) {
            console.error("[ATLAS] Erro inesperado:", e);
            setErrorMsg("Ocorreu um erro inesperado ao conectar à rede.");
        }
    }, [caseId, state.player?.supabaseId, joinMode, privateIdInput]);

    useEffect(() => {
        if (joinMode) fetchOrCreateLobby();
    }, [fetchOrCreateLobby, joinMode]);

    // 🔥 NOVO: Efeito reativo para navegação
    useEffect(() => {
        if (lobby?.status === "active" && lobby?.scenario_id) {
            console.log("[ATLAS] Status mudou para ACTIVE. Iniciando jogo reativamente...");
            startGame(lobby.scenario_id, lobby.id);
        }
    }, [lobby?.status, lobby?.scenario_id]);

    useEffect(() => {
        if (!lobby) return;

        console.log("[ATLAS] Subscritibilidade Realtime ativada para lobby:", lobby.id);
        const channel = supabase
            .channel(`lobby-${lobby.id}`)
            .on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "competitive_players",
                filter: `lobby_id=eq.${lobby.id}`
            }, () => {
                refreshPlayers();
            })
            .on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "competitive_lobbies",
                filter: `id=eq.${lobby.id}`
            }, (payload) => {
                console.log("[ATLAS] Update no lobby recebido via Realtime:", payload.new.status);
                // Atualizamos o estado do lobby, o que disparará o useEffect reativo acima
                setLobby(prev => ({ ...prev, ...payload.new }));
            })
            .subscribe((status) => {
                console.log("[ATLAS] Status da subscrição Realtime:", status);
            });

        const refreshPlayers = async () => {
            const { data } = await supabase
                .from("competitive_players")
                .select("player_id, profiles(nickname, avatar)")
                .eq("lobby_id", lobby.id)
                .order("joined_at", { ascending: true });
            if (data) {
                console.log("[ATLAS] Lista de jogadores atualizada:", data.length);
                setPlayers(data);
            }
        };

        refreshPlayers();

        const interval = setInterval(() => {
            if (lobby.status !== "waiting") return;

            const now = new Date();
            const created = new Date(lobby.created_at);
            const elapsed = (now - created) / 1000;
            const waitDuration = lobby.wait_seconds || 60;
            const diff = Math.max(0, Math.floor(waitDuration - elapsed));
            
            setTimeLeft(diff);
            if (diff <= 0) {
                handleStartCondition();
            }
        }, 1000);

        return () => {
            console.log("[ATLAS] Limpando conexão Realtime.");
            supabase.removeChannel(channel);
            clearInterval(interval);
        };
    }, [lobby?.id]);

    const handleStartCondition = async () => {
        const currentPlayers = playersRef.current;
        if (currentPlayers.length === 0 || lobby.status !== "waiting") return;

        const { getCaseConfig } = await import("../game/CasosScenarios");
        const config = getCaseConfig(caseId);
        const isProcedural = config.procedural;

        if (currentPlayers.length >= 2) {
            console.log("[ATLAS] Condição de início atingida. Ativando lobby...");
            
            let scenarioId = "procedural";
            if (!isProcedural) {
                const scenariosForCase = CASOS_SCENARIOS[caseId];
                if (scenariosForCase && scenariosForCase.length > 0) {
                    const randomScenario = scenariosForCase[Math.floor(Math.random() * scenariosForCase.length)];
                    scenarioId = randomScenario.id;
                }
            }
            
            setStatus("Iniciando Missão: Sincronizando cenário...");

            const { data, error: updateError } = await supabase
                .from("competitive_lobbies")
                .update({ 
                    status: "active", 
                    scenario_id: scenarioId 
                })
                .eq("id", lobby.id)
                .eq("status", "waiting")
                .select();

            if (updateError) {
                console.error("[ATLAS] Erro ao ativar lobby:", updateError);
            } else if (data && data.length > 0) {
                console.log("[ATLAS] Lobby ativado com sucesso por este agente.");
                // O estado local será atualizado pelo listener de Realtime
            }
        } else {
            setIsExpiredWithoutPlayers(true);
        }
    };

    const startGame = (scenarioId, lobbyId) => {
        setStatus("Conexão Estabelecida. Iniciando Missão...");
        // Pequeno delay para garantir que o estado do Supabase propagou
        setTimeout(() => {
            nav(`/caso/${caseId}/?mode=competitive&scenario=${scenarioId}&lobbyId=${lobbyId}&reset=true`);
        }, 800);
    };

    if (!joinMode) {
        return (
            <div style={{
                minHeight: "100dvh", width: "100vw", background: "radial-gradient(circle at center, #0a1f2e 0%, #000 80%)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", padding: 24
            }}>
                <div style={{ fontSize: 14, color: "#00ffcc", letterSpacing: 4, marginBottom: 12 }}>PROTOCOLO FANTASMA</div>
                <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 10, textShadow: "0 0 10px rgba(0,255,204,0.3)" }}>ESCOLHA SUA SINTONIA</h2>
                <p style={{ fontSize: 11, opacity: 0.4, marginBottom: 30, maxWidth: 280, textAlign: "center", lineHeight: 1.5 }}>Jogue com qualquer agente ou crie uma sala exclusiva para seus aliados.</p>
                
                {/* Sala Pública */}
                <button 
                    onClick={() => setJoinMode("PUBLIC")}
                    style={{ width: "100%", maxWidth: 300, padding: 18, borderRadius: 14, border: "1px solid rgba(0,255,204,0.4)", background: "rgba(0,255,204,0.1)", color: "#00ffcc", fontSize: 14, fontWeight: 800, letterSpacing: 2, cursor: "pointer", marginBottom: 12 }}
                >
                    🌐 SALA PÚBLICA
                </button>

                {/* Criar Sala Privada */}
                {!showPrivateTimeSelect ? (
                    <button 
                        onClick={() => setShowPrivateTimeSelect(true)}
                        style={{ width: "100%", maxWidth: 300, padding: 16, borderRadius: 14, border: "1px solid rgba(255,190,90,0.35)", background: "rgba(255,190,90,0.08)", color: "#ffbe5a", fontSize: 13, fontWeight: 800, letterSpacing: 2, cursor: "pointer", marginBottom: 12 }}
                    >
                        🔒 CRIAR SALA PRIVADA
                    </button>
                ) : (
                    <div style={{ width: "100%", maxWidth: 300, background: "rgba(255,190,90,0.06)", border: "1px solid rgba(255,190,90,0.25)", borderRadius: 16, padding: 16, marginBottom: 12, animation: "fadeIn 0.3s ease" }}>
                        <div style={{ fontSize: 11, color: "#ffbe5a", letterSpacing: 2, marginBottom: 12, fontWeight: 700, textAlign: "center" }}>⏱️ TEMPO DE ESPERA</div>
                        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 14 }}>
                            {[1, 2, 3, 4, 5].map(min => (
                                <button 
                                    key={min}
                                    onClick={() => setPrivateWaitSeconds(min * 60)}
                                    style={{ 
                                        width: 44, height: 44, borderRadius: 12, border: privateWaitSeconds === min * 60 ? "2px solid #ffbe5a" : "1px solid rgba(255,255,255,0.15)", 
                                        background: privateWaitSeconds === min * 60 ? "rgba(255,190,90,0.2)" : "rgba(255,255,255,0.04)", 
                                        color: privateWaitSeconds === min * 60 ? "#ffbe5a" : "rgba(255,255,255,0.5)", 
                                        fontSize: 16, fontWeight: 900, cursor: "pointer",
                                        transition: "all 0.2s ease"
                                    }}
                                >
                                    {min}
                                </button>
                            ))}
                        </div>
                        <div style={{ fontSize: 10, opacity: 0.4, textAlign: "center", marginBottom: 12 }}>{privateWaitSeconds / 60} minuto{privateWaitSeconds > 60 ? "s" : ""} de espera</div>
                        <button 
                            onClick={() => setJoinMode("PRIVATE_CREATE")}
                            style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: "linear-gradient(135deg, #ffbe5a, #e8a040)", color: "#000", fontSize: 13, fontWeight: 800, letterSpacing: 2, cursor: "pointer" }}
                        >
                            CRIAR SALA ❯
                        </button>
                    </div>
                )}

                {/* Entrar em Sala Privada */}
                {!showPrivateInput ? (
                    <button 
                        onClick={() => setShowPrivateInput(true)}
                        style={{ width: "100%", maxWidth: 300, padding: 16, borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: 2, cursor: "pointer" }}
                    >
                        🔑 ENTRAR COM CÓDIGO
                    </button>
                ) : (
                    <div style={{ width: "100%", maxWidth: 300, display: "flex", flexDirection: "column", gap: 10, animation: "fadeIn 0.3s ease" }}>
                        <input 
                            value={privateIdInput}
                            onChange={e => setPrivateIdInput(e.target.value)}
                            placeholder="CÓDIGO DA SALA (EX: 42A360E9)"
                            autoFocus
                            style={{ width: "100%", padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 14, textAlign: "center", outline: "none", boxSizing: "border-box", textTransform: "uppercase", letterSpacing: 3 }}
                        />
                        <button 
                            onClick={() => {
                                if (privateIdInput.trim()) setJoinMode("PRIVATE_JOIN");
                                else setShowPrivateInput(false);
                            }}
                            style={{ width: "100%", padding: 16, borderRadius: 12, border: "none", background: "linear-gradient(135deg, #fff, #ddd)", color: "#000", fontSize: 14, fontWeight: 800, letterSpacing: 2, cursor: "pointer" }}
                        >
                            CONECTAR ❯
                        </button>
                    </div>
                )}
                
                <button 
                    onClick={() => nav("/mural")}
                    style={{ marginTop: 40, background: "transparent", color: "rgba(255,255,255,0.4)", border: "none", fontSize: 12, cursor: "pointer", textDecoration: "underline" }}
                >
                    Cancelar e Voltar
                </button>
                <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            </div>
        );
    }

    if (!lobby) return (
        <div style={{ background: "#000", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#00ffcc", fontFamily: "monospace", textAlign: "center", padding: 20 }}>
            <div style={{ marginBottom: 20 }}>{status}</div>
            {errorMsg ? (
                <div style={{ color: "#ff4444", border: "1px solid #ff4444", padding: 15, borderRadius: 8, maxWidth: 400 }}>
                    <div style={{ fontWeight: "bold", marginBottom: 5 }}>ALERTA DE SISTEMA</div>
                    {errorMsg}
                </div>
            ) : (
                <>
                    <div>Acessando a Lista A.T.L.A.S.</div>
                    <div style={{ marginTop: 10, opacity: 0.8 }} className="blink">Sincronizando...</div>
                </>
            )}
            <button 
                onClick={() => nav("/mural")}
                style={{ marginTop: 40, background: "transparent", color: "#fff", border: "1px solid #fff", padding: "8px 16px", borderRadius: 8, cursor: "pointer" }}
            >
                Voltar
            </button>
            <style>{`.blink { animation: blinker 1s linear infinite; } @keyframes blinker { 50% { opacity: 0; } }`}</style>
        </div>
    );

    return (
        <div style={{
            minHeight: "100dvh",
            width: "100vw",
            background: "radial-gradient(circle at center, #0a1f2e 0%, #000 80%)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20
        }}>
            <div style={{ marginTop: 60, textAlign: "center" }}>
                <div style={{ fontSize: 14, color: "#00ffcc", letterSpacing: 4, marginBottom: 10 }}>PROTOCOLO FANTASMA</div>
                <p style={{ fontSize: 10, color: "#fff", opacity: 0.3, letterSpacing: 2, marginBottom: 5 }}>CANAL A.T.L.A.S: {lobby?.id?.slice(0, 8).toUpperCase() || "SINCRONIZANDO..."}</p>
                <h1 style={{ fontSize: 24, fontWeight: 900, textShadow: "0 0 20px rgba(0,255,204,0.4)" }}>Aguarde... {players.length}/10</h1>
                <div style={{ opacity: 0.6, fontSize: 12, marginTop: 8 }}>Buscando parceiros na Lista A.T.L.A.S.</div>
            </div>

            <div style={{
                marginTop: 40,
                width: "100%",
                maxWidth: 400,
                background: "rgba(255,255,255,0.03)",
                borderRadius: 20,
                border: "1px solid rgba(0,255,204,0.2)",
                padding: 24,
                textAlign: "center"
            }}>
                <div style={{ fontSize: 14, letterSpacing: 2, color: "#00ffcc",  marginBottom: 10 }}>FALTA POUCO</div>
                <div style={{ fontSize: 48, fontWeight: 900, color: "#fff", fontFamily: "monospace" }}>
                    {isExpiredWithoutPlayers ? (
                        <div style={{ color: "#ff4d6a", fontSize: 16, fontWeight: 700 }}>
                            NEHUM OUTRO AGENTE LOCALIZADO.<br/>
                            <span style={{ fontSize: 12, opacity: 0.7 }}>Tente novamente mais tarde.</span>
                        </div>
                    ) : (
                        timeLeft !== null ? (
                            `${Math.floor(timeLeft / 60)}:${((timeLeft % 60) || 0).toString().padStart(2, '0')}`
                        ) : (
                            "--:--"
                        )
                    )}
                </div>
                <div style={{ fontSize: 12, opacity: 0.5, marginTop: 4 }}>TEMPO LIMITE DE ESPERA</div>

                <div style={{ marginTop: 30, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{
                        height: "100%",
                        width: `${(timeLeft / 60) * 100}%`,
                        background: timeLeft < 30 ? "#ff4444" : "#00ffcc",
                        boxShadow: `0 0 10px ${timeLeft < 30 ? "#ff4444" : "#00ffcc"}`,
                        transition: "width 1s linear"
                    }} />
                </div>
            </div>

            <div style={{ marginTop: 40, width: "100%", maxWidth: 400, flex: 1 }}>
                <div style={{ fontSize: 10, opacity: 0.4, letterSpacing: 1, marginBottom: 12 }}>AGENTES NA REDE</div>
                {players.map((p, i) => (
                    <div key={i} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.05)"
                    }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00ffcc", boxShadow: "0 0 5px #00ffcc" }} />
                        <div style={{ fontSize: 14 }}>Agente {p.player_id === state.player.supabaseId ? "VOCÊ" : p.profiles?.nickname || `ID-${p.player_id.slice(0,4)}`}</div>
                        <div style={{ marginLeft: "auto", fontSize: 10, opacity: 0.4 }}>ONLINE</div>
                    </div>
                ))}
            </div>

            <button
                onClick={async () => {
                   if (lobby && statePlayerRef.current?.supabaseId) {
                       const currentPlayers = playersRef.current;
                       if (currentPlayers.length <= 1) {
                           await supabase.from("competitive_lobbies").delete().eq("id", lobby.id);
                       } else {
                           await supabase.from("competitive_players").delete().eq("lobby_id", lobby.id).eq("player_id", statePlayerRef.current.supabaseId);
                       }
                   }
                   nav("/mural");
                }}
                style={{
                    marginTop: 30,
                    marginBottom: 40,
                    background: isExpiredWithoutPlayers ? "rgba(255,255,255,0.1)" : "rgba(255,0,0,0.1)",
                    border: isExpiredWithoutPlayers ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,0,0,0.2)",
                    color: isExpiredWithoutPlayers ? "#fff" : "#ff4d6a",
                    padding: "12px 24px",
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 900,
                    letterSpacing: 2,
                    cursor: "pointer",
                    width: 200,
                }}
            >
                {isExpiredWithoutPlayers ? "VOLTAR AO MURAL" : "CANCELAR"}
            </button>
        </div>
    );
}
