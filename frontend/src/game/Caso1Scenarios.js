// src/game/Caso1Scenarios.js

export const CASO_1_SCENARIOS = [
    // Cenário 1: Sand Helix (008)
    {
        id: "C001_S1",
        suspectId: "008", // Sand Helix
        finalCity: "Dubai",
        spottedAt: ["Cairo", "Moscou", "Londres", "Dubai"],
        route: ["Campinas", "Cairo", "Moscou", "Londres", "Dubai"],
        travelTable: {
            "Campinas": ["Paris", "Roma", "Cairo"],
            "Cairo": ["Lisboa", "Toronto", "Moscou"],
            "Moscou": ["Roma", "Paris", "Londres"],
            "Londres": ["Cairo", "Roma", "Dubai"]
        },
        interrogatorios: [
            { id: "S1_1", cidade: "Campinas", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ele perguntou sobre voos para um país com desertos e pirâmides. Era claramente um homem e parecia com pressa." },
            { id: "S1_2", cidade: "Campinas", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele estava vendo fotos de um país famoso por suas pirâmides e história antiga." },
            { id: "S1_3", cidade: "Campinas", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Ele perguntou sobre o voo até um país conhecido por seus desertos." },

            { id: "S1_4", cidade: "Cairo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Ele tinha cabelo preto e disse que iria para uma cidade muito fria." },
            { id: "S1_5", cidade: "Cairo", local: "Pescador", personagem: "Pescador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Pescador.png", pista: "Ele falou que seu próximo destino era uma cidade com inverno rigoroso." },
            { id: "S1_6", cidade: "Cairo", local: "Hospital", personagem: "Dançarina", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Dancarina.png", pista: "Ele mencionou uma cidade conhecida pelo frio intenso." },

            { id: "S1_7", cidade: "Moscou", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele esteve aqui e tinha olhos castanhos. Disse que viajaria para uma cidade histórica na Europa." },
            { id: "S1_8", cidade: "Moscou", local: "Hospital", personagem: "Camareira", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Camareira.png", pista: "Ele deixou um guia sobre uma cidade europeia tradicional." },
            { id: "S1_9", cidade: "Moscou", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele comentou sobre visitar uma cidade famosa por sua história." },

            { id: "S1_10", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Ele comentou que gostava muito de polo e que viajaria para uma cidade luxuosa no deserto." },
            { id: "S1_11", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele falou sobre viajar para uma cidade moderna no Oriente Médio." },
            { id: "S1_12", cidade: "Londres", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Ele mencionou uma cidade rica e moderna no deserto." },

            { id: "S1_13", cidade: "Dubai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele está aqui em Dubai. Era um homem de cabelo preto e olhos castanhos. Antes de sair, comentou que queria comer comida árabe." },
            { id: "S1_14", cidade: "Dubai", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele esteve aqui recentemente." },
            { id: "S1_15", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao centro." }
        ]
    },
    // Cenário 2: Ivory Marrow (010)
    {
        id: "C001_S2",
        suspectId: "010", // Ivory Marrow
        finalCity: "Londres",
        spottedAt: ["Paris", "Toronto", "Roma", "Londres"],
        route: ["Campinas", "Paris", "Toronto", "Roma", "Londres"],
        travelTable: {
            "Campinas": ["Roma", "Cairo", "Paris"],
            "Paris": ["Londres", "Lisboa", "Toronto"],
            "Toronto": ["Cairo", "Nova York", "Roma"],
            "Roma": ["Lisboa", "Moscou", "Londres"]
        },
        interrogatorios: [
            { id: "S2_1", cidade: "Campinas", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ele perguntou sobre voos para uma cidade famosa por sua arte e museus. Era claramente um homem e parecia muito calmo." },
            { id: "S2_2", cidade: "Campinas", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele estava vendo imagens de uma cidade europeia conhecida por sua torre famosa." },
            { id: "S2_3", cidade: "Campinas", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Ele perguntou sobre um voo para uma capital europeia muito conhecida." },

            { id: "S2_4", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Ele tinha cabelo platinado e disse que viajaria para uma cidade moderna na América do Norte." },
            { id: "S2_5", cidade: "Paris", local: "Camareira", personagem: "Camareira", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Camareira.png", pista: "Ele deixou um guia sobre uma grande cidade canadense." },
            { id: "S2_6", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele comentou sobre visitar uma cidade com muitos arranha-céus." },

            { id: "S2_7", cidade: "Toronto", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele esteve aqui hoje. Tinha olhos azuis e disse que viajaria para uma cidade antiga na Europa." },
            { id: "S2_8", cidade: "Toronto", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre visitar uma cidade cheia de ruínas históricas." },
            { id: "S2_9", cidade: "Toronto", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele mencionou uma cidade muito antiga e famosa." },

            { id: "S2_10", cidade: "Roma", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Ele comentou que gostava muito de jogar golfe. Disse que viajaria para uma cidade tradicional." },
            { id: "S2_11", cidade: "Roma", local: "Dançarina", personagem: "Dançarina", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Dancarina.png", pista: "Ele falou sobre viajar para uma cidade histórica na Europa." },
            { id: "S2_12", cidade: "Roma", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Ele mencionou uma cidade muito conhecida e importante." },

            { id: "S2_13", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele está aqui em Londres. Era um homem de cabelo platinado e olhos azuis. Antes de sair, comentou que queria comer grelhados." },
            { id: "S2_14", cidade: "Londres", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele esteve aqui há pouco." },
            { id: "S2_15", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao centro da cidade." }
        ]
    },
    // Cenário 3: Agulha Silenciosa (020)
    {
        id: "C001_S3",
        suspectId: "020", // Agulha Silenciosa
        finalCity: "Cairo",
        spottedAt: ["Tokio", "Moscou", "Toronto", "Cairo"],
        route: ["Campinas", "Tokio", "Moscou", "Toronto", "Cairo"],
        travelTable: {
            "Campinas": ["Paris", "Toronto", "Tokio"],
            "Tokio": ["Roma", "Londres", "Moscou"],
            "Moscou": ["Lisboa", "Paris", "Toronto"],
            "Toronto": ["Roma", "Nova York", "Cairo"]
        },
        interrogatorios: [
            { id: "S3_1", cidade: "Campinas", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ele perguntou sobre voos para uma cidade extremamente moderna na Ásia. Era claramente um homem e parecia muito focado." },
            { id: "S3_2", cidade: "Campinas", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele estava vendo fotos de uma cidade cheia de luzes e tecnologia." },
            { id: "S3_3", cidade: "Campinas", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Ele perguntou sobre o voo até uma grande metrópole asiática." },

            { id: "S3_4", cidade: "Tokio", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Ele tinha cabelo preto e disse que viajaria para uma cidade muito fria." },
            { id: "S3_5", cidade: "Tokio", local: "Camareira", personagem: "Camareira", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Camareira.png", pista: "Ele deixou um guia sobre uma cidade conhecida pelo inverno rigoroso." },
            { id: "S3_6", cidade: "Tokio", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele comentou sobre visitar uma cidade com temperaturas muito baixas." },

            { id: "S3_7", cidade: "Moscou", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele esteve aqui hoje. Tinha olhos pretos e disse que viajaria para uma cidade moderna na América do Norte." },
            { id: "S3_8", cidade: "Moscou", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre uma cidade com grandes prédios e muita organização." },
            { id: "S3_9", cidade: "Moscou", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele mencionou uma cidade importante do Canadá." },

            { id: "S3_10", cidade: "Toronto", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Ele comentou que treinava ginástica olímpica e que viajaria para um país com desertos e monumentos antigos." },
            { id: "S3_11", cidade: "Toronto", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele falou sobre viajar para um país histórico." },
            { id: "S3_12", cidade: "Toronto", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Ele mencionou um lugar com pirâmides." },

            { id: "S3_13", cidade: "Cairo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele está aqui no Cairo. Era um homem de cabelo preto e olhos pretos. Antes de sair, comentou que queria comer comida asiática." },
            { id: "S3_14", cidade: "Cairo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele esteve aqui recentemente." },
            { id: "S3_15", cidade: "Cairo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao centro da cidade." }
        ]
    },
    // Cenário 4: Vanta Quill (001)
    {
        id: "C001_S4",
        suspectId: "001", // Vanta Quill
        finalCity: "Toronto",
        spottedAt: ["Lisboa", "Paris", "Moscou", "Toronto"],
        route: ["Campinas", "Lisboa", "Paris", "Moscou", "Toronto"],
        travelTable: {
            "Campinas": ["Roma", "Cairo", "Lisboa"],
            "Lisboa": ["Londres", "Toronto", "Paris"],
            "Paris": ["Roma", "Toronto", "Moscou"],
            "Moscou": ["Londres", "Nova York", "Toronto"]
        },
        interrogatorios: [
            { id: "S4_1", cidade: "Campinas", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "A pessoa perguntou sobre voos para uma cidade europeia antiga perto do oceano. Comentou que jogava muito xadrez e viajaria para uma cidade moderna na América do Norte." },
            { id: "S4_2", cidade: "Campinas", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "A pessoa olhava fotos de uma cidade com ruas históricas e arquitetura antiga." },
            { id: "S4_3", cidade: "Campinas", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Perguntou sobre um voo para uma cidade europeia muito antiga." },

            { id: "S4_4", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei a pessoa ao aeroporto. Tinha cabelo platinado e disse que viajaria para uma cidade famosa por sua arte." },
            { id: "S4_5", cidade: "Lisboa", local: "Camareira", personagem: "Camareira", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Camareira.png", pista: "A pessoa deixou um guia sobre uma cidade com museus famosos." },
            { id: "S4_6", cidade: "Lisboa", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Comentou sobre visitar uma cidade conhecida mundialmente." },

            { id: "S4_7", cidade: "Paris", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "A pessoa esteve aqui hoje. Tinha olhos castanhos e disse que viajaria para uma cidade muito fria." },
            { id: "S4_8", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Comentou sobre viajar para uma cidade com inverno rigoroso." },
            { id: "S4_9", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Falou sobre uma cidade onde neva muito." },

            { id: "S4_10", cidade: "Moscou", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei a pessoa ao aeroporto. Comentou que jogava muito xadrez e viajaria para uma cidade moderna na América do Norte. " },
            { id: "S4_11", cidade: "Moscou", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falou sobre viajar para uma cidade canadense. Era alguém de aparência andrógina… não era possível definir se era homem ou mulher." },
            { id: "S4_12", cidade: "Moscou", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Mencionou um destino no Canadá." },

            { id: "S4_13", cidade: "Toronto", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… a pessoa está aqui em Toronto. Tinha cabelo platinado e olhos castanhos. Antes de sair, comentou que queria comer comida francesa." },
            { id: "S4_14", cidade: "Toronto", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "A pessoa esteve aqui recentemente." },
            { id: "S4_15", cidade: "Toronto", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei a pessoa ao centro." }
        ]
    },
    // Cenário 5: Echo Lark (002)
    {
        id: "C001_S5",
        suspectId: "002", // Echo Lark
        finalCity: "Tokio",
        spottedAt: ["Seul", "Londres", "Toronto", "Tokio"],
        route: ["Campinas", "Seul", "Londres", "Toronto", "Tokio"],
        travelTable: {
            "Campinas": ["Paris", "Toronto", "Seul"],
            "Seul": ["Roma", "Lisboa", "Londres"],
            "Londres": ["Paris", "Moscou", "Toronto"],
            "Toronto": ["Cairo", "Roma", "Tokio"]
        },
        interrogatorios: [
            { id: "S5_1", cidade: "Campinas", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ela perguntou sobre voos para uma cidade asiática extremamente moderna. Era claramente uma mulher e parecia muito atenta ao redor." },
            { id: "S5_2", cidade: "Campinas", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela estava vendo imagens de uma cidade asiática com muitos prédios modernos." },
            { id: "S5_3", cidade: "Campinas", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Ela perguntou sobre o voo até uma grande cidade na Ásia." },

            { id: "S5_4", cidade: "Seul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Ela tinha cabelo preto e disse que viajaria para uma cidade histórica na Europa." },
            { id: "S5_5", cidade: "Seul", local: "Camareira", personagem: "Camareira", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Camareira.png", pista: "Ela deixou um guia sobre uma cidade europeia muito tradicional." },
            { id: "S5_6", cidade: "Seul", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela comentou sobre visitar uma cidade famosa na Europa." },

            { id: "S5_7", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela esteve aqui hoje. Tinha olhos pretos e disse que viajaria para uma cidade moderna na América do Norte." },
            { id: "S5_8", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela comentou sobre uma cidade com muitos arranha-céus." },
            { id: "S5_9", cidade: "Londres", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela mencionou uma cidade importante do Canadá." },

            { id: "S5_10", cidade: "Toronto", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Ela comentou que praticava tênis e que viajaria para uma cidade moderna na Ásia." },
            { id: "S5_11", cidade: "Toronto", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela falou sobre viajar para uma cidade tecnológica." },
            { id: "S5_12", cidade: "Toronto", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Ela mencionou uma grande cidade asiática." },

            { id: "S5_13", cidade: "Tokio", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ela está aqui em Tóquio. Era uma mulher de cabelo preto e olhos pretos. Antes de sair, comentou que queria comer comida asiática." },
            { id: "S5_14", cidade: "Tokio", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela esteve aqui recentemente." },
            { id: "S5_15", cidade: "Tokio", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao centro da cidade." }
        ]
    }
];
