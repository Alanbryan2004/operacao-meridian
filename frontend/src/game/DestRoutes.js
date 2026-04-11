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
    { id: "C6_42", pais: "Canadá", cidade: "Toronto", origem: "Thimphu", coords: { x: 101, y: 57 }, flag: "🇨🇦" },

    // Destinos Caso 7
    { id: "C7_1", pais: "Turquia", cidade: "Istambul", origem: "Lisboa", coords: { x: 221, y: 61 }, flag: "🇹🇷" },
    { id: "C7_2", pais: "Itália", cidade: "Roma", origem: "Lisboa", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C7_3", pais: "Espanha", cidade: "Madrid", origem: "Lisboa", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "C7_4", pais: "Brasil", cidade: "Rio de Janeiro", origem: "Lisboa", coords: { x: 147, y: 147 }, flag: "🇧🇷" },
    { id: "C7_5", pais: "França", cidade: "Paris", origem: "Lisboa", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "C7_6", pais: "Canadá", cidade: "Vancouver", origem: "Lisboa", coords: { x: 49, y: 55 }, flag: "🇨🇦" },
    { id: "C7_7", pais: "Egito", cidade: "Cairo", origem: "Lisboa", coords: { x: 224, y: 76 }, flag: "🇪🇬" },
    { id: "C7_8", pais: "Brasil", cidade: "São Paulo", origem: "Lisboa", coords: { x: 153, y: 150 }, flag: "🇧🇷" },
    
    { id: "C7_9", pais: "Emirados Árabes", cidade: "Dubai", origem: "Istambul", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "C7_10", pais: "Itália", cidade: "Roma", origem: "Istambul", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C7_11", pais: "Canadá", cidade: "Toronto", origem: "Istambul", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    
    { id: "C7_12", pais: "África do Sul", cidade: "Cidade do Cabo", origem: "Dubai", coords: { x: 209, y: 160 }, flag: "🇿🇦" },
    { id: "C7_13", pais: "Itália", cidade: "Roma", origem: "Dubai", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C7_14", pais: "Espanha", cidade: "Madrid", origem: "Dubai", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "C7_15", pais: "Portugal", cidade: "Lisboa", origem: "Dubai", coords: { x: 179, y: 64 }, flag: "🇵🇹" },

    { id: "C7_16", pais: "Argentina", cidade: "Buenos Aires", origem: "Cidade do Cabo", coords: { x: 124, y: 165 }, flag: "🇦🇷" },
    { id: "C7_17", pais: "Portugal", cidade: "Lisboa", origem: "Cidade do Cabo", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "C7_18", pais: "Itália", cidade: "Roma", origem: "Cidade do Cabo", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C7_19", pais: "Espanha", cidade: "Madrid", origem: "Cidade do Cabo", coords: { x: 185, y: 62 }, flag: "🇪🇸" },

    { id: "C7_20", pais: "África do Sul", cidade: "Cidade do Cabo", origem: "Rio de Janeiro", coords: { x: 209, y: 160 }, flag: "🇿🇦" },
    { id: "C7_21", pais: "Portugal", cidade: "Lisboa", origem: "Rio de Janeiro", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "C7_22", pais: "Canadá", cidade: "Toronto", origem: "Rio de Janeiro", coords: { x: 101, y: 57 }, flag: "🇨🇦" },

    { id: "C7_23", pais: "Japão", cidade: "Tóquio", origem: "Vancouver", coords: { x: 344, y: 68 }, flag: "🇯🇵" },
    { id: "C7_24", pais: "França", cidade: "Paris", origem: "Vancouver", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "C7_25", pais: "Itália", cidade: "Roma", origem: "Vancouver", coords: { x: 203, y: 59 }, flag: "🇮🇹" },

    { id: "C7_26", pais: "Singapura", cidade: "Singapura", origem: "Tóquio", coords: { x: 304, y: 111 }, flag: "🇸🇬" },
    { id: "C7_27", pais: "Itália", cidade: "Roma", origem: "Tóquio", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C7_28", pais: "Espanha", cidade: "Madrid", origem: "Tóquio", coords: { x: 185, y: 62 }, flag: "🇪🇸" },

    { id: "C7_29", pais: "Brasil", cidade: "Rio de Janeiro", origem: "Singapura", coords: { x: 147, y: 147 }, flag: "🇧🇷" },
    { id: "C7_30", pais: "Portugal", cidade: "Lisboa", origem: "Singapura", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "C7_31", pais: "Itália", cidade: "Roma", origem: "Singapura", coords: { x: 203, y: 59 }, flag: "🇮🇹" },

    { id: "C7_32", pais: "Emirados Árabes", cidade: "Dubai", origem: "Cairo", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "C7_33", pais: "Itália", cidade: "Roma", origem: "Cairo", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C7_34", pais: "Portugal", cidade: "Lisboa", origem: "Cairo", coords: { x: 179, y: 64 }, flag: "🇵🇹" },

    { id: "C7_35", pais: "México", cidade: "Cidade do México", origem: "São Paulo", coords: { x: 79, y: 90 }, flag: "🇲🇽" },
    { id: "C7_36", pais: "Portugal", cidade: "Lisboa", origem: "São Paulo", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "C7_37", pais: "Itália", cidade: "Roma", origem: "São Paulo", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C7_37b", pais: "França", cidade: "Paris", origem: "São Paulo", coords: { x: 192, y: 50 }, flag: "🇫🇷" },

    { id: "C7_38", pais: "Estados Unidos", cidade: "Nova York", origem: "Cidade do México", coords: { x: 107, y: 68 }, flag: "🇺🇸" },
    { id: "C7_39", pais: "Canadá", cidade: "Toronto", origem: "Cidade do México", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    { id: "C7_40", pais: "Espanha", cidade: "Madrid", origem: "Cidade do México", coords: { x: 185, y: 62 }, flag: "🇪🇸" },

    { id: "C7_41", pais: "Portugal", cidade: "Lisboa", origem: "Nova York", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "C7_42", pais: "Itália", cidade: "Roma", origem: "Nova York", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C7_43", pais: "Espanha", cidade: "Madrid", origem: "Nova York", coords: { x: 185, y: 62 }, flag: "🇪🇸" },

    // ============ CASO 8 — O Código que Não Existe ============
    // De Seul
    { id: "C8_1", pais: "China", cidade: "Pequim", origem: "Seul", coords: { x: 318, y: 62 }, flag: "🇨🇳" },
    { id: "C8_2", pais: "Tailândia", cidade: "Bangcoc", origem: "Seul", coords: { x: 301, y: 98 }, flag: "🇹🇭" },
    { id: "C8_3", pais: "Rússia", cidade: "Moscou", origem: "Seul", coords: { x: 231, y: 40 }, flag: "🇷🇺" },
    { id: "C8_4", pais: "Brasil", cidade: "São Paulo", origem: "Seul", coords: { x: 147, y: 145 }, flag: "🇧🇷" },
    { id: "C8_5", pais: "Espanha", cidade: "Madrid", origem: "Seul", coords: { x: 185, y: 62 }, flag: "🇪🇸" },

    // De Tóquio
    { id: "C8_6", pais: "Índia", cidade: "Mumbai", origem: "Tóquio", coords: { x: 270, y: 91 }, flag: "🇮🇳" },

    // De Singapura
    { id: "C8_7", pais: "Emirados Árabes", cidade: "Dubai", origem: "Singapura", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "C8_8", pais: "Espanha", cidade: "Madrid", origem: "Singapura", coords: { x: 185, y: 62 }, flag: "🇪🇸" },

    // De Dubai
    { id: "C8_9", pais: "França", cidade: "Paris", origem: "Dubai", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "C8_9b", pais: "Turquia", cidade: "Istambul", origem: "Dubai", coords: { x: 221, y: 61 }, flag: "🇹🇷" },

    // De Pequim
    { id: "C8_10", pais: "Índia", cidade: "Mumbai", origem: "Pequim", coords: { x: 270, y: 91 }, flag: "🇮🇳" },
    { id: "C8_11", pais: "Coreia do Sul", cidade: "Seul", origem: "Pequim", coords: { x: 330, y: 65 }, flag: "🇰🇷" },
    { id: "C8_12", pais: "Singapura", cidade: "Singapura", origem: "Pequim", coords: { x: 304, y: 115 }, flag: "🇸🇬" },

    // De Bangcoc
    { id: "C8_13", pais: "Índia", cidade: "Mumbai", origem: "Bangcoc", coords: { x: 270, y: 91 }, flag: "🇮🇳" },
    { id: "C8_14", pais: "Coreia do Sul", cidade: "Seul", origem: "Bangcoc", coords: { x: 330, y: 65 }, flag: "🇰🇷" },
    { id: "C8_15", pais: "Singapura", cidade: "Singapura", origem: "Bangcoc", coords: { x: 304, y: 115 }, flag: "🇸🇬" },

    // De Mumbai
    { id: "C8_16", pais: "Espanha", cidade: "Madrid", origem: "Mumbai", coords: { x: 185, y: 62 }, flag: "🇪🇸" },

    // De Moscou
    { id: "C8_17", pais: "Alemanha", cidade: "Berlim", origem: "Moscou", coords: { x: 204, y: 45 }, flag: "🇩🇪" },

    // De Berlim
    { id: "C8_18", pais: "Reino Unido", cidade: "Londres", origem: "Berlim", coords: { x: 189, y: 46 }, flag: "🇬🇧" },
    { id: "C8_19", pais: "Espanha", cidade: "Madrid", origem: "Berlim", coords: { x: 185, y: 62 }, flag: "🇪🇸" },

    // ============ CASO 9 — Protocolo Fantasma (COMPETITIVO) ============
    // Adicionando rotas específicas necessárias para as 10 etapas
    { id: "C9_1",  pais: "Índia", cidade: "Nova Delhi", origem: "Berlim", coords: { x: 275, y: 78 }, flag: "🇮🇳" },
    { id: "C9_2",  pais: "Brasil", cidade: "Rio de Janeiro", origem: "Berlim", coords: { x: 141, y: 149 }, flag: "🇧🇷" },
    { id: "C9_3",  pais: "China", cidade: "Pequim", origem: "Berlim", coords: { x: 318, y: 62 }, flag: "🇨🇳" },
    { id: "C9_4",  pais: "Tailândia", cidade: "Bangcoc", origem: "Berlim", coords: { x: 301, y: 98 }, flag: "🇹🇭" },
    { id: "C9_5",  pais: "Japão", cidade: "Tóquio", origem: "Berlim", coords: { x: 344, y: 68 }, flag: "🇯🇵" },
    
    { id: "C9_6",  pais: "Emirados Árabes", cidade: "Dubai", origem: "Nova Delhi", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "C9_7",  pais: "Índia", cidade: "Mumbai", origem: "Nova Delhi", coords: { x: 270, y: 91 }, flag: "🇮🇳" },
    { id: "C9_8",  pais: "Tailândia", cidade: "Bangcoc", origem: "Nova Delhi", coords: { x: 301, y: 98 }, flag: "🇹🇭" },
    
    { id: "C9_9",  pais: "Singapura", cidade: "Singapura", origem: "Mumbai", coords: { x: 304, y: 115 }, flag: "🇸🇬" },
    { id: "C9_10", pais: "Tailândia", cidade: "Bangcoc", origem: "Singapura", coords: { x: 301, y: 98 }, flag: "🇹🇭" },
    { id: "C9_11", pais: "Reino Unido", cidade: "Londres", origem: "Singapura", coords: { x: 189, y: 46 }, flag: "🇬🇧" },
    
    { id: "C9_12", pais: "Índia", cidade: "Mumbai", origem: "Bangcoc", coords: { x: 270, y: 91 }, flag: "🇮🇳" },
    { id: "C9_13", pais: "Singapura", cidade: "Singapura", origem: "Bangcoc", coords: { x: 304, y: 115 }, flag: "🇸🇬" },
    { id: "C9_14", pais: "Emirados Árabes", cidade: "Dubai", origem: "Bangcoc", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    
    { id: "C9_15", pais: "Líbia", cidade: "Trípoli", origem: "Madrid", coords: { x: 204, y: 72 }, flag: "🇱🇾" },
    { id: "C9_16", pais: "Portugal", cidade: "Lisboa", origem: "Madrid", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "C9_17", pais: "França", cidade: "Paris", origem: "Madrid", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    
    { id: "C9_18", pais: "Egito", cidade: "Cairo", origem: "Trípoli", coords: { x: 224, y: 76 }, flag: "🇪🇬" },
    { id: "C9_19", pais: "Portugal", cidade: "Lisboa", origem: "Trípoli", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "C9_20", pais: "Espanha", cidade: "Madrid", origem: "Trípoli", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    
    { id: "C9_21", pais: "Emirados Árabes", cidade: "Dubai", origem: "Cairo", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "C9_22", pais: "Líbia", cidade: "Trípoli", origem: "Cairo", coords: { x: 204, y: 72 }, flag: "🇱🇾" },
    { id: "C9_23", pais: "Turquia", cidade: "Istambul", origem: "Cairo", coords: { x: 221, y: 61 }, flag: "🇹🇷" },
    
    { id: "C9_24", pais: "Rússia", cidade: "Moscou", origem: "Rio de Janeiro", coords: { x: 231, y: 40 }, flag: "🇷🇺" },
    { id: "C9_25", pais: "Portugal", cidade: "Lisboa", origem: "Rio de Janeiro", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "C9_26", pais: "EUA", cidade: "Nova York", origem: "Rio de Janeiro", coords: { x: 107, y: 61 }, flag: "🇺🇸" },
    
    { id: "C9_27", pais: "Suíça", cidade: "Zurich", origem: "Viena", coords: { x: 198, y: 52 }, flag: "🇨🇭" },
    { id: "C9_28", pais: "Turquia", cidade: "Istambul", origem: "Toronto", coords: { x: 221, y: 61 }, flag: "🇹🇷" },
    { id: "C9_29", pais: "Coreia do Sul", cidade: "Seul", origem: "Tóquio", coords: { x: 330, y: 65 }, flag: "🇰🇷" },
    { id: "C9_30", pais: "Itália", cidade: "Roma", origem: "Amsterdã", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C9_31", pais: "Rússia", cidade: "Moscou", origem: "Istambul", coords: { x: 231, y: 40 }, flag: "🇷🇺" },
    { id: "C9_32", pais: "França", cidade: "Paris", origem: "Istambul", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "C9_33", pais: "Turquia", cidade: "Istambul", origem: "Viena", coords: { x: 221, y: 61 }, flag: "🇹🇷" },
    { id: "C9_34", pais: "Espanha", cidade: "Madrid", origem: "Toronto", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "C9_35", pais: "Emirados Árabes", cidade: "Dubai", origem: "Berlim", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "C9_36", pais: "Coreia do Sul", cidade: "Seul", origem: "Berlim", coords: { x: 330, y: 65 }, flag: "🇰🇷" },
    { id: "C9_37", pais: "Rússia", cidade: "Moscou", origem: "Berlim", coords: { x: 231, y: 40 }, flag: "🇷🇺" },
    { id: "C9_38", pais: "Áustria", cidade: "Viena", origem: "Roma", coords: { x: 215, y: 56 }, flag: "🇦🇹" },
    { id: "C9_39", pais: "Índia", cidade: "Mumbai", origem: "Viena", coords: { x: 270, y: 91 }, flag: "🇮🇳" },
    { id: "C9_40", pais: "Líbia", cidade: "Trípoli", origem: "Lisboa", coords: { x: 204, y: 72 }, flag: "🇱🇾" },
    { id: "C9_41", pais: "Portugal", cidade: "Lisboa", origem: "Istambul", coords: { x: 195, y: 65 }, flag: "🇵🇹" },
    { id: "C9_42", pais: "Índia", cidade: "Nova Delhi", origem: "Mumbai", coords: { x: 275, y: 80 }, flag: "🇮🇳" },
    { id: "C9_43", pais: "Holanda", cidade: "Amsterdã", origem: "Madrid", coords: { x: 205, y: 58 }, flag: "🇳🇱" },
    { id: "C9_44", pais: "China", cidade: "Pequim", origem: "Tóquio", coords: { x: 318, y: 62 }, flag: "🇨🇳" },
    { id: "C9_45", pais: "Egito", cidade: "Cairo", origem: "Dubai", coords: { x: 224, y: 76 }, flag: "🇪🇬" },
    { id: "C9_46", pais: "Espanha", cidade: "Madrid", origem: "Moscou", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "C9_47", pais: "Índia", cidade: "Mumbai", origem: "Singapura", coords: { x: 270, y: 91 }, flag: "🇮🇳" },
    { id: "C9_48", pais: "Tailândia", cidade: "Bangcoc", origem: "Tóquio", coords: { x: 301, y: 98 }, flag: "🇹🇭" },
    { id: "C9_49", pais: "Tailândia", cidade: "Bangcoc", origem: "Pequim", coords: { x: 301, y: 98 }, flag: "🇹🇭" },
    { id: "C9_50", pais: "China", cidade: "Pequim", origem: "Mumbai", coords: { x: 318, y: 62 }, flag: "🇨🇳" },

    // --- AUTO-GENERATED ROUTES FOR CASE 0 (TUTORIAL) ---
    { id: "C0_LON_PAR", pais: "França", cidade: "Paris", origem: "Londres", coords: { x: 180, y: 70 }, flag: "🇫🇷" },
    { id: "C0_LON_ROM", pais: "Itália", cidade: "Roma", origem: "Londres", coords: { x: 195, y: 80 }, flag: "🇮🇹" },
    { id: "C0_LON_MAD", pais: "Espanha", cidade: "Madrid", origem: "Londres", coords: { x: 175, y: 85 }, flag: "🇪🇸" },

    { id: "C0_PAR_TOQ", pais: "Japão", cidade: "Tóquio", origem: "Paris", coords: { x: 350, y: 55 }, flag: "🇯🇵" },
    { id: "C0_PAR_SEUL", pais: "Coréia do Sul", cidade: "Seul", origem: "Paris", coords: { x: 340, y: 56 }, flag: "🇰🇷" },
    { id: "C0_PAR_PEQ", pais: "China", cidade: "Pequim", origem: "Paris", coords: { x: 318, y: 62 }, flag: "🇨🇳" },

    { id: "C0_TOQ_SEUL", pais: "Coréia do Sul", cidade: "Seul", origem: "Tóquio", coords: { x: 340, y: 56 }, flag: "🇰🇷" },
    { id: "C0_TOQ_BAN", pais: "Tailândia", cidade: "Bangcoc", origem: "Tóquio", coords: { x: 310, y: 92 }, flag: "🇹🇭" },
    { id: "C0_TOQ_PEQ", pais: "China", cidade: "Pequim", origem: "Tóquio", coords: { x: 318, y: 62 }, flag: "🇨🇳" },

    // --- AUTO-GENERATED ROUTES FOR CASE 10 ---
    { id: "C10_PAR_VIE", pais: "Áustria", cidade: "Viena", origem: "Paris", coords: { x: 215, y: 56 }, flag: "🇦🇹" },
    { id: "C10_ROM_TOR", pais: "Canadá", cidade: "Toronto", origem: "Roma", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    { id: "C10_PAR_MUM", pais: "Índia", cidade: "Mumbai", origem: "Paris", coords: { x: 270, y: 91 }, flag: "🇮🇳" },
    { id: "C10_TR_VIE", pais: "Áustria", cidade: "Viena", origem: "Trípoli", coords: { x: 215, y: 56 }, flag: "🇦🇹" },
    { id: "C10_TR_PEQ", pais: "China", cidade: "Pequim", origem: "Trípoli", coords: { x: 318, y: 62 }, flag: "🇨🇳" },
    { id: "C10_MAD_TOR", pais: "Canadá", cidade: "Toronto", origem: "Madrid", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    { id: "C10_MAD_CAI", pais: "Egito", cidade: "Cairo", origem: "Madrid", coords: { x: 224, y: 76 }, flag: "🇪🇬" },
    { id: "C10_SO_LIS", pais: "Portugal", cidade: "Lisboa", origem: "São Paulo", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "C10_SO_VAN", pais: "Canadá", cidade: "Vancouver", origem: "São Paulo", coords: { x: 52, y: 49 }, flag: "🇨🇦" },
    { id: "C10_LIS_TOR", pais: "Canadá", cidade: "Toronto", origem: "Lisboa", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    { id: "C10_RIO_SEU", pais: "Coreia do Sul", cidade: "Seul", origem: "Rio de Janeiro", coords: { x: 330, y: 65 }, flag: "🇰🇷" },
    { id: "C10_ROM_VAN", pais: "Canadá", cidade: "Vancouver", origem: "Roma", coords: { x: 52, y: 49 }, flag: "🇨🇦" },
    { id: "C10_ROM_AMS", pais: "Holanda", cidade: "Amsterdã", origem: "Roma", coords: { x: 194, y: 45 }, flag: "🇳🇱" },
    { id: "C10_PAR_SYD", pais: "Austrália", cidade: "Sydney", origem: "Paris", coords: { x: 357, y: 164 }, flag: "🇦🇺" },
    { id: "C10_LON_SEU", pais: "Coreia do Sul", cidade: "Seul", origem: "Londres", coords: { x: 330, y: 65 }, flag: "🇰🇷" },
    { id: "C10_LON_BAN", pais: "Tailândia", cidade: "Bangcoc", origem: "Londres", coords: { x: 301, y: 98 }, flag: "🇹🇭" },
    { id: "C10_DUB_MUM", pais: "India", cidade: "Mumbai", origem: "Dubai", coords: { x: 270, y: 91 }, flag: "🇮🇳" },
    { id: "C10_MUM_BAN", pais: "Tailândia", cidade: "Bangcoc", origem: "Mumbai", coords: { x: 301, y: 98 }, flag: "🇹🇭" },
    { id: "C10_MUM_TQ", pais: "Japão", cidade: "Tóquio", origem: "Mumbai", coords: { x: 344, y: 68 }, flag: "🇯🇵" },
    { id: "C10_MUM_SEU", pais: "Coreia do Sul", cidade: "Seul", origem: "Mumbai", coords: { x: 330, y: 65 }, flag: "🇰🇷" },
    { id: "C10_MUM_IST", pais: "Turquia", cidade: "Istambul", origem: "Mumbai", coords: { x: 221, y: 61 }, flag: "🇹🇷" },
    { id: "C10_MUM_CAI", pais: "Egito", cidade: "Cairo", origem: "Mumbai", coords: { x: 224, y: 76 }, flag: "🇪🇬" },
    { id: "C10_BAN_PEQ", pais: "China", cidade: "Pequim", origem: "Bangcoc", coords: { x: 310, y: 60 }, flag: "🇨🇳" },
    { id: "C10_BAN_TQ", pais: "Japão", cidade: "Tóquio", origem: "Bangcoc", coords: { x: 344, y: 68 }, flag: "🇯🇵" },
    { id: "C10_PEQ_TQ", pais: "Japão", cidade: "Tóquio", origem: "Pequim", coords: { x: 344, y: 68 }, flag: "🇯🇵" },
    { id: "C10_PEQ_HON", pais: "China", cidade: "Hong Kong", origem: "Pequim", coords: { x: 315, y: 80 }, flag: "🇨🇳" },
    { id: "C10_SEU_MUM", pais: "India", cidade: "Mumbai", origem: "Seul", coords: { x: 270, y: 91 }, flag: "🇮🇳" },
    { id: "C10_TQ_TOR", pais: "Canadá", cidade: "Toronto", origem: "Tóquio", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    { id: "C10_TQ_NOV", pais: "Estados Unidos", cidade: "Nova York", origem: "Tóquio", coords: { x: 107, y: 61 }, flag: "🇺🇸" },
    { id: "C10_VAN_NOV", pais: "Estados Unidos", cidade: "Nova York", origem: "Vancouver", coords: { x: 107, y: 61 }, flag: "🇺🇸" },
    { id: "C10_VAN_TOR", pais: "Canadá", cidade: "Toronto", origem: "Vancouver", coords: { x: 101, y: 57 }, flag: "🇨🇦" },
    { id: "C10_ROM_BER", pais: "Alemanha", cidade: "Berlim", origem: "Roma", coords: { x: 204, y: 45 }, flag: "🇩🇪" },
    { id: "C10_ROM_SO", pais: "Brasil", cidade: "São Paulo", origem: "Roma", coords: { x: 140, y: 145 }, flag: "🇧🇷" },
    { id: "C10_ROM_RIO", pais: "Brasil", cidade: "Rio de Janeiro", origem: "Roma", coords: { x: 143, y: 143 }, flag: "🇧🇷" },
    { id: "C10_ROM_BUE", pais: "Argentina", cidade: "Buenos Aires", origem: "Roma", coords: { x: 124, y: 165 }, flag: "🇦🇷" },
    { id: "C10_CAI_PAR", pais: "França", cidade: "Paris", origem: "Cairo", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "C10_CAI_MAD", pais: "Espanha", cidade: "Madrid", origem: "Cairo", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "C10_IST_BER", pais: "Alemanha", cidade: "Berlim", origem: "Istambul", coords: { x: 204, y: 45 }, flag: "🇩🇪" },
    { id: "C10_PAR_TR", pais: "Líbia", cidade: "Trípoli", origem: "Paris", coords: { x: 208, y: 71 }, flag: "🇱🇾" },
    { id: "C10_PAR_DUB", pais: "Emirados Árabes", cidade: "Dubai", origem: "Paris", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "C10_PAR_VAN", pais: "Canada", cidade: "Vancouver", origem: "Paris", coords: { x: 52, y: 49 }, flag: "🇨🇦" },
    { id: "C10_PAR_BER", pais: "Alemanha", cidade: "Berlim", origem: "Paris", coords: { x: 204, y: 45 }, flag: "🇩🇪" },
    { id: "C10_TR_ROM", pais: "Itália", cidade: "Roma", origem: "Trípoli", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C10_MAD_SO", pais: "Brasil", cidade: "São Paulo", origem: "Madrid", coords: { x: 140, y: 145 }, flag: "🇧🇷" },
    { id: "C10_MAD_BUE", pais: "Argentina", cidade: "Buenos Aires", origem: "Madrid", coords: { x: 124, y: 165 }, flag: "🇦🇷" },
    { id: "C10_MAD_BER", pais: "Alemanha", cidade: "Berlim", origem: "Madrid", coords: { x: 204, y: 45 }, flag: "🇩🇪" },
    { id: "C10_SO_RIO", pais: "Brasil", cidade: "Rio de Janeiro", origem: "São Paulo", coords: { x: 143, y: 143 }, flag: "🇧🇷" },
    { id: "C10_SO_SAL", pais: "Brasil", cidade: "Salvador", origem: "São Paulo", coords: { x: 145, y: 130 }, flag: "🇧🇷" },
    { id: "C10_SO_BUE", pais: "Argentina", cidade: "Buenos Aires", origem: "São Paulo", coords: { x: 124, y: 165 }, flag: "🇦🇷" },
    { id: "C10_SO_DUB", pais: "Emirados Árabes", cidade: "Dubai", origem: "São Paulo", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "C10_SO_CAI", pais: "Egito", cidade: "Cairo", origem: "São Paulo", coords: { x: 224, y: 76 }, flag: "🇪🇬" },
    { id: "C10_SO_IST", pais: "Turquia", cidade: "Istambul", origem: "São Paulo", coords: { x: 221, y: 61 }, flag: "🇹🇷" },
    { id: "C10_RIO_BUE", pais: "Argentina", cidade: "Buenos Aires", origem: "Rio de Janeiro", coords: { x: 124, y: 165 }, flag: "🇦🇷" },
    { id: "C10_RIO_SO", pais: "Brasil", cidade: "São Paulo", origem: "Rio de Janeiro", coords: { x: 140, y: 145 }, flag: "🇧🇷" },
    { id: "C10_RIO_SAN", pais: "Chile", cidade: "Santiago", origem: "Rio de Janeiro", coords: { x: 110, y: 160 }, flag: "🇨🇱" },
    { id: "C10_BUE_MAD", pais: "Espanha", cidade: "Madrid", origem: "Buenos Aires", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "C10_BUE_LIS", pais: "Portugal", cidade: "Lisboa", origem: "Buenos Aires", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "C10_BUE_ROM", pais: "Itália", cidade: "Roma", origem: "Buenos Aires", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C10_BUE_SO", pais: "Brasil", cidade: "São Paulo", origem: "Buenos Aires", coords: { x: 140, y: 145 }, flag: "🇧🇷" },
    { id: "C10_BUE_RIO", pais: "Brasil", cidade: "Rio de Janeiro", origem: "Buenos Aires", coords: { x: 143, y: 143 }, flag: "🇧🇷" },
    { id: "C10_LIS_BUE", pais: "Argentina", cidade: "Buenos Aires", origem: "Lisboa", coords: { x: 124, y: 165 }, flag: "🇦🇷" },
    { id: "C10_LIS_ZUR", pais: "Suiça", cidade: "Zurich", origem: "Lisboa", coords: { x: 198, y: 53 }, flag: "🇨🇭" },
    { id: "C10_BER_AMS", pais: "Holanda", cidade: "Amsterdã", origem: "Berlim", coords: { x: 194, y: 45 }, flag: "🇳🇱" },
    { id: "C10_ZUR_DUB", pais: "Emirados Árabes", cidade: "Dubai", origem: "Zurich", coords: { x: 250, y: 82 }, flag: "🇦🇪" },
    { id: "C10_ZUR_IST", pais: "Turquia", cidade: "Istambul", origem: "Zurich", coords: { x: 221, y: 61 }, flag: "🇹🇷" },
    { id: "C10_ZUR_ROM", pais: "Itália", cidade: "Roma", origem: "Zurich", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "C10_ZUR_VIE", pais: "Austria", cidade: "Viena", origem: "Zurich", coords: { x: 207, y: 51 }, flag: "🇦🇹" },
    { id: "C10_ZUR_PAR", pais: "França", cidade: "Paris", origem: "Zurich", coords: { x: 192, y: 50 }, flag: "🇫🇷" },

    // ============ ROTAS PARA CIDADES PROCEDURAIS ============
    // De Barcelona
    { id: "BAR_FR", pais: "França", cidade: "Paris", origem: "Barcelona", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "BAR_ES", pais: "Espanha", cidade: "Madrid", origem: "Barcelona", coords: { x: 185, y: 62 }, flag: "🇪🇸" },
    { id: "BAR_IT", pais: "Itália", cidade: "Roma", origem: "Barcelona", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "BAR_PT", pais: "Portugal", cidade: "Lisboa", origem: "Barcelona", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "BAR_GB", pais: "Reino Unido", cidade: "Londres", origem: "Barcelona", coords: { x: 189, y: 46 }, flag: "🇬🇧" },
    { id: "BAR_DE", pais: "Alemanha", cidade: "Berlim", origem: "Barcelona", coords: { x: 204, y: 45 }, flag: "🇩🇪" },

    // Para Barcelona
    { id: "MAD_BAR", pais: "Espanha", cidade: "Barcelona", origem: "Madrid", coords: { x: 190, y: 60 }, flag: "🇪🇸" },
    { id: "PAR_BAR", pais: "Espanha", cidade: "Barcelona", origem: "Paris", coords: { x: 190, y: 60 }, flag: "🇪🇸" },
    { id: "ROM_BAR", pais: "Espanha", cidade: "Barcelona", origem: "Roma", coords: { x: 190, y: 60 }, flag: "🇪🇸" },
    { id: "LIS_BAR", pais: "Espanha", cidade: "Barcelona", origem: "Lisboa", coords: { x: 190, y: 60 }, flag: "🇪🇸" },

    // De Roterdã
    { id: "ROT_DE", pais: "Alemanha", cidade: "Berlim", origem: "Roterdã", coords: { x: 204, y: 45 }, flag: "🇩🇪" },
    { id: "ROT_GB", pais: "Reino Unido", cidade: "Londres", origem: "Roterdã", coords: { x: 189, y: 46 }, flag: "🇬🇧" },
    { id: "ROT_FR", pais: "França", cidade: "Paris", origem: "Roterdã", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "ROT_NL", pais: "Holanda", cidade: "Amsterdã", origem: "Roterdã", coords: { x: 194, y: 45 }, flag: "🇳🇱" },
    { id: "ROT_PT", pais: "Portugal", cidade: "Lisboa", origem: "Roterdã", coords: { x: 179, y: 64 }, flag: "🇵🇹" },
    { id: "ROT_ES", pais: "Espanha", cidade: "Madrid", origem: "Roterdã", coords: { x: 185, y: 62 }, flag: "🇪🇸" },

    // Para Roterdã
    { id: "AMS_ROT", pais: "Países Baixos", cidade: "Roterdã", origem: "Amsterdã", coords: { x: 192, y: 44 }, flag: "🇳🇱" },
    { id: "BER_ROT", pais: "Países Baixos", cidade: "Roterdã", origem: "Berlim", coords: { x: 192, y: 44 }, flag: "🇳🇱" },
    { id: "LON_ROT", pais: "Países Baixos", cidade: "Roterdã", origem: "Londres", coords: { x: 192, y: 44 }, flag: "🇳🇱" },
    { id: "PAR_ROT", pais: "Países Baixos", cidade: "Roterdã", origem: "Paris", coords: { x: 192, y: 44 }, flag: "🇳🇱" },

    // De Genebra
    { id: "GEN_FR", pais: "França", cidade: "Paris", origem: "Genebra", coords: { x: 192, y: 50 }, flag: "🇫🇷" },
    { id: "GEN_IT", pais: "Itália", cidade: "Roma", origem: "Genebra", coords: { x: 203, y: 59 }, flag: "🇮🇹" },
    { id: "GEN_DE", pais: "Alemanha", cidade: "Berlim", origem: "Genebra", coords: { x: 204, y: 45 }, flag: "🇩🇪" },
    { id: "GEN_GB", pais: "Reino Unido", cidade: "Londres", origem: "Genebra", coords: { x: 189, y: 46 }, flag: "🇬🇧" },
    { id: "GEN_AT", pais: "Áustria", cidade: "Viena", origem: "Genebra", coords: { x: 207, y: 51 }, flag: "🇦🇹" },
    { id: "GEN_CH", pais: "Suíça", cidade: "Zurich", origem: "Genebra", coords: { x: 198, y: 52 }, flag: "🇨🇭" },

    // Para Genebra
    { id: "PAR_GEN", pais: "Suíça", cidade: "Genebra", origem: "Paris", coords: { x: 196, y: 54 }, flag: "🇨🇭" },
    { id: "ROM_GEN", pais: "Suíça", cidade: "Genebra", origem: "Roma", coords: { x: 196, y: 54 }, flag: "🇨🇭" },
    { id: "ZUR_GEN", pais: "Suíça", cidade: "Genebra", origem: "Zurich", coords: { x: 196, y: 54 }, flag: "🇨🇭" },
    { id: "BER_GEN", pais: "Suíça", cidade: "Genebra", origem: "Berlim", coords: { x: 196, y: 54 }, flag: "🇨🇭" },
];
