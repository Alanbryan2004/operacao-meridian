// src/game/Caso3Scenarios.js

export const CASO_3_SCENARIOS = [
    // Cenário 1 — Vanta Quill (001)
    {
        id: "C003_S1",
        suspectId: "001", // Vanta Quill
        finalCity: "Viena",
        spottedAt: ["Berlim", "Istambul", "Londres", "Viena"],
        route: ["Viena", "Berlim", "Istambul", "Londres", "Viena"],
        travelTable: {
            "Viena": ["Paris", "Berlim", "Roma"],
            "Berlim": ["Lisboa", "Istambul", "Viena"],
            "Istambul": ["Londres", "Madrid", "Roma"],
            "Londres": ["Viena", "Paris", "Lisboa"]
        },
        interrogatorios: [
            // ETAPA 1 — Viena
            { id: "S1_1", cidade: "Viena", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Essa pessoa perguntou sobre voos para uma cidade europeia cheia de museus. O que mais chamou atenção foi o cabelo platinado." },
            { id: "S1_2", cidade: "Viena", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Estava olhando fotos de uma cidade com muitos museus e arquitetura imponente." },
            { id: "S1_3", cidade: "Viena", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Perguntou sobre o tempo de voo até uma capital histórica da Europa." },

            // ETAPA 2 — Berlim
            { id: "S1_4", cidade: "Berlim", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei a pessoa ao aeroporto. Tinha olhos castanhos e mencionou viajar para uma cidade entre dois continentes." },
            { id: "S1_5", cidade: "Berlim", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falou sobre uma cidade histórica onde Europa e Ásia se encontram." },
            { id: "S1_6", cidade: "Berlim", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Mencionou uma cidade famosa por seus mercados antigos." },

            // ETAPA 3 — Istambul
            { id: "S1_7", cidade: "Istambul", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Essa pessoa comentou que gosta muito de xadrez e disse que viajaria para uma cidade famosa por suas bibliotecas." },
            { id: "S1_8", cidade: "Istambul", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Falou sobre visitar uma cidade europeia muito tradicional." },
            { id: "S1_9", cidade: "Istambul", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Mencionou uma cidade conhecida por suas coleções históricas." },

            // ETAPA 4 — Londres
            { id: "S1_10", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei a pessoa ao aeroporto. Comentou que viajaria para Viena… mas havia algo curioso: não consegui dizer se era homem ou mulher." },
            { id: "S1_11", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falou sobre viajar para uma capital cultural da Europa." },
            { id: "S1_12", cidade: "Londres", local: "Hotel", personagem: "Camareira", imgLocal: "/NPC/Hotel.png", imgPersonagem: "/NPC/Camareira.png", pista: "Comentou sobre uma cidade famosa por seus palácios e música." },

            // ETAPA FINAL — Viena
            { id: "S1_13", cidade: "Viena", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Sim… essa pessoa esteve aqui na biblioteca imperial." },
            { id: "S1_14", cidade: "Viena", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Vi essa pessoa passando pela praça." },
            { id: "S1_15", cidade: "Viena", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei até el centro histórico." }
        ]
    },
    // Cenário 2 — Echo Lark (002)
    {
        id: "C003_S2",
        suspectId: "002", // Echo Lark
        finalCity: "Viena",
        spottedAt: ["Seul", "Tóquio", "Vancouver", "Viena"],
        route: ["Viena", "Seul", "Tóquio", "Vancouver", "Viena"],
        travelTable: {
            "Viena": ["Paris", "Seul", "Roma"],
            "Seul": ["Londres", "Tóquio", "Dubai"],
            "Tóquio": ["Vancouver", "Roma", "Berlim"],
            "Vancouver": ["Viena", "Paris", "Lisboa"]
        },
        interrogatorios: [
            // ETAPA 1 — Viena
            { id: "S2_1", cidade: "Viena", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ela perguntou sobre voos para uma cidade asiática muito moderna. Era claramente uma mulher." },
            { id: "S2_2", cidade: "Viena", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela estava olhando fotos de uma cidade cheia de arranha-céus e luzes." },
            { id: "S2_3", cidade: "Viena", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Perguntou sobre o tempo de voo até uma grande cidade tecnológica da Ásia." },

            // ETAPA 2 — Seul
            { id: "S2_4", cidade: "Seul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Tinha cabelo preto e disse que viajaria para outra grande cidade asiática." },
            { id: "S2_5", cidade: "Seul", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela perguntou sobre voos para uma capital tecnológica da Ásia." },
            { id: "S2_6", cidade: "Seul", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Comentou sobre uma cidade muito movimentada do Japão." },

            // ETAPA 3 — Tóquio
            { id: "S2_7", cidade: "Tóquio", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ela tinha olhos pretos e comentou que viajaria para uma cidade costeira da América do Norte." },
            { id: "S2_8", cidade: "Tóquio", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Falou sobre uma cidade canadense muito moderna." },
            { id: "S2_9", cidade: "Tóquio", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Mencionou uma cidade do Canadá conhecida por suas paisagens." },

            // ETAPA 4 — Vancouver
            { id: "S2_10", cidade: "Vancouver", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Comentou que adora jogar tênis e que viajaria para uma cidade elegante da Europa." },
            { id: "S2_11", cidade: "Vancouver", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela perguntou sobre voos para uma capital cultural europeia." },
            { id: "S2_12", cidade: "Vancouver", local: "Hotel", personagem: "Camareira", imgLocal: "/NPC/Hotel.png", imgPersonagem: "/NPC/Camareira.png", pista: "Comentou sobre uma cidade cheia de música e palácios." },

            // ETAPA FINAL — Viena
            { id: "S2_13", cidade: "Viena", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Sim… ela esteve aqui procurando informações sobre manuscritos antigos." },
            { id: "S2_14", cidade: "Viena", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela passou por aqui hoje cedo." },
            { id: "S2_15", cidade: "Viena", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela até a biblioteca." }
        ]
    },
    // Cenário 3 — Brass Mantis (003)
    {
        id: "C003_S3",
        suspectId: "003", // Brass Mantis
        finalCity: "Viena",
        spottedAt: ["Berlim", "Roma", "Toronto", "Viena"],
        route: ["Viena", "Berlim", "Roma", "Toronto", "Viena"],
        travelTable: {
            "Viena": ["Paris", "Berlim", "Roma"],
            "Berlim": ["Roma", "Viena", "Paris"],
            "Roma": ["Toronto", "Dubai", "Madrid"],
            "Toronto": ["Viena", "Paris", "Londres"]
        },
        interrogatorios: [
            // ETAPA 1 — Viena
            { id: "S3_1", cidade: "Viena", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ele perguntou sobre voos para uma capital europeia moderna. Era claramente um homem." },
            { id: "S3_2", cidade: "Viena", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele estava vendo fotos de uma cidade famosa pelo seu Portão de Brandemburgo e história do século XX." },
            { id: "S3_3", cidade: "Viena", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Perguntou sobre o tempo de voo até a capital da Alemanha." },

            // ETAPA 2 — Berlim
            { id: "S3_4", cidade: "Berlim", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Tinha cabelo castanho e disse que viajaria para uma cidade cheia de história e ruínas romanas." },
            { id: "S3_5", cidade: "Berlim", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele perguntou sobre voos para a Cidade Eterna." },
            { id: "S3_6", cidade: "Berlim", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Comentou sobre visitar o Coliseu." },

            // ETAPA 3 — Roma
            { id: "S3_7", cidade: "Roma", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele tinha olhos castanhos e disse que viajaria para uma cidade moderna da América do Norte." },
            { id: "S3_8", cidade: "Roma", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Falou sobre uma cidade canadense importante." },
            { id: "S3_9", cidade: "Roma", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Mencionou uma cidade moderna do Canadá." },

            // ETAPA 4 — Toronto
            { id: "S3_10", cidade: "Toronto", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Pelo sotaque e pela forma de falar, parecia claramente europeu, não brasileiro." },
            { id: "S3_11", cidade: "Toronto", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele perguntou sobre voos para uma cidade cultural da Europa." },
            { id: "S3_12", cidade: "Toronto", local: "Hotel", personagem: "Camareira", imgLocal: "/NPC/Hotel.png", imgPersonagem: "/NPC/Camareira.png", pista: "Comentou sobre viajar para uma cidade famosa por música e palácios." },

            // ETAPA FINAL — Viena
            { id: "S3_13", cidade: "Viena", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Sim… ele esteve aqui pesquisando manuscritos antigos." },
            { id: "S3_14", cidade: "Viena", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele passou por aqui hoje." },
            { id: "S3_15", cidade: "Viena", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele até a biblioteca imperial." }
        ]
    },
    // Cenário 4 — Velvet Circuit (009)
    {
        id: "C003_S4",
        suspectId: "009", // Velvet Circuit
        finalCity: "Viena",
        spottedAt: ["Cidade do Cabo", "Bangcoc", "Vancouver", "Viena"],
        route: ["Viena", "Cidade do Cabo", "Bangcoc", "Vancouver", "Viena"],
        travelTable: {
            "Viena": ["Dubai", "Cidade do Cabo", "Roma"],
            "Cidade do Cabo": ["Bangcoc", "Berlim", "Madrid"],
            "Bangcoc": ["Vancouver", "Roma", "Lisboa"],
            "Vancouver": ["Viena", "Paris", "Lisboa"]
        },
        interrogatorios: [
            // ETAPA 1 — Viena
            { id: "S4_1", cidade: "Viena", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ela perguntou sobre voos para uma cidade costeira famosa na África. Era claramente uma mulher." },
            { id: "S4_2", cidade: "Viena", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela estava vendo fotos de uma cidade africana com montanhas próximas ao mar." },
            { id: "S4_3", cidade: "Viena", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Perguntou sobre o tempo de voo até uma cidade importante do sul da África." },

            // ETAPA 2 — Cidade do Cabo
            { id: "S4_4", cidade: "Cidade do Cabo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Tinha cabelo ruivo e disse que viajaria para uma cidade muito movimentada da Ásia." },
            { id: "S4_5", cidade: "Cidade do Cabo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela perguntou sobre voos para uma cidade africana famosa." },
            { id: "S4_6", cidade: "Cidade do Cabo", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Comentou sobre uma cidade cheia de mercados e templos." },

            // ETAPA 3 — Bangcoc
            { id: "S4_7", cidade: "Bangcoc", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ela comentou que gosta muito de skate e disse que viajaria para uma cidade moderna da América do Norte." },
            { id: "S4_8", cidade: "Bangcoc", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Falou sobre uma cidade canadense importante." },
            { id: "S4_9", cidade: "Bangcoc", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Mencionou uma cidade famosa por suas paisagens e tecnologia." },

            // ETAPA 4 — Vancouver
            { id: "S4_10", cidade: "Vancouver", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Tinha olhos verdes e disse que viajaria para uma cidade elegante da Europa." },
            { id: "S4_11", cidade: "Vancouver", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela perguntou sobre voos para uma capital cultural europeia." },
            { id: "S4_12", cidade: "Vancouver", local: "Hotel", personagem: "Camareira", imgLocal: "/NPC/Hotel.png", imgPersonagem: "/NPC/Camareira.png", pista: "Comentou sobre uma cidade cheia de palácios e música." },

            // ETAPA FINAL — Viena
            { id: "S4_13", cidade: "Viena", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Sim… ela esteve aqui pesquisando manuscritos antigos." },
            { id: "S4_14", cidade: "Viena", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela passou por aqui hoje." },
            { id: "S4_15", cidade: "Viena", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela até a biblioteca imperial." }
        ]
    },
    // Cenário 5 — Ivory Marrow (010)
    {
        id: "C003_S5",
        suspectId: "010", // Ivory Marrow
        finalCity: "Viena",
        spottedAt: ["Londres", "Amsterdã", "Berlim", "Viena"],
        route: ["Viena", "Londres", "Amsterdã", "Berlim", "Viena"],
        travelTable: {
            "Viena": ["Londres", "Roma", "Cairo"],
            "Londres": ["Amsterdã", "Viena", "Madrid"],
            "Amsterdã": ["Berlim", "Paris", "Lisboa"],
            "Berlim": ["Viena", "Paris", "Roma"]
        },
        interrogatorios: [
            // ETAPA 1 — Viena
            { id: "S5_1", cidade: "Viena", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ele perguntou sobre voos para uma cidade europeia famosa por suas universidades. Era claramente um homem." },
            { id: "S5_2", cidade: "Viena", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele estava olhando fotos de uma cidade histórica cheia de bibliotecas." },
            { id: "S5_3", cidade: "Viena", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Perguntou sobre o tempo de voo até uma capital intelectual da Europa." },

            // ETAPA 2 — Londres
            { id: "S5_4", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Tinha cabelo platinado e disse que viajaria para uma cidade europeia cheia de canais." },
            { id: "S5_5", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele perguntou sobre voos para uma cidade famosa por seus museus." },
            { id: "S5_6", cidade: "Londres", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Comentou sobre uma cidade cheia de canais e bicicletas." },

            // ETAPA 3 — Amsterdã
            { id: "S5_7", cidade: "Amsterdã", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele tinha olhos azuis e disse que viajaria para uma cidade europeia muito intelectual." },
            { id: "S5_8", cidade: "Amsterdã", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Falou sobre uma cidade conhecida por sua história acadêmica." },
            { id: "S5_9", cidade: "Amsterdã", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Mencionou uma cidade alemã cheia de museus." },

            // ETAPA 4 — Berlim
            { id: "S5_10", cidade: "Berlim", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Parecia um homem mais velho, perto dos 50 anos, e disse que viajaria para Viena." },
            { id: "S5_11", cidade: "Berlim", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele perguntou sobre voos para uma capital cultural da Europa." },
            { id: "S5_12", cidade: "Berlim", local: "Hotel", personagem: "Camareira", imgLocal: "/NPC/Hotel.png", imgPersonagem: "/NPC/Camareira.png", pista: "Comentou sobre viajar para uma cidade famosa por música clássica." },

            // ETAPA FINAL — Viena
            { id: "S5_13", cidade: "Viena", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Sim… ele esteve aqui pesquisando manuscritos raros." },
            { id: "S5_14", cidade: "Viena", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele passou por aqui hoje cedo." },
            { id: "S5_15", cidade: "Viena", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele até a biblioteca imperial." }
        ]
    }
];
