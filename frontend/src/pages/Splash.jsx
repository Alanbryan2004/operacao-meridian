// src/pages/Splash.jsx
import { useNavigate } from "react-router-dom";

export default function Splash() {
    const nav = useNavigate();

    return (
        <div className="h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden text-white px-6 text-center">
            <img
                src="/logo-meridian.png"
                alt="Operação Meridian"
                style={{
                    maxHeight: "45vh",
                    maxWidth: "90vw",
                    height: "auto",
                    width: "auto",
                    display: "block",
                }}
            />

            <div className="mt-6 text-[13px] opacity-70 tracking-wide">
                A.T.L.A.S. Strategic Intelligence Division
            </div>

            <button
                onClick={() => nav("/login")}
                className="mt-10 px-6 py-2 border border-white/70 rounded-xl text-[13px] tracking-widest animate-pulse hover:bg-white hover:text-black transition"
            >
                ▸ INICIAR
            </button>
        </div>
    );
}