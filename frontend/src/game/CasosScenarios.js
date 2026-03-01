// src/game/CasosScenarios.js

/**
 * Cada caso pode ter múltiplos cenários (variantes).
 * Cada cenário define:
 * - suspectId: quem é o culpado
 * - finalCity: cidade onde a captura ocorre
 * - spottedAt: cidades onde o suspeito foi avistado (para DialogBox)
 * - route: o caminho exato que o suspeito faz
 * - interrogatorios: pistas em cada cidade da rota
 */

export const CASOS_SCENARIOS = {
    "C001": [
        // Cenário 1: Rota Europeia (Polo)
        {
            id: "C001_S1",
            suspectId: "012", // Polo
            finalCity: "Nova York",
            spottedAt: ["Lisboa", "Nova York"],
            route: ["Campinas", "Lisboa", "Madrid", "Moscou", "Nova York"],
            interrogatorios: [
                { id: "S1_1", cidade: "Campinas", local: "Aeroporto", personagem: "Agente de Viagens", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "O sujeito perguntou sobre as rotas dos navegadores portugueses e sotaque europeu. Notei que ele era muito elegante, parecia um colecionador." },
                { id: "S1_2", cidade: "Campinas", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele trocou Reais por Euros e mencionou que ia visitar a Torre de Belém. Era um homem robusto." },
                { id: "S1_2b", cidade: "Campinas", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ele comprou um cravo e disse que era para sua coleção de itens históricos. Falava de Portugal o tempo todo." },

                { id: "S1_3", cidade: "Lisboa", local: "Museu", personagem: "Guia", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Vi um homem bem vestido perguntando o caminho para o Triângulo das Artes em Madrid. Ele comentou que adora Polo." },
                { id: "S1_4", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "O passageiro disse que estava indo para a Espanha ver um festival de Flamenco. Notei que ele tinha um sotaque do Oriente Médio." },
                { id: "S1_4b", cidade: "Lisboa", local: "Embaixada", personagem: "Diplomata", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Um homem muito refinado passou por aqui pedindo direções para Madrid. Ele mencionou que seu próximo destino seria um museu famoso." },

                { id: "S1_5", cidade: "Madrid", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Um cavalheiro trocou Euros por Rublos. Disse que sentia falta do frio e das cúpulas do Kremlin. Ele mencionou ser fã de cavalos e Polo." },
                { id: "S1_6", cidade: "Madrid", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ele pesquisava sobre a história dos Czares. Notei areia fina em seus bolsos, como se tivesse vindo do deserto." },
                { id: "S1_6b", cidade: "Madrid", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Atendi um homem que precisava de remédios para o frio. Ele disse que estava indo para Moscou e que adora grandes monumentos." },

                { id: "S1_7", cidade: "Moscou", local: "Teatro", personagem: "Dançarina", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Dancarina.png", pista: "O sujeito disse que seu próximo destino era a 'Big Apple'. Ele vestia uma camisa de gola impecável e falava de Polo." },
                { id: "S1_8", cidade: "Moscou", local: "Estação", personagem: "Guarda", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "Vi um homem embarcando para os EUA. Ele mencionou que queria ver a Estátua da Liberdade. Ele era muito robusto e elegante." },
                { id: "S1_8b", cidade: "Moscou", local: "Hotel", personagem: "Recepcionista", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "O hóspede mencionou que seu destino final era Nova York e que adorava colecionar itens raros." },

                { id: "S1_9", cidade: "Nova York", local: "Times Square", personagem: "Policial", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "O passageiro estava nervoso, olhava para trás o tempo todo." },
                { id: "S1_10", cidade: "Nova York", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele entrou naquele restaurante ali na esquina!" },
                { id: "S1_10b", cidade: "Nova York", local: "Bar", personagem: "Bartender", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele pediu um drink rápido e disse que ia se encontrar com um contato no restaurante vizinho." }
            ]
        },
        // Cenário 2: Rota Africana/Asiática (Maresia)
        {
            id: "C001_S2",
            suspectId: "013", // Maresia
            finalCity: "Toronto",
            spottedAt: ["Cairo", "Toronto"],
            route: ["Campinas", "Cairo", "Tokio", "Paris", "Toronto"],
            interrogatorios: [
                { id: "S2_1", cidade: "Campinas", local: "Porto", personagem: "Barqueiro", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Barqueiro.png", pista: "O sujeito perguntou sobre navios cargueiros indo para o Canal de Suez. Ele tinha um cheiro leve de óleo náutico." },
                { id: "S2_2", cidade: "Campinas", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele pediu uma massa e disse que ia para a terra das Pirâmides. Era um homem robusto e casual." },
                { id: "S2_2b", cidade: "Campinas", local: "Pizzaria", personagem: "Cozinheiro", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Cozinheiro.png", pista: "Vi um homem robusto saindo apressado. Ele mencionou que o Cairo era seu próximo porto." },

                { id: "S2_3", cidade: "Cairo", local: "Bazar", personagem: "Vendedor", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Vi um estrangeiro trocando Libras Egípcias por Ienes. Ele mencionou que queria ver o Monte Fuji. Ele adora praticar Remo." },
                { id: "S2_4", cidade: "Cairo", local: "Hotel", personagem: "Recepcionista", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "O hóspede comentou que seu próximo destino era a metrópole da tecnologia, no Japão. Notei que ele falava muito de maré e barcos." },
                { id: "S2_4b", cidade: "Cairo", local: "Pirâmides", personagem: "Guia", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "Ele estava interessado na tecnologia antiga e disse que ia para Tóquio ver a tecnologia moderna." },

                { id: "S2_5", cidade: "Tokio", local: "Templo", personagem: "Monge", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Um homem casual perguntou sobre voos para a Cidade Luz, na França. Ele disse que sentia falta de uma boa culinária italiana." },
                { id: "S2_6", cidade: "Tokio", local: "Metrô", personagem: "Passageiro", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "O sujeito mencionou que ia para a Europa. Ele tinha um porte atlético de quem pratica Remo e era de origem latina." },
                { id: "S2_6b", cidade: "Tokio", local: "Torre de Tóquio", personagem: "Fotógrafo", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ele pediu para tirar uma foto e disse que seu próximo destino era Paris." },

                { id: "S2_7", cidade: "Paris", local: "Torre Eiffel", personagem: "Turista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Vi um homem robusto trocando Euros por Dólares Canadenses. Ele disse que ia visitar a CN Tower em Toronto." },
                { id: "S2_8", cidade: "Paris", local: "Café", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "O passageiro falava de rotas portuárias e marés. Disse que Toronto seria seu esconderijo final." },
                { id: "S2_8b", cidade: "Paris", local: "Museu de Louvre", personagem: "Segurança", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele estava olhando as rotas marítimas no mapa e mencionou o Canadá." },

                { id: "S2_9", cidade: "Toronto", local: "CN Tower", personagem: "Guia", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ele esteve aqui! Estava olhando o mapa portuário e entrou apressado naquele hotel ali." },
                { id: "S2_10", cidade: "Toronto", local: "Porto", personagem: "Doca", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Barqueiro.png", pista: "O sujeito robusto foi visto entrando no armazém 12." },
                { id: "S2_11", cidade: "Toronto", local: "Estação", personagem: "Guarda", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "Vi o suspeito correndo para os fundos do hotel próximo ao porto." }
            ]
        },
        // Cenário 3: Rota das Américas/Oceania (Byte Vermelho)
        {
            id: "C001_S3",
            suspectId: "014", // Byte Vermelho
            finalCity: "Sidney",
            spottedAt: ["Buenos Aires", "Sidney"],
            route: ["Campinas", "Buenos Aires", "Roma", "Londres", "Sidney"],
            interrogatorios: [
                { id: "S3_1", cidade: "Campinas", local: "Banco", personagem: "Caixa", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Uma mulher casual trocou dinheiro por Pesos Argentinos. Ela tinha um skate debaixo do braço." },
                { id: "S3_2", cidade: "Campinas", local: "Lanchonete", personagem: "Atendente", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "A garota adorava comida apimentada e disse que ia ver o Obelisco em Buenos Aires. Tinha cabelos ruivos." },
                { id: "S3_2b", cidade: "Campinas", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ela pesquisava sobre a Patagônia e mencionou que ia para a Argentina." },

                { id: "S3_3", cidade: "Buenos Aires", local: "Livraria", personagem: "Livreiro", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Vi uma jovem ruiva perguntando sobre voos para a capital da Itália. Ela batia duas vezes na mesa antes de sair." },
                { id: "S3_4", cidade: "Buenos Aires", local: "Parque", personagem: "Skatista", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Ela estava andando de skate e comentou que queria conhecer o Coliseu em Roma. Notei um sotaque latino." },
                { id: "S3_4b", cidade: "Buenos Aires", local: "Estádio", personagem: "Torcedor", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela disse que o próximo destino era a Europa, provavelmente Roma." },

                { id: "S3_5", cidade: "Roma", local: "Coliseu", personagem: "Guia", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Uma turista trocou Euros por Libras. Disse que ia para a terra do Big Ben. Ela usava um skate muito moderno." },
                { id: "S3_6", cidade: "Roma", local: "Sorveteria", personagem: "Sorveteiro", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "A jovem ruiva perguntou se em Londres a comida era tão apimentada quanto ela gostava. Notei um adesivo pequeno em sua mochila." },
                { id: "S3_6b", cidade: "Roma", local: "Fonte de Trevi", personagem: "Turista", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Ela jogou uma moeda e disse que esperava ver o Big Ben em breve." },

                { id: "S3_7", cidade: "Londres", local: "Big Ben", personagem: "Guarda", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "Vi uma mulher atlética perguntando sobre a Opera House em Sidney. Ela disse que ia para a Austrália." },
                { id: "S3_8", cidade: "Londres", local: "Pub", personagem: "Barman", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Cozinheiro.png", pista: "Ela deixou um adesivo minúsculo no balcão e mencionou que ia para o outro lado do mundo, na Oceania." },
                { id: "S3_8b", cidade: "Londres", local: "Metrô", personagem: "Passageira", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela carregava um skate e falava de voos para Sidney." },

                { id: "S3_9", cidade: "Sidney", local: "Opera House", personagem: "Segurança", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "A ruiva passou por aqui correndo com um skate! Ela entrou naquele prédio de segurança ali na frente." },
                { id: "S3_10", cidade: "Sidney", local: "Praia", personagem: "Surfista", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Passei por ela no calçadão, estava indo em direção ao porto." },
                { id: "S3_11", cidade: "Sidney", local: "Porto", personagem: "Marinheiro", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela entrou apressada no prédio das docas!" }
            ]
        },
        // Cenário 4: Rota VIP/Luxo (Doutor Marfim)
        {
            id: "C001_S4",
            suspectId: "015", // Doutor Marfim
            finalCity: "Madrid",
            spottedAt: ["Salvador", "Madrid"],
            route: ["Campinas", "Rio de Janeiro", "Salvador", "Lisboa", "Madrid"],
            interrogatorios: [
                { id: "S4_1", cidade: "Campinas", local: "Clube de Golfe", personagem: "Caddie", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Um senhor muito elegante perguntou sobre os melhores campos de golfe no Rio de Janeiro. Tinha cabelos platinados." },
                { id: "S4_2", cidade: "Campinas", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Ele falava com termos médicos muito técnicos e disse que ia para a Cidade Maravilhosa. Olhos muito azuis." },
                { id: "S4_2b", cidade: "Campinas", local: "Restaurante", personagem: "Maitre", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Um cavalheiro muito culto jantou aqui e mencionou o Rio de Janeiro." },

                { id: "S4_3", cidade: "Rio de Janeiro", local: "Cristo Redentor", personagem: "Turista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Vi um homem platinado perguntando sobre o Pelourinho em Salvador. Ele carregava um caderno com anotações perfeitas." },
                { id: "S4_4", cidade: "Rio de Janeiro", local: "Praia", personagem: "Vendedor", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "O cavalheiro comentou que ia para a Bahia. Notei que ele corrigia os termos científicos de todos ao redor." },
                { id: "S4_4b", cidade: "Rio de Janeiro", local: "Museu de Belas Artes", personagem: "Curador", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele estava interessado na história da Bahia e disse que Salvador era seu próximo passo." },

                { id: "S4_5", cidade: "Salvador", local: "Pelourinho", personagem: "Guia", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Um turista elegante trocou Reais por Euros. Disse que ia cruzar o Atlântico para Lisboa. Adora jogar Golfe." },
                { id: "S4_6", cidade: "Salvador", local: "Mercado Modelo", personagem: "Dona de Banca", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Cozinheiro.png", pista: "Ele falava português com um sotaque europeu formal. Disse que ia para a terra do fado e das grandes navegações." },
                { id: "S4_6b", cidade: "Salvador", local: "Diques", personagem: "Pescador", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Barqueiro.png", pista: "Ele perguntou sobre os navios para Portugal." },

                { id: "S4_7", cidade: "Lisboa", local: "Castelo", personagem: "Guarda", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "Um senhor de cabelos platinados perguntou sobre o Museu do Prado em Madrid. Ele era extremamente discreto." },
                { id: "S4_8", cidade: "Lisboa", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele pediu um grelhado impecável e mencionou que seu destino final era a capital da Espanha. Jogador de Golfe, com certeza." },
                { id: "S4_8b", cidade: "Lisboa", local: "Torre de Belém", personagem: "Vendedor de Souvenirs", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ele comprou um cartão postal de Madrid." },

                { id: "S4_9", cidade: "Madrid", local: "Museu do Prado", personagem: "Curadora", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "O Doutor esteve aqui! Estava analisando uma obra com uma lupa e entrou naquela galeria privativa." },
                { id: "S4_10", cidade: "Madrid", local: "Retiro", personagem: "Jardineiro", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Vi um homem elegante entrando no prédio da galeria real." },
                { id: "S4_11", cidade: "Madrid", local: "Plaza Mayor", personagem: "Policial", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "O suspeito foi visto na direção da galeria!" }
            ]
        },
        // Cenário 5: Rota da Neve e Tradição (Vidro Frio)
        {
            id: "C001_S5",
            suspectId: "018", // Vidro Frio
            finalCity: "Thimphu",
            spottedAt: ["Moscou", "Thimphu"],
            route: ["Campinas", "Paris", "Moscou", "Cairo", "Thimphu"],
            interrogatorios: [
                { id: "S5_1", cidade: "Campinas", local: "Aeroporto", personagem: "Atendente", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Uma mulher de cabelos platinados e muito elegante perguntou sobre voos para Paris. Ela evitava tocar em qualquer vidro." },
                { id: "S5_2", cidade: "Campinas", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ela estava lendo sobre a Revolução Francesa. Notei que suas notas de dinheiro eram todas novas e sequenciais." },
                { id: "S5_2b", cidade: "Campinas", local: "Loja de Cristais", personagem: "Vendedor", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Uma dama elegante passou aqui e disse que ia para Paris." },

                { id: "S5_3", cidade: "Paris", local: "Louvre", personagem: "Curador", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Vi uma dama elegante trocando Euros por Rublos. Disse que ia para a Praça Vermelha em Moscou. Ela adora Xadrez." },
                { id: "S5_4", cidade: "Paris", local: "Café", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "A passageira platinada falava um francês perfeito. Disse que sentia falta do inverno russo. Notei olhos verdes penetrantes." },
                { id: "S5_4b", cidade: "Paris", local: "Arco do Triunfo", personagem: "Turista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ela disse que o próximo destino era a Rússia." },

                { id: "S5_5", cidade: "Moscou", local: "Praça Vermelha", personagem: "Guarda", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "Uma mulher de porte nobre perguntou sobre as Pirâmides do Egito no Cairo. Ela nunca tocava nos copos de vivo." },
                { id: "S5_6", cidade: "Moscou", local: "Teatro", personagem: "Bailarina", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Dancarina.png", pista: "Ela comentou que ia para o deserto, mas seu destino final era um reino no Himalaia. Mestre em Xadrez, pelo que vi." },
                { id: "S5_6b", cidade: "Moscou", local: "Estação", personagem: "Maquinista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela reservou um lugar para o Cairo." },

                { id: "S5_7", cidade: "Cairo", local: "Pirâmides", personagem: "Guia", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "A turista trocou moedas por notas raríssimas do Butão. Disse que ia para Thimphu. Extremamente formal." },
                { id: "S5_8", cidade: "Cairo", local: "Hotel", personagem: "Recepcionista", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela mencionou que em Thimphu não havia semáforos, perfeito para se esconder. Tinha papéis de identidade impecáveis." },
                { id: "S5_8b", cidade: "Cairo", local: "Mercado", personagem: "Mercador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela comprou suprimentos para o Himalaia." },

                { id: "S5_9", cidade: "Thimphu", local: "Dzong", personagem: "Monge", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "A mulher de branco esteve aqui! Ela seguiu para aquele pequeno monastério isolado na montanha." },
                { id: "S5_10", cidade: "Thimphu", local: "Templo", personagem: "Sacerdote", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ela passou por aqui em direção ao monastério." },
                { id: "S5_11", cidade: "Thimphu", local: "Mirante", personagem: "Guarda", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "O suspeito foi visto subindo a trilha final!" }
            ]
        }
    ]
};
