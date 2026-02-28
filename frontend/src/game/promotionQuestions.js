/**
 * 🛡️ Perguntas de Promoção — A.T.L.A.S.
 *
 * Ao atingir XP suficiente, o jogador deve acertar uma pergunta
 * para subir de cargo. Se errar, permanece no cargo atual até
 * completar mais uma missão.
 *
 * Chave = nível de DESTINO (ex: 2 = prova para subir de Nível 1 → 2)
 * Cada nível tem 3+ perguntas; uma é sorteada aleatoriamente.
 */

export const PROMOTION_QUESTIONS = {

    // =====================================================
    // NIVEL 1 → 2  |  Novato → Recruta
    // Muito fácil
    // =====================================================
    2: [
        {
            pergunta: "Qual destes países fica na América do Sul?",
            alternativas: ["Portugal", "Argentina", "Japão"],
            correta: 1
        },
        {
            pergunta: "Qual idioma é falado no Brasil?",
            alternativas: ["Português", "Francês", "Inglês"],
            correta: 0
        },
        {
            pergunta: "Qual destes é um país?",
            alternativas: ["Lisboa", "Brasil", "Paris"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 2 → 3  |  Recruta → Cadete
    // =====================================================
    3: [
        {
            pergunta: "Qual é a capital da França?",
            alternativas: ["Madrid", "Paris", "Roma"],
            correta: 1
        },
        {
            pergunta: "Qual destes países fica na Europa?",
            alternativas: ["Portugal", "Chile", "Japão"],
            correta: 0
        },
        {
            pergunta: "Qual destes é um idioma?",
            alternativas: ["Português", "Lisboa", "Europa"],
            correta: 0
        }
    ],

    // =====================================================
    // NIVEL 3 → 4  |  Cadete → Cadete Investigativo
    // =====================================================
    4: [
        {
            pergunta: "Qual é a capital de Portugal?",
            alternativas: ["Lisboa", "Porto", "Madrid"],
            correta: 0
        },
        {
            pergunta: "Qual destes países fala espanhol?",
            alternativas: ["Argentina", "Alemanha", "Japão"],
            correta: 0
        },
        {
            pergunta: "Qual destes é um continente?",
            alternativas: ["África", "Brasil", "Lisboa"],
            correta: 0
        }
    ],

    // =====================================================
    // NIVEL 4 → 5  |  Cadete Investigativo → Cadete de Inteligência
    // =====================================================
    5: [
        {
            pergunta: "Qual moeda é usada nos Estados Unidos?",
            alternativas: ["Euro", "Dólar", "Peso"],
            correta: 1
        },
        {
            pergunta: "Qual destes países fica na Ásia?",
            alternativas: ["Japão", "Brasil", "França"],
            correta: 0
        },
        {
            pergunta: "Qual cidade fica na Argentina?",
            alternativas: ["Buenos Aires", "Lisboa", "Roma"],
            correta: 0
        }
    ],

    // =====================================================
    // NIVEL 5 → 6  |  Cadete de Inteligência → Trainee de Campo
    // =====================================================
    6: [
        {
            pergunta: "Qual é a capital da Argentina?",
            alternativas: ["Buenos Aires", "Rosário", "Córdoba"],
            correta: 0
        },
        {
            pergunta: "Qual idioma é falado na Alemanha?",
            alternativas: ["Alemão", "Italiano", "Francês"],
            correta: 0
        },
        {
            pergunta: "Qual destes países fica na África?",
            alternativas: ["Egito", "Portugal", "Chile"],
            correta: 0
        }
    ],

    // =====================================================
    // NIVEL 6 → 7  |  Trainee de Campo → Agente em Treinamento
    // Fronteiras
    // =====================================================
    7: [
        {
            pergunta: "Qual país faz fronteira com o Brasil?",
            alternativas: ["Argentina", "Portugal", "Japão"],
            correta: 0
        },
        {
            pergunta: "Qual país faz fronteira com Portugal?",
            alternativas: ["Espanha", "França", "Itália"],
            correta: 0
        },
        {
            pergunta: "Qual país faz fronteira com os Estados Unidos?",
            alternativas: ["Canadá", "Brasil", "Espanha"],
            correta: 0
        }
    ],

    // =====================================================
    // NIVEL 7 → 8  |  Agente em Treinamento → Assistente de Investigação
    // =====================================================
    8: [
        {
            pergunta: "Qual país faz fronteira com a Alemanha?",
            alternativas: ["França", "Brasil", "Japão"],
            correta: 0
        },
        {
            pergunta: "Qual país faz fronteira com a Argentina?",
            alternativas: ["Chile", "Portugal", "Egito"],
            correta: 0
        },
        {
            pergunta: "Qual país faz fronteira com o Egito?",
            alternativas: ["Sudão", "Brasil", "Canadá"],
            correta: 0
        }
    ],

    // =====================================================
    // NIVEL 8 → 9  |  Assistente de Investigação → Investigador Júnior
    // =====================================================
    9: [
        {
            pergunta: "Qual país faz fronteira com a França?",
            alternativas: ["Espanha", "Japão", "Chile"],
            correta: 0
        },
        {
            pergunta: "Qual país faz fronteira com o Chile?",
            alternativas: ["Argentina", "Portugal", "Itália"],
            correta: 0
        },
        {
            pergunta: "Qual país faz fronteira com a China?",
            alternativas: ["Mongólia", "Brasil", "Espanha"],
            correta: 0
        }
    ],

    // =====================================================
    // NIVEL 9 → 10  |  Investigador Júnior → Investigador
    // =====================================================
    10: [
        {
            pergunta: "Qual país faz fronteira com a Rússia?",
            alternativas: ["China", "Brasil", "Portugal"],
            correta: 0
        },
        {
            pergunta: "Qual país faz fronteira com a Itália?",
            alternativas: ["França", "Japão", "México"],
            correta: 0
        },
        {
            pergunta: "Qual país faz fronteira com o Canadá?",
            alternativas: ["Estados Unidos", "Argentina", "Espanha"],
            correta: 0
        }
    ],

    // =====================================================
    // NIVEL 10 → 11  |  Investigador → Detetive Júnior
    // 🔵 Entrando na classe Operacional
    // =====================================================
    11: [
        {
            pergunta: "Qual é a capital da Austrália?",
            alternativas: ["Sydney", "Camberra", "Melbourne"],
            correta: 1
        },
        {
            pergunta: "Qual rio atravessa o Egito?",
            alternativas: ["Nilo", "Amazonas", "Danúbio"],
            correta: 0
        },
        {
            pergunta: "Qual país tem o maior território do mundo?",
            alternativas: ["China", "Estados Unidos", "Rússia"],
            correta: 2
        }
    ],

    // =====================================================
    // NIVEL 11 → 12  |  Detetive Júnior → Detetive
    // =====================================================
    12: [
        {
            pergunta: "Qual oceano fica entre a América e a Europa?",
            alternativas: ["Pacífico", "Atlântico", "Índico"],
            correta: 1
        },
        {
            pergunta: "Qual país é conhecido como a 'Terra do Sol Nascente'?",
            alternativas: ["China", "Japão", "Coreia do Sul"],
            correta: 1
        },
        {
            pergunta: "Qual deserto fica no norte da África?",
            alternativas: ["Gobi", "Saara", "Atacama"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 12 → 13  |  Detetive → Detetive Sênior
    // =====================================================
    13: [
        {
            pergunta: "Em qual cidade fica o Coliseu?",
            alternativas: ["Atenas", "Roma", "Istambul"],
            correta: 1
        },
        {
            pergunta: "Qual país tem mais idiomas oficiais?",
            alternativas: ["Suíça", "Índia", "África do Sul"],
            correta: 2
        },
        {
            pergunta: "Qual é a capital do Canadá?",
            alternativas: ["Toronto", "Vancouver", "Ottawa"],
            correta: 2
        }
    ],

    // =====================================================
    // NIVEL 13 → 14  |  Detetive Sênior → Agente de Campo
    // =====================================================
    14: [
        {
            pergunta: "Qual país é banhado pelo Mar Mediterrâneo?",
            alternativas: ["Brasil", "Itália", "Japão"],
            correta: 1
        },
        {
            pergunta: "Qual é a montanha mais alta do mundo?",
            alternativas: ["Kilimanjaro", "Monte Branco", "Everest"],
            correta: 2
        },
        {
            pergunta: "Qual país tem a maior população do mundo?",
            alternativas: ["Índia", "Estados Unidos", "China"],
            correta: 0
        }
    ],

    // =====================================================
    // NIVEL 14 → 15  |  Agente de Campo → Agente Especial
    // =====================================================
    15: [
        {
            pergunta: "Qual cidade é conhecida como a 'Cidade Eterna'?",
            alternativas: ["Atenas", "Roma", "Paris"],
            correta: 1
        },
        {
            pergunta: "Quantos fusos horários a Rússia possui?",
            alternativas: ["5", "8", "11"],
            correta: 2
        },
        {
            pergunta: "Qual estreito separa a Europa da Ásia?",
            alternativas: ["Gibraltar", "Bósforo", "Malaca"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 15 → 16  |  Agente Especial → Agente Especial Sênior
    // =====================================================
    16: [
        {
            pergunta: "Qual país tem o maior número de ilhas?",
            alternativas: ["Indonésia", "Filipinas", "Suécia"],
            correta: 2
        },
        {
            pergunta: "Qual é a capital da Turquia?",
            alternativas: ["Istambul", "Ancara", "Izmir"],
            correta: 1
        },
        {
            pergunta: "Qual país fica dividido entre dois continentes?",
            alternativas: ["Turquia", "Egito", "Rússia"],
            correta: 0
        }
    ],

    // =====================================================
    // NIVEL 16 → 17  |  Agente Especial Sênior → Agente Tático
    // =====================================================
    17: [
        {
            pergunta: "Qual é a moeda oficial do Japão?",
            alternativas: ["Yuan", "Won", "Iene"],
            correta: 2
        },
        {
            pergunta: "Qual país é o maior produtor de café?",
            alternativas: ["Colômbia", "Brasil", "Etiópia"],
            correta: 1
        },
        {
            pergunta: "Qual é o menor país do mundo?",
            alternativas: ["Mônaco", "Vaticano", "San Marino"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 17 → 18  |  Agente Tático → Analista de Inteligência
    // =====================================================
    18: [
        {
            pergunta: "Qual agência de inteligência pertence ao Reino Unido?",
            alternativas: ["CIA", "MI6", "Mossad"],
            correta: 1
        },
        {
            pergunta: "Qual cidade é a sede da ONU?",
            alternativas: ["Genebra", "Nova York", "Bruxelas"],
            correta: 1
        },
        {
            pergunta: "Qual país nunca foi colonizado na África?",
            alternativas: ["Etiópia", "Nigéria", "Quênia"],
            correta: 0
        }
    ],

    // =====================================================
    // NIVEL 18 → 19  |  Analista de Inteligência → Analista Especial
    // =====================================================
    19: [
        {
            pergunta: "Qual agência de inteligência pertence a Israel?",
            alternativas: ["MI6", "FSB", "Mossad"],
            correta: 2
        },
        {
            pergunta: "Qual é a capital do Marrocos?",
            alternativas: ["Casablanca", "Rabat", "Marrakesh"],
            correta: 1
        },
        {
            pergunta: "Qual tratado criou a União Europeia?",
            alternativas: ["Versalhes", "Maastricht", "Roma"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 19 → 20  |  Analista Especial → Operador de Inteligência
    // =====================================================
    20: [
        {
            pergunta: "Qual agência de inteligência pertence à Rússia?",
            alternativas: ["CIA", "BND", "FSB"],
            correta: 2
        },
        {
            pergunta: "Qual país tem a maior reserva de petróleo?",
            alternativas: ["Arábia Saudita", "Venezuela", "Rússia"],
            correta: 1
        },
        {
            pergunta: "Qual cidade é conhecida como a capital da espionagem?",
            alternativas: ["Berlim", "Viena", "Genebra"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 20 → 21  |  Operador de Inteligência → Operador Especial
    // 🟣 Entrando na classe Elite
    // =====================================================
    21: [
        {
            pergunta: "Qual foi a operação que capturou Osama bin Laden?",
            alternativas: ["Operação Netuno", "Operação Tempestade", "Operação Tridente"],
            correta: 0
        },
        {
            pergunta: "Qual é o nome do serviço de inteligência da Alemanha?",
            alternativas: ["BND", "DGSE", "ASIS"],
            correta: 0
        },
        {
            pergunta: "Qual país tem a sede da Interpol?",
            alternativas: ["Suíça", "França", "Holanda"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 21 → 22  |  Operador Especial → Inspetor
    // =====================================================
    22: [
        {
            pergunta: "Qual é a capital do Cazaquistão?",
            alternativas: ["Almaty", "Astana", "Bishkek"],
            correta: 1
        },
        {
            pergunta: "Qual país fica totalmente dentro de outro?",
            alternativas: ["Mônaco", "Lesoto", "Luxemburgo"],
            correta: 1
        },
        {
            pergunta: "Qual rio é o mais longo do mundo?",
            alternativas: ["Amazonas", "Nilo", "Yangtze"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 22 → 23  |  Inspetor → Inspetor de Campo
    // =====================================================
    23: [
        {
            pergunta: "O que significa SIGINT em inteligência?",
            alternativas: ["Sinal de Alerta", "Inteligência de Sinais", "Sinalização Interna"],
            correta: 1
        },
        {
            pergunta: "Qual país construiu o Canal de Suez?",
            alternativas: ["Egito", "França", "Reino Unido"],
            correta: 1
        },
        {
            pergunta: "Qual é a capital da Mongólia?",
            alternativas: ["Darkhan", "Ulaanbaatar", "Erdenet"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 23 → 24  |  Inspetor de Campo → Inspetor Especial
    // =====================================================
    24: [
        {
            pergunta: "O que significa HUMINT?",
            alternativas: ["Inteligência Humana", "Inteligência Digital", "Inteligência Militar"],
            correta: 0
        },
        {
            pergunta: "Qual foi o muro que dividiu Berlim?",
            alternativas: ["Muro de Adriano", "Muro de Berlim", "Cortina de Ferro"],
            correta: 1
        },
        {
            pergunta: "Qual país é o maior exportador de diamantes?",
            alternativas: ["Rússia", "Botsuana", "África do Sul"],
            correta: 0
        }
    ],

    // =====================================================
    // NIVEL 24 → 25  |  Inspetor Especial → Inspetor Sênior
    // =====================================================
    25: [
        {
            pergunta: "Qual é o nome do serviço secreto francês?",
            alternativas: ["MI5", "DGSE", "CNI"],
            correta: 1
        },
        {
            pergunta: "Qual cidade foi dividida durante a Guerra Fria?",
            alternativas: ["Viena", "Berlim", "Varsóvia"],
            correta: 1
        },
        {
            pergunta: "Qual é a capital da Nova Zelândia?",
            alternativas: ["Auckland", "Wellington", "Christchurch"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 25 → 26  |  Inspetor Sênior → Supervisor de Campo
    // =====================================================
    26: [
        {
            pergunta: "Qual programa de vigilância foi revelado por Edward Snowden?",
            alternativas: ["ECHELON", "PRISM", "CARNIVORE"],
            correta: 1
        },
        {
            pergunta: "Qual país tem a maior costa do mundo?",
            alternativas: ["Indonésia", "Canadá", "Rússia"],
            correta: 1
        },
        {
            pergunta: "Qual é a capital do Vietnã?",
            alternativas: ["Ho Chi Minh", "Hanói", "Da Nang"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 26 → 27  |  Supervisor de Campo → Supervisor de Operações
    // =====================================================
    27: [
        {
            pergunta: "Qual cifra foi quebrada em Bletchley Park na WWII?",
            alternativas: ["César", "Enigma", "Vigenère"],
            correta: 1
        },
        {
            pergunta: "Qual organização internacional combate o crime organizado?",
            alternativas: ["UNESCO", "Interpol", "UNICEF"],
            correta: 1
        },
        {
            pergunta: "Qual país possui a maior floresta tropical?",
            alternativas: ["Indonésia", "Congo", "Brasil"],
            correta: 2
        }
    ],

    // =====================================================
    // NIVEL 27 → 28  |  Supervisor de Operações → Supervisor Especial
    // =====================================================
    28: [
        {
            pergunta: "Qual foi o codinome da invasão aliada na Normandia?",
            alternativas: ["Operação Barbarossa", "Operação Overlord", "Operação Market Garden"],
            correta: 1
        },
        {
            pergunta: "Qual país tem três capitais?",
            alternativas: ["Malásia", "África do Sul", "Bolívia"],
            correta: 1
        },
        {
            pergunta: "Qual é o idioma mais falado do mundo por nativos?",
            alternativas: ["Inglês", "Espanhol", "Mandarim"],
            correta: 2
        }
    ],

    // =====================================================
    // NIVEL 28 → 29  |  Supervisor Especial → Coordenador de Operações
    // =====================================================
    29: [
        {
            pergunta: "Qual tratado encerrou a Primeira Guerra Mundial?",
            alternativas: ["Tratado de Versalhes", "Tratado de Paris", "Tratado de Viena"],
            correta: 0
        },
        {
            pergunta: "Qual agência da ONU cuida de refugiados?",
            alternativas: ["UNICEF", "ACNUR", "OMS"],
            correta: 1
        },
        {
            pergunta: "Qual país é conhecido como 'A Joia do Oceano Índico'?",
            alternativas: ["Madagascar", "Sri Lanka", "Maldivas"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 29 → 30  |  Coordenador de Operações → Coordenador Especial
    // =====================================================
    30: [
        {
            pergunta: "Qual é o protocolo de comunicação mais seguro?",
            alternativas: ["HTTP", "FTP", "End-to-End Encryption"],
            correta: 2
        },
        {
            pergunta: "Qual país controla o Estreito de Ormuz?",
            alternativas: ["Arábia Saudita", "Irã", "Omã"],
            correta: 1
        },
        {
            pergunta: "Qual era o codinome da bomba atômica dos EUA?",
            alternativas: ["Projeto Manhattan", "Projeto Apollo", "Projeto Mercúrio"],
            correta: 0
        }
    ],

    // =====================================================
    // NIVEL 30 → 31  |  Coordenador Especial → Comandante Assistente
    // 🟠 Entrando na classe Comando
    // =====================================================
    31: [
        {
            pergunta: "Qual espião traiu a CIA e trabalhou para a KGB?",
            alternativas: ["Aldrich Ames", "James Bond", "Edward Snowden"],
            correta: 0
        },
        {
            pergunta: "Qual é a sede da OTAN?",
            alternativas: ["Paris", "Bruxelas", "Washington"],
            correta: 1
        },
        {
            pergunta: "Qual país nunca perdeu uma guerra segundo registros?",
            alternativas: ["Israel", "Canadá", "Suíça"],
            correta: 0
        }
    ],

    // =====================================================
    // NIVEL 31 → 32  |  Comandante Assistente → Comandante de Campo
    // =====================================================
    32: [
        {
            pergunta: "Qual técnica usa satélites para espionagem?",
            alternativas: ["HUMINT", "IMINT", "SIGINT"],
            correta: 1
        },
        {
            pergunta: "Qual país construiu a Grande Muralha?",
            alternativas: ["Japão", "China", "Mongólia"],
            correta: 1
        },
        {
            pergunta: "Qual é a capital da Colômbia?",
            alternativas: ["Medellín", "Bogotá", "Cali"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 32 → 33  |  Comandante de Campo → Comandante Especial
    // =====================================================
    33: [
        {
            pergunta: "Qual operação derrubou o governo do Irã em 1953?",
            alternativas: ["Operação Ajax", "Operação Ciclone", "Operação Condor"],
            correta: 0
        },
        {
            pergunta: "Qual é a moeda da Suíça?",
            alternativas: ["Euro", "Franco Suíço", "Libra"],
            correta: 1
        },
        {
            pergunta: "Qual é o maior lago da África?",
            alternativas: ["Lago Tanganica", "Lago Vitória", "Lago Malawi"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 33 → 34  |  Comandante Especial → Comandante de Operações
    // =====================================================
    34: [
        {
            pergunta: "O que é uma 'dead drop' em espionagem?",
            alternativas: ["Assassinato", "Ponto secreto de troca", "Armadilha"],
            correta: 1
        },
        {
            pergunta: "Qual país tem a maior rede ferroviária de alta velocidade?",
            alternativas: ["Japão", "França", "China"],
            correta: 2
        },
        {
            pergunta: "Qual vulcão destruiu Pompeia?",
            alternativas: ["Etna", "Vesúvio", "Krakatoa"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 34 → 35  |  Comandante de Operações → Comandante Sênior
    // =====================================================
    35: [
        {
            pergunta: "Qual era o nome do serviço secreto soviético?",
            alternativas: ["FSB", "KGB", "GRU"],
            correta: 1
        },
        {
            pergunta: "Qual é a capital de Myanmar?",
            alternativas: ["Rangum", "Naypyidaw", "Mandalay"],
            correta: 1
        },
        {
            pergunta: "Qual país faz parte dos Five Eyes?",
            alternativas: ["França", "Alemanha", "Austrália"],
            correta: 2
        }
    ],

    // =====================================================
    // NIVEL 35 → 36  |  Comandante Sênior → Diretor Assistente
    // 🔴 Entrando na classe Diretoria
    // =====================================================
    36: [
        {
            pergunta: "Qual é o sistema de espionagem por cabo submarino da NSA?",
            alternativas: ["ECHELON", "TEMPORA", "XKeyscore"],
            correta: 2
        },
        {
            pergunta: "Qual foi o primeiro país a ter um serviço de inteligência?",
            alternativas: ["Inglaterra", "Egito Antigo", "China Imperial"],
            correta: 0
        },
        {
            pergunta: "Qual é o país mais novo do mundo?",
            alternativas: ["Kosovo", "Sudão do Sul", "Timor-Leste"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 36 → 37  |  Diretor Assistente → Diretor Operacional
    // =====================================================
    37: [
        {
            pergunta: "Qual guerra gerou a criação da CIA?",
            alternativas: ["Primeira Guerra", "Segunda Guerra", "Guerra Fria"],
            correta: 1
        },
        {
            pergunta: "Qual país está localizado em quatro hemisférios?",
            alternativas: ["Brasil", "Indonésia", "Kiribati"],
            correta: 2
        },
        {
            pergunta: "Qual é a capital do Butão?",
            alternativas: ["Katmandu", "Thimphu", "Daca"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 37 → 38  |  Diretor Operacional → Diretor de Inteligência
    // =====================================================
    38: [
        {
            pergunta: "O que é o 'Five Eyes'?",
            alternativas: ["Satélite espião", "Aliança de inteligência", "Software de vigilância"],
            correta: 1
        },
        {
            pergunta: "Qual país possui a Zona 51?",
            alternativas: ["Rússia", "Estados Unidos", "Reino Unido"],
            correta: 1
        },
        {
            pergunta: "Qual operação da CIA financiou guerrilheiros no Afeganistão?",
            alternativas: ["Operação Ciclone", "Operação Ajax", "Operação Paperclip"],
            correta: 0
        }
    ],

    // =====================================================
    // NIVEL 38 → 39  |  Diretor de Inteligência → Diretor Estratégico
    // =====================================================
    39: [
        {
            pergunta: "Qual operação levou cientistas nazistas aos EUA?",
            alternativas: ["Operação Overlord", "Operação Paperclip", "Operação Barbarossa"],
            correta: 1
        },
        {
            pergunta: "Qual é o maior arquipélago do mundo?",
            alternativas: ["Filipinas", "Japão", "Indonésia"],
            correta: 2
        },
        {
            pergunta: "Qual cifra usa uma chave que muda a cada letra?",
            alternativas: ["César", "Vigenère", "Atbash"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 39 → 40  |  Diretor Estratégico → Diretor Global
    // =====================================================
    40: [
        {
            pergunta: "Qual satélite espião foi o primeiro dos EUA?",
            alternativas: ["CORONA", "Hubble", "Sputnik"],
            correta: 0
        },
        {
            pergunta: "Qual tratado proíbe armas nucleares no espaço?",
            alternativas: ["START", "Tratado do Espaço Sideral", "TNP"],
            correta: 1
        },
        {
            pergunta: "Qual país possui o maior número de embaixadas no mundo?",
            alternativas: ["China", "Estados Unidos", "França"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 40 → 41  |  Diretor Global → Diretor Executivo
    // =====================================================
    41: [
        {
            pergunta: "Qual técnica criptográfica usa pares de chaves?",
            alternativas: ["Simétrica", "Assimétrica", "Hash"],
            correta: 1
        },
        {
            pergunta: "Qual espiã foi executada na Primeira Guerra Mundial?",
            alternativas: ["Mata Hari", "Virginia Hall", "Noor Inayat Khan"],
            correta: 0
        },
        {
            pergunta: "Qual é a sede do Tribunal Penal Internacional?",
            alternativas: ["Genebra", "Nova York", "Haia"],
            correta: 2
        }
    ],

    // =====================================================
    // NIVEL 41 → 42  |  Diretor Executivo → Diretor Supremo Assistente
    // =====================================================
    42: [
        {
            pergunta: "Qual operação israelense resgatou reféns em Entebbe?",
            alternativas: ["Operação Thunderbolt", "Operação Cólera de Deus", "Operação Moisés"],
            correta: 0
        },
        {
            pergunta: "Qual é o ponto mais profundo do oceano?",
            alternativas: ["Fossa de Porto Rico", "Fossa das Marianas", "Fossa de Java"],
            correta: 1
        },
        {
            pergunta: "Qual país possui o serviço de inteligência RAW?",
            alternativas: ["Paquistão", "Índia", "China"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 42 → 43  |  Diretor Supremo Assistente → Diretor Supremo
    // =====================================================
    43: [
        {
            pergunta: "O que é esteganografia?",
            alternativas: ["Escrita em código", "Ocultar mensagem em imagens", "Linguagem de sinais"],
            correta: 1
        },
        {
            pergunta: "Qual espião ficou famoso pelo caso Rosenberg?",
            alternativas: ["Philby", "Rosenberg", "Ames"],
            correta: 1
        },
        {
            pergunta: "Qual país tem a maior zona econômica exclusiva marítima?",
            alternativas: ["Estados Unidos", "França", "Austrália"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 43 → 44  |  Diretor Supremo → Diretor Supremo Global
    // =====================================================
    44: [
        {
            pergunta: "Qual é a rede de inteligência mais antiga em atividade?",
            alternativas: ["CIA", "MI6", "Sûreté"],
            correta: 1
        },
        {
            pergunta: "Qual país possui 'Números Stations' mais documentadas?",
            alternativas: ["Rússia", "Cuba", "China"],
            correta: 0
        },
        {
            pergunta: "Qual tratado limita armas nucleares entre EUA e Rússia?",
            alternativas: ["New START", "SALT I", "INF"],
            correta: 0
        }
    ],

    // =====================================================
    // NIVEL 44 → 45  |  Diretor Supremo Global → Diretor Supremo de Operações
    // =====================================================
    45: [
        {
            pergunta: "Qual foi o agente duplo mais famoso do MI6?",
            alternativas: ["Kim Philby", "James Angleton", "Oleg Gordievsky"],
            correta: 0
        },
        {
            pergunta: "Qual país construiu o primeiro computador para quebrar cifras?",
            alternativas: ["Estados Unidos", "Reino Unido", "Alemanha"],
            correta: 1
        },
        {
            pergunta: "Qual é a capital de Vanuatu?",
            alternativas: ["Suva", "Port Vila", "Majuro"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 45 → 46  |  Dir. Supremo de Operações → Guardião da A.T.L.A.S.
    // ⚫ Entrando na classe Lendário
    // =====================================================
    46: [
        {
            pergunta: "O que é o programa 'Stuxnet'?",
            alternativas: ["Rede social", "Arma cibernética", "Sistema de radar"],
            correta: 1
        },
        {
            pergunta: "Qual foi a operação secreta para assassinar cientistas nucleares iranianos?",
            alternativas: ["Operação Cólera de Deus", "Operação Sombra", "A operação não tem nome público confirmado"],
            correta: 2
        },
        {
            pergunta: "Qual país construiu o túnel de espionagem sob Berlim?",
            alternativas: ["URSS", "EUA e Reino Unido", "França"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 46 → 47  |  Guardião da A.T.L.A.S. → Mestre da Inteligência
    // =====================================================
    47: [
        {
            pergunta: "Qual técnica de interrogatório foi desenvolvida pela CIA no MKUltra?",
            alternativas: ["Tortura convencional", "Controle mental", "Polígrado avançado"],
            correta: 1
        },
        {
            pergunta: "Qual país operou a rede de espionagem 'Cambridge Five'?",
            alternativas: ["EUA", "URSS", "Alemanha"],
            correta: 1
        },
        {
            pergunta: "Qual é o menor território soberano da Ásia?",
            alternativas: ["Singapura", "Maldivas", "Macau"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 47 → 48  |  Mestre da Inteligência → Agente Global
    // =====================================================
    48: [
        {
            pergunta: "Qual foi a última mensagem conhecida da cifra Zodiac?",
            alternativas: ["Z340", "Z408", "Z13"],
            correta: 0
        },
        {
            pergunta: "Qual código foi usado pelos Navajos na WWII?",
            alternativas: ["Código Navajo", "Código Enigma", "Código Purple"],
            correta: 0
        },
        {
            pergunta: "Qual é a montanha mais alta da América do Sul?",
            alternativas: ["Chimborazo", "Aconcágua", "Cotopaxi"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 48 → 49  |  Agente Global → Comandante Supremo
    // =====================================================
    49: [
        {
            pergunta: "Qual operação secreta da CIA na Baía dos Porcos falhou?",
            alternativas: ["Operação Zapata", "Operação Mongoose", "Operação Northwoods"],
            correta: 0
        },
        {
            pergunta: "Qual espião soviético infiltrou o Projeto Manhattan?",
            alternativas: ["Klaus Fuchs", "Aldrich Ames", "Kim Philby"],
            correta: 0
        },
        {
            pergunta: "Qual país possui a fronteira internacional mais longa?",
            alternativas: ["Rússia-China", "EUA-Canadá", "Argentina-Chile"],
            correta: 1
        }
    ],

    // =====================================================
    // NIVEL 49 → 50  |  Comandante Supremo → Lenda da A.T.L.A.S.
    // Pergunta final — a mais difícil
    // =====================================================
    50: [
        {
            pergunta: "Qual foi o codinome do agente duplo Oleg Gordievsky?",
            alternativas: ["TICKLE", "OVATION", "SUNBEAM"],
            correta: 1
        },
        {
            pergunta: "Qual dispositivo era usado para comunicação segura na Guerra Fria via satélite?",
            alternativas: ["MOLNIYA", "VELA", "CORONA"],
            correta: 0
        },
        {
            pergunta: "Qual foi a operação de inteligência mais longa da história (30+ anos)?",
            alternativas: ["Operação RYAN", "A espionagem de Markus Wolf na BND", "Jack Barsky na FBI"],
            correta: 1
        }
    ]
};

/**
 * Retorna uma pergunta aleatória para o nível de destino.
 * @param {number} nivelDestino — nível que o jogador quer alcançar
 * @returns {{ pergunta: string, alternativas: string[], correta: number } | null}
 */
export function getPromotionQuestion(nivelDestino) {
    const perguntas = PROMOTION_QUESTIONS[nivelDestino];
    if (!perguntas || perguntas.length === 0) return null;
    return perguntas[Math.floor(Math.random() * perguntas.length)];
}
