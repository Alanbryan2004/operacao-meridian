// src/pages/CompetitiveLobby.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGame } from "../game/GameProvider";
import { supabase } from "../lib/supabase";

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
    const [timeLeft, setTimeLeft] = useState(180);
    const [errorMsg, setErrorMsg] = useState(null);

    const fetchOrCreateLobby = useCallback(async () => {
        if (!state.player?.supabaseId) {
            setStatus("Erro: Agente não identificado. Verifique seu login.");
            return;
        }

        try {
            setStatus("Buscando outros jogadores para este caso..");
            // 1. Procurar lobby esperando
            const { data: fetchLobby, error: fetchError } = await supabase
                .from("competitive_lobbies")
                .select("*")
                .eq("case_id", caseId)
                .eq("status", "waiting")
                .order("created_at", { ascending: false })
                .limit(1)
                .maybeSingle();

            if (fetchError) {
                console.error("Erro fetchLobby:", fetchError);
                if (fetchError.code === "42P01") {
                    setErrorMsg("Tabela 'competitive_lobbies' não encontrada. Verifique se executou o SQL.");
                } else {
                    setErrorMsg(`Erro na busca: ${fetchError.message}`);
                }
                return;
            }

            let targetLobby = fetchLobby;

            // 🔥 Se o lobby encontrado tem mais de 180s, ele expirou. Vamos marcar como tal e criar outro.
            if (targetLobby) {
                const now = new Date();
                const created = new Date(targetLobby.created_at);
                const ageSec = (now - created) / 1000;
                if (ageSec > 180) {
                    await supabase.from("competitive_lobbies").update({ status: "expired" }).eq("id", targetLobby.id);
                    targetLobby = null; // Vamos criar um novo abaixo
                }
            }

            if (targetLobby) {
                // Checar se o lobby está vazio (caso o último jogador tenha saído)
                // Se estiver vazio, vamos EXSPIRAR e criar um novo para ter timer fresco
                const { count, error: countError } = await supabase
                    .from("competitive_players")
                    .select("*", { count: 'exact', head: true })
                    .eq("lobby_id", targetLobby.id);
                
                if (!countError && count === 0) {
                    await supabase.from("competitive_lobbies").update({ status: "expired" }).eq("id", targetLobby.id);
                    targetLobby = null;
                }
            }

            if (!targetLobby) {
                setStatus("Iniciando novo canal A.T.L.A.S...");
                // 2. Criar novo lobby se não existe (ou expirou/abandonado)
                const { data: newLobby, error: createError } = await supabase
                    .from("competitive_lobbies")
                    .insert([{ case_id: caseId, status: "waiting" }])
                    .select()
                    .single();
                
                if (createError) {
                    console.error("Erro createLobby:", createError);
                    setErrorMsg(`Erro ao criar lobby: ${createError.message}`);
                    return;
                }
                targetLobby = newLobby;
            }

            setStatus("Agente Sincronizado. Entrando na Missão...");

            // 3. Entrar no lobby
            const { error: joinError } = await supabase
                .from("competitive_players")
                .upsert([{ lobby_id: targetLobby.id, player_id: state.player.supabaseId }], { onConflict: "lobby_id,player_id" });
            
            if (joinError) {
                console.error("Erro joinLobby:", joinError);
                setErrorMsg(`Erro ao entrar no lobby: ${joinError.message}`);
                return;
            }

            // Apenas aqui setamos o lobby, que gatilha o useEffect da sala
            setLobby(targetLobby);

        } catch (e) {
            console.error("Erro inesperado:", e);
            setErrorMsg("Ocorreu um erro inesperado ao conectar à rede.");
        }
    }, [caseId, state.player?.supabaseId]);

    useEffect(() => {
        fetchOrCreateLobby();
    }, [fetchOrCreateLobby]);


    useEffect(() => {
        if (!lobby) return;

        // Inscrever no Realtime para atualizações de jogadores
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
                if (payload.new.status === "active") {
                    startGame(payload.new.scenario_id);
                }
            })
            .subscribe();

        const refreshPlayers = async () => {
            const { data } = await supabase
                .from("competitive_players")
                .select("player_id, profiles(nickname, avatar)")
                .eq("lobby_id", lobby.id);
            if (data) setPlayers(data);
        };

        refreshPlayers();

        // Timer
        const interval = setInterval(() => {
            const now = new Date();
            const created = new Date(lobby.created_at);
            const diff = Math.floor(180 - (now - created) / 1000);
            if (diff <= 0) {
                handleStartCondition();
                setTimeLeft(0);
            } else {
                setTimeLeft(diff);
            }
        }, 1000);

        return () => {
            supabase.removeChannel(channel);
            clearInterval(interval);
        };
    }, [lobby]);

    const handleStartCondition = async () => {
        if (players.length >= 2 && players[0].player_id === state.player.supabaseId) {
            // Sou o "líder" (primeiro da lista), sorteio e inicio
            const scenarioId = `C009_S${Math.floor(Math.random() * 5) + 1}`;
            await supabase
                .from("competitive_lobbies")
                .update({ status: "active", scenario_id: scenarioId, started_at: new Date().toISOString() })
                .eq("id", lobby.id);
        }
    };

    const startGame = (scenarioId) => {
        setStatus("Conexão Estabelecida. Iniciando Missão...");
        setTimeout(() => {
            nav(`/caso/${caseId}/?mode=competitive&scenario=${scenarioId}&lobbyId=${lobby.id}`);
        }, 2000);
    };

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
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
                <div style={{ fontSize: 12, opacity: 0.5, marginTop: 4 }}>TEMPO LIMITE DE ESPERA</div>

                <div style={{ marginTop: 30, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{
                        height: "100%",
                        width: `${(timeLeft / 180) * 100}%`,
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
                   if (lobby && state.player?.supabaseId) {
                       // Se eu for o único no lobby, vamos deletar o lobby também para resetar o tempo
                       if (players.length <= 1) {
                           await supabase.from("competitive_lobbies").delete().eq("id", lobby.id);
                       } else {
                           await supabase.from("competitive_players").delete().eq("lobby_id", lobby.id).eq("player_id", state.player.supabaseId);
                       }
                   }
                   nav("/mural");
                }}
                style={{
                    marginTop: 30,
                    marginBottom: 40,
                    background: "rgba(255,0,0,0.1)",
                    border: "1px solid rgba(255,0,0,0.3)",
                    color: "#ff4444",
                    padding: "12px 24px",
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: 1,
                    cursor: "pointer",
                    textTransform: "uppercase"
                }}
            >
                Cancelar
            </button>
        </div>
    );
}
