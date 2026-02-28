import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    saveGame,
    spendMoney,
    spendTime,
    startRunIfNeeded,
    registerCapture,
} from "../game/store";
import { useGame } from "../game/GameProvider";
import Analisar from "./Analisar";
import SuspectGallery from "../components/SuspectGallery";
import DialogBox from "../components/DialogBox";

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

const ORIGIN_COORDS = {
    "Campinas": { x: 160, y: 120 },
    "Lisboa": { x: 120, y: 90 },
    "Madrid": { x: 150, y: 100 },
    "Moscou": { x: 200, y: 80 },
};

const DESTINATION_OPTIONS = [
    // De Campinas
    {
        id: "PT",
        pais: "Portugal",
        cidade: "Lisboa",
        origem: "Campinas",
        coords: { x: 300, y: 50 },
        flag: "🇵🇹",
        img: "/Paises/Portugal.png",
        desc: "Portugal é um país europeu banhado pelo Atlântico, conhecido por sua rica história marítima e pelas grandes navegações.\n\nSua cultura mistura tradição e modernidade, com fado, azulejos, castelos medievais e uma gastronomia marcante como o bacalhau e os pastéis de nata.\n\nCom cidades históricas como Lisboa e Porto, o país encanta pelo charme, pela arquitetura e pelo espírito acolhedor de seu povo."
    },
    {
        id: "AR",
        pais: "Argentina",
        cidade: "Buenos Aires",
        origem: "Campinas",
        coords: { x: 180, y: 155 },
        flag: "🇦🇷",
        img: "/Paises/BuenosAires.png",
        desc: "Buenos Aires é a vibrante capital da Argentina, conhecida por sua arquitetura elegante e avenidas amplas como a 9 de Julio.\n\nBerço do tango, mistura paixão, música e tradição em bairros icônicos como La Boca e San Telmo.\n\nCom cafés históricos, parrillas e vida cultural intensa, a cidade pulsa charme europeu com alma latina."
    },
    {
        id: "US",
        pais: "EUA",
        cidade: "Nova York",
        origem: "Campinas",
        coords: { x: 120, y: 55 },
        flag: "🇺🇸",
        img: "/Paises/NovaYork.png",
        desc: "Nova York é uma das cidades mais icônicas do mundo, conhecida por seus arranha-céus imponentes e pela energia que nunca desacelera.\n\nLar da Estátua da Liberdade, da Times Square e do Central Park, é um centro global de cultura, negócios e entretenimento.\n\nDiversa e vibrante, mistura idiomas, sabores e estilos de vida em cada esquina, fazendo jus ao apelido de “a cidade que nunca dorme”."
    },
    // De Lisboa
    {
        id: "ES",
        pais: "Espanha",
        cidade: "Madrid",
        origem: "Lisboa",
        coords: { x: 280, y: 50 },
        flag: "🇪🇸",
        img: "/Paises/Madrid.png",
        desc: "Madrid, a capital da Espanha, é famosa por seus museus de classe mundial, como o Prado, e por sua vida noturna vibrante.\n\nUma cidade que respira arte, história e arquitetura monumental, de onde o Flamenco ecoa e a gastronomia de tapas conquista a todos.\n\nÉ um centro cosmopolita que mantém suas tradições vivas em cada praça e ruela histórica."
    },
    {
        id: "FR",
        pais: "França",
        cidade: "Paris",
        origem: "Lisboa",
        coords: { x: 200, y: 35 },
        flag: "🇫🇷",
        img: "/Paises/Paris.png",
        desc: "Paris, a Cidade Luz, é reconhecida mundialmente por sua arte, gastronomia e cultura. Com a imponente Torre Eiffel e o Museu do Louvre, ela exala sofisticação em cada boulevard.\n\nCaminhar por suas margens do Rio Sena é mergulhar em séculos de história, moda e o inconfundível estilo de vida parisiense."
    },
    {
        id: "EG",
        pais: "Egito",
        cidade: "Cairo",
        origem: "Lisboa",
        coords: { x: 300, y: 110 },
        flag: "🇪🇬",
        img: "/Paises/Cairo.png",
        desc: "O Cairo, capital do Egito, é uma metrópole onde a história milenar se encontra com a modernidade caótica. Lar das Grandes Pirâmides de Gizé e da Esfinge, o destino é um portal para os mistérios dos faraós.\n\nSeus mercados tradicionais e a riqueza do Nilo criam uma experiência cultural única e profunda no coração do mundo árabe."
    },
    {
        id: "RU",
        pais: "Rússia",
        cidade: "Moscou",
        origem: "Madrid",
        coords: { x: 280, y: 40 },
        flag: "🇷🇺",
        img: "/Paises/Moscou.png",
        desc: "Moscou é o coração político e cultural da Rússia, famosa por sua icônica Praça Vermelha e pelas cúpulas coloridas da Catedral de São Basílio.\n\nCom uma história que remete aos tempos dos Czares e do império soviético, a cidade mistura o luxo clássico com a arquitetura brutalista.\n\nÉ um centro de poder onde o inverno rígido contrasta com o calor da hospitalidade e da arte russa."
    },
    {
        id: "BT",
        pais: "Butão",
        cidade: "Thimphu",
        origem: "Madrid",
        coords: { x: 300, y: 120 },
        flag: "🇧🇹",
        img: "/Paises/Thimphu.png",
        desc: "Thimphu, a capital do Reino do Butão, situa-se nos altos vales do Himalaia e é conhecida por não possuir semáforos.\n\nÉ um lugar onde a modernidade avança sem apagar as tradições budistas e o respeito profundo pela natureza.\n\nOs dzongs (fortalezas), os templos e a busca pela Felicidade Interna Bruta fazem desta cidade um destino espiritual único no mundo."
    },
    {
        id: "US_2",
        pais: "EUA",
        cidade: "Nova York",
        origem: "Madrid",
        coords: { x: 120, y: 55 },
        flag: "🇺🇸",
        img: "/Paises/NovaYork.png",
        desc: "Nova York continua sendo o centro do mundo. De Madrid, a viagem atravessa o Atlântico rumo à metrópole que nunca dorme.\n\nA Estátua da Liberdade e a Times Square aguardam aqueles que buscam a última pista ou o esconderijo final do suspeito."
    },
    {
        id: "US_3",
        pais: "EUA",
        cidade: "Nova York",
        origem: "Moscou",
        coords: { x: 120, y: 55 },
        flag: "🇺🇸",
        img: "/Paises/NovaYork.png",
        desc: "Moscou para Nova York: uma longa jornada do Leste para o Oeste. Você cruza continentes e o oceano em busca da peça final do quebra-cabeça.\n\nA metrópole americana é o lugar onde o suspeito acredita que pode se perder na multidão, mas sua busca termina aqui."
    },
    {
        id: "FR_2",
        pais: "França",
        cidade: "Paris",
        origem: "Moscou",
        coords: { x: 300, y: 100 },
        flag: "🇫🇷",
        img: "/Paises/Paris.png",
        desc: "Paris, a cidade luz, é um destino recorrente para aqueles que tentam despistar autoridades. De Moscou, a rota volta para a Europa Central.\n\nA Torre Eiffel e o Louvre são cenários de beleza, mas não deixe a estética francesa distraí-lo do seu objetivo principal."
    },
    {
        id: "LY",
        pais: "Líbia",
        cidade: "Trípoli",
        origem: "Moscou",
        coords: { x: 360, y: 220 },
        flag: "🇱🇾",
        img: "/Paises/Tripoli.png",
        desc: "Trípoli, a capital da Líbia, é uma cidade portuária no Mediterrâneo com uma mistura fascinante de história árabe e arquitetura colonial.\n\nDas ruelas da medina aos monumentos históricos, a cidade oferece esconderijos perfeitos para quem conhece bem a região."
    }
];

