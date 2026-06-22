import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { supabase } from "./lib/supabase";

// ── Android WebView Bridge ──────────────────────────────────────
// Quando o jogo roda dentro de um APK Android com WebView,
// o app nativo intercepta o clique de "Entrar com Google",
// faz a autenticação nativa do Android, e injeta o idToken aqui.
// O onAuthStateChange do Login.jsx cuida do resto automaticamente.
window.handleAndroidLogin = async (idToken) => {
    try {
        console.log("[Android Bridge] Token recebido, autenticando...");
        const { data, error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: idToken,
        });

        if (error) {
            console.error("[Android Bridge] Erro ao autenticar:", error.message);
            // Notifica o Android caso precise tratar o erro
            if (window.Android?.onLoginError) {
                window.Android.onLoginError(error.message);
            }
            return;
        }

        console.log("[Android Bridge] Login OK:", data.user?.email);
        // Notifica o Android que deu certo
        if (window.Android?.onLoginComplete) {
            window.Android.onLoginComplete(data.user?.email || "");
        }

        // Apenas recarrega a página se não estiver na tela de login, 
        // caso contrário o onAuthStateChange fará o trabalho sem recarregar e quebrar o estado.
        if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
            window.location.href = "/login";
        }
    } catch (err) {
        console.error("[Android Bridge] Exceção:", err);
        if (window.Android?.onLoginError) {
            window.Android.onLoginError(err.message || "Erro desconhecido");
        }
    }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);