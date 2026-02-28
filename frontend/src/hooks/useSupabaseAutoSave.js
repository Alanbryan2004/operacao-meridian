import { useEffect, useRef } from "react";
import { saveGame } from "../game/store"; // localStorage
import { saveGameState } from "../services/gameSaveService";
import { supabase } from "../lib/supabase";

/**
 * Auto-save do jogo:
 * - Sempre salva no localStorage
 * - Se estiver logado e enabled=true, salva no Supabase (debounce)
 * - Só começa depois que hydrated=true (pra não sobrescrever o state inicial/seed)
 */
export function useSupabaseAutoSave(gameState, enabled = true, slot = 0, hydrated = true) {
    const tRef = useRef(null);
    const lastJsonRef = useRef("");

    useEffect(() => {
        if (!gameState) return;

        // Sempre salva local (mesmo sem login)
        try {
            saveGame(gameState);
        } catch (e) {
            console.warn("Falha ao salvar local:", e);
        }

        // Se ainda não hidratou, NÃO salva remoto nem marca lastJson
        if (!hydrated) return;
        if (!enabled) return;

        // Evita salvar repetido se não mudou
        const json = JSON.stringify(gameState);
        if (json === lastJsonRef.current) return;
        lastJsonRef.current = json;

        // Debounce Supabase
        if (tRef.current) clearTimeout(tRef.current);

        tRef.current = setTimeout(async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                await saveGameState(gameState, slot);
            } catch (e) {
                console.warn("Falha ao salvar no Supabase:", e?.message || e);
            }
        }, 900);

        return () => {
            if (tRef.current) clearTimeout(tRef.current);
        };
    }, [gameState, enabled, slot, hydrated]);

    // Flush quando sai/oculta
    useEffect(() => {
        const flush = async () => {
            try {
                if (!gameState) return;

                // local
                saveGame(gameState);

                // remoto (se puder)
                if (!hydrated || !enabled) return;
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                await saveGameState(gameState, slot);
            } catch {
                // silencioso
            }
        };

        const onVis = () => {
            if (document.visibilityState === "hidden") flush();
        };

        window.addEventListener("beforeunload", flush);
        document.addEventListener("visibilitychange", onVis);

        return () => {
            window.removeEventListener("beforeunload", flush);
            document.removeEventListener("visibilitychange", onVis);
        };
    }, [gameState, enabled, slot, hydrated]);
}