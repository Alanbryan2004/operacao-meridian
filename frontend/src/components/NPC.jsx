// src/components/NPC.jsx
// Catálogo centralizado de todos os NPCs com suas imagens e fundos.

/**
 * Cada NPC possui:
 *   - nome:       Nome de exibição do personagem
 *   - img:        Caminho da imagem do personagem (em /NPC/)
 *   - fundoPadrao: Caminho do fundo padrão associado ao personagem (em /NPC/)
 */
const NPC_LIST = [
    {
        nome: "Florista",
        img: "/NPC/Florista.png",
        fundoPadrao: "/NPC/Floricultura.png",
    },
    {
        nome: "Garçom",
        img: "/NPC/Garcon.png",
        fundoPadrao: "/NPC/Restaurante.png",
    },
    {
        nome: "Médica",
        img: "/NPC/Medica.png",
        fundoPadrao: "/NPC/Hospital.png",
    },
    {
        nome: "Barqueiro",
        img: "/NPC/Barqueiro.png",
        fundoPadrao: "/NPC/Restaurante.png",
    },
    {
        nome: "Taxista",
        img: "/NPC/Taxista.png",
        fundoPadrao: "/NPC/Taxi.png",
    },
    {
        nome: "Banqueiro",
        img: "/NPC/Banqueiro.png",
        fundoPadrao: "/NPC/Banco.png",
    },
    {
        nome: "Dançarina",
        img: "/NPC/Dancarina.png",
        fundoPadrao: "/NPC/Hospital.png",
    },
    {
        nome: "Agente de Trânsito",
        img: "/NPC/AgenteTransito.png",
        fundoPadrao: "/NPC/Hospital.png",
    },
    {
        nome: "Cozinheiro",
        img: "/NPC/Cozinheiro.png",
        fundoPadrao: "/NPC/Restaurante.png",
    },
    {
        nome: "Camareira",
        img: "/NPC/Camareira.png",
        fundoPadrao: "/NPC/Hospital.png",
    },
    {
        nome: "Pescador",
        img: "/NPC/Pescador.png",
        fundoPadrao: "/NPC/Restaurante.png",
    },
    {
        nome: "Morador de Rua",
        img: "/NPC/moradorderua.png",
        fundoPadrao: "/NPC/Restaurante.png",
    },
];

/**
 * Busca um NPC pelo nome (case-insensitive, parcial).
 * @param {string} nome - Nome do NPC para buscar
 * @returns {{ nome: string, img: string, fundoPadrao: string } | undefined}
 */
export function findNPC(nome) {
    if (!nome) return undefined;
    const lower = nome.toLowerCase();
    return NPC_LIST.find(n => n.nome.toLowerCase().includes(lower));
}

/**
 * Retorna todos os NPCs cadastrados.
 */
export function getAllNPCs() {
    return NPC_LIST;
}

export default NPC_LIST;
