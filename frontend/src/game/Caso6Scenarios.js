export const Caso6Scenarios = [
  // Cenário 1 — Nacre Fox
  {
    id: "C006_S1",
    suspectId: "007",
    finalCity: "Dubai",
    spottedAt: ["Paris", "Londres", "Roma", "Dubai"],
    route: ["Viena", "Paris", "Londres", "Roma", "Dubai"],
    travelTable: {
      "Viena": ["Paris", "Roma", "Madrid"],
      "Paris": ["Londres", "Roma", "Lisboa"],
      "Londres": ["Roma", "Paris", "Madrid"],
      "Roma": ["Dubai", "Cairo", "Madrid"],
      "Dubai": []
    },
    interrogatorios: [
      { id: "S1_1", cidade: "Viena", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Ela comentava sobre um país cuja bandeira possui três cores verticais azul, branco e vermelho." },
      { id: "S1_2", cidade: "Viena", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Disse que iria para uma cidade conhecida por museus e arte." },
      { id: "S1_3", cidade: "Viena", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Sim… lembro dela. Era uma mulher. Perguntou sobre voos para Paris." },

      { id: "S1_4", cidade: "Paris", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela falava sobre um país cuja bandeira possui uma cruz formada por linhas vermelhas." },
      { id: "S1_5", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela tinha cabelo platinado e comentou que iria para uma cidade famosa por leilões." },
      { id: "S1_6", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Disse que iria ver a Monarquia." },

      { id: "S1_7", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela comentou sobre um país cuja bandeira possui três cores verticais: verde, branco e vermelho." },
      { id: "S1_8", cidade: "Londres", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Falava sobre antiguidades de um antigo império." },
      { id: "S1_9", cidade: "Londres", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Sim… lembro dela. Tinha olhos verdes." },

      { id: "S1_10", cidade: "Roma", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela comentou sobre um país cuja bandeira possui quatro cores: verde, branco, preto e vermelho." },
      { id: "S1_11", cidade: "Roma", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Disse que iria para uma cidade muito rica no deserto." },
      { id: "S1_12", cidade: "Roma", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Ela comentou que pratica esgrima." },

      { id: "S1_13", cidade: "Dubai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ela passou por aqui hoje." },
      { id: "S1_14", cidade: "Dubai", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela esteve no restaurante do hotel." },
      { id: "S1_15", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao centro financeiro." }
    ]
  },

  // Cenário 2 — Etiqueta Dourada
  {
    id: "C006_S2",
    suspectId: "019",
    finalCity: "Istambul",
    spottedAt: ["Madrid", "Toronto", "Paris", "Istambul"],
    route: ["Viena", "Madrid", "Toronto", "Paris", "Istambul"],
    travelTable: {
      "Viena": ["Madrid", "Roma", "Paris"],
      "Madrid": ["Toronto", "Paris", "Roma"],
      "Toronto": ["Paris", "Madrid", "Roma"],
      "Paris": ["Istambul", "Roma", "Lisboa"],
      "Istambul": []
    },
    interrogatorios: [
      { id: "S2_1", cidade: "Viena", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ela comentou sobre um país cuja bandeira possui três faixas horizontais vermelho, amarelo e vermelho." },
      { id: "S2_2", cidade: "Viena", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Disse que iria para uma cidade famosa por arte e praças históricas." },
      { id: "S2_3", cidade: "Viena", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Sim… lembro dela. Era uma mulher." },

      { id: "S2_4", cidade: "Madrid", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela comentou sobre um país cuja bandeira possui uma folha no centro." },
      { id: "S2_5", cidade: "Madrid", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Disse que iria para uma cidade moderna da América do Norte." },
      { id: "S2_6", cidade: "Madrid", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela tinha cabelo castanho." },

      { id: "S2_7", cidade: "Toronto", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela comentou sobre um país cuja bandeira tem três cores verticais azul, branco e vermelho." },
      { id: "S2_8", cidade: "Toronto", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre voltar ao mercado de arte europeu." },
      { id: "S2_9", cidade: "Toronto", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela tinha olhos azuis." },

      { id: "S2_10", cidade: "Paris", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ela comentou sobre um país cuja bandeira possui uma lua crescente e uma estrela." },
      { id: "S2_11", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Disse que iria para uma cidade entre Europa e Ásia." },
      { id: "S2_12", cidade: "Paris", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Ela comentou que pratica esgrima." },

      { id: "S2_13", cidade: "Istambul", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ela passou por aqui." },
      { id: "S2_14", cidade: "Istambul", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela esteve aqui hoje." },
      { id: "S2_15", cidade: "Istambul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao centro histórico." }
    ]
  },

  // Cenário 3 — Sombra Digital
  {
    id: "C006_S3",
    suspectId: "011",
    finalCity: "Lisboa",
    spottedAt: ["Londres", "Tóquio", "Dubai", "Lisboa"],
    route: ["Viena", "Londres", "Tóquio", "Dubai", "Lisboa"],
    travelTable: {
      "Viena": ["Londres", "Paris", "Roma"],
      "Londres": ["Tóquio", "Toronto", "Madrid"],
      "Tóquio": ["Dubai", "Roma", "Paris"],
      "Dubai": ["Lisboa", "Madrid", "Roma"],
      "Lisboa": []
    },
    interrogatorios: [
      { id: "S3_1", cidade: "Viena", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele comentou sobre um país cuja bandeira possui uma cruz vermelha." },
      { id: "S3_2", cidade: "Viena", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para uma cidade com muitos bancos." },
      { id: "S3_3", cidade: "Viena", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Era um homem." },

      { id: "S3_4", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele comentou sobre um país cuja bandeira é branca com um círculo vermelho." },
      { id: "S3_5", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para uma cidade tecnológica." },
      { id: "S3_6", cidade: "Londres", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele tinha cabelo preto." },

      { id: "S3_7", cidade: "Tóquio", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre um país cuja bandeira possui quatro cores: verde, branco, preto e vermelho." },
      { id: "S3_8", cidade: "Tóquio", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre criptomoedas e riqueza." },
      { id: "S3_9", cidade: "Tóquio", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele tinha olhos verdes." },

      { id: "S3_10", cidade: "Dubai", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele comentou sobre um país cuja bandeira possui verde e vermelho." },
      { id: "S3_11", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que voltaria para Portugal." },
      { id: "S3_12", cidade: "Dubai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele comentou que gosta muito de comida asiática." },

      { id: "S3_13", cidade: "Lisboa", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele voltou." },
      { id: "S3_14", cidade: "Lisboa", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele esteve aqui hoje." },
      { id: "S3_15", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao centro." }
    ]
  },

  // Cenário 4 — Brass Mantis
  {
    id: "C006_S4",
    suspectId: "003",
    finalCity: "São Paulo",
    spottedAt: ["Roma", "Istambul", "Dubai", "São Paulo"],
    route: ["Viena", "Roma", "Istambul", "Dubai", "São Paulo"],
    travelTable: {
      "Viena": ["Roma", "Paris", "Madrid"],
      "Roma": ["Istambul", "Paris", "Toronto"],
      "Istambul": ["Dubai", "Roma", "Madrid"],
      "Dubai": ["São Paulo", "Lisboa", "Madrid"],
      "São Paulo": []
    },
    interrogatorios: [
      { id: "S4_1", cidade: "Viena", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele comentou sobre um país cuja bandeira possui verde, branco e vermelho." },
      { id: "S4_2", cidade: "Viena", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para uma cidade com história antiga." },
      { id: "S4_3", cidade: "Viena", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Era um homem." },

      { id: "S4_4", cidade: "Roma", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele comentou sobre um país cuja bandeira tem uma lua crescente." },
      { id: "S4_5", cidade: "Roma", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para uma cidade entre continentes." },
      { id: "S4_6", cidade: "Roma", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele tinha cabelo castanho." },

      { id: "S4_7", cidade: "Istambul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre um país cuja bandeira tem quatro cores." },
      { id: "S4_8", cidade: "Istambul", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre transporte de cargas." },
      { id: "S4_9", cidade: "Istambul", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele tinha olhos castanhos." },

      { id: "S4_10", cidade: "Dubai", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele comentou sobre um país cuja bandeira possui verde, amarelo e azul." },
      { id: "S4_11", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para o Brasil." },
      { id: "S4_12", cidade: "Dubai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele comentou que pratica remo." },

      { id: "S4_13", cidade: "São Paulo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele passou por aqui." },
      { id: "S4_14", cidade: "São Paulo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele esteve no restaurante." },
      { id: "S4_15", cidade: "São Paulo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao centro." }
    ]
  },

  // Cenário 5 — Vanta Quill
  {
    id: "C006_S5",
    suspectId: "001",
    finalCity: "Istambul",
    spottedAt: ["Amsterdã", "Thimphu", "Paris", "Istambul"],
    route: ["Viena", "Amsterdã", "Thimphu", "Paris", "Istambul"],
    travelTable: {
      "Viena": ["Amsterdã", "Roma", "Madrid"],
      "Amsterdã": ["Thimphu", "Paris", "Roma"],
      "Thimphu": ["Paris", "Roma", "Toronto"],
      "Paris": ["Istambul", "Madrid", "Lisboa"],
      "Istambul": []
    },
    interrogatorios: [
      { id: "S5_1", cidade: "Viena", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentou sobre um país cuja bandeira possui vermelho, branco e azul em faixas horizontais." },
      { id: "S5_2", cidade: "Viena", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para uma cidade com muitos canais." },
      { id: "S5_3", cidade: "Viena", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Lembro bem… tinha olhos castanhos." },

      { id: "S5_4", cidade: "Amsterdã", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Comentava sobre um país cuja bandeira possui um dragão." },
      { id: "S5_5", cidade: "Amsterdã", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para uma região montanhosa." },
      { id: "S5_6", cidade: "Amsterdã", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Comentou que gosta de xadrez." },

      { id: "S5_7", cidade: "Thimphu", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Comentou sobre um país cuja bandeira tem azul, branco e vermelho." },
      { id: "S5_8", cidade: "Thimphu", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Falava sobre arte e museus." },
      { id: "S5_9", cidade: "Thimphu", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Comentou sobre comida francesa." },

      { id: "S5_10", cidade: "Paris", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentou sobre um país cuja bandeira tem uma lua crescente." },
      { id: "S5_11", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para uma cidade entre continentes." },
      { id: "S5_12", cidade: "Paris", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Lembro bem… era uma pessoa não binária com cabelo platinado." },

      { id: "S5_13", cidade: "Istambul", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… passou por aqui." },
      { id: "S5_14", cidade: "Istambul", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Esteve aqui hoje." },
      { id: "S5_15", cidade: "Istambul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei até o centro." }
    ]
  }
];
