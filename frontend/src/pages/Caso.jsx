import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
    saveGame,
    spendMoney,
    spendTime,
    startRunIfNeeded,
    registerCapture,
    abortRun,
} from "../game/store";
import { saveCompletedMission } from "../services/gameSaveService";
import { useGame } from "../game/GameProvider";
import { getCidadeImagem, getCidadeDescricao } from "../game/Cidades";
import { CASOS_SCENARIOS, findScenario } from "../game/CasosScenarios";
import { DESTINATION_OPTIONS } from '../game/DestRoutes';
import Analisar from "./Analisar";
import SuspectGallery from "../components/SuspectGallery";
import DialogBox from "../components/DialogBox";
import ModalMsg from "../components/ModalMsg";

export const ORIGIN_COORDS = {
    "Campinas": { x: 137, y: 149 },
    "Buenos Aires": { x: 124, y: 165 },
    "Nova York": { x: 107, y: 61 },
    "Toronto": { x: 101, y: 57 },
    "Lisboa": { x: 165, y: 72 },
    "Madrid": { x: 180, y: 65 },
    "Paris": { x: 194, y: 56 },
    "Londres": { x: 184, y: 38 },
    "Roma": { x: 212, y: 70 },
    "Cairo": { x: 224, y: 76 },
    "Moscou": { x: 231, y: 40 },
    "Dubai": { x: 250, y: 82 },
    "Seul": { x: 330, y: 65 },
    "Tóquio": { x: 344, y: 68 },
    "Viena": { x: 215, y: 52 },
    "Mumbai": { x: 270, y: 91 },
    "Vancouver": { x: 52, y: 49 },
    "Singapura": { x: 304, y: 115 },
    "Sydney": { x: 357, y: 164 },
    "Berlim": { x: 206, y: 42 },
    "Istambul": { x: 221, y: 61 },
    "Amsterdã": { x: 194, y: 38 },
    "Cidade do Cabo": { x: 209, y: 164 },
    "Bangcoc": { x: 301, y: 98 },
    "Trípoli": { x: 204, y: 72 },
    "Cidade do México": { x: 79, y: 90 },
    "Pequim": { x: 318, y: 62 },
    "Thimphu": { x: 288, y: 79 },
    "Sao Paulo": { x: 137, y: 150 },
    "São Paulo": { x: 137, y: 150 },
    "Rio de Janeiro": { x: 141, y: 149 },
    "Santiago": { x: 110, y: 160 },
    "Nova Delhi": { x: 275, y: 78 },
    "Salvador": { x: 146, y: 135 },
    "Zurich": { x: 198, y: 52 },
    "Hong Kong": { x: 315, y: 80 },
    "Barcelona": { x: 190, y: 60 },
    "Roterdã": { x: 192, y: 44 },
    "Genebra": { x: 196, y: 54 },
};

const TRANSPORT_MODES = [
    { id: "AVIAO", nome: "Avião", icon: "✈️", custoBase: 800, horasBase: 12, desc: "Rápido e caro", animDuration: 2000, animImg: "/transportes/aviao.png", animImgVolta: "/transportes/aviao_voltando.png" },
    { id: "METRO", nome: "Trem/Metrô", icon: "🚆", custoBase: 300, horasBase: 36, desc: "Econômico e moderado", animDuration: 5000, animImg: "/transportes/metro.png", animImgVolta: "/transportes/metro_voltando.png" },
    { id: "BARCO", nome: "Navio/Barco", icon: "🚢", custoBase: 150, horasBase: 72, desc: "Lento e barato", animDuration: 8000, animImg: "/transportes/navio.png", animImgVolta: "/transportes/navio_voltando.png" },
];

function fmtHoras(h) {
    const horas = Math.max(0, Number(h || 0));
    const d = Math.floor(horas / 24);
    const r = horas % 24;
    return `${d}d ${r}h`;
}

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
        <span
            style={{
                fontSize: 11,
                padding: "6px 10px",
                borderRadius: 999,
                background: s.bg,
                border: `1px solid ${s.bd}`,
                color: s.tx,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                whiteSpace: "nowrap",
            }}
        >
            {children}
        </span>
    );
}

function Panel({ children }) {
    return (
        <div
            style={{
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,.14)",
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0 18px 45px rgba(0,0,0,.55)",
                padding: 14,
            }}
        >
            {children}
        </div>
    );
}

