// src/game/Caso2Scenarios.js

export const CASO_2_SCENARIOS = [
    // Cenário 1: Blue Rook (005)
    {
        id: "C002_S1",
        suspectId: "005", // Blue Rook (Dimitri Volkov)
        finalCity: "Paris",
        spottedAt: ["Moscou", "Londres", "Toronto", "Paris"],
        route: ["Paris", "Moscou", "Londres", "Toronto", "Paris"],
        travelTable: {
            "Paris": ["Roma", "Toronto", "Moscou"],
            "Moscou": ["Roma", "Lisboa", "Londres"],
            "Londres": ["Paris", "Viena", "Toronto"],
            "Toronto": ["Roma", "Lisboa", "Paris"]
        },
        interrogatorios: [
            // ETAPA 1 - Paris
            { id: "S1_1", cidade: "Paris", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ele perguntou sobre voos para uma cidade conhecida por seus invernos rigorosos e arquitetura imponente. Era claramente um homem e parecia muito calmo." },
            { id: "S1_2", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele estava olhando fotos de uma cidade com grandes praças cobertas de neve e prédios históricos." },
            { id: "S1_3", cidade: "Paris", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Ele perguntou sobre o tempo de voo até uma capital famosa pelo frio intenso." },

            // ETAPA 2 - Moscou
            { id: "S1_4", cidade: "Moscou", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Ele tinha cabelo loiro e disse que viajaria para uma cidade histórica na Europa." },
            { id: "S1_5", cidade: "Moscou", local: "Banqueiro", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele perguntou sobre voos para uma capital europeia muito importante." },
            { id: "S1_6", cidade: "Moscou", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Ele mencionou uma cidade conhecida por sua tradição e história." },

            // ETAPA 3 - Londres
            { id: "S1_7", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele esteve aqui hoje. Tinha olhos azuis e disse que viajaria para uma cidade moderna na América do Norte." },
            { id: "S1_8", cidade: "Londres", local: "Camareira", personagem: "Camareira", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Camareira.png", pista: "Ele deixou um guia sobre uma cidade canadense com muitos arranha-céus." },
            { id: "S1_9", cidade: "Londres", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele comentou sobre visitar uma cidade importante no Canadá." },

            // ETAPA 4 - Toronto
            { id: "S1_10", cidade: "Toronto", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Ele comentou que gostava muito de jogar xadrez e que retornaria para uma cidade europeia famosa por sua arte." },
            { id: "S1_11", cidade: "Toronto", local: "Banqueiro", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele perguntou sobre voos para uma capital cultural da Europa." },
            { id: "S1_12", cidade: "Toronto", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Ele mencionou uma cidade conhecida por seus museus e galerias." },

            // ETAPA FINAL - Paris
            { id: "S1_13", cidade: "Paris", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele está aqui em Paris. Era um homem de cabelo loiro e olhos azuis. Antes de sair, comentou que queria comer comida francesa." },
            { id: "S1_14", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele esteve aqui recentemente e parecia tranquilo." },
            { id: "S1_15", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele até o centro histórico." }
        ]
    },
    // Cenário 2: Saffron Wisp (004)
    {
        id: "C002_S2",
        suspectId: "004", // Saffron Wisp (Amaya Desai)
        finalCity: "Paris",
        spottedAt: ["Nova York", "Cairo", "Mumbai", "Paris"],
        route: ["Paris", "Nova York", "Cairo", "Mumbai", "Paris"],
        travelTable: {
            "Paris": ["Londres", "Roma", "Nova York"],
            "Nova York": ["Paris", "Lisboa", "Cairo"],
            "Cairo": ["Roma", "Toronto", "Mumbai"],
            "Mumbai": ["Viena", "Lisboa", "Paris"]
        },
        interrogatorios: [
            // ETAPA 1 - Paris
            { id: "S2_1", cidade: "Paris", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ela perguntou sobre voos para uma cidade com arranha-céus enormes e movimento constante. Era claramente uma mulher e parecia muito confiante." },
            { id: "S2_2", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela estava vendo imagens de uma cidade famosa por seus prédios altos e ruas movimentadas." },
            { id: "S2_3", cidade: "Paris", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Ela perguntou sobre o tempo de voo até uma grande metrópole na América do Norte." },

            // ETAPA 2 - Nova York
            { id: "S2_4", cidade: "Nova York", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Ela tinha cabelo castanho e disse que viajaria para um país com desertos e monumentos antigos." },
            { id: "S2_5", cidade: "Nova York", local: "Banqueiro", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela perguntou sobre voos para uma cidade histórica no norte da África." },
            { id: "S2_6", cidade: "Nova York", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Ela mencionou um país famoso por suas pirâmides." },

            // ETAPA 3 - Cairo
            { id: "S2_7", cidade: "Cairo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela esteve aqui hoje. Tinha olhos pretos e disse que viajaria para uma cidade grande e movimentada na Ásia." },
            { id: "S2_8", cidade: "Cairo", local: "Camareira", personagem: "Camareira", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Camareira.png", pista: "Ela deixou um guia sobre uma cidade importante da Índia." },
            { id: "S2_9", cidade: "Cairo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela comentou sobre visitar uma cidade famosa por sua cultura e tamanho." },

            // ETAPA 4 - Mumbai
            { id: "S2_10", cidade: "Mumbai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Ela comentou que praticava yoga e que viajaria para uma cidade europeia muito famosa." },
            { id: "S2_11", cidade: "Mumbai", local: "Banqueiro", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela perguntou sobre voos para uma capital cultural da Europa." },
            { id: "S2_12", cidade: "Mumbai", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Ela mencionou uma cidade conhecida por seus museus." },

            // ETAPA FINAL - Paris
            { id: "S2_13", cidade: "Paris", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ela está aqui em Paris. Era uma mulher de cabelo castanho e olhos pretos. Antes de sair, comentou que queria comer algo bem apimentado." },
            { id: "S2_14", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela esteve aqui recentemente e parecia muito tranquila." },
            { id: "S2_15", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao centro histórico." }
        ]
    },
    // Cenário 3: Brass Mantis (003)
    {
        id: "C002_S3",
        suspectId: "003", // Brass Mantis (Matteo Sforza)
        finalCity: "Paris",
        spottedAt: ["Roma", "Lisboa", "Toronto", "Paris"],
        route: ["Paris", "Roma", "Lisboa", "Toronto", "Paris"],
        travelTable: {
            "Paris": ["Londres", "Viena", "Roma"],
            "Roma": ["Paris", "Londres", "Lisboa"],
            "Lisboa": ["Viena", "Cairo", "Toronto"],
            "Toronto": ["Roma", "Viena", "Paris"]
        },
        interrogatorios: [
            // ETAPA 1 - Paris
            { id: "S3_1", cidade: "Paris", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ele perguntou sobre voos para uma cidade famosa por sua história e monumentos antigos. Era claramente um homem e parecia muito focado." },
            { id: "S3_2", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele estava vendo fotos de uma cidade com ruínas antigas e arquitetura clássica." },
            { id: "S3_3", cidade: "Paris", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Ele perguntou sobre o tempo de voo até uma capital histórica na Europa." },

            // ETAPA 2 - Roma
            { id: "S3_4", cidade: "Roma", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Ele tinha cabelo castanho e disse que viajaria para uma cidade europeia próxima ao oceano." },
            { id: "S3_5", cidade: "Roma", local: "Banqueiro", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele perguntou sobre voos para uma capital antiga no oeste da Europa." },
            { id: "S3_6", cidade: "Roma", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Ele mencionou uma cidade famosa por sua história and localização costeira." },

            // ETAPA 3 - Lisboa
            { id: "S3_7", cidade: "Lisboa", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele esteve aqui hoje. Tinha olhos castanhos e disse que viajaria para uma cidade moderna na América do Norte." },
            { id: "S3_8", cidade: "Lisboa", local: "Camareira", personagem: "Camareira", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Camareira.png", pista: "Ele deixou um guia sobre uma cidade canadense importante." },
            { id: "S3_9", cidade: "Lisboa", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele comentou sobre visitar uma cidade com muitos arranha-céus." },

            // ETAPA 4 - Toronto
            { id: "S3_10", cidade: "Toronto", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou que praticava remo e que viajaria para uma cidade europeia famosa por sua cultura." },
            { id: "S3_11", cidade: "Toronto", local: "Banqueiro", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele perguntou sobre voos para uma capital cultural da Europa." },
            { id: "S3_12", cidade: "Toronto", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Ele mencionou uma cidade conhecida mundialmente por sua arte." },

            // ETAPA FINAL - Paris
            { id: "S3_13", cidade: "Paris", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele está aqui em Paris. Era um homem de cabelo castanho e olhos castanhos. Antes de sair, comentou que queria comer comida italiana." },
            { id: "S3_14", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele esteve aqui recentemente e parecia relaxado." },
            { id: "S3_15", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao centro histórico." }
        ]
    },
    // Cenário 4: Kite Needle (006)
    {
        id: "C002_S4",
        suspectId: "006", // Kite Needle (Mei Lin Zhao)
        finalCity: "Paris",
        spottedAt: ["Seul", "Tóquio", "Vancouver", "Paris"],
        route: ["Paris", "Seul", "Tóquio", "Vancouver", "Paris"],
        travelTable: {
            "Paris": ["Roma", "Toronto", "Seul"],
            "Seul": ["Singapura", "Londres", "Tóquio"],
            "Tóquio": ["Roma", "Sydney", "Vancouver"],
            "Vancouver": ["Lisboa", "Viena", "Paris"]
        },
        interrogatorios: [
            // ETAPA 1 - Paris
            { id: "S4_1", cidade: "Paris", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ela perguntou sobre voos para uma cidade asiática extremamente moderna. Ela era claramente uma mulher e parecia muito concentrada." },
            { id: "S4_2", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela estava olhando fotos de uma cidade com muitos prédios modernos e luzes." },
            { id: "S4_3", cidade: "Paris", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Ela perguntou sobre o voo até uma grande cidade tecnológica na Ásia." },

            // ETAPA 2 - Seul
            { id: "S4_4", cidade: "Seul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Ela tinha cabelo preto e disse que viajaria para outra cidade importante na Ásia." },
            { id: "S4_5", cidade: "Seul", local: "Banqueiro", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela perguntou sobre voos para uma capital tecnológica próxima." },
            { id: "S4_6", cidade: "Seul", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Ela mencionou uma cidade asiática muito moderna." },

            // ETAPA 3 - Tóquio
            { id: "S4_7", cidade: "Tóquio", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela esteve aqui hoje. Tinha olhos pretos e disse que viajaria para uma cidade costeira na América do Norte." },
            { id: "S4_8", cidade: "Tóquio", local: "Camareira", personagem: "Camareira", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Camareira.png", pista: "Ela deixou um guia sobre uma cidade canadense próxima ao oceano." },
            { id: "S4_9", cidade: "Tóquio", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela comentou sobre visitar uma cidade importante no Canadá." },

            // ETAPA 4 - Vancouver
            { id: "S4_10", cidade: "Vancouver", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Ela comentou que praticava ginástica olímpica e que viajaria para uma capital europeia famosa." },
            { id: "S4_11", cidade: "Vancouver", local: "Banqueiro", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela perguntou sobre voos para uma cidade europeia muito conhecida." },
            { id: "S4_12", cidade: "Vancouver", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Ela mencionou uma cidade famosa por sua arte e história." },

            // ETAPA FINAL - Paris
            { id: "S4_13", cidade: "Paris", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ela está aqui em Paris. Ela era uma mulher de cabelo preto e olhos pretos. Antes de sair, comentou que queria comer comida asiática." },
            { id: "S4_14", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela esteve aqui recentemente e parecia muito calma." },
            { id: "S4_15", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao centro histórico." }
        ]
    },
    // Cenário 5: Nacre Fox (007)
    {
        id: "C002_S5",
        suspectId: "007", // Nacre Fox (Claire Beaumont)
        finalCity: "Paris",
        spottedAt: ["Viena", "Londres", "Lisboa", "Paris"],
        route: ["Paris", "Viena", "Londres", "Lisboa", "Paris"],
        travelTable: {
            "Paris": ["Roma", "Toronto", "Viena"],
            "Viena": ["Lisboa", "Moscou", "Londres"],
            "Londres": ["Roma", "Paris", "Lisboa"],
            "Lisboa": ["Viena", "Roma", "Paris"]
        },
        interrogatorios: [
            // ETAPA 1 - Paris
            { id: "S5_1", cidade: "Paris", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ela perguntou sobre voos para uma cidade europeia conhecida por sua arquitetura clássica. Era claramente uma mulher e parecia muito elegante." },
            { id: "S5_2", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela estava vendo fotos de uma cidade com palácios e construções históricas." },
            { id: "S5_3", cidade: "Paris", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Ela perguntou sobre o tempo de voo até uma capital europeia famosa por sua cultura." },

            // ETAPA 2 - Viena
            { id: "S5_4", cidade: "Viena", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Ela tinha cabelo platinado e disse que viajaria para uma capital importante na Europa." },
            { id: "S5_5", cidade: "Viena", local: "Banqueiro", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela perguntou sobre voos para uma cidade histórica muito conhecida." },
            { id: "S5_6", cidade: "Viena", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Ela mencionou uma cidade famosa por sua tradição." },

            // ETAPA 3 - Londres
            { id: "S5_7", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela esteve aqui hoje. Tinha olhos verdes e disse que viajaria para uma cidade histórica próxima ao oceano." },
            { id: "S5_8", cidade: "Londres", local: "Camareira", personagem: "Camareira", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Camareira.png", pista: "Ela deixou um guia sobre uma cidade europeia costeira." },
            { id: "S5_9", cidade: "Londres", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela comentou sobre visitar uma cidade antiga na Europa." },

            // ETAPA 4 - Lisboa
            { id: "S5_10", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Ela comentou que praticava esgrima e que viajaria para uma capital europeia muito famosa." },
            { id: "S5_11", cidade: "Lisboa", local: "Banqueiro", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela perguntou sobre voos para uma cidade cultural da Europa." },
            { id: "S5_12", cidade: "Lisboa", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Ela mencionou uma cidade conhecida mundialmente." },

            // ETAPA FINAL - Paris
            { id: "S5_13", cidade: "Paris", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ela está aqui em Paris. Era uma mulher de cabelo platinado e olhos verdes. Antes de sair, comentou que queria comer comida francesa." },
            { id: "S5_14", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela esteve aqui recentemente e parecia completamente tranquila." },
            { id: "S5_15", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela até a região central." }
        ]
    }
];
