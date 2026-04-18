/**
 * 🌍 Cidades de Viagem — Operação Meridian
 *
 * Catálogo centralizado de todas as cidades do jogo.
 * Cada cidade possui nome, país, descrição e caminho da imagem.
 *
 * Uso:
 *   import { CIDADES, getCidade } from "./Cidades";
 *   const city = getCidade("Lisboa");   // → objeto completo
 *   const img  = city.imagem;           // → "/Paises/Lisboa.png"
 */
export const CIDADES = [
    {
        id: "001",
        cidade: "Buenos Aires",
        pais: "Argentina",
        continente: "América do Sul",
        imagem: "/Paises/BuenosAires.png",
        descricao: "Capital da Argentina, Buenos Aires é famosa pelo tango, arquitetura europeia e vida cultural intensa. Seus bairros históricos e cafés tradicionais revelam uma cidade vibrante e cheia de identidade sul-americana.",
        dicas: [
            { id: "001-01", texto: "A bandeira do país tem faixas azul-claro e branca, com um sol ao centro." },
            { id: "001-02", texto: "A moeda utilizada por lá é o peso argentino." },
            { id: "001-03", texto: "Ouvi menção a uma cidade famosa pelo tango." },
            { id: "001-04", texto: "As pessoas falavam espanhol com forte sotaque portenho." },
            { id: "001-05", texto: "Comentaram sobre bairros elegantes e avenidas largas." },
            { id: "001-06", texto: "A pista citava uma capital muito ligada ao futebol e à cultura." },
            { id: "001-07", texto: "Falaram de um obelisco muito conhecido no centro da cidade." },
            { id: "001-08", texto: "Ouvi referência a cafés tradicionais e arquitetura europeia." },
            { id: "001-09", texto: "A cidade parece ficar às margens de um grande estuário." },
            { id: "001-10", texto: "Tudo indicava uma capital sul-americana cheia de vida noturna." }
        ]
    },
    {
        id: "002",
        cidade: "Cairo",
        pais: "Egito",
        continente: "África",
        imagem: "/Paises/Cairo.png",
        descricao: "Capital do Egito, Cairo é uma das cidades mais antigas do mundo. Próxima às pirâmides de Gizé, mistura história milenar com vida moderna, sendo um centro cultural e político do Oriente Médio.",
        dicas: [
            { id: "002-01", texto: "A bandeira tinha faixas vermelha, branca e preta com um símbolo dourado." },
            { id: "002-02", texto: "A moeda utilizada no país é a libra egípcia." },
            { id: "002-03", texto: "A pista falava de pirâmides famosas no mundo inteiro." },
            { id: "002-04", texto: "Ouvi pessoas se comunicando em árabe." },
            { id: "002-05", texto: "Comentaram sobre um grande rio que corta a região." },
            { id: "002-06", texto: "A cidade parecia cercada por história antiga e desertos." },
            { id: "002-07", texto: "Falaram de mercados tradicionais e intenso calor." },
            { id: "002-08", texto: "Mencionaram monumentos ligados a faraós e civilizações antigas." },
            { id: "002-09", texto: "A testemunha citou uma capital do norte da África." },
            { id: "002-10", texto: "Tudo apontava para uma metrópole do Oriente Médio cheia de passado milenar." }
        ]
    },
    {
        id: "003",
        cidade: "Campinas",
        pais: "Brasil",
        continente: "América do Sul",
        imagem: "/Paises/default.png",
        descricao: "Cidade do interior de São Paulo, Campinas é um importante polo tecnológico e universitário. Moderna e estratégica, abriga centros de pesquisa e uma das maiores regiões metropolitanas do Brasil.",
        dicas: [
            { id: "003-01", texto: "A bandeira do país tem verde, amarelo, azul e branco." },
            { id: "003-02", texto: "A moeda utilizada é o real." },
            { id: "003-03", texto: "Ouvi pessoas falando português brasileiro." },
            { id: "003-04", texto: "Comentaram sobre uma cidade do interior ligada à tecnologia e universidades." },
            { id: "003-05", texto: "A pista citava uma grande região urbana no estado de São Paulo." },
            { id: "003-06", texto: "Falaram de centros de pesquisa e inovação." },
            { id: "003-07", texto: "Mencionaram uma cidade estratégica, mas não litorânea." },
            { id: "003-08", texto: "Ouvi referência a uma metrópole próxima da capital paulista." },
            { id: "003-09", texto: "A cidade parecia importante para ciência e desenvolvimento no Brasil." },
            { id: "003-10", texto: "Tudo indicava um polo tecnológico do interior brasileiro." }
        ]
    },
    {
        id: "004",
        cidade: "Sao Paulo",
        pais: "Brasil",
        continente: "América do Sul",
        imagem: "/Paises/SaoPaulo.png",
        descricao: "São Paulo é a maior cidade do Brasil, vibrante, diversa e cheia de cultura e oportunidades.",
        dicas: [
            { id: "004-01", texto: "A bandeira do país traz verde, amarelo e um círculo azul estrelado." },
            { id: "004-02", texto: "A moeda usada ali é o real." },
            { id: "004-03", texto: "Ouvi gente falando português com ritmo acelerado." },
            { id: "004-04", texto: "Comentaram sobre uma cidade enorme, cheia de prédios e avenidas." },
            { id: "004-05", texto: "A pista citava um grande centro financeiro da América do Sul." },
            { id: "004-06", texto: "Falaram de trânsito intenso e vida corrida." },
            { id: "004-07", texto: "Mencionaram diversidade cultural e gastronômica." },
            { id: "004-08", texto: "Ouvi referência a uma das maiores metrópoles do hemisfério sul." },
            { id: "004-09", texto: "A cidade parecia famosa por negócios, eventos e trabalho." },
            { id: "004-10", texto: "Tudo apontava para a maior cidade do Brasil." }
        ]
    },
    {
        id: "005",
        cidade: "Lisboa",
        pais: "Portugal",
        continente: "Europa",
        imagem: "/Paises/Lisboa.png",
        descricao: "Capital de Portugal, Lisboa é conhecida por suas colinas, bondes e rica herança marítima. Foi ponto central das grandes navegações e ainda preserva castelos, mirantes e bairros históricos.",
        dicas: [
            { id: "005-01", texto: "A bandeira tinha verde e vermelho com um brasão ao centro." },
            { id: "005-02", texto: "A moeda utilizada lá é o euro." },
            { id: "005-03", texto: "Ouvi pessoas falando português europeu." },
            { id: "005-04", texto: "Comentaram sobre bondes subindo ruas inclinadas." },
            { id: "005-05", texto: "A pista citava uma cidade ligada às grandes navegações." },
            { id: "005-06", texto: "Falaram de mirantes, colinas e bairros históricos." },
            { id: "005-07", texto: "Mencionaram um oceano e um passado marítimo muito forte." },
            { id: "005-08", texto: "Ouvi referência a uma capital europeia banhada pelo Tejo." },
            { id: "005-09", texto: "A cidade parecia misturar história, azulejos e tradição." },
            { id: "005-10", texto: "Tudo indicava uma capital ibérica muito ligada ao mar." }
        ]
    },
    {
        id: "006",
        cidade: "Londres",
        pais: "Reino Unido",
        continente: "Europa",
        imagem: "/Paises/Londres.png",
        descricao: "Capital do Reino Unido, Londres é um centro global de política, cultura e economia. Conhecida pelo Big Ben e sua história rica.",
        dicas: [
            { id: "006-01", texto: "A bandeira tinha cruzes vermelhas sobre fundo azul e branco." },
            { id: "006-02", texto: "A moeda usada por lá é a libra esterlina." },
            { id: "006-03", texto: "Ouvi pessoas falando inglês com sotaque britânico." },
            { id: "006-04", texto: "Comentaram sobre um relógio famoso e um parlamento histórico." },
            { id: "006-05", texto: "A pista citava ônibus vermelhos de dois andares." },
            { id: "006-06", texto: "Falaram de clima frio e céu frequentemente cinzento." },
            { id: "006-07", texto: "Mencionaram uma família real bastante conhecida." },
            { id: "006-08", texto: "Ouvi referência a uma cidade cortada pelo rio Tâmisa." },
            { id: "006-09", texto: "A cidade parecia um grande centro financeiro e político." },
            { id: "006-10", texto: "Tudo apontava para a capital do Reino Unido." }
        ]
    },
    {
        id: "007",
        cidade: "Madrid",
        pais: "Espanha",
        continente: "Europa",
        imagem: "/Paises/Madrid.png",
        descricao: "Capital da Espanha, Madrid é um importante centro cultural europeu. Famosa por seus museus, praças e vida noturna, combina história, arte e modernidade em uma cidade dinâmica.",
        dicas: [
            { id: "007-01", texto: "A bandeira tinha vermelho e amarelo com brasão." },
            { id: "007-02", texto: "A moeda utilizada no país é o euro." },
            { id: "007-03", texto: "Ouvi gente falando espanhol." },
            { id: "007-04", texto: "Comentaram sobre uma cidade famosa por museus e grandes praças." },
            { id: "007-05", texto: "A pista citava uma capital europeia com vida noturna agitada." },
            { id: "007-06", texto: "Falaram de arte, palácios e avenidas elegantes." },
            { id: "007-07", texto: "Mencionaram uma cidade no coração da Península Ibérica." },
            { id: "007-08", texto: "Ouvi referência a um importante centro cultural da Europa." },
            { id: "007-09", texto: "A cidade parecia muito ligada ao futebol e à história real." },
            { id: "007-10", texto: "Lembro de ter ouvido falar de um time famoso com o mesmo nome da Cidade." }
        ]
    },
    {
        id: "008",
        cidade: "Moscou",
        pais: "Rússia",
        continente: "Europa",
        imagem: "/Paises/Moscou.png",
        descricao: "Capital da Rússia, Moscou abriga o Kremlin e a Praça Vermelha. É um centro político e histórico com arquitetura imponente e forte influência na cultura e na geopolítica mundial.",
        dicas: [
            { id: "008-01", texto: "A bandeira tinha faixas branca, azul e vermelha." },
            { id: "008-02", texto: "A moeda usada ali é o rublo." },
            { id: "008-03", texto: "Ouvi pessoas falando russo." },
            { id: "008-04", texto: "Comentaram sobre uma praça vermelha muito famosa." },
            { id: "008-05", texto: "A pista citava cúpulas coloridas e arquitetura imponente." },
            { id: "008-06", texto: "Falaram de frio intenso e grande influência política." },
            { id: "008-07", texto: "Mencionaram um complexo governamental cercado por muros históricos." },
            { id: "008-08", texto: "Ouvi referência a uma capital poderosa do leste europeu." },
            { id: "008-09", texto: "A cidade parecia ligada a geopolítica e tradição imperial." },
            { id: "008-10", texto: "Tudo apontava para la capital da Rússia." }
        ]
    },
    {
        id: "009",
        cidade: "Nova York",
        pais: "Estados Unidos",
        continente: "América do Norte",
        imagem: "/Paises/NovaYork.png",
        descricao: "Maior cidade dos Estados Unidos, Nova York é um centro global de finanças e cultura. Conhecida pela Times Square, Estátua da Liberdade e seus arranha-céus icônicos.",
        dicas: [
            { id: "009-01", texto: "A bandeira do país tem estrelas brancas e listras vermelhas e brancas." },
            { id: "009-02", texto: "A moeda utilizada é o dólar." },
            { id: "009-03", texto: "Ouvi pessoas falando inglês americano." },
            { id: "009-04", texto: "Comentaram sobre uma estátua segurando uma tocha em um porto famoso." },
            { id: "009-05", texto: "A pista citava arranha-céus e luzes intensas por toda parte." },
            { id: "009-06", texto: "Falaram de uma praça muito conhecida por seus letreiros luminosos." },
            { id: "009-07", texto: "Mencionaram uma cidade que nunca dorme." },
            { id: "009-08", texto: "Ouvi referência a um grande centro financeiro mundial." },
            { id: "009-09", texto: "A cidade parecia repleta de táxis amarelos e avenidas agitadas." },
            { id: "009-10", texto: "Tudo indicava uma metrópole icônica dos Estados Unidos." }
        ]
    },
    {
        id: "010",
        cidade: "Paris",
        pais: "França",
        continente: "Europa",
        imagem: "/Paises/Paris.png",
        descricao: "Capital da França, Paris é famosa pela Torre Eiffel, museus e influência cultural. Conhecida como Cidade Luz, é referência mundial em arte, gastronomia e história.",
        dicas: [
            { id: "010-01", texto: "A bandeira do país tem três cores verticais: azul, branco e vermelho." },
            { id: "010-02", texto: "A moeda usada ali é o euro." },
            { id: "010-03", texto: "Ouvi pessoas falando francês." },
            { id: "010-04", texto: "Comentaram sobre uma torre de ferro famosa no mundo inteiro." },
            { id: "010-05", texto: "A pista citava museus, arte e muita elegância." },
            { id: "010-06", texto: "Falaram de cafés charmosos e ruas sofisticadas." },
            { id: "010-07", texto: "Mencionaram uma cidade conhecida como Cidade Luz." },
            { id: "010-08", texto: "Ouvi referência a um arco monumental muito famoso." },
            { id: "010-09", texto: "A cidade parecia ser símbolo de moda e cultura." },
            { id: "010-10", texto: "Tudo apontava para a capital da França." }
        ]
    },
    {
        id: "011",
        cidade: "Rio de Janeiro",
        pais: "Brasil",
        continente: "América do Sul",
        imagem: "/Paises/RiodeJaneiro.png",
        descricao: "Cidade brasileira conhecida pelo Cristo Redentor e praias como Copacabana. O Rio mistura natureza, cultura e uma das paisagens urbanas mais famosas do planeta.",
        dicas: [
            { id: "011-01", texto: "A bandeira do país mistura verde, amarelo, azul e branco." },
            { id: "011-02", texto: "A moeda utilizada é o real." },
            { id: "011-03", texto: "Ouvi pessoas falando português brasileiro." },
            { id: "011-04", texto: "Comentaram sobre uma estátua enorme de braços abertos sobre um morro." },
            { id: "011-05", texto: "A pista citava praias mundialmente famosas." },
            { id: "011-06", texto: "Falaram de samba, calor e paisagens de tirar o fôlego." },
            { id: "011-07", texto: "Mencionaram montanhas próximas ao mar." },
            { id: "011-08", texto: "Ouvi referência a uma cidade muito ligada ao carnaval." },
            { id: "011-09", texto: "A cidade parecia unir natureza e vida urbana em cenário icônico." },
            { id: "011-10", texto: "Comentaram sobre um bondinho que sobe até o Pão de Açúcar." }
        ]
    },
    {
        id: "012",
        cidade: "Roma",
        pais: "Itália",
        continente: "Europa",
        imagem: "/Paises/Roma.png",
        descricao: "Capital da Itália, Roma é conhecida como a Cidade Eterna. Abriga monumentos como o Coliseu e foi o centro do Império Romano.",
        dicas: [
            { id: "012-01", texto: "A bandeira tinha verde, branco e vermelho em faixas verticais." },
            { id: "012-02", texto: "A moeda usada lá é o euro." },
            { id: "012-03", texto: "Ouvi pessoas falando italiano." },
            { id: "012-04", texto: "Comentaram sobre um anfiteatro antigo muito famoso." },
            { id: "012-05", texto: "A pista citava ruínas e monumentos da antiguidade." },
            { id: "012-06", texto: "Falaram sobre uma cidade chamada de Eterna." },
            { id: "012-07", texto: "Mencionaram fontes históricas e praças clássicas." },
            { id: "012-08", texto: "Ouvi referência ao antigo Império Romano." },
            { id: "012-09", texto: "A cidade parecia um museu a céu aberto." },
            { id: "012-10", texto: "Tudo apontava para a capital da Itália." }
        ]
    },
    {
        id: "013",
        cidade: "Salvador",
        pais: "Brasil",
        continente: "América do Sul",
        imagem: "/Paises/Salvador.png",
        descricao: "Capital da Bahia, Salvador é rica em cultura afro-brasileira. Seu centro histórico, o Pelourinho, preserva arquitetura colonial e tradições únicas.",
        dicas: [
            { id: "013-01", texto: "A bandeira do país traz verde, amarelo, azul e branco." },
            { id: "013-02", texto: "A moeda usada ali é o real." },
            { id: "013-03", texto: "Ouvi gente falando português brasileiro." },
            { id: "013-04", texto: "Comentaram sobre uma cidade de forte influência afro-brasileira." },
            { id: "013-05", texto: "A pista citava um centro histórico muito colorido." },
            { id: "013-06", texto: "Falaram de música, tradição e culinária marcante." },
            { id: "013-07", texto: "Mencionaram igrejas coloniais e ladeiras históricas." },
            { id: "013-08", texto: "Ouvi referência ao Pelourinho." },
            { id: "013-09", texto: "A cidade parecia ter forte ligação com festas populares e religião." },
            { id: "013-10", texto: "Tudo indicava uma capital do nordeste brasileiro." }
        ]
    },
    {
        id: "014",
        cidade: "Sydney",
        pais: "Austrália",
        continente: "Oceania",
        imagem: "/Paises/Sidney.png",
        descricao: "Maior cidade da Austrália, Sydney é famosa pela Opera House e seu porto. Combina praias, modernidade e natureza.",
        dicas: [
            { id: "014-01", texto: "A bandeira tinha azul, estrelas e a Union Jack em um canto." },
            { id: "014-02", texto: "A moeda utilizada é o dólar australiano." },
            { id: "014-03", texto: "Ouvi pessoas falando inglês." },
            { id: "014-04", texto: "Comentaram sobre um edifício famoso com formato de velas brancas." },
            { id: "014-05", texto: "A pista citava um porto muito conhecido." },
            { id: "014-06", texto: "Falaram de praias, modernidade e clima ensolarado." },
            { id: "014-07", texto: "Mencionaram uma cidade importante da Oceania." },
            { id: "014-08", texto: "Ouvi referência a uma baía com paisagens icônicas." },
            { id: "014-09", texto: "A cidade parecia unir natureza e arquitetura marcante." },
            { id: "014-10", texto: "Tudo apontava para uma grande cidade australiana." }
        ]
    },
    {
        id: "015",
        cidade: "São Paulo",
        pais: "Brasil",
        continente: "América do Sul",
        imagem: "/Paises/SaoPaulo.png",
        descricao: "A maior metrópole da América do Sul, centro financeiro e cultural do Brasil. Famosa por seu ritmo frenético, diversidade gastronômica e grandes monumentos.",
        dicas: [
            { id: "015-01", texto: "A bandeira do país traz verde, amarelo, azul e branco." },
            { id: "015-02", texto: "A moeda usada ali é o real." },
            { id: "015-03", texto: "Ouvi pessoas falando português em ritmo acelerado." },
            { id: "015-04", texto: "Comentaram sobre uma metrópole gigante da América do Sul." },
            { id: "015-05", texto: "A pista citava uma cidade famosa por prédios, negócios e cultura." },
            { id: "015-06", texto: "Falaram de muito trânsito e vida urbana intensa." },
            { id: "015-07", texto: "Mencionaram gastronomia variada e bairros muito diferentes entre si." },
            { id: "015-08", texto: "Ouvi referência a um grande centro financeiro brasileiro." },
            { id: "015-09", texto: "A cidade parecia não parar em nenhum momento do dia." },
            { id: "015-10", texto: "Tudo indicava São Paulo." }
        ]
    },
    {
        id: "016",
        cidade: "Thimphu",
        pais: "Butão",
        continente: "Ásia",
        imagem: "/Paises/Thimphu.png",
        descricao: "Capital do Butão, Thimphu é uma cidade única que preserva tradições budistas e não possui semáforos. Cercada por montanhas, combina natureza e cultura.",
        dicas: [
            { id: "016-01", texto: "A bandeira do país é dividida em amarelo e laranja com um dragão branco." },
            { id: "016-02", texto: "A moeda utilizada é o ngultrum." },
            { id: "016-03", texto: "Ouvi pessoas falando dzongkha." },
            { id: "016-04", texto: "Comentaram sobre uma capital cercada por montanhas." },
            { id: "016-05", texto: "A pista citava uma cidade sem semáforos." },
            { id: "016-06", texto: "Falaram de forte tradição budista." },
            { id: "016-07", texto: "Mencionaram mosteiros, espiritualidade e natureza." },
            { id: "016-08", texto: "Ouvi referência a um pequeno reino asiático." },
            { id: "016-09", texto: "A cidade parecia preservar costumes antigos com muito cuidado." },
            { id: "016-10", texto: "Tudo apontava para a capital do Butão." }
        ]
    },
    {
        id: "017",
        cidade: "Tóquio",
        pais: "Japão",
        continente: "Ásia",
        imagem: "/Paises/Tokio.png",
        descricao: "Capital do Japão, Tóquio é uma das maiores metrópoles do mundo. Combina tecnologia avançada, tradição milenar e cultura única.",
        dicas: [
            { id: "017-01", texto: "A bandeira era branca com um círculo vermelho ao centro." },
            { id: "017-02", texto: "A moeda utilizada é o iene." },
            { id: "017-03", texto: "Ouvi pessoas falando japonês." },
            { id: "017-04", texto: "Comentaram sobre uma cidade extremamente tecnológica." },
            { id: "017-05", texto: "A pista citava letreiros luminosos e ritmo acelerado." },
            { id: "017-06", texto: "Falaram de tradição milenar convivendo com inovação." },
            { id: "017-07", texto: "Mencionaram templos antigos em meio à metrópole." },
            { id: "017-08", texto: "Ouvi referência a uma das maiores cidades do planeta." },
            { id: "017-09", texto: "A cidade parecia organizada, moderna e cheia de contrastes." },
            { id: "017-10", texto: "Tudo indicava a capital do Japão." }
        ]
    },
    {
        id: "018",
        cidade: "Toronto",
        pais: "Canadá",
        continente: "América do Norte",
        imagem: "/Paises/Toronto.png",
        descricao: "Maior cidade do Canadá, Toronto é multicultural e moderna. Conhecida pela CN Tower e sua diversidade cultural.",
        dicas: [
            { id: "018-01", texto: "A bandeira do país traz duas faixas vermelhas e uma folha de bordo ao centro." },
            { id: "018-02", texto: "A moeda utilizada é o dólar canadense." },
            { id: "018-03", texto: "Ouvi pessoas falando inglês, e talvez também francês em alguns lugares." },
            { id: "018-04", texto: "Comentaram sobre uma torre muito alta e famosa." },
            { id: "018-05", texto: "A pista citava uma cidade bastante multicultural." },
            { id: "018-06", texto: "Falaram de clima frio em boa parte do ano." },
            { id: "018-07", texto: "Mencionaram uma metrópole importante do Canadá." },
            { id: "018-08", texto: "Ouvi referência a diversidade cultural e financeira." },
            { id: "018-09", texto: "A cidade parecia moderna e organizada." },
            { id: "018-10", texto: "Tudo apontava para Toronto." }
        ]
    },
    {
        id: "019",
        cidade: "Trípoli",
        pais: "Líbia",
        continente: "África",
        imagem: "/Paises/Tripoli.png",
        descricao: "Capital da Líbia, Trípoli é uma cidade histórica às margens do Mediterrâneo. Possui mercados tradicionais e arquitetura que reflete séculos de história.",
        dicas: [
            { id: "019-01", texto: "A bandeira tinha vermelho, preto e verde, com crescente e estrela brancos." },
            { id: "019-02", texto: "A moeda utilizada é o dinar líbio." },
            { id: "019-03", texto: "Ouvi pessoas falando árabe." },
            { id: "019-04", texto: "Comentaram sobre uma cidade às margens do Mediterrâneo." },
            { id: "019-05", texto: "A pista citava mercados tradicionais e construções antigas." },
            { id: "019-06", texto: "Falaram de calor e herança histórica no norte da África." },
            { id: "019-07", texto: "Mencionaram uma capital com forte influência árabe." },
            { id: "019-08", texto: "Ouvi referência a uma cidade portuária histórica." },
            { id: "019-09", texto: "A cidade parecia guardar marcas de muitos séculos." },
            { id: "019-10", texto: "Tudo indicava a capital da Líbia." }
        ]
    },
    {
        id: "020",
        cidade: "Dubai",
        pais: "Emirados Árabes",
        continente: "Ásia",
        imagem: "/Paises/Dubai.png",
        descricao: "Uma das cidades mais luxuosas e modernas do mundo, Dubai é famosa por seus arranha-céus, como o Burj Khalifa, e por ser um centro global de comércio e turismo no deserto.",
        dicas: [
            { id: "020-01", texto: "A bandeira tinha vermelho, verde, branco e preto." },
            { id: "020-02", texto: "A moeda utilizada é o dirham dos Emirados." },
            { id: "020-03", texto: "Ouvi pessoas falando árabe, mas também muitos idiomas estrangeiros." },
            { id: "020-04", texto: "Comentaram sobre o prédio mais alto do mundo." },
            { id: "020-05", texto: "A pista citava luxo, comércio e muito vidro espelhado." },
            { id: "020-06", texto: "Falaram de uma cidade moderna erguida em meio ao deserto." },
            { id: "020-07", texto: "Mencionaram hotéis extravagantes e ilhas artificiais." },
            { id: "020-08", texto: "Ouvi referência a um grande centro de turismo e negócios." },
            { id: "020-09", texto: "A cidade parecia brilhante, quente e futurista." },
            { id: "020-10", texto: "Disseram que lá o impossível costuma virar construção." }
        ]
    },
    {
        id: "021",
        cidade: "Seul",
        pais: "Coreia do Sul",
        continente: "Ásia",
        imagem: "/Paises/Seul.png",
        descricao: "Capital da Coreia do Sul, Seul é uma metrópole vibrante onde a tecnologia de ponta convive com templos antigos e mercados tradicionais.",
        dicas: [
            { id: "021-01", texto: "A bandeira era branca com um símbolo circular vermelho e azul no centro." },
            { id: "021-02", texto: "A moeda utilizada é o won sul-coreano." },
            { id: "021-03", texto: "Ouvi pessoas falando coreano." },
            { id: "021-04", texto: "Comentaram sobre tecnologia avançada e ruas movimentadas." },
            { id: "021-05", texto: "A pista citava templos antigos em meio a uma cidade moderna." },
            { id: "021-06", texto: "Falaram de mercados tradicionais e arranha-céus." },
            { id: "021-07", texto: "Mencionaram uma metrópole muito importante da Ásia." },
            { id: "021-08", texto: "Ouvi referência a uma cidade ligada à inovação e cultura pop." },
            { id: "021-09", texto: "A cidade parecia misturar tradição e futuro." },
            { id: "021-10", texto: "Tudo indicava a capital da Coreia do Sul." }
        ]
    },
    {
        id: "022",
        cidade: "Santiago",
        pais: "Chile",
        continente: "América do Sul",
        imagem: "/Paises/default.png",
        descricao: "Capital do Chile, encravada em um vale cercado pela Cordilheira dos Andes. Uma cidade moderna, rica em cultura e gastronomia no coração da América do Sul.",
        dicas: [
            { id: "022-01", texto: "A bandeira tinha azul, branco e vermelho com uma estrela branca." },
            { id: "022-02", texto: "A moeda utilizada é o peso chileno." },
            { id: "022-03", texto: "Ouvi pessoas falando espanhol." },
            { id: "022-04", texto: "Comentaram sobre montanhas altas ao redor da cidade." },
            { id: "022-05", texto: "A pista citava uma capital moderna da América do Sul." },
            { id: "022-06", texto: "Falaram de vinhos, cultura e clima andino." },
            { id: "022-07", texto: "Mencionaram a Cordilheira dos Andes." },
            { id: "022-08", texto: "Ouvi referência a uma cidade importante do Chile." },
            { id: "022-09", texto: "A cidade parecia organizada e cercada por paisagens imponentes." },
            { id: "022-10", texto: "Tudo apontava para Santiago." }
        ]
    },
    {
        id: "023",
        cidade: "Viena",
        pais: "Austria",
        continente: "Europa",
        imagem: "/Paises/Viena.png",
        descricao: "Viena, capital da Áustria, é famosa por sua música clássica, palácios imperiais e cafés históricos. Berço de Mozart e Beethoven, combina tradição elegante com cultura vibrante às margens do Danúbio.",
        dicas: [
            { id: "023-01", texto: "A bandeira tinha vermelho, branco e vermelho em faixas horizontais." },
            { id: "023-02", texto: "A moeda utilizada é o euro." },
            { id: "023-03", texto: "Ouvi pessoas falando alemão." },
            { id: "023-04", texto: "Comentaram sobre palácios imperiais e música clássica." },
            { id: "023-05", texto: "A pista citava cafés elegantes e tradição refinada." },
            { id: "023-06", texto: "Falaram de compositores famosos e herança cultural." },
            { id: "023-07", texto: "Mencionaram uma cidade às margens do Danúbio." },
            { id: "023-08", texto: "Ouvi referência a uma capital europeia muito sofisticada." },
            { id: "023-09", texto: "A cidade parecia ligada à arte, ópera e história imperial." },
            { id: "023-10", texto: "Comentaram sobre um famoso salão de ópera onde apresentações grandiosas acontecem." }
        ]
    },
    {
        id: "024",
        cidade: "Mumbai",
        pais: "India",
        continente: "Asia",
        imagem: "/Paises/Mumbai.png",
        descricao: "Mumbai é o centro financeiro da Índia e uma das cidades mais populosas do mundo. Localizada na costa oeste, é famosa por Bollywood, sua vibrante cultura de rua e marcos históricos como o Portal da Índia.",
        dicas: [
            { id: "024-01", texto: "A bandeira tinha laranja, branco e verde com uma roda azul ao centro." },
            { id: "024-02", texto: "A moeda utilizada é la rupia indiana." },
            { id: "024-03", texto: "Ouvi pessoas falando hindi, mas outros idiomas também circulavam." },
            { id: "024-04", texto: "Comentaram sobre cinema e uma indústria cultural gigantesca." },
            { id: "024-05", texto: "A pista citava uma grande cidade costeira da Índia." },
            { id: "024-06", texto: "Falaram de ruas movimentadas e energia urbana intensa." },
            { id: "024-07", texto: "Mencionaram um portal histórico voltado para o mar." },
            { id: "024-08", texto: "Ouvi referência a um centro financeiro indiano." },
            { id: "024-09", texto: "A cidade parecia caótica, vibrante e muito populosa." },
            { id: "024-10", texto: "Comentaram sobre a indústria cinematográfica conhecida como Bollywood." }
        ]
    },
    {
        id: "025",
        cidade: "Vancouver",
        pais: "Canada",
        continente: "America do Norte",
        imagem: "/Paises/Vancouver.png",
        descricao: "Vancouver é uma cidade costeira no Canadá, cercada por montanhas e pelo mar. Conhecida por sua beleza natural exuberante, é um centro multicultural e um dos principais polos cinematográficos da América do Norte.",
        dicas: [
            { id: "025-01", texto: "A bandeira do país tem vermelho, branco e uma folha de bordo." },
            { id: "025-02", texto: "A moeda utilizada é o dólar canadense." },
            { id: "025-03", texto: "Ouvi pessoas falando inglês." },
            { id: "025-04", texto: "Comentaram sobre uma cidade entre montanhas e o oceano." },
            { id: "025-05", texto: "A pista citava paisagens naturais impressionantes." },
            { id: "025-06", texto: "Falaram de clima úmido e natureza muito presente." },
            { id: "025-07", texto: "Mencionaram cinema e produção audiovisual." },
            { id: "025-08", texto: "Ouvi referência a uma cidade multicultural do oeste canadense." },
            { id: "025-09", texto: "A cidade parecia limpa, moderna e cercada por beleza natural." },
            { id: "025-10", texto: "Comentaram sobre um parque urbano gigantesco à beira-mar muito famoso na cidade." }
        ]
    },
    {
        id: "026",
        cidade: "Berlim",
        pais: "Alemanha",
        continente: "Europa",
        imagem: "/Paises/Berlim.png",
        descricao: "Berlim, capital da Alemanha, é famosa por sua história, cultura e o antigo Muro. Hoje é símbolo de liberdade, arte moderna e inovação europeia.",
        dicas: [
            { id: "026-01", texto: "A bandeira tinha faixas preta, vermelha e amarela." },
            { id: "026-02", texto: "A moeda utilizada é o euro." },
            { id: "026-03", texto: "Ouvi pessoas falando alemão." },
            { id: "026-04", texto: "Comentaram sobre um muro que já dividiu a cidade." },
            { id: "026-05", texto: "A pista citava história, liberdade e arte urbana." },
            { id: "026-06", texto: "Falaram de uma capital moderna com passado marcante." },
            { id: "026-07", texto: "Mencionaram inovação e vida cultural forte." },
            { id: "026-08", texto: "Ouvi referência a uma cidade importante da Alemanha." },
            { id: "026-09", texto: "A cidade parecia cheia de memória histórica e criatividade." },
            { id: "026-10", texto: "Comentaram sobre um famoso portal de entrada da cidade, símbolo de reunificação." }
        ]
    },
    {
        id: "027",
        cidade: "Istambul",
        pais: "Turquia",
        continente: "Asia",
        imagem: "/Paises/Istambul.png",
        descricao: "Istambul é a maior cidade da Turquia, localizada entre Europa e Ásia. Famosa por sua história, mesquitas e cultura rica, foi capital de grandes impérios.",
        dicas: [
            { id: "027-01", texto: "A bandeira era vermelha com crescente e estrela brancos." },
            { id: "027-02", texto: "A moeda utilizada é a lira turca." },
            { id: "027-03", texto: "Ouvi pessoas falando turco." },
            { id: "027-04", texto: "Comentaram sobre uma cidade entre dois continentes." },
            { id: "027-05", texto: "A pista citava grandes mesquitas e mercados movimentados." },
            { id: "027-06", texto: "Falaram de pontes, estreitos e impérios antigos." },
            { id: "027-07", texto: "Mencionaram uma cidade marcada por história bizantina e otomana." },
            { id: "027-08", texto: "Ouvi referência ao Bósforo." },
            { id: "027-09", texto: "A cidade parecia misturar Oriente e Ocidente." },
            { id: "027-10", texto: "Tudo indicava Istambul." }
        ]
    },
    {
        id: "028",
        cidade: "Singapura",
        pais: "Singapura",
        continente: "Asia",
        imagem: "/Paises/Cingapura.png",
        descricao: "Cingapura é uma cidade-estado moderna da Ásia, famosa por sua limpeza, tecnologia e arranha-céus. É um dos maiores centros financeiros do mundo.",
        dicas: [
            { id: "028-01", texto: "A bandeira tinha vermelho e branco, com crescente e estrelas." },
            { id: "028-02", texto: "A moeda utilizada é o dólar de Singapura." },
            { id: "028-03", texto: "Ouvi pessoas falando inglês e outros idiomas asiáticos." },
            { id: "028-04", texto: "Comentaram sobre uma cidade extremamente limpa e organizada." },
            { id: "028-05", texto: "A pista citava arranha-céus e tecnologia." },
            { id: "028-06", texto: "Falaram de um dos maiores centros financeiros da Ásia." },
            { id: "028-07", texto: "Mencionaram jardins futuristas e arquitetura moderna." },
            { id: "028-08", texto: "Ouvi referência a uma cidade-estado muito famosa." },
            { id: "028-09", texto: "A cidade parecia pequena em território, mas gigante em importância." },
            { id: "028-10", texto: "Comentaram sobre leis rigorosas que mantêm a cidade extremamente organizada." }
        ]
    },
    {
        id: "029",
        cidade: "Pequim",
        pais: "China",
        continente: "Asia",
        imagem: "/Paises/Pequim.png",
        descricao: "Pequim é a capital da China, famosa pela Cidade Proibida e sua rica história imperial. É um centro político e cultural com milhões de habitantes.",
        dicas: [
            { id: "029-01", texto: "A bandeira era vermelha com estrelas amarelas." },
            { id: "029-02", texto: "A moeda utilizada é o yuan." },
            { id: "029-03", texto: "Ouvi pessoas falando mandarim." },
            { id: "029-04", texto: "Comentaram sobre uma cidade ligada a antigos imperadores." },
            { id: "029-05", texto: "A pista citava uma cidade proibida muito famosa na história." },
            { id: "029-06", texto: "Falaram de grande poder político e tradição cultural." },
            { id: "029-07", texto: "Mencionaram uma capital gigantesca da Ásia." },
            { id: "029-08", texto: "Ouvi referência a palácios e muralhas históricas." },
            { id: "029-09", texto: "A cidade parecia central para governo e cultura chinesa." },
            { id: "029-10", texto: "Tudo indicava Pequim." }
        ]
    },
    {
        id: "030",
        cidade: "Cidade do México",
        pais: "Mexico",
        continente: "America do Norte",
        imagem: "/Paises/CidadedoMexico.png",
        descricao: "Cidade do México é a capital do país, famosa por sua história asteca, cultura rica e grandes avenidas. É uma das maiores metrópoles do mundo.",
        dicas: [
            { id: "030-01", texto: "A bandeira tinha verde, branco e vermelho com um brasão ao centro." },
            { id: "030-02", texto: "A moeda utilizada é o peso mexicano." },
            { id: "030-03", texto: "Ouvi pessoas falando espanhol." },
            { id: "030-04", texto: "Comentaram sobre uma grande capital com raízes astecas." },
            { id: "030-05", texto: "A pista citava avenidas largas e intensa vida urbana." },
            { id: "030-06", texto: "Falaram de cultura rica e muitos museus." },
            { id: "030-07", texto: "Mencionaram uma das maiores metrópoles do planeta." },
            { id: "030-08", texto: "Ouvi referência a ruínas antigas e modernidade misturadas." },
            { id: "030-09", texto: "A cidade parecia muito importante na América do Norte." },
            { id: "030-10", texto: "Tudo indicava a Cidade do México." }
        ]
    },
    {
        id: "031",
        cidade: "Amsterdã",
        pais: "Holanda",
        continente: "Europa",
        imagem: "/Paises/Amsterda.png",
        descricao: "Amsterdã é a capital da Holanda, famosa por seus canais, arquitetura histórica e cultura liberal. É um importante centro cultural e financeiro da Europa.",
        dicas: [
            { id: "031-01", texto: "A bandeira tinha vermelho, branco e azul em faixas horizontais." },
            { id: "031-02", texto: "A moeda utilizada é o euro." },
            { id: "031-03", texto: "Ouvi pessoas falando holandês." },
            { id: "031-04", texto: "Comentaram sobre uma cidade cheia de canais." },
            { id: "031-05", texto: "A pista citava bicicletas por toda parte." },
            { id: "031-06", texto: "Falaram de arquitetura charmosa e estilo liberal." },
            { id: "031-07", texto: "Mencionaram museus e cultura europeia forte." },
            { id: "031-08", texto: "Ouvi referência a uma capital plana e cortada por água." },
            { id: "031-09", texto: "A cidade parecia muito ligada a comércio e história marítima." },
            { id: "031-10", texto: "Tudo apontava para Amsterdã." }
        ]
    },
    {
        id: "032",
        cidade: "Nova Delhi",
        pais: "India",
        continente: "Asia",
        imagem: "/Paises/NovaDelhi.png",
        descricao: "Nova Delhi é a capital da Índia, famosa por sua história, cultura e arquitetura. É um importante centro político e cultural do país.",
        dicas: [
            { id: "032-01", texto: "A bandeira tinha laranja, branco e verde com uma roda azul." },
            { id: "032-02", texto: "A moeda utilizada é a rupia indiana." },
            { id: "032-03", texto: "Ouvi pessoas falando hindi." },
            { id: "032-04", texto: "Comentaram sobre uma capital política muito importante da Índia." },
            { id: "032-05", texto: "A pista citava templos, avenidas e construções governamentais." },
            { id: "032-06", texto: "Falaram de calor, história e intensa vida urbana." },
            { id: "032-07", texto: "Mencionaram uma cidade ligada ao poder e à cultura indiana." },
            { id: "032-08", texto: "Ouvi referência a monumentos históricos e muita tradição." },
            { id: "032-09", texto: "A cidade parecia antiga e moderna ao mesmo tempo." },
            { id: "032-10", texto: "Tudo indicava Nova Delhi." }
        ]
    },
    {
        id: "033",
        cidade: "Cidade do Cabo",
        pais: "Africa do Sul",
        continente: "Africa",
        imagem: "/Paises/CidadedoCabo.png",
        descricao: "Cidade do Cabo é a capital da África do Sul, famosa por sua história, cultura e arquitetura. É um importante centro político e cultural do país.",
        dicas: [
            { id: "033-01", texto: "A bandeira tinha várias cores, incluindo verde, amarelo, vermelho, azul, branco e preto." },
            { id: "033-02", texto: "A moeda utilizada é o rand sul-africano." },
            { id: "033-03", texto: "Ouvi pessoas falando inglês, mas também outros idiomas locais." },
            { id: "033-04", texto: "Comentaram sobre uma cidade cercada por mar e montanhas." },
            { id: "033-05", texto: "A pista citava uma montanha de topo achatado muito famosa." },
            { id: "033-06", texto: "Falaram de paisagens naturais impressionantes." },
            { id: "033-07", texto: "Mencionaram uma cidade importante no extremo sul da África." },
            { id: "033-08", texto: "Ouvi referência a vinhos, costa e natureza exuberante." },
            { id: "033-09", texto: "A cidade parecia muito turística e cheia de contrastes culturais." },
            { id: "033-10", texto: "Tudo apontava para a Cidade do Cabo." }
        ]
    },
    {
        id: "034",
        cidade: "Bangcoc",
        pais: "Tailândia",
        continente: "Asia",
        imagem: "/Paises/Bangcoc.png",
        descricao: "Bangcoc é a capital da Tailândia, famosa por sua história, cultura e arquitetura. É um importante centro político e cultural do país.",
        dicas: [
            { id: "034-01", texto: "A bandeira tinha faixas vermelha, branca, azul, branca e vermelha." },
            { id: "034-02", texto: "A moeda utilizada é o baht." },
            { id: "034-03", texto: "Ouvi pessoas falando tailandês." },
            { id: "034-04", texto: "Comentaram sobre templos dourados e ruas movimentadas." },
            { id: "034-05", texto: "A pista citava mercados tradicionais e vida noturna intensa." },
            { id: "034-06", texto: "Falaram de calor e movimento constante." },
            { id: "034-07", texto: "Mencionaram uma capital asiática cortada por canais e rios." },
            { id: "034-08", texto: "Ouvi referência a uma cidade vibrante da Tailândia." },
            { id: "034-09", texto: "A cidade parecia exótica, turística e cheia de energia." },
            { id: "034-10", texto: "Tudo indicava Bangcoc." }
        ]
    },
    {
        id: "035",
        cidade: "Zurich",
        pais: "Suiça",
        continente: "Europa",
        imagem: "/Paises/Zurich.png",
        descricao: "Zurique é a maior cidade da Suíça, famosa por sua qualidade de vida, bancos globais e belas paisagens às margens do lago.",
        dicas: [
            { id: "035-01", texto: "A bandeira do país é vermelha com uma cruz branca ao centro." },
            { id: "035-02", texto: "A moeda utilizada é o franco suíço." },
            { id: "035-03", texto: "Ouvi pessoas falando alemão." },
            { id: "035-04", texto: "Comentaram sobre bancos e forte setor financeiro." },
            { id: "035-05", texto: "A pista citava um lago belíssimo e cidade muito organizada." },
            { id: "035-06", texto: "Falaram de qualidade de vida altíssima." },
            { id: "035-07", texto: "Mencionaram uma cidade europeia limpa e segura." },
            { id: "035-08", texto: "Ouvi referência a paisagens alpinas por perto." },
            { id: "035-10", texto: "Comentaram sobre uma das maiores bolsas de valores da Europa localizada na cidade." }
        ]
    },
    {
        id: "036",
        cidade: "Hong Kong",
        pais: "China",
        continente: "Asia",
        imagem: "/Paises/HongKong.png",
        descricao: "Hong Kong é uma metrópole vibrante que mistura tradição chinesa e modernidade, com arranha-céus, porto icônico e forte centro financeiro global.",
        dicas: [
            { id: "036-01", texto: "A bandeira era vermelha com uma flor branca estilizada." },
            { id: "036-02", texto: "A moeda utilizada é o dólar de Hong Kong." },
            { id: "036-03", texto: "Ouvi pessoas falando cantonês e também inglês." },
            { id: "036-04", texto: "Comentaram sobre um porto muito famoso e iluminado." },
            { id: "036-05", texto: "A pista citava arranha-céus e grande poder financeiro." },
            { id: "036-06", texto: "Falaram de uma cidade densa e muito movimentada." },
            { id: "036-07", texto: "Mencionaram tradição chinesa misturada à modernidade." },
            { id: "036-08", texto: "Ouvi referência a mercados, letreiros e skyline impressionante." },
            { id: "036-09", texto: "A cidade parecia um importante elo econômico da Ásia." },
            { id: "036-10", texto: "Tudo apontava para Hong Kong." }
        ]
    },
    {
        id: "037",
        cidade: "Praga",
        pais: "República Tcheca",
        continente: "Europa",
        imagem: "/Paises/Praga.png",
        descricao: "Praga capital da República Tcheca, é uma cidade histórica com arquitetura medieval, pontes icônicas e atmosfera misteriosa, perfeita para histórias e investigações envolventes.",
        dicas: [
            { id: "037-01", texto: "A bandeira tinha branco, vermelho e um triângulo azul." },
            { id: "037-02", texto: "A moeda utilizada é a coroa tcheca." },
            { id: "037-03", texto: "Ouvi pessoas falando tcheco." },
            { id: "037-04", texto: "Comentaram sobre uma cidade com arquitetura medieval impressionante." },
            { id: "037-05", texto: "A pista citava pontes históricas sobre um rio." },
            { id: "037-06", texto: "Falaram de uma atmosfera antiga e quase misteriosa." },
            { id: "037-07", texto: "Mencionaram castelos e torres muito antigas." },
            { id: "037-08", texto: "Ouvi referência a uma capital charmosa da Europa Central." },
            { id: "037-09", texto: "A cidade parecia saída de um conto histórico." },
            { id: "037-10", texto: "Tudo indicava Praga." }
        ]
    },
    {
        id: "038",
        cidade: "Budapeste",
        pais: "Hungria",
        continente: "Europa",
        imagem: "/Paises/Budapeste.png",
        descricao: "Budapeste é a capital da Hungria, famosa por suas pontes sobre o Danúbio, arquitetura histórica e vibrante vida cultural europeia.",
        dicas: [
            { id: "038-01", texto: "A bandeira tinha vermelho, branco e verde em faixas horizontais." },
            { id: "038-02", texto: "A moeda utilizada é o florim húngaro." },
            { id: "038-03", texto: "Ouvi pessoas falando húngaro." },
            { id: "038-04", texto: "Comentaram sobre uma cidade dividida por um grande rio." },
            { id: "038-05", texto: "A pista citava pontes elegantes sobre o Danúbio." },
            { id: "038-06", texto: "Falaram de banhos termais e edifícios históricos." },
            { id: "038-07", texto: "Mencionaram uma capital europeia de grande beleza arquitetônica." },
            { id: "038-08", texto: "Ouvi referência a colinas de um lado e planícies do outro." },
            { id: "038-09", texto: "A cidade parecia romântica e cheia de cultura." },
            { id: "038-10", texto: "Tudo apontava para Budapeste." }
        ]
    },
    {
        id: "039",
        cidade: "Dublin",
        pais: "Irlanda",
        continente: "Europa",
        imagem: "/Paises/Dublin.png",
        descricao: "Dublin é a capital da Irlanda, conhecida por seus pubs históricos, cultura literária rica e atmosfera acolhedora às margens do rio Liffey.",
        dicas: [
            { id: "039-01", texto: "A bandeira tinha verde, branco e laranja em faixas verticais." },
            { id: "039-02", texto: "A moeda utilizada é o euro." },
            { id: "039-03", texto: "Ouvi pessoas falando inglês, talvez com sotaque irlandês bem marcado." },
            { id: "039-04", texto: "Comentaram sobre pubs históricos e música ao vivo." },
            { id: "039-05", texto: "A pista citava uma cidade ligada à literatura." },
            { id: "039-06", texto: "Falaram de clima úmido e céu nublado." },
            { id: "039-07", texto: "Mencionaram uma capital cortada pelo rio Liffey." },
            { id: "039-08", texto: "Ouvi referência a uma atmosfera acolhedora e tradicional." },
            { id: "039-09", texto: "A cidade parecia pequena em escala, mas grande em cultura." },
            { id: "039-10", texto: "Tudo indicava Dublin." }
        ]
    },
    {
        id: "040",
        cidade: "Atenas",
        pais: "Grécia",
        continente: "Europa",
        imagem: "/Paises/Atenas.png",
        descricao: "Atenas é a capital da Grécia, berço da democracia, com ruínas icônicas como a Acrópole e uma rica herança histórica milenar.",
        dicas: [
            { id: "040-01", texto: "A bandeira tinha azul e branco em faixas, com uma cruz em um canto." },
            { id: "040-02", texto: "A moeda utilizada é o euro." },
            { id: "040-03", texto: "Ouvi pessoas falando grego." },
            { id: "040-04", texto: "Comentaram sobre ruínas antigas no alto de uma colina." },
            { id: "040-05", texto: "A pista citava a Acrópole." },
            { id: "040-06", texto: "Falaram de filosofia, história e civilização antiga." },
            { id: "040-07", texto: "Mencionaram uma cidade considerada berço da democracia." },
            { id: "040-08", texto: "Ouvi referência a colunas clássicas e monumentos antigos." },
            { id: "040-09", texto: "A cidade parecia histórica e muito ligada à antiguidade." },
            { id: "040-10", texto: "Tudo apontava para Atenas." }
        ]
    },
    {
        id: "041",
        cidade: "Bogotá",
        pais: "Colômbia",
        continente: "América do Sul",
        imagem: "/Paises/Bogota.png",
        descricao: "Bogotá é a capital da Colômbia, situada nos Andes, com cultura vibrante, museus renomados e uma mistura de tradição e modernidade.",
        dicas: [
            { id: "041-01", texto: "A bandeira do país tem amarelo, azul e vermelho." },
            { id: "041-02", texto: "A moeda utilizada é o peso colombiano." },
            { id: "041-03", texto: "Ouvi pessoas falando espanhol." },
            { id: "041-04", texto: "Comentaram sobre uma capital nos Andes." },
            { id: "041-05", texto: "A pista citava museus e altitude elevada." },
            { id: "041-06", texto: "Falaram de uma cidade sul-americana grande e culturalmente forte." },
            { id: "041-07", texto: "Mencionaram clima mais fresco por causa da altitude." },
            { id: "041-08", texto: "Ouvi referência a tradição e modernidade lado a lado." },
            { id: "041-09", texto: "A cidade parecia muito importante para a Colômbia." },
            { id: "041-10", texto: "Tudo indicava Bogotá." }
        ]
    },
    {
        id: "042",
        cidade: "Lima",
        pais: "Peru",
        continente: "América do Sul",
        imagem: "/Paises/Lima.png",
        descricao: "Lima é a capital do Peru, famosa por sua gastronomia premiada, costa no Pacífico e centro histórico com influência colonial espanhola.",
        dicas: [
            { id: "042-01", texto: "A bandeira tinha vermelho, branco e vermelho em faixas verticais." },
            { id: "042-02", texto: "A moeda utilizada é o sol peruano." },
            { id: "042-03", texto: "Ouvi pessoas falando espanhol." },
            { id: "042-04", texto: "Comentaram sobre uma capital na costa do Pacífico." },
            { id: "042-05", texto: "A pista citava culinária muito elogiada internacionalmente." },
            { id: "042-06", texto: "Falaram de herança colonial e centro histórico importante." },
            { id: "042-07", texto: "Mencionaram uma grande cidade do Peru." },
            { id: "042-08", texto: "Ouvi referência ao mar e à gastronomia local." },
            { id: "042-09", texto: "A cidade parecia misturar tradição espanhola e identidade andina." },
            { id: "042-10", texto: "Tudo apontava para Lima." }
        ]
    },
    {
        id: "043",
        cidade: "Marrakech",
        pais: "Marrocos",
        continente: "África",
        imagem: "/Paises/Marrakech.png",
        descricao: "Marrakech é uma cidade vibrante do Marrocos, famosa por seus mercados coloridos, arquitetura histórica e atmosfera exótica cheia de cultura e mistério.",
        dicas: [
            { id: "043-01", texto: "A bandeira do país é vermelha com uma estrela verde ao centro." },
            { id: "043-02", texto: "A moeda utilizada é o dirham marroquino." },
            { id: "043-03", texto: "Ouvi pessoas falando árabe." },
            { id: "043-04", texto: "Comentaram sobre mercados coloridos e cheios de vida." },
            { id: "043-05", texto: "A pista citava uma cidade de atmosfera exótica." },
            { id: "043-06", texto: "Falaram de arquitetura histórica e clima quente." },
            { id: "043-07", texto: "Mencionaram pátios, especiarias e ruas estreitas." },
            { id: "043-08", texto: "Ouvi referência a uma cidade muito turística do Marrocos." },
            { id: "043-09", texto: "A cidade parecia vibrante e cheia de mistério." },
            { id: "043-10", texto: "Tudo apontava para Marrakech." }
        ]
    },
    {
        id: "044",
        cidade: "Nairóbi",
        pais: "Kenia",
        continente: "África",
        imagem: "/Paises/Nairobi.png",
        descricao: "Nairóbi é a capital do Quênia, conhecida por safáris próximos à cidade, vida selvagem única e um centro urbano dinâmico em crescimento.",
        dicas: [
            { id: "044-01", texto: "A bandeira tinha preto, vermelho, verde e branco com escudos." },
            { id: "044-02", texto: "A moeda utilizada é o xelim queniano." },
            { id: "044-03", texto: "Ouvi pessoas falando suaíli e também inglês." },
            { id: "044-04", texto: "Comentaram sobre safáris próximos à cidade." },
            { id: "044-05", texto: "A pista citava vida selvagem e natureza africana." },
            { id: "044-06", texto: "Falaram de uma capital em crescimento e muito dinâmica." },
            { id: "044-07", texto: "Mencionaram uma cidade importante do leste africano." },
            { id: "044-08", texto: "Ouvi referência a parques e animais próximos do ambiente urbano." },
            { id: "044-09", texto: "A cidade parecia misturar urbanização e natureza." },
            { id: "044-10", texto: "Tudo apontava para Nairóbi." }
        ]
    },
    {
        id: "045",
        cidade: "Lagos",
        pais: "Nigeria",
        continente: "África",
        imagem: "/Paises/Lagos.png",
        descricao: "Lagos é a maior cidade da Nigéria, vibrante e movimentada, conhecida por sua economia forte, cultura intensa e vida urbana dinâmica à beira do Atlântico.",
        dicas: [
            { id: "045-01", texto: "A bandeira tinha verde, branco e verde em faixas verticais." },
            { id: "045-02", texto: "A moeda utilizada é a naira." },
            { id: "045-03", texto: "Ouvi pessoas falando inglês." },
            { id: "045-04", texto: "Comentaram sobre uma cidade africana muito populosa e agitada." },
            { id: "045-05", texto: "A pista citava economia forte e vida urbana intensa." },
            { id: "045-06", texto: "Falaram de uma cidade costeira à beira do Atlântico." },
            { id: "045-07", texto: "Mencionaram música, energia e crescimento urbano acelerado." },
            { id: "045-08", texto: "Ouvi referência a uma das maiores cidades da África." },
            { id: "045-09", texto: "A cidade parecia movimentada e cheia de contrastes." },
            { id: "045-10", texto: "Tudo apontava para Lagos." }
        ]
    },
    {
        id: "046",
        cidade: "Casablanca",
        pais: "Marrocos",
        continente: "África",
        imagem: "/Paises/Casablanca.png",
        descricao: "Casablanca é a maior cidade do Marrocos, conhecida pela Mesquita Hassan II, arquitetura moderna e atmosfera que mistura tradição e urbanização.",
        dicas: [
            { id: "046-01", texto: "A bandeira do país é vermelha com uma estrela verde." },
            { id: "046-02", texto: "A moeda utilizada é o dirham marroquino." },
            { id: "046-03", texto: "Ouvi pessoas falando árabe." },
            { id: "046-04", texto: "Comentaram sobre uma grande mesquita voltada para o mar." },
            { id: "046-05", texto: "A pista citava tradição e modernização juntas." },
            { id: "046-06", texto: "Falaram de uma grande cidade do Marrocos." },
            { id: "046-07", texto: "Mencionaram arquitetura moderna em meio à herança cultural." },
            { id: "046-08", texto: "Ouvi referência ao litoral e ao Atlântico." },
            { id: "046-09", texto: "A cidade parecia urbana, importante e cheia de identidade." },
            { id: "046-10", texto: "Tudo indicava Casablanca." }
        ]
    },
    {
        id: "047",
        cidade: "Auckland",
        pais: "Nova Zelandia",
        continente: "Oceania",
        imagem: "/Paises/Auckland.png",
        descricao: "Auckland é a maior cidade da Nova Zelândia, cercada por vulcões e mar, famosa por paisagens naturais e estilo de vida ao ar livre.",
        dicas: [
            { id: "047-01", texto: "A bandeira tinha fundo azul com estrelas vermelhas e a Union Jack." },
            { id: "047-02", texto: "A moeda utilizada é o dólar neozelandês." },
            { id: "047-03", texto: "Ouvi pessoas falando inglês." },
            { id: "047-04", texto: "Comentaram sobre uma cidade cercada por mar e vulcões." },
            { id: "047-05", texto: "A pista citava natureza exuberante e vida ao ar livre." },
            { id: "047-06", texto: "Falaram de uma grande cidade da Oceania." },
            { id: "047-07", texto: "Mencionaram portos, colinas e belas paisagens." },
            { id: "047-08", texto: "Ouvi referência a um país insular famoso por sua natureza." },
            { id: "047-09", texto: "A cidade parecia moderna e cercada por cenários impressionantes." },
            { id: "047-10", texto: "Tudo apontava para Auckland." }
        ]
    },
    {
        id: "048",
        cidade: "Suva",
        pais: "Fiji",
        continente: "Oceania",
        imagem: "/Paises/Suva.png",
        descricao: "Suva é a capital de Fiji, conhecida por clima tropical, cultura do Pacífico e porto movimentado cercado por natureza exuberante.",
        dicas: [
            { id: "048-01", texto: "A bandeira tinha fundo azul-claro com um escudo e a Union Jack." },
            { id: "048-02", texto: "A moeda utilizada é o dólar fijiano." },
            { id: "048-03", texto: "Ouvi pessoas falando inglês." },
            { id: "048-04", texto: "Comentaram sobre um clima tropical e muito verde." },
            { id: "048-05", texto: "A pista citava uma capital insular do Pacífico." },
            { id: "048-06", texto: "Falaram de porto movimentado e natureza exuberante." },
            { id: "048-07", texto: "Mencionaram uma cidade pequena, mas importante regionalmente." },
            { id: "048-08", texto: "Ouvi referência a tradições do Pacífico Sul." },
            { id: "048-09", texto: "A cidade parecia quente, úmida e cheia de paisagens naturais." },
            { id: "048-10", texto: "Tudo indicava Suva." }
        ]
    },
    {
        id: "049",
        cidade: "Port Moresby",
        pais: "Papua-Nova Guiné",
        continente: "Oceania",
        imagem: "/Paises/PortMoresby.png",
        descricao: "Port Moresby é a capital de Papua-Nova Guiné, com cultura diversa, paisagens tropicais e papel importante no comércio do Pacífico Sul.",
        dicas: [
            { id: "049-01", texto: "A bandeira tinha preto e vermelho, com pássaro-do-paraíso e estrelas brancas." },
            { id: "049-02", texto: "A moeda utilizada é o kina." },
            { id: "049-03", texto: "Ouvi pessoas falando inglês e idiomas locais." },
            { id: "049-04", texto: "Comentaram sobre uma capital tropical do Pacífico Sul." },
            { id: "049-05", texto: "A pista citava grande diversidade cultural." },
            { id: "049-06", texto: "Falaram de comércio regional e importância portuária." },
            { id: "049-07", texto: "Mencionaram paisagens tropicais e clima quente." },
            { id: "049-08", texto: "Ouvi referência a uma cidade importante da Papua-Nova Guiné." },
            { id: "049-09", texto: "A cidade parecia distante, exótica e estratégica no Pacífico." },
            { id: "049-10", texto: "Tudo apontava para Port Moresby." }
        ]
    },
    {
        id: "050",
        cidade: "Barcelona",
        pais: "Espanha",
        continente: "Europa",
        imagem: "/Paises/Barcelona.png",
        descricao: "Barcelona é uma vibrante cidade costeira da Espanha, famosa por sua arquitetura única, praias mediterrâneas e forte identidade cultural catalã.",
        dicas: [
            { id: "050-01", texto: "A pessoa mencionou uma bandeira com listras vermelhas e amarelas." },
            { id: "050-02", texto: "Ouvi alguém falando sobre uma moeda chamada euro." },
            { id: "050-03", texto: "A pista citava uma igreja gigantesca que ainda está em construção há décadas." },
            { id: "050-04", texto: "A testemunha comentou que ouviu espanhol sendo falado, mas com um sotaque diferente." },
            { id: "050-05", texto: "Disseram que o destino era conhecido por um famoso time de futebol." },
            { id: "050-06", texto: "Falaram sobre uma avenida movimentada cheia de artistas de rua." },
            { id: "050-07", texto: "Mencionaram um arquiteto muito famoso com obras bem diferentes." },
            { id: "050-08", texto: "Ouvi referência a uma cidade com praias dentro da própria área urbana." },
            { id: "050-09", texto: "A pessoa comentou sobre mosaicos coloridos e construções únicas." },
            { id: "050-10", texto: "O destino parecia ser uma cidade europeia com forte identidade cultural própria." }
        ]
    },
    {
        id: "051",
        cidade: "Roterdã",
        pais: "Países Baixos",
        continente: "Europa",
        imagem: "/Paises/Rotterdam.png",
        descricao: "Roterdã é uma importante cidade portuária dos Países Baixos, conhecida por sua arquitetura moderna, canais e um dos maiores portos do mundo.",
        dicas: [
            { id: "051-01", texto: "A pessoa mencionou uma bandeira com três faixas horizontais: vermelho, branco e azul." },
            { id: "051-02", texto: "Ouvi alguém falando sobre uma moeda chamada euro." },
            { id: "051-03", texto: "A pista citava um dos maiores portos marítimos do mundo." },
            { id: "051-04", texto: "A testemunha comentou que ouviu um idioma europeu difícil de entender." },
            { id: "051-05", texto: "Disseram que o destino era conhecido por sua arquitetura moderna." },
            { id: "051-06", texto: "Falaram sobre muitos canais e pontes pela cidade." },
            { id: "051-07", texto: "Mencionaram construções com formatos bem diferentes do comum." },
            { id: "051-08", texto: "Ouvi referência a uma cidade que foi reconstruída após uma grande guerra." },
            { id: "051-09", texto: "A pessoa comentou sobre transporte intenso de cargas e navios." },
            { id: "051-10", texto: "O destino parecia ser uma cidade europeia altamente ligada ao comércio internacional." }
        ]
    },
    {
        id: "052",
        cidade: "Genebra",
        pais: "Suíça",
        continente: "Europa",
        imagem: "/Paises/Genebra.png",
        descricao: "Genebra é uma cidade suíça conhecida por sua diplomacia internacional, bancos e organizações globais, situada às margens de um grande lago e cercada pelos Alpes.",
        dicas: [
            { id: "052-01", texto: "A pessoa mencionou uma bandeira vermelha com uma cruz branca no centro." },
            { id: "052-02", texto: "Ouvi alguém falando sobre uma moeda diferente do euro, chamada franco." },
            { id: "052-03", texto: "A pista citava uma cidade famosa por organizações internacionais." },
            { id: "052-04", texto: "A testemunha comentou que ouviu francês sendo falado ao telefone." },
            { id: "052-05", texto: "Disseram que o destino era conhecido por bancos e cofres altamente seguros." },
            { id: "052-06", texto: "Falaram sobre um grande lago cercado por montanhas." },
            { id: "052-07", texto: "Mencionaram relógios de altíssima precisão." },
            { id: "052-08", texto: "Ouvi referência a uma cidade ligada a acordos e diplomacia mundial." },
            { id: "052-09", texto: "A pessoa comentou sobre um jato de água muito alto em um lago." },
            { id: "052-10", texto: "O destino parecia ser uma cidade europeia extremamente organizada e segura." }
        ]
    },
    {
        id: "041",
        cidade: "Munique",
        pais: "Alemanha",
        continente: "Europa",
        imagem: "/Paises/Munique.png",
        descricao: "Munique é a capital da Baviera, famosa por sua arquitetura clássica, museus de classe mundial e a tradicional Oktoberfest. Uma metrópole vibrante que combina tradição alpina com inovação tecnológica.",
        dicas: [
            { id: "041-01", texto: "A bandeira do país tem faixas preta, vermelha e dourada." },
            { id: "041-02", texto: "A moeda usada ali é o euro." },
            { id: "041-03", texto: "Ouvi pessoas falando alemão com sotaque bávaro." },
            { id: "041-04", texto: "Comentaram sobre uma cidade famosa por grandes festivais de cerveja." },
            { id: "041-05", texto: "A pista citava uma capital regional no sul da Alemanha." },
            { id: "041-06", texto: "Falaram de arquitetura gótica e jardins imensos." },
            { id: "041-07", texto: "Mencionaram uma cidade próxima aos Alpes." },
            { id: "041-08", texto: "Ouvi referência a um importante polo automobilístico e tecnológico." },
            { id: "041-09", texto: "A cidade parece misturar modernidade e tradições medievais." },
            { id: "041-10", texto: "Tudo indicava Munique." }
        ]
    },
    {
        id: "042",
        cidade: "Bruxelas",
        pais: "Bélgica",
        continente: "Europa",
        imagem: "/Paises/Bruxelas.png",
        descricao: "Bruxelas é a capital da Bélgica e um dos principais centros políticos da Europa. Conhecida por sua arquitetura histórica, chocolates renomados e atmosfera multicultural, a cidade mistura tradição medieval com importância internacional.",
        dicas: [
            { id: "042-01", texto: "A bandeira tinha preto, amarelo e vermelho." },
            { id: "042-02", texto: "A moeda utilizada era o euro." },
            { id: "042-03", texto: "Ouvi pessoas falando francês, neerlandês e também inglês." },
            { id: "042-04", texto: "Comentaram sobre uma famosa praça cercada por prédios históricos dourados." },
            { id: "042-05", texto: "A pista citava chocolates, waffles e batatas fritas muito populares." },
            { id: "042-06", texto: "Falaram de uma cidade importante para decisões políticas da Europa." },
            { id: "042-07", texto: "Mencionaram um pequeno monumento de um garoto fazendo xixi." },
            { id: "042-08", texto: "Ouvi referência a museus, quadrinhos e arquitetura elegante." },
            { id: "042-09", texto: "A cidade parecia sofisticada, histórica e multicultural." },
            { id: "042-10", texto: "Disseram que dali saem reuniões importantes da União Europeia." }
        ]
    },
    {
        id: "044",
        cidade: "Oslo",
        pais: "Noruega",
        continente: "Europa",
        imagem: "/Paises/Oslo.png",
        descricao: "Oslo é a capital da Noruega e uma cidade elegante cercada por fiordes, florestas e colinas. Moderna e sustentável, combina arquitetura contemporânea, herança viking e forte conexão com a natureza escandinava.",
        dicas: [
            { id: "044-01", texto: "A bandeira tinha vermelho, azul e branco." },
            { id: "044-02", texto: "A moeda utilizada era a coroa norueguesa." },
            { id: "044-03", texto: "Ouvi pessoas falando norueguês e também inglês." },
            { id: "044-04", texto: "Comentaram sobre um porto cercado por fiordes e colinas." },
            { id: "044-05", texto: "A pista citava salmão, frutos do mar e culinária nórdica." },
            { id: "044-06", texto: "Falaram de uma cidade moderna com forte ligação à natureza." },
            { id: "044-07", texto: "Mencionaram esculturas famosas em um grande parque ao ar livre." },
            { id: "044-08", texto: "Ouvi referência a museus vikings, navios históricos e arquitetura contemporânea." },
            { id: "044-09", texto: "Dizem que a cidade é limpa, tranquila e organizada." },
            { id: "044-10", texto: "Disseram que dali saem importantes cerimônias ligadas ao Prêmio Nobel da Paz." }
        ]
    }
];
/**
 * Busca uma cidade pelo nome (case-insensitive, aceita acentos).
 * @param {string} nome — Nome da cidade
 * @returns {object|null}
 */
export function getCidade(nome) {
    if (!nome) return null;
    const n = nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return CIDADES.find(c => {
        const cn = c.cidade.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return cn === n;
    }) || null;
}

/**
 * Retorna a imagem de uma cidade pelo nome.
 * @param {string} nome
 * @returns {string} — caminho da imagem ou fallback
 */
export function getCidadeImagem(nome) {
    const c = getCidade(nome);
    return c ? c.imagem : "/Paises/default.png";
}

/**
 * Retorna a descrição de uma cidade pelo nome.
 * @param {string} nome
 * @returns {string}
 */
export function getCidadeDescricao(nome) {
    const c = getCidade(nome);
    return c ? c.descricao : "";
}
