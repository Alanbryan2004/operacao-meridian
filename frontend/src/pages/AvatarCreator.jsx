import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../game/GameProvider';
import AvatarDisplay from '../components/AvatarDisplay';

const CATEGORIES = [
  { id: 'gender', label: 'Gênero', icon: '👤' },
  { id: 'skin', label: 'Pele', icon: '✋' },
  { id: 'hair', label: 'Cabelo', icon: '💇' },
  { id: 'eyes', label: 'Olhos', icon: '👁️' },
  { id: 'mouth', label: 'Boca', icon: '👄' },
  { id: 'nose', label: 'Nariz', icon: '👃' },
  { id: 'eyebrow', label: 'Sobrancelha', icon: '🤨' },
  { id: 'beard', label: 'Barba', icon: '🧔' },
  { id: 'clothes', label: 'Roupa', icon: '👕' },
];

const PALETTES = {
  skin: ['#FDE2C6', '#FFDBBA', '#FED2AD', '#DB9C7C', '#D99A7A', '#EEB793', '#8D5524', '#C68642', '#E0AC69', '#F1C27D', '#FFDBAC'],
  hair: ['#361D18', '#090806', '#2C1B18', '#4E312D', '#6E3928', '#8D5524', '#B6523A', '#D6C4C2', '#C68642', '#E0AC69', '#F1C27D'],
  eyes: ['#742B1C', '#361D18', '#2D5522', '#1C3A5E', '#5B2214', '#A52A2A', '#0000FF', '#008000'],
  mouth: ['#ED8E74', '#D96E5D', '#A64B3E', '#F08080', '#FA8072', '#E9967A'],
  clothes: ['#5B2214', '#1C3A5E', '#2D5522', '#361D18', '#A52A2A', '#4A4A4A', '#222222', '#FFFFFF', '#FFD700']
};

