import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Splash() {
    const nav = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => {
            nav("/login");
        }, 2500); // 2.5 segundos de exibição

        return () => clearTimeout(t);
    }, [nav]);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6 text-center">
            <img
                src="/logo-meridian.png"
                alt="Operação Meridian"
                className="w-[40%] max-w-[260px] object-contain"
            />

            <div className="mt-6 text-[13px] opacity-70 tracking-wide">
                A.T.L.A.S. Strategic Intelligence Division
            </div>

            <div className="mt-4 text-[11px] opacity-40">
                Carregando sistema global...
            </div>
        </div>
    );
}