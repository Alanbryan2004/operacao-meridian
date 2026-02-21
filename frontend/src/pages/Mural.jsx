import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadGame } from "../game/store";
import AppShell from "../components/AppShell";

function Badge({ children, kind = "gray" }) {
    const map = {
        gray: "bg-gray-100 text-gray-700",
        green: "bg-green-100 text-green-700",
        blue: "bg-blue-100 text-blue-700",
        red: "bg-red-100 text-red-700",
        purple: "bg-purple-100 text-purple-700",
    };
    return (
        <span className={`text-[11px] px-2 py-1 rounded-full ${map[kind] || map.gray}`}>
            {children}
        </span>
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
        <div className="min-h-screen p-3">
            <div className="bg-white rounded-xl shadow p-3 sticky top-0">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-[12px] text-gray-500">Agente</div>
                        <div className="text-[15px] font-semibold">{player.nome}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[12px] text-gray-500">Dinheiro</div>
                        <div className="text-[15px] font-semibold">${player.dinheiro}</div>
                    </div>
                </div>

                <div className="mt-2 flex gap-2 flex-wrap">
                    <Badge kind="blue">Nível {player.nivel}</Badge>
                    <Badge kind="green">XP {player.xp}</Badge>
                    <Badge kind="purple">Temporadas (em breve)</Badge>
                </div>
            </div>

            <div className="mt-3">
                <div className="text-[13px] text-gray-700 font-semibold">Mural de Casos</div>
                <div className="text-[12px] text-gray-500">Escolha um caso e comece a investigação.</div>

                <div className="mt-2 grid gap-2">
                    {cases.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => nav(`/caso/${c.id}`)}
                            className="text-left bg-white rounded-xl shadow p-3 active:scale-[0.99]"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <div className="text-[14px] font-semibold text-gray-900">{c.titulo}</div>
                                    <div className="text-[12px] text-gray-600 mt-1">
                                        Início: {c.localInicial.cidade} - {c.localInicial.pais}
                                    </div>
                                </div>
                                <Badge kind={c.dificuldade === "FACIL" ? "green" : "blue"}>{c.dificuldade}</Badge>
                            </div>

                            <div className="mt-2 flex gap-2 flex-wrap">
                                <Badge>Recompensa ${c.recompensa}</Badge>
                                <Badge>XP {c.xp}</Badge>
                                <Badge>Tempo {c.tempoTotalHoras}h</Badge>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}