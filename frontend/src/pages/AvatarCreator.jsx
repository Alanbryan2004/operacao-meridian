import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGame } from '../game/GameProvider';
import AvatarDisplay from '../components/AvatarDisplay';

const MALE_AVATAR_IDS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];
const FEMALE_AVATAR_IDS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

export default function AvatarCreator() {
  const { state, dispatch } = useGame();
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const isOnboarding = searchParams.get("onboarding") === "true";

  const [step, setStep] = useState(isOnboarding ? 1 : 2);
  const [nome, setNome] = useState(state.player.nome || "");
  const [selectedGender, setSelectedGender] = useState(state.player.avatar?.gender || "M");
  const [selectedId, setSelectedId] = useState(state.player.avatar?.id || "01");
  const [catchphrase, setCatchphrase] = useState(state.player.avatar?.frase || "");
  const [animating, setAnimating] = useState(false);

  // Derived config for the preview
  const tempAvatar = useMemo(() => ({
    gender: selectedGender,
    id: selectedId,
    frase: catchphrase
  }), [selectedGender, selectedId, catchphrase]);

  const handleSelect = (id) => {
    if (id === selectedId) return;
    setAnimating(true);
    setSelectedId(id);
    setTimeout(() => setAnimating(false), 300);
  };

  const handleGenderChange = (gender) => {
    if (gender === selectedGender) return;
    setAnimating(true);
    setSelectedGender(gender);
    
    // Bounds check to prevent keeping an invalid ID when switching genders
    const validIds = gender === 'M' ? MALE_AVATAR_IDS : FEMALE_AVATAR_IDS;
    if (!validIds.includes(selectedId)) {
        setSelectedId("01");
    }

    setTimeout(() => setAnimating(false), 300);
  };

  const handleSave = () => {
    const finalNome = (nome || "").trim() || "Recruta";
    dispatch({ type: 'UPDATE_PLAYER', payload: { nome: finalNome, avatar: tempAvatar } });
    if (isOnboarding) {
      nav('/missao-intro/C001');
    } else {
      nav('/perfil');
    }
  };

  const renderStep1 = () => (
    <div className="av-step-card">
      <h2 className="av-step-title">Identificação do Agente</h2>
      <p className="av-step-desc">Confirme seu nome e escolha seu perfil de atuação.</p>

      <div style={{ marginBottom: 30, maxWidth: 400, margin: '0 auto 30px auto' }}>
          <div className="av-phrase-box" style={{ background: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
            <label style={{ color: '#60a5fa' }}>CODINOME / NICKNAME</label>
            <input 
               type="text" 
               value={nome}
               onChange={(e) => setNome(e.target.value)}
               placeholder="Como quer ser chamado?"
               style={{ textAlign: 'center', fontSize: '20px', fontWeight: '800' }}
            />
          </div>
      </div>
      
      <div className="av-gender-selection">
        <button 
          className={`av-gender-big ${selectedGender === 'M' ? 'active' : ''}`}
          onClick={() => handleGenderChange('M')}
        >
          <div className="av-gender-icon">♂</div>
          <div className="av-gender-label">AGENTE MASCULINO</div>
        </button>
        
        <button 
          className={`av-gender-big ${selectedGender === 'F' ? 'active' : ''}`}
          onClick={() => handleGenderChange('F')}
        >
          <div className="av-gender-icon">♀</div>
          <div className="av-gender-label">AGENTE FEMININO</div>
        </button>
      </div>

      <button className="av-btn av-btn-save av-next-btn" onClick={() => setStep(2)}>
        PRÓXIMO PASSO ❯
      </button>
    </div>
  );

  return (
    <div className="av-page">
      <style>{`
        .av-page {
          min-height: 100dvh;
          width: 100vw;
          background: radial-gradient(circle at 50% 0%, #0f172a 0%, #020617 100%);
          color: #fff;
          display: flex;
          flex-direction: column;
          padding: 20px;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        .av-container { max-width: 800px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 24px; flex: 1; }
        
        .av-header { text-align: center; }
        .av-header h1 { font-size: 28px; font-weight: 900; letter-spacing: -1px; margin: 0; background: linear-gradient(180deg, #fff 0%, #94a3b8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .av-header p { font-size: 14px; color: #64748b; margin-top: 5px; text-transform: uppercase; letter-spacing: 2px; }

        .av-main-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: start; }
        
        @media (max-width: 700px) {
          .av-main-layout { grid-template-columns: 1fr; }
        }

        .av-preview-card {
          background: rgba(15, 23, 42, 0.6);
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: sticky;
          top: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          overflow: hidden;
        }

        .av-preview-container {
          position: relative;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s;
        }
        .av-preview-container.jumping {
          transform: scale(0.9) translateY(10px);
          opacity: 0.5;
        }

        .av-id-badge {
          margin-top: 20px;
          background: rgba(30, 41, 59, 0.8);
          padding: 6px 16px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .av-selector-panel { display: flex; flex-direction: column; gap: 20px; }

        .av-gender-tabs {
          display: flex; gap: 10px; background: rgba(0,0,0,0.2); padding: 6px; border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .av-g-tab {
          flex: 1; padding: 12px; border: none; background: transparent; color: #64748b;
          font-weight: 700; cursor: pointer; border-radius: 12px; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .av-g-tab.active { background: #1e293b; color: #60a5fa; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }

        .av-phrase-box {
          background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05);
          padding: 16px; border-radius: 16px; display: flex; flex-direction: column; gap: 8px;
        }
        .av-phrase-box label { font-size: 10px; font-weight: 800; color: #64748b; letter-spacing: 1px; }
        .av-phrase-box input {
          background: transparent; border: none; border-bottom: 2px solid #1e293b;
          color: #fff; font-size: 16px; font-weight: 500; padding: 8px 0; outline: none; transition: border-color 0.2s;
        }
        .av-phrase-box input:focus { border-color: #3b82f6; }
        .av-char-count { font-size: 10px; text-align: right; color: #475569; }

        .av-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
          max-height: 400px; overflow-y: auto; padding-right: 8px;
        }
        .av-grid::-webkit-scrollbar { width: 4px; }
        .av-grid::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }

        .av-item {
          aspect-ratio: 1; border-radius: 16px; overflow: hidden; cursor: pointer;
          border: 2px solid transparent; transition: all 0.2s; background: rgba(255,255,255,0.02);
          position: relative;
        }
        .av-item:hover { transform: translateY(-2px); background: rgba(255,255,255,0.05); }
        .av-item.active { border-color: #3b82f6; background: rgba(59, 130, 246, 0.1); }
        
        .av-item img { width: 100%; height: 100%; object-fit: cover; object-position: top center; opacity: 0.7; transition: opacity 0.2s; }
        .av-item.active img { opacity: 1; }

        .av-footer { display: flex; gap: 12px; margin-top: auto; padding-top: 20px; }
        .av-btn { flex: 1; padding: 16px; border-radius: 16px; font-weight: 800; border: none; cursor: pointer; transition: all 0.2s; font-size: 14px; }
        .av-btn-cancel { background: #1e293b; color: #94a3b8; }
        .av-btn-save { background: #3b82f6; color: #fff; box-shadow: 0 8px 20px -4px rgba(59, 130, 246, 0.4); }
        .av-btn:hover { transform: translateY(-2px); opacity: 0.9; }

        /* Onboarding Styles */
        .av-step-card {
            background: rgba(15, 23, 42, 0.6);
            border-radius: 32px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 40px;
            text-align: center;
            animation: fadeIn 0.4s ease-out;
        }
        .av-step-title { font-size: 24px; font-weight: 800; margin-bottom: 8px; }
        .av-step-desc { font-size: 14px; color: #94a3b8; margin-bottom: 32px; }

        .av-gender-selection {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 40px;
        }
        .av-gender-big {
            aspect-ratio: 1;
            background: rgba(255,255,255,0.03);
            border: 2px solid rgba(255,255,255,0.05);
            border-radius: 24px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            transition: all 0.2s;
            color: #64748b;
        }
        .av-gender-big:hover { background: rgba(255,255,255,0.06); transform: translateY(-4px); }
        .av-gender-big.active {
            background: rgba(59, 130, 246, 0.1);
            border-color: #3b82f6;
            color: #3b82f6;
            box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.3);
        }
        .av-gender-icon { font-size: 40px; }
        .av-gender-label { font-size: 12px; font-weight: 800; letter-spacing: 1px; }

        .av-next-btn { max-width: 300px; margin: 0 auto; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="av-container">
        <header className="av-header">
          <h1>{isOnboarding ? 'BEM-VINDO, AGENTE' : 'AGENTE MERIDIAN'}</h1>
          <p>{isOnboarding ? 'CONFIGURAÇÃO INICIAL DE PERFIL' : 'Dossiê de Identificação'}</p>
        </header>

        {step === 1 ? (
           renderStep1()
        ) : (
          <div className="av-main-layout">
            {/* Lado Esquerdo: Preview */}
            <div className="av-preview-card">
              <div className={`av-preview-container ${animating ? 'jumping' : ''}`}>
                <AvatarDisplay config={tempAvatar} size={280} />
              </div>
              <div className="av-id-badge">
                AGENTE {selectedGender === 'M' ? 'M' : 'F'} #{selectedId}
              </div>
              
              <div className="av-footer" style={{ width: '100%' }}>
                <button className="av-btn av-btn-cancel" onClick={() => isOnboarding ? setStep(1) : nav('/perfil')}>
                  {isOnboarding ? 'VOLTAR' : 'CANCELAR'}
                </button>
                <button className="av-btn av-btn-save" onClick={handleSave}>
                  {isOnboarding ? 'INICIAR CARREIRA' : 'CONFIRMAR'}
                </button>
              </div>
            </div>

            {/* Lado Direito: Seleção */}
            <div className="av-selector-panel">
              <div className="av-gender-tabs">
                <button 
                  className={`av-g-tab ${selectedGender === 'M' ? 'active' : ''}`}
                  onClick={() => handleGenderChange('M')}
                >
                  ♂ MASCULINO
                </button>
                <button 
                  className={`av-g-tab ${selectedGender === 'F' ? 'active' : ''}`}
                  onClick={() => handleGenderChange('F')}
                >
                  ♀ FEMININO
                </button>
              </div>

              <div className="av-phrase-box">
                <label>FRASE DE EFEITO (MAX 70)</label>
                <input 
                  type="text" 
                  maxLength={70}
                  value={catchphrase}
                  onChange={(e) => setCatchphrase(e.target.value)}
                  placeholder="Ex: No rastro da verdade..."
                />
                <div className="av-char-count">{catchphrase.length}/70</div>
              </div>

              <div className="av-grid">
                {(selectedGender === 'M' ? MALE_AVATAR_IDS : FEMALE_AVATAR_IDS).map(id => (
                  <div 
                    key={id}
                    className={`av-item ${selectedId === id ? 'active' : ''}`}
                    onClick={() => handleSelect(id)}
                  >
                    <img 
                      src={`/Avatar/${selectedGender === 'M' ? 'Masculino' : 'Feminino'}/${id}.png`} 
                      alt={`Opção ${id}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
