import React, { useMemo } from 'react';

/**
 * AvatarDisplay Component
 * Renders a pre-made PNG avatar with the A.T.L.A.S. Agency background.
 * 
 * @param {Object} config - Avatar configuration { gender, id }
 * @param {number|string} size - Size of the avatar (standard 72px)
 * @param {Object} style - Extra styles for the container
 */
export default function AvatarDisplay({ config, size = 72, style = {} }) {
  if (!config || !config.id) return null;

  const avatar = config;

  // Construct final path
  const avatarUrl = useMemo(() => {
    const folder = avatar.gender === 'M' ? 'Masculino' : 'Feminino';
    // Ensure id is two digits if it's a number string like "1"
    const formattedId = String(avatar.id).padStart(2, '0');
    return `/Avatar/${folder}/${formattedId}.png`;
  }, [avatar]);

  const containerStyle = {
    width: size,
    height: size,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px', // Optional: slight rounding fits the UI better
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    ...style
  };

  return (
    <div style={containerStyle} className="avatar-display-container">
      {/* A.T.L.A.S. Background Logo */}
      <img 
        src="/AgenciaATLAS.png" 
        alt="Agência A.T.L.A.S."
        style={{
          position: 'absolute',
          width: '80%',
          height: '80%',
          opacity: 0.15,
          objectFit: 'contain',
          pointerEvents: 'none',
          filter: 'grayscale(1) brightness(2)'
        }}
      />
      
      {/* Avatar Image */}
      <img 
        src={avatarUrl} 
        alt={`Avatar ${avatar.id}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
          position: 'relative',
          zIndex: 1
        }}
        onError={(e) => {
          // Fallback if image doesn't exist
          e.target.src = '/Avatar/Masculino/01.png';
        }}
      />
    </div>
  );
}
