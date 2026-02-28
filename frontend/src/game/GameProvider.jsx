import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { ensureProfile, loadGameState, saveGameState } from "../services/gameSaveService";
import { useSupabaseAutoSave } from "../hooks/useSupabaseAutoSave";
import { supabase } from "../lib/supabase";

// Action especial para substituir state inteiro
const REPLACE_STATE = "REPLACE_STATE";

const GameContext = createContext(null);

export function useGame() {
    const ctx = useContext(GameContext);
    if (!ctx) throw new Error("useGame must be used within GameProvider");
    return ctx;
}

/**
 * Você precisa passar:
 * - initialState: seu seed do jogo
 * - reducer: seu reducer (ou use um simples e vai evoluindo)
 */
export function GameProvider({ initialState, reducer, children }) {
    const [sessionReady, setSessionReady] = useState(false);

    const wrappedReducer = (state, action) => {
        if (action?.type === REPLACE_STATE) return action.payload;
        return reducer(state, action);
    };

    const [state, dispatch] = useReducer(wrappedReducer, initialState);

    // 1) Garante que a sessão Supabase está carregada
    useEffect(() => {
        let mounted = true;

        (async () => {
            const { data } = await supabase.auth.getSession();
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

    // 2) Ao ficar pronto e logado, tenta carregar save remoto e substituir state
    useEffect(() => {
        if (!sessionReady) return;

        (async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return; // não logado ainda

            // nickname: adapte se você tiver nome do jogador em algum lugar
            await ensureProfile(user.email || "");

            const remote = await loadGameState(0);

            if (remote) {
                dispatch({ type: REPLACE_STATE, payload: remote });
            } else {
                // Primeira vez: cria save com o state atual (seed)
                await saveGameState(state, 0);
            }
        })().catch((e) => console.error("Erro ao iniciar save do jogo:", e));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionReady]);

    // 3) Auto-save sempre que o state mudar (somente se estiver logado)
    const [canSave, setCanSave] = useState(false);
    useEffect(() => {
        if (!sessionReady) return;

        (async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setCanSave(!!user);
        })();
    }, [sessionReady]);

    useSupabaseAutoSave(state, canSave, 0);

    const value = useMemo(() => ({
        state,
        dispatch,
        replaceState: (next) => dispatch({ type: REPLACE_STATE, payload: next }),
    }), [state]);

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
