import { useEffect, useRef } from "react";
import { saveGameState } from "../services/gameSaveService";

export function useSupabaseAutoSave(gameState, enabled = true, slot = 0) {
    const t = useRef(null);

    useEffect(() => {
        if (!enabled) return;
        if (!gameState) return;

        clearTimeout(t.current);
        t.current = setTimeout(() => {
            saveGameState(gameState, slot).catch((e) => {
                console.error("Falha ao salvar no Supabase:", e);
            });
        }, 800);

        return () => clearTimeout(t.current);
    }, [gameState, enabled, slot]);
}
