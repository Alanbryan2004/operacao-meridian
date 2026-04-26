import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../game/GameProvider";
import { inventoryService } from "../game/inventoryService";
import { supabase } from "../lib/supabase";

export default function Loja() {
    const nav = useNavigate();
    const { state, dispatch, inventory, refreshInventory } = useGame();
    const [buying, setBuying] = useState(null);

    if (!state) return null;
    const { player } = state;

    const shopItems = [
        {
            id: "fonte_anonima",
            name: "FONTE ANÔNIMA",
            desc: "Receba informações valiosas que podem revelar novas pistas sobre o caso.",
            price: 2000,
            currency: "coins",
            img: "/Loja/loja_Fonte_anonima.png",
            type: "item"
        },
        {
            id: "satelite_atlas",
            name: "SATÉLITE A.T.L.A.S.",
            desc: "Localiza atividades suspeitas em outras cidades por satélite.",
            price: 5000,
            currency: "coins",
            img: "/Loja/loja_satelite.png",
            type: "item"
        },
        {
            id: "dossie_sigiloso",
            name: "DOSSIÊ SIGILOSO",
            desc: "Elimina metade dos suspeitos inocentes da sua lista atual.",
            price: 10000,
            currency: "coins",
            img: "/Loja/loja_dossie.png",
            type: "item"
        },
        {
            id: "maleta_moedas",
            name: "MALETA DE MOEDAS",
            desc: "Uma maleta contendo 50.000 moedas para financiar suas operações.",
            price: 50,
            currency: "diamonds",
            img: "/Loja/Maleta.png",
            type: "currency",
            value: 50000
        },
        {
            id: "sobretudo_exclusivo",
            name: "ROUPA EXCLUSIVA",
            desc: "Sobretudo tático de elite para agentes de campo avançados.",
            price: 250000,
            currency: "coins",
            img: "/Loja/loja_sobretudo.png",
            type: "cosmetic"
        }
    ];

    const handleBuy = async (item) => {
        if (buying) return;

        // Validação de saldo
        if (item.currency === "coins" && player.dinheiro < item.price) {
            alert("Moedas insuficientes!");
            return;
        }
        if (item.currency === "diamonds" && (player.diamonds || 0) < item.price) {
            alert("Diamantes insuficientes!");
            return;
        }

        setBuying(item.id);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Usuário não logado");

            let success = false;

            if (item.type === "item") {
                success = await inventoryService.addItem(user.id, item.id, 1);
            } else if (item.type === "currency") {
                // Maleta de moedas
                success = true; // Dinheiro será atualizado no state abaixo
            } else if (item.type === "cosmetic") {
                // Futuramente salvar em player.ownedCosmetics
                success = true;
            }

            if (success) {
                // Atualiza moedas/diamantes no state local (que será auto-salvado)
                const nextDinheiro = item.currency === "coins"
                    ? player.dinheiro - item.price
                    : (item.type === "currency" ? player.dinheiro + item.value : player.dinheiro);

                const nextDiamonds = item.currency === "diamonds"
                    ? (player.diamonds || 0) - item.price
                    : (player.diamonds || 0);

                dispatch({
                    type: "UPDATE_PLAYER",
                    payload: {
                        dinheiro: nextDinheiro,
                        diamonds: nextDiamonds
                    }
                });

                if (item.type === "item") await refreshInventory();

                // Feedback visual de sucesso (opcional)
                console.log("Compra realizada:", item.name);
            }
        } catch (err) {
            console.error("Erro na compra:", err);
            alert("Erro ao processar compra.");
        } finally {
            setBuying(null);
        }
    };

    return (
        <div style={{
            minHeight: "100dvh",
            width: "100vw",
            background: "#000",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            padding: "20px",
            boxSizing: "border-box",
            overflowX: "hidden",
            position: 'relative'
        }}>
            <style>{`
                .shop-container { max-width: 600px; margin: 0 auto; padding-bottom: 40px; }
                .shop-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
                .shop-title-area { display: flex; align-items: center; gap: 12px; }
                .shop-back { background: none; border: none; color: #fff; font-size: 22px; cursor: pointer; padding: 0; opacity: 0.7; }
                .shop-title { font-size: 22px; font-weight: 900; letter-spacing: 2px; }
                
                .shop-currencies { display: flex; gap: 12px; }
                .currency-pill { 
                    background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.15);
                    border-radius: 14px; padding: 6px 12px; display: flex; align-items: center; gap: 4px;
                    font-size: 14px; font-weight: 800; height: 38px; box-sizing: border-box;
                    backdrop-filter: blur(10px);
                }
                .currency-pill img { width: 48px; height: 48px; object-fit: contain; margin-left: -12px; margin-right: -4px; }
                .currency-add { 
                    width: 24px; height: 24px; border-radius: 6px; background: rgba(255,255,255,0.1);
                    display: flex; align-items: center; justify-content: center; font-size: 14px; cursor: pointer;
                    opacity: 0.6;
                }

                .shop-banner {
                    display: flex; align-items: flex-start; margin-top: -10px; margin-bottom: 5px;
                    position: relative; min-height: 120px; padding: 0;
                }
                .banner-text { flex: 1; z-index: 2; margin-top: 10px; }
                .banner-desc { 
                    font-size: 11px; opacity: 0.8; line-height: 1.4; font-weight: 500; 
                    max-width: 180px; color: #ddd;
                }
                .banner-img { 
                    position: absolute; right: -20px; top: -45px;
                    width: 280px; height: auto; object-fit: contain; 
                    z-index: 1; pointer-events: none;
                    filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
                }

                .shop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
                
                .shop-card {
                    background: #000; border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 24px; padding: 18px; display: flex; flex-direction: column;
                    position: relative; overflow: hidden; min-height: 320px;
                    transition: all 0.2s;
                }
                .shop-card:hover { border-color: rgba(128,189,255,0.3); }
                
                .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; z-index: 2; }
                .card-name { 
                    font-size: 11px; font-weight: 900; color: #00aaff; 
                    letter-spacing: 0.5px; text-transform: uppercase; 
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                    max-width: 85%;
                }
                .card-info-icon { opacity: 0.5; font-size: 14px; color: #00aaff; }
                
                .card-desc { font-size: 11px; opacity: 0.7; line-height: 1.4; margin-bottom: 10px; z-index: 2; color: #ccc; }
                
                .card-img-bg { 
                    position: absolute; inset: 0; top: 60px; bottom: 40px;
                    display: flex; align-items: center; justify-content: center; 
                    z-index: 1; opacity: 0.9; pointer-events: none;
                }
                .card-img { 
                    width: 100%; height: 100%; object-fit: contain; 
                    filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
                    mask-image: radial-gradient(circle, black 40%, transparent 95%);
                    -webkit-mask-image: radial-gradient(circle, black 40%, transparent 95%);
                }
                
                .card-footer { margin-top: auto; z-index: 2; }
                .card-owned { font-size: 11px; color: #00aaff; opacity: 0.9; font-weight: 800; margin-bottom: 8px; }
                
                .buy-btn {
                    width: 100%; padding: 4px 10px; border-radius: 8px; border: 1px solid #ffd700;
                    background: rgba(0,0,0,0.6); color: #fff; font-weight: 900;
                    display: flex; align-items: center; justify-content: center; gap: 6px;
                    cursor: pointer; transition: all 0.2s; font-size: 14px;
                    backdrop-filter: blur(5px);
                }
                .buy-btn:hover:not(:disabled) { background: rgba(255,215,0,0.1); transform: translateY(-2px); }
                .buy-btn:disabled { opacity: 0.4; cursor: not-allowed; border-color: rgba(255,255,255,0.2); }
                .buy-btn-img { width: 28px; height: 28px; object-fit: contain; margin-left: -4px; }

                @keyframes om-pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
                .buying { animation: om-pulse 0.5s infinite; pointer-events: none; opacity: 0.7; }
            `}</style>

            <div className="shop-container">
                <div className="shop-header">
                    <div className="shop-title-area">
                        <button className="shop-back" onClick={() => nav("/mural")}>&lt;</button>
                        <div className="shop-title">LOJA</div>
                    </div>
                    <div className="shop-currencies">
                        <div className="currency-pill">
                            <div className="logo-meridian" style={{ fontSize: '22px', marginRight: '4px' }}>M</div>
                            {player.dinheiro.toLocaleString("pt-BR")}
                            <div className="currency-add">+</div>
                        </div>
                        <div className="currency-pill">
                            <img src="/Loja/diamante.png" alt="" />
                            {player.diamonds || 0}
                            <div className="currency-add">+</div>
                        </div>
                    </div>
                </div>

                <div className="shop-banner">
                    <div className="banner-text">
                        <div className="banner-desc">Adquira itens e vantagens para avançar em suas investigações.</div>
                    </div>
                    <img src="/Loja/banner_loja.png" className="banner-img" alt="" />
                </div>

                <div className="shop-grid">
                    {shopItems.map(item => {
                        const ownedCount = item.type === "item" ? (inventory[item.id] || 0) : null;
                        const isAffordable = item.currency === "coins"
                            ? player.dinheiro >= item.price
                            : (player.diamonds || 0) >= item.price;

                        return (
                            <div key={item.id} className={`shop-card ${buying === item.id ? 'buying' : ''}`}>
                                <div className="card-header">
                                    <div className="card-name">{item.name}</div>
                                    <div className="card-info-icon">ⓘ</div>
                                </div>

                                <div className="card-desc">{item.desc}</div>

                                <div className="card-img-bg">
                                    <img src={item.img} className="card-img" alt="" />
                                </div>

                                <div className="card-footer">
                                    {ownedCount !== null && (
                                        <div className="card-owned">Possui: {ownedCount}</div>
                                    )}
                                    <button
                                        className="buy-btn"
                                        onClick={() => handleBuy(item)}
                                        disabled={!isAffordable || buying}
                                    >
                                        {item.currency === "coins" ? (
                                            <div className="logo-meridian" style={{ fontSize: '20px', marginRight: '4px' }}>M</div>
                                        ) : (
                                            <img
                                                src="/Loja/diamante.png"
                                                className="buy-btn-img"
                                                alt=""
                                            />
                                        )}
                                        {item.price.toLocaleString("pt-BR")}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
