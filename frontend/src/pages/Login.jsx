import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadGame, saveGame, resetGame } from "../game/store";

export default function Login() {
    const nav = useNavigate();
    const [nome, setNome] = useState("Recruta");

    useEffect(() => {
        const s = loadGame();
        setNome(s.player.nome || "Recruta");
    }, []);

    function entrar() {
        const s = loadGame();
        const next = {
            ...s,
            player: { ...s.player, nome: (nome || "Recruta").trim() },
        };
        saveGame(next);
        nav("/mural");
    }

    function zerar() {
        resetGame();
        nav("/login");
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow p-4">
                <div className="text-center">
                    <div className="text-[12px] text-gray-500">A.T.L.A.S.</div>
                    <div className="text-xl font-semibold text-gray-900">Operação Meridian</div>
                    <div className="text-[13px] text-gray-600 mt-1">
                        Entre como recruta. O mundo está em movimento.
                    </div>
                </div>

                <div className="mt-4">
                    <label className="text-[12px] text-gray-600">Nome do Agente</label>
                    <input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="mt-1 w-full border rounded-lg px-3 py-2 text-[14px]"
                        placeholder="Seu nome"
                    />
                </div>

                <button
                    onClick={entrar}
                    className="mt-4 w-full rounded-lg bg-black text-white py-2 text-[14px]"
                >
                    Entrar
                </button>

                <button
                    onClick={zerar}
                    className="mt-2 w-full rounded-lg border py-2 text-[14px] text-gray-700"
                >
                    Resetar progresso (MVP)
                </button>
            </div>
        </div>
    );
}