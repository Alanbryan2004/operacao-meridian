export const Caso0Scenarios = [
  {
    id: "C000_S1",
    suspectId: "006", // Kite Needle (Mei Lin Zhao)
    finalCity: "Seul",
    spottedAt: ["Londres", "Paris", "Tóquio", "Seul"],
    route: ["Londres", "Paris", "Tóquio", "Seul"],
    travelTable: {
      "Londres": ["Paris", "Roma", "Madrid"],
      "Paris": ["Tóquio", "Seul", "Pequim"],
      "Tóquio": ["Seul", "Bangcoc", "Pequim"],
      "Seul": []
    },
    interrogatorios: [
      { id: "C0_1", cidade: "Londres", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ela comentou sobre um país cuja bandeira possui azul, branco e vermelho." },
      { id: "C0_2", cidade: "Londres", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para uma cidade famosa por arte." },
      { id: "C0_3", cidade: "Londres", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Lembro dela… era uma mulher." },

      { id: "C0_4", cidade: "Paris", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela comentou sobre um país cuja bandeira é branca com um círculo vermelho." },
      { id: "C0_5", cidade: "Paris", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ao aeroporto. Disse que iria para uma cidade muito tecnológica." },
      { id: "C0_6", cidade: "Paris", local: "Mercado", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png", pista: "Ela tinha cabelo preto." },

      { id: "C0_7", cidade: "Tóquio", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png", pista: "Ela comentou sobre um país asiático." },
      { id: "C0_8", cidade: "Tóquio", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela comentou sobre um país cuja moeda é o won." },
      { id: "C0_9", cidade: "Tóquio", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Agora tenho certeza… ela pratica ginástica olímpica." },

      { id: "C0_10", cidade: "Seul", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Sim… ela passou por aqui hoje." },
      { id: "C0_11", cidade: "Seul", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela esteve no restaurante próximo." },
      { id: "C0_12", cidade: "Seul", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Levei ela ao centro da cidade." }
    ]
  }
];
