import React, { useState, useEffect } from "react";
import { useGame } from "../game/GameProvider";
import { ITEMS_DATA } from "../game/itemsData";

export default function InventoryModal({ isOpen, onClose }) {
  const { state, inventory, refreshInventory } = useGame();
  const [selectedItemKey, setSelectedItemKey] = useState("fonte_anonima");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Ao abrir, se não tiver item selecionado ou o selecionado for 0, 
      // talvez queiramos selecionar o primeiro com quantidade > 0?
      // Por enquanto vamos manter fonte_anonima como padrão.
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  // Prepara lista de itens baseada no que o jogador tem
  // Moedas e Vouchers vêm do state.player
  const itemsList = [
    { key: "fonte_anonima", qty: inventory.fonte_anonima || 0 },
    { key: "dossie_sigiloso", qty: inventory.dossie_sigiloso || 0 },
    { key: "satelite_atlas", qty: inventory.satelite_atlas || 0 },
    { key: "voucher_aereo", qty: state.player.vouchers?.length || 0 },
    { key: "licenca_tatica", qty: inventory.licenca_tatica || 0 },
    { key: "moeda", qty: state.player.dinheiro || 0 },
  ];

  const selectedItem = ITEMS_DATA[selectedItemKey];
  const selectedQty = itemsList.find(i => i.key === selectedItemKey)?.qty || 0;

  const handleUse = async () => {
    if (selectedQty <= 0) return;

    // Lógica de uso depende do item
    // Por enquanto, apenas feedback visual ou chamada de serviço se existir
    console.log("Usando item:", selectedItemKey);

    if (selectedItemKey === "voucher_aereo") {
      // Talvez redirecionar para o mural ou algo assim?
      // O usuário pediu apenas a tela por enquanto.
    }
  };

  return (
    <div
      className={`inventory-overlay ${isOpen ? "active" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "all" : "none",
        transition: "opacity 0.3s ease",
        color: "#fff",
        fontFamily: "inherit"
      }}
    >
      <style>{`
        .inventory-overlay {
          animation: ${isOpen ? "fade-in 0.3s ease-out" : "fade-out 0.3s ease-in"};
        }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }

        .inventory-content {
          width: 100%;
          max-width: 500px;
          height: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          background: linear-gradient(180deg, #0b141a 0%, #05070a 100%);
          box-shadow: 0 0 50px rgba(0,0,0,0.8);
          position: relative;
          transform: ${isOpen ? "translateY(0)" : "translateY(50px)"};
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .inventory-header {
          padding: 24px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: rgba(0,0,0,0.3);
          border-bottom: 1px solid rgba(240, 192, 64, 0.2);
        }
        .close-btn {
          position: absolute;
          left: 20px;
          background: none;
          border: none;
          color: #f0c040;
          font-size: 28px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .close-btn:hover {
          transform: translateX(-3px);
        }
        .inventory-title {
          font-size: 18px;
          font-weight: 900;
          letter-spacing: 3px;
          color: #d0d8e0;
          text-shadow: 0 0 10px rgba(208, 216, 224, 0.3);
        }

        .items-scroll-area {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          align-content: start;
          scrollbar-width: thin;
          scrollbar-color: rgba(240, 192, 64, 0.3) transparent;
        }
        .items-scroll-area::-webkit-scrollbar {
          width: 4px;
        }
        .items-scroll-area::-webkit-scrollbar-thumb {
          background: rgba(240, 192, 64, 0.3);
          border-radius: 10px;
        }

        .item-card {
          aspect-ratio: 0.9;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          position: relative;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .item-card:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.15);
        }
        .item-card.selected {
          background: rgba(240, 192, 64, 0.08);
          border-color: #f0c040;
          box-shadow: inset 0 0 20px rgba(240, 192, 64, 0.2), 0 0 15px rgba(240, 192, 64, 0.1);
          transform: scale(1.02);
        }
        .item-card img {
          width: 90%;
          height: 75%;
          object-fit: contain;
          filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5));
        }
        .item-card-name {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          color: #a0b0c0;
          text-align: center;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 5px;
        }
        .item-qty {
          position: absolute;
          bottom: 25px;
          right: 8px;
          font-size: 12px;
          font-weight: 900;
          color: #fff;
          text-shadow: 0 0 5px #000;
          background: rgba(0,0,0,0.5);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .item-details-panel {
          background: #04080c;
          border-top: 1px solid rgba(240, 192, 64, 0.4);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-shrink: 0;
          height: 280px; /* Altura correta baseada na Moeda */
          box-shadow: 0 -10px 30px rgba(0,0,0,0.5);
          box-sizing: border-box;
        }
        .details-top {
          display: flex;
          gap: 15px;
          height: 110px;
          flex-shrink: 0;
        }
        .details-img-wrap {
          width: 110px;
          height: 110px;
          background: radial-gradient(circle, rgba(64, 160, 240, 0.1) 0%, rgba(0,0,0,0) 70%);
          border: 1px solid rgba(64, 160, 240, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          flex-shrink: 0;
        }
        .details-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 5px 15px rgba(0,0,0,0.6));
        }
        .details-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .details-name {
          color: #40a0f0;
          font-size: 20px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1.1;
        }
        .details-cat {
          color: #4070a0;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 5px;
          letter-spacing: 1px;
        }
        .details-desc-container {
          flex: 1;
          overflow-y: auto;
          padding-right: 5px;
        }
        .details-desc {
          color: rgba(220, 230, 240, 0.8);
          font-size: 13px;
          line-height: 1.4;
          font-weight: 500;
          margin: 0;
        }
        .details-owned {
          margin-top: auto;
          color: #40a0f0;
          font-weight: 900;
          font-size: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .use-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(to bottom, #104080, #052040);
          border: 1px solid #2060b0;
          border-radius: 6px;
          color: #fff;
          font-size: 20px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: 4px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1);
          position: relative;
          overflow: hidden;
        }
        .use-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: 0.5s;
        }
        .use-btn:hover::after {
          left: 100%;
        }
        .use-btn:active {
          transform: scale(0.97);
          box-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }
        .use-btn:disabled {
          opacity: 0.2;
          cursor: not-allowed;
          background: #1a1a1a;
          border-color: #333;
          box-shadow: none;
        }
      `}</style>

      <div className="inventory-content" onClick={(e) => e.stopPropagation()}>
        <div className="inventory-header">
          <button className="close-btn" onClick={onClose}>←</button>
          <div className="inventory-title">TODOS OS ITENS</div>
        </div>

        <div className="items-scroll-area">
          {itemsList.map((item) => {
            const data = ITEMS_DATA[item.key];
            return (
              <div
                key={item.key}
                className={`item-card ${selectedItemKey === item.key ? "selected" : ""}`}
                onClick={() => setSelectedItemKey(item.key)}
              >
                <img src={data.imagem} alt={data.nome} />
                <div className="item-card-name">{data.nome}</div>
                <div className="item-qty">x{item.qty.toLocaleString("pt-BR")}</div>
              </div>
            );
          })}
        </div>

        <div className="item-details-panel">
          <div className="details-top">
            <div className="details-img-wrap">
              <img src={selectedItem.imagem} alt={selectedItem.nome} />
            </div>
            <div className="details-info">
              <div className="details-name">{selectedItem.nome}</div>
              <div className="details-cat">{selectedItem.categoria}</div>
              <div className="details-desc-container">
                <p className="details-desc">{selectedItem.descricao}</p>
              </div>
            </div>
          </div>

          <div className="details-owned">
            POSSUÍDO: {selectedQty.toLocaleString("pt-BR")}
          </div>

          <button
            className="use-btn"
            disabled={!selectedItem.utilizavel || selectedQty <= 0}
            onClick={handleUse}
          >
            USAR
          </button>
        </div>
      </div>
    </div>
  );
}
