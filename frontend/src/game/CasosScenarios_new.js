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
        // Cenário 1: Rota Europeia (Peão de Prata - 012)
        // Características: Cabelo Platinado, Olhos Azuis, Esporte: Xadrez, Elegante, Formal
        {
            id: "C001_S1",
            suspectId: "012", // Peão de Prata
            finalCity: "Nova York",
            spottedAt: ["Lisboa", "Nova York"],
            route: ["Campinas", "Lisboa", "Madrid", "Moscou", "Nova York"],
            interrogatorios: [
                { id: "S1_1", cidade: "Campinas", local: "Aeroporto", personagem: "Agente de Viagens", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "Uma mulher muito elegante perguntou sobre voos para Lisboa. Notei que ela tinha cabelos platinados e falava de forma muito formal." },
                { id: "S1_2", cidade: "Campinas", local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela trocou Reais por Euros e mencionou que ia visitar a Torre de Belém. Vi uma pequena peça de xadrez metálica em sua bolsa." },
                { id: "S1_2b", cidade: "Campinas", local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ela comprou um cravo e disse que era para um encontro estratégico. Seus olhos azuis eram muito marcantes." },

                { id: "S1_3", cidade: "Lisboa", local: "Museu", personagem: "Guia", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Vi uma mulher platinada perguntando o caminho para o Triângulo das Artes em Madrid. Ela comentou que adora um bom jogo de Xadrez." },
                { id: "S1_4", cidade: "Lisboa", local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "A passageira disse que estava indo para a Espanha. Ela sorriu de um jeito estranho antes de sair, como se soubesse algo que eu não sabia." },
                { id: "S1_4b", cidade: "Lisboa", local: "Embaixada", personagem: "Diplomata", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Uma mulher muito refinada passou por aqui. Ela mencionou que seu próximo movimento seria em direção a Madrid." },

                { id: "S1_5", cidade: "Madrid", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Uma dama elegante trocou Euros por Rublos. Ela comentou que o Xadrez é a base de tudo. Notei seus cabelos platinados sob a luz." },
                { id: "S1_6", cidade: "Madrid", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ela pesquisava sobre a história dos Czares. Vi que ela carregava uma peça de xadrez de prata como amuleto." },
                { id: "S1_6b", cidade: "Madrid", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Atendi uma mulher com olhos azuis intensos. Ela disse que estava indo para Moscou e que cada passo era um movimento estratégico." },

                { id: "S1_7", cidade: "Moscou", local: "Teatro", personagem: "Dançarina", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Dancarina.png", pista: "A mulher platinada disse que seu próximo destino era a 'Big Apple'. Ela falava com muita calma e elegância." },
                { id: "S1_8", cidade: "Moscou", local: "Estação", personagem: "Guarda", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "Vi uma mulher embarcando para os EUA. Ela mencionou que queria ver o Central Park. Tinha um porte muito nobre." },
                { id: "S1_8b", cidade: "Moscou", local: "Hotel", personagem: "Recepcionista", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "A hóspede era extremamente discreta. Ela mencionou que o xeque-mate estava próximo, em Nova York." },

                { id: "S1_9", cidade: "Nova York", local: "Times Square", personagem: "Policial", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "Vi uma mulher elegante com cabelos platinados. Ela parecia estar esperando por um movimento final." },
                { id: "S1_10", cidade: "Nova York", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela entrou naquele restaurante ali na esquina, com passos muito decididos!" },
                { id: "S1_10b", cidade: "Nova York", local: "Bar", personagem: "Bartender", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ela pediu um vinho francês e disse que o jogo finalmente ia terminar no restaurante vizinho." }
            ]
        },
        // Cenário 2: Rota Africana/Asiática (Maresia - 013)
        // Características: Cabelo Castanho, Olhos Castanhos, Esporte: Remo, Robusto, Casual, Cheiro de Óleo Náutico
        {
            id: "C001_S2",
            suspectId: "013", // Maresia
            finalCity: "Toronto",
            spottedAt: ["Cairo", "Toronto"],
            route: ["Campinas", "Cairo", "Tokio", "Paris", "Toronto"],
            interrogatorios: [
                { id: "S2_1", cidade: "Campinas", local: "Porto", personagem: "Barqueiro", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Barqueiro.png", pista: "O sujeito perguntou sobre navios cargueiros indo para o Canal de Suez. Ele tinha um cheiro leve de óleo náutico e cabelos castanhos." },
                { id: "S2_2", cidade: "Campinas", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele pediu uma massa italiana e disse que ia para a terra das Pirâmides. Era um homem robusto e casual com olhos castanhos." },
                { id: "S2_2b", cidade: "Campinas", local: "Pizzaria", personagem: "Cozinheiro", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Cozinheiro.png", pista: "Vi um homem de porte atlético saindo apressado. Ele perguntou se o porto do Cairo era muito movimentado." },

                { id: "S2_3", cidade: "Cairo", local: "Bazar", personagem: "Vendedor", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Vi um estrangeiro trocando Libras por Ienes. Ele mencionou que queria ver o Monte Fuji e que pratica Remo." },
                { id: "S2_4", cidade: "Cairo", local: "Hotel", personagem: "Recepcionista", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "O hóspede tinha cabelos castanhos e falava muito de marés. Disse que Tóquio era sua próxima parada." },
                { id: "S2_4b", cidade: "Cairo", local: "Pirâmides", personagem: "Guia", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "Ele perguntou sobre o nível das águas do Nilo e disse que ia para o Japão pegar uma conexão." },

                { id: "S2_5", cidade: "Tokio", local: "Templo", personagem: "Monge", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Um homem casual perguntou sobre voos para Paris. Ele tinha olhos castanhos e mãos fortes de quem rema muito." },
                { id: "S2_6", cidade: "Tokio", local: "Metrô", personagem: "Passageiro", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "O sujeito mencionou que ia para a Europa. Ele tinha um cheiro de mar e cabelos castanhos desalinhados." },
                { id: "S2_6b", cidade: "Tokio", local: "Torre de Tóquio", personagem: "Fotógrafo", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ele estava interessado nas rotas de carga aérea para Paris. Homem robusto e de fala simples." },

                { id: "S2_7", cidade: "Paris", local: "Torre Eiffel", personagem: "Turista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Vi um homem robusto trocando Euros por Dólares Canadenses. Ele comentou que adora o clima frio de Toronto para praticar Remo." },
                { id: "S2_8", cidade: "Paris", local: "Café", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "O passageiro tinha olhos castanhos e falava de rotas portuárias. Disse que Toronto era seu porto final." },
                { id: "S2_8b", cidade: "Paris", local: "Museu de Louvre", personagem: "Segurança", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele estava procurando informações sobre as Docas de Toronto no celular. Tinha um cheiro persistente de óleo de motor." },

                { id: "S2_9", cidade: "Toronto", local: "CN Tower", personagem: "Guia", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ele esteve aqui! Um homem robusto com cabelos castanhos. Ele seguiu direto para as docas do porto." },
                { id: "S2_10", cidade: "Toronto", local: "Porto", personagem: "Doca", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "O sujeito com cabelos castanhos foi visto entrando no armazém 12. Ele parecia conhecer bem o ambiente." },
                { id: "S2_11", cidade: "Toronto", local: "Estação", personagem: "Guarda", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "Vi o suspeito casual correndo para os fundos do hotel. Ele deixou uma moeda antiga de algum porto latino no chão." }
            ]
        },
        // Cenário 3: Rota das Américas/Oceania (Byte Vermelho - 014)
        // Características: Cabelo Ruivo, Olhos Castanhos, Esporte: Skate, Casual, Comida Apimentada, Bate 2 vezes
        {
            id: "C001_S3",
            suspectId: "014", // Byte Vermelho
            finalCity: "Sidney",
            spottedAt: ["Buenos Aires", "Sidney"],
            route: ["Campinas", "Buenos Aires", "Roma", "Londres", "Sidney"],
            interrogatorios: [
                { id: "S3_1", cidade: "Campinas", local: "Banco", personagem: "Caixa", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Uma jovem de cabelos ruivos trocou dinheiro por Pesos. Ela tinha um skate e olhos castanhos muito vibrantes." },
                { id: "S3_2", cidade: "Campinas", local: "Lanchonete", personagem: "Atendente", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "A garota ruiva pediu o prato mais apimentado e disse que ia para Buenos Aires. Ela deu dois toques rápidos na mesa antes de sair." },
                { id: "S3_2b", cidade: "Campinas", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ela pesquisava sobre sistemas de segurança na Argentina e carregava um skate casual." },

                { id: "S3_3", cidade: "Buenos Aires", local: "Livraria", personagem: "Livreiro", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Vi uma jovem ruiva perguntando sobre a Itália. Ela bateu duas vezes na porta antes de entrar. Tinha olhos castanhos." },
                { id: "S3_4", cidade: "Buenos Aires", local: "Parque", personagem: "Skatista", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Ela estava mandando ver no skate e comentou que queria conhecer Roma. Notei um sotaque latino e cabelos bem vermelhos." },
                { id: "S3_4b", cidade: "Buenos Aires", local: "Estádio", personagem: "Torcedor", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela disse que o próximo destino era a Europa e que adorava pimenta. Deixou um adesivo pequeno no banco." },

                { id: "S3_5", cidade: "Roma", local: "Coliseu", personagem: "Guia", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Uma jovem trocou Euros por Libras. Ela disse que ia para Londres e que o skate era o melhor jeito de ver Roma." },
                { id: "S3_6", cidade: "Roma", local: "Sorveteria", personagem: "Sorveteiro", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "A jovem ruiva perguntou se as comidas em Londres eram apimentadas. Ela bateu duas vezes no balcão ao pedir o sorvete." },
                { id: "S3_6b", cidade: "Roma", local: "Fonte de Trevi", personagem: "Turista", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Vi uma garota com olhos castanhos jogando uma moeda. Ela mencionou que o próximo 'acesso' seria em Londres." },

                { id: "S3_7", cidade: "Londres", local: "Big Ben", personagem: "Guarda", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "Vi uma mulher atlética com cabelos ruivos. Ela perguntou sobre Sidney e deu dois toques no meu braço para chamar atenção." },
                { id: "S3_8", cidade: "Londres", local: "Pub", personagem: "Barman", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Cozinheiro.png", pista: "Ela pediu uma bebida forte e disse que a Oceania era o destino final. Tinha um skate nas costas e olhos castanhos." },
                { id: "S3_8b", cidade: "Londres", local: "Metrô", personagem: "Passageira", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "A garota ruiva estava vendo mapas de Sidney no tablet. Notei que ela bateu duas vezes no visor quando o sinal caiu." },

                { id: "S3_9", cidade: "Sidney", local: "Opera House", personagem: "Segurança", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "A ruiva passou voando de skate! Ela entrou naquele prédio de arquivos no porto." },
                { id: "S3_10", cidade: "Sidney", local: "Praia", personagem: "Surfista", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "A guria de olhos castanhos passou por aqui e deixou cair um componente eletrônico pequeno perto das docas." },
                { id: "S3_11", cidade: "Sidney", local: "Porto", personagem: "Marinheiro", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela entrou no prédio das docas e bateu duas vezes na porta de metal antes de sumir lá dentro!" }
            ]
        },
        // Cenário 4: Rota VIP/Luxo (Doutor Marfim - 015)
        // Características: Cabelo Platinado, Olhos Azuis, Esporte: Golfe, Elegante, Termos Médicos/Científicos
        {
            id: "C001_S4",
            suspectId: "015", // Doutor Marfim
            finalCity: "Madrid",
            spottedAt: ["Salvador", "Madrid"],
            route: ["Campinas", "Rio de Janeiro", "Salvador", "Lisboa", "Madrid"],
            interrogatorios: [
                { id: "S4_1", cidade: "Campinas", local: "Clube de Golfe", personagem: "Caddie", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Um senhor de cabelos platinados perguntou sobre os campos do Rio. Ele mencionou a anatomia perfeita do terreno." },
                { id: "S4_2", cidade: "Campinas", local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png", pista: "Ele usava termos médicos muito precisos e tinha olhos azuis intensos. Disse que o Rio era seu próximo 'paciente'." },
                { id: "S4_2b", cidade: "Campinas", local: "Restaurante", personagem: "Maitre", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Um cavalheiro platinado jantou aqui. Ele comentou que a gastronomia local carecia de equilíbrio bioquímico." },

                { id: "S4_3", cidade: "Rio de Janeiro", local: "Cristo Redentor", personagem: "Turista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Vi um homem elegante com cabelos platinados. Ele carregava um caderno com diagnósticos... ou eram anotações de Salvador?" },
                { id: "S4_4", cidade: "Rio de Janeiro", local: "Praia", personagem: "Vendedor", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "O senhor de olhos azuis perguntou se em Salvador o clima era favorável para o Golfe." },
                { id: "S4_4b", cidade: "Rio de Janeiro", local: "Museu de Belas Artes", personagem: "Curador", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ele analisava as obras sob uma perspectiva clínica. Mencionou que ia para a Bahia." },

                { id: "S4_5", cidade: "Salvador", local: "Pelourinho", personagem: "Guia", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Um turista elegante trocou Reais por Euros. Notei que ele tinha cabelos platinados e falava muito sobre campos de Golfe em Portugal." },
                { id: "S4_6", cidade: "Salvador", local: "Mercado Modelo", personagem: "Dona de Banca", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Cozinheiro.png", pista: "Ele corrigiu meu português usando termos científicos complicados. Disse que Lisboa era seu próximo destino clínico." },
                { id: "S4_6b", cidade: "Salvador", local: "Diques", personagem: "Pescador", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Barqueiro.png", pista: "Um homem de olhos azuis e fala formal perguntou sobre o horário do voo para Portugal." },

                { id: "S4_7", cidade: "Lisboa", local: "Castelo", personagem: "Guarda", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "Um senhor platinado perguntou sobre os museus de Madrid. Ele tinha uma caligrafia impecável nas anotações." },
                { id: "S4_8", cidade: "Lisboa", local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ele pediu um grelhado com baixo teor lipídico e mencionou o Golfe em Madrid. Tinha olhos azuis muito frios." },
                { id: "S4_8b", cidade: "Lisboa", local: "Torre de Belém", personagem: "Vendedor de Souvenirs", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Um cavalheiro elegante com cabelos platinados comprou mapas detalhados de Madrid." },

                { id: "S4_9", cidade: "Madrid", local: "Museu do Prado", personagem: "Curadora", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "O Doutor platinado esteve aqui! Ele estava conferindo os arquivos médicos históricos e entrou naquela sala." },
                { id: "S4_10", cidade: "Madrid", local: "Retiro", personagem: "Jardineiro", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Vi um homem elegante de olhos azuis com um taco de Golfe na mão entrando na galeria privativa." },
                { id: "S4_11", cidade: "Madrid", local: "Plaza Mayor", personagem: "Policial", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "Um homem platinado e muito formal foi visto correndo para a galeria de antiguidades!" }
            ]
        },
        // Cenário 5: Rota da Neve e Tradição (Vidro Frio - 018)
        // Características: Cabelo Platinado, Olhos Verdes, Esporte: Xadrez, Elegante, Evita Vidro, Notas Sequenciais
        {
            id: "C001_S5",
            suspectId: "018", // Vidro Frio
            finalCity: "Thimphu",
            spottedAt: ["Moscou", "Thimphu"],
            route: ["Campinas", "Paris", "Moscou", "Cairo", "Thimphu"],
            interrogatorios: [
                { id: "S5_1", cidade: "Campinas", local: "Aeroporto", personagem: "Atendente", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Uma mulher platinada perguntou sobre Paris. Ela se recusou a tocar no balcão de vidro e tinha olhos verdes penetrantes." },
                { id: "S5_2", cidade: "Campinas", local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ela pagou com notas novas e sequenciais. Mencionou que ia para a 'Cidade Luz' e que adora Xadrez." },
                { id: "S5_2b", cidade: "Campinas", local: "Loja de Cristais", personagem: "Vendedor", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Uma dama elegante passou aqui. Ela parecia ter pavor de encostar nas vitrines de vidro." },

                { id: "S5_3", cidade: "Paris", local: "Louvre", personagem: "Curador", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Vi uma dama de cabelos platinados trocando Rublos. Ela mencionou que o Xadrez é a única diversão pura em Moscou." },
                { id: "S5_4", cidade: "Paris", local: "Café", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "A passageira de olhos verdes nunca tocou no copo de vidro. Disse que estava indo para a Rússia e falava português formal demais." },
                { id: "S5_4b", cidade: "Paris", local: "Arco do Triunfo", personagem: "Turista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Ela pagou tudo com notas sequenciais e disse que seu próximo lance estratégico seria em Moscou." },

                { id: "S5_5", cidade: "Moscou", local: "Praça Vermelha", personagem: "Guarda", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/AgenteTransito.png", pista: "Uma mulher elegante com cabelos platinados perguntou pelo Cairo. Ela evitava olhar para o próprio reflexo nas janelas." },
                { id: "S5_6", cidade: "Moscou", local: "Teatro", personagem: "Bailarina", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Dancarina.png", pista: "A mestre em Xadrez comentou que ia para o Egito. Tinha olhos verdes muito intensos e papéis impecáveis." },
                { id: "S5_6b", cidade: "Moscou", local: "Estação", personagem: "Maquinista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Ela reservou um lugar para o Cairo. Notei que ela usava luvas para não tocar na porta de vidro da cabine." },

                { id: "S5_7", cidade: "Cairo", local: "Pirâmides", personagem: "Guia", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "A turista platinada trocou moedas por notas do Butão. Ela disse que ia para Thimphu e que cada movimento era friamente calculado." },
                { id: "S5_8", cidade: "Cairo", local: "Hotel", personagem: "Recepcionista", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Ela nunca tocou na garrafa de água no quarto. Tinha olhos verdes e falou de um monastério no Himalaia. Suas notas eram todas novas." },
                { id: "S5_8b", cidade: "Cairo", local: "Mercado", personagem: "Mercador", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Uma mulher formal com cabelos platinados comprou roupas térmicas para o Butão." },

                { id: "S5_9", cidade: "Thimphu", local: "Dzong", personagem: "Monge", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "A mulher platinada esteve aqui! Ela seguiu para as montanhas e disse que o jogo de Xadrez finalmente acabaria." },
                { id: "S5_10", cidade: "Thimphu", local: "Templo", personagem: "Sacerdote", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png", pista: "Vi uma dama de cabelos platinados e olhos verdes. Ela nem encostou na porta de vidro do templo!" },
                { id: "S5_11", cidade: "Thimphu", local: "Mirante", personagem: "Guarda", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "O suspeito extremamente elegante foi visto subindo a trilha final para o monastério!" }
            ]
        }
    ]
};
