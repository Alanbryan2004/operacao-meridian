import { casesSeed, initialPlayer } from "./seed";

const KEY = "operacao_meridian__mvp_state_v1";

function nowIso() {
    return new Date().toISOString();
}

export function loadGame() {
    try {
        const raw = localStorage.getItem(KEY);
        let state;
        if (!raw) {
            state = {
                player: { ...initialPlayer },
                cases: [...casesSeed],
                runs: {}, // caseId -> run
                createdAt: nowIso(),
                updatedAt: nowIso(),
            };
            localStorage.setItem(KEY, JSON.stringify(state));
        } else {
            state = JSON.parse(raw);
        }

        // Migração/Merge: Garante que os casos no state tenham os campos novos do seed.js
        state.cases = casesSeed.map((seed) => {
            const existing = state.cases.find((c) => c.id === seed.id);
            return {
                ...seed, ...existing,
                resumo: seed.resumo || existing?.resumo,
                interrogatorios: seed.interrogatorios || existing?.interrogatorios,
                imgItem: seed.imgItem || existing?.imgItem
            };
        });

        return state;
    } catch {
        const init = {
            player: { ...initialPlayer },
            cases: [...casesSeed],
            runs: {},
            createdAt: nowIso(),
            updatedAt: nowIso(),
        };
        localStorage.setItem(KEY, JSON.stringify(init));
        return init;
    }
}

export function saveGame(state) {
    const next = { ...state, updatedAt: nowIso() };
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
}

export function resetGame() {
    localStorage.removeItem(KEY);
    return loadGame();
}

export function startRunIfNeeded(state, caseObj) {
    const existing = state.runs?.[caseObj.id];
    if (existing && existing.status === "IN_PROGRESS") return state;

    // Bloqueia se já houver QUALQUER missão em progresso
    const hasActiveMission = Object.values(state.runs || {}).some(r => r.status === "IN_PROGRESS");
    if (hasActiveMission) return state;

    const run = {
        caseId: caseObj.id,
        status: "IN_PROGRESS",
        tempoRestanteHoras: caseObj.tempoTotalHoras,
        dinheiroNoInicio: state.player.dinheiro,
        localAtual: { ...caseObj.localInicial },
        pistasDescobertas: [],
        jornal: [
            { t: nowIso(), msg: `Caso iniciado: ${caseObj.titulo} (${caseObj.dificuldade})` },
            { t: nowIso(), msg: `Local inicial: ${caseObj.localInicial.cidade} - ${caseObj.localInicial.pais}` },
            { t: nowIso(), msg: `Tempo total: ${caseObj.tempoTotalHoras}h` },
            { t: nowIso(), msg: `Bônus de despesas recebido: R$ 2.000,00` },
        ],
        mandadoEmitido: false,
        warrantId: null,
        suspeitoCapturado: false,
        filtrosAnalise: {
            sexo: [],
            corCabelo: [],
            esporte: [],
            comidaFavorita: [],
            aparencia: [],
            origem: []
        },
        investigationCountByCity: {},
    };

    const next = {
        ...state,
        player: {
            ...state.player,
            dinheiro: state.player.dinheiro + 2000 // Adiantamento de R$ 2000
        },
        runs: {
            ...state.runs,
            [caseObj.id]: run,
        },
    };

    return next;
}

export function spendTime(run, horas, msg) {
    const h = Math.max(0, Number(horas || 0));
    const tempo = Math.max(0, run.tempoRestanteHoras - h);

    const next = {
        ...run,
        tempoRestanteHoras: tempo,
        jornal: [...run.jornal, { t: nowIso(), msg }],
    };

    if (tempo <= 0 && run.status === "IN_PROGRESS") {
        next.status = "LOST";
        next.jornal = [
            ...next.jornal,
            { t: nowIso(), msg: "⌛ Tempo esgotado. O suspeito escapou." },
        ];
    }

    return next;
}

export function spendMoney(state, valor, msg, caseId) {
    const v = Math.max(0, Number(valor || 0));
    const dinheiro = Math.max(0, state.player.dinheiro - v);

    const run = state.runs[caseId];
    const nextRun = {
        ...run,
        jornal: [...run.jornal, { t: nowIso(), msg }],
    };

    return {
        ...state,
        player: { ...state.player, dinheiro },
        runs: { ...state.runs, [caseId]: nextRun },
    };
}

