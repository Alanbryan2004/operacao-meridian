export const DIAS_PARA_HORAS = 24;

export const casesSeed = [
    {
        id: "C001",
        titulo: "Relíquia desaparecida no centro histórico",
        dificuldade: "FACIL",
        recompensa: 400,
        xp: 80,
        tempoTotalHoras: 7 * DIAS_PARA_HORAS, // 1 semana
        localInicial: { pais: "Brasil", cidade: "Campinas" },
        pistas: [
            { tipo: "texto", conteudo: "A testemunha citou uma moeda usada em países vizinhos." },
            { tipo: "texto", conteudo: "O suspeito comentou sobre clima tropical e litoral." },
            { tipo: "texto", conteudo: "Havia palavras em português com sotaque diferente." },
        ],
    },
    {
        id: "C002",
        titulo: "Obra de arte sumiu após leilão",
        dificuldade: "MEDIO",
        recompensa: 1200,
        xp: 250,
        tempoTotalHoras: 7 * DIAS_PARA_HORAS, // 1 semana
        localInicial: { pais: "Brasil", cidade: "São Paulo" },
        pistas: [
            { tipo: "texto", conteudo: "O suspeito mencionou trens como principal transporte." },
            { tipo: "texto", conteudo: "A pista fala de uma capital cultural muito famosa." },
            { tipo: "texto", conteudo: "O idioma ouvido lembra família latina." },
        ],
    },
];

export const initialPlayer = {
    nome: "Recruta",
    nivel: 1,
    xp: 0,
    dinheiro: 1000,
    especializacao: null,
};