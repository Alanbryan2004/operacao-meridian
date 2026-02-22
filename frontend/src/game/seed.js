export const DIAS_PARA_HORAS = 24;

export const casesSeed = [
    {
        id: "C001",
        titulo: "Relíquia desaparecida no centro histórico",
        dificuldade: "FACIL",
        recompensa: 4500,
        xp: 80,
        tempoTotalHoras: 7 * DIAS_PARA_HORAS, // 1 semana
        localInicial: { pais: "Brasil", cidade: "Campinas" },
        resumo: "A joia roubada era a lendária Lágrima de Aeternum, uma relíquia antiga cravejada de ouro e um núcleo de cristal incandescente, conhecida por seu brilho quase sobrenatural.\n\nEla desapareceu do Museu do Centro Histórico, arrancada de um pedestal protegido por vidro reforçado durante a noite.\n\nAvaliada em cerca de R$ 25 milhões, seu valor real vai além do dinheiro, envolvendo séculos de história e segredos ainda não revelados. 🔎💎",
        imgItem: "/reliquiaDesaparecida.png",
        interrogatorios: [
            {
                id: "L001",
                local: "Floricultura",
                imgLocal: "/Floricultura.png",
                personagem: "Florista",
                imgPersonagem: "/Florista.png",
                pista: "A testemunha citou uma moeda usada em países vizinhos.",
            },
            {
                id: "L002",
                local: "Restaurante",
                imgLocal: "/Restaurante.png",
                personagem: "Garçom",
                imgPersonagem: "/Garcon.png",
                pista: "Teve um sujeito estranho aqui ontem à noite… não tirava os olhos de um livro antigo que trazia no bolso. Perguntou se eu sabia onde ficava a antiga rota dos navegadores portugueses… e pediu um prato típico de bacalhau.\nAntes de sair, comentou que precisava pegar um voo internacional ainda esta madrugada.",
            },
            {
                id: "L003",
                local: "Hospital",
                imgLocal: "/Hospital.png",
                personagem: "Médica",
                imgPersonagem: "/Medica.png",
                pista: "Havia palavras em português com sotaque diferente.",
            },
        ],
    },
    {
        id: "C002",
        titulo: "Obra de arte sumiu após leilão",
        dificuldade: "MEDIO",
        recompensa: 12000,
        xp: 250,
        tempoTotalHoras: 7 * DIAS_PARA_HORAS, // 1 semana
        localInicial: { pais: "Brasil", cidade: "São Paulo" },
        resumo: "Uma pintura inestimável desapareceu de uma galeria privada logo após ser vendida em um leilão de alta classe.",
        imgItem: "/reliquiaDesaparecida.png", // Usando o mesmo placeholder por enquanto
        interrogatorios: [
            {
                id: "L004",
                local: "Restaurante",
                imgLocal: "/Restaurante.png",
                personagem: "Cozinheiro",
                imgPersonagem: "/Cozinheiro.png",
                pista: "O suspeito mencionou trens como principal transporte.",
            },
            {
                id: "L005",
                local: "Hospital",
                imgLocal: "/Hospital.png",
                personagem: "Agente de Trânsito",
                imgPersonagem: "/AgenteTransito.png",
                pista: "A pista fala de uma capital cultural muito famosa.",
            },
            {
                id: "L006",
                local: "Floricultura",
                imgLocal: "/Floricultura.png",
                personagem: "Banqueiro",
                imgPersonagem: "/Banqueiro.png",
                pista: "O idioma ouvido lembra família latina.",
            },
        ],
    },
];

export const initialPlayer = {
    nome: "Recruta",
    nivel: 1,
    nivelTitulo: "Novato I",
    xp: 0,
    dinheiro: 1000,
    especializacao: null,
};