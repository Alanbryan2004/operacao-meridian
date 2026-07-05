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
import { saveCompletedMission, saveGameState } from "../services/gameSaveService";
import { useGame } from "../game/GameProvider";
import { getCidadeImagem, getCidadeDescricao } from "../game/Cidades";
import { updateStreakOnWin } from "../game/streakService";
import { CASOS_SCENARIOS, findScenario } from "../game/CasosScenarios";
import { DESTINATION_OPTIONS, ORIGIN_COORDS } from '../game/DestRoutes';
import Analisar from "./Analisar";
import SuspectGallery from "../components/SuspectGallery";
import DialogBox from "../components/DialogBox";
import ModalMsg from "../components/ModalMsg";
import { suspectsSeed, getUnlockedLeaders, FACTIONS } from "../game/store";
import { casesSeed } from "../game/seed";

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
    const nav = useNavigate();
    const { caseId } = useParams();
    const { state, replaceState, hydrated, inventory, refreshInventory } = useGame();
    const musicEnabled = state?.player?.settings?.musicEnabled ?? true;
    const [searchParams] = useSearchParams();
    
    const isMissionCompetitive = useMemo(() => {
        const cObj = state?.cases?.find(c => c.id === caseId);
        return searchParams.get("mode") === "competitive" || !!cObj?.isCompetitive;
    }, [state?.cases, caseId, searchParams]);

    const [viewMode, setViewMode] = useState("RESUMO");
    const [selectedLocal, setSelectedLocal] = useState(null);
    const [selectedDest, setSelectedDest] = useState(null);
    const [showSuspectVideo, setShowSuspectVideo] = useState(false);
    const [showCaptionDelay, setShowCaptionDelay] = useState(false);
    const [activeVideo, setActiveVideo] = useState(null);
    const [darkenScreen, setDarkenScreen] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const [profileTab, setProfileTab] = useState("PERFIL");
    const [revealFinalResult, setRevealFinalResult] = useState(false);
    const [travelAnimData, setTravelAnimData] = useState(null);
    const [animatedTime, setAnimatedTime] = useState(null);
    const [modalConfig, setModalConfig] = useState({ show: false, message: "", type: "INFO", isConfirm: false, onConfirm: null });
    const [pendingWarrant, setPendingWarrant] = useState(null);
    const [showMaisMenu, setShowMaisMenu] = useState(false);
    const [showItemsOverlay, setShowItemsOverlay] = useState(false);
    const [activeItemEffect, setActiveItemEffect] = useState(null); 
    const [highlightedCity, setHighlightedCity] = useState(null);

    const lobbyId = searchParams.get("lobbyId");
    const forcedScenarioId = searchParams.get("scenario");

    const initRef = useRef(null);

    useEffect(() => {
        if (!state || !hydrated) return;
        if (initRef.current === caseId) return;
        
        const caseObj = state.cases?.find((x) => x.id === caseId);
        if (!caseObj) {
            nav("/mural");
            return;
        }

        if (state.player?.supabaseId) {
            import("../game/streakService").then(m => m.checkStreakPersistence(state.player.supabaseId));
        }

        const currentRun = state.runs?.[caseId];
        const scenarioMismatch = forcedScenarioId && currentRun?.scenarioId !== forcedScenarioId;
        const lobbyMismatch = lobbyId && currentRun?.lobbyId !== lobbyId;
        const isSetup = searchParams.get("setup") === "true";
        const needsReset = isSetup || (isMissionCompetitive && (!currentRun || lobbyMismatch || scenarioMismatch));
        
        const next = startRunIfNeeded(state, { ...caseObj, isCompetitive: isMissionCompetitive }, needsReset, forcedScenarioId, lobbyId);
        
        if (next !== state) {
            replaceState(saveGame(next));
        }
        initRef.current = caseId;
        window.dispatchEvent(new CustomEvent("meridian-play-audio", { detail: true }));
    }, [caseId, isMissionCompetitive, forcedScenarioId, lobbyId, nav, replaceState, hydrated, searchParams, state]);

    const caseObj = useMemo(
        () => state?.cases?.find((x) => x.id === caseId),
        [state?.cases, caseId]
    );
    const run = useMemo(
        () => (state?.runs ? state.runs[caseId] : null),
        [state?.runs, caseId]
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
                let options = globalOptions.filter(d => forcedCities.includes(d.cidade));
                
                // 🔥 Sempre permite retornar para a cidade anterior se ela existir
                if (run.cidadeAnterior && !forcedCities.includes(run.cidadeAnterior)) {
                    let returnOpt = globalOptions.find(d => d.cidade === run.cidadeAnterior);
                    if (!returnOpt && run.cidadeAnterior === caseObj.localInicial?.cidade) {
                        returnOpt = {
                            ...caseObj.localInicial,
                            coords: ORIGIN_COORDS[caseObj.localInicial.cidade] || { x: 160, y: 100 },
                            origem: run.localAtual.cidade,
                            id: `RETURN_${caseObj.localInicial.cidade}`
                        };
                    }
                    if (returnOpt) {
                        if (options.length >= 3) {
                            // Encontra qual cidade é a correta para NÃO removê-la
                            const currentCityNorm = (run.localAtual?.cidade || "").toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                            const currentIdx = activeScenario.route?.findIndex(c => 
                                c.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === currentCityNorm
                            );
                            const nextCorrectCity = activeScenario.route?.[currentIdx + 1];
                            
                            // Remove a primeira cidade da lista que NÃO seja a correta
                            const wrongIdx = options.findIndex(opt => opt.cidade !== nextCorrectCity);
                            if (wrongIdx !== -1) {
                                options.splice(wrongIdx, 1);
                            }
                        }
                        options.push(returnOpt);
                    }
                }
                
                // Deduplica por nome e garante o limite de 3
                const finalOptions = options.filter((v, i, a) => a.findIndex(t => t.cidade === v.cidade) === i);
                return finalOptions.slice(0, 3);
            }
            // Se existe travelTable mas a cidade atual NÃO está nela (cidade errada), limita destinos
            if (activeScenario?.travelTable && !activeScenario.travelTable[run.localAtual?.cidade]) {
                // Cidade errada: só mostra a cidade anterior como opção de retorno
                if (run.cidadeAnterior) {
                    let options = globalOptions.filter(d => d.cidade === run.cidadeAnterior);
                    if (options.length === 0 && run.cidadeAnterior === caseObj.localInicial?.cidade) {
                        options = [{
                            ...caseObj.localInicial,
                            coords: ORIGIN_COORDS[caseObj.localInicial.cidade] || { x: 160, y: 100 },
                            origem: run.localAtual.cidade,
                            id: `RETURN_${caseObj.localInicial.cidade}`
                        }];
                    }
                    return options.filter((v, i, a) => a.findIndex(t => t.cidade === v.cidade) === i);
                }
                return [];
            }
            return globalOptions.filter((v, i, a) => a.findIndex(t => t.cidade === v.cidade) === i);
        }, [run?.localAtual?.cidade, run?.cidadeAnterior, activeScenario, caseObj]);

        if (!state || !caseObj || !run) return null;

        const updateRun = (nextRun) => {
            const nextState = { ...state, runs: { ...state.runs, [caseId]: nextRun } };
            replaceState(saveGame(nextState));
        };

        const confirmarViagem = (transport) => {
            const destino = transport.customDest || selectedDest;
            if (!destino) return;
            let custo = transport.custoBase;
            let horas = transport.horasBase;

            // --- Lógica de Vouchers / Créditos Aéreos ---
            let usedVoucherId = null;
            if (transport.id === "AVIAO") {
                const activeVoucher = (state.player.vouchers || []).find(v => (v.credits ?? 0) > 0);
                if (activeVoucher) {
                    console.log(`[ATLAS] Aplicando voucher: ${activeVoucher.label}`);
                    custo = Math.round(custo * (1 - (activeVoucher.discount || 0)));
                    usedVoucherId = activeVoucher.id;
                    if (activeVoucher.hasInstantTravel && transport.horasBase > 1) {
                         // Talvez a regra seja automática ou manual, vamos fazer automático se tiver
                         horas = 0;
                    }
                }
            }

            if (state.player.dinheiro < custo) {
                updateRun({
                    ...run,
                    jornal: [...run.jornal, { t: new Date().toISOString(), msg: `🚫 Dinheiro insuficiente para viajar de ${transport.nome}.` }],
                });
                setViewMode("ACTIONS");
                return;
            }

            let nextState = spendMoney(state, custo, `✈️ Viagem para ${destino.pais} (${transport.nome}): -$${custo}`, caseId);
            
            // Deduz crédito do voucher se usado
            if (usedVoucherId) {
                nextState.player.vouchers = (nextState.player.vouchers || []).map(v => 
                    v.id === usedVoucherId ? { ...v, credits: (v.credits || 1) - 1 } : v
                );
            }

            nextState = saveGame(nextState);
            const nextRun = spendTime(nextState.runs[caseId], horas, `✈️ Você chegou em ${destino.cidade} após ${horas}h de viagem.`);
            nextRun.localAtual = { flag: destino.flag, pais: destino.pais, city: destino.cidade }; // city -> cidade
            nextRun.localAtual.cidade = destino.cidade; // Garantir campo correto
            nextRun.cidadeAnterior = run.localAtual?.cidade;
            const finalState = saveGame({ ...nextState, runs: { ...nextState.runs, [caseId]: nextRun } });
            replaceState(finalState);

            // 🏆 Atualiza etapa atual no banco para ranking competitivo
            if (isMissionCompetitive && lobbyId && state.player.supabaseId && activeScenario?.route) {
                const routeIdx = activeScenario.route.indexOf(destino.cidade);
                const stageNum = routeIdx >= 0 ? routeIdx + 1 : null;
                if (stageNum) {
                    supabase.from("competitive_players")
                        .update({ current_stage: stageNum })
                        .eq("lobby_id", lobbyId)
                        .eq("player_id", state.player.supabaseId)
                        .then();
                }
            }

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

            if (shouldAnim && (transport.animDuration || 0) > 0) {
                const isReverse = !!transport.isReverse || !!selectedDest?.isReturn;
                const animImg = isReverse ? (transport.animImgVolta || transport.animImg) : transport.animImg;
                
                setTravelAnimData({ ...transport, animImg, destCidade: destino.cidade, isReverse });
                setViewMode("TRAVEL_ANIMATION");

                // --- Efeito de Countdown Visual ---
                const oldTime = run.tempoRestanteHoras;
                const totalHoursToDeduct = transport.horasBase;
                let currentVisual = oldTime;
                
                setAnimatedTime(oldTime);
                // Calcula stepMs garantindo que seja um número válido
                const duration = transport.animDuration || 2000;
                const stepMs = duration / (totalHoursToDeduct || 1);
                
                const interval = setInterval(() => {
                    currentVisual--;
                    if (currentVisual >= oldTime - totalHoursToDeduct) {
                        setAnimatedTime(currentVisual);
                    } else {
                        clearInterval(interval);
                    }
                }, stepMs);

                setTimeout(() => {
                    clearInterval(interval);
                    setAnimatedTime(null);
                    setTravelAnimData(null);
                    setHighlightedCity(null);
                    triggerArrival();
                }, duration);
            } else {
                setTravelAnimData(null);
                setAnimatedTime(null);
                setHighlightedCity(null);
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
                setShowCaptionDelay(false);
                setTimeout(() => {
                    setShowSuspectVideo(true);
                    setActiveVideo(isSuccess ? "/Videos/suspeitopreso.mp4" : "/Videos/suspeitonaopreso.mp4");
                    setDarkenScreen(false);
                    setViewMode("ARRIVAL");
                    
                    // Mostra as legendas apenas na parte final do vídeo (após 10s)
                    setTimeout(() => setShowCaptionDelay(true), 10000);
                }, 800);

                if (isSuccess) {
                    const isNewCapture = !state.capturedSuspects || !(state.capturedSuspects[run.warrantId] > 0);
                    const isLeader = String(run.warrantId).startsWith("L");

                    const nextRun = {
                        ...nextRunCount,
                        status: "WON",
                        suspeitoCapturado: true,
                        isNewCapture,
                        isLeader,
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
                        supabase.from("competitive_players").update({ status: "won", current_stage: activeScenario?.route?.length || 10, finished_at: new Date().toISOString() }).eq("lobby_id", lobbyId).eq("player_id", state.player.supabaseId).then();
                    }

                    const unlockedBefore = getUnlockedLeaders(state.capturedSuspects);
                    const captState = registerCapture({ ...state, player: nextPlayer, runs: { ...state.runs, [caseId]: nextRun } }, run.warrantId);
                    const unlockedAfter = getUnlockedLeaders(captState.capturedSuspects);

                    const newlyUnlocked = unlockedAfter.filter(id => !unlockedBefore.includes(id));
                    if (newlyUnlocked.length > 0) {
                        const newLeaderId = newlyUnlocked[0];
                        const faction = Object.values(FACTIONS).find(f => f.leaderId === newLeaderId);
                        if (faction) {
                            console.log(`[ATLAS] Facção desmantelada! Líder desbloqueado: ${newLeaderId}`);
                            localStorage.setItem("pendingFactionUnlock", JSON.stringify({
                                factionId: faction.id,
                                factionName: faction.name,
                                factionEmoji: faction.emoji,
                                leaderId: faction.leaderId,
                                leaderName: faction.leaderName,
                                message: faction.milestoneMessage
                            }));
                        }
                    }

                    const savedCaptState = saveGame(captState);
                    replaceState(savedCaptState);
                    // Força salvamento remoto imediato
                    if (state.player.supabaseId) saveGameState(savedCaptState).catch(e => console.warn("Erro no save remoto:", e));

                        // 🔥 Salva no Banco de Dados e Atualiza Streak
                        saveCompletedMission({
                            caseId,
                            titulo: caseObj.titulo,
                            dificuldade: caseObj.dificuldade,
                            resultado: "WON",
                            xpGanho: caseObj.xp,
                            recompensaGanha: caseObj.recompensa,
                            suspectCaptured: run.targetSuspectId
                        })
                        .then(async () => {
                             if (state.player.supabaseId) {
                                 const streakResult = await updateStreakOnWin(state.player.supabaseId);
                                 if (streakResult) {
                                     let streakDinheiro = 0;
                                     if (streakResult.newlyAwarded && streakResult.newlyAwarded.moedas) {
                                         streakDinheiro = streakResult.newlyAwarded.moedas;
                                     }

                                     const updatedPlayer = { 
                                         ...nextPlayer, 
                                         dailyStreak: streakResult.current_streak,
                                         dinheiro: (nextPlayer.dinheiro || 0) + streakDinheiro
                                     };
                                     const finalState = saveGame({ ...captState, player: updatedPlayer });
                                     replaceState(finalState);
                                     
                                     // Força salvamento remoto imediato do streak
                                     saveGameState(finalState).catch(e => console.warn("Erro no save remoto do streak:", e));

                                     // Salva no localStorage para CasoSolucionado mostrar após ENCERRAR
                                     localStorage.setItem("pendingStreakResult", JSON.stringify(streakResult));
                                     if (streakResult.newlyAwarded) {
                                         localStorage.setItem("pendingNewVoucher", JSON.stringify(streakResult.newlyAwarded));
                                     }
                                 }
                             }
                        })
                    .catch(err => console.error("Falha ao persistir missão concluída:", err));
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
            // Busca um objeto de destino válido para a cidade anterior
            let destObj = DESTINATION_OPTIONS.find(d => d.cidade === run.cidadeAnterior);
            
            // Se não encontrou nas rotas globais ou se é a cidade inicial, reconstrói o objeto
            if (!destObj || run.cidadeAnterior === caseObj.localInicial?.cidade) {
                const isStart = run.cidadeAnterior === caseObj.localInicial?.cidade;
                destObj = {
                    ...(isStart ? caseObj.localInicial : { cidade: run.cidadeAnterior, pais: "Desconhecido" }),
                    coords: ORIGIN_COORDS[run.cidadeAnterior] || { x: 160, y: 100 },
                    flag: "📍", // Fallback de bandeira
                    origem: run.localAtual?.cidade // Define a origem correta
                };
            }
            
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

        const handleUseItem = async (itemKey) => {
            console.log("[DEBUG] Usando item:", itemKey, "Inventory:", inventory[itemKey], "canAct:", canAct);
            if (!canAct) return;
            if (inventory[itemKey] <= 0) return;

            const { inventoryService } = await import("../game/inventoryService");
            const success = await inventoryService.consumeItem(state.player.supabaseId, itemKey);
            
            if (success) {
                await refreshInventory();
                
                if (itemKey === "fonte_anonima") {
                    // --- Fonte Anônima: Revela uma característica que NÃO será dada na missão ---
                    const schedule = activeScenario?.suspectTipSchedule || [];
                    const categoriesInMission = new Set(schedule.map(s => s.category));
                    const allCategories = ["sexo", "origem", "cabelo", "olhos", "esporte", "comida", "caracteristica"];
                    
                    // Categorias que o jogador NÃO vai receber investigando normalmente
                    const hiddenCategories = allCategories.filter(cat => !categoriesInMission.has(cat));
                    
                    let foundTip = null;

                    if (activeScenario?.suspectId) {
                        const targetSuspect = suspectsSeed.find(s => s.id === activeScenario.suspectId);
                        
                        // Tenta pegar uma categoria que não está na missão
                        if (hiddenCategories.length > 0 && targetSuspect?.dicas) {
                            // Embaralha as categorias escondidas para pegar uma aleatória
                            const shuffledHidden = [...hiddenCategories].sort(() => Math.random() - 0.5);
                            for (const cat of shuffledHidden) {
                                const tips = targetSuspect.dicas[cat];
                                if (tips && tips.length > 0) {
                                    foundTip = { texto: tips[Math.floor(Math.random() * tips.length)].texto, category: cat };
                                    break;
                                }
                            }
                        }

                        // Se não encontrou nada "escondido", busca no cronograma o que ainda não foi descoberto
                        if (!foundTip) {
                            const discoveredTexts = new Set((run.pistasDescobertas || []).map(p => p.conteudo));
                            foundTip = schedule.find(s => !discoveredTexts.has(s.texto));
                        }

                        // Se ainda assim não houver nada de suspeito, fallback para pool geral
                        if (!foundTip && targetSuspect?.dicas) {
                            const allSuspectTips = Object.values(targetSuspect.dicas).flat().map(d => d.texto);
                            const discoveredTexts = new Set((run.pistasDescobertas || []).map(p => p.conteudo));
                            const remaining = allSuspectTips.filter(t => !discoveredTexts.has(t));
                            if (remaining.length > 0) {
                                foundTip = { texto: remaining[Math.floor(Math.random() * remaining.length)] };
                            }
                        }
                    }

                    // Fallback final: local não visitado
                    if (!foundTip) {
                        const allInterrogatorios = activeScenario?.interrogatorios || [];
                        const undiscovered = allInterrogatorios.filter(loc => !run.pistasDescobertas?.some(p => p.idInterrogatorio === loc.id));
                        if (undiscovered.length > 0) {
                            const randomLoc = undiscovered[Math.floor(Math.random() * undiscovered.length)];
                            foundTip = { texto: randomLoc.pista, id: randomLoc.id, npc: randomLoc.personagem, local: randomLoc.local, cidade: randomLoc.cidade };
                        }
                    }

                    if (foundTip) {
                        const nextRun = { ...run };
                        nextRun.pistasDescobertas = [...(run.pistasDescobertas || []), { 
                            idInterrogatorio: foundTip.id || `FONTE_${Date.now()}`, 
                            conteudo: foundTip.texto, 
                            fonte: foundTip.npc || "Informante", 
                            local: foundTip.local || "Comunicação Cifrada", 
                            cidade: foundTip.cidade || run.localAtual?.cidade 
                        }];
                        nextRun.jornal = [...(run.jornal || []), { t: new Date().toISOString(), msg: "🕵️ Fonte Anônima: Nova pista desbloqueada." }];
                        updateRun(nextRun);
                        
                        setActiveItemEffect({
                            name: "FONTE ANÔNIMA",
                            text: "“Uma mensagem cifrada chegou à central. Nova pista desbloqueada.”",
                            icon: "/Itens/FonteAnonima.png"
                        });

                        // --- Dispara Diálogo da Fonte Anônima ---
                        setSelectedLocal({
                            personagem: "FONTE ANÔNIMA",
                            imgPersonagem: "/NPC/Informante.png",
                            imgLocal: currentCityImg,
                            pista: `Tenho algo para você, agente...\n\nSeu alvo deixou rastros onde menos esperava.\n\n${foundTip.texto}`
                        });
                        setViewMode("DIALOGUE");
                    } else {
                        setActiveItemEffect({
                            name: "AVISO",
                            text: "“Todas as pistas conhecidas já foram interceptadas.”",
                            icon: "/Itens/FonteAnonima.png"
                        });
                    }
                } else if (itemKey === "satelite_atlas") {
                    // --- Satélite Atlas ---
                    if (activeScenario?.route) {
                        const currentCityNorm = (run.localAtual.cidade || "").toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        
                        const currentIdx = activeScenario.route.findIndex(c => 
                            c.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === currentCityNorm
                        );

                        const nextCityName = activeScenario.route[currentIdx + 1];

                        if (nextCityName) {
                            setHighlightedCity(nextCityName);
                            const nextRun = { ...run };
                            nextRun.jornal = [...(run.jornal || []), { t: new Date().toISOString(), msg: `📡 Satélite Atlas: Rota inimiga localizada para ${nextCityName}.` }];
                            updateRun(nextRun);

                            setActiveItemEffect({
                                name: "SATÉLITE ATLAS",
                                text: "“Varredura orbital concluída. Trajeto inimigo localizado.”",
                                icon: "/Itens/SateliteAtlas.png"
                            });
                        } else if (currentIdx === activeScenario.route.length - 1) {
                            // Se já está na última cidade da rota
                            setActiveItemEffect({
                                name: "AVISO",
                                text: "“O Satélite indica que o alvo está nesta cidade!”",
                                icon: "/Itens/SateliteAtlas.png"
                            });
                        }
                    }
                } else if (itemKey === "dossie_sigiloso") {
                    // --- Dossiê Sigiloso: Elimina metade dos suspeitos que batem com os filtros ATUAIS ---
                    const currentFilters = run.filtrosAnalise || {};
                    const targetId = run.targetSuspectId;

                    // Filtra quem passaria pelos filtros atuais
                    const matches = suspectsSeed.filter(s => {
                        return Object.entries(currentFilters).every(([key, vals]) => {
                            if (!vals || vals.length === 0) return true;
                            const sVal = s[key];
                            if (Array.isArray(sVal)) return sVal.some(v => vals.includes(v));
                            return vals.includes(sVal);
                        });
                    });

                    // Pega os que NÃO são o alvo e ainda NÃO foram eliminados
                    const alreadyEliminated = new Set(run.eliminatedIds || []);
                    const candidates = matches.filter(s => s.id !== targetId && !alreadyEliminated.has(s.id));
                    
                    if (candidates.length > 0) {
                        // Embaralha e pega metade
                        const toEliminate = candidates
                            .sort(() => Math.random() - 0.5)
                            .slice(0, Math.ceil(candidates.length / 2))
                            .map(s => s.id);

                        const nextRun = { 
                            ...run, 
                            eliminatedIds: [...new Set([...(run.eliminatedIds || []), ...toEliminate])]
                        };
                        nextRun.jornal = [...(run.jornal || []), { t: new Date().toISOString(), msg: "📁 Dossiê Sigiloso: Suspeitos improváveis eliminados." }];
                        updateRun(nextRun);

                        setActiveItemEffect({
                            name: "DOSSIÊ SIGILOSO",
                            text: "“Documentos internos recuperados. Informações críticas disponíveis.”",
                            icon: "/Itens/DossieSigiloso.png"
                        });
                    } else {
                        setActiveItemEffect({
                            name: "AVISO",
                            text: "“O dossiê não contém novas informações sobre os suspeitos filtrados.”",
                            icon: "/Itens/DossieSigiloso.png"
                        });
                    }
                }

                setTimeout(() => setActiveItemEffect(null), 4000);
                setShowItemsOverlay(false);
                setShowMaisMenu(false);
            }
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

        if (!run || !caseObj) {
            return (
                <div style={{ 
                    height: "100dvh", 
                    width: "100vw", 
                    background: "#000", 
                    display: "flex", 
                    flexDirection: "column",
                    alignItems: "center", 
                    justifyContent: "center", 
                    color: "#80bdff", 
                    fontSize: 12, 
                    letterSpacing: 4,
                    gap: 20
                }}>
                    <div style={{ width: 40, height: 40, border: "2px solid rgba(128,189,255,0.2)", borderTopColor: "#80bdff", borderRadius: "50%", animation: "om-spin 1s linear infinite" }} />
                    INICIALIZANDO MISSÃO...
                    <style>{`
                        @keyframes om-spin { to { transform: rotate(360deg); } }
                    `}</style>
                </div>
            )
        }

        if (!hydrated || !state) {
            return (
                <div style={{ minHeight: "100dvh", width: "100vw", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                    Conectando à rede A.T.L.A.S...
                </div>
            );
        }

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
                    @keyframes om-caption-pulse { 0%, 100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.03); } }
                    @keyframes om-caption-fade-in { 0% { opacity: 0; transform: scale(0.8) translateY(10px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
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
                                        {!isMissionCompetitive ? (
                                            <div>
                                                <div style={{ fontSize: 14, fontWeight: 900, color: animatedTime !== null ? "#3cff9c" : "#fff", transition: "color 0.3s" }}>
                                                    {fmtHoras(animatedTime !== null ? animatedTime : run.tempoRestanteHoras)}
                                                </div>
                                                <div style={{ fontSize: 10, opacity: 0.6 }}>RESTANTES</div>
                                            </div>
                                        ) : (
                                            <div><div style={{ fontSize: 14, fontWeight: 900, color: "#80bdff" }}>PVP</div><div style={{ fontSize: 10, opacity: 0.6 }}>MODO</div></div>
                                        )}
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
                                    <div style={{ position: "relative" }}>
                                        <video
                                            key={activeVideo}
                                            src={activeVideo}
                                            autoPlay
                                            playsInline
                                            muted
                                            webkitPlaysInline
                                            x5-playsinline="true"
                                            preload="auto"
                                            ref={el => { if (el) el.muted = true; }}
                                            onLoadedData={(e) => {
                                                e.target.play().catch(() => {});
                                            }}
                                            loop={false}
                                            onEnded={() => {
                                                if (runStatusRef.current === "WON" || runStatusRef.current === "LOST" || run?.status === "WON" || run?.status === "LOST") {
                                                    nav(`/caso-solucionado/${caseId}${isMissionCompetitive ? "?mode=competitive" : ""}`);
                                                } else {
                                                    setVideoEnded(true);
                                                    setTimeout(() => {
                                                        setShowSuspectVideo(false);
                                                        setActiveVideo(null);
                                                        // Sempre volta para ACTIONS após o vídeo terminar
                                                        // O DialogBox de ARRIVAL já terá sido exibido antes do vídeo
                                                        setViewMode("ACTIONS");
                                                        setSelectedDest(null);
                                                        setVideoEnded(false);
                                                    }, 300);
                                                }
                                            }}
                                            style={{ width: "100%", height: "220px", objectFit: "cover" }}
                                        />
                                        {activeVideo && (() => {
                                            const videoPath = activeVideo.toLowerCase();
                                            const isArrest = videoPath.includes("suspeitopreso");
                                            const isEscape = videoPath.includes("suspeitonaopreso");
                                            const isResultVideo = isArrest || isEscape;
                                            
                                            const isNearby = videoPath.includes("suspeito2");
                                            const isPassedBy = videoPath.includes("suspeito") && !isResultVideo && !isNearby;

                                            // Só mostra legendas de captura/fuga após o delay de 10s (chase -> black -> result)
                                            if (isResultVideo && !showCaptionDelay) return null;

                                            const caption = isArrest ? "🚔 Suspeito Capturado!" 
                                                : isEscape ? "🚨 Suspeito Fugiu!" 
                                                : isNearby ? "🕵️ O Suspeito Está aqui..." 
                                                : isPassedBy ? "🕵️ Suspeito Passou por aqui..." 
                                                : "";
                                            
                                            if (!caption) return null;

                                            const captionColor = (isArrest || isEscape) 
                                                ? (isArrest ? "#3cffA0" : "#ff4d4d") 
                                                : "#ffd700";

                                            return (
                                                <div style={{
                                                    textAlign: "center",
                                                    padding: "12px 0",
                                                    fontSize: isResultVideo ? 18 : 14,
                                                    fontWeight: 900,
                                                    color: captionColor,
                                                    letterSpacing: 1.5,
                                                    animation: isResultVideo 
                                                        ? "om-caption-fade-in 1s ease-out, om-caption-pulse 2s ease-in-out 1s infinite" 
                                                        : "om-caption-pulse 2s ease-in-out infinite",
                                                    textShadow: `0 0 12px ${captionColor}88, 0 0 25px ${captionColor}44`
                                                }}>
                                                    {caption}
                                                </div>
                                            );
                                        })()}
                                    </div>
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
                                                    const isHighlighted = highlightedCity === d.cidade;
                                                    return (<React.Fragment key={d.id}>
                                                        {isHighlighted && (
                                                            <div style={{
                                                                position: "absolute",
                                                                ...dp,
                                                                width: 40,
                                                                height: 40,
                                                                border: "2px solid #ffd700",
                                                                borderRadius: "50%",
                                                                transform: "translate(-50%, -50%)",
                                                                animation: "om-pulse-gold 1.5s infinite"
                                                            }} />
                                                        )}
                                                        <div className={`om-map-dest ${selectedDest?.id === d.id ? "selected" : ""} ${isHighlighted ? "tutorial-highlight highlighted" : ""}`} style={{ ...dp }} />
                                                        <div className="om-map-label" style={{ ...dp, color: isHighlighted ? "#ffd700" : (selectedDest?.id === d.id ? "#ffd700" : "#fff"), transform: "translate(-50%, 14px)", fontWeight: isHighlighted ? 900 : 800 }}>{d.cidade.toUpperCase()}</div>
                                                    </React.Fragment>);
                                                })}
                                            </div>);
                                        })()}
                                        <style>{`
                                            @keyframes om-pulse-gold {
                                                0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7); }
                                                50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; box-shadow: 0 0 20px 10px rgba(255, 215, 0, 0.3); }
                                                100% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
                                            }
                                        `}</style>
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
                                {viewMode === "ACTIONS" && (<div><div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12 }}>CENTRAL DE OPERAÇÕES</div>{tutState && <div style={{ background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.4)", borderRadius: 10, padding: "8px 12px", marginBottom: 12, fontSize: 11, color: "#ffd700", textAlign: "center", fontWeight: 700 }}>📌 {tutState.allowInvestigate ? "Clique em INVESTIGAR para coletar pistas" : tutState.allowAnalysis ? "Clique em ANALISAR para filtrar o perfil do suspeito" : tutState.allowTravel ? `Clique em VIAJAR para seguir para ${tutState.expectedDest}` : "Siga as instruções"}</div>}<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}><button className={`om-btn ${ (tutState?.allowTravel || highlightedCity) ? "tutorial-highlight" : ""}`} disabled={!canAct || (!!tutState && !tutState.allowTravel)} onClick={() => setViewMode("TRAVEL_MAP")}>✈️ VIAJAR</button><button className={`om-btn ${tutState?.allowInvestigate ? "tutorial-highlight" : ""}`} disabled={!canAct || (!!tutState && !tutState.allowInvestigate)} onClick={abrirLocais}>🔍 INVESTIGAR</button><button className={`om-btn ${tutState?.allowAnalysis ? "tutorial-highlight" : ""}`} disabled={!canAct || (!!tutState && !tutState.allowAnalysis)} onClick={analisar} style={{ gridColumn: "1/-1" }}>🧪 ANALISAR</button></div></div>)}
                                {viewMode === "TRAVEL_MAP" && (<div><div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12 }}>DESTINO</div>{tutState && <div style={{ background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.4)", borderRadius: 10, padding: "8px 12px", marginBottom: 12, fontSize: 11, color: "#ffd700", textAlign: "center", fontWeight: 700 }}>📌 Selecione {tutState.expectedDest} como destino</div>}<div style={{ display: "grid", gap: 8 }}>{travelOptions.map(d => {const isTutTarget = tutState && d.cidade === tutState.expectedDest; const isSatTarget = highlightedCity === d.cidade; return (<button key={d.id} className={`om-btn ${ (isTutTarget || isSatTarget) ? "tutorial-highlight" : ""}`} disabled={!!tutState && !isTutTarget} onClick={() => { setSelectedDest(d); setViewMode("TRAVEL_MODES"); }}>{caseObj?.dificuldade === "DIFICIL" || caseObj?.dificuldade === "LENDARIO" ? "📍" : d.flag} {d.cidade}</button>);})}{!tutState && run.localAtual?.cidade !== "Campinas" && <button className="om-btn" onClick={handleVoltar} style={{ border: "1px solid #80bdff" }}>↩️ VOLTAR</button>}</div><button onClick={() => setViewMode("ACTIONS")} style={{ marginTop: 10, background: "transparent", border: "none", color: "#80bdff", width: "100%" }}>Cancelar</button></div>)}
                                {viewMode === "TRAVEL_MODES" && selectedDest && (
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12 }}>{selectedDest.isReturn ? "↩️ RETORNAR PARA" : "VIAJAR PARA"} {selectedDest.cidade.toUpperCase()}</div>
                                        <div style={{ display: "grid", gap: 8 }}>
                                            {TRANSPORT_MODES.map(t => {
                                                let finalCusto = t.custoBase;
                                                const activeVoucher = t.id === "AVIAO" ? (state.player.vouchers || []).find(v => (v.credits ?? 0) > 0) : null;
                                                if (activeVoucher) finalCusto = Math.round(t.custoBase * (1 - (activeVoucher.discount || 0)));
                                                
                                                return (
                                                    <button key={t.id} className="om-btn" onClick={() => confirmarViagem(t)}>
                                                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                                            <span>{t.icon} {t.nome}</span>
                                                            <span style={{ color: activeVoucher ? "#3cff9c" : "#fff" }}>
                                                                ${finalCusto} {activeVoucher && <span style={{ fontSize: 9, opacity: 0.7 }}>(VOUCHER)</span>}
                                                            </span>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        { (state.player.vouchers || []).some(v => v.credits > 0) && (
                                            <div style={{ marginTop: 15, fontSize: 10, color: "#3cff9c", textAlign: "center", fontWeight: 700 }}>
                                                🎟️ VOCÊ TEM CRÉDITOS AÉREOS ATIVOS
                                            </div>
                                        )}
                                        <button onClick={() => setViewMode(selectedDest.isReturn ? "ACTIONS" : "TRAVEL_MAP")} style={{ marginTop: 10, background: "transparent", border: "none", color: "#80bdff", width: "100%" }}>{selectedDest.isReturn ? "Cancelar" : "Mudar Destino"}</button>
                                    </div>
                                )}
                                {viewMode === "LOCATIONS" && (<div><div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12 }}>INVESTIGAÇÃO</div>{tutState && <div style={{ background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.4)", borderRadius: 10, padding: "8px 12px", marginBottom: 12, fontSize: 11, color: "#ffd700", textAlign: "center", fontWeight: 700 }}>📌 {(() => { const expectedLoc = localInterrogatorios.find(l => l.id === tutState.expectedLocId); return expectedLoc ? `Clique em "${expectedLoc.local}" para investigar` : "Investigue o local indicado"; })()}</div>}<div style={{ display: "grid", gap: 8 }}>{(localInterrogatorios.length > 0 ? localInterrogatorios : [{id:"F1",local:"Taxi",pista:"Nada visto."}]).map(loc => {const isTutTarget = tutState && loc.id === tutState.expectedLocId; return (<button key={loc.id} className={`om-btn ${isTutTarget ? "tutorial-highlight" : ""}`} disabled={!!tutState && !isTutTarget} onClick={() => interrogarNoLocal(loc)}>🕵️‍♂️ Ir para {loc.local}</button>);})}</div><button onClick={() => setViewMode("ACTIONS")} style={{ marginTop: 10, background: "transparent", border: "none", color: "#80bdff", width: "100%" }}>Cancelar</button></div>)}
                                {viewMode === "JOURNAL" && (<div><div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12 }}>JORNAL</div><div className="om-journal-list">{run.jornal?.slice().reverse().map((j, i) => (<div key={i} className="om-journal-item" style={{ fontSize: 11 }}><div style={{ opacity: 0.5 }}>{new Date(j.t).toLocaleString()}</div><div>{j.msg}</div></div>))}</div></div>)}
                                {viewMode === "PROFILE" && (<div><div style={{ display: "flex", gap: 8, marginBottom: 15 }}><button onClick={() => setProfileTab("PERFIL")} className="om-btn">PERFIL</button><button onClick={() => setProfileTab("GALERIA")} className="om-btn">GALERIA</button></div>{profileTab === "PERFIL" ? (<div><div style={{ fontSize: 18, fontWeight: 800 }}>{state.player.nome}</div><button onClick={handleAbort} className="om-btn" style={{ marginTop: 20, color: "#ff8080" }}>ABORTAR</button></div>) : <SuspectGallery capturedSuspects={state.capturedSuspects || {}} />}</div>)}
                            </Panel>
                        </div>
                    )}
                    {viewMode === "PROFILE" && profileTab === "GALERIA" && <div style={{ marginTop: 20 }}><SuspectGallery capturedSuspects={state.capturedSuspects || {}} /><button onClick={() => setViewMode("ACTIONS")} className="om-btn" style={{ marginTop: 20 }}>VOLTAR</button></div>}
                    {viewMode === "ANALYZE" && <>{tutState && <div style={{ background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.4)", borderRadius: 10, padding: "8px 12px", marginBottom: 12, fontSize: 11, color: "#ffd700", textAlign: "center", fontWeight: 700 }}>📌 {tutState.expectedWarrant ? "Selecione Kite Needle e clique em MANDADO para emitir o mandado de prisão" : tutState.expectedAnalise === "sexo" ? "Selecione \"Feminino\" nos filtros de Sexo" : tutState.expectedAnalise === "corCabelo" ? "Selecione \"Preto\" nos filtros de Cor do Cabelo" : tutState.expectedAnalise === "esporte" ? "Selecione \"Ginástica Olímpica\" nos filtros de Esporte" : "Analise o perfil do suspeito"}</div>}<Analisar onBack={() => { setViewMode("ACTIONS"); }} filters={run?.filtrosAnalise || {}} setFilters={(f) => { const n = typeof f === 'function' ? f(run?.filtrosAnalise) : f; updateRun({ ...run, filtrosAnalise: n }); }} warrantId={run?.warrantId} setWarrantId={setPendingWarrant} tutorialHint={tutState} eliminatedIds={run.eliminatedIds || []} /></>}
                </div>
                
                {/* MENU INFERIOR */}
                {viewMode !== "TRAVEL_ANIMATION" && viewMode !== "DIALOGUE" && viewMode !== "ARRIVAL" && !showSuspectVideo && (
                    <div className="om-tabs">
                        <div className="om-tabs-inner">
                            <button className={`om-tab ${viewMode === "ACTIONS" ? "om-tab-active" : ""}`} onClick={() => { setViewMode("ACTIONS"); setShowMaisMenu(false); }}>AÇÃO</button>
                            <button className={`om-tab ${viewMode === "JOURNAL" ? "om-tab-active" : ""}`} onClick={() => { setViewMode("JOURNAL"); setShowMaisMenu(false); }}>JORNAL</button>
                            <button className={`om-tab ${viewMode === "PROFILE" ? "om-tab-active" : ""}`} onClick={() => { setViewMode("PROFILE"); setShowMaisMenu(false); }}>CASOS</button>
                            <button className={`om-tab ${showMaisMenu ? "om-tab-active" : ""}`} onClick={() => setShowMaisMenu(!showMaisMenu)}>☰ MAIS</button>
                        </div>
                    </div>
                )}

                {/* BLOQUEADOR DE INTERAÇÃO DURANTE A VIAGEM OU VÍDEO */}
                {(viewMode === "TRAVEL_ANIMATION" || showSuspectVideo) && (
                    <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "transparent", cursor: "wait" }} />
                )}

                {/* OVERLAY MAIS MENU */}
                {showMaisMenu && (
                    <div style={{ position: "fixed", inset: 0, zIndex: 150, display: "flex", alignItems: "flex-end", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setShowMaisMenu(false)}>
                        <div 
                            style={{ 
                                width: "100%", 
                                background: "#071a26", 
                                borderRadius: "24px 24px 0 0", 
                                borderTop: "1px solid rgba(128,189,255,0.3)", 
                                padding: "20px", 
                                paddingBottom: "110px",
                                animation: "om-slide-up 0.3s ease-out" 
                            }} 
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                <button className="om-btn" style={{ height: "60px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px" }} onClick={() => { setShowItemsOverlay(true); setShowMaisMenu(false); }}>
                                    <span style={{ fontSize: "18px" }}>🎒</span>
                                    <span style={{ fontSize: "10px" }}>ITENS</span>
                                </button>
                                <button className="om-btn" style={{ height: "60px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px" }} onClick={() => nav("/loja")}>
                                    <span style={{ fontSize: "18px" }}>🏪</span>
                                    <span style={{ fontSize: "10px" }}>LOJA</span>
                                </button>
                                <button className="om-btn" style={{ height: "60px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px" }} onClick={() => nav("/perfil")}>
                                    <span style={{ fontSize: "18px" }}>👤</span>
                                    <span style={{ fontSize: "10px" }}>PERFIL</span>
                                </button>
                                <button className="om-btn" style={{ height: "60px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px" }} onClick={() => nav("/configuracao")}>
                                    <span style={{ fontSize: "18px" }}>⚙️</span>
                                    <span style={{ fontSize: "10px" }}>CONFIG</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* OVERLAY ITENS */}
                {showItemsOverlay && (
                    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                        <div style={{ width: "100%", maxWidth: "400px", background: "#050c14", border: "1px solid rgba(128,189,255,0.3)", borderRadius: "20px", padding: "20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                                <div style={{ fontSize: "14px", fontWeight: 900, letterSpacing: "1px" }}>INTELIGÊNCIA OPERACIONAL</div>
                                <button onClick={() => setShowItemsOverlay(false)} style={{ background: "transparent", border: "none", color: "#fff", fontSize: "24px" }}>×</button>
                            </div>

                            <div style={{ display: "grid", gap: "12px" }}>
                                {/* SATELITE */}
                                <div style={{ background: "rgba(255,255,255,0.05)", padding: "12px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: "12px", alignItems: "center" }}>
                                    <img src="/Itens/SateliteAtlas.png" style={{ width: "50px", height: "50px", objectFit: "contain" }} alt="" />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: "11px", fontWeight: 900, color: "#ffd700" }}>SATÉLITE ATLAS x{inventory.satelite_atlas}</div>
                                        <div style={{ fontSize: "9px", opacity: 0.6 }}>Revela a cidade correta da próxima etapa.</div>
                                    </div>
                                    <button 
                                        className="om-btn" 
                                        style={{ width: "auto", padding: "8px 12px", fontSize: "10px", opacity: (inventory.satelite_atlas <= 0 || highlightedCity) ? 0.5 : 1 }}
                                        disabled={inventory.satelite_atlas <= 0 || highlightedCity}
                                        onClick={() => handleUseItem("satelite_atlas")}
                                    >
                                        USAR
                                    </button>
                                </div>

                                {/* DOSSIE */}
                                <div style={{ background: "rgba(255,255,255,0.05)", padding: "12px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: "12px", alignItems: "center" }}>
                                    <img src="/Itens/DossieSigiloso.png" style={{ width: "50px", height: "50px", objectFit: "contain" }} alt="" />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: "11px", fontWeight: 900, color: "#a080ff" }}>DOSSIÊ SIGILOSO x{inventory.dossie_sigiloso}</div>
                                        <div style={{ fontSize: "9px", opacity: 0.6 }}>Elimina metade dos suspeitos incorretos.</div>
                                    </div>
                                    <button 
                                        className="om-btn" 
                                        style={{ width: "auto", padding: "8px 12px", fontSize: "10px", opacity: (inventory.dossie_sigiloso <= 0) ? 0.5 : 1 }}
                                        disabled={inventory.dossie_sigiloso <= 0}
                                        onClick={() => handleUseItem("dossie_sigiloso")}
                                    >
                                        USAR
                                    </button>
                                </div>

                                {/* FONTE */}
                                <div style={{ background: "rgba(255,255,255,0.05)", padding: "12px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: "12px", alignItems: "center" }}>
                                    <img src="/Itens/FonteAnonima.png" style={{ width: "50px", height: "50px", objectFit: "contain" }} alt="" />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: "11px", fontWeight: 900, color: "#80bdff" }}>FONTE ANÔNIMA x{inventory.fonte_anonima || 0}</div>
                                        <div style={{ fontSize: "9px", opacity: 0.6 }}>Revela uma pista extra da missão atual.</div>
                                    </div>
                                    <button 
                                        className="om-btn" 
                                        style={{ width: "auto", padding: "8px 12px", fontSize: "10px", opacity: (inventory.fonte_anonima <= 0) ? 0.5 : 1 }}
                                        disabled={inventory.fonte_anonima <= 0}
                                        onClick={() => handleUseItem("fonte_anonima")}
                                    >
                                        USAR
                                    </button>
                                </div>

                                {/* LICENÇA TÁTICA */}
                                <div style={{ background: "rgba(255,255,255,0.05)", padding: "12px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: "12px", alignItems: "center" }}>
                                    <img src="/Itens/licencaTatica.png" style={{ width: "50px", height: "50px", objectFit: "contain" }} alt="" />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: "11px", fontWeight: 900, color: "#3cff9c" }}>LICENÇA TÁTICA x{inventory.licenca_tatica || 0}</div>
                                        <div style={{ fontSize: "9px", opacity: 0.6 }}>Protege sua ofensiva (uso automático).</div>
                                    </div>
                                    <button 
                                        className="om-btn" 
                                        style={{ width: "auto", padding: "8px 12px", fontSize: "10px", opacity: 0.5 }}
                                        disabled={true}
                                    >
                                        PASSIVO
                                    </button>
                                </div>
                            </div>
                            
                            <div style={{ marginTop: "15px", fontSize: "9px", textAlign: "center", opacity: 0.5, display: "flex", flexDirection: "column", gap: "8px" }}>
                                <div>* Os itens só podem ser ativados em suas telas específicas (Viajar, Analisar ou Investigar).</div>
                                

                            </div>
                        </div>
                    </div>
                )}

                {/* EFEITO DE ATIVAÇÃO DE ITEM */}
                {activeItemEffect && (
                    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.8)", animation: "om-fade-in 0.5s forwards" }}>
                        <div style={{ textAlign: "center", padding: "30px", maxWidth: "80%" }}>
                            <img src={activeItemEffect.icon} style={{ width: "120px", height: "120px", marginBottom: "20px", animation: "om-scale-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }} alt="" />
                            <div style={{ color: "#ffd700", fontSize: "18px", fontWeight: 900, marginBottom: "10px", letterSpacing: "2px" }}>{activeItemEffect.name}</div>
                            <div style={{ color: "#fff", fontSize: "14px", fontStyle: "italic", opacity: 0.9, lineHeight: "1.4" }}>{activeItemEffect.text}</div>
                        </div>
                    </div>
                )}

                <style>{`
                    @keyframes om-slide-up {
                        from { transform: translateY(100%); }
                        to { transform: translateY(0); }
                    }
                `}</style>
                {modalConfig.show && <ModalMsg message={modalConfig.message} type={modalConfig.type} isConfirm={modalConfig.isConfirm} onConfirm={modalConfig.onConfirm} onClose={() => setModalConfig({ ...modalConfig, show: false })} />}
                
                {/* Streak/Voucher modals agora ficam no CasoSolucionado.jsx */}

                {pendingWarrant && (
                    <ModalMsg 
                        message={`Deseja emitir Mandado de Prisão para ${suspectsSeed.find(s => s.id === pendingWarrant)?.codinome || "este suspeito"}?\n\nO alvo será marcado para captura imediata.`}
                        type="SUCCESS"
                        isConfirm={true}
                        onConfirm={() => {
                            const id = pendingWarrant;
                            const target = suspectsSeed.find(s => s.id === id);
                            const msg = `⚖️ Mandado de Prisão emitido para ${target?.codinome || "Suspeito Não Identificado"}.`;
                            const nextRun = { 
                                ...run, 
                                warrantId: id, 
                                mandadoEmitido: true,
                                jornal: [...(run.jornal || []), { t: new Date().toISOString(), msg }]
                            };
                            updateRun(nextRun);
                            setPendingWarrant(null);
                            setViewMode("ACTIONS");
                            window.dispatchEvent(new CustomEvent("meridian-play-audio", { detail: true }));
                        }}
                        onClose={() => setPendingWarrant(null)}
                    />
                )}

                <style>{`
                    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes scale-in { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
                `}</style>
            </div>
        );

}