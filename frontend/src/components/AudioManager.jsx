import { useEffect, useRef, useState } from "react";
import { useGame } from "../game/GameProvider";

export default function AudioManager() {
    const { state } = useGame();
    const audioRef = useRef(null);
    const clickAudioRef = useRef(null);

    const settings = state?.player?.settings || { musicEnabled: true, clickSoundEnabled: true };

    const [enabled, setEnabled] = useState(() => {
        // Fallback para localStorage por retrocompatibilidade se necessário, mas prioriza settings do state
        const savedMusic = localStorage.getItem("meridian_music");
        return savedMusic !== null ? savedMusic === "1" : settings.musicEnabled;
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
            if (!settings.clickSoundEnabled) return;
            
            const target = e.target.closest("button, .om-btn, select, a");
            if (target && clickAudioRef.current) {
                clickAudioRef.current.currentTime = 0;
                clickAudioRef.current.play().catch(err => console.warn("Erro ao tocar clique:", err));
            }
        };

        window.addEventListener("click", handleClick, true);
        return () => window.removeEventListener("click", handleClick, true);
    }, [settings.clickSoundEnabled, settings]);

    // Sincroniza com as configurações do estado global
    useEffect(() => {
        setEnabled(settings.musicEnabled);
    }, [settings.musicEnabled]);

    // Ouvinte para evento customizado (permite iniciar de outras telas)
    useEffect(() => {
        const handlePlay = (e) => {
            const shouldPlay = e.detail !== false; // default true
            // Disparamos um update no estado global via dispatch seria melhor,
            // mas mantemos o handlePlay para compatibilidade interna se houver outros disparos
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