export default function Caso() {
    try {
        const nav = useNavigate();
        const { caseId } = useParams();
        const { state, replaceState } = useGame();
        const [searchParams] = useSearchParams();
        
        const isMissionCompetitive = useMemo(() => {
            const cObj = state?.cases?.find(c => c.id === caseId);
            return searchParams.get("mode") === "competitive" || !!cObj?.isCompetitive;
        }, [state?.cases, caseId, searchParams]);

        const [viewMode, setViewMode] = useState("RESUMO");
        const [selectedLocal, setSelectedLocal] = useState(null);
        const [selectedDest, setSelectedDest] = useState(null);
        const [showSuspectVideo, setShowSuspectVideo] = useState(false);
        const [activeVideo, setActiveVideo] = useState(null);
        const [darkenScreen, setDarkenScreen] = useState(false);
        const [videoEnded, setVideoEnded] = useState(false);
        const [profileTab, setProfileTab] = useState("PERFIL");
        const [revealFinalResult, setRevealFinalResult] = useState(false);
        const [travelAnimData, setTravelAnimData] = useState(null);

        const [modalConfig, setModalConfig] = useState({
            show: false,
            message: "",
            type: "SUCCESS",
            onConfirm: null,
            isConfirm: false
        });

        const lobbyId = searchParams.get("lobbyId");
        const forcedScenarioId = searchParams.get("scenario");

        useEffect(() => {
            if (!state) return;
            const caseObj = state.cases.find((x) => x.id === caseId);
            if (!caseObj) {
                nav("/mural");
                return;
            }

            const currentRun = state.runs?.[caseId];
            const scenarioMismatch = forcedScenarioId && currentRun?.scenarioId !== forcedScenarioId;
            const lobbyMismatch = lobbyId && currentRun?.lobbyId !== lobbyId;
            const noRun = !currentRun;
            const needsReset = isMissionCompetitive && (noRun || lobbyMismatch || scenarioMismatch);
            
            const next = startRunIfNeeded(state, { ...caseObj, isCompetitive: isMissionCompetitive }, needsReset, forcedScenarioId, lobbyId);
            
            if (next !== state) {
                replaceState(saveGame(next));
            }
            window.dispatchEvent(new CustomEvent("meridian-play-audio", { detail: true }));
        }, [caseId, isMissionCompetitive, forcedScenarioId, nav, replaceState, state]);

        const caseObj = useMemo(
            () => state?.cases?.find((x) => x.id === caseId),
            [state, caseId]
        );
        const run = useMemo(
            () => (state?.runs ? state.runs[caseId] : null),
            [state, caseId]
        );

        const runStatusRef = useRef(run?.status);
        useEffect(() => { runStatusRef.current = run?.status; }, [run?.status]);
        const syncChannelRef = useRef(null);

        useEffect(() => {
            if (viewMode === "ARRIVAL" && (run?.status === "WON" || run?.status === "LOST")) {
                setRevealFinalResult(false);
                const timer = setTimeout(() => {
                    setRevealFinalResult(true);
                }, 10000);
                return () => clearTimeout(timer);
            } else if (viewMode !== "ARRIVAL") {
                setRevealFinalResult(false);
            }
        }, [viewMode, run?.status]);

        useEffect(() => {
            if (!isMissionCompetitive || !lobbyId || !run) return;

            async function terminateAsLost(winnerId, directWinnerName = null) {
                try {
                    let wName = directWinnerName;
                    if (!wName || wName === "um Agente de Elite") {
                        const { data: winnerProfile } = await supabase
                            .from("profiles")
                            .select("nickname")
                            .eq("id", winnerId)
                            .single();
                        wName = winnerProfile?.nickname || wName || "um Agente de Elite";
                    }
                    
                    const nextRun = {
                        ...run,
                        status: "LOST",
                        winnerName: wName,
                        jornal: [...run.jornal, { t: new Date().toISOString(), msg: `📡 ALERTA A.T.L.A.S.: Missão encerrada. O Agente ${wName} realizou a captura primeiro.` }]
                    };

                    const diff = caseObj?.dificuldade;
                    let nextPlayer = { ...state.player };
                    if (diff === "DIFICIL") nextPlayer.hardLosses = (nextPlayer.hardLosses || 0) + 1;
                    if (diff === "LENDARIO") nextPlayer.legendaryLosses = (nextPlayer.legendaryLosses || 0) + 1;

                    const nextState = { ...state, player: nextPlayer, runs: { ...state.runs, [caseId]: nextRun } };
                    replaceState(saveGame(nextState));
                    nav(`/caso-solucionado/${caseId}?mode=competitive&lobbyId=${lobbyId}`);
                } catch (err) {
                    console.error("[ competitive ] Erro ao encerrar missão como derrota:", err);
                    nav("/mural");
                }
            }

            supabase.from("competitive_lobbies")
                .select("status, winner_id")
                .eq("id", lobbyId)
                .single()
                .then(({ data }) => {
                    if (data?.status === "finished" && data?.winner_id !== state?.player?.supabaseId) {
                        terminateAsLost(data.winner_id);
                    }
                });

            const channel = supabase
                .channel(`case-sync-${lobbyId}`)
                .on("postgres_changes", {
                    event: "UPDATE",
                    schema: "public",
                    table: "competitive_lobbies",
                    filter: `id=eq.${lobbyId}`
                }, (payload) => {
                    const currentPlayerId = state?.player?.supabaseId;
                    const currentStatus = runStatusRef.current;
                    if (payload.new.status === "finished" && payload.new.winner_id !== currentPlayerId && currentStatus === "IN_PROGRESS") {
                        terminateAsLost(payload.new.winner_id);
                    }
                })
                .on("broadcast", { event: "mission_finished" }, ({ payload }) => {
                    const currentPlayerId = state?.player?.supabaseId;
                    const currentStatus = runStatusRef.current;
                    if (payload.winnerId !== currentPlayerId && currentStatus === "IN_PROGRESS") {
                        terminateAsLost(payload.winnerId, payload.winnerName);
                    }
                })
                .subscribe();

            syncChannelRef.current = channel;
            return () => {
                supabase.removeChannel(channel);
                syncChannelRef.current = null;
            };
        }, [isMissionCompetitive, lobbyId, caseId, nav]);

        // ==========================
        // MÁQUINA DE ESTADO DO TUTORIAL (CASO 0)
        // ==========================
        const tutState = useMemo(() => {
            if (caseId !== "C000" || !run) return null;
            const psts = run.pistasDescobertas || [];
            const has = (id) => psts.some(p => p.idInterrogatorio === id);
            const city = run.localAtual?.cidade || "Londres";
            const fil = run.filtrosAnalise || {};

            let allowInvestigate = false;
            let allowAnalysis = false;
            let allowTravel = false;
            let expectedLocId = null;
            let expectedDest = null;
            let expectedAnalise = null;
            let expectedWarrant = false;

            // fil uses arrays: { sexo: ["Feminino"], corCabelo: ["Preto"], esporte: ["Ginástica Olímpica"] }
            const hasFil = (key, val) => Array.isArray(fil[key]) && fil[key].includes(val);

            if (city === "Londres") {
                if (!has("C0_1")) { allowInvestigate = true; expectedLocId = "C0_1"; }
                else if (!has("C0_2")) { allowInvestigate = true; expectedLocId = "C0_2"; }
                else if (!has("C0_3")) { allowInvestigate = true; expectedLocId = "C0_3"; }
                else if (!hasFil("sexo", "Feminino")) { allowAnalysis = true; expectedAnalise = "sexo"; }
                else { allowTravel = true; expectedDest = "Paris"; }
            }
            else if (city === "Paris") {
                if (!has("C0_4")) { allowInvestigate = true; expectedLocId = "C0_4"; }
                else if (!has("C0_5")) { allowInvestigate = true; expectedLocId = "C0_5"; }
                else if (!has("C0_6")) { allowInvestigate = true; expectedLocId = "C0_6"; }
                else if (!hasFil("corCabelo", "Preto")) { allowAnalysis = true; expectedAnalise = "corCabelo"; }
                else { allowTravel = true; expectedDest = "Tóquio"; }
            }
            else if (city === "Tóquio") {
                if (!has("C0_7")) { allowInvestigate = true; expectedLocId = "C0_7"; }
                else if (!has("C0_8")) { allowInvestigate = true; expectedLocId = "C0_8"; }
                else if (!has("C0_9")) { allowInvestigate = true; expectedLocId = "C0_9"; }
                else if (!hasFil("esporte", "Ginástica Olímpica")) { allowAnalysis = true; expectedAnalise = "esporte"; }
                else if (run.warrantId !== "006") { expectedWarrant = true; allowAnalysis = true; }
                else { allowTravel = true; expectedDest = "Seul"; }
            }
            else if (city === "Seul") {
                if (!has("C0_10")) { allowInvestigate = true; expectedLocId = "C0_10"; }
                else if (!has("C0_11")) { allowInvestigate = true; expectedLocId = "C0_11"; }
                else if (!has("C0_12")) { allowInvestigate = true; expectedLocId = "C0_12"; }
            }

            return {
                allowInvestigate, allowAnalysis, allowTravel,
                expectedLocId, expectedDest, expectedAnalise, expectedWarrant
            };
        }, [run, caseId]);

        const currentCityImg = useMemo(() => {
            if (!run) return caseObj?.imgItem || "/reliquiaDesaparecida.png";
            const img = getCidadeImagem(run.localAtual?.cidade);
            if (run.localAtual?.cidade === "Campinas" || img === "/Paises/default.png") {
                return caseObj?.imgItem || "/reliquiaDesaparecida.png";
            }
            return img;
        }, [run?.localAtual?.cidade, caseObj?.imgItem]);

        const activeScenario = useMemo(() => {
            // For procedural cases, use the scenario stored in run
            if (run?.proceduralScenario) return run.proceduralScenario;
            return findScenario(caseId, run?.scenarioId, run?.targetSuspectId);
        }, [run?.scenarioId, run?.targetSuspectId, run?.proceduralScenario, caseId]);

        const currentCityDesc = useMemo(() => {
            if (!run?.localAtual?.cidade) return "";
            return getCidadeDescricao(run.localAtual.cidade);
        }, [run?.localAtual?.cidade]);

        const hasMissionProgressed = useMemo(() => {
            if (!activeScenario?.route) return true;
            const clues = run?.pistasDescobertas || [];
            return clues.length >= 3;
        }, [activeScenario, run?.pistasDescobertas]);

        const localInterrogatorios = useMemo(() => {
            const source = activeScenario?.interrogatorios || run?.interrogatorios || caseObj?.interrogatorios || [];
            const matches = source.filter(loc => loc.cidade === run?.localAtual?.cidade);
            if (matches.length > 3 && activeScenario?.route) {
                return hasMissionProgressed ? matches.slice(-3) : matches.slice(0, 3);
            }
            // Cidade errada (fora da rota): gera 3 NPCs genéricos com todos os campos obrigatórios
            if (matches.length === 0 && run?.localAtual?.cidade) {
                const city = run.localAtual.cidade;
                return [
                    { id: `FALLBACK_1_${city}`, cidade: city, local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Não vi nenhum suspeito por aqui. Talvez você esteja na cidade errada, Agente." },
                    { id: `FALLBACK_2_${city}`, cidade: city, local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ninguém estranho passou por aqui recentemente. Tem certeza de que é aqui?" },
                    { id: `FALLBACK_3_${city}`, cidade: city, local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Nenhuma transação suspeita foi registrada. Acho que o suspeito foi para outro lugar." },
                ];
            }
            return matches;
        }, [run?.localAtual?.cidade, activeScenario, run?.interrogatorios, caseObj?.interrogatorios, hasMissionProgressed]);

        const travelOptions = useMemo(() => {
            if (!run?.localAtual?.cidade) return [];
            const globalOptions = DESTINATION_OPTIONS.filter(d => d.origem === run.localAtual?.cidade);
            if (activeScenario?.travelTable && activeScenario.travelTable[run.localAtual?.cidade]) {
                const forcedCities = activeScenario.travelTable[run.localAtual?.cidade];
                return globalOptions
                    .filter(d => forcedCities.includes(d.cidade))
                    .filter((v, i, a) => a.findIndex(t => t.cidade === v.cidade) === i);
            }
            // Se existe travelTable mas a cidade atual NÃO está nela (cidade errada), limita destinos
            if (activeScenario?.travelTable && !activeScenario.travelTable[run.localAtual?.cidade]) {
                // Cidade errada: só mostra a cidade anterior como opção de retorno
                if (run.cidadeAnterior) {
                    return globalOptions
                        .filter(d => d.cidade === run.cidadeAnterior)
                        .filter((v, i, a) => a.findIndex(t => t.cidade === v.cidade) === i);
                }
                return [];
            }
            return globalOptions.filter((v, i, a) => a.findIndex(t => t.cidade === v.cidade) === i);
        }, [run?.localAtual?.cidade, run?.cidadeAnterior, activeScenario]);

        if (!state || !caseObj || !run) return null;

        const updateRun = (nextRun) => {
            const nextState = { ...state, runs: { ...state.runs, [caseId]: nextRun } };
            replaceState(saveGame(nextState));
        };

        const confirmarViagem = (transport) => {
            const destino = transport.customDest || selectedDest;
            if (!destino) return;
            const custo = transport.custoBase;
            const horas = transport.horasBase;
            if (state.player.dinheiro < custo) {
                updateRun({
                    ...run,
                    jornal: [...run.jornal, { t: new Date().toISOString(), msg: `🚫 Dinheiro insuficiente para viajar de ${transport.nome}.` }],
                });
                setViewMode("ACTIONS");
                return;
            }
            let nextState = spendMoney(state, custo, `✈️ Viagem para ${destino.pais} (${transport.nome}): -$${custo}`, caseId);
            nextState = saveGame(nextState);
            const nextRun = spendTime(nextState.runs[caseId], horas, `✈️ Você chegou em ${destino.cidade} após ${horas}h de viagem.`);
            nextRun.localAtual = { flag: destino.flag, pais: destino.pais, city: destino.cidade }; // city -> cidade
            nextRun.localAtual.cidade = destino.cidade; // Garantir campo correto
            nextRun.cidadeAnterior = run.localAtual?.cidade;
            const finalState = saveGame({ ...nextState, runs: { ...nextState.runs, [caseId]: nextRun } });
            replaceState(finalState);

            const shouldAnim = true;
            
            let videoPath = null;
            if (activeScenario?.route) {
                const destIndexFirst = activeScenario.route.indexOf(destino.cidade);
                const destIndexLast = activeScenario.route.lastIndexOf(destino.cidade);
                if (destIndexFirst === 1) videoPath = "/Videos/suspeito.mp4";
                const isLastStage = (destIndexLast === activeScenario.route.length - 1);
                if (isLastStage && destIndexLast !== 0 && hasMissionProgressed) videoPath = "/Videos/suspeito2.mp4";
            }

            const triggerArrival = () => {
                if (videoPath) {
                    setActiveVideo(videoPath);
                    setDarkenScreen(true);
                    setTimeout(() => { 
                        setShowSuspectVideo(true); 
                        setDarkenScreen(false);
                        setViewMode("ARRIVAL"); // Show city info WITH the video
                    }, 800);
                } else {
                    setShowSuspectVideo(false);
                    setActiveVideo(null);
                    setViewMode("ARRIVAL");
                }
            };

            if (shouldAnim && transport.animDuration) {
                const isReverse = !!transport.isReverse || !!selectedDest?.isReturn;
                const animImg = isReverse ? (transport.animImgVolta || transport.animImg) : transport.animImg;
                setTravelAnimData({ ...transport, animImg, destCidade: destino.cidade, isReverse });
                setViewMode("TRAVEL_ANIMATION");
                setTimeout(() => {
                    setTravelAnimData(null);
                    triggerArrival();
                }, transport.animDuration);
            } else {
                triggerArrival();
            }
        };

        const abrirLocais = () => { if (run?.status === "IN_PROGRESS") setViewMode("LOCATIONS"); };

        const interrogarNoLocal = (locObj) => {
            if (!canAct) return;
            const currentCount = (run.investigationCountByCity?.[locObj.cidade] || 0) + 1;
            const nextRunCount = {
                ...run,
                investigationCountByCity: { ...(run.investigationCountByCity || {}), [locObj.cidade]: currentCount }
            };
            const isScenarioFinalCity = activeScenario ? (locObj.cidade === activeScenario.finalCity || (activeScenario.route && locObj.cidade === activeScenario.route[activeScenario.route.length - 1])) : false;
            const isStaticFinalCity = locObj.cidade === caseObj?.localFinal?.cidade;
            let isFinalCity = isScenarioFinalCity || isStaticFinalCity;
            if (isFinalCity && activeScenario?.route && !hasMissionProgressed) isFinalCity = false;

            if (isFinalCity && currentCount >= 2) {
                // For procedural cases, check if this is the specific arrest NPC
                const isProcedural = !!activeScenario?.procedural;
                const arrestNpcIdx = activeScenario?.arrestNpcIndex;

                const targetId = String(run.targetSuspectId || "008").trim();
                const warrantIdSelected = String(run.warrantId || "").trim();
                const isSuccess = run.mandadoEmitido && warrantIdSelected === targetId;
                setDarkenScreen(true);
                setVideoEnded(false);
                setTimeout(() => {
                    setShowSuspectVideo(true);
                    setActiveVideo(isSuccess ? "/Videos/suspeitopreso.mp4" : "/Videos/suspeitonaopreso.mp4");
                    setDarkenScreen(false);
                    setViewMode("ARRIVAL");
                }, 800);

                if (isSuccess) {
                    const nextRun = {
                        ...nextRunCount,
                        status: "WON",
                        suspeitoCapturado: true,
                        jornal: [...run.jornal, { t: new Date().toISOString(), msg: `🎯 MISSÃO CUMPRIDA! O suspeito foi preso em ${locObj.cidade}.` }],
                    };
                    
                    const diff = caseObj?.dificuldade;
                    let nextPlayer = { ...state.player, dinheiro: state.player.dinheiro + caseObj.recompensa, xp: state.player.xp + caseObj.xp };
                    if (diff === "DIFICIL") nextPlayer.hardWins = (nextPlayer.hardWins || 0) + 1;
                    if (diff === "LENDARIO") nextPlayer.legendaryWins = (nextPlayer.legendaryWins || 0) + 1;

                    if (isMissionCompetitive && lobbyId && state.player.supabaseId) {
                        // ... existing competitive logic ...
                        syncChannelRef.current?.send({ 
                            type: "broadcast", 
                            event: "mission_finished", 
                            payload: { 
                                winnerId: state.player.supabaseId, 
                                winnerName: state.player.nome || state.player.nickname || "um Agente de Elite" 
                            } 
                        });

                        supabase.from("competitive_lobbies").update({ status: "finished", winner_id: state.player.supabaseId }).eq("id", lobbyId).select().then();
                        supabase.from("competitive_players").update({ status: "won" }).eq("lobby_id", lobbyId).eq("player_id", state.player.supabaseId).then();

                        const finalState = registerCapture({ ...state, player: nextPlayer, runs: { ...state.runs, [caseId]: nextRun } }, run.warrantId);
                        replaceState(saveGame(finalState));
                    } else {
                        const nextState = registerCapture({ ...state, player: nextPlayer, runs: { ...state.runs, [caseId]: nextRun } }, run.warrantId);
                        replaceState(saveGame(nextState));
                    }

                    // 🔥 Salva no Banco de Dados (Persistência Permanente)
                    saveCompletedMission({
                        caseId,
                        titulo: caseObj.titulo,
                        dificuldade: caseObj.dificuldade,
                        resultado: "WON",
                        xpGanho: caseObj.xp,
                        recompensaGanha: caseObj.recompensa,
                        suspectCaptured: run.targetSuspectId
                    }).catch(err => console.error("Falha ao persistir missão concluída:", err));
                } else {
                    const diff = caseObj?.dificuldade;
                    let nextPlayer = { ...state.player };
                    if (diff === "DIFICIL") nextPlayer.hardLosses = (nextPlayer.hardLosses || 0) + 1;
                    if (diff === "LENDARIO") nextPlayer.legendaryLosses = (nextPlayer.legendaryLosses || 0) + 1;

                    const nextRun = { ...nextRunCount, status: "LOST", jornal: [...run.jornal, { t: new Date().toISOString(), msg: `❌ MISSÃO FRACASSADA! O suspeito escapou em ${locObj.cidade}.` }] };
                    replaceState(saveGame({ ...state, player: nextPlayer, runs: { ...state.runs, [caseId]: nextRun } }));

                    // 🔥 Salva no Banco de Dados (Persistência Permanente)
                    saveCompletedMission({
                        caseId,
                        titulo: caseObj.titulo,
                        dificuldade: caseObj.dificuldade,
                        resultado: "LOST",
                        xpGanho: 0,
                        recompensaGanha: 0,
                        suspectCaptured: null
                    }).catch(err => console.error("Falha ao persistir missão fracassada:", err));
                }
                return;
            }

            const jaTem = run.pistasDescobertas?.some(p => p.idInterrogatorio === locObj.id);
            const nextRun = spendTime(nextRunCount, 1, jaTem ? `🗣️ Você voltou ao ${locObj.local}, nada novo.` : `🗣️ Investigação no ${locObj.local}: pista coletada!`);
            if (!jaTem) nextRun.pistasDescobertas = [...(run.pistasDescobertas || []), { idInterrogatorio: locObj.id, conteudo: locObj.pista, fonte: locObj.personagem, local: locObj.local, cidade: locObj.cidade }];
            updateRun(nextRun);
            setSelectedLocal(locObj);
            setViewMode("DIALOGUE");
        };

        const handleVoltar = () => {
            if (!run?.cidadeAnterior) return;
            const destObj = DESTINATION_OPTIONS.find(d => d.cidade === run.cidadeAnterior);
            if (destObj) {
                setSelectedDest({ ...destObj, isReturn: true });
                setViewMode("TRAVEL_MODES");
            }
        };

        const analisar = () => { if (run?.status === "IN_PROGRESS") { updateRun(spendTime(run, 2, "🔍 Acessando Laboratório de Análise: -2h.")); setViewMode("ANALYZE"); } };

        const emitirMandado = () => {
            if (run?.status !== "IN_PROGRESS" || run?.mandadoEmitido) return;
            const next = spendTime(run, 2, "🧾 Mandado emitido: -2h.");
            next.mandadoEmitido = true;
            updateRun(next);
        };

        const handleAbort = () => {
            setModalConfig({
                show: true,
                message: isMissionCompetitive ? "Deseja realmente ABORTAR esta missão competitiva? Todo o progresso será perdido." : "Deseja realmente ABORTAR esta missão? Todo o progresso atual será perdido.",
                type: "ERROR",
                isConfirm: true,
                onConfirm: () => { replaceState(saveGame(abortRun(state, caseId))); nav("/mural"); }
            });
        };

        const canAct = run?.status === "IN_PROGRESS";

        return (
            <div style={{ minHeight: "100dvh", width: "100vw", background: "radial-gradient(circle at center, #071a26 0%, #000 70%)", color: "#fff", position: "relative" }}>
                <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 9999, opacity: darkenScreen ? 1 : 0, pointerEvents: "none", transition: "opacity 0.6s ease" }} />
                <style>{`
                    .om-wrap { max-width: 560px; margin: 0 auto; padding: 14px; padding-bottom: 96px; }
                    .om-top { position: sticky; top: 0; z-index: 25; padding: 12px 0; background: linear-gradient(to bottom, #000, transparent); backdrop-filter: blur(8px); }
                    .om-title { font-size: 16px; font-weight: 800; }
                    .om-card { margin-top: 10px; }
                    .om-img-card { width: 100%; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); overflow: hidden; background: #000; position: relative; }
                    .om-btn { width: 100%; padding: 12px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.06); color: #fff; cursor: pointer; font-size: 13px; text-transform: uppercase; font-weight: 700; }
                    .om-btn:active { transform: scale(0.98); }
                    .om-btn-primary { background: rgba(120,200,255,0.2); border-color: rgba(120,200,255,0.4); }
                    .om-tabs { position: fixed; bottom: 0; left: 0; right: 0; z-index: 100; padding: 15px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); display: flex; justify-content: center; }
                    .om-tabs-inner { width: 100%; max-width: 500px; display: flex; gap: 10px; padding: 8px; border-radius: 20px; background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.1); }
                    .om-tab { flex: 1; padding: 12px; border-radius: 14px; border: none; background: transparent; color: rgba(255,255,255,0.7); cursor: pointer; text-align: center; font-size: 11px; font-weight: 800; }
                    .om-tab-active { background: rgba(255,255,255,0.1); color: #fff; }
                    .om-scene-box { position: relative; width: 100%; height: 220px; overflow: hidden; background: #000; }
                    .om-scene-bg { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; }
                    .om-scene-char { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); height: 85%; }
                    .om-journal-list { maxHeight: 250px; overflow-y: auto; }
                    .om-journal-item { padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
                    .om-map-container { position: relative; width: 100%; height: 200px; background: radial-gradient(ellipse at center, #0d2137 0%, #060e1a 100%); border-radius: 14px; overflow: hidden; border: 1px solid rgba(128,189,255,0.15); }
                    .om-map-origin { position: absolute; width: 8px; height: 8px; background: #80bdff; border-radius: 50%; z-index: 5; transform: translate(-50%, -50%); }
                    .om-map-dest { position: absolute; width: 10px; height: 10px; background: #ff4d6a; border-radius: 50%; z-index: 5; transform: translate(-50%, -50%); }
                    .om-map-dest.selected { background: #ffd700; transform: translate(-50%, -50%); }
                    .om-map-label { position: absolute; font-size: 8px; font-weight: 800; z-index: 6; text-shadow: 0 0 8px #000; }
                    .tutorial-highlight { animation: om-tut-pulse 1.5s infinite alternate; border-color: #ffd700 !important; font-weight: 900 !important; color: #ffd700 !important; }
                    @keyframes om-tut-pulse { 0% { box-shadow: 0 0 5px rgba(255,215,0,0.4); transform: scale(1); } 100% { box-shadow: 0 0 20px rgba(255,215,0,1); transform: scale(1.02); } }
                    .om-map-loc-badge { position: absolute; bottom: 0; left: 0; right: 0; padding: 6px 12px; background: linear-gradient(transparent, rgba(6,14,26,0.95)); font-size: 10px; z-index: 10; display: flex; align-items: center; gap: 6px; }
                `}</style>
                <div style={{ padding: "15px 15px 80px 15px" }}>
                    {viewMode !== "ANALYZE" && !(viewMode === "PROFILE" && profileTab === "GALERIA") && (
                        <div className="om-top">
                            <Panel>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                    <div style={{ fontSize: 10, opacity: 0.6 }}>MISSÃO ATIVA</div>
                                    <div style={{ fontSize: 10, opacity: 0.6 }}>📍 {run.localAtual?.cidade || "..."} · {run.localAtual?.pais || "..."}</div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div className="om-title">{caseObj.titulo}</div>
                                    <div style={{ textAlign: "right", display: "flex", gap: "15px" }}>
                                        <div><div style={{ fontSize: 14, fontWeight: 900 }}>${state.player.dinheiro}</div><div style={{ fontSize: 10, opacity: 0.6 }}>SALDO</div></div>
                                        {!isMissionCompetitive ? (<div><div style={{ fontSize: 14, fontWeight: 900 }}>{fmtHoras(run.tempoRestanteHoras)}</div><div style={{ fontSize: 10, opacity: 0.6 }}>RESTANTES</div></div>) : (<div><div style={{ fontSize: 14, fontWeight: 900, color: "#80bdff" }}>PVP</div><div style={{ fontSize: 10, opacity: 0.6 }}>MODO</div></div>)}
                                    </div>
                                </div>
                            </Panel>
                        </div>
                    )}
                    {viewMode !== "ANALYZE" && !(viewMode === "PROFILE" && profileTab === "GALERIA") && (
                        <div className="om-card">
                            <div className="om-img-card">
                                {viewMode === "DIALOGUE" && selectedLocal ? (
                                    <div className="om-scene-box"><img src={selectedLocal.imgLocal} className="om-scene-bg" alt="" /><img src={selectedLocal.imgPersonagem} className="om-scene-char" alt="" /></div>
                                ) : viewMode === "TRAVEL_ANIMATION" && travelAnimData ? (
                                    <div className="om-map-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#050c14" }}>
                                        <div style={{ position: "absolute", inset: 0, opacity: 0.15, background: "url(/Paises/default.png) center/cover" }} />
                                        <div style={{ zIndex: 2, textAlign: "center" }}>
                                            <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 8, letterSpacing: 2 }}>{travelAnimData.isReverse ? "RETORNANDO..." : "VIAJANDO..."}</div>
                                            <div style={{ position: "relative", width: 240, height: 40, margin: "0 auto" }}>
                                                <img 
                                                    src={travelAnimData.animImg} 
                                                    alt="" 
                                                    style={{ 
                                                        position: "absolute", 
                                                        left: travelAnimData.isReverse ? "100%" : "-40px", 
                                                        top: "50%", 
                                                        transform: "translateY(-50%)", 
                                                        width: 40,
                                                        animation: `${travelAnimData.isReverse ? 'om-travel-slide-reverse' : 'om-travel-slide'} ${travelAnimData.animDuration}ms linear forwards`
                                                    }} 
                                                />
                                            </div>
                                            <div style={{ fontSize: 14, fontWeight: 900, marginTop: 12, color: travelAnimData.isReverse ? "#ff9090" : "#80bdff" }}>{travelAnimData.isReverse ? "↩️ " : ""}{travelAnimData.destCidade?.toUpperCase()}</div>
                                        </div>
                                        <style>{`
                                            @keyframes om-travel-slide {
                                                0% { left: -40px; opacity: 0; }
                                                10% { opacity: 1; }
                                                90% { opacity: 1; }
                                                100% { left: 100%; opacity: 0; }
                                            }
                                            @keyframes om-travel-slide-reverse {
                                                0% { left: 100%; opacity: 0; }
                                                10% { opacity: 1; }
                                                90% { opacity: 1; }
                                                100% { left: -40px; opacity: 0; }
                                            }
                                        `}</style>
                                    </div>
                                ) : activeVideo && (showSuspectVideo || viewMode === "ARRIVAL") ? (
                                    <video key={activeVideo} src={activeVideo} autoPlay loop={false} onEnded={() => { if (runStatusRef.current === "WON" || runStatusRef.current === "LOST" || run?.status === "WON" || run?.status === "LOST") nav(`/caso-solucionado/${caseId}${isMissionCompetitive ? "?mode=competitive" : ""}`); else { setVideoEnded(true); setTimeout(() => { setShowSuspectVideo(false); setActiveVideo(null); if (viewMode !== "ARRIVAL") setViewMode("ACTIONS"); setSelectedDest(null); setVideoEnded(false); }, 300); } }} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
                                ) : (viewMode === "TRAVEL_MAP" || viewMode === "TRAVEL_MODES") ? (
                                    <div className="om-map-container">
                                        {(() => {
                                            const pts = []; const oc = ORIGIN_COORDS[run.localAtual?.cidade || "Roma"] || { x: 160, y: 100 };
                                            pts.push(oc); travelOptions.forEach(d => pts.push(d.coords));
                                            let minX = 400, maxX = 0, minY = 200, maxY = 0; pts.forEach(p => { if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x; if (p.y < minY) minY = p.y; if (p.y > maxY) maxY = p.y; });
                                            const midX = (minX + maxX) / 2; const midY = (minY + maxY) / 2;
                                            const rangeX = maxX - minX; const rangeY = maxY - minY;
                                            const vScale = Math.min(280 / (rangeX || 1), 120 / (rangeY || 1), 3.0);
                                            const getPos = (p) => ({ left: `${((p.x - midX) * vScale + 200) / 400 * 100}%`, top: `${((p.y - midY) * vScale + 100) / 200 * 100}%` });
                                            const op = getPos(oc);
                                            return (<div style={{ position: "absolute", inset: 0 }}>
                                                <div className="om-map-origin" style={{ ...op }} />
                                                <div className="om-map-label" style={{ ...op, color: "#80bdff", transform: "translate(-50%, 14px)" }}>{run.localAtual?.cidade?.toUpperCase()}</div>
                                                {travelOptions.map(d => {
                                                    const dp = getPos(d.coords);
                                                    return (<React.Fragment key={d.id}>
                                                        <div className={`om-map-dest ${selectedDest?.id === d.id ? "selected" : ""}`} style={{ ...dp }} />
                                                        <div className="om-map-label" style={{ ...dp, color: selectedDest?.id === d.id ? "#ffd700" : "#fff", transform: "translate(-50%, 14px)" }}>{d.cidade.toUpperCase()}</div>
                                                    </React.Fragment>);
                                                })}
                                            </div>);
                                        })()}
                                        <div className="om-map-loc-badge"><span>LOCAL:</span><span>{run.localAtual?.cidade}</span></div>
                                    </div>
                                ) : (<img src={currentCityImg} style={{ width: "100%", height: "220px", objectFit: "cover" }} alt="" />)}
                            </div>
                        </div>
                    )}
                    {viewMode === "RESUMO" && (<DialogBox title="MISSÃO ATIVA" text={isMissionCompetitive ? `Protocolo Fantasma: Capture o alvo antes dos outros agentes.\n📍 Local: ${run.localAtual?.cidade}` : `Você ainda tem ${fmtHoras(run.tempoRestanteHoras)} para prender o Suspeito.\n📍 Local: ${run.localAtual?.cidade}`} onComplete={() => setViewMode("ACTIONS")} />)}
                    {viewMode === "ARRIVAL" && !showSuspectVideo && (<DialogBox title={run.localAtual?.cidade?.toUpperCase()} text={currentCityDesc || "Você chegou a um novo destino."} onComplete={() => setViewMode("ACTIONS")} />)}
                    {viewMode === "DIALOGUE" && selectedLocal && (<DialogBox title={(selectedLocal.personagem || "Desconhecido").toUpperCase()} text={selectedLocal.pista} onComplete={() => setViewMode("ACTIONS")} />)}
                    {viewMode !== "ANALYZE" && viewMode !== "RESUMO" && viewMode !== "DIALOGUE" && viewMode !== "ARRIVAL" && (
                        <div className="om-card">
                            <Panel>
                                {viewMode === "ACTIONS" && (<div><div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12 }}>CENTRAL DE OPERAÇÕES</div>{tutState && <div style={{ background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.4)", borderRadius: 10, padding: "8px 12px", marginBottom: 12, fontSize: 11, color: "#ffd700", textAlign: "center", fontWeight: 700 }}>📌 {tutState.allowInvestigate ? "Clique em INVESTIGAR para coletar pistas" : tutState.allowAnalysis ? "Clique em ANALISAR para filtrar o perfil do suspeito" : tutState.allowTravel ? `Clique em VIAJAR para seguir para ${tutState.expectedDest}` : "Siga as instruções"}</div>}<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}><button className={`om-btn ${tutState?.allowTravel ? "tutorial-highlight" : ""}`} disabled={!!tutState && !tutState.allowTravel} onClick={() => setViewMode("TRAVEL_MAP")}>✈️ VIAJAR</button><button className={`om-btn ${tutState?.allowInvestigate ? "tutorial-highlight" : ""}`} disabled={!!tutState && !tutState.allowInvestigate} onClick={abrirLocais}>🔍 INVESTIGAR</button><button className={`om-btn ${tutState?.allowAnalysis ? "tutorial-highlight" : ""}`} disabled={!!tutState && !tutState.allowAnalysis} onClick={analisar} style={{ gridColumn: "1/-1" }}>🧪 ANALISAR</button></div></div>)}
                                {viewMode === "TRAVEL_MAP" && (<div><div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12 }}>DESTINO</div>{tutState && <div style={{ background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.4)", borderRadius: 10, padding: "8px 12px", marginBottom: 12, fontSize: 11, color: "#ffd700", textAlign: "center", fontWeight: 700 }}>📌 Selecione {tutState.expectedDest} como destino</div>}<div style={{ display: "grid", gap: 8 }}>{travelOptions.map(d => {const isTutTarget = tutState && d.cidade === tutState.expectedDest; return (<button key={d.id} className={`om-btn ${isTutTarget ? "tutorial-highlight" : ""}`} disabled={!!tutState && !isTutTarget} onClick={() => { setSelectedDest(d); setViewMode("TRAVEL_MODES"); }}>{caseObj?.dificuldade === "DIFICIL" || caseObj?.dificuldade === "LENDARIO" ? "📍" : d.flag} {d.cidade}</button>);})}{!tutState && run.localAtual?.cidade !== "Campinas" && <button className="om-btn" onClick={handleVoltar} style={{ border: "1px solid #80bdff" }}>↩️ VOLTAR</button>}</div><button onClick={() => setViewMode("ACTIONS")} style={{ marginTop: 10, background: "transparent", border: "none", color: "#80bdff", width: "100%" }}>Cancelar</button></div>)}
                                {viewMode === "TRAVEL_MODES" && selectedDest && (<div><div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12 }}>{selectedDest.isReturn ? "↩️ RETORNAR PARA" : "VIAJAR PARA"} {selectedDest.cidade.toUpperCase()}</div><div style={{ display: "grid", gap: 8 }}>{TRANSPORT_MODES.map(t => (<button key={t.id} className="om-btn" onClick={() => confirmarViagem(t)}>{t.icon} {t.nome} (${t.custoBase})</button>))}</div><button onClick={() => setViewMode(selectedDest.isReturn ? "ACTIONS" : "TRAVEL_MAP")} style={{ marginTop: 10, background: "transparent", border: "none", color: "#80bdff", width: "100%" }}>{selectedDest.isReturn ? "Cancelar" : "Mudar Destino"}</button></div>)}
                                {viewMode === "LOCATIONS" && (<div><div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12 }}>INVESTIGAÇÃO</div>{tutState && <div style={{ background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.4)", borderRadius: 10, padding: "8px 12px", marginBottom: 12, fontSize: 11, color: "#ffd700", textAlign: "center", fontWeight: 700 }}>📌 {(() => { const expectedLoc = localInterrogatorios.find(l => l.id === tutState.expectedLocId); return expectedLoc ? `Clique em "${expectedLoc.local}" para investigar` : "Investigue o local indicado"; })()}</div>}<div style={{ display: "grid", gap: 8 }}>{(localInterrogatorios.length > 0 ? localInterrogatorios : [{id:"F1",local:"Taxi",pista:"Nada visto."}]).map(loc => {const isTutTarget = tutState && loc.id === tutState.expectedLocId; return (<button key={loc.id} className={`om-btn ${isTutTarget ? "tutorial-highlight" : ""}`} disabled={!!tutState && !isTutTarget} onClick={() => interrogarNoLocal(loc)}>🕵️‍♂️ Ir para {loc.local}</button>);})}</div><button onClick={() => setViewMode("ACTIONS")} style={{ marginTop: 10, background: "transparent", border: "none", color: "#80bdff", width: "100%" }}>Cancelar</button></div>)}
                                {viewMode === "JOURNAL" && (<div><div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12 }}>JORNAL</div><div className="om-journal-list">{run.jornal?.slice().reverse().map((j, i) => (<div key={i} className="om-journal-item" style={{ fontSize: 11 }}><div style={{ opacity: 0.5 }}>{new Date(j.t).toLocaleString()}</div><div>{j.msg}</div></div>))}</div></div>)}
                                {viewMode === "PROFILE" && (<div><div style={{ display: "flex", gap: 8, marginBottom: 15 }}><button onClick={() => setProfileTab("PERFIL")} className="om-btn">PERFIL</button><button onClick={() => setProfileTab("GALERIA")} className="om-btn">GALERIA</button></div>{profileTab === "PERFIL" ? (<div><div style={{ fontSize: 18, fontWeight: 800 }}>{state.player.nome}</div><button onClick={handleAbort} className="om-btn" style={{ marginTop: 20, color: "#ff8080" }}>ABORTAR</button></div>) : <SuspectGallery capturedSuspects={state.capturedSuspects || {}} />}</div>)}
                            </Panel>
                        </div>
                    )}
                    {viewMode === "PROFILE" && profileTab === "GALERIA" && <div style={{ marginTop: 20 }}><SuspectGallery capturedSuspects={state.capturedSuspects || {}} /><button onClick={() => setViewMode("ACTIONS")} className="om-btn" style={{ marginTop: 20 }}>VOLTAR</button></div>}
                    {viewMode === "ANALYZE" && <>{tutState && <div style={{ background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.4)", borderRadius: 10, padding: "8px 12px", marginBottom: 12, fontSize: 11, color: "#ffd700", textAlign: "center", fontWeight: 700 }}>📌 {tutState.expectedWarrant ? "Selecione Kite Needle e clique em MANDADO para emitir o mandado de prisão" : tutState.expectedAnalise === "sexo" ? "Selecione \"Feminino\" nos filtros de Sexo" : tutState.expectedAnalise === "corCabelo" ? "Selecione \"Preto\" nos filtros de Cor do Cabelo" : tutState.expectedAnalise === "esporte" ? "Selecione \"Ginástica Olímpica\" nos filtros de Esporte" : "Analise o perfil do suspeito"}</div>}<Analisar onBack={() => setViewMode("ACTIONS")} filters={run?.filtrosAnalise || {}} setFilters={(f) => { const n = typeof f === 'function' ? f(run?.filtrosAnalise) : f; updateRun({ ...run, filtrosAnalise: n }); }} warrantId={run?.warrantId} setWarrantId={(id) => updateRun({ ...run, warrantId: id, mandadoEmitido: true })} tutorialHint={tutState} /></>}
                </div>
                <div className="om-tabs"><div className="om-tabs-inner"><button className="om-tab" onClick={() => setViewMode("ACTIONS")}>AÇÃO</button><button className="om-tab" onClick={() => setViewMode("JOURNAL")}>JORNAL</button><button className="om-tab" onClick={() => setViewMode("PROFILE")}>CASOS</button></div></div>
                {modalConfig.show && <ModalMsg message={modalConfig.message} type={modalConfig.type} isConfirm={modalConfig.isConfirm} onConfirm={modalConfig.onConfirm} onClose={() => setModalConfig({ ...modalConfig, show: false })} />}
            </div>
        );
    } catch (err) {
        console.error("[TEST DEBUG] Render Crash:", err.message, err.stack);
        return <div>Render Crash: {err.message}</div>;
    }
}