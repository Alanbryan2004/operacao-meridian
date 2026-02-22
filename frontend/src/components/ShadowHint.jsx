// src/components/ShadowHint.jsx
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ShadowHint({
    open,
    text = "Uma silhueta atravessa a rua. Você está no caminho certo.",
    durationMs = 1400,
    onClose,
    showHat = true, // se quiser a silhueta sem chapéu: <ShadowHint showHat={false} />
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!open) return;

        setVisible(true);

        const t1 = setTimeout(() => {
            setVisible(false);
        }, Math.max(450, durationMs - 250));

        const t2 = setTimeout(() => {
            onClose?.();
        }, durationMs);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [open, durationMs, onClose]);

    if (!open) return null;

    return createPortal(
        <div className={`meridian-shadowwrap ${visible ? "is-on" : ""}`}>
            <div className="meridian-shadowfilm" />

            <div className="meridian-shadow">
                <div className="meridian-silhouette">
                    {showHat ? <div className="meridian-hat" /> : null}
                    <div className="meridian-head" />
                    <div className="meridian-neck" />
                    <div className="meridian-shoulders" />
                    <div className="meridian-body" />
                    <div className="meridian-floorShadow" />
                </div>
            </div>

            <div className="meridian-shadowtext">
                <div className="meridian-shadowlabel">{text}</div>
            </div>

            <style>{css}</style>
        </div>,
        document.body
    );
}

const css = `
.meridian-shadowwrap{
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  pointer-events: none;
  overflow: hidden;
}

/* filme escuro */
.meridian-shadowfilm{
  position:absolute;
  inset:0;
  background: radial-gradient(ellipse at center, rgba(0,0,0,.10), rgba(0,0,0,.86));
  opacity: 0;
  transition: opacity 120ms ease;
}

.meridian-shadow{
  position:absolute;
  inset:0;
}

/* container que atravessa a tela (a silhueta inteira) */
.meridian-silhouette{
  position:absolute;
  left: -45%;
  top: 54%;
  transform: translateY(-50%);
  width: 190px;
  height: 280px;
  opacity: 0;
  filter: blur(.28px) contrast(1.35);
}

/* chapéu noir, bem genérico */
.meridian-hat{
  position:absolute;
  left: 60px;
  top: 18px;
  width: 86px;
  height: 18px;
  border-radius: 18px;
  background: rgba(0,0,0,.92);
  box-shadow: 0 0 0 2px rgba(255,255,255,.08);
  transform: rotate(-4deg);
}
.meridian-hat::after{
  content:"";
  position:absolute;
  left: 20px;
  top: -14px;
  width: 46px;
  height: 18px;
  border-radius: 14px 14px 10px 10px;
  background: rgba(0,0,0,.92);
}

/* cabeça */
.meridian-head{
  position:absolute;
  left: 84px;
  top: 32px;
  width: 44px;
  height: 56px;
  border-radius: 999px;
  background: rgba(0,0,0,.92);
  box-shadow: 0 0 0 2px rgba(255,255,255,.08);
}

/* pescoço */
.meridian-neck{
  position:absolute;
  left: 98px;
  top: 82px;
  width: 16px;
  height: 22px;
  border-radius: 10px;
  background: rgba(0,0,0,.92);
}

/* ombros */
.meridian-shoulders{
  position:absolute;
  left: 46px;
  top: 98px;
  width: 128px;
  height: 64px;
  border-radius: 64px 64px 44px 44px;
  background: rgba(0,0,0,.92);
  box-shadow: 0 0 0 2px rgba(255,255,255,.06);
}

/* corpo */
.meridian-body{
  position:absolute;
  left: 64px;
  top: 144px;
  width: 92px;
  height: 124px;
  border-radius: 52px 52px 64px 64px;
  background: rgba(0,0,0,.92);
  box-shadow: 0 0 0 2px rgba(255,255,255,.05);
}

/* sombra no chão (dá muito mais “vida” do que um bloco passando) */
.meridian-floorShadow{
  position:absolute;
  left: 40px;
  top: 240px;
  width: 150px;
  height: 34px;
  border-radius: 999px;
  background: rgba(0,0,0,.55);
  filter: blur(6px);
  opacity: .0;
  transform: scaleX(.9);
}

/* texto noir/terminal */
.meridian-shadowtext{
  position:absolute;
  left: 12px;
  right: 12px;
  bottom: 18px;
  display:flex;
  justify-content:center;
}

.meridian-shadowlabel{
  max-width: 540px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(10,10,10,.60);
  border: 1px solid rgba(255,255,255,.14);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: rgba(240,240,240,.95);
  font-size: 13px;
  letter-spacing: .2px;
  text-shadow: 0 1px 0 rgba(0,0,0,.55);
  opacity: 0;
  transform: translateY(6px);
}

/* ON */
.meridian-shadowwrap.is-on .meridian-shadowfilm{ opacity: 1; }
.meridian-shadowwrap.is-on .meridian-shadowlabel{ animation: meridianShadowText 1.4s ease both; }
.meridian-shadowwrap.is-on .meridian-silhouette{ animation: meridianShadowRun 1.15s ease-out both; }
.meridian-shadowwrap.is-on .meridian-floorShadow{
  animation: meridianFloorShadow 1.15s ease-out both;
}

/* movimento atravessando a tela */
@keyframes meridianShadowRun {
  0%   { left: -55%; opacity: 0; transform: translateY(-50%) scale(.98); }
  10%  { opacity: .95; }
  55%  { opacity: .90; }
  80%  { opacity: .55; }
  100% { left: 120%; opacity: 0; transform: translateY(-50%) scale(1.02); }
}

/* sombra do chão acompanha, mas some um pouco antes */
@keyframes meridianFloorShadow {
  0%   { opacity: 0; transform: scaleX(.75); }
  15%  { opacity: .45; transform: scaleX(.92); }
  70%  { opacity: .35; transform: scaleX(1.0); }
  100% { opacity: 0; transform: scaleX(.85); }
}

/* texto aparece e some */
@keyframes meridianShadowText {
  0% { opacity: 0; transform: translateY(8px); }
  18% { opacity: 1; transform: translateY(0); }
  82% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(6px); }
}
`;