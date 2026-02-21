import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-meridian.png"; // vamos colocar a imagem aqui

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
                src={logo}
                alt="Operação Meridian"
                className="w-[320px] max-w-full drop-shadow-2xl"
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