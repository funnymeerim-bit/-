import React from 'react';
import { Instagram, Send, PhoneCall, MapPin, Landmark } from 'lucide-react';
import { Language } from '../types';
import { dictionaries } from '../dictionary';
import { TundukIcon, RedOrnamentStrip, KyrgyzOrnamentBorder } from './OrnamentDesigns';

interface FooterProps {
  language: Language;
  scrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, scrollToSection }) => {
  const d = dictionaries[language];

  const socialLinks = {
    instagram: 'https://instagram.com/ala_too_amir',
    telegram: 'https://t.me/ala_too_amir',
    whatsapp: 'https://wa.me/996772458899?text=Здравствуйте!',
  };

  return (
    <footer className="bg-white text-[#1A3A5C] border-t border-gray-100 relative">
      
      {/* Top ornamental border */}
      <div className="w-full">
        <RedOrnamentStrip />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        
        {/* Responsive Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-200/80">
          
          {/* Logo & Tagline (col-span-12 on small, 5 on medium) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="relative flex items-center justify-center w-10 h-10 bg-[#1A3A5C] rounded-full text-white">
                <svg viewBox="0 0 100 100" className="w-8 h-8 fill-none stroke-current stroke-[4px]">
                  <circle cx="50" cy="50" r="35" />
                  <path d="M15 50h70M50 15v70" />
                  <path d="M25 25l50 50M25 75l50-50" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-[#1A3A5C] uppercase">
                  {d.brandName}
                </span>
                <p className="text-[10px] text-[#D4A017] tracking-wider uppercase font-semibold">
                  {d.brandTagline}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              {language === 'RU' 
                ? 'Натуральные молочные продукты Кара-Суйского района Ошской области. Мы производим курут, масло, айран и шербет с глубоким почтением к уходящим вглубь веков рецептам предков.'
                : 'Ош облусунун Кара-Суу районундагы улуттук накта сүт азыктары. Салттуу даамды, ата-баба аманатын жана жогорку сапатты бириктирген өндүрүш.'}
            </p>

            {/* Micro social rows */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-100 hover:bg-[#D4A017] hover:text-white text-[#1A3A5C] rounded-full transition-all"
                aria-label="Instagram Link"
              >
                <Instagram size={16} />
              </a>
              <a 
                href={socialLinks.telegram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-100 hover:bg-[#D4A017] hover:text-white text-[#1A3A5C] rounded-full transition-all"
                aria-label="Telegram Link"
              >
                <Send size={16} className="translate-x-[-0.5px]" />
              </a>
              <a 
                href={socialLinks.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-100 hover:bg-green-600 hover:text-white text-[#1A3A5C] rounded-full transition-all"
                aria-label="WhatsApp Link"
              >
                <span className="text-xs font-sans font-extrabold px-1">WA</span>
              </a>
            </div>
          </div>

          {/* Quick Links (col-span-3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold text-[#1A3A5C] uppercase tracking-wider">
              {language === 'RU' ? 'Разделы сайта' : 'Барактар'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { id: 'home', label: d.main },
                { id: 'products', label: d.products },
                { id: 'about', label: d.aboutUs },
                { id: 'wholesale', label: d.forWholesalers },
                { id: 'contacts', label: d.contacts },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-slate-500 hover:text-[#D4A017] transition-all cursor-pointer text-left py-0.5"
                  >
                    • {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details footer (col-span-4) */}
          <div className="md:col-span-4 space-y-4 text-xs sm:text-sm">
            <h4 className="font-serif text-sm font-bold text-[#1A3A5C] uppercase tracking-wider">
              {language === 'RU' ? 'Контактная информация' : 'Арыздар жана дарек'}
            </h4>
            
            <ul className="space-y-3">
              <li className="flex gap-2 items-start">
                <MapPin size={16} className="text-[#D4A017] shrink-0 mt-0.5" />
                <span className="text-slate-600 leading-tight">
                  {d.contactAddressText}
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <PhoneCall size={16} className="text-green-600 shrink-0" />
                <a 
                  href={`tel:${d.phoneNum.replace(/\D/g, '')}`} 
                  className="font-bold text-[#1A3A5C] hover:text-[#D4A017] transition-colors"
                >
                  {d.phoneNum}
                </a>
              </li>
              <li className="flex gap-2 items-start">
                <Landmark size={16} className="text-[#D4A017] shrink-0 mt-0.5" />
                <div className="text-slate-600 leading-tight">
                  <p className="font-semibold">{d.contactHours}</p>
                  <p className="text-[11px] opacity-80">{d.contactHoursText}</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower section copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-sans">
          <p className="text-center sm:text-left">
            © 2024 - 2026 {d.brandName}. {d.allRightsReserved}
          </p>
          <div className="flex gap-3 text-slate-400">
            <span>Кара-Суу району / Кара-Суйский район</span>
            <span>•</span>
            <span>Ош облусу / Ошская область</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
