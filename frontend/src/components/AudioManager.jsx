import { useEffect, useRef, useState } from "react";

export default function AudioManager() {
    const audioRef = useRef(null);
    const [enabled, setEnabled] = useState(() => {
        // Recupera estado salvo para manter música tocando entre recarregamentos se necessário
        return localStorage.getItem("meridian_music") === "1";
    });

    // volume padrão
    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = 0.35;
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