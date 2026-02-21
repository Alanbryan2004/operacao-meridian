import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadGame } from "../game/store";
import AppShell, { BottomTabsMural } from "../components/AppShell";

function Pill({ children, kind = "gray" }) {
    const map = {
        gray: "bg-gray-100 text-gray-700",
        green: "bg-green-100 text-green-700",
        blue: "bg-blue-100 text-blue-700",
        purple: "bg-purple-100 text-purple-700",
        red: "bg-red-100 text-red-700",
    };
    return (
        <span className={`text-[11px] px-2 py-1 rounded-full ${map[kind] || map.gray}`}>
            {children}
        </span>
    );
}

function CaseCard({ c, onOpen }) {
    const diffKind = c.dificuldade === "FACIL" ? "green" : "blue";
    return (
        <button
            onClick={onOpen}
            className="w-full text-left bg-white rounded-2xl border shadow-sm p-3 active:scale-[0.99]"
        >
            <div className="flex items-start justify-between gap-2">
                <div>
                    <div className="text-[14px] font-semibold text-gray-900 leading-snug">
                        {c.titulo}
                    </div>
                    <div className="text-[12px] text-gray-600 mt-1">
                        Início: {c.localInicial.cidade} · {c.localInicial.pais}
                    </div>
                </div>
                <Pill kind={diffKind}>{c.dificuldade}</Pill>
            </div>

            <div className="mt-2 flex gap-2 flex-wrap">
                <Pill>💰 ${c.recompensa}</Pill>
                <Pill>🧠 XP {c.xp}</Pill>
                <Pill>⏳ {c.tempoTotalHoras}h</Pill>
            </div>
        </button>
    );
}

export default function Mural() {
    const nav = useNavigate();
    const [state, setState] = useState(null);

    useEffect(() => {
        setState(loadGame());
    }, []);

    if (!state) return null;

    const { player, cases } = state;

    return (
        <AppShell
            title="Operação Meridian"
            subtitle={`Agente: ${player.nome}`}
            rightTop={
                <div>
                    <div className="text-[11px] opacity-80">Dinheiro</div>
                    <div className="text-[15px] font-semibold">${player.dinheiro}</div>
                    <div className="mt-1 flex justify-end gap-2">
                        <Pill kind="purple">Nível {player.nivel}</Pill>
                        <Pill kind="blue">XP {player.xp}</Pill>
                    </div>
                </div>
            }
            bottomTabs={<BottomTabsMural />}
        >
            <div className="bg-white rounded-2xl border shadow-sm p-3">
                <div className="text-[13px] font-semibold text-gray-900">Mural de Casos</div>
                <div className="text-[12px] text-gray-600 mt-1">
                    Escolha um caso. O mundo se mexe quando você demora.
                </div>
            </div>

            <div className="mt-3 grid gap-2">
                {cases.map((c) => (
                    <CaseCard key={c.id} c={c} onOpen={() => nav(`/caso/${c.id}`)} />
                ))}
            </div>
        </AppShell>
    );
}