// src/game/Caso4Scenarios.js

export const CASO_4_SCENARIOS = [
    {
        id: "C004_S1",
        suspectId: "020", // Agulha Silenciosa (Yuri Tanaka)
        finalCity: "Cidade do Cabo",
        spottedAt: ["Tóquio", "Seul", "Vancouver", "Cidade do Cabo"],
        route: ["Cidade do Cabo", "Tóquio", "Seul", "Vancouver", "Cidade do Cabo"],
        travelTable: {
            "Cidade do Cabo": ["Lisboa", "Tóquio", "Roma"],
            "Tóquio": ["Seul", "Dubai", "Berlim"],
            "Seul": ["Vancouver", "Paris", "Roma"],
            "Vancouver": ["Cidade do Cabo", "Lisboa", "Londres"]
        },
        interrogatorios: [
            // ETAPA 1 — Cidade do Cabo
            { id: "S1_1", cidade: "Cidade do Cabo", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Essa pessoa passou por aqui logo após o roubo no museu. O que mais chamou atenção foi o cabelo preto. Perguntou sobre voos para uma cidade tecnológica da Ásia." },
            { id: "S1_2", cidade: "Cidade do Cabo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Estava olhando fotos de uma cidade japonesa cheia de luzes e prédios altos." },
            { id: "S1_3", cidade: "Cidade do Cabo", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Perguntou sobre o tempo de voo até uma grande cidade do Japão." },

            // ETAPA 2 — Tóquio
            { id: "S1_4", cidade: "Tóquio", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei essa pessoa ao aeroporto. Tinha olhos pretos e disse que viajaria para outra capital asiática." },
            { id: "S1_5", cidade: "Tóquio", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Perguntou sobre voos para uma cidade moderna da Coreia." },
            { id: "S1_6", cidade: "Tóquio", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Mencionou uma cidade famosa por tecnologia e música." },

            // ETAPA 3 — Seul
            { id: "S1_7", cidade: "Seul", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Essa pessoa comentou que pratica ginástica olímpica e disse que viajaria para uma cidade canadense." },
            { id: "S1_8", cidade: "Seul", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Falou sobre visitar uma cidade moderna da América do Norte." },
            { id: "S1_9", cidade: "Seul", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Mencionou uma cidade famosa por paisagens e tecnologia." },

            // ETAPA 4 — Vancouver
            { id: "S1_10", cidade: "Vancouver", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Era claramente um homem e disse que voltaria para a Cidade do Cabo." },
            { id: "S1_11", cidade: "Vancouver", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele perguntou sobre voos para a África do Sul." },
            { id: "S1_12", cidade: "Vancouver", local: "Hotel", personagem: "Camareira", imgLocal: "/NPC/Hotel.png", imgPersonagem: "/NPC/Camareira.png", pista: "Comentou sobre viajar para uma cidade costeira da África." },

            // ETAPA FINAL — Cidade do Cabo
            { id: "S1_13", cidade: "Cidade do Cabo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele esteve aqui no museu." },
            { id: "S1_14", cidade: "Cidade do Cabo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele passou por aqui hoje." },
            { id: "S1_15", cidade: "Cidade do Cabo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele até a região do museu." }
        ]
    },

    {
        id: "C004_S2",
        suspectId: "004", // Saffron Wisp (Amaya Desai)
        finalCity: "Cidade do Cabo",
        spottedAt: ["Mumbai", "Dubai", "Londres", "Cidade do Cabo"],
        route: ["Cidade do Cabo", "Mumbai", "Dubai", "Londres", "Cidade do Cabo"],
        travelTable: {
            "Cidade do Cabo": ["Lisboa", "Mumbai", "Berlim"],
            "Mumbai": ["Dubai", "Roma", "Toronto"],
            "Dubai": ["Londres", "Madrid", "Roma"],
            "Londres": ["Cidade do Cabo", "Lisboa", "Viena"]
        },
        interrogatorios: [
            // ETAPA 1 — Cidade do Cabo
            { id: "S2_1", cidade: "Cidade do Cabo", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Logo depois do roubo no museu, uma mulher passou por aqui perguntando sobre voos para uma grande cidade da Índia." },
            { id: "S2_2", cidade: "Cidade do Cabo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela estava vendo fotos de uma cidade enorme da Ásia cheia de movimento." },
            { id: "S2_3", cidade: "Cidade do Cabo", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Perguntou sobre o tempo de voo até uma metrópole indiana." },

            // ETAPA 2 — Mumbai
            { id: "S2_4", cidade: "Mumbai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Tinha olhos pretos e disse que viajaria para uma cidade luxuosa no deserto." },
            { id: "S2_5", cidade: "Mumbai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela perguntou sobre voos para uma cidade rica do Oriente Médio." },
            { id: "S2_6", cidade: "Mumbai", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Comentou sobre uma cidade cheia de arranha-céus no deserto." },

            // ETAPA 3 — Dubai
            { id: "S2_7", cidade: "Dubai", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ela comentou que pratica yoga e disse que viajaria para uma cidade muito famosa da Europa." },
            { id: "S2_8", cidade: "Dubai", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Falou sobre visitar uma capital europeia muito importante." },
            { id: "S2_9", cidade: "Dubai", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Mencionou uma cidade histórica da Europa." },

            // ETAPA 4 — Londres
            { id: "S2_10", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Tinha cabelo castanho e disse que voltaria para a Cidade do Cabo." },
            { id: "S2_11", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela perguntou sobre voos para a África do Sul." },
            { id: "S2_12", cidade: "Londres", local: "Hotel", personagem: "Camareira", imgLocal: "/NPC/Hotel.png", imgPersonagem: "/NPC/Camareira.png", pista: "Comentou sobre viajar para a Cidade do Cabo." },

            // ETAPA FINAL — Cidade do Cabo
            { id: "S2_13", cidade: "Cidade do Cabo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ela voltou ao museu hoje cedo." },
            { id: "S2_14", cidade: "Cidade do Cabo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela passou por aqui novamente." },
            { id: "S2_15", cidade: "Cidade do Cabo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela até a região do museu." }
        ]
    },

    {
        id: "C004_S3",
        suspectId: "003", // Brass Mantis (Matteo Sforza)
        finalCity: "Cidade do Cabo",
        spottedAt: ["Lisboa", "Roma", "Toronto", "Cidade do Cabo"],
        route: ["Cidade do Cabo", "Lisboa", "Roma", "Toronto", "Cidade do Cabo"],
        travelTable: {
            "Cidade do Cabo": ["Lisboa", "Roma", "Dubai"],
            "Lisboa": ["Roma", "Viena", "Berlim"],
            "Roma": ["Toronto", "Madrid", "Cairo"],
            "Toronto": ["Cidade do Cabo", "Paris", "Viena"]
        },
        interrogatorios: [
            // ETAPA 1 — Cidade do Cabo
            { id: "S3_1", cidade: "Cidade do Cabo", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Logo depois do roubo no museu, um homem passou por aqui perguntando sobre voos para uma cidade costeira da Europa." },
            { id: "S3_2", cidade: "Cidade do Cabo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele estava olhando fotos de uma cidade antiga perto do oceano." },
            { id: "S3_3", cidade: "Cidade do Cabo", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Perguntou sobre o tempo de voo até uma capital europeia." },

            // ETAPA 2 — Lisboa
            { id: "S3_4", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Tinha cabelo castanho e disse que viajaria para uma cidade cheia de ruínas antigas." },
            { id: "S3_5", cidade: "Lisboa", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele perguntou sobre voos para uma cidade muito histórica da Europa." },
            { id: "S3_6", cidade: "Lisboa", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Comentou sobre uma cidade famosa por sua história antiga." },

            // ETAPA 3 — Roma
            { id: "S3_7", cidade: "Roma", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele tinha olhos castanhos e disse que viajaria para uma cidade moderna da América do Norte." },
            { id: "S3_8", cidade: "Roma", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Falou sobre uma cidade canadense importante." },
            { id: "S3_9", cidade: "Roma", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Mencionou uma cidade famosa por seus arranha-céus." },

            // ETAPA 4 — Toronto
            { id: "S3_10", cidade: "Toronto", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Pelo sotaque dava para perceber que era europeu, não brasileiro." },
            { id: "S3_11", cidade: "Toronto", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele perguntou sobre voos para a África do Sul." },
            { id: "S3_12", cidade: "Toronto", local: "Hotel", personagem: "Camareira", imgLocal: "/NPC/Hotel.png", imgPersonagem: "/NPC/Camareira.png", pista: "Comentou que voltaria para a Cidade do Cabo." },

            // ETAPA FINAL — Cidade do Cabo
            { id: "S3_13", cidade: "Cidade do Cabo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele esteve novamente no museu." },
            { id: "S3_14", cidade: "Cidade do Cabo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele passou por aqui mais cedo." },
            { id: "S3_15", cidade: "Cidade do Cabo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele até o centro da cidade." }
        ]
    },

    {
        id: "C004_S4",
        suspectId: "005", // Blue Rook (Dimitri Volkov)
        finalCity: "Cidade do Cabo",
        spottedAt: ["Paris", "Moscou", "Amsterdã", "Cidade do Cabo"],
        route: ["Cidade do Cabo", "Paris", "Moscou", "Amsterdã", "Cidade do Cabo"],
        travelTable: {
            "Cidade do Cabo": ["Paris", "Roma", "Dubai"],
            "Paris": ["Moscou", "Lisboa", "Madrid"],
            "Moscou": ["Amsterdã", "Roma", "Cairo"],
            "Amsterdã": ["Cidade do Cabo", "Viena", "Londres"]
        },
        interrogatorios: [
            // ETAPA 1 — Cidade do Cabo
            { id: "S4_1", cidade: "Cidade do Cabo", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Logo depois do roubo no museu, alguém passou por aqui perguntando sobre voos para a França. O que mais chamou atenção foi o cabelo loiro." },
            { id: "S4_2", cidade: "Cidade do Cabo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Estava olhando fotos de uma cidade famosa por arte e museus." },
            { id: "S4_3", cidade: "Cidade do Cabo", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Perguntou sobre o tempo de voo até uma capital europeia." },

            // ETAPA 2 — Paris
            { id: "S4_4", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei essa pessoa ao aeroporto. Tinha olhos azuis e disse que viajaria para uma cidade muito fria." },
            { id: "S4_5", cidade: "Paris", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Perguntou sobre voos para uma capital do leste europeu." },
            { id: "S4_6", cidade: "Paris", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Comentou sobre uma cidade famosa pelo inverno." },

            // ETAPA 3 — Moscou
            { id: "S4_7", cidade: "Moscou", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Essa pessoa comentou que gosta muito de xadrez e disse que viajaria para uma cidade cheia de canais." },
            { id: "S4_8", cidade: "Moscou", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Falou sobre uma cidade europeia famosa por arte." },
            { id: "S4_9", cidade: "Moscou", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Mencionou uma cidade histórica da Europa." },

            // ETAPA 4 — Amsterdã
            { id: "S4_10", cidade: "Amsterdã", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Era claramente um homem e disse que voltaria para a Cidade do Cabo." },
            { id: "S4_11", cidade: "Amsterdã", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele perguntou sobre voos para a África do Sul." },
            { id: "S4_12", cidade: "Amsterdã", local: "Hotel", personagem: "Camareira", imgLocal: "/NPC/Hotel.png", imgPersonagem: "/NPC/Camareira.png", pista: "Comentou sobre viajar para a Cidade do Cabo." },

            // ETAPA FINAL — Cidade do Cabo
            { id: "S4_13", cidade: "Cidade do Cabo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele voltou ao museu." },
            { id: "S4_14", cidade: "Cidade do Cabo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele esteve aqui hoje." },
            { id: "S4_15", cidade: "Cidade do Cabo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele até a região do museu." }
        ]
    },

    {
        id: "C004_S5",
        suspectId: "011", // Sombra Digital (Rafael Ionescu)
        finalCity: "Cidade do Cabo",
        spottedAt: ["Singapura", "Berlim", "Tóquio", "Cidade do Cabo"],
        route: ["Cidade do Cabo", "Singapura", "Berlim", "Tóquio", "Cidade do Cabo"],
        travelTable: {
            "Cidade do Cabo": ["Roma", "Singapura", "Madrid"],
            "Singapura": ["Berlim", "Lisboa", "Cairo"],
            "Berlim": ["Tóquio", "Roma", "Viena"],
            "Tóquio": ["Cidade do Cabo", "Londres", "Paris"]
        },
        interrogatorios: [
            // ETAPA 1 — Cidade do Cabo
            { id: "S5_1", cidade: "Cidade do Cabo", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Logo depois do roubo no museu, um homem passou por aqui perguntando sobre voos para uma cidade asiática muito moderna." },
            { id: "S5_2", cidade: "Cidade do Cabo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele estava vendo fotos de uma cidade cheia de arranha-céus e portos." },
            { id: "S5_3", cidade: "Cidade do Cabo", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Perguntou sobre o tempo de voo até uma grande cidade da Ásia." },

            // ETAPA 2 — Singapura
            { id: "S5_4", cidade: "Singapura", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Tinha cabelo preto e disse que viajaria para uma capital europeia." },
            { id: "S5_5", cidade: "Singapura", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele perguntou sobre voos para uma cidade importante da Alemanha." },
            { id: "S5_6", cidade: "Singapura", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Comentou sobre uma cidade cheia de museus." },

            // ETAPA 3 — Berlim
            { id: "S5_7", cidade: "Berlim", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele tinha olhos verdes e disse que viajaria para uma grande cidade do Japão." },
            { id: "S5_8", cidade: "Berlim", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Falou sobre visitar uma cidade tecnológica da Ásia." },
            { id: "S5_9", cidade: "Berlim", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Mencionou uma cidade famosa por inovação." },

            // ETAPA 4 — Tóquio
            { id: "S5_10", cidade: "Tóquio", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Comentou que adora comida asiática e disse que voltaria para a Cidade do Cabo." },
            { id: "S5_11", cidade: "Tóquio", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele perguntou sobre voos para a África do Sul." },
            { id: "S5_12", cidade: "Tóquio", local: "Hotel", personagem: "Camareira", imgLocal: "/NPC/Hotel.png", imgPersonagem: "/NPC/Camareira.png", pista: "Comentou que retornaria para a Cidade do Cabo." },

            // ETAPA FINAL — Cidade do Cabo
            { id: "S5_13", cidade: "Cidade do Cabo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele voltou ao museu." },
            { id: "S5_14", cidade: "Cidade do Cabo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele passou por aqui hoje." },
            { id: "S5_15", cidade: "Cidade do Cabo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele até o museu de ciências." }
        ]
    }
];
