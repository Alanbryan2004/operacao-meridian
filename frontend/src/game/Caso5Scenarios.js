export const Caso5Scenarios = [
  // Cenário 1 — Sand Helix
  {
    id: "C005_S1",
    suspectId: "008",
    finalCity: "Trípoli",
    spottedAt: ["Cairo", "Istambul", "Dubai", "Trípoli"],
    route: ["Lisboa", "Cairo", "Istambul", "Dubai", "Trípoli"],
    travelTable: {
      "Lisboa": ["Roma", "Cairo", "Madrid"],
      "Cairo": ["Istambul", "Lisboa", "Berlim"],
      "Istambul": ["Dubai", "Roma", "Toronto"],
      "Dubai": ["Trípoli", "Madrid", "Lisboa"],
      "Trípoli": []
    },
    interrogatorios: [
      { id: "S1_1", cidade: "Lisboa", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele analisava mapas antigos e comentou sobre um país cuja bandeira possui três cores horizontais com um símbolo dourado no centro." },
      { id: "S1_2", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para um país conhecido por um grande rio que atravessa um enorme deserto." },
      { id: "S1_3", cidade: "Lisboa", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Sim, lembro dele. Era um homem. Perguntou sobre voos para um país que faz fronteira com Israel, Sudão e Líbia." },

      { id: "S1_4", cidade: "Cairo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele falava sobre um país cuja bandeira tem uma lua crescente e uma estrela branca." },
      { id: "S1_5", cidade: "Cairo", local: "Hotel", personagem: "Camareira", imgLocal: "/NPC/Hotel.png", imgPersonagem: "/NPC/Camareira.png", pista: "Vi ele no hotel. Tinha cabelo preto e perguntava sobre voos para uma cidade que liga dois continentes." },
      { id: "S1_6", cidade: "Cairo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que seu próximo destino ficava entre a Europa e a Ásia." },

      { id: "S1_7", cidade: "Istambul", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Ele comentava sobre viajar para um país cuja bandeira possui quatro cores: verde, branco, preto e vermelho." },
      { id: "S1_8", cidade: "Istambul", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Estava olhando livros sobre cidades ricas construídas no deserto." },
      { id: "S1_9", cidade: "Istambul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Tinha olhos castanhos e disse que iria para uma cidade moderna no deserto." },

      { id: "S1_10", cidade: "Dubai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele comentou que o país para onde iria tem uma bandeira completamente verde." },
      { id: "S1_11", cidade: "Dubai", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Ele falou sobre viajar para uma cidade histórica do norte da África." },
      { id: "S1_12", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Ele comentou que gosta muito de polo." },

      { id: "S1_13", cidade: "Trípoli", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim... ele passou por aqui hoje." },
      { id: "S1_14", cidade: "Trípoli", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele esteve no restaurante do porto." },
      { id: "S1_15", cidade: "Trípoli", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao centro histórico." }
    ]
  },

  // Cenário 2 — Nacre Fox
  {
    id: "C005_S2",
    suspectId: "007",
    finalCity: "Cairo",
    spottedAt: ["Viena", "Toronto", "Paris", "Cairo"],
    route: ["Lisboa", "Viena", "Toronto", "Paris", "Cairo"],
    travelTable: {
      "Lisboa": ["Roma", "Viena", "Paris"],
      "Viena": ["Toronto", "Madrid", "Istambul"],
      "Toronto": ["Paris", "Roma", "Lisboa"],
      "Paris": ["Cairo", "Roma", "Madrid"],
      "Cairo": []
    },
    interrogatorios: [
      { id: "S2_1", cidade: "Lisboa", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Ela comentava sobre um país cuja bandeira possui duas faixas vermelhas com uma faixa branca no meio." },
      { id: "S2_2", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Disse que iria para um país no centro da Europa que faz fronteira com Alemanha, Hungria e Itália." },
      { id: "S2_3", cidade: "Lisboa", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Sim... lembro dela. Era uma mulher. Perguntou sobre voos para uma cidade famosa por ópera e palácios imperiais." },

      { id: "S2_4", cidade: "Viena", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Ela falava sobre viajar para um país cuja bandeira tem uma folha vermelha no centro." },
      { id: "S2_5", cidade: "Viena", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela tinha cabelo platinado e comentou que iria para uma cidade muito moderna na América do Norte." },
      { id: "S2_6", cidade: "Viena", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Disse que visitaria uma cidade conhecida por uma torre altíssima." },

      { id: "S2_7", cidade: "Toronto", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela comentou sobre viajar para um país cuja bandeira tem três cores verticais: azul, branco e vermelho." },
      { id: "S2_8", cidade: "Toronto", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre visitar uma cidade conhecida por museus e galerias de arte famosas." },
      { id: "S2_9", cidade: "Toronto", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Sim, lembro dela. Tinha olhos verdes e estava falando sobre viajar para Paris." },

      { id: "S2_10", cidade: "Paris", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ela comentava sobre um país cuja bandeira possui três cores horizontais com uma águia dourada no centro." },
      { id: "S2_11", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Disse que seu próximo destino ficava no norte da África." },
      { id: "S2_12", cidade: "Paris", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Ela comentou que pratica esgrima e estava interessada em antiguidades egípcias." },

      { id: "S2_13", cidade: "Cairo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim... ela passou por aqui hoje." },
      { id: "S2_14", cidade: "Cairo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela esteve no restaurante perto do museu." },
      { id: "S2_15", cidade: "Cairo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela até o distrito histórico." }
    ]
  },

  // Cenário 3 — Velvet Circuit
  {
    id: "C005_S3",
    suspectId: "009",
    finalCity: "Buenos Aires",
    spottedAt: ["Cidade do México", "Tóquio", "Vancouver", "Buenos Aires"],
    route: ["Lisboa", "Cidade do México", "Tóquio", "Vancouver", "Buenos Aires"],
    travelTable: {
      "Lisboa": ["Cidade do México", "Madrid", "Roma"],
      "Cidade do México": ["Tóquio", "Lisboa", "Berlim"],
      "Tóquio": ["Vancouver", "Paris", "Roma"],
      "Vancouver": ["Buenos Aires", "Madrid", "Lisboa"],
      "Buenos Aires": []
    },
    interrogatorios: [
      { id: "S3_1", cidade: "Lisboa", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ela comentava sobre um país cuja bandeira possui três faixas verticais e um brasão com uma águia segurando uma serpente." },
      { id: "S3_2", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Disse que iria para um país ao sul dos Estados Unidos." },
      { id: "S3_3", cidade: "Lisboa", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Sim... lembro dela. Era uma mulher. Perguntou sobre voos para uma grande cidade histórica da América." },

      { id: "S3_4", cidade: "Cidade do México", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela falava sobre um país cuja bandeira é branca com um círculo vermelho no centro." },
      { id: "S3_5", cidade: "Cidade do México", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Comentou que iria para uma cidade muito tecnológica da Ásia." },
      { id: "S3_6", cidade: "Cidade do México", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Sim, lembro dela. Tinha cabelo ruivo e estava perguntando sobre voos para Tóquio." },

      { id: "S3_7", cidade: "Tóquio", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela comentou sobre um país cuja bandeira tem uma folha vermelha no centro." },
      { id: "S3_8", cidade: "Tóquio", local: "Morador de Rua", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png", pista: "Falava sobre uma cidade canadense cercada por montanhas e mar." },
      { id: "S3_9", cidade: "Tóquio", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Ela comentou que gosta muito de skate e que iria para Vancouver." },

      { id: "S3_10", cidade: "Vancouver", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela falava sobre um país cuja bandeira possui três faixas horizontais azul, branca e azul com um sol dourado no centro." },
      { id: "S3_11", cidade: "Vancouver", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Disse que iria para uma cidade famosa pelo tango." },
      { id: "S3_12", cidade: "Vancouver", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Sim, lembro dela. Tinha olhos verdes." },

      { id: "S3_13", cidade: "Buenos Aires", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela até o centro histórico." },
      { id: "S3_14", cidade: "Buenos Aires", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela esteve aqui recentemente." },
      { id: "S3_15", cidade: "Buenos Aires", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim... ela passou por aqui hoje." }
    ]
  },

  // Cenário 4 — Blue Rook
  {
    id: "C005_S4",
    suspectId: "005",
    finalCity: "Paris",
    spottedAt: ["Moscou", "Pequim", "Roma", "Paris"],
    route: ["Lisboa", "Moscou", "Pequim", "Roma", "Paris"],
    travelTable: {
      "Lisboa": ["Moscou", "Roma", "Madrid"],
      "Moscou": ["Pequim", "Toronto", "Londres"],
      "Pequim": ["Roma", "Lisboa", "Istambul"],
      "Roma": ["Paris", "Madrid", "Lisboa"],
      "Paris": []
    },
    interrogatorios: [
      { id: "S4_1", cidade: "Lisboa", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele comentou sobre um país cuja bandeira possui três faixas horizontais: branca, azul e vermelha." },
      { id: "S4_2", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para um país que faz fronteira com mais de dez outros países." },
      { id: "S4_3", cidade: "Lisboa", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Sim, lembro dele. Era um homem e estava perguntando sobre voos para um País Gelado." },

      { id: "S4_4", cidade: "Moscou", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele falava sobre viajar para um país cuja bandeira é vermelha com cinco estrelas amarelas." },
      { id: "S4_5", cidade: "Moscou", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentou que iria visitar uma cidade muito antiga do leste asiático." },
      { id: "S4_6", cidade: "Moscou", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Sim... lembro dele. Tinha olhos azuis." },

      { id: "S4_7", cidade: "Pequim", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Ele mencionou um país cuja bandeira possui três cores verticais: verde, branco e vermelho." },
      { id: "S4_8", cidade: "Pequim", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Falava sobre visitar uma cidade famosa por um antigo império e monumentos históricos." },
      { id: "S4_9", cidade: "Pequim", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Sim, lembro dele. Tinha cabelo loiro." },

      { id: "S4_10", cidade: "Roma", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele comentou sobre um país cuja bandeira possui três cores verticais: azul, branco e vermelho." },
      { id: "S4_11", cidade: "Roma", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para uma cidade famosa por arte, museus e gastronomia." },
      { id: "S4_12", cidade: "Roma", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Ele mencionou que gosta muito de xadrez." },

      { id: "S4_13", cidade: "Paris", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim... ele passou por aqui hoje." },
      { id: "S4_14", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele esteve no restaurante perto do museu." },
      { id: "S4_15", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao centro da cidade." }
    ]
  },

  // Cenário 5 — Vanta Quill
  {
    id: "C005_S5",
    suspectId: "001",
    finalCity: "Istambul",
    spottedAt: ["Amsterdã", "Thimphu", "Paris", "Istambul"],
    route: ["Lisboa", "Amsterdã", "Thimphu", "Paris", "Istambul"],
    travelTable: {
      "Lisboa": ["Amsterdã", "Roma", "Madrid"],
      "Amsterdã": ["Thimphu", "Lisboa", "Paris"],
      "Thimphu": ["Paris", "Roma", "Toronto"],
      "Paris": ["Istambul", "Madrid", "Lisboa"],
      "Istambul": []
    },
    interrogatorios: [
      { id: "S5_1", cidade: "Lisboa", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele comentava sobre um país cuja bandeira possui três faixas horizontais: vermelho, branco e azul." },
      { id: "S5_2", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para um país famoso por canais e muitas bicicletas." },
      { id: "S5_3", cidade: "Lisboa", local: "Antiguidade", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png", pista: "Sim, lembro dele. Era apaixonado por Comida Francesa e perguntava sobre voos para Amsterdã." },

      { id: "S5_4", cidade: "Amsterdã", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele comentava sobre um país cuja bandeira possui um dragão branco no centro." },
      { id: "S5_5", cidade: "Amsterdã", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Falava sobre visitar um país montanhoso no Himalaia." },
      { id: "S5_6", cidade: "Amsterdã", local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png", pista: "Ele mencionou que gosta muito de xadrez." },

      { id: "S5_7", cidade: "Thimphu", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ele comentou sobre um país cuja bandeira possui três cores verticais azul, branco e vermelho." },
      { id: "S5_8", cidade: "Thimphu", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Falava sobre visitar uma cidade famosa por arte, museus e história." },
      { id: "S5_9", cidade: "Thimphu", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Tinha Cabelos Platinado e comentou que sentia falta de comida francesa" },

      { id: "S5_10", cidade: "Paris", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele comentou sobre um país cuja bandeira possui uma lua crescente e uma estrela branca." },
      { id: "S5_11", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para uma cidade que liga Europa e Ásia." },
      { id: "S5_12", cidade: "Paris", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Lembro bem... a pessoa era não binária e tinha cabelo platinado." },

      { id: "S5_13", cidade: "Istambul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele até o mercado antigo." },
      { id: "S5_14", cidade: "Istambul", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele esteve aqui hoje." },
      { id: "S5_15", cidade: "Istambul", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim... ele passou por aqui recentemente." }
    ]
  }
];