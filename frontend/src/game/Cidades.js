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
        cidade: "Buenos Aires",
        pais: "Argentina",
        continente: "América do Sul",
        imagem: "/Paises/BuenosAires.png",
        descricao: "Capital da Argentina, Buenos Aires é famosa pelo tango, arquitetura europeia e vida cultural intensa. Seus bairros históricos e cafés tradicionais revelam uma cidade vibrante e cheia de identidade sul-americana.",
    },
    {
        cidade: "Cairo",
        pais: "Egito",
        continente: "África",
        imagem: "/Paises/Cairo.png",
        descricao: "Capital do Egito, Cairo é uma das cidades mais antigas do mundo. Próxima às pirâmides de Gizé, mistura história milenar com vida moderna, sendo um centro cultural e político do Oriente Médio.",
    },
    {
        cidade: "Campinas",
        pais: "Brasil",
        continente: "América do Sul",
        imagem: "/Paises/default.png",
        descricao: "Cidade do interior de São Paulo, Campinas é um importante polo tecnológico e universitário. Moderna e estratégica, abriga centros de pesquisa e uma das maiores regiões metropolitanas do Brasil.",
    },
    {
        cidade: "Sao Paulo",
        pais: "Brasil",
        continente: "América do Sul",
        imagem: "/Paises/SaoPaulo.png",
        descricao: "São Paulo é a maior cidade do Brasil, vibrante, diversa e cheia de cultura e oportunidades.",
    },
    {
        cidade: "Lisboa",
        pais: "Portugal",
        continente: "Europa",
        imagem: "/Paises/Lisboa.png",
        descricao: "Capital de Portugal, Lisboa é conhecida por suas colinas, bondes e rica herança marítima. Foi ponto central das grandes navegações e ainda preserva castelos, mirantes e bairros históricos.",
    },
    {
        cidade: "Londres",
        pais: "Reino Unido",
        continente: "Europa",
        imagem: "/Paises/Londres.png",
        descricao: "Capital do Reino Unido, Londres é um centro global de política, cultura e economia. Conhecida pelo Big Ben e sua história rica.",
    },
    {
        cidade: "Madrid",
        pais: "Espanha",
        continente: "Europa",
        imagem: "/Paises/Madrid.png",
        descricao: "Capital da Espanha, Madrid é um importante centro cultural europeu. Famosa por seus museus, praças e vida noturna, combina história, arte e modernidade em uma cidade dinâmica.",
    },
    {
        cidade: "Moscou",
        pais: "Rússia",
        continente: "Europa",
        imagem: "/Paises/Moscou.png",
        descricao: "Capital da Rússia, Moscou abriga o Kremlin e a Praça Vermelha. É um centro político e histórico com arquitetura imponente e forte influência na cultura e na geopolítica mundial.",
    },
    {
        cidade: "Nova York",
        pais: "Estados Unidos",
        continente: "América do Norte",
        imagem: "/Paises/NovaYork.png",
        descricao: "Maior cidade dos Estados Unidos, Nova York é um centro global de finanças e cultura. Conhecida pela Times Square, Estátua da Liberdade e seus arranha-céus icônicos.",
    },
    {
        cidade: "Paris",
        pais: "França",
        continente: "Europa",
        imagem: "/Paises/Paris.png",
        descricao: "Capital da França, Paris é famosa pela Torre Eiffel, museus e influência cultural. Conhecida como Cidade Luz, é referência mundial em arte, gastronomia e história.",
    },
    {
        cidade: "Rio de Janeiro",
        pais: "Brasil",
        continente: "América do Sul",
        imagem: "/Paises/RiodeJaneiro.png",
        descricao: "Cidade brasileira conhecida pelo Cristo Redentor e praias como Copacabana. O Rio mistura natureza, cultura e uma das paisagens urbanas mais famosas do planeta.",
    },
    {
        cidade: "Roma",
        pais: "Itália",
        continente: "Europa",
        imagem: "/Paises/Roma.png",
        descricao: "Capital da Itália, Roma é conhecida como a Cidade Eterna. Abriga monumentos como o Coliseu e foi o centro do Império Romano.",
    },
    {
        cidade: "Salvador",
        pais: "Brasil",
        continente: "América do Sul",
        imagem: "/Paises/Salvador.png",
        descricao: "Capital da Bahia, Salvador é rica em cultura afro-brasileira. Seu centro histórico, o Pelourinho, preserva arquitetura colonial e tradições únicas.",
    },
    {
        cidade: "Sydney",
        pais: "Austrália",
        continente: "Oceania",
        imagem: "/Paises/Sidney.png",
        descricao: "Maior cidade da Austrália, Sydney é famosa pela Opera House e seu porto. Combina praias, modernidade e natureza.",
    },
    {
        cidade: "São Paulo",
        pais: "Brasil",
        continente: "América do Sul",
        imagem: "/Paises/SaoPaulo.png",
        descricao: "A maior metrópole da América do Sul, centro financeiro e cultural do Brasil. Famosa por seu ritmo frenético, diversidade gastronômica e grandes monumentos.",
    },
    {
        cidade: "Thimphu",
        pais: "Butão",
        continente: "Ásia",
        imagem: "/Paises/Thimphu.png",
        descricao: "Capital do Butão, Thimphu é uma cidade única que preserva tradições budistas e não possui semáforos. Cercada por montanhas, combina natureza e cultura.",
    },
    {
        cidade: "Tóquio",
        pais: "Japão",
        continente: "Ásia",
        imagem: "/Paises/Tokio.png",
        descricao: "Capital do Japão, Tóquio é uma das maiores metrópoles do mundo. Combina tecnologia avançada, tradição milenar e cultura única.",
    },
    {
        cidade: "Toronto",
        pais: "Canadá",
        continente: "América do Norte",
        imagem: "/Paises/Toronto.png",
        descricao: "Maior cidade do Canadá, Toronto é multicultural e moderna. Conhecida pela CN Tower e sua diversidade cultural.",
    },
    {
        cidade: "Trípoli",
        pais: "Líbia",
        continente: "África",
        imagem: "/Paises/Tripoli.png",
        descricao: "Capital da Líbia, Trípoli é uma cidade histórica às margens do Mediterrâneo. Possui mercados tradicionais e arquitetura que reflete séculos de história.",
    },
    {
        cidade: "Dubai",
        pais: "Emirados Árabes",
        continente: "Ásia",
        imagem: "/Paises/Dubai.png",
        descricao: "Uma das cidades mais luxuosas e modernas do mundo, Dubai é famosa por seus arranha-céus, como o Burj Khalifa, e por ser um centro global de comércio e turismo no deserto.",
    },
    {
        cidade: "Seul",
        pais: "Coreia do Sul",
        continente: "Ásia",
        imagem: "/Paises/Seul.png",
        descricao: "Capital da Coreia do Sul, Seul é uma metrópole vibrante onde a tecnologia de ponta convive com templos antigos e mercados tradicionais.",
    },
    {
        cidade: "Santiago",
        pais: "Chile",
        continente: "América do Sul",
        imagem: "/Paises/default.png",
        descricao: "Capital do Chile, encravada em um vale cercado pela Cordilheira dos Andes. Uma cidade moderna, rica em cultura e gastronomia no coração da América do Sul.",
    },

    {
        cidade: "Viena",
        pais: "Austria",
        continente: "Europa",
        imagem: "/Paises/Viena.png",
        descricao: "Viena, capital da Áustria, é famosa por sua música clássica, palácios imperiais e cafés históricos. Berço de Mozart e Beethoven, combina tradição elegante com cultura vibrante às margens do Danúbio.",
    },
    {
        cidade: "Mumbai",
        pais: "India",
        continente: "Asia",
        imagem: "/Paises/Mumbai.png",
        descricao: "Mumbai é o centro financeiro da Índia e uma das cidades mais populosas do mundo. Localizada na costa oeste, é famosa por Bollywood, sua vibrante cultura de rua e marcos históricos como o Portal da Índia.",
    },
    {
        cidade: "Vancouver",
        pais: "Canada",
        continente: "America do Norte",
        imagem: "/Paises/Vancouver.png",
        descricao: "Vancouver é uma cidade costeira no Canadá, cercada por montanhas e pelo mar. Conhecida por sua beleza natural exuberante, é um centro multicultural e um dos principais polos cinematográficos da América do Norte.",
    },

    {
        cidade: "Berlim",
        pais: "Alemanha",
        continente: "Europa",
        imagem: "/Paises/Berlim.png",
        descricao: "Berlim, capital da Alemanha, é famosa por sua história, cultura e o antigo Muro. Hoje é símbolo de liberdade, arte moderna e inovação europeia.",
    },

    {
        cidade: "Istambul",
        pais: "Turquia",
        continente: "Asia",
        imagem: "/Paises/Istambul.png",
        descricao: "Istambul é a maior cidade da Turquia, localizada entre Europa e Ásia. Famosa por sua história, mesquitas e cultura rica, foi capital de grandes impérios.",
    },
    {
        cidade: "Singapura",
        pais: "Singapura",
        continente: "Asia",
        imagem: "/Paises/Cingapura.png",
        descricao: "Cingapura é uma cidade-estado moderna da Ásia, famosa por sua limpeza, tecnologia e arranha-céus. É um dos maiores centros financeiros do mundo.",
    },

    {
        cidade: "Pequim",
        pais: "China",
        continente: "Asia",
        imagem: "/Paises/Pequim.png",
        descricao: "Pequim é a capital da China, famosa pela Cidade Proibida e sua rica história imperial. É um centro político e cultural com milhões de habitantes.",
    },
    {
        cidade: "Cidade do México",
        pais: "Mexico",
        continente: "America do Norte",
        imagem: "/Paises/CidadeDoMexico.png",
        descricao: "Cidade do México é a capital do país, famosa por sua história asteca, cultura rica e grandes avenidas. É uma das maiores metrópoles do mundo.",
    },
    {
        cidade: "Amsterdã",
        pais: "Holanda",
        continente: "Europa",
        imagem: "/Paises/Amsterda.png",
        descricao: "Amsterdã é a capital da Holanda, famosa por seus canais, arquitetura histórica e cultura liberal. É um importante centro cultural e financeiro da Europa.",
    },
    {
        cidade: "Nova Delhi",
        pais: "India",
        continente: "Asia",
        imagem: "/Paises/NovaDelhi.png",
        descricao: "Nova Delhi é a capital da Índia, famosa por sua história, cultura e arquitetura. É um importante centro político e cultural do país.",
    },

    {
        cidade: "Cidade do Cabo",
        pais: "Africa do Sul",
        continente: "Africa",
        imagem: "/Paises/CidadedoCabo.png",
        descricao: "Cidade do Cabo é a capital da África do Sul, famosa por sua história, cultura e arquitetura. É um importante centro político e cultural do país.",
    },
    {
        cidade: "Bangcoc",
        pais: "Tailândia",
        continente: "Asia",
        imagem: "/Paises/Bangcoc.png",
        descricao: "Bangcoc é a capital da Tailândia, famosa por sua história, cultura e arquitetura. É um importante centro político e cultural do país.",
    },
    {
        cidade: "Zurich",
        pais: "Suiça",
        continente: "Europa",
        imagem: "/Paises/Zurich.png",
        descricao: "Zurique é a maior cidade da Suíça, famosa por sua qualidade de vida, bancos globais e belas paisagens às margens do lago.",
    },
    {
        cidade: "Hong Kong",
        pais: "China",
        continente: "Asia",
        imagem: "/Paises/HongKong.png",
        descricao: "Hong Kong é uma metrópole vibrante que mistura tradição chinesa e modernidade, com arranha-céus, porto icônico e forte centro financeiro global.",
    },
    {
        cidade: "Praga",
        pais: "República Tcheca",
        continente: "Europa",
        imagem: "/Paises/Praga.png",
        descricao: "Praga capital da República Tcheca, é uma cidade histórica com arquitetura medieval, pontes icônicas e atmosfera misteriosa, perfeita para histórias e investigações envolventes.",
    },
    {
        cidade: "Budapeste",
        pais: "Hungria",
        continente: "Europa",
        imagem: "/Paises/Budapeste.png",
        descricao: "Budapeste é a capital da Hungria, famosa por suas pontes sobre o Danúbio, arquitetura histórica e vibrante vida cultural europeia.",
    },
    {
        cidade: "Dublin",
        pais: "Irlanda",
        continente: "Europa",
        imagem: "/Paises/Dublin.png",
        descricao: "Dublin é a capital da Irlanda, conhecida por seus pubs históricos, cultura literária rica e atmosfera acolhedora às margens do rio Liffey.",
    },
    {
        cidade: "Atenas",
        pais: "Grécia",
        continente: "Europa",
        imagem: "/Paises/Atenas.png",
        descricao: "Atenas é a capital da Grécia, berço da democracia, com ruínas icônicas como a Acrópole e uma rica herança histórica milenar.",
    },
    {
        cidade: "Bogotá",
        pais: "Colômbia",
        continente: "América do Sul",
        imagem: "/Paises/Bogota.png",
        descricao: "Bogotá é a capital da Colômbia, situada nos Andes, com cultura vibrante, museus renomados e uma mistura de tradição e modernidade.",
    },
    {
        cidade: "Lima",
        pais: "Peru",
        continente: "América do Sul",
        imagem: "/Paises/Lima.png",
        descricao: "Lima é a capital do Peru, famosa por sua gastronomia premiada, costa no Pacífico e centro histórico com influência colonial espanhola.",
    },
    {
        cidade: "Marrakech",
        pais: "Marrocos",
        continente: "África",
        imagem: "/Paises/Marrakech.png",
        descricao: "Marrakech é uma cidade vibrante do Marrocos, famosa por seus mercados coloridos, arquitetura histórica e atmosfera exótica cheia de cultura e mistério.",
    },
    {
        cidade: "Nairóbi",
        pais: "Kenia",
        continente: "África",
        imagem: "/Paises/Nairobi.png",
        descricao: "Nairóbi é a capital do Quênia, conhecida por safáris próximos à cidade, vida selvagem única e um centro urbano dinâmico em crescimento.",
    },
    {
        cidade: "Lagos",
        pais: "Nigeria",
        continente: "África",
        imagem: "/Paises/Lagos.png",
        descricao: "Lagos é a maior cidade da Nigéria, vibrante e movimentada, conhecida por sua economia forte, cultura intensa e vida urbana dinâmica à beira do Atlântico.",
    },
    {
        cidade: "Casablanca",
        pais: "Marrocos",
        continente: "África",
        imagem: "/Paises/Casablanca.png",
        descricao: "Casablanca é a maior cidade do Marrocos, conhecida pela Mesquita Hassan II, arquitetura moderna e atmosfera que mistura tradição e urbanização.",
    },
    {
        cidade: "Auckland",
        pais: "Nova Zelandia",
        continente: "Oceania",
        imagem: "/Paises/Auckland.png",
        descricao: "Auckland é a maior cidade da Nova Zelândia, cercada por vulcões e mar, famosa por paisagens naturais e estilo de vida ao ar livre.",
    },
    {
        cidade: "Suva",
        pais: "Fiji",
        continente: "Oceania",
        imagem: "/Paises/Suva.png",
        descricao: "Suva é a capital de Fiji, conhecida por clima tropical, cultura do Pacífico e porto movimentado cercado por natureza exuberante.",
    },
    {
        cidade: "Port Moresby",
        pais: "Papua-Nova Guiné",
        continente: "Oceania",
        imagem: "/Paises/PortMoresby.png",
        descricao: "Port Moresby é a capital de Papua-Nova Guiné, com cultura diversa, paisagens tropicais e papel importante no comércio do Pacífico Sul.",
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
