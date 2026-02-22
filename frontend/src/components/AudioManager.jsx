import { useEffect, useRef, useState } from "react";

export default function AudioManager() {
    const audioRef = useRef(null);
    const clickAudioRef = useRef(null);
    const [enabled, setEnabled] = useState(() => {
        // Recupera estado salvo para manter música tocando entre recarregamentos se necessário
        return localStorage.getItem("meridian_music") === "1";
    });

    // volume padrão e preload do clique
    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = 0.35;

        clickAudioRef.current = new Audio("/audio/clique.mp3");
        clickAudioRef.current.volume = 0.5;
    }, []);

    // Ouvinte global para cliques em botões
    useEffect(() => {
        const handleClick = (e) => {
            const target = e.target.closest("button, .om-btn, select, a");
            if (target && clickAudioRef.current) {
                clickAudioRef.current.currentTime = 0;
                clickAudioRef.current.play().catch(err => console.warn("Erro ao tocar clique:", err));
            }
        };

        window.addEventListener("click", handleClick, true);
        return () => window.removeEventListener("click", handleClick, true);
    }, []);

    // Ouvinte para evento customizado (permite iniciar de outras telas)
    useEffect(() => {
        const handlePlay = (e) => {
            const shouldPlay = e.detail !== false; // default true
            setEnabled(shouldPlay);
            localStorage.setItem("meridian_music", shouldPlay ? "1" : "0");
        };

        window.addEventListener("meridian-play-audio", handlePlay);
        return () => window.removeEventListener("meridian-play-audio", handlePlay);
    }, []);

    // quando habilitar, toca
    useEffect(() => {
        const a = audioRef.current;
        if (!a) return;

        if (enabled) {
            a.play().catch((err) => {
                console.warn("Autoplay bloqueado pelo navegador. Aguardando interação.", err);
            });
        } else {
            a.pause();
        }
    }, [enabled]);

    return (
        <>
            <audio
                ref={audioRef}
                src="/audio/fundomusical.mp3"
                loop
                preload="auto"
            />
        </>
    );
}