// src/game/suspectsSeed.js
export const suspectsSeed = [
    {
        id: "001",
        codinome: "Vanta Quill",
        nomeReal: "Desconhecido",
        sexo: "Não Binário/Incerto",
        corCabelo: "Cinza Platinado",
        esporte: "Xadrez",
        comidaFavorita: "Chá Earl Grey e Scones",
        idadeAparente: "35–45",
        origem: "Incerta (documentos apontam 3 países)",
        especialidade: ["Falsificação avançada", "Identidades fabricadas", "Rastreio reverso"],
        periculosidade: "Alta",
        raridade: "Raro",
        assinatura: [
            "Bilhete em papel preto com frase curta (sem data)",
            "Notas novas e sequenciais quando paga algo",
            "Evita copos de vidro"
        ],
        aparencia: [
            "Alto(a), postura rígida",
            "Luvas finas",
            "Cicatriz pequena na sobrancelha esquerda"
        ],
        idiomas: [
            { idioma: "Inglês", nivel: "Fluente" },
            { idioma: "Português", nivel: "Formal demais" },
            { idioma: "Francês", nivel: "Sotaque propositalmente quebrado" }
        ],
        habitos: ["Pede chá sem açúcar", "Não encosta em vidro"],
        pistasTipicas: [
            "Falava português… mas parecia um manual.",
            "Pagou com notas novas, sequenciais.",
            "Ninguém viu o rosto, só as luvas claras."
        ],
        falsosPositivos: [
            "Pode se passar por colecionador(a) de arte",
            "Cartão de visita perfeito e verificável"
        ],
        relacaoMeridian: "Executor(a) usado(a) quando é preciso apagar rastros."
    },

    {
        id: "002",
        codinome: "Echo Lark",
        nomeReal: "Laila Kwon",
        sexo: "Feminino",
        corCabelo: "Preto (Curto)",
        esporte: "Tênis",
        comidaFavorita: "Sushi de Salmão",
        idadeAparente: 29,
        origem: "Coreia do Sul (cresceu em vários países)",
        especialidade: ["Engenharia social", "Imitação de voz", "Golpes por ligação"],
        periculosidade: "Média",
        raridade: "Incomum",
        assinatura: [
            "Áudio curto deixado em algum dispositivo com tique repetido (3 vezes)",
            "Sempre usa fones"
        ],
        aparencia: ["Baixa, rápida", "Tatuagem mínima atrás da orelha direita"],
        idiomas: [
            { idioma: "Coreano", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Fluente" },
            { idioma: "Espanhol", nivel: "Bom" },
            { idioma: "Português", nivel: "Intermediário (expressões fora de época)" }
        ],
        habitos: ["Repete o nome da pessoa como se estivesse testando a voz"],
        pistasTipicas: [
            "Ela repetiu meu nome como se estivesse testando minha voz.",
            "A ligação caiu exatamente quando eu disse 'sim'.",
            "Parecia saber minha rotina."
        ],
        falsosPositivos: ["Se apresenta como suporte técnico ou atendimento"],
        relacaoMeridian: "Abre portas humanas: convencimento e manipulação."
    },

    {
        id: "003",
        codinome: "Brass Mantis",
        nomeReal: "Matteo Sforza",
        sexo: "Masculino",
        corCabelo: "Castanho Grisalho",
        esporte: "Remo",
        comidaFavorita: "Pasta alla Carbonara",
        idadeAparente: 41,
        origem: "Itália",
        especialidade: ["Logística clandestina", "Rotas portuárias", "Contêineres"],
        periculosidade: "Alta",
        raridade: "Raro",
        assinatura: [
            "Moeda antiga como troco/sinal",
            "Fala como gente de porto"
        ],
        aparencia: [
            "Barba curta bem desenhada",
            "Jaqueta de couro",
            "Mãos com marcas de corda"
        ],
        idiomas: [
            { idioma: "Italiano", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Bom" },
            { idioma: "Português", nivel: "Bom (gírias de carga)" }
        ],
        habitos: ["Pergunta do cais antes do endereço"],
        pistasTipicas: [
            "Falou de 'janela de maré' como se fosse horário de ônibus.",
            "Perguntou do cais, não do endereço.",
            "Deixou uma moeda antiga no balcão."
        ],
        falsosPositivos: ["Pode se passar por despachante/armador"],
        relacaoMeridian: "Faz item sumir do mapa físico."
    },

    {
        id: "004",
        codinome: "Saffron Wisp",
        nomeReal: "Amaya Desai",
        sexo: "Feminino",
        corCabelo: "Castanho Escuro",
        esporte: "Yoga",
        comidaFavorita: "Chicken Tikka Masala",
        idadeAparente: 33,
        origem: "Índia (passagens no Oriente Médio)",
        especialidade: ["Contrabando de micro-itens", "Troca em trânsito", "Joias"],
        periculosidade: "Média",
        raridade: "Incomum",
        assinatura: [
            "Perfume marcante de especiarias",
            "Fios dourados (tecido) sem querer"
        ],
        aparencia: ["Elegante, discreta", "Lenços e acessórios finos"],
        idiomas: [
            { idioma: "Hindi", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Fluente" },
            { idioma: "Árabe", nivel: "Básico" },
            { idioma: "Português", nivel: "Bom e educado" }
        ],
        habitos: ["Pede embrulho 'sem metal'"],
        pistasTipicas: [
            "O cheiro ficou no corredor.",
            "Ela pediu um embrulho 'sem metal'.",
            "Os fios dourados estavam presos na maçaneta."
        ],
        falsosPositivos: ["Representante de boutique / colecionadora de joias"],
        relacaoMeridian: "Roubos onde nada parece ter sido tocado."
    },

    {
        id: "005",
        codinome: "Blue Rook",
        nomeReal: "Dimitri Volkov",
        sexo: "Masculino",
        corCabelo: "Loiro (Raspado)",
        esporte: "Xadrez",
        comidaFavorita: "Caviar Beluga e Vodca",
        idadeAparente: 38,
        origem: "Rússia",
        especialidade: ["Negociação", "Compra de silêncio", "Pressão psicológica"],
        periculosidade: "Alta",
        raridade: "Raro",
        assinatura: [
            "Frases como 'movimento inevitável'",
            "Peças de xadrez baratas deixadas como souvenir"
        ],
        aparencia: ["Terno escuro", "Anel pesado na mão direita"],
        idiomas: [
            { idioma: "Russo", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Bom" },
            { idioma: "Português", nivel: "Formal com sotaque forte" }
        ],
        habitos: ["Faz as pessoas acharem que não têm escolha"],
        pistasTipicas: [
            "Ele disse que eu não tinha escolha.",
            "Pagou 'para evitar problemas'.",
            "Tinha uma peça de xadrez no chão."
        ],
        falsosPositivos: ["Diplomata / empresário"],
        relacaoMeridian: "Resolve quando a missão exige controle, não correria."
    },

    {
        id: "006",
        codinome: "Kite Needle",
        nomeReal: "Mei Lin Zhao",
        sexo: "Feminino",
        corCabelo: "Preto Liso",
        esporte: "Ginástica Olímpica",
        comidaFavorita: "Dim Sum",
        idadeAparente: 27,
        origem: "China (cresceu em Singapura)",
        especialidade: ["Infiltração física", "Troca de crachás", "Furto rápido"],
        periculosidade: "Média",
        raridade: "Comum",
        assinatura: [
            "Kit de costura (carretel de linha)",
            "Sabe improvisar uniforme/crachá"
        ],
        aparencia: ["Atlética", "Movimentos silenciosos", "Tênis leves"],
        idiomas: [
            { idioma: "Mandarim", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Bom" },
            { idioma: "Português", nivel: "Básico (entende mais do que fala)" }
        ],
        habitos: ["Parece já trabalhar no local"],
        pistasTipicas: [
            "Parecia que ela já trabalhava aqui.",
            "O crachá era meu… mas com foto diferente.",
            "Havia linha clara presa no bolso de um jaleco."
        ],
        falsosPositivos: ["Funcionária terceirizada / estagiária"],
        relacaoMeridian: "Ideal para lugares controlados (museu, evento, laboratório)."
    },

    {
        id: "007",
        codinome: "Nacre Fox",
        nomeReal: "Claire Beaumont",
        sexo: "Feminino",
        corCabelo: "Loiro Platinado",
        esporte: "Esgrima",
        comidaFavorita: "Escargot",
        idadeAparente: 36,
        origem: "França",
        especialidade: ["Arte e antiguidades", "Falsos leilões", "Curadoria fraudulenta"],
        periculosidade: "Média",
        raridade: "Incomum",
        assinatura: ["Etiqueta manuscrita 'catalogada' com número errado"],
        aparencia: ["Sofisticada", "Cabelo curto", "Unhas impecáveis"],
        idiomas: [
            { idioma: "Francês", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Fluente" },
            { idioma: "Português", nivel: "Quase sem sotaque" }
        ],
        habitos: ["Fala do objeto como se fosse dela"],
        pistasTipicas: [
            "Perguntou do 'proveniência' três vezes.",
            "Deixou uma etiqueta manuscrita com número errado.",
            "Falava como curadora, mas evitava nomes."
        ],
        falsosPositivos: ["Curadora / crítica / leiloeira"],
        relacaoMeridian: "Ponte entre roubo e lavagem cultural."
    },

    {
        id: "008",
        codinome: "Sand Helix",
        nomeReal: "Hassan Al-Rashid",
        sexo: "Masculino",
        corCabelo: "Preto (com Entradas)",
        esporte: "Polo",
        comidaFavorita: "Falafel e Húmus",
        idadeAparente: 44,
        origem: "Egito",
        especialidade: ["Antiguidades", "Rotas discretas", "Troca de custódia"],
        periculosidade: "Alta",
        raridade: "Raro",
        assinatura: ["Areia fina em bolsos/rodapés", "Evita câmeras"],
        aparencia: ["Alto", "Voz grave", "Cicatriz no queixo"],
        idiomas: [
            { idioma: "Árabe", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Bom" },
            { idioma: "Francês", nivel: "Bom" },
            { idioma: "Português", nivel: "Básico" }
        ],
        habitos: ["Fala de 'camadas' como arqueólogo"],
        pistasTipicas: [
            "Tinha areia no chão… aqui não tem praia.",
            "Falou de 'camadas' como arqueólogo.",
            "Usava luvas mesmo no calor."
        ],
        falsosPositivos: ["Guia cultural / professor / colecionador"],
        relacaoMeridian: "Aparece quando o item tem valor histórico proibido."
    },

    {
        id: "009",
        codinome: "Velvet Circuit",
        nomeReal: "Sofia Mendez",
        sexo: "Feminino",
        corCabelo: "Vermelho Tingido",
        esporte: "Skate",
        comidaFavorita: "Tacos al Pastor",
        idadeAparente: 31,
        origem: "México",
        especialidade: ["Travas eletrônicas", "Gadgets", "Drones civis"],
        periculosidade: "Média",
        raridade: "Incomum",
        assinatura: ["Peça barata de eletrônico (parafuso/cabo curto) esquecida"],
        aparencia: ["Casual", "Mochila", "Marcas de solda nos dedos"],
        idiomas: [
            { idioma: "Espanhol", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Bom" },
            { idioma: "Português", nivel: "Bom (sotaque forte)" }
        ],
        habitos: ["Testa sensores antes de agir"],
        pistasTipicas: [
            "Vi uma luz vermelha piscando no alto.",
            "A fechadura abriu sem barulho.",
            "Tinha um parafuso pequeno perto da porta."
        ],
        falsosPositivos: ["Técnica de TI / instaladora / fotógrafa de evento"],
        relacaoMeridian: "Abre caminho em locais com sensores."
    },

    {
        id: "010",
        codinome: "Ivory Marrow",
        nomeReal: "“Dr. R.” (pseudônimo recorrente)",
        sexo: "Masculino",
        corCabelo: "Branco",
        esporte: "Golfe",
        comidaFavorita: "Bife Wellington",
        idadeAparente: "50+",
        origem: "Desconhecida",
        especialidade: ["Patentes", "Dados científicos", "Laboratórios"],
        periculosidade: "Alta",
        raridade: "Elite",
        assinatura: ["Anotações com letra impecável", "Termos acadêmicos em frases curtas"],
        aparencia: ["Óculos", "Postura de professor(a)"],
        idiomas: [
            { idioma: "Inglês", nivel: "Fluente" },
            { idioma: "Alemão", nivel: "Bom" },
            { idioma: "Português", nivel: "Técnico" }
        ],
        habitos: ["Pergunta de temperatura/umidade do cofre"],
        pistasTipicas: [
            "Falou como se estivesse dando aula.",
            "Perguntou de temperatura e umidade do cofre.",
            "Tinha um caderno com anotações perfeitas."
        ],
        falsosPositivos: ["Pesquisador(a) / consultor(a) / auditor(a)"],
        relacaoMeridian: "Crimes elite com foco em ciência e tecnologia."
    },
];