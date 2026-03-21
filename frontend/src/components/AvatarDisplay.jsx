import React, { useEffect, useState, useMemo } from 'react';

/**
 * AvatarDisplay Component
 * Renders a modular SVG avatar based on a configuration object.
 * 
 * @param {Object} config - Avatar configuration { gender, skinColor, hairType, hairColor, ... }
 * @param {number|string} size - Size of the avatar (standard 72px)
 * @param {Object} style - Extra styles for the container
 */
export default function AvatarDisplay({ config, size = 72, style = {} }) {
  const [svgParts, setSvgParts] = useState({});
  const [loading, setLoading] = useState(true);

  // Default values mirror seed.js
  const avatar = useMemo(() => ({
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
    clothingColor: "#5B2214",
    ...config
  }), [config]);

  // URLs for the bits
  const partUrls = useMemo(() => {
    const urls = {
      cabeca: '/Avatar/cabeca.svg',
      olhos: `/Avatar/olhos/olhos_tipo_${avatar.eyeType}.svg`,
      boca: `/Avatar/boca/boca_tipo_${avatar.mouthType}.svg`,
      cabelo: `/Avatar/cabelo/cabelo_tipo_${avatar.hairType}.svg`,
      nariz: `/Avatar/nariz/nariz_tipo_${avatar.noseType}.svg`,
      sombrancelha: `/Avatar/sombrancelha/sombrancelha_tipo_${avatar.eyebrowType}.svg`,
      roupa: `/Avatar/roupa/roupa_tipo_${avatar.clothingType}.svg`,
    };
    if (avatar.beardType > 0) {
      urls.barba = `/Avatar/barba/barba_tipo_${avatar.beardType}.svg`;
    }
    return urls;
  }, [avatar]);

  useEffect(() => {
    let active = true;
    async function fetchAll() {
      setLoading(true);
      const fetched = {};
      const keys = Object.keys(partUrls);
      
      try {
        const results = await Promise.all(keys.map(k => fetch(partUrls[k]).then(r => r.text())));
        if (!active) return;
        
        results.forEach((text, i) => {
          // Extract the <g> content or just keep the paths
          // Since they all share the same viewBox, we can just strip the <svg> wrapper
          // and wrap them ourselves.
          const gMatch = text.match(/<g[^>]*>([\s\S]*)<\/g>/);
          if (gMatch) {
            fetched[keys[i]] = gMatch[1];
          } else {
            // Fallback: extract paths
            const paths = text.match(/<path[\s\S]*?\/>/g);
            fetched[keys[i]] = paths ? paths.join('') : '';
          }
        });
        setSvgParts(fetched);
      } catch (err) {
        console.error("Error loading avatar SVGs:", err);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchAll();
    return () => { active = false; };
  }, [partUrls]);

  // Map of static hex colors to dynamic colors
  const colorMap = {
    "#FDE2C6": avatar.skinColor,
    "#FFDBBA": avatar.skinColor,
    "#FFDDBE": avatar.skinColor,
    "#FED2AD": avatar.skinColor,
    "#D99A7A": avatar.skinColor,
    "#EEB793": avatar.skinColor,
    "#DB9C7C": avatar.skinColor,
    "#DA9D7D": avatar.skinColor,
    "#E2A786": avatar.skinColor,
    "#ED8E74": avatar.mouthColor, // Original mouth
    "#361D18": avatar.hairColor, // Original hair
    "#361A1F": avatar.hairColor, // Hair outline variation
    "#151618": avatar.hairColor, // Dark hair variation
    "#121113": avatar.hairColor, // Dark hair variation
    "#742B1C": avatar.eyeColor,  // Iris
    "#5B2214": avatar.clothingColor, // Clothes
    "#6E3928": avatar.hairColor, // Beard/Hair shadow
    "#13090B": avatar.hairColor, // Darker hair
  };

  const processContent = (content) => {
    let processed = content;
    Object.entries(colorMap).forEach(([oldColor, newColor]) => {
      // Use regex to replace color ignoring case
      processed = processed.replace(new RegExp(oldColor, 'gi'), newColor);
    });
    return processed;
  };

  if (loading) return <div style={{ width: size, height: size, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />;

  return (
    <div style={{
      width: size,
      height: size,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    }}>
      <svg
        viewBox="4680 12500 900 1000"
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Important: Ordering of parts matters for stacking */}
        <g dangerouslySetInnerHTML={{ __html: processContent(svgParts.cabeca || '') }} />
        <g dangerouslySetInnerHTML={{ __html: processContent(svgParts.nariz || '') }} />
        <g dangerouslySetInnerHTML={{ __html: processContent(svgParts.olhos || '') }} />
        <g dangerouslySetInnerHTML={{ __html: processContent(svgParts.boca || '') }} />
        <g dangerouslySetInnerHTML={{ __html: processContent(svgParts.sombrancelha || '') }} />
        {svgParts.barba && (
          <g dangerouslySetInnerHTML={{ __html: processContent(svgParts.barba) }} />
        )}
        <g dangerouslySetInnerHTML={{ __html: processContent(svgParts.cabelo || '') }} />
        <g dangerouslySetInnerHTML={{ __html: processContent(svgParts.roupa || '') }} />
      </svg>
    </div>
  );
}
