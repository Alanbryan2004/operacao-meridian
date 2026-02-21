// src/pages/Splash.jsx
import { useNavigate } from "react-router-dom";

export default function Splash() {
    const nav = useNavigate();

    return (
        <div className="meridian-fullscreen bg-black text-white flex items-center justify-center">
            <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center">
                {/* Logo centralizado e sempre cabendo na tela */}
                <img
                    src="/logo-meridian.png"
                    alt="Operação Meridian"
                    style={{
                        maxHeight: "52dvh",
                        maxWidth: "92vw",
                        height: "auto",
                        width: "auto",
                        display: "block",
                    }}
                />

                {/* Texto fixo */}
                <div className="mt-4 text-[13px] opacity-80 tracking-wide">
                    A.T.L.A.S. Strategic Intelligence Division
                </div>

                {/* Botão piscando */}
                <button
                    onClick={() => nav("/login")}
                    className="mt-10 px-7 py-2 border border-white/70 rounded-xl text-[13px] tracking-widest meridian-blink"
                >
                    ▸ INICIAR
                </button>
            </div>
        </div>
    );
}