const TRANSPORT_MODES = [
    { id: "AVIAO", nome: "Avião", icon: "✈️", custoBase: 800, horasBase: 12, desc: "Rápido e caro" },
    { id: "METRO", nome: "Trem/Metrô", icon: "🚆", custoBase: 300, horasBase: 36, desc: "Econômico e moderado" },
    { id: "BARCO", nome: "Navio/Barco", icon: "🚢", custoBase: 150, horasBase: 72, desc: "Lento e barato" },
];

export default function Caso() {
    const nav = useNavigate();
    const { caseId } = useParams();
    const { state, replaceState } = useGame();

    // MODOS CARD 2: "RESUMO" | "ACTIONS" | "LOCATIONS" | "DIALOGUE" | "JOURNAL" | "PROFILE" | "TRAVEL_MAP" | "TRAVEL_MODES" | "ARRIVAL"
    const [viewMode, setViewMode] = useState("RESUMO");
    const [selectedLocal, setSelectedLocal] = useState(null);
    const [selectedDest, setSelectedDest] = useState(null);
    const [showSuspectVideo, setShowSuspectVideo] = useState(false);
    const [activeVideo, setActiveVideo] = useState(null);
    const [darkenScreen, setDarkenScreen] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const [profileTab, setProfileTab] = useState("PERFIL");

    useEffect(() => {
        if (!state) return;
        const caseObj = state.cases.find((x) => x.id === caseId);
        if (!caseObj) {
            nav("/mural");
            return;
        }

        const next = startRunIfNeeded(state, caseObj);
        if (next !== state) {
            replaceState(saveGame(next));
        }

        // tenta tocar áudio (se já liberou no splash/login)
        window.dispatchEvent(new CustomEvent("meridian-play-audio", { detail: true }));
    }, [caseId]);

    const caseObj = useMemo(
        () => state?.cases?.find((x) => x.id === caseId),
        [state, caseId]
    );
    const run = useMemo(
        () => (state?.runs ? state.runs[caseId] : null),
        [state, caseId]
    );

    // Ref para manter o status mais recente do run, acessível dentro de closures (ex: onEnded do vídeo)
    const runStatusRef = useRef(run?.status);
    useEffect(() => {
        runStatusRef.current = run?.status;
    }, [run?.status]);

    const currentCityImg = useMemo(() => {
        if (!run) return "/reliquiaDesaparecida.png";
        if (run.localAtual.cidade === "Campinas") return "/reliquiaDesaparecida.png";
        const dest = DESTINATION_OPTIONS.find(d => d.cidade === run.localAtual.cidade);
        return dest?.img || "/reliquiaDesaparecida.png";
    }, [run?.localAtual?.cidade]);

    if (!state || !caseObj || !run) return null;

    function updateRun(nextRun) {
        const nextState = { ...state, runs: { ...state.runs, [caseId]: nextRun } };
        replaceState(saveGame(nextState));
    }

    function confirmarViagem(transport) {
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

        // Atualiza localização no run
        nextRun.localAtual = { pais: destino.flag ? destino.pais : destino.pais, cidade: destino.cidade };

        const finalState = saveGame({
            ...nextState,
            runs: { ...nextState.runs, [caseId]: nextRun },
        });
        replaceState(finalState);
        setViewMode("ARRIVAL");

        // Se for o país correto, mostra o vídeo do suspeito
        let videoPath = null;
        if (destino.id === "PT") videoPath = "/Videos/suspeito.mp4";
        if (destino.cidade === "Nova York") videoPath = "/Videos/suspeito2.mp4";

        setVideoEnded(false);
        if (videoPath) {
            setActiveVideo(videoPath);
            setDarkenScreen(true);
            setTimeout(() => {
                setShowSuspectVideo(true);
                setDarkenScreen(false);
            }, 800); // 800ms de suspense
        } else {
            setShowSuspectVideo(false);
            setActiveVideo(null);
        }
    }

    function abrirLocais() {
        if (run.status !== "IN_PROGRESS") return;
        setViewMode("LOCATIONS");
    }

    function interrogarNoLocal(locObj) {
        if (!canAct) return;

        // Incrementa contador da cidade
        const currentCount = (run.investigationCountByCity?.[locObj.cidade] || 0) + 1;
        const nextRunCount = {
            ...run,
            investigationCountByCity: {
                ...(run.investigationCountByCity || {}),
                [locObj.cidade]: currentCount
            }
        };

        // Lógica de Captura Final em Nova York
        if (locObj.cidade === "Nova York") {
            // Se for o Garçom OU se for a SEGUNDA investigação na cidade
            if (locObj.personagem === "Garçom" || currentCount >= 2) {
                const hasCorrectWarrant = run.warrantId === "008"; // Hassan Al-Rashid
                const isSuccess = run.mandadoEmitido && hasCorrectWarrant;

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
                        jornal: [...run.jornal, { t: new Date().toISOString(), msg: "🎯 MISSÃO CUMPRIDA! O suspeito foi preso em Nova York." }],
                    };
                    const nextState = registerCapture({
                        ...state,
                        player: { ...state.player, dinheiro: state.player.dinheiro + caseObj.recompensa, xp: state.player.xp + caseObj.xp },
                        runs: { ...state.runs, [caseId]: nextRun },
                    }, run.warrantId);
                    replaceState(saveGame(nextState));
                } else {
                    const nextRun = {
                        ...nextRunCount,
                        status: "LOST",
                        jornal: [...run.jornal, { t: new Date().toISOString(), msg: "❌ MISSÃO FRACASSADA! O suspeito escapou em Nova York." }],
                    };
                    updateRun(nextRun);
                }
                return;
            }
        }

        const horas = 1;
        const jaTem = run.pistasDescobertas.some(p => p.idInterrogatorio === locObj.id);
        let msgPista;
        let novaPista = null;

        if (jaTem) {
            msgPista = `🗣️ Você voltou ao ${locObj.local}, nada novo.`;
        } else {
            msgPista = `🗣️ Investigação no ${locObj.local}: pista coletada!`;
            novaPista = {
                idInterrogatorio: locObj.id,
                conteudo: locObj.pista,
                fonte: locObj.personagem,
                local: locObj.local
            };
        }

        const nextRun = spendTime(nextRunCount, horas, `🗣️ ${msgPista} (-${horas}h)`);
        if (novaPista) nextRun.pistasDescobertas = [...run.pistasDescobertas, novaPista];

        updateRun(nextRun);
        setSelectedLocal(locObj);
        setViewMode("DIALOGUE");
    }

    function handleVoltar() {
        let volta = null;
        if (run.localAtual.cidade === "Lisboa") volta = { cidade: "Campinas", pais: "Brasil" };
        if (run.localAtual.cidade === "Madrid") volta = { cidade: "Lisboa", pais: "Portugal" };
        if (run.localAtual.cidade === "Moscou" || run.localAtual.cidade === "Thimphu" || (run.localAtual.cidade === "Nova York" && run.localAtual.pais === "EUA")) {
            volta = { cidade: "Madrid", pais: "Espanha" };
        }

        if (volta) {
            confirmarViagem({
                id: "VOLTA",
                nome: "Voo de Retorno",
                custoBase: 500,
                horasBase: 12,
                customDest: volta
            });
        }
    }

    function analisar() {
        if (run.status !== "IN_PROGRESS") return;
        const horas = 2; // Reduzi um pouco para incentivar o uso
        updateRun(spendTime(run, horas, `🔍 Acessando Laboratório de Análise: -${2}h.`));
        setViewMode("ANALYZE");
    }

    function emitirMandado() {
        if (run.status !== "IN_PROGRESS") return;
        if (run.mandadoEmitido) {
            updateRun({
                ...run,
                jornal: [...run.jornal, { t: new Date().toISOString(), msg: "🧾 Mandado já emitido." }],
            });
            return;
        }
        const horas = 2;
        const next = spendTime(run, horas, `🧾 Mandado emitido: -${horas}h.`);
        next.mandadoEmitido = true;
        updateRun(next);
    }

    function capturar() {
        if (run.status !== "IN_PROGRESS") return;
        if (!run.mandadoEmitido) {
            updateRun({
                ...run,
                jornal: [...run.jornal, { t: new Date().toISOString(), msg: "🚫 Mandado necessário." }],
            });
            return;
        }
        const sucesso = run.pistasDescobertas.length >= 2;
        if (!sucesso) {
            updateRun(spendTime(run, 4, "🚨 Captura falhou. -4h."));
            return;
        }
        const nextRun = {
            ...run,
            status: "WON",
            suspeitoCapturado: true,
            jornal: [...run.jornal, { t: new Date().toISOString(), msg: "✅ Capturado!" }],
        };
        const nextState = registerCapture({
            ...state,
            player: { ...state.player, dinheiro: state.player.dinheiro + caseObj.recompensa, xp: state.player.xp + caseObj.xp },
            runs: { ...state.runs, [caseId]: nextRun },
        }, run.warrantId);
        replaceState(saveGame(nextState));
    }

    const diffTone = caseObj.dificuldade === "FACIL" ? "green" : caseObj.dificuldade === "MEDIO" ? "blue" : "amber";
    const canAct = run.status === "IN_PROGRESS";

    return (
        <div
            style={{
                minHeight: "100dvh",
                width: "100vw",
                margin: 0,
                padding: 0,
                background: "radial-gradient(circle at center, #071a26 0%, #000 70%)",
                color: "#fff",
                position: "relative",
            }}
        >
            {/* Overlay de Escurecimento */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "#000",
                    zIndex: 9999,
                    opacity: darkenScreen ? 1 : 0,
                    pointerEvents: "none",
                    transition: "opacity 0.6s ease"
                }}
            />

            <style>{`
        .om-wrap { max-width: 560px; margin: 0 auto; padding: 14px; padding-bottom: 96px; }
        .om-top { position: sticky; top: 0; z-index: 25; padding: 12px 0; background: linear-gradient(to bottom, #000, transparent); backdrop-filter: blur(8px); }
        .om-title { font-size: 16px; font-weight: 800; }
        .om-card { margin-top: 10px; }
        .om-img-card { width: 100%; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); overflow: hidden; background: #000; position: relative; }
        .om-btn { width: 100%; padding: 12px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.06); color: #fff; cursor: pointer; font-size: 13px; text-transform: uppercase; font-weight: 700; }
        .om-btn:active { transform: scale(0.98); }
        .om-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .om-btn-primary { background: rgba(120,200,255,0.2); border-color: rgba(120,200,255,0.4); }
        .om-tabs { position: fixed; bottom: 0; left: 0; right: 0; z-index: 100; padding: 15px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); display: flex; justify-content: center; }
        .om-tabs-inner { width: 100%; max-width: 500px; display: flex; gap: 10px; padding: 8px; border-radius: 20px; background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.1); }
        .om-tab { flex: 1; padding: 12px; border-radius: 14px; border: none; background: transparent; color: rgba(255,255,255,0.7); cursor: pointer; text-align: center; font-size: 11px; font-weight: 800; letter-spacing: 0.5px; }
        .om-tab-active { background: rgba(255,255,255,0.1); color: #fff; }

        .om-scene-box { position: relative; width: 100%; height: 220px; overflow: hidden; background: #000; }
        .om-scene-bg { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; }
        .om-scene-char { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); height: 85%; filter: drop-shadow(0 0 20px rgba(255,255,255,0.2)); }
        .om-dialog { margin-top: 10px; padding: 5px; font-size: 15px; line-height: 1.6; color: #fff; }
        .om-journal-list { maxHeight: 250px; overflow-y: auto; padding-right: 5px; }
        .om-journal-item { padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }

        /* Mapa Tático */
        .om-map-container { position: relative; width: 100%; height: 200px; background: radial-gradient(ellipse at center, #0d2137 0%, #060e1a 100%); border-radius: 14px; overflow: hidden; border: 1px solid rgba(128,189,255,0.15); }
        .om-map-container::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(128,189,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(128,189,255,0.04) 1px, transparent 1px); background-size: 30px 30px; pointer-events: none; }
        .om-map-container::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%); pointer-events: none; }
        .om-map-origin { position: absolute; width: 8px; height: 8px; background: #80bdff; border-radius: 50%; z-index: 5; box-shadow: 0 0 8px #80bdff, 0 0 16px rgba(128,189,255,0.4); }
        .om-map-origin::after { content: ''; position: absolute; inset: -4px; border: 1px solid rgba(128,189,255,0.3); border-radius: 50%; animation: ping 2s cubic-bezier(0,0,0.2,1) infinite; }
        @keyframes ping { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(3); opacity: 0; } }
        .om-map-dest { position: absolute; width: 10px; height: 10px; background: #ff4d6a; border-radius: 50%; z-index: 5; box-shadow: 0 0 8px #ff4d6a; cursor: pointer; animation: destPulse 2s infinite; }
        @keyframes destPulse { 0%, 100% { box-shadow: 0 0 8px #ff4d6a; } 50% { box-shadow: 0 0 16px #ff4d6a, 0 0 24px rgba(255,77,106,0.3); } }
        .om-map-dest.selected { background: #ffd700; box-shadow: 0 0 12px #ffd700; animation: none; }
        .om-map-label { position: absolute; font-size: 8px; font-weight: 800; letter-spacing: 1px; z-index: 6; text-shadow: 0 0 8px rgba(0,0,0,0.8); }
        .om-map-loc-badge { position: absolute; bottom: 0; left: 0; right: 0; padding: 6px 12px; background: linear-gradient(transparent, rgba(6,14,26,0.95)); font-size: 10px; z-index: 10; display: flex; align-items: center; gap: 6px; }
        .om-map-line { position: absolute; height: 2px; background: rgba(128,189,255,0.3); transform-origin: left center; z-index: 1; pointer-events: none; }
      `}</style>

            <div style={{ padding: "15px 15px 80px 15px" }}>
                {/* Header Stats */}
                {viewMode !== "ANALYZE" && !(viewMode === "PROFILE" && profileTab === "GALERIA") && (
                    <div className="om-top">
                        <Panel>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: 2 }}>MISSÃO ATIVA</div>
                                <div style={{ fontSize: 10, opacity: 0.6 }}>📍 {run.localAtual.cidade} · {run.localAtual.pais}</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div className="om-title">{caseObj.titulo}</div>
                                <div style={{ textAlign: "right", display: "flex", gap: "15px", flexShrink: 0 }}>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 900 }}>${state.player.dinheiro}</div>
                                        <div style={{ fontSize: 10, opacity: 0.6 }}>SALDO</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 900 }}>{fmtHoras(run.tempoRestanteHoras)}</div>
                                        <div style={{ fontSize: 10, opacity: 0.6 }}>RESTANTES</div>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                    </div>
                )}

                {/* CARD 1: Imagem do que foi roubado OU Cena de Interrogatório OU Mapa */}
                {viewMode !== "ANALYZE" && !(viewMode === "PROFILE" && profileTab === "GALERIA") && (
                    <div className="om-card">
                        <div className="om-img-card">
                            {viewMode === "DIALOGUE" && selectedLocal ? (
                                <div className="om-scene-box">
                                    <img src={selectedLocal.imgLocal} className="om-scene-bg" alt="Local" />
                                    <img src={selectedLocal.imgPersonagem} className="om-scene-char" alt="Personagem" />
                                </div>
                            ) : activeVideo && (showSuspectVideo || viewMode === "ARRIVAL") ? (
                                <video
                                    key={activeVideo}
                                    src={activeVideo}
                                    autoPlay
                                    loop={false}
                                    onEnded={() => {
                                        // Usa ref para ler o status mais recente (evita stale closure)
                                        const currentStatus = runStatusRef.current;

                                        if (currentStatus === "WON" || currentStatus === "LOST") {
                                            // Navega imediatamente para a tela de conclusão
                                            nav(`/caso-solucionado/${caseId}`);
                                            return;
                                        }

                                        setVideoEnded(true);
                                        setTimeout(() => {
                                            setShowSuspectVideo(false);
                                            setActiveVideo(null);
                                            setViewMode("ACTIONS");
                                            setSelectedDest(null);
                                            setVideoEnded(false);
                                        }, 300);
                                    }}
                                    playsInline
                                    style={{ width: "100%", height: "220px", objectFit: "cover" }}
                                />
                            ) : (viewMode === "TRAVEL_MAP" || viewMode === "TRAVEL_MODES") ? (
                                <div className="om-map-container">
                                    {/* Origem — ponto azul dinâmico */}
                                    {(() => {
                                        const oc = ORIGIN_COORDS[run.localAtual.cidade] || { x: 160, y: 120 }; return (<>
                                            <div className="om-map-origin" style={{ left: oc.x, top: oc.y }} />
                                            <div className="om-map-label" style={{ left: oc.x - 30, top: oc.y + 14, color: "#80bdff" }}>{run.localAtual.cidade.toUpperCase()}</div>
                                        </>);
                                    })()}

                                    {/* Destinos */}
                                    {DESTINATION_OPTIONS
                                        .filter(d => d.origem === run.localAtual.cidade)
                                        .map(d => (
                                            <React.Fragment key={d.id}>
                                                <div
                                                    className={`om-map-dest ${selectedDest && selectedDest.id === d.id ? "selected" : ""}`}
                                                    style={{ left: d.coords.x, top: d.coords.y, filter: selectedDest && selectedDest.id !== d.id ? "grayscale(1) opacity(0.25)" : "none" }}
                                                />
                                                {(!selectedDest || selectedDest.id === d.id) && (
                                                    <div className="om-map-label" style={{ left: d.coords.x - 15, top: d.coords.y + 14, color: selectedDest?.id === d.id ? "#ffd700" : "#fff" }}>
                                                        {d.cidade.toUpperCase()}
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        ))}

                                    {/* Location badge */}
                                    <div className="om-map-loc-badge">
                                        <span style={{ width: 6, height: 6, borderRadius: 3, background: "#4ade80", display: "inline-block", boxShadow: "0 0 6px #4ade80" }} />
                                        <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>LOCAL:</span>
                                        <span style={{ color: "#80bdff", fontWeight: 800 }}>{run.localAtual.cidade}</span>
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={currentCityImg}
                                    style={{ width: "100%", height: "220px", objectFit: "cover" }}
                                    alt="Cena"
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* DialogBox views — render directly, the balloon IS the card */}
                {viewMode === "RESUMO" && (() => {
                    const dias = Math.floor(run.tempoRestanteHoras / 24);
                    const horas = run.tempoRestanteHoras % 24;
                    const tempoStr = dias > 0 ? `${dias} dia${dias > 1 ? "s" : ""} e ${horas}h` : `${horas}h`;
                    return (
                        <DialogBox
                            title="MISSÃO ATIVA"
                            text={`Você ainda tem ${tempoStr} restantes para localizar e prender o Suspeito antes que o tempo se esgote.\n\n📍 Local Atual: ${run.localAtual.cidade} · ${run.localAtual.pais}`}
                            onComplete={() => setViewMode("ACTIONS")}
                        />
                    );
                })()}

                {viewMode === "DIALOGUE" && selectedLocal && (
                    <DialogBox
                        title={`${selectedLocal.personagem.toUpperCase()} DIZ:`}
                        text={selectedLocal.pista}
                        onComplete={() => setViewMode("ACTIONS")}
                    />
                )}

                {/* CARD 2: Menus/Interativos — ficam dentro do Panel */}
                {viewMode !== "ANALYZE" && viewMode !== "RESUMO" && viewMode !== "DIALOGUE" && (
                    <div className="om-card">
                        <Panel>
                            {viewMode === "ACTIONS" && (
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12, color: "#80bdff" }}>CENTRAL DE OPERAÇÕES</div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                        <button className="om-btn" onClick={() => setViewMode("TRAVEL_MAP")} disabled={!canAct}>✈️ VIAJAR</button>
                                        <button className="om-btn" onClick={abrirLocais} disabled={!canAct}>🔍 INVESTIGAR</button>
                                        <button className="om-btn" onClick={analisar} disabled={!canAct} style={{ gridColumn: "1 / -1" }}>🧪 ANALISAR</button>
                                    </div>

                                </div>
                            )}

                            {viewMode === "TRAVEL_MAP" && (
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12, color: "#80bdff" }}>ESCOLHER DESTINO</div>
                                    <div className="om-muted" style={{ marginBottom: 15 }}>Seu próximo destino para seguir a trilha:</div>
                                    <div style={{ display: "grid", gap: 10, maxHeight: 200, overflowY: "auto", paddingRight: 4 }}>
                                        {DESTINATION_OPTIONS
                                            .filter(d => d.origem === run.localAtual.cidade)
                                            .map(d => (
                                                <button
                                                    key={d.id}
                                                    className="om-btn"
                                                    style={{ textAlign: "left", paddingLeft: 15 }}
                                                    onClick={() => { setSelectedDest(d); setViewMode("TRAVEL_MODES"); }}
                                                >
                                                    {d.flag} {d.cidade}, <span style={{ opacity: 0.6 }}>{d.pais}</span>
                                                </button>
                                            ))}
                                        {run.localAtual.cidade !== "Campinas" && (
                                            <button
                                                className="om-btn"
                                                onClick={handleVoltar}
                                                style={{ marginTop: 10, border: "1px solid rgba(128,189,255,0.3)", background: "rgba(128,189,255,0.1)", color: "#80bdff" }}
                                            >
                                                ↩️ VOLTAR PARA CIDADE ANTERIOR
                                            </button>
                                        )}
                                    </div>
                                    <button onClick={() => setViewMode("ACTIONS")} className="om-btn" style={{ marginTop: 15, background: "transparent", border: "none", color: "#80bdff" }}>
                                        Cancelar
                                    </button>
                                </div>
                            )}

                            {viewMode === "TRAVEL_MODES" && selectedDest && (
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 4, color: "#80bdff" }}>VIAJAR PARA {selectedDest.cidade.toUpperCase()}</div>
                                    <div className="om-muted" style={{ marginBottom: 15 }}>Selecione o meio de transporte:</div>
                                    <div style={{ display: "grid", gap: 10 }}>
                                        {TRANSPORT_MODES.map(t => (
                                            <button
                                                key={t.id}
                                                className="om-btn"
                                                style={{ textAlign: "left", padding: "10px 15px", height: "auto" }}
                                                onClick={() => confirmarViagem(t)}
                                            >
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                        <span style={{ fontSize: 18 }}>{t.icon}</span>
                                                        <div>
                                                            <div style={{ fontSize: 13, fontWeight: 700 }}>{t.nome}</div>
                                                            <div style={{ fontSize: 10, opacity: 0.6 }}>{t.desc}</div>
                                                        </div>
                                                    </div>
                                                    <div style={{ textAlign: "right" }}>
                                                        <div style={{ fontSize: 12, color: "#ffd700", fontWeight: 700 }}>${t.custoBase}</div>
                                                        <div style={{ fontSize: 10, opacity: 0.6 }}>{t.horasBase}h</div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => { setViewMode("TRAVEL_MAP"); setSelectedDest(null); }} className="om-btn" style={{ marginTop: 15, background: "transparent", border: "none", color: "#80bdff" }}>
                                        Mudar Destino
                                    </button>
                                </div>
                            )}

                            {viewMode === "ARRIVAL" && (
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12, color: "#80bdff" }}>
                                        {run.status === "WON" ? "MISSÃO CONCLUÍDA" : run.status === "LOST" ? "MISSÃO FRACASSADA" : `VOCÊ CHEGOU EM ${selectedDest?.cidade.toUpperCase() || ""}`}
                                    </div>

                                    {run.status !== "IN_PROGRESS" ? (
                                        // Seção vazia: a navegação para CasoSolucionado acontece direto no onEnded do vídeo
                                        <div />
                                    ) : (
                                        <>
                                            {(showSuspectVideo || viewMode === "ARRIVAL") && activeVideo ? (
                                                <div style={{ marginTop: 12, textAlign: "center" }}>
                                                    <div style={{ fontSize: 13, fontWeight: 700, fontStyle: "italic", opacity: 0.9, marginBottom: 12, color: "#ffd700" }}>
                                                        "Sombra detectada: O Suspeito passou por aqui!"
                                                    </div>
                                                    {videoEnded && (
                                                        <button
                                                            onClick={() => { setViewMode("ACTIONS"); setSelectedDest(null); setShowSuspectVideo(false); setActiveVideo(null); setVideoEnded(false); }}
                                                            className="om-btn om-btn-primary"
                                                            style={{ marginTop: 10 }}
                                                        >
                                                            ENTENDIDO
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                <DialogBox
                                                    text={selectedDest?.desc || ""}
                                                    onComplete={() => { setViewMode("ACTIONS"); setSelectedDest(null); }}
                                                />
                                            )}
                                        </>
                                    )}
                                </div>
                            )}

                            {viewMode === "LOCATIONS" && (
                                <fieldset style={{
                                    border: "none",
                                    padding: "0",
                                    margin: 0
                                }}>
                                    <legend style={{
                                        fontSize: 13,
                                        fontWeight: 800,
                                        color: "#80bdff",
                                        padding: "0 8px"
                                    }}>PONTOS DE INVESTIGAÇÃO</legend>
                                    <div style={{ display: "grid", gap: 10 }}>
                                        {(caseObj.interrogatorios?.filter(loc => loc.cidade === run.localAtual.cidade).length > 0) ? (
                                            caseObj.interrogatorios
                                                ?.filter(loc => loc.cidade === run.localAtual.cidade)
                                                .map(loc => (
                                                    <button
                                                        key={loc.id}
                                                        className="om-btn"
                                                        style={{ textAlign: "left", paddingLeft: 15 }}
                                                        onClick={() => interrogarNoLocal(loc)}
                                                    >
                                                        🕵️‍♂️ Ir para <span style={{ fontWeight: 800 }}>{loc.local}</span>
                                                    </button>
                                                ))
                                        ) : (
                                            // Fallback NPCs para quando está no país errado
                                            <>
                                                {[
                                                    { id: "F1", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png" },
                                                    { id: "F2", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png" },
                                                    { id: "F3", local: "Casa de Shows", personagem: "Dançarina", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Dancarina.png" }
                                                ].map(loc => (
                                                    <button
                                                        key={loc.id}
                                                        className="om-btn"
                                                        style={{ textAlign: "left", paddingLeft: 15 }}
                                                        onClick={() => interrogarNoLocal({
                                                            ...loc,
                                                            pista: "Desculpe. Não Soube de Nenhum Suspeito por aqui."
                                                        })}
                                                    >
                                                        🕵️‍♂️ Ir para <span style={{ fontWeight: 800 }}>{loc.local}</span>
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                    <button onClick={() => setViewMode("ACTIONS")} className="om-btn" style={{ marginTop: 15, background: "transparent", border: "none", color: "#80bdff" }}>
                                        Cancelar
                                    </button>
                                </fieldset>
                            )}


                            {viewMode === "JOURNAL" && (
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12, color: "#80bdff" }}>JORNAL A.T.L.A.S.</div>
                                    <div className="om-journal-list">
                                        {run.jornal.slice().reverse().map((j, i) => (
                                            <div key={i} className="om-journal-item">
                                                <div style={{ opacity: 0.5, fontSize: 10 }}>{new Date(j.t).toLocaleString("pt-BR")}</div>
                                                <div style={{ marginTop: 4, fontSize: 13 }}>{j.msg}</div>
                                            </div>
                                        ))}
                                        {run.jornal.length === 0 && <div className="om-muted">Nenhum registro encontrado.</div>}
                                    </div>
                                </div>
                            )}

                            {viewMode === "PROFILE" && (
                                <div>
                                    {/* Sub-tabs: Perfil / Galeria */}
                                    <div style={{ display: "flex", gap: 8, marginBottom: 15 }}>
                                        {["PERFIL", "GALERIA"].map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setProfileTab(t)}
                                                style={{
                                                    flex: 1,
                                                    padding: "8px 0",
                                                    borderRadius: 10,
                                                    fontSize: 11,
                                                    fontWeight: 800,
                                                    letterSpacing: 0.5,
                                                    border: "1px solid",
                                                    borderColor: profileTab === t ? "#80bdff" : "rgba(255,255,255,0.12)",
                                                    background: profileTab === t ? "rgba(128,189,255,0.15)" : "transparent",
                                                    color: profileTab === t ? "#80bdff" : "rgba(255,255,255,0.5)",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {t === "PERFIL" ? "👤 PERFIL" : "🔍 GALERIA"}
                                            </button>
                                        ))}
                                    </div>

                                    {profileTab === "PERFIL" && (
                                        <>
                                            <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 15, color: "#80bdff" }}>PERFIL DO AGENTE</div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 20 }}>
                                                <div style={{ width: 64, height: 64, borderRadius: 32, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: "1px solid rgba(255,255,255,0.15)", overflow: "hidden" }}>
                                                    {state.player.avatarUrl ? (
                                                        <img src={state.player.avatarUrl} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} referrerPolicy="no-referrer" />
                                                    ) : "👤"}
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: 18, fontWeight: 800 }}>{state.player.nome}</div>
                                                    <Badge tone="blue">{state.player.nivelTitulo || "Recruta"}</Badge>
                                                    <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4 }}>Saldo: ${state.player.dinheiro} | XP: {state.player.xp}</div>
                                                </div>
                                            </div>
                                            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 15 }}>
                                                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>MISSÕES EM CURSO</div>
                                                <div style={{ padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <div style={{ fontSize: 13 }}>{caseObj.titulo}</div>
                                                    <Badge tone="green">Ativa</Badge>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {profileTab === "GALERIA" && (
                                        <SuspectGallery capturedSuspects={state.capturedSuspects || {}} />
                                    )}
                                </div>
                            )}
                        </Panel>
                    </div>
                )}

                {viewMode === "ANALYZE" && (
                    <Analisar
                        onBack={() => setViewMode("ACTIONS")}
                        filters={run.filtrosAnalise || {
                            sexo: [],
                            corCabelo: [],
                            corOlhos: [],
                            esporte: [],
                            comidaFavorita: [],
                            caracteristica: [],
                            origem: []
                        }}
                        setFilters={(nextFilters) => {
                            const nextVal = typeof nextFilters === 'function' ? nextFilters(run.filtrosAnalise) : nextFilters;
                            updateRun({ ...run, filtrosAnalise: nextVal });
                        }}
                        warrantId={run.warrantId}
                        setWarrantId={(id) => {
                            updateRun({ ...run, warrantId: id, mandadoEmitido: true });
                        }}
                    />
                )}
            </div>

            {/* Footer Navigation */}
            <div className="om-tabs">
                <div className="om-tabs-inner">
                    <button
                        className={`om-tab ${viewMode === "ACTIONS" || viewMode === "LOCATIONS" || viewMode.startsWith("TRAVEL") ? "om-tab-active" : ""}`}
                        onClick={() => setViewMode("ACTIONS")}
                    >
                        AÇÃO
                    </button>
                    <button
                        className={`om-tab ${viewMode === "JOURNAL" ? "om-tab-active" : ""}`}
                        onClick={() => setViewMode(viewMode === "JOURNAL" ? "ACTIONS" : "JOURNAL")}
                    >
                        JORNAL
                    </button>
                    <button
                        className={`om-tab ${viewMode === "PROFILE" ? "om-tab-active" : ""}`}
                        onClick={() => setViewMode(viewMode === "PROFILE" ? "ACTIONS" : "PROFILE")}
                    >
                        CASOS
                    </button>
                </div>
            </div>
        </div>
    );
}