// src/hooks/useSupabaseAutoSave.js
import { useEffect, useRef } from "react";
import { saveGame } from "../game/store";
import { saveGameState } from "../services/gameSaveService";

/**
 * Auto-save:
 * - sempre salva local (localStorage)
 * - se canSave = true, salva remoto (Supabase) com debounce + flush ao sair
 */
export function useSupabaseAutoSave(gameState, canSave = false, slot = 0, debounceMs = 800) {
    const tRef = useRef(null);
    const lastJsonRef = useRef("");
    const savingRef = useRef(false);

    // salva sempre que state mudar
    useEffect(() => {
        if (!gameState) return;

        // 1) local sempre
        try {
            saveGame(gameState);
        } catch (e) {
            console.warn("Falha ao salvar local:", e);
        }

        // evita salvar repetido se não mudou de verdade
        const json = JSON.stringify(gameState);
        if (json === lastJsonRef.current) return;
        lastJsonRef.current = json;

        // 2) remoto com debounce (se logado)
        if (!canSave) return;

        if (tRef.current) clearTimeout(tRef.current);

        tRef.current = setTimeout(async () => {
            if (savingRef.current) return;
            savingRef.current = true;

            try {
                await saveGameState(gameState, slot);
            } catch (e) {
                console.warn("Falha ao salvar no Supabase:", e?.message || e);
            } finally {
                savingRef.current = false;
            }
        }, debounceMs);

        return () => {
            if (tRef.current) clearTimeout(tRef.current);
        };
    }, [gameState, canSave, slot, debounceMs]);

    // flush quando usuário sai / troca aba / mobile minimiza
    useEffect(() => {
        if (!gameState) return;

        const flush = async () => {
            try {
                // local na marra
                saveGame(gameState);

                if (!canSave) return;

                // 2) salva state remoto (que também sincroniza profile internamente)
                await saveGameState(gameState, slot);
            } catch {
                // silencioso
            }
        };

        const onVis = () => {
            if (document.visibilityState === "hidden") flush();
        };

        // pagehide é bem importante no mobile
        window.addEventListener("pagehide", flush);
        window.addEventListener("beforeunload", flush);
        document.addEventListener("visibilitychange", onVis);

        return () => {
            window.removeEventListener("pagehide", flush);
            window.removeEventListener("beforeunload", flush);
            document.removeEventListener("visibilitychange", onVis);
        };
    }, [gameState, canSave, slot]);
}