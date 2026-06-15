import React from 'react';

/**
 * Tunduk Icon SVG - circular felt yurt dome pattern
 */
export const TundukIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'text-warm-gold',
  size = 48,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer circular frame */}
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" />
      <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      
      {/* Dynamic diagonal crossing bands (traditional tunduk cross) */}
      {/* Band 1: top-left to bottom-right curve */}
      <path
        d="M 18 18 Q 50 42 82 82"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M 23 15 Q 50 34 85 77"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Band 2: top-right to bottom-left curve */}
      <path
        d="M 82 18 Q 50 42 18 82"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M 77 15 Q 50 34 15 77"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Crosswise lines represent the roof struts (Uuk / Уук) */}
      <path d="M 50 5 L 50 95" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.75" />
      <path d="M 5 50 L 95 50" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.75" />

      {/* Decorative center ring */}
      <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="3" fill="none" />
      <circle cx="50" cy="50" r="6" fill="currentColor" />
    </svg>
  );
};

/**
 * Traditional Kyrgyz Ornament Pattern Border ("Ирис / Туюк")
 * Repeating wave-like felt craft ornaments
 */
export const KyrgyzOrnamentBorder: React.FC<{ className?: string }> = ({
  className = 'bg-warm-gold',
}) => {
  return (
    <div className="relative w-full h-8 overflow-hidden pointer-events-none flex select-none" aria-hidden="true">
      <div className={`w-full h-full ${className} flex items-center justify-around opacity-95`}>
        {Array.from({ length: 16 }).map((_, i) => (
          <svg key={i} width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white shrink-0">
            <path
              d="M0 12 C10 12, 10 2, 20 2 C30 2, 30 22, 40 22 C50 22, 50 12, 60 12"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M10 12 C15 12, 15 6, 20 6 C25 6, 25 18, 30 18 C35 18, 35 12, 40 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            {/* Ornament floral curls */}
            <path
              d="M20 2 C20 6, 17 9, 14 9 C11 9, 11 6, 14 6 C17 6, 18 2, 20 2 Z"
              fill="currentColor"
              opacity="0.9"
            />
            <path
              d="M40 22 C40 18, 43 15, 46 15 C49 15, 49 18, 46 18 C43 18, 42 22, 40 22 Z"
              fill="currentColor"
              opacity="0.9"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

/**
 * Traditional Kyrgyz Ornament Border Stripe (Red Theme Accent)
 */
export const RedOrnamentStrip: React.FC = () => {
  return (
    <div className="relative w-full h-10 overflow-hidden pointer-events-none flex bg-earth-red border-y-2 border-warm-gold" aria-hidden="true">
      <div className="w-full h-full flex items-center justify-around text-warm-gold">
        {Array.from({ length: 24 }).map((_, i) => (
          <svg key={i} width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            {/* Stylized rams horn (Кочкор мүйүз) */}
            <path
              d="M 5 8 Q 10 2 15 8 T 25 8 T 35 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 12 8 C 12 5, 8 3, 5 5 C 2 7, 3 11, 7 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 28 8 C 28 5, 32 3, 35 5 C 38 7, 37 11, 33 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

/**
 * Ala-Too Mountain Peaks Silhouette SVG Divider
 */
export const MountainSilhouetteDivider: React.FC<{ fillClass?: string; bgClass?: string }> = ({
  fillClass = 'fill-glacier-white',
  bgClass = 'bg-transparent',
}) => {
  return (
    <div className={`relative w-full h-16 xl:h-24 overflow-hidden -mt-1 pointer-events-none ${bgClass}`} aria-hidden="true">
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rear mountains */}
        <path
          d="M0 80 L180 30 L380 90 L520 40 L710 95 L900 25 L1100 80 L1280 35 L1440 100 L1440 120 L0 120 Z"
          className={`${fillClass}`}
          opacity="0.4"
        />
        {/* Middle mountain layer */}
        <path
          d="M0 95 L240 45 L500 105 L780 55 L1020 98 L1180 50 L1440 110 L1440 120 L0 120 Z"
          className={`${fillClass}`}
          opacity="0.75"
        />
        {/* Front stylized mountain peaks */}
        <path
          d="M0 110 L120 70 L320 112 L450 78 L680 115 L880 72 L1120 113 L1320 80 L1440 115 L1440 120 L0 120 Z"
          className={`${fillClass}`}
        />
      </svg>
    </div>
  );
};

/**
 * Felt Texture effect pattern overlay (SVG defs)
 */
export const FeltTextureOverlay: React.FC = () => {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <filter id="felt-texture" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 .5
                    0 0 0 0 .5
                    0 0 0 0 .5
                    1  0  0  0  -0.9"
            result="coloredNoise"
          />
          <feComposite operator="in" in2="SourceGraphic" in="coloredNoise" />
          <feBlend mode="multiply" in="SourceGraphic" in2="coloredNoise" />
        </filter>
      </defs>
    </svg>
  );
};
