export const Caso9Scenarios = [
  // Cenário 1 — Blue Rook
  {
    id: "C009_S1",
    suspectId: "005", // Blue Rook (Dimitri Volkov)
    finalCity: "Lisboa",
    spottedAt: ["Londres", "Toronto", "Paris", "Roma", "Viena", "Istambul", "Moscou", "Amsterdã", "Lisboa"],
    route: ["Berlim", "Londres", "Toronto", "Paris", "Roma", "Viena", "Istambul", "Moscou", "Amsterdã", "Lisboa"],
    travelTable: {
      "Berlim": ["Londres", "Roma", "Madrid"],
      "Londres": ["Toronto", "Paris", "Roma"],
      "Toronto": ["Paris", "Madrid", "Istambul"],
      "Paris": ["Roma", "Londres", "Moscou"],
      "Roma": ["Viena", "Paris", "Madrid"],
      "Viena": ["Istambul", "Roma", "Toronto"],
      "Istambul": ["Moscou", "Paris", "Londres"],
      "Moscou": ["Amsterdã", "Roma", "Madrid"],
      "Amsterdã": ["Lisboa", "Paris", "Roma"],
      "Lisboa": []
    },
    interrogatorios: [
      { id: "S1_1", cidade: "Berlim", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele comentou sobre um país cuja bandeira é formada por cruzes sobrepostas em vermelho, branco e azul." },
      { id: "S1_2", cidade: "Berlim", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei essa pessoa ao aeroporto. Disse que iria para uma cidade conhecida por seus relógios famosos, bancos e prédios históricos." },
      { id: "S1_3", cidade: "Berlim", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre uma cidade onde o dinheiro circula rápido e a discrição vale ouro." },

      { id: "S1_4", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Essa pessoa falava sobre um país cuja bandeira tem uma folha no centro." },
      { id: "S1_5", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Era claramente um homem e disse que seguiria para a América do Norte." },
      { id: "S1_6", cidade: "Londres", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Comentou sobre uma cidade moderna, cheia de torres e negócios." },

      { id: "S1_7", cidade: "Toronto", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre um país cuja bandeira tem três faixas verticais azul, branca e vermelha." },
      { id: "S1_8", cidade: "Toronto", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que iria para uma cidade onde arte e prestígio caminham juntos." },
      { id: "S1_9", cidade: "Toronto", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Parecia interessado em um lugar onde o mercado cultural ainda movimenta fortunas." },

      { id: "S1_10", cidade: "Paris", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país cuja bandeira possui verde, branco e vermelho em faixas verticais." },
      { id: "S1_11", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Lembro bem… essa pessoa tinha olhos azuis e falava sobre seguir para uma cidade antiga." },
      { id: "S1_12", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que o próximo destino era uma cidade ligada a um império do passado." },

      { id: "S1_13", cidade: "Roma", local: "Antiquário", personagem: "Antiquário", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Falava sobre um país cuja bandeira possui duas faixas vermelhas com uma branca no meio." },
      { id: "S1_14", cidade: "Roma", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei essa pessoa ao aeroporto. Disse que iria para uma cidade famosa por música, palácios e salões elegantes." },
      { id: "S1_15", cidade: "Roma", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Parecia conhecer bem o circuito de colecionadores e eventos discretos da Europa." },

      { id: "S1_16", cidade: "Viena", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentou sobre um país cuja bandeira traz uma lua crescente e uma estrela branca." },
      { id: "S1_17", cidade: "Viena", local: "Professor", personagem: "Professor", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Professor.png", pista: "Lembro dele. Comentou que gosta muito de xadrez e parecia interessado em seguir para uma cidade entre continentes." },
      { id: "S1_18", cidade: "Viena", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que o próximo destino ficava entre Europa e Ásia." },

      { id: "S1_19", cidade: "Istambul", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Comentava sobre um país cuja bandeira tem três faixas horizontais branca, azul e vermelha." },
      { id: "S1_20", cidade: "Istambul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei essa pessoa ao aeroporto. Disse que seguiria para um lugar frio, de arquitetura pesada e poder antigo." },
      { id: "S1_21", cidade: "Istambul", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava como alguém acostumado a negociar em ambientes tensos." },

      { id: "S1_22", cidade: "Moscou", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentou sobre um país cuja bandeira possui faixas horizontais vermelha, branca e azul." },
      { id: "S1_23", cidade: "Moscou", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Lembro bem… essa pessoa era de origem europeia." },
      { id: "S1_24", cidade: "Moscou", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para uma cidade cheia de canais." },

      { id: "S1_25", cidade: "Amsterdã", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentou sobre um país cuja bandeira possui verde e vermelho." },
      { id: "S1_26", cidade: "Amsterdã", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Disse que voltaria para a Península Ibérica." },
      { id: "S1_27", cidade: "Amsterdã", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Agora eu lembro com certeza… ele tinha cabelo loiro." },

      { id: "S1_28", cidade: "Lisboa", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele passou por aqui hoje." },
      { id: "S1_29", cidade: "Lisboa", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Esteve no restaurante perto do cais." },
      { id: "S1_30", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao centro histórico." }
    ]
  },
  {
    id: "C009_S2",
    suspectId: "004", // Saffron Wisp (Amaya Desai)
    finalCity: "Roma",
    spottedAt: ["Nova Delhi", "Dubai", "Istambul", "Paris", "Viena", "Mumbai", "Singapura", "Londres", "Roma"],
    route: ["Berlim", "Nova Delhi", "Dubai", "Istambul", "Paris", "Viena", "Mumbai", "Singapura", "Londres", "Roma"],
    travelTable: {
      "Berlim": ["Nova Delhi", "Seul", "Istambul"],
      "Nova Delhi": ["Dubai", "Mumbai", "Bangcoc"],
      "Dubai": ["Istambul", "Paris", "Madrid"],
      "Istambul": ["Paris", "Moscou", "Dubai"],
      "Paris": ["Viena", "Moscou", "Londres"],
      "Viena": ["Mumbai", "Paris", "Dubai"],
      "Mumbai": ["Singapura", "Dubai", "Nova Delhi"],
      "Singapura": ["Londres", "Mumbai", "Bangcoc"],
      "Londres": ["Roma", "Paris", "Madrid"],
      "Roma": []
    },
    interrogatorios: [
      { id: "S2_1", cidade: "Berlim", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ela comentou sobre um país cuja bandeira possui três cores horizontais com um símbolo no centro." },
      { id: "S2_2", cidade: "Berlim", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei essa pessoa ao aeroporto. Disse que iria para um país muito populoso do sul da Ásia." },
      { id: "S2_3", cidade: "Berlim", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre rotas comerciais antigas e mercados intensos." },

      { id: "S2_4", cidade: "Nova Delhi", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja bandeira possui verde, branco, preto e vermelho." },
      { id: "S2_5", cidade: "Nova Delhi", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Era claramente uma mulher." },
      { id: "S2_6", cidade: "Nova Delhi", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Falava sobre uma cidade rica e moderna no deserto." },

      { id: "S2_7", cidade: "Dubai", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Comentava sobre um país cuja bandeira possui lua crescente e estrela branca." },
      { id: "S2_8", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto." },
      { id: "S2_9", cidade: "Dubai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Parecia alguém acostumada a negociar com discrição." },

      { id: "S2_10", cidade: "Istambul", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país cuja bandeira azul, branca e vermelha." },
      { id: "S2_11", cidade: "Istambul", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Lembro dela… tinha olhos pretos." },
      { id: "S2_12", cidade: "Istambul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S2_13", cidade: "Paris", local: "Antiquário", personagem: "Antiquário", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Falava sobre um país com bandeira vermelho, branco e vermelho." },
      { id: "S2_14", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S2_15", cidade: "Paris", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Parecia envolvida com objetos pequenos." },

      { id: "S2_16", cidade: "Viena", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país com três cores laranja, branco e verde." },
      { id: "S2_17", cidade: "Viena", local: "Professor", personagem: "Professor", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Professor.png", pista: "Ela comentou que gosta muito de comida apimentada." },
      { id: "S2_18", cidade: "Viena", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S2_19", cidade: "Mumbai", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Comentava sobre um país com lua crescente e estrelas." },
      { id: "S2_20", cidade: "Mumbai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S2_21", cidade: "Mumbai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Parecia acostumada com trocas rápidas." },

      { id: "S2_22", cidade: "Singapura", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país com cruzes na bandeira." },
      { id: "S2_23", cidade: "Singapura", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Lembro dela… era de origem asiática." },
      { id: "S2_24", cidade: "Singapura", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S2_25", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país com bandeira verde, branca e vermelha." },
      { id: "S2_26", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S2_27", cidade: "Londres", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Agora lembro claramente… ela tinha cabelo castanho." },

      { id: "S2_28", cidade: "Roma", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ela passou por aqui." },
      { id: "S2_29", cidade: "Roma", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Esteve no restaurante." },
      { id: "S2_30", cidade: "Roma", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao centro." }
    ]
  },
  // Cenário 3 — Echo Lark
  {
    id: "C009_S3",
    suspectId: "010", // Echo Lark (Laila Kwon)
    finalCity: "Roma",
    spottedAt: ["Tóquio", "Pequim", "Bangcoc", "Mumbai", "Dubai", "Istambul", "Paris", "Londres", "Roma"],
    route: ["Berlim", "Tóquio", "Pequim", "Bangcoc", "Mumbai", "Dubai", "Istambul", "Paris", "Londres", "Roma"],
    travelTable: {
      "Berlim": ["Tóquio", "Pequim", "Bangcoc"],
      "Tóquio": ["Pequim", "Seul", "Bangcoc"],
      "Pequim": ["Bangcoc", "Singapura", "Mumbai"],
      "Bangcoc": ["Mumbai", "Singapura", "Dubai"],
      "Mumbai": ["Dubai", "Paris", "Pequim"],
      "Dubai": ["Istambul", "Paris", "Madrid"],
      "Istambul": ["Paris", "Moscou", "Madrid"],
      "Paris": ["Londres", "Lisboa", "Madrid"],
      "Londres": ["Roma", "Madrid", "Paris"],
      "Roma": []
    },
    interrogatorios: [
      { id: "S3_1", cidade: "Berlim", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ela comentou sobre um país cuja bandeira é branca com um círculo vermelho no centro." },
      { id: "S3_2", cidade: "Berlim", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para um país vizinho." },
      { id: "S3_3", cidade: "Berlim", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre uma cidade extremamente tecnológica." },

      { id: "S3_4", cidade: "Tóquio", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja bandeira é vermelha com estrelas." },
      { id: "S3_5", cidade: "Tóquio", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Era uma mulher." },
      { id: "S3_6", cidade: "Tóquio", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Falava sobre uma cidade muito populosa." },

      { id: "S3_7", cidade: "Pequim", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Comentava sobre um país cuja bandeira possui listras e um símbolo central." },
      { id: "S3_8", cidade: "Pequim", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S3_9", cidade: "Pequim", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Parecia acostumada a lidar com pessoas." },

      { id: "S3_10", cidade: "Bangcoc", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país cuja bandeira possui três cores horizontais." },
      { id: "S3_11", cidade: "Bangcoc", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Lembro dela… tinha cabelo preto." },
      { id: "S3_12", cidade: "Bangcoc", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S3_13", cidade: "Mumbai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país com quatro cores na bandeira." },
      { id: "S3_14", cidade: "Mumbai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S3_15", cidade: "Mumbai", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre negócios rápidos." },

      { id: "S3_16", cidade: "Dubai", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país cuja bandeira tem lua crescente." },
      { id: "S3_17", cidade: "Dubai", local: "Professor", personagem: "Professor", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Professor.png", pista: "Ela tinha olhos pretos." },
      { id: "S3_18", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S3_19", cidade: "Istambul", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Comentava sobre um país cuja bandeira possui azul, branco e vermelho." },
      { id: "S3_20", cidade: "Istambul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S3_21", cidade: "Istambul", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Parecia muito observadora." },

      { id: "S3_22", cidade: "Paris", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país cuja bandeira tem cruzes." },
      { id: "S3_23", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela comentou que gosta de comida asiática." },
      { id: "S3_24", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S3_25", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país com bandeira verde, branca e vermelha." },
      { id: "S3_26", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S3_27", cidade: "Londres", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Agora lembro bem… ela comentou que pratica tênis." },

      { id: "S3_28", cidade: "Roma", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ela passou por aqui hoje." },
      { id: "S3_29", cidade: "Roma", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Esteve no restaurante próximo ao centro." },
      { id: "S3_30", cidade: "Roma", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela até a região histórica." }
    ]
  },
  // Cenário 4 — Sand Helix
  {
    id: "C009_S4",
    suspectId: "013", // Sand Helix (Hassan Al-Rashid)
    finalCity: "Dubai",
    spottedAt: ["Dubai", "Istambul", "Roma", "Paris", "Lisboa", "Madrid", "Trípoli", "Cairo", "Dubai"],
    route: ["Berlim", "Dubai", "Istambul", "Roma", "Paris", "Lisboa", "Madrid", "Trípoli", "Cairo", "Dubai"],
    travelTable: {
      "Berlim": ["Dubai", "Roma", "Madrid"],
      "Dubai": ["Istambul", "Roma", "Cairo"],
      "Istambul": ["Roma", "Paris", "Moscou"],
      "Roma": ["Paris", "Lisboa", "Londres"],
      "Paris": ["Lisboa", "Madrid", "Roma"],
      "Lisboa": ["Madrid", "Paris", "Trípoli"],
      "Madrid": ["Trípoli", "Lisboa", "Paris"],
      "Trípoli": ["Cairo", "Lisboa", "Madrid"],
      "Cairo": ["Dubai", "Trípoli", "Istambul"],
      "Dubai": ["Istambul", "Roma", "Cairo"]
    },
    interrogatorios: [
      { id: "S4_1", cidade: "Berlim", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele comentou sobre um país cuja bandeira possui verde, branco, preto e vermelho." },
      { id: "S4_2", cidade: "Berlim", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para uma cidade muito rica no deserto." },
      { id: "S4_3", cidade: "Berlim", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre objetos antigos e valiosos." },

      { id: "S4_4", cidade: "Dubai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja bandeira possui lua crescente e estrela." },
      { id: "S4_5", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Era claramente um homem." },
      { id: "S4_6", cidade: "Dubai", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Falava sobre uma cidade entre continentes." },

      { id: "S4_7", cidade: "Istambul", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país cuja bandeira possui verde, branco e vermelho." },
      { id: "S4_8", cidade: "Istambul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S4_9", cidade: "Istambul", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava como alguém que entende de história." },

      { id: "S4_10", cidade: "Roma", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja bandeira possui azul, branco e vermelho." },
      { id: "S4_11", cidade: "Roma", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Lembro dele… tinha cabelo preto." },
      { id: "S4_12", cidade: "Roma", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S4_13", cidade: "Paris", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país cuja bandeira possui verde e vermelho." },
      { id: "S4_14", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S4_15", cidade: "Paris", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Parecia alguém envolvido com antiguidades." },

      { id: "S4_16", cidade: "Lisboa", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja bandeira possui vermelho e amarelo." },
      { id: "S4_17", cidade: "Lisboa", local: "Professor", personagem: "Professor", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Professor.png", pista: "Ele tinha olhos castanhos." },
      { id: "S4_18", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S4_19", cidade: "Madrid", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país do norte da África." },
      { id: "S4_20", cidade: "Madrid", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S4_21", cidade: "Madrid", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre rotas discretas." },

      { id: "S4_22", cidade: "Trípoli", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja bandeira possui três cores horizontais." },
      { id: "S4_23", cidade: "Trípoli", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele comentou que gosta de comida árabe." },
      { id: "S4_24", cidade: "Trípoli", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S4_25", cidade: "Cairo", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país do Oriente Médio." },
      { id: "S4_26", cidade: "Cairo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S4_27", cidade: "Cairo", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Agora lembro… ele era do Oriente Médio." },

      { id: "S4_28", cidade: "Dubai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele passou por aqui hoje." },
      { id: "S4_29", cidade: "Dubai", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Esteve no restaurante do hotel." },
      { id: "S4_30", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao centro." }
    ]
  },
  // Cenário 5 — Doutor Marfim
  {
    id: "C009_S5",
    suspectId: "018", // Doutor Marfim (Henrik Stahl)
    finalCity: "Zurique",
    spottedAt: ["Rio de Janeiro", "Moscou", "Londres", "Paris", "Roma", "Madrid", "Amsterdã", "Viena", "Zurique"],
    route: ["Berlim", "Rio de Janeiro", "Moscou", "Londres", "Paris", "Roma", "Madrid", "Amsterdã", "Viena", "Zurique"],
    travelTable: {
      "Berlim": ["Rio de Janeiro", "Londres", "Moscou"],
      "Rio de Janeiro": ["Moscou", "Lisboa", "Nova York"],
      "Moscou": ["Londres", "Berlim", "Roma"],
      "Londres": ["Paris", "Roma", "Toronto"],
      "Paris": ["Roma", "Viena", "Lisboa"],
      "Roma": ["Madrid", "Paris", "Viena"],
      "Madrid": ["Amsterdã", "Roma", "Lisboa"],
      "Amsterdã": ["Viena", "Paris", "Roma"],
      "Viena": ["Zurique", "Roma", "Toronto"],
      "Zurique": []
    },
    interrogatorios: [
      { id: "S5_1", cidade: "Berlim", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele comentou sobre um país cuja bandeira possui verde, amarelo e azul com um losango central." },
      { id: "S5_2", cidade: "Berlim", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para uma cidade costeira muito famosa." },
      { id: "S5_3", cidade: "Berlim", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre uma cidade vibrante, cheia de cultura e movimento." },

      { id: "S5_4", cidade: "Rio de Janeiro", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja bandeira possui três faixas horizontais branca, azul e vermelha." },
      { id: "S5_5", cidade: "Rio de Janeiro", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Era claramente um homem." },
      { id: "S5_6", cidade: "Rio de Janeiro", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Falava sobre um lugar muito frio e imponente." },

      { id: "S5_7", cidade: "Moscou", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país cuja bandeira possui cruzes sobrepostas." },
      { id: "S5_8", cidade: "Moscou", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S5_9", cidade: "Moscou", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava de controle e precisão." },

      { id: "S5_10", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja bandeira possui azul, branco e vermelho." },
      { id: "S5_11", cidade: "Londres", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Lembro dele… tinha cabelo platinado." },
      { id: "S5_12", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S5_13", cidade: "Paris", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país cuja bandeira possui verde, branco e vermelho." },
      { id: "S5_14", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S5_15", cidade: "Paris", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava como alguém extremamente metódico." },

      { id: "S5_16", cidade: "Roma", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja bandeira possui vermelho e amarelo." },
      { id: "S5_17", cidade: "Roma", local: "Professor", personagem: "Professor", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Professor.png", pista: "Ele tinha olhos azuis." },
      { id: "S5_18", cidade: "Roma", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S5_19", cidade: "Madrid", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país cuja bandeira possui faixas vermelha, branca e azul." },
      { id: "S5_20", cidade: "Madrid", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S5_21", cidade: "Madrid", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava com extrema precisão." },

      { id: "S5_22", cidade: "Amsterdã", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país europeu central." },
      { id: "S5_23", cidade: "Amsterdã", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Lembro dele… era da Europa." },
      { id: "S5_24", cidade: "Amsterdã", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S5_25", cidade: "Viena", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país europeu neutro e organizado." },
      { id: "S5_26", cidade: "Viena", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S5_27", cidade: "Viena", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Agora tenho certeza… ele comentou que joga xadrez." },

      { id: "S5_28", cidade: "Zurique", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele passou por aqui hoje." },
      { id: "S5_29", cidade: "Zurique", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Esteve no restaurante do centro." },
      { id: "S5_30", cidade: "Zurique", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao distrito financeiro." }
    ]
  }
];
