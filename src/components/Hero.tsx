import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { dictionaries } from '../dictionary';
import { MountainSilhouetteDivider, RedOrnamentStrip } from './OrnamentDesigns';

interface HeroProps {
  language: Language;
  onBuyNowClick: () => void;
  onWholesalerClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onBuyNowClick,
  onWholesalerClick,
}) => {
  const d = dictionaries[language];

  return (
    <section id="home" className="relative bg-[#1A3A5C] min-h-[550px] sm:min-h-[600px] lg:min-h-[680px] flex flex-col justify-between overflow-hidden">
      
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/ala_too_hero_banner_1781253962755.jpg"
          alt="Ala-Too mountains pasture backdrop"
          className="w-full h-full object-cover object-bottom scale-105 filter brightness-90 saturate-105"
          referrerPolicy="no-referrer"
        />
        {/* Soft radial overlay and dark-tinted gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A5C] via-[#1A3A5C]/75 to-black/40 z-0" />
      </div>

      {/* Decorative Tunduk big watermark backdrop behind content */}
      <div className="absolute right-4 bottom-16 lg:right-24 lg:bottom-28 opacity-10 pointer-events-none z-0 transform rotate-12">
        <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor" className="text-[#D4A017]">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" fill="none" />
          <path d="M 18 18 Q 50 42 82 82" stroke="currentColor" strokeWidth="4" />
          <path d="M 82 18 Q 50 42 18 82" stroke="currentColor" strokeWidth="4" />
          <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pb-16 flex-grow flex items-center">
        <div className="max-w-3xl text-left">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B1A1A] text-white text-[10px] font-bold uppercase tracking-widest mb-6"
            id="hero-badge"
          >
            <Sparkles size={11} className="fill-current animate-pulse text-[#D4A017]" />
            <span>100% Табигый таза өнүм • Натуральный состав</span>
          </motion.div>

          {/* Headline - Bilingual Primary KG, Second RU */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-4"
            id="hero-title-headline"
          >
            {d.heroTitle}
          </motion.h1>

          {/* Subheading - Russian Accent text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed mb-8 max-w-xl border-l-[3px] border-[#D4A017] pl-4 italic opacity-90"
            id="hero-subtitle"
          >
            {d.heroSub}
          </motion.p>

          {/* Call to Actions (CTAs) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:items-center"
            id="hero-actions"
          >
            <button
              onClick={onBuyNowClick}
              className="px-8 py-3 bg-[#D4A017] hover:bg-yellow-600 text-white font-bold text-xs uppercase tracking-widest transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 group"
              id="hero-buy-now-btn"
            >
              <span>{d.buyNow}</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
            
            <button
              onClick={onWholesalerClick}
              className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border border-white/30 font-bold text-xs uppercase tracking-widest transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
              id="hero-wholesale-btn"
            >
              <ShieldCheck size={14} className="text-[#D4A017]" />
              <span>{d.wholesaleCta}</span>
            </button>
          </motion.div>

        </div>
      </div>

      {/* Ornament strip divider */}
      <div className="relative z-10 w-full mt-auto">
        <RedOrnamentStrip />
        <MountainSilhouetteDivider fillClass="fill-[#F0F6FF]" bgClass="bg-[#1A3A5C]" />
      </div>

    </section>
  );
};
