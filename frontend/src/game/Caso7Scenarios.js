export const Caso7Scenarios = [
  // Cenário 1 — Brass Mantis
  {
    id: "C007_S1",
    suspectId: "003",
    finalCity: "Buenos Aires",
    spottedAt: ["Istambul", "Dubai", "Cidade do Cabo", "Buenos Aires"],
    route: ["Lisboa", "Istambul", "Dubai", "Cidade do Cabo", "Buenos Aires"],
    travelTable: {
      "Lisboa": ["Istambul", "Roma", "Madrid"],
      "Istambul": ["Dubai", "Roma", "Toronto"],
      "Dubai": ["Cidade do Cabo", "Roma", "Madrid"],
      "Cidade do Cabo": ["Buenos Aires", "Lisboa", "Roma"],
      "Buenos Aires": []
    },
    interrogatorios: [
      { id: "S1_1", cidade: "Lisboa", local: "Pescador", personagem: "Pescador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Pescador.png", pista: "Ele comentou sobre um país cuja bandeira tem uma lua crescente e uma estrela." },
      { id: "S1_2", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para uma cidade que liga dois continentes." },
      { id: "S1_3", cidade: "Lisboa", local: "Barqueiro", personagem: "Barqueiro", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Barqueiro.png", pista: "Sim… lembro dele. Era um homem." },

      { id: "S1_4", cidade: "Istambul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre um país cuja bandeira tem quatro cores: verde, branco, preto e vermelho." },
      { id: "S1_5", cidade: "Istambul", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre transporte de cargas de alto valor." },
      { id: "S1_6", cidade: "Istambul", local: "Pescador", personagem: "Pescador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Pescador.png", pista: "Ele tinha cabelo castanho." },

      { id: "S1_7", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre um país cuja bandeira tem várias cores e formato incomum." },
      { id: "S1_8", cidade: "Dubai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre rotas marítimas longas." },
      { id: "S1_9", cidade: "Dubai", local: "Barqueiro", personagem: "Barqueiro", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Barqueiro.png", pista: "Ele tinha olhos castanhos." },

      { id: "S1_10", cidade: "Cidade do Cabo", local: "Pescador", personagem: "Pescador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Pescador.png", pista: "Ele comentou sobre um país cuja bandeira possui duas faixas azuis e uma branca com um sol." },
      { id: "S1_11", cidade: "Cidade do Cabo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para a América do Sul." },
      { id: "S1_12", cidade: "Cidade do Cabo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele comentou que pratica remo." },

      { id: "S1_13", cidade: "Buenos Aires", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele passou por aqui." },
      { id: "S1_14", cidade: "Buenos Aires", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele esteve no restaurante do porto." },
      { id: "S1_15", cidade: "Buenos Aires", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao cais." }
    ]
  },

  // Cenário 2 — Maresia
  {
    id: "C007_S2",
    suspectId: "013",
    finalCity: "Roma",
    spottedAt: ["Rio de Janeiro", "Cidade do Cabo", "Lisboa", "Roma"],
    route: ["Lisboa", "Rio de Janeiro", "Cidade do Cabo", "Lisboa", "Roma"],
    travelTable: {
      "Lisboa": ["Rio de Janeiro", "Roma", "Madrid"],
      "Rio de Janeiro": ["Cidade do Cabo", "Lisboa", "Toronto"],
      "Cidade do Cabo": ["Lisboa", "Paris", "Madrid"],
      "Roma": []
    },
    interrogatorios: [
      { id: "S2_1", cidade: "Lisboa", local: "Pescador", personagem: "Pescador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Pescador.png", pista: "Ele comentou sobre um país cuja bandeira possui verde, amarelo e azul." },
      { id: "S2_2", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para uma cidade com praias famosas." },
      { id: "S2_3", cidade: "Lisboa", local: "Barqueiro", personagem: "Barqueiro", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Barqueiro.png", pista: "Era um homem." },

      { id: "S2_4", cidade: "Rio de Janeiro", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre um país cuja bandeira tem muitas cores." },
      { id: "S2_5", cidade: "Rio de Janeiro", local: "Pescador", personagem: "Pescador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Pescador.png", pista: "Falava sobre uma rota longa no oceano." },
      { id: "S2_6", cidade: "Rio de Janeiro", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele tinha cabelo castanho." },

      { id: "S2_7", cidade: "Cidade do Cabo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre um país cuja bandeira tem verde e vermelho." },
      { id: "S2_8", cidade: "Cidade do Cabo", local: "Pescador", personagem: "Pescador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Pescador.png", pista: "Falava sobre voltar para a Europa." },
      { id: "S2_9", cidade: "Cidade do Cabo", local: "Barqueiro", personagem: "Barqueiro", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Barqueiro.png", pista: "Ele tinha olhos castanhos." },

      { id: "S2_10", cidade: "Lisboa", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele comentou sobre um país cuja bandeira tem verde, branco e vermelho." },
      { id: "S2_11", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para uma cidade histórica." },
      { id: "S2_12", cidade: "Lisboa", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele comentou que gosta de comida italiana." },

      { id: "S2_13", cidade: "Roma", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele esteve aqui." },
      { id: "S2_14", cidade: "Roma", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele passou pelo restaurante." },
      { id: "S2_15", cidade: "Roma", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao centro antigo." }
    ]
  },

  // Cenário 3 — Lince
  {
    id: "C007_S3",
    suspectId: "021",
    finalCity: "Rio de Janeiro",
    spottedAt: ["Vancouver", "Tóquio", "Singapura", "Rio de Janeiro"],
    route: ["Lisboa", "Vancouver", "Tóquio", "Singapura", "Rio de Janeiro"],
    travelTable: {
      "Lisboa": ["Vancouver", "Madrid", "Roma"],
      "Vancouver": ["Tóquio", "Paris", "Roma"],
      "Tóquio": ["Singapura", "Roma", "Madrid"],
      "Singapura": ["Rio de Janeiro", "Lisboa", "Roma"],
      "Rio de Janeiro": []
    },
    interrogatorios: [
      { id: "S3_1", cidade: "Lisboa", local: "Pescador", personagem: "Pescador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Pescador.png", pista: "Ele comentou sobre um país cuja bandeira possui uma folha no centro." },
      { id: "S3_2", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para uma cidade com mar e montanhas." },
      { id: "S3_3", cidade: "Lisboa", local: "Barqueiro", personagem: "Barqueiro", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Barqueiro.png", pista: "Era um homem." },

      { id: "S3_4", cidade: "Vancouver", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre um país cuja bandeira é branca com um círculo vermelho." },
      { id: "S3_5", cidade: "Vancouver", local: "Pescador", personagem: "Pescador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Pescador.png", pista: "Falava sobre atravessar o oceano." },
      { id: "S3_6", cidade: "Vancouver", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele tinha cabelo loiro." },

      { id: "S3_7", cidade: "Tóquio", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre um país cuja bandeira tem uma lua crescente e estrelas." },
      { id: "S3_8", cidade: "Tóquio", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre comércio internacional." },
      { id: "S3_9", cidade: "Tóquio", local: "Barqueiro", personagem: "Barqueiro", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Barqueiro.png", pista: "Ele tinha olhos castanhos." },

      { id: "S3_10", cidade: "Singapura", local: "Pescador", personagem: "Pescador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Pescador.png", pista: "Ele comentou sobre um país cuja bandeira tem verde e amarelo." },
      { id: "S3_11", cidade: "Singapura", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para o Brasil." },
      { id: "S3_12", cidade: "Singapura", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele comentou que gosta de frutos do mar." },

      { id: "S3_13", cidade: "Rio de Janeiro", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele passou por aqui." },
      { id: "S3_14", cidade: "Rio de Janeiro", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele esteve no restaurante." },
      { id: "S3_15", cidade: "Rio de Janeiro", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele à orla." }
    ]
  },

  // Cenário 4 — Eco de Ferro
  {
    id: "C007_S4",
    suspectId: "017",
    finalCity: "Istambul",
    spottedAt: ["Cairo", "Dubai", "Lisboa", "Istambul"],
    route: ["Lisboa", "Cairo", "Dubai", "Lisboa", "Istambul"],
    travelTable: {
      "Lisboa": ["Cairo", "Istambul", "Roma"],
      "Cairo": ["Dubai", "Roma", "Lisboa"],
      "Dubai": ["Lisboa", "Madrid", "Roma"],
      "Istambul": []
    },
    interrogatorios: [
      { id: "S4_1", cidade: "Lisboa", local: "Pescador", personagem: "Pescador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Pescador.png", pista: "Ele comentou sobre um país cuja bandeira tem três faixas horizontais com um símbolo dourado." },
      { id: "S4_2", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para o norte da África." },
      { id: "S4_3", cidade: "Lisboa", local: "Barqueiro", personagem: "Barqueiro", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Barqueiro.png", pista: "Era um homem." },

      { id: "S4_4", cidade: "Cairo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre um país cuja bandeira tem quatro cores." },
      { id: "S4_5", cidade: "Cairo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre antiguidades." },
      { id: "S4_6", cidade: "Cairo", local: "Pescador", personagem: "Pescador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Pescador.png", pista: "Ele tinha cabelo preto." },

      { id: "S4_7", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre um país cuja bandeira tem verde e vermelho." },
      { id: "S4_8", cidade: "Dubai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre voltar à Europa." },
      { id: "S4_9", cidade: "Dubai", local: "Barqueiro", personagem: "Barqueiro", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Barqueiro.png", pista: "Ele tinha olhos castanhos." },

      { id: "S4_10", cidade: "Lisboa", local: "Pescador", personagem: "Pescador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Pescador.png", pista: "Ele comentou sobre um país cuja bandeira tem uma lua crescente." },
      { id: "S4_11", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para uma cidade entre continentes." },
      { id: "S4_12", cidade: "Lisboa", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele comentou que gosta de jogar Tenis." },

      { id: "S4_13", cidade: "Istambul", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele passou por aqui." },
      { id: "S4_14", cidade: "Istambul", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele esteve no restaurante." },
      { id: "S4_15", cidade: "Istambul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao centro." }
    ]
  },

  // Cenário 5 — Nômade
  {
    id: "C007_S5",
    suspectId: "023",
    finalCity: "Lisboa",
    spottedAt: ["São Paulo", "Cidade do México", "Nova York", "Lisboa"],
    route: ["Lisboa", "São Paulo", "Cidade do México", "Nova York", "Lisboa"],
    travelTable: {
      "Lisboa": ["São Paulo", "Madrid", "Roma"],
      "São Paulo": ["Cidade do México", "Paris", "Roma"],
      "Cidade do México": ["Nova York", "Toronto", "Madrid"],
      "Nova York": ["Lisboa", "Roma", "Madrid"]
    },
    interrogatorios: [
      { id: "S5_1", cidade: "Lisboa", local: "Pescador", personagem: "Pescador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Pescador.png", pista: "Comentou sobre um país cuja bandeira possui verde, amarelo e azul." },
      { id: "S5_2", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para uma cidade gigantesca na América do Sul." },
      { id: "S5_3", cidade: "Lisboa", local: "Barqueiro", personagem: "Barqueiro", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Barqueiro.png", pista: "Lembro bem… não era homem nem mulher." },

      { id: "S5_4", cidade: "São Paulo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Comentou sobre um país cuja bandeira tem uma águia segurando uma serpente." },
      { id: "S5_5", cidade: "São Paulo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre rotas urbanas e fuga rápida." },
      { id: "S5_6", cidade: "São Paulo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Tinha cabelo preto." },

      { id: "S5_7", cidade: "Cidade do México", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Comentou sobre um país cuja bandeira possui várias estrelas." },
      { id: "S5_8", cidade: "Cidade do México", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre grandes cidades." },
      { id: "S5_9", cidade: "Cidade do México", local: "Pescador", personagem: "Pescador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Pescador.png", pista: "Tinha olhos verdes." },

      { id: "S5_10", cidade: "Nova York", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Comentou sobre um país cuja bandeira tem verde e vermelho." },
      { id: "S5_11", cidade: "Nova York", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre retornar à Europa." },
      { id: "S5_12", cidade: "Nova York", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Comentou que pratica parkour." },

      { id: "S5_13", cidade: "Lisboa", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… voltou." },
      { id: "S5_14", cidade: "Lisboa", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Esteve aqui hoje." },
      { id: "S5_15", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao centro." }
    ]
  }
];
