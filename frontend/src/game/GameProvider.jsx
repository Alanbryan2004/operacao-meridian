import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { ensureProfile, loadGameState, saveGameState } from "../services/gameSaveService";
import { useSupabaseAutoSave } from "../hooks/useSupabaseAutoSave";
import { supabase } from "../lib/supabase";
import { loadGame } from "../game/store";

const REPLACE_STATE = "REPLACE_STATE";
const GameContext = createContext(null);

export function useGame() {
    const ctx = useContext(GameContext);
    if (!ctx) throw new Error("useGame must be used within GameProvider");
    return ctx;
}

export function GameProvider({ initialState, reducer, children }) {
    const [sessionReady, setSessionReady] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const [canSave, setCanSave] = useState(false);

    const wrappedReducer = (state, action) => {
        if (action?.type === REPLACE_STATE) return action.payload;
        return reducer(state, action);
    };

    // 🔥 Inicializa já puxando do localStorage (se existir)
    const [state, dispatch] = useReducer(
        wrappedReducer,
        initialState,
        (init) => {
            try {
                const local = loadGame(); // seu store já devolve seed caso não tenha nada
                return local || init;
            } catch {
                return init;
            }
        }
    );

    // 1) Garante que auth está carregada
    useEffect(() => {
        let mounted = true;

        (async () => {
            await supabase.auth.getSession();
            if (mounted) setSessionReady(true);
        })();

        const { data: sub } = supabase.auth.onAuthStateChange(() => {
            setSessionReady(true);
        });

        return () => {
            mounted = false;
            sub?.subscription?.unsubscribe?.();
        };
    }, []);

    // 2) Hidrata remoto (se logado). Se não tiver remoto, cria.
    useEffect(() => {
        if (!sessionReady) return;

        (async () => {
            const { data: { user } } = await supabase.auth.getUser();

            // não logado => já estamos ok com local
            if (!user) {
                setCanSave(false);
                setHydrated(true);
                return;
            }

            setCanSave(true);

            // garante profile
            await ensureProfile(user.email || "");

            // tenta remoto
            const remote = await loadGameState(0);

            if (remote) {
                dispatch({ type: REPLACE_STATE, payload: remote });
            } else {
                // primeira vez logado: cria remoto com o state atual (que já veio do local)
                await saveGameState(state, 0);
            }

            setHydrated(true);
        })().catch((e) => {
            console.error("Erro ao hidratar save do jogo:", e);
            setHydrated(true);
        });

        // IMPORTANTÍSSIMO: não coloca state nas deps aqui pra não entrar em loop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionReady]);

    // 3) Auto-save: sempre local. Remoto só se canSave e hydrated
    useSupabaseAutoSave(state, canSave, 0, hydrated);

    const value = useMemo(() => ({
        state,
        dispatch,
        replaceState: (next) => dispatch({ type: REPLACE_STATE, payload: next }),
        hydrated,
        canSave,
    }), [state, hydrated, canSave]);

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}