export default function AvatarCreator() {
  const { state, dispatch } = useGame();
  const nav = useNavigate();
  const [activeCategory, setActiveCategory] = useState('gender');
  const [tempAvatar, setTempAvatar] = useState(state.player.avatar || {
    gender: "M",
    skinColor: "#FDE2C6",
    hairType: 1,
    hairColor: "#361D18",
    eyeType: 1,
    eyeColor: "#742B1C",
    mouthType: 1,
    mouthColor: "#ED8E74",
    noseType: 1,
    eyebrowType: 1,
    eyebrowColor: "#361D18",
    beardType: 0,
    beardColor: "#361D18",
    clothingType: 1,
    clothingColor: "#5B2214"
  });

  const update = (field, value) => {
    setTempAvatar(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    dispatch({ type: 'UPDATE_PLAYER', payload: { avatar: tempAvatar } });
    nav('/perfil');
  };

  return (
    <div style={{
      minHeight: '100dvh',
      width: '100vw',
      background: 'radial-gradient(circle at center, #0a1f2d 0%, #000 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <style>{`
        .av-container { max-width: 600px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 20px; flex: 1; }
        .av-preview-box { background: rgba(255,255,255,0.05); border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); padding: 30px; display: flex; align-items: center; justifyContent: center; aspect-ratio: 1; position: relative; }
        .av-controls { background: rgba(255,255,255,0.07); border-radius: 24px; border: 1px solid rgba(255,255,255,0.12); backdrop-filter: blur(12px); display: flex; flex-direction: column; flex: 1; overflow: hidden; }
        .av-tabs { display: flex; overflow-x: auto; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 5px; gap: 5px; scrollbar-width: none; }
        .av-tabs::-webkit-scrollbar { display: none; }
        .av-tab { padding: 12px 18px; border-radius: 12px; cursor: pointer; white-space: nowrap; font-size: 13px; font-weight: 600; border: none; background: transparent; color: rgba(255,255,255,0.4); transiton: all 0.2s; }
        .av-tab.active { background: rgba(128,189,255,0.15); color: #80bdff; }
        .av-option-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 20px; overflow-y: auto; flex: 1; }
        .av-item-btn { 
          aspect-ratio: 1; border-radius: 12px; border: 2px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); 
          display: flex; align-items: center; justifyContent: center; cursor: pointer; transition: all 0.2s;
        }
        .av-item-btn.active { border-color: #80bdff; background: rgba(128,189,255,0.1); }
        .av-color-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; padding: 20px; }
        .av-color-btn { 
          aspect-ratio: 1; border-radius: 50%; border: 2px solid rgba(255,255,255,0.1); cursor: pointer; transition: all 0.2s;
        }
        .av-color-btn.active { border-color: #fff; transform: scale(1.1); box-shadow: 0 0 10px rgba(128,189,255,0.5); }
        .av-footer { padding: 20px; display: flex; gap: 12px; }
        .av-btn { flex: 1; padding: 14px; border-radius: 14px; font-weight: 800; border: none; cursor: pointer; transition: all 0.2s; font-size: 14px; }
        .av-btn-cancel { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.6); }
        .av-btn-save { background: linear-gradient(135deg, #1c3a5e 0%, #0a1f2d 100%); color: #80bdff; border: 1px solid rgba(128,189,255,0.3); }
        .av-gender-btn { 
          flex: 1; padding: 20px; border-radius: 16px; border: 2px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); 
          text-align: center; cursor: pointer; transition: all 0.2s;
        }
        .av-gender-btn.active { border-color: #80bdff; background: rgba(128,189,255,0.1); color: #80bdff; }
      `}</style>

      <div className="av-container">
        <header style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: 1 }}>CRIAÇÃO DE AVATAR</h1>
          <p style={{ fontSize: 13, opacity: 0.6 }}>Identificação Civil A.T.L.A.S.</p>
        </header>

        <div className="av-preview-box">
          <AvatarDisplay config={tempAvatar} size={240} />
          {/* Badge de detective look */}
          <div style={{ position: 'absolute', bottom: 15, right: 15, background: '#1c3a5e', fontSize: 10, padding: '4px 10px', borderRadius: 6, opacity: 0.8 }}>DET. ID: #{Math.floor(Math.random() * 99999).toString().padStart(5,'0')}</div>
        </div>

        <div className="av-controls">
          <div className="av-tabs">
            {CATEGORIES.map(c => (
              <button key={c.id} className={`av-tab ${activeCategory === c.id ? 'active' : ''}`} onClick={() => setActiveCategory(c.id)}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {activeCategory === 'gender' && (
              <div style={{ display: 'flex', gap: 15, padding: 30 }}>
                <div className={`av-gender-btn ${tempAvatar.gender === 'M' ? 'active' : ''}`} onClick={() => update('gender', 'M')}>
                  <div style={{ fontSize: 30, marginBottom: 10 }}>🧔</div>
                  <div style={{ fontWeight: 800 }}>MASCULINO</div>
                </div>
                <div className={`av-gender-btn ${tempAvatar.gender === 'F' ? 'active' : ''}`} onClick={() => update('gender', 'F')}>
                  <div style={{ fontSize: 30, marginBottom: 10 }}>👩</div>
                  <div style={{ fontWeight: 800 }}>FEMININO</div>
                </div>
              </div>
            )}

            {activeCategory === 'skin' && (
              <div className="av-color-grid">
                {PALETTES.skin.map(c => (
                  <button key={c} className={`av-color-btn ${tempAvatar.skinColor === c ? 'active' : ''}`} style={{ background: c }} onClick={() => update('skinColor', c)} />
                ))}
              </div>
            )}

            {activeCategory === 'hair' && (
              <>
                <div className="av-option-grid">
                  {[1, 2, 3, 4, 5].map(t => (
                    <div key={t} className={`av-item-btn ${tempAvatar.hairType === t ? 'active' : ''}`} onClick={() => update('hairType', t)}>
                      <div style={{ fontSize: 12, fontWeight: 800 }}>TIPO {t}</div>
                    </div>
                  ))}
                </div>
                <div className="av-color-grid" style={{ paddingTop: 0 }}>
                  {PALETTES.hair.map(c => (
                    <button key={c} className={`av-color-btn ${tempAvatar.hairColor === c ? 'active' : ''}`} style={{ background: c }} onClick={() => { update('hairColor', c); update('beardColor', c); update('eyebrowColor', c); }} />
                  ))}
                </div>
              </>
            )}

            {activeCategory === 'eyes' && (
              <>
                <div className="av-option-grid">
                  {[1, 2, 3, 4].map(t => (
                    <div key={t} className={`av-item-btn ${tempAvatar.eyeType === t ? 'active' : ''}`} onClick={() => update('eyeType', t)}>
                      <div style={{ fontSize: 12, fontWeight: 800 }}>TIPO {t}</div>
                    </div>
                  ))}
                </div>
                <div className="av-color-grid" style={{ paddingTop: 0 }}>
                  {PALETTES.eyes.map(c => (
                    <button key={c} className={`av-color-btn ${tempAvatar.eyeColor === c ? 'active' : ''}`} style={{ background: c }} onClick={() => update('eyeColor', c)} />
                  ))}
                </div>
              </>
            )}

            {activeCategory === 'mouth' && (
              <div className="av-option-grid">
                {[1, 2, 3, 4].map(t => (
                  <div key={t} className={`av-item-btn ${tempAvatar.mouthType === t ? 'active' : ''}`} onClick={() => update('mouthType', t)}>
                    <div style={{ fontSize: 12, fontWeight: 800 }}>TIPO {t}</div>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === 'nose' && (
              <div className="av-option-grid">
                {[1, 2, 3, 4].map(t => (
                  <div key={t} className={`av-item-btn ${tempAvatar.noseType === t ? 'active' : ''}`} onClick={() => update('noseType', t)}>
                    <div style={{ fontSize: 12, fontWeight: 800 }}>TIPO {t}</div>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === 'eyebrow' && (
              <div className="av-option-grid">
                {[1, 2].map(t => (
                  <div key={t} className={`av-item-btn ${tempAvatar.eyebrowType === t ? 'active' : ''}`} onClick={() => update('eyebrowType', t)}>
                    <div style={{ fontSize: 12, fontWeight: 800 }}>TIPO {t}</div>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === 'beard' && (
              <div className="av-option-grid">
                {[0, 1, 2, 3].map(t => (
                  <div key={t} className={`av-item-btn ${tempAvatar.beardType === t ? 'active' : ''}`} onClick={() => update('beardType', t)}>
                    <div style={{ fontSize: 10, fontWeight: 800 }}>{t === 0 ? 'NENHUMA' : `TIPO ${t}`}</div>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === 'clothes' && (
              <>
                <div className="av-option-grid">
                  {[1, 2].map(t => (
                    <div key={t} className={`av-item-btn ${tempAvatar.clothingType === t ? 'active' : ''}`} onClick={() => update('clothingType', t)}>
                      <div style={{ fontSize: 12, fontWeight: 800 }}>TIPO {t}</div>
                    </div>
                  ))}
                </div>
                <div className="av-color-grid" style={{ paddingTop: 0 }}>
                  {PALETTES.clothes.map(c => (
                    <button key={c} className={`av-color-btn ${tempAvatar.clothingColor === c ? 'active' : ''}`} style={{ background: c }} onClick={() => update('clothingColor', c)} />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="av-footer">
            <button className="av-btn av-btn-cancel" onClick={() => nav('/perfil')}>CANCELAR</button>
            <button className="av-btn av-btn-save" onClick={handleSave}>SALVAR AVATAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}
