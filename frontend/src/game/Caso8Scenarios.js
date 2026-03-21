export const Caso8Scenarios = [
  // Cenário 1 — Sombra Digital
  {
    id: "C008_S1",
    suspectId: "011",
    finalCity: "Londres",
    spottedAt: ["Tóquio", "Singapura", "Dubai", "Londres"],
    route: ["Seul", "Tóquio", "Singapura", "Dubai", "Londres"],
    travelTable: {
      "Seul": ["Tóquio", "Pequim", "Bangcoc"],
      "Tóquio": ["Singapura", "Seul", "Mumbai"],
      "Singapura": ["Dubai", "Roma", "Madrid"],
      "Dubai": ["Londres", "Paris", "Roma"],
      "Londres": []
    },
    interrogatorios: [
      { id: "S1_1", cidade: "Seul", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele comentou sobre um país cuja bandeira possui um círculo vermelho no centro." },
      { id: "S1_2", cidade: "Seul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para uma cidade tecnológica." },
      { id: "S1_3", cidade: "Seul", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Sim… negociei com ele. Era um homem." },

      { id: "S1_4", cidade: "Tóquio", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre um país cuja bandeira tem uma lua crescente e estrelas." },
      { id: "S1_5", cidade: "Tóquio", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre sistemas financeiros globais." },
      { id: "S1_6", cidade: "Tóquio", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele tinha cabelo preto." },

      { id: "S1_7", cidade: "Singapura", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre um país cuja bandeira tem quatro cores: verde, branco, preto e vermelho." },
      { id: "S1_8", cidade: "Singapura", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre dinheiro digital." },
      { id: "S1_9", cidade: "Singapura", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Sim… tinha olhos verdes." },

      { id: "S1_10", cidade: "Dubai", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele comentou sobre um país cuja bandeira possui uma cruz vermelha." },
      { id: "S1_11", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para um centro financeiro." },
      { id: "S1_12", cidade: "Dubai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele comentou que gosta de comida asiática." },

      { id: "S1_13", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele passou por aqui." },
      { id: "S1_14", cidade: "Londres", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele esteve aqui hoje." },
      { id: "S1_15", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao centro financeiro." }
    ]
  },

  // Cenário 2 — Kite Needle
  {
    id: "C008_S2",
    suspectId: "006",
    finalCity: "Istambul",
    spottedAt: ["Pequim", "Mumbai", "Dubai", "Istambul"],
    route: ["Seul", "Pequim", "Mumbai", "Dubai", "Istambul"],
    travelTable: {
      "Seul": ["Pequim", "Tóquio", "Bangcoc"],
      "Pequim": ["Mumbai", "Seul", "Singapura"],
      "Mumbai": ["Dubai", "Roma", "Paris"],
      "Dubai": ["Istambul", "Roma", "Madrid"],
      "Istambul": []
    },
    interrogatorios: [
      { id: "S2_1", cidade: "Seul", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ela comentou sobre um país cuja bandeira possui estrelas amarelas." },
      { id: "S2_2", cidade: "Seul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Disse que iria para a China." },
      { id: "S2_3", cidade: "Seul", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Era uma mulher." },

      { id: "S2_4", cidade: "Pequim", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela comentou sobre um país cuja bandeira tem três cores e uma roda." },
      { id: "S2_5", cidade: "Pequim", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre rotas asiáticas." },
      { id: "S2_6", cidade: "Pequim", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Tinha cabelo preto." },

      { id: "S2_7", cidade: "Mumbai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela comentou sobre um país cuja bandeira tem quatro cores." },
      { id: "S2_8", cidade: "Mumbai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre trocas rápidas." },
      { id: "S2_9", cidade: "Mumbai", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Tinha olhos pretos." },

      { id: "S2_10", cidade: "Dubai", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ela comentou sobre um país cuja bandeira tem lua crescente." },
      { id: "S2_11", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto." },
      { id: "S2_12", cidade: "Dubai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela comentou que pratica ginástica olímpica." },

      { id: "S2_13", cidade: "Istambul", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ela passou por aqui." },
      { id: "S2_14", cidade: "Istambul", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela esteve aqui." },
      { id: "S2_15", cidade: "Istambul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao centro." }
    ]
  },

  // Cenário 3 — Saffron Wisp
  {
    id: "C008_S3",
    suspectId: "004",
    finalCity: "Paris",
    spottedAt: ["Bangcoc", "Mumbai", "Dubai", "Paris"],
    route: ["Seul", "Bangcoc", "Mumbai", "Dubai", "Paris"],
    travelTable: {
      "Seul": ["Bangcoc", "Tóquio", "Pequim"],
      "Bangcoc": ["Mumbai", "Seul", "Singapura"],
      "Mumbai": ["Dubai", "Roma", "Madrid"],
      "Dubai": ["Paris", "Madrid", "Roma"],
      "Paris": []
    },
    interrogatorios: [
      { id: "S3_1", cidade: "Seul", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ela comentou sobre um país cuja bandeira tem faixas horizontais com cores fortes." },
      { id: "S3_2", cidade: "Seul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Disse que iria para um país tropical da Ásia." },
      { id: "S3_3", cidade: "Seul", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Sim… negociei com ela. Era uma mulher." },

      { id: "S3_4", cidade: "Bangcoc", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela comentou sobre um país cuja bandeira tem três cores e um símbolo no centro." },
      { id: "S3_5", cidade: "Bangcoc", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre rotas comerciais asiáticas." },
      { id: "S3_6", cidade: "Bangcoc", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela tinha cabelo castanho." },

      { id: "S3_7", cidade: "Mumbai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela comentou sobre um país cuja bandeira possui quatro cores distintas." },
      { id: "S3_8", cidade: "Mumbai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre transações rápidas." },
      { id: "S3_9", cidade: "Mumbai", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Sim… tinha olhos pretos." },

      { id: "S3_10", cidade: "Dubai", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ela comentou sobre um país cuja bandeira tem três cores verticais." },
      { id: "S3_11", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Disse que iria para uma cidade famosa por cultura." },
      { id: "S3_12", cidade: "Dubai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela comentou que pratica yoga." },

      { id: "S3_13", cidade: "Paris", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ela passou por aqui." },
      { id: "S3_14", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela esteve aqui hoje." },
      { id: "S3_15", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao centro." }
    ]
  },

  // Cenário 4 — Blue Rook
  {
    id: "C008_S4",
    suspectId: "005",
    finalCity: "Paris",
    spottedAt: ["Moscou", "Berlim", "Londres", "Paris"],
    route: ["Seul", "Moscou", "Berlim", "Londres", "Paris"],
    travelTable: {
      "Seul": ["Moscou", "Tóquio", "Pequim"],
      "Moscou": ["Berlim", "Londres", "Roma"],
      "Berlim": ["Londres", "Madrid", "Roma"],
      "Londres": ["Paris", "Roma", "Madrid"],
      "Paris": []
    },
    interrogatorios: [
      { id: "S4_1", cidade: "Seul", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele comentou sobre um país cuja bandeira possui três faixas horizontais: branca, azul e vermelha." },
      { id: "S4_2", cidade: "Seul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para um país muito frio." },
      { id: "S4_3", cidade: "Seul", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Sim… negociei com ele. Era um homem." },

      { id: "S4_4", cidade: "Moscou", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre um país cuja bandeira possui três cores horizontais: preto, vermelho e amarelo." },
      { id: "S4_5", cidade: "Moscou", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre negociações na Europa." },
      { id: "S4_6", cidade: "Moscou", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele tinha cabelo loiro." },

      { id: "S4_7", cidade: "Berlim", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre um país cuja bandeira possui cruzes sobrepostas." },
      { id: "S4_8", cidade: "Berlim", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre centros financeiros." },
      { id: "S4_9", cidade: "Berlim", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Ele tinha olhos azuis." },

      { id: "S4_10", cidade: "Londres", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele comentou sobre um país cuja bandeira tem três cores verticais." },
      { id: "S4_11", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para uma cidade famosa por arte." },
      { id: "S4_12", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele comentou que joga xadrez." },

      { id: "S4_13", cidade: "Paris", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele passou por aqui." },
      { id: "S4_14", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele esteve aqui hoje." },
      { id: "S4_15", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao centro." }
    ]
  },

  // Cenário 5 — Nômade
  {
    id: "C008_S5",
    suspectId: "023",
    finalCity: "Lisboa",
    spottedAt: ["São Paulo", "Cidade do México", "Nova York", "Lisboa"],
    route: ["Seul", "São Paulo", "Cidade do México", "Nova York", "Lisboa"],
    travelTable: {
      "Seul": ["São Paulo", "Madrid", "Roma"],
      "São Paulo": ["Cidade do México", "Paris", "Roma"],
      "Cidade do México": ["Nova York", "Toronto", "Madrid"],
      "Nova York": ["Lisboa", "Roma", "Madrid"]
    },
    interrogatorios: [
      { id: "S5_1", cidade: "Seul", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentou sobre um país cuja bandeira possui verde, amarelo e azul." },
      { id: "S5_2", cidade: "Seul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para uma cidade gigantesca da América do Sul." },
      { id: "S5_3", cidade: "Seul", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Sim… negociei com essa pessoa. Não era homem nem mulher." },

      { id: "S5_4", cidade: "São Paulo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Comentou sobre um país cuja bandeira tem uma águia com serpente." },
      { id: "S5_5", cidade: "São Paulo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre movimentação urbana intensa." },
      { id: "S5_6", cidade: "São Paulo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Tinha cabelo preto." },

      { id: "S5_7", cidade: "Cidade do México", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Comentou sobre um país cuja bandeira possui muitas estrelas." },
      { id: "S5_8", cidade: "Cidade do México", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre grandes centros urbanos." },
      { id: "S5_9", cidade: "Cidade do México", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Tinha olhos verdes." },

      { id: "S5_10", cidade: "Nova York", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentou sobre um país cuja bandeira tem verde e vermelho." },
      { id: "S5_11", cidade: "Nova York", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que voltaria para a Europa." },
      { id: "S5_12", cidade: "Nova York", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Essa pessoa comentou que pratica parkour." },

      { id: "S5_13", cidade: "Lisboa", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… voltou." },
      { id: "S5_14", cidade: "Lisboa", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Esteve aqui hoje." },
      { id: "S5_15", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao centro." }
    ]
  }
];
