export const Caso10Scenarios = [
  // Cenário 1 — Sombra Digital
  {
    id: "C010_S1",
    suspectId: "011", // Sombra Digital (Rafael Ionescu)
    finalCity: "Berlim",
    spottedAt: ["Londres", "Dubai", "Mumbai", "Bangcoc", "Pequim", "Seul", "Tóquio", "Vancouver", "Roma", "Berlim"],
    route: ["Londres", "Dubai", "Mumbai", "Bangcoc", "Pequim", "Seul", "Tóquio", "Vancouver", "Roma", "Berlim"],
    travelTable: {
      "Londres": ["Dubai", "Paris", "Roma"],
      "Dubai": ["Mumbai", "Cairo", "Istambul"],
      "Mumbai": ["Bangcoc", "Tóquio", "Seul"],
      "Bangcoc": ["Pequim", "Dubai", "Roma"],
      "Pequim": ["Seul", "Tóquio", "Istambul"],
      "Seul": ["Tóquio", "Bangcoc", "Mumbai"],
      "Tóquio": ["Vancouver", "Toronto", "Nova York"],
      "Vancouver": ["Roma", "Paris", "Lisboa"],
      "Roma": ["Berlim", "Madrid", "Viena"],
      "Berlim": []
    },
    interrogatorios: [
      { id: "S1_1", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele falava sobre um país cuja moeda é o dirham." },
      { id: "S1_2", cidade: "Londres", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Comentava sobre uma cidade extremamente quente e luxuosa." },
      { id: "S1_3", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para uma cidade no deserto cheia de arranha-céus." },

      { id: "S1_4", cidade: "Dubai", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Era um homem." },
      { id: "S1_5", cidade: "Dubai", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele comentou sobre um país onde a moeda é a rúpia." },
      { id: "S1_6", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Falava sobre uma cidade muito populosa e movimentada." },

      { id: "S1_7", cidade: "Mumbai", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Comentava sobre um país onde a comida é muito apimentada e de rua." },
      { id: "S1_8", cidade: "Mumbai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S1_9", cidade: "Mumbai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre uma moeda chamada baht." },

      { id: "S1_10", cidade: "Bangcoc", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país com bandeira vermelha e estrelas." },
      { id: "S1_11", cidade: "Bangcoc", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Lembro bem… tinha cabelo preto." },
      { id: "S1_12", cidade: "Bangcoc", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Falava sobre uma cidade com clima mais frio que aqui." },

      { id: "S1_13", cidade: "Pequim", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja moeda é o won." },
      { id: "S1_14", cidade: "Pequim", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre tecnologia e cidades modernas." },
      { id: "S1_15", cidade: "Pequim", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S1_16", cidade: "Seul", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país com bandeira branca e círculo vermelho." },
      { id: "S1_17", cidade: "Seul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S1_18", cidade: "Seul", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele comentou que gosta de comida asiática." },

      { id: "S1_19", cidade: "Tóquio", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Comentava sobre um país com clima frio e natureza." },
      { id: "S1_20", cidade: "Tóquio", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre dólar canadense." },
      { id: "S1_21", cidade: "Tóquio", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S1_22", cidade: "Vancouver", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país europeu com uma longa história imperial." },
      { id: "S1_23", cidade: "Vancouver", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre uma cidade cheia de monumentos antigos e cultura clássica." },
      { id: "S1_24", cidade: "Vancouver", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para um país cuja bandeira possui verde, branco e vermelho." },

      { id: "S1_25", cidade: "Roma", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país europeu com forte economia." },
      { id: "S1_26", cidade: "Roma", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S1_27", cidade: "Roma", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Agora tenho certeza… ele tinha olhos verdes." },

      { id: "S1_28", cidade: "Berlim", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele passou por aqui." },
      { id: "S1_29", cidade: "Berlim", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Esteve no restaurante hoje." },
      { id: "S1_30", cidade: "Berlim", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao centro financeiro." }
    ]
  },
  // Cenário 2 — Eco de Ferro
  {
    id: "C010_S2",
    suspectId: "017", // Eco de Ferro (Lucas Andrade)
    finalCity: "Rio de Janeiro",
    spottedAt: ["Londres", "Cairo", "Dubai", "Istambul", "Roma", "Paris", "Trípoli", "Madrid", "São Paulo", "Rio de Janeiro"],
    route: ["Londres", "Cairo", "Dubai", "Istambul", "Roma", "Paris", "Trípoli", "Madrid", "São Paulo", "Rio de Janeiro"],
    travelTable: {
      "Londres": ["Cairo", "Dubai", "Roma"],
      "Cairo": ["Dubai", "Istambul", "Paris"],
      "Dubai": ["Istambul", "Roma", "Mumbai"],
      "Istambul": ["Roma", "Paris", "Berlim"],
      "Roma": ["Paris", "Madrid", "Lisboa"],
      "Paris": ["Trípoli", "Cairo", "Dubai"],
      "Trípoli": ["Madrid", "Roma", "Lisboa"],
      "Madrid": ["São Paulo", "Buenos Aires", "Lisboa"],
      "São Paulo": ["Rio de Janeiro", "Salvador", "Buenos Aires"],
      "Rio de Janeiro": []
    },
    interrogatorios: [
      { id: "S2_1", cidade: "Londres", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Ele falava sobre um país cuja moeda é a libra egípcia." },
      { id: "S2_2", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para um lugar cheio de desertos e história antiga." },
      { id: "S2_3", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país com uma das civilizações mais antigas do mundo." },

      { id: "S2_4", cidade: "Cairo", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país cuja moeda é o dirham." },
      { id: "S2_5", cidade: "Cairo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Era claramente um homem." },
      { id: "S2_6", cidade: "Cairo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Falava sobre uma cidade muito rica e moderna no deserto." },

      { id: "S2_7", cidade: "Dubai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja bandeira possui lua crescente e estrela." },
      { id: "S2_8", cidade: "Dubai", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre uma cidade entre dois continentes." },
      { id: "S2_9", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S2_10", cidade: "Istambul", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Lembro dele… tinha cabelo preto." },
      { id: "S2_11", cidade: "Istambul", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país cuja bandeira possui verde, branco e vermelho." },
      { id: "S2_12", cidade: "Istambul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S2_13", cidade: "Roma", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja moeda é o euro e muito ligado à arte." },
      { id: "S2_14", cidade: "Roma", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S2_15", cidade: "Roma", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre antiguidades e peças históricas." },

      { id: "S2_16", cidade: "Paris", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país do norte da África." },
      { id: "S2_17", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S2_18", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele comentou que gosta de comida árabe." },

      { id: "S2_19", cidade: "Trípoli", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja bandeira possui vermelho e amarelo." },
      { id: "S2_20", cidade: "Trípoli", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S2_21", cidade: "Trípoli", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre rotas discretas e negociações silenciosas." },

      { id: "S2_22", cidade: "Madrid", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país da América do Sul." },
      { id: "S2_23", cidade: "Madrid", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre uma cidade grande e cheia de oportunidades." },
      { id: "S2_24", cidade: "Madrid", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para um país cuja bandeira possui verde, amarelo e azul." },

      { id: "S2_25", cidade: "São Paulo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre uma cidade turística e costeira." },
      { id: "S2_26", cidade: "São Paulo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S2_27", cidade: "São Paulo", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Agora tenho certeza… ele era da América Latina." },

      { id: "S2_28", cidade: "Rio de Janeiro", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele passou por aqui hoje." },
      { id: "S2_29", cidade: "Rio de Janeiro", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Esteve no restaurante perto da praia." },
      { id: "S2_30", cidade: "Rio de Janeiro", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao centro." }
    ]
  },
  // Cenário 3 — Fio Sombrio
  {
    id: "C010_S3",
    suspectId: "016", // Fio Sombrio (Nadia Rahman)
    finalCity: "Roma",
    spottedAt: ["Londres", "Seul", "Tóquio", "Bangcoc", "Mumbai", "Dubai", "Istambul", "Paris", "Toronto", "Roma"],
    route: ["Londres", "Seul", "Tóquio", "Bangcoc", "Mumbai", "Dubai", "Istambul", "Paris", "Toronto", "Roma"],
    travelTable: {
      "Londres": ["Seul", "Tóquio", "Bangcoc"],
      "Seul": ["Tóquio", "Pequim", "Bangcoc"],
      "Tóquio": ["Bangcoc", "Mumbai", "Dubai"],
      "Bangcoc": ["Mumbai", "Seul", "Tóquio"],
      "Mumbai": ["Dubai", "Istambul", "Cairo"],
      "Dubai": ["Istambul", "Roma", "Paris"],
      "Istambul": ["Paris", "Roma", "Lisboa"],
      "Paris": ["Toronto", "Sydney", "Nova York"],
      "Toronto": ["Roma", "Paris", "Madrid"],
      "Roma": []
    },
    interrogatorios: [
      { id: "S3_1", cidade: "Londres", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela comentou sobre um país cuja moeda é o won." },
      { id: "S3_2", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para uma cidade muito tecnológica." },
      { id: "S3_3", cidade: "Londres", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre um lugar moderno e organizado." },

      { id: "S3_4", cidade: "Seul", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Sim… lembro bem. Era uma mulher." },
      { id: "S3_5", cidade: "Seul", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Comentava sobre um país cuja bandeira é branca com um círculo vermelho." },
      { id: "S3_6", cidade: "Seul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S3_7", cidade: "Tóquio", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Comentava sobre um país com comida de rua muito forte." },
      { id: "S3_8", cidade: "Tóquio", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre a moeda baht." },
      { id: "S3_9", cidade: "Tóquio", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S3_10", cidade: "Bangcoc", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Lembro dela… tinha cabelo preto." },
      { id: "S3_11", cidade: "Bangcoc", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país com três cores na bandeira." },
      { id: "S3_12", cidade: "Bangcoc", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S3_13", cidade: "Mumbai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja moeda é o dirham." },
      { id: "S3_14", cidade: "Mumbai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S3_15", cidade: "Mumbai", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre negociações discretas." },

      { id: "S3_16", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Lembro dela… tinha olhos pretos." },
      { id: "S3_17", cidade: "Dubai", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país com lua crescente na bandeira." },
      { id: "S3_18", cidade: "Dubai", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Falava sobre uma cidade entre dois continentes." },

      { id: "S3_19", cidade: "Istambul", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja bandeira tem azul, branco e vermelho." },
      { id: "S3_20", cidade: "Istambul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S3_21", cidade: "Istambul", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava de forma calma e precisa." },

      { id: "S3_22", cidade: "Paris", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país com uma folha no centro da bandeira." },
      { id: "S3_23", cidade: "Paris", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre uma cidade moderna e multicultural." },
      { id: "S3_24", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Ela parecia ser de origem asiática." },

      { id: "S3_25", cidade: "Toronto", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Agora tenho certeza… ela comentou que gosta de comida apimentada." },
      { id: "S3_26", cidade: "Toronto", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país com bandeira verde, branca e vermelha." },
      { id: "S3_27", cidade: "Toronto", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S3_28", cidade: "Roma", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ela passou por aqui." },
      { id: "S3_29", cidade: "Roma", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Esteve no restaurante próximo." },
      { id: "S3_30", cidade: "Roma", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao centro histórico." }
    ]
  },
  // Cenário 4 — Duque
  {
    id: "C010_S4",
    suspectId: "022", // Duque (Eduardo Freitas)
    finalCity: "Paris",
    spottedAt: ["Londres", "Lisboa", "Rio de Janeiro", "Buenos Aires", "Madrid", "Roma", "São Paulo", "Dubai", "Cairo", "Paris"],
    route: ["Londres", "Lisboa", "Rio de Janeiro", "Buenos Aires", "Madrid", "Roma", "São Paulo", "Dubai", "Cairo", "Paris"],
    travelTable: {
      "Londres": ["Lisboa", "Madrid", "Paris"],
      "Lisboa": ["Rio de Janeiro", "São Paulo", "Buenos Aires"],
      "Rio de Janeiro": ["Buenos Aires", "São Paulo", "Santiago"],
      "Buenos Aires": ["Madrid", "Lisboa", "Roma"],
      "Madrid": ["Roma", "Paris", "Berlim"],
      "Roma": ["São Paulo", "Rio de Janeiro", "Buenos Aires"],
      "São Paulo": ["Dubai", "Cairo", "Istambul"],
      "Dubai": ["Cairo", "Trípoli", "Mumbai"],
      "Cairo": ["Paris", "Roma", "Madrid"],
      "Paris": []
    },
    interrogatorios: [
      { id: "S4_1", cidade: "Londres", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ele comentou sobre um país cuja moeda é o euro." },
      { id: "S4_2", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para uma cidade histórica com muitas colinas." },
      { id: "S4_3", cidade: "Londres", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre um lugar ligado às navegações." },

      { id: "S4_4", cidade: "Lisboa", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Falava sobre um país com clima tropical." },
      { id: "S4_5", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ele ao aeroporto. Era claramente um homem." },
      { id: "S4_6", cidade: "Lisboa", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja moeda é o real." },

      { id: "S4_7", cidade: "Rio de Janeiro", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre um país com forte cultura europeia na América do Sul." },
      { id: "S4_8", cidade: "Rio de Janeiro", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S4_9", cidade: "Rio de Janeiro", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre o peso argentino." },

      { id: "S4_10", cidade: "Buenos Aires", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Lembro dele… tinha cabelo loiro." },
      { id: "S4_11", cidade: "Buenos Aires", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país europeu." },
      { id: "S4_12", cidade: "Buenos Aires", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S4_13", cidade: "Madrid", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país com moeda euro e história antiga." },
      { id: "S4_14", cidade: "Madrid", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S4_15", cidade: "Madrid", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre uma cidade com muitos monumentos." },

      { id: "S4_16", cidade: "Roma", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país da América do Sul." },
      { id: "S4_17", cidade: "Roma", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S4_18", cidade: "Roma", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele comentou que era do Brasil." },

      { id: "S4_19", cidade: "São Paulo", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre uma cidade extremamente rica." },
      { id: "S4_20", cidade: "São Paulo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S4_21", cidade: "São Paulo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre o dirham." },

      { id: "S4_22", cidade: "Dubai", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país do norte da África." },
      { id: "S4_23", cidade: "Dubai", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre desertos e história antiga." },
      { id: "S4_24", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S4_25", cidade: "Cairo", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Agora tenho certeza… ele tinha olhos verdes." },
      { id: "S4_26", cidade: "Cairo", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S4_27", cidade: "Cairo", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país europeu." },

      { id: "S4_28", cidade: "Paris", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ele passou por aqui." },
      { id: "S4_29", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Esteve no restaurante hoje." },
      { id: "S4_30", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao centro." }
    ]
  },
  // Cenário 5 — Nacre Fox
  {
    id: "C010_S5",
    suspectId: "007", // Nacre Fox (Claire Beaumont)
    finalCity: "Dubai",
    spottedAt: ["Londres", "Paris", "Viena", "Berlim", "Amsterdã", "Roma", "Madrid", "Lisboa", "Zurich", "Dubai"],
    route: ["Londres", "Paris", "Viena", "Berlim", "Amsterdã", "Roma", "Madrid", "Lisboa", "Zurich", "Dubai"],
    travelTable: {
      "Londres": ["Paris", "Roma", "Madrid"],
      "Paris": ["Viena", "Berlim", "Roma"],
      "Viena": ["Berlim", "Paris", "Roma"],
      "Berlim": ["Amsterdã", "Paris", "Madrid"],
      "Amsterdã": ["Roma", "Paris", "Lisboa"],
      "Roma": ["Madrid", "Paris", "Lisboa"],
      "Madrid": ["Lisboa", "Paris", "Roma"],
      "Lisboa": ["Zurich", "Viena", "Berlim"],
      "Zurich": ["Dubai", "Istambul", "Roma"],
      "Dubai": []
    },
    interrogatorios: [
      { id: "S5_1", cidade: "Londres", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ela comentou sobre um país cuja moeda é o euro." },
      { id: "S5_2", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para uma cidade conhecida por arte e museus." },
      { id: "S5_3", cidade: "Londres", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre peças raras e colecionadores." },

      { id: "S5_4", cidade: "Paris", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país cuja bandeira possui vermelho, branco e vermelho." },
      { id: "S5_5", cidade: "Paris", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Falava sobre uma cidade elegante." },
      { id: "S5_6", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao aeroporto. Era claramente uma mulher." },

      { id: "S5_7", cidade: "Viena", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Comentava sobre um país cuja bandeira possui preto, vermelho e amarelo." },
      { id: "S5_8", cidade: "Viena", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S5_9", cidade: "Viena", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre uma economia forte." },

      { id: "S5_10", cidade: "Berlim", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Lembro dela… tinha cabelo platinado." },
      { id: "S5_11", cidade: "Berlim", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país com canais." },
      { id: "S5_12", cidade: "Berlim", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },

      { id: "S5_13", cidade: "Amsterdã", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Comentava sobre um país com moeda euro e história antiga." },
      { id: "S5_14", cidade: "Amsterdã", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S5_15", cidade: "Amsterdã", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre antiguidades e obras raras." },

      { id: "S5_16", cidade: "Roma", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país cuja bandeira possui vermelho e amarelo." },
      { id: "S5_17", cidade: "Roma", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S5_18", cidade: "Roma", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Lembro bem… ela tinha olhos verdes." },

      { id: "S5_19", cidade: "Madrid", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Comentava sobre um país com história marítima." },
      { id: "S5_20", cidade: "Madrid", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S5_21", cidade: "Madrid", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre o euro." },

      { id: "S5_22", cidade: "Lisboa", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Comentava sobre um país europeu central." },
      { id: "S5_23", cidade: "Lisboa", local: "Mercador", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Falava sobre uma cidade organizada e financeira." },
      { id: "S5_24", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Ela comentou que era da Europa." },

      { id: "S5_25", cidade: "Zurich", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Agora tenho certeza… ela comentou que pratica esgrima." },
      { id: "S5_26", cidade: "Zurich", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto." },
      { id: "S5_27", cidade: "Zurich", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Falava sobre uma cidade moderna no deserto." },

      { id: "S5_28", cidade: "Dubai", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ela passou por aqui hoje." },
      { id: "S5_29", cidade: "Dubai", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Esteve no restaurante do hotel." },
      { id: "S5_30", cidade: "Dubai", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao centro." }
    ]
  }
];
