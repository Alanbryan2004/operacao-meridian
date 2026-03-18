// Extracting routes to fix Vite Fast Refresh Error
export const DESTINATION_OPTIONS = [
    // De Campinas
    { id: "C_PT", pais: "Portugal", cidade: "Lisboa", origem: "Campinas", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "C_EG", pais: "Egito", cidade: "Cairo", origem: "Campinas", coords: { x: 224, y: 76 }, flag: "🇪🇬" },
    { id: "C_FR", pais: "França", cidade: "Paris", origem: "Campinas", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "C_JP", pais: "Japão", cidade: "Tóquio", origem: "Campinas", coords: { x: 344, y: 68 }, flag: "🇯🇵" },
    { id: "C_KR", pais: "Coreia do Sul", cidade: "Seul", origem: "Campinas", coords: { x: 330, y: 65 }, flag: "🇰🇷" },
    { id: "C_AR", pais: "Argentina", cidade: "Buenos Aires", origem: "Campinas", coords: { x: 124, y: 165 }, flag: "🇦🇷" },
    { id: "C_US", pais: "EUA", cidade: "Nova York", origem: "Campinas", coords: { x: 107, y: 61 }, flag: "🇺🇸" },
    { id: "C_IT", pais: "Itália", cidade: "Roma", origem: "Campinas", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C_CA", pais: "Canadá", cidade: "Toronto", origem: "Campinas", coords: { x: 101, y: 57 }, flag: "🇨🇦" },

    // De Lisboa
    { id: "L_FR", pais: "França", cidade: "Paris", origem: "Lisboa", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "L_GB", pais: "Reino Unido", cidade: "Londres", origem: "Lisboa", coords: { x: 189, y: 46 }, flag: "🇬🇧" },
    { id: "L_CA", pais: "Canadá", cidade: "Toronto", origem: "Lisboa", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    { id: "L_ES", pais: "Espanha", cidade: "Madrid", origem: "Lisboa", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "L_IT", pais: "Itália", cidade: "Roma", origem: "Lisboa", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "L_DE", pais: "Alemanha", cidade: "Berlim", origem: "Lisboa", coords: { x: 204, y: 45 }, flag: "🇩🇪" },

    // De Cairo
    { id: "CA_RU", pais: "Rússia", cidade: "Moscou", origem: "Cairo", coords: { x: 231, y: 40 }, flag: "🇷🇺" },
    { id: "CA_PT", pais: "Portugal", cidade: "Lisboa", origem: "Cairo", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "CA_CA", pais: "Canadá", cidade: "Toronto", origem: "Cairo", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    { id: "CA_MU", pais: "Índia", cidade: "Mumbai", origem: "Cairo", coords: { x: 270, y: 91 }, flag: "🇮🇳" },
    { id: "CA_AE", pais: "Emirados Árabes", cidade: "Dubai", origem: "Cairo", coords: { x: 250, y: 82 }, flag: "🇦🇪" },

    // De Moscou
    { id: "M_GB", pais: "Reino Unido", cidade: "Londres", origem: "Moscou", coords: { x: 189, y: 46 }, flag: "🇬🇧" },
    { id: "M_CA", pais: "Canadá", cidade: "Toronto", origem: "Moscou", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    { id: "M_FR", pais: "França", cidade: "Paris", origem: "Moscou", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "M_IT", pais: "Itália", cidade: "Roma", origem: "Moscou", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "M_US", pais: "EUA", cidade: "Nova York", origem: "Moscou", coords: { x: 107, y: 61 }, flag: "🇺🇸" },
    { id: "M_PT", pais: "Portugal", cidade: "Lisboa", origem: "Moscou", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "M_NL", pais: "Holanda", cidade: "Amsterdã", origem: "Moscou", coords: { x: 194, y: 45 }, flag: "🇳🇱" },
    { id: "M_EG", pais: "Egito", cidade: "Cairo", origem: "Moscou", coords: { x: 224, y: 76 }, flag: "🇪🇬" },

    // De Londres
    { id: "GB_AE", pais: "Emirados Árabes", cidade: "Dubai", origem: "Londres", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "GB_CA", pais: "Canadá", cidade: "Toronto", origem: "Londres", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    { id: "GB_EG", pais: "Egito", cidade: "Cairo", origem: "Londres", coords: { x: 224, y: 76 }, flag: "🇪🇬" },
    { id: "GB_IT", pais: "Itália", cidade: "Roma", origem: "Londres", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "GB_FR", pais: "França", cidade: "Paris", origem: "Londres", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "GB_RU", pais: "Rússia", cidade: "Moscou", origem: "Londres", coords: { x: 231, y: 40 }, flag: "🇷🇺" },
    { id: "GB_NL", pais: "Holanda", cidade: "Amsterdã", origem: "Londres", coords: { x: 194, y: 45 }, flag: "🇳🇱" },
    { id: "GB_AT", pais: "Áustria", cidade: "Viena", origem: "Londres", coords: { x: 207, y: 51 }, flag: "🇦🇹" },
    { id: "GB_ES", pais: "Espanha", cidade: "Madrid", origem: "Londres", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "GB_PT", pais: "Portugal", cidade: "Lisboa", origem: "Londres", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "GB_ZA", pais: "África do Sul", cidade: "Cidade do Cabo", origem: "Londres", coords: { x: 209, y: 164 }, flag: "🇿🇦" },

    // De Paris
    { id: "P_RU", pais: "Rússia", cidade: "Moscou", origem: "Paris", coords: { x: 231, y: 40 }, flag: "🇷🇺" },
    { id: "P_CA", pais: "Canadá", cidade: "Toronto", origem: "Paris", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    { id: "P_GB", pais: "Reino Unido", cidade: "Londres", origem: "Paris", coords: { x: 189, y: 46 }, flag: "🇬🇧" },
    { id: "P_IT", pais: "Itália", cidade: "Roma", origem: "Paris", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "P_PT", pais: "Portugal", cidade: "Lisboa", origem: "Paris", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "P_US", pais: "EUA", cidade: "Nova York", origem: "Paris", coords: { x: 107, y: 61 }, flag: "🇺🇸" },
    { id: "P_KR", pais: "Coreia do Sul", cidade: "Seul", origem: "Paris", coords: { x: 330, y: 65 }, flag: "🇰🇷" },
    { id: "P_AT", pais: "Áustria", cidade: "Viena", origem: "Paris", coords: { x: 207, y: 51 }, flag: "🇦🇹" },
    { id: "P_ES", pais: "Espanha", cidade: "Madrid", origem: "Paris", coords: { x: 185, y: 62 }, flag: "🇪🇸" },

    // De Toronto
    { id: "T_IT", pais: "Itália", cidade: "Roma", origem: "Toronto", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "T_EG", pais: "Egito", cidade: "Cairo", origem: "Toronto", coords: { x: 224, y: 76 }, flag: "🇪🇬" },
    { id: "T_JP", pais: "Japão", cidade: "Tóquio", origem: "Toronto", coords: { x: 344, y: 68 }, flag: "🇯🇵" },
    { id: "T_US", pais: "EUA", cidade: "Nova York", origem: "Toronto", coords: { x: 107, y: 61 }, flag: "🇺🇸" },
    { id: "T_FR", pais: "França", cidade: "Paris", origem: "Toronto", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "T_ZA", pais: "África do Sul", cidade: "Cidade do Cabo", origem: "Toronto", coords: { x: 209, y: 164 }, flag: "🇿🇦" },
    { id: "T_PT", pais: "Portugal", cidade: "Lisboa", origem: "Toronto", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "T_AT", pais: "Áustria", cidade: "Viena", origem: "Toronto", coords: { x: 207, y: 51 }, flag: "🇦🇹" },
    { id: "T_GB", pais: "Reino Unido", cidade: "Londres", origem: "Toronto", coords: { x: 189, y: 46 }, flag: "🇬🇧" },

    // De Roma
    { id: "R_CA", pais: "Canadá", cidade: "Toronto", origem: "Roma", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    { id: "R_AE", pais: "Emirados Árabes", cidade: "Dubai", origem: "Roma", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "R_ES", pais: "Espanha", cidade: "Madrid", origem: "Roma", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "R_EG", pais: "Egito", cidade: "Cairo", origem: "Roma", coords: { x: 224, y: 76 }, flag: "🇪🇬" },
    { id: "R_LI", pais: "Portugal", cidade: "Lisboa", origem: "Roma", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "R_RU", pais: "Rússia", cidade: "Moscou", origem: "Roma", coords: { x: 231, y: 40 }, flag: "🇷🇺" },
    { id: "R_GB", pais: "Reino Unido", cidade: "Londres", origem: "Roma", coords: { x: 189, y: 46 }, flag: "🇬🇧" },

    // De Tóquio
    { id: "TK_RU", pais: "Rússia", cidade: "Moscou", origem: "Tóquio", coords: { x: 231, y: 40 }, flag: "🇷🇺" },
    { id: "TK_GB", pais: "Reino Unido", cidade: "Londres", origem: "Tóquio", coords: { x: 189, y: 46 }, flag: "🇬🇧" },
    { id: "TK_IT", pais: "Itália", cidade: "Roma", origem: "Tóquio", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "TK_VA", pais: "Canadá", cidade: "Vancouver", origem: "Tóquio", coords: { x: 52, y: 49 }, flag: "🇨🇦" },
    { id: "TK_AE", pais: "Emirados Árabes", cidade: "Dubai", origem: "Tóquio", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "TK_DE", pais: "Alemanha", cidade: "Berlim", origem: "Tóquio", coords: { x: 204, y: 45 }, flag: "🇩🇪" },
    { id: "TK_ZA", pais: "África do Sul", cidade: "Cidade do Cabo", origem: "Tóquio", coords: { x: 209, y: 164 }, flag: "🇿🇦" },
    { id: "TK_FR", pais: "França", cidade: "Paris", origem: "Tóquio", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "TK_KR", pais: "Coreia do Sul", cidade: "Seul", origem: "Tóquio", coords: { x: 330, y: 65 }, flag: "🇰🇷" },

    // De Seul
    { id: "S_GB", pais: "Reino Unido", cidade: "Londres", origem: "Seul", coords: { x: 189, y: 46 }, flag: "🇬🇧" },
    { id: "S_PT", pais: "Portugal", cidade: "Lisboa", origem: "Seul", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "S_IT", pais: "Itália", cidade: "Roma", origem: "Seul", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "S_TK", pais: "Japão", cidade: "Tóquio", origem: "Seul", coords: { x: 344, y: 68 }, flag: "🇯🇵" },
    { id: "S_AE", pais: "Emirados Árabes", cidade: "Dubai", origem: "Seul", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "S_CA", pais: "Canadá", cidade: "Vancouver", origem: "Seul", coords: { x: 52, y: 49 }, flag: "🇨🇦" },
    { id: "S_FR", pais: "França", cidade: "Paris", origem: "Seul", coords: { x: 192, y: 50 }, flag: "🇫🇷" },

    // De Viena
    { id: "AT_PT", pais: "Portugal", cidade: "Lisboa", origem: "Viena", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "AT_RU", pais: "Rússia", cidade: "Moscou", origem: "Viena", coords: { x: 231, y: 40 }, flag: "🇷🇺" },
    { id: "AT_GB", pais: "Reino Unido", cidade: "Londres", origem: "Viena", coords: { x: 189, y: 46 }, flag: "🇬🇧" },
    { id: "AT_FR", pais: "França", cidade: "Paris", origem: "Viena", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "AT_DE", pais: "Alemanha", cidade: "Berlim", origem: "Viena", coords: { x: 204, y: 45 }, flag: "🇩🇪" },
    { id: "AT_IT", pais: "Itália", cidade: "Roma", origem: "Viena", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "AT_KR", pais: "Coreia do Sul", cidade: "Seul", origem: "Viena", coords: { x: 330, y: 65 }, flag: "🇰🇷" },
    { id: "AT_ZA", pais: "África do Sul", cidade: "Cidade do Cabo", origem: "Viena", coords: { x: 209, y: 164 }, flag: "🇿🇦" },
    { id: "AT_EG", pais: "Egito", cidade: "Cairo", origem: "Viena", coords: { x: 224, y: 76 }, flag: "🇪🇬" },
    { id: "AT_AE", pais: "Emirados Árabes", cidade: "Dubai", origem: "Viena", coords: { x: 250, y: 82 }, flag: "🇦🇪" },

    // De Mumbai
    { id: "MU_AT", pais: "Áustria", cidade: "Viena", origem: "Mumbai", coords: { x: 207, y: 51 }, flag: "🇦🇹" },
    { id: "MU_PT", pais: "Portugal", cidade: "Lisboa", origem: "Mumbai", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "MU_FR", pais: "França", cidade: "Paris", origem: "Mumbai", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "MU_AE", pais: "Emirados Árabes", cidade: "Dubai", origem: "Mumbai", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "MU_IT", pais: "Itália", cidade: "Roma", origem: "Mumbai", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "MU_CA", pais: "Canadá", cidade: "Toronto", origem: "Mumbai", coords: { x: 101, y: 57 }, flag: "🇨🇦" },

    // De Vancouver
    { id: "VA_PT", pais: "Portugal", cidade: "Lisboa", origem: "Vancouver", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "VA_AT", pais: "Áustria", cidade: "Viena", origem: "Vancouver", coords: { x: 207, y: 51 }, flag: "🇦🇹" },
    { id: "VA_FR", pais: "França", cidade: "Paris", origem: "Vancouver", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "VA_ZA", pais: "África do Sul", cidade: "Cidade do Cabo", origem: "Vancouver", coords: { x: 209, y: 164 }, flag: "🇿🇦" },
    { id: "VA_GB", pais: "Reino Unido", cidade: "Londres", origem: "Vancouver", coords: { x: 189, y: 46 }, flag: "🇬🇧" },

    // De Nova York
    { id: "US_EG", pais: "Egito", cidade: "Cairo", origem: "Nova York", coords: { x: 224, y: 76 }, flag: "🇪🇬" },
    { id: "US_FR", pais: "França", cidade: "Paris", origem: "Nova York", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "US_PT", pais: "Portugal", cidade: "Lisboa", origem: "Nova York", coords: { x: 179, y: 64 }, flag: "🇵🇹" },

    // De Cairo
    { id: "CA_IT", pais: "Itália", cidade: "Roma", origem: "Cairo", coords: { x: 203, y: 59 }, flag: "🇮🇹" },

    // De Roma (Scenario 3 - Loopback)
    { id: "R_FR", pais: "França", cidade: "Paris", origem: "Roma", coords: { x: 192, y: 50 }, flag: "🇫🇷" },

    // De Lisboa (Scenario 3)
    { id: "L_AT", pais: "Áustria", cidade: "Viena", origem: "Lisboa", coords: { x: 207, y: 51 }, flag: "🇦🇹" },
    { id: "L_EG", pais: "Egito", cidade: "Cairo", origem: "Lisboa", coords: { x: 224, y: 76 }, flag: "🇪🇬" },

    // De Seul (Scenario 4)
    { id: "S_SI", pais: "Singapura", cidade: "Singapura", origem: "Seul", coords: { x: 304, y: 115 }, flag: "🇸🇬" },

    // De Tóquio (Scenario 4)
    { id: "TK_SY", pais: "Austrália", cidade: "Sydney", origem: "Tóquio", coords: { x: 357, y: 164 }, flag: "🇦🇺" },

    // De Berlim
    { id: "DE_PT", pais: "Portugal", cidade: "Lisboa", origem: "Berlim", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "DE_TR", pais: "Turquia", cidade: "Istambul", origem: "Berlim", coords: { x: 221, y: 61 }, flag: "🇹🇷" },
    { id: "DE_AT", pais: "Áustria", cidade: "Viena", origem: "Berlim", coords: { x: 207, y: 51 }, flag: "🇦🇹" },
    { id: "DE_FR", pais: "França", cidade: "Paris", origem: "Berlim", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "DE_IT", pais: "Itália", cidade: "Roma", origem: "Berlim", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "DE_TK", pais: "Japão", cidade: "Tóquio", origem: "Berlim", coords: { x: 344, y: 68 }, flag: "🇯🇵" },

    // De Istambul
    { id: "TR_GB", pais: "Reino Unido", cidade: "Londres", origem: "Istambul", coords: { x: 189, y: 46 }, flag: "🇬🇧" },
    { id: "TR_ES", pais: "Espanha", cidade: "Madrid", origem: "Istambul", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "TR_IT", pais: "Itália", cidade: "Roma", origem: "Istambul", coords: { x: 203, y: 59 }, flag: "🇮🇹" },

    // De Cidade do Cabo
    { id: "ZA_TH", pais: "Tailândia", cidade: "Bangcoc", origem: "Cidade do Cabo", coords: { x: 301, y: 98 }, flag: "🇹🇭" },
    { id: "ZA_DE", pais: "Alemanha", cidade: "Berlim", origem: "Cidade do Cabo", coords: { x: 204, y: 45 }, flag: "🇩🇪" },
    { id: "ZA_ES", pais: "Espanha", cidade: "Madrid", origem: "Cidade do Cabo", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "ZA_PT", pais: "Portugal", cidade: "Lisboa", origem: "Cidade do Cabo", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "ZA_JP", pais: "Japão", cidade: "Tóquio", origem: "Cidade do Cabo", coords: { x: 344, y: 68 }, flag: "🇯🇵" },
    { id: "ZA_IT", pais: "Itália", cidade: "Roma", origem: "Cidade do Cabo", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "ZA_MU", pais: "Índia", cidade: "Mumbai", origem: "Cidade do Cabo", coords: { x: 270, y: 91 }, flag: "🇮🇳" },
    { id: "ZA_FR", pais: "França", cidade: "Paris", origem: "Cidade do Cabo", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "ZA_SG", pais: "Singapura", cidade: "Singapura", origem: "Cidade do Cabo", coords: { x: 304, y: 115 }, flag: "🇸🇬" },
    { id: "ZA_AE", pais: "Emirados Árabes", cidade: "Dubai", origem: "Cidade do Cabo", coords: { x: 250, y: 82 }, flag: "🇦🇪" },

    // De Bangcoc
    { id: "TH_CA", pais: "Canadá", cidade: "Vancouver", origem: "Bangcoc", coords: { x: 52, y: 49 }, flag: "🇨🇦" },
    { id: "TH_IT", pais: "Itália", cidade: "Roma", origem: "Bangcoc", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "TH_PT", pais: "Portugal", cidade: "Lisboa", origem: "Bangcoc", coords: { x: 179, y: 64 }, flag: "🇵🇹" },

    // De Amsterdã
    { id: "NL_DE", pais: "Alemanha", cidade: "Berlim", origem: "Amsterdã", coords: { x: 204, y: 45 }, flag: "🇩🇪" },
    { id: "NL_FR", pais: "França", cidade: "Paris", origem: "Amsterdã", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "NL_PT", pais: "Portugal", cidade: "Lisboa", origem: "Amsterdã", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "NL_ZA", pais: "África do Sul", cidade: "Cidade do Cabo", origem: "Amsterdã", coords: { x: 209, y: 164 }, flag: "🇿🇦" },
    { id: "NL_AT", pais: "Áustria", cidade: "Viena", origem: "Amsterdã", coords: { x: 207, y: 51 }, flag: "🇦🇹" },
    { id: "NL_GB", pais: "Reino Unido", cidade: "Londres", origem: "Amsterdã", coords: { x: 189, y: 46 }, flag: "🇬🇧" },

    // De Dubai
    { id: "D_GB", pais: "Reino Unido", cidade: "Londres", origem: "Dubai", coords: { x: 189, y: 46 }, flag: "🇬🇧" },
    { id: "D_ES", pais: "Espanha", cidade: "Madrid", origem: "Dubai", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "D_IT", pais: "Itália", cidade: "Roma", origem: "Dubai", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "D_ZA", pais: "África do Sul", cidade: "Cidade do Cabo", origem: "Dubai", coords: { x: 209, y: 164 }, flag: "🇿🇦" },

    // De Singapura
    { id: "SG_DE", pais: "Alemanha", cidade: "Berlim", origem: "Singapura", coords: { x: 204, y: 45 }, flag: "🇩🇪" },
    { id: "SG_PT", pais: "Portugal", cidade: "Lisboa", origem: "Singapura", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "SG_EG", pais: "Egito", cidade: "Cairo", origem: "Singapura", coords: { x: 224, y: 76 }, flag: "🇪🇬" },

    // Caso 5 Routes
    { id: "C5_1", pais: "Turquia", cidade: "Istambul", origem: "Cairo", coords: { x: 221, y: 61 }, flag: "🇹🇷" },
    { id: "C5_2", pais: "Alemanha", cidade: "Berlim", origem: "Cairo", coords: { x: 204, y: 45 }, flag: "🇩🇪" },
    
    { id: "C5_3", pais: "Emirados Árabes", cidade: "Dubai", origem: "Istambul", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "C5_4", pais: "Canadá", cidade: "Toronto", origem: "Istambul", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    
    { id: "C5_5", pais: "Líbia", cidade: "Trípoli", origem: "Dubai", coords: { x: 204, y: 72 }, flag: "🇱🇾" },
    { id: "C5_6", pais: "Portugal", cidade: "Lisboa", origem: "Dubai", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    
    { id: "C5_7", pais: "Canadá", cidade: "Toronto", origem: "Viena", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    { id: "C5_8", pais: "Espanha", cidade: "Madrid", origem: "Viena", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "C5_9", pais: "Turquia", cidade: "Istambul", origem: "Viena", coords: { x: 221, y: 61 }, flag: "🇹🇷" },
    
    { id: "C5_10", pais: "Egito", cidade: "Cairo", origem: "Paris", coords: { x: 224, y: 76 }, flag: "🇪🇬" },
    
    { id: "C5_11", pais: "México", cidade: "Cidade do México", origem: "Lisboa", coords: { x: 79, y: 90 }, flag: "🇲🇽" },
    { id: "C5_12", pais: "Rússia", cidade: "Moscou", origem: "Lisboa", coords: { x: 231, y: 40 }, flag: "🇷🇺" },
    { id: "C5_13", pais: "Holanda", cidade: "Amsterdã", origem: "Lisboa", coords: { x: 194, y: 45 }, flag: "🇳🇱" },
    
    { id: "C5_14", pais: "Japão", cidade: "Tóquio", origem: "Cidade do México", coords: { x: 344, y: 68 }, flag: "🇯🇵" },
    { id: "C5_15", pais: "Portugal", cidade: "Lisboa", origem: "Cidade do México", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "C5_16", pais: "Alemanha", cidade: "Berlim", origem: "Cidade do México", coords: { x: 204, y: 45 }, flag: "🇩🇪" },
    
    { id: "C5_17", pais: "Argentina", cidade: "Buenos Aires", origem: "Vancouver", coords: { x: 124, y: 165 }, flag: "🇦🇷" },
    { id: "C5_18", pais: "Espanha", cidade: "Madrid", origem: "Vancouver", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    
    { id: "C5_19", pais: "China", cidade: "Pequim", origem: "Moscou", coords: { x: 318, y: 62 }, flag: "🇨🇳" },
    
    { id: "C5_20", pais: "Itália", cidade: "Roma", origem: "Pequim", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C5_21", pais: "Portugal", cidade: "Lisboa", origem: "Pequim", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "C5_22", pais: "Turquia", cidade: "Istambul", origem: "Pequim", coords: { x: 221, y: 61 }, flag: "🇹🇷" },
    
    { id: "C5_23", pais: "Butão", cidade: "Thimphu", origem: "Amsterdã", coords: { x: 288, y: 79 }, flag: "🇧🇹" },
    
    { id: "C5_24", pais: "França", cidade: "Paris", origem: "Thimphu", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "C5_25", pais: "Itália", cidade: "Roma", origem: "Thimphu", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C5_26", pais: "Canadá", cidade: "Toronto", origem: "Thimphu", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    
    { id: "C5_27", pais: "Turquia", cidade: "Istambul", origem: "Paris", coords: { x: 221, y: 61 }, flag: "🇹🇷" },

    // Destinos Caso 6
    { id: "C6_1", pais: "França", cidade: "Paris", origem: "Viena", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "C6_2", pais: "Itália", cidade: "Roma", origem: "Viena", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C6_3", pais: "Espanha", cidade: "Madrid", origem: "Viena", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "C6_4", pais: "Reino Unido", cidade: "Londres", origem: "Viena", coords: { x: 189, y: 46 }, flag: "🇬🇧" },
    { id: "C6_5", pais: "Holanda", cidade: "Amsterdã", origem: "Viena", coords: { x: 194, y: 45 }, flag: "🇳🇱" },

    { id: "C6_6", pais: "Reino Unido", cidade: "Londres", origem: "Paris", coords: { x: 189, y: 46 }, flag: "🇬🇧" },
    { id: "C6_7", pais: "Itália", cidade: "Roma", origem: "Paris", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C6_8", pais: "Portugal", cidade: "Lisboa", origem: "Paris", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "C6_9", pais: "Turquia", cidade: "Istambul", origem: "Paris", coords: { x: 221, y: 61 }, flag: "🇹🇷" },
    { id: "C6_10", pais: "Espanha", cidade: "Madrid", origem: "Paris", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    
    { id: "C6_11", pais: "Itália", cidade: "Roma", origem: "Londres", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C6_12", pais: "França", cidade: "Paris", origem: "Londres", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "C6_13", pais: "Espanha", cidade: "Madrid", origem: "Londres", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "C6_14", pais: "Japão", cidade: "Tóquio", origem: "Londres", coords: { x: 344, y: 68 }, flag: "🇯🇵" },
    { id: "C6_15", pais: "Canadá", cidade: "Toronto", origem: "Londres", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    
    { id: "C6_16", pais: "Emirados Árabes", cidade: "Dubai", origem: "Roma", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "C6_17", pais: "Egito", cidade: "Cairo", origem: "Roma", coords: { x: 224, y: 76 }, flag: "🇪🇬" },
    { id: "C6_18", pais: "Espanha", cidade: "Madrid", origem: "Roma", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "C6_19", pais: "Turquia", cidade: "Istambul", origem: "Roma", coords: { x: 221, y: 61 }, flag: "🇹🇷" },
    { id: "C6_20", pais: "França", cidade: "Paris", origem: "Roma", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "C6_21", pais: "Canadá", cidade: "Toronto", origem: "Roma", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    
    { id: "C6_22", pais: "Brasil", cidade: "São Paulo", origem: "Dubai", coords: { x: 153, y: 150 }, flag: "🇧🇷" },
    { id: "C6_23", pais: "Portugal", cidade: "Lisboa", origem: "Dubai", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "C6_24", pais: "Espanha", cidade: "Madrid", origem: "Dubai", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    
    { id: "C6_25", pais: "Canadá", cidade: "Toronto", origem: "Madrid", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    { id: "C6_26", pais: "França", cidade: "Paris", origem: "Madrid", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "C6_27", pais: "Itália", cidade: "Roma", origem: "Madrid", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    
    { id: "C6_28", pais: "França", cidade: "Paris", origem: "Toronto", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "C6_29", pais: "Espanha", cidade: "Madrid", origem: "Toronto", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "C6_30", pais: "Itália", cidade: "Roma", origem: "Toronto", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    
    { id: "C6_31", pais: "Emirados Árabes", cidade: "Dubai", origem: "Istambul", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "C6_32", pais: "Itália", cidade: "Roma", origem: "Istambul", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C6_33", pais: "Espanha", cidade: "Madrid", origem: "Istambul", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    
    { id: "C6_34", pais: "Emirados Árabes", cidade: "Dubai", origem: "Tóquio", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "C6_35", pais: "Itália", cidade: "Roma", origem: "Tóquio", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C6_36", pais: "França", cidade: "Paris", origem: "Tóquio", coords: { x: 192, y: 50 }, flag: "🇫🇷" },

    { id: "C6_37", pais: "Butão", cidade: "Thimphu", origem: "Amsterdã", coords: { x: 288, y: 79 }, flag: "🇧🇹" },
    { id: "C6_38", pais: "França", cidade: "Paris", origem: "Amsterdã", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "C6_39", pais: "Itália", cidade: "Roma", origem: "Amsterdã", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    
    { id: "C6_40", pais: "França", cidade: "Paris", origem: "Thimphu", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "C6_41", pais: "Itália", cidade: "Roma", origem: "Thimphu", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C6_42", pais: "Canadá", cidade: "Toronto", origem: "Thimphu", coords: { x: 101, y: 57 }, flag: "🇨🇦" }
];
