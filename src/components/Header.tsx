import React, { useState } from 'react';
import { ShoppingCart, Phone, Globe, Menu, X, Landmark } from 'lucide-react';
import { Language } from '../types';
import { dictionaries } from '../dictionary';
import { TundukIcon } from './OrnamentDesigns';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  cartItemsCount: number;
  openCart: () => void;
  scrollToSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  cartItemsCount,
  openCart,
  scrollToSection,
}) => {
  const d = dictionaries[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: d.main },
    { id: 'products', label: d.products },
    { id: 'about', label: d.aboutUs },
    { id: 'wholesale', label: d.forWholesalers },
    { id: 'contacts', label: d.contacts },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-[#1A3A5C] shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer select-none group"
            id="header-brand-logo"
          >
            <div className="relative flex items-center justify-center w-10 h-10 bg-[#1A3A5C] rounded-full text-white transition-transform duration-300 group-hover:rotate-12">
              <svg viewBox="0 0 100 100" className="w-8 h-8 fill-none stroke-current stroke-[4px]">
                <circle cx="50" cy="50" r="35" />
                <path d="M15 50h70M50 15v70" />
                <path d="M25 25l50 50M25 75l50-50" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#1A3A5C] uppercase group-hover:text-[#D4A017] transition-colors">
                  {d.brandName}
                </span>
              </div>
              <p className="text-[10px] text-[#D4A017] font-bold tracking-widest uppercase">
                {d.brandTagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-4 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="px-3 py-2 text-sm font-semibold text-[#1A3A5C]/75 hover:text-[#1A3A5C] transition-colors cursor-pointer"
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Area: Language, Phone, Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Phone (Desktop / Tablet) */}
            <div className="hidden md:block text-right">
              <p className="text-[10px] text-[#1A3A5C]/60 font-medium tracking-wider uppercase">Кара-Суу</p>
              <a
                href={`tel:${d.phoneNum.replace(/\D/g, '')}`}
                className="font-bold text-sm text-[#1A3A5C] hover:text-[#D4A017] transition-colors"
                id="header-phone-link"
              >
                {d.phoneNum}
              </a>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center gap-1 text-xs font-bold font-sans">
              <button
                onClick={() => setLanguage('RU')}
                className={`px-1.5 py-1 rounded cursor-pointer transition-all ${
                  language === 'RU'
                    ? 'text-[#1A3A5C]'
                    : 'text-gray-300 hover:text-[#1A3A5C]'
                }`}
                id="lang-toggle-ru"
              >
                RU
              </button>
              <span className="text-gray-300">/</span>
              <button
                onClick={() => setLanguage('KG')}
                className={`px-1.5 py-1 rounded cursor-pointer transition-all ${
                  language === 'KG'
                    ? 'text-[#1A3A5C]'
                    : 'text-gray-300 hover:text-[#1A3A5C]'
                }`}
                id="lang-toggle-kg"
              >
                KG
              </button>
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 bg-[#FDF6E3] hover:bg-[#FDF6E3]/70 px-4 py-1.5 rounded-full border border-[#D4A017] text-[#1A3A5C] font-semibold transition-all cursor-pointer text-xs"
              id="header-cart-btn"
              aria-label="Toggle Shopping Cart"
            >
              <ShoppingCart size={14} className="stroke-[2.5]" />
              <span className="font-bold">{cartItemsCount}</span>
            </button>

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1A3A5C] hover:opacity-80 lg:hidden cursor-pointer"
              id="mobile-menu-burger"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sliding Curtain Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-lg">
          <div className="py-2 border-b border-gray-100 flex justify-between items-center">
            <span className="text-xs uppercase text-slate-400 font-bold tracking-wider">Навигация / Навигация</span>
            <a
              href={`tel:${d.phoneNum.replace(/\D/g, '')}`}
              className="flex items-center gap-1.5 text-xs text-[#1A3A5C] font-semibold"
            >
              <Phone size={12} />
              {d.phoneNum}
            </a>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left px-4 py-3 text-base font-semibold text-[#1A3A5C] hover:bg-slate-50 rounded-lg transition-all"
              id={`mobile-nav-${item.id}`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 flex justify-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Landmark size={14} className="text-[#D4A017]" />
              <span>Кара-Суу району, Ош облусу</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
