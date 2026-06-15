import React from 'react';
import { MapPin, Phone, Clock, Instagram, Send, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { dictionaries } from '../dictionary';
import { TundukIcon } from './OrnamentDesigns';

interface ContactMapProps {
  language: Language;
}

export const ContactMap: React.FC<ContactMapProps> = ({ language }) => {
  const d = dictionaries[language];

  // We use our clean, consistent number for wa.me/996772458899
  const socialLinks = {
    instagram: 'https://instagram.com/ala_too_amir',
    telegram: 'https://t.me/ala_too_amir',
    whatsapp: 'https://wa.me/996772458899?text=Здравствуйте!',
  };

  return (
    <section id="contacts" className="py-20 bg-[#F0F6FF] text-[#1A3A5C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TundukIcon size={28} className="text-[#8B1A1A]" />
            <span className="text-[#8B1A1A] font-extrabold text-xs uppercase tracking-widest">{d.contacts}</span>
            <TundukIcon size={28} className="text-[#8B1A1A]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A3A5C] mb-4">
            {d.contactsTitle}
          </h2>
          <p className="font-sans text-slate-600 text-sm sm:text-base">
            {d.contactsSubtitle}
          </p>
        </div>

        {/* 2-Column Split: Detailed info cards vs embedded iframe map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Info & Cards (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Address Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-lg flex gap-4 hover:border-[#D4A017] transition-all">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#F0F6FF] text-[#1A3A5C] shrink-0">
                  <MapPin size={24} className="text-[#8B1A1A]" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-slate-800 uppercase tracking-wide">
                    {d.contactAddress}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {d.contactAddressText}
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <a
                href={`tel:${d.phoneNum.replace(/\D/g, '')}`}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-lg flex gap-4 hover:border-[#D4A017] transition-all block group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FDF6E3] text-[#1A3A5C] shrink-0">
                  <Phone size={24} className="text-green-600 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-slate-800 uppercase tracking-wide">
                    {d.contactPhone}
                  </h4>
                  <p className="text-sm font-sans font-bold text-[#1A3A5C] mt-1 group-hover:text-[#8B1A1A] transition-colors">
                    {d.phoneNum}
                  </p>
                  <p className="text-[10px] text-[#D4A017] font-semibold mt-0.5">
                    {language === 'RU' ? 'Кликните, чтобы позвонить' : 'Чалуу үчүн басыңыз'}
                  </p>
                </div>
              </a>

              {/* Working Hours Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-lg flex gap-4 hover:border-[#D4A017] transition-all">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                  <Clock size={24} className="text-[#1A3A5C]" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-slate-800 uppercase tracking-wide">
                    {d.contactHours}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {d.contactHoursText}
                  </p>
                </div>
              </div>

            </div>

            {/* Social media connections button card */}
            <div className="bg-[#1A3A5C] text-white p-6 rounded-2xl border border-[#D4A017] shadow-xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4A017] block">
                {language === 'RU' ? 'Мы в социальных сетях' : 'Биз социалдык тармактарда'}
              </span>
              
              <div className="grid grid-cols-3 gap-2.5">
                
                {/* Instagram */}
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-tr from-purple-600 via-pink-600 to-yellow-500 hover:scale-105 transition-all text-white p-3 rounded-xl flex flex-col items-center gap-1.5 shadow-md font-sans text-[10px] font-bold"
                  id="connect-instagram-link"
                >
                  <Instagram size={18} />
                  <span>Instagram</span>
                </a>

                {/* Telegram */}
                <a
                  href={socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all text-white p-3 rounded-xl flex flex-col items-center gap-1.5 shadow-md font-sans text-[10px] font-bold"
                  id="connect-telegram-link"
                >
                  <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
                  <span>Telegram</span>
                </a>

                {/* WhatsApp */}
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-all text-white p-3 rounded-xl flex flex-col items-center gap-1.5 shadow-md font-sans text-[10px] font-bold"
                  id="connect-whatsapp-link"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp</span>
                </a>

              </div>
            </div>

          </div>

          {/* Column 2: Embedded Google Maps frame (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-white p-3 rounded-2xl border border-slate-200 shadow-xl min-h-[350px] flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 pl-1.5 flex items-center gap-1">
              <span>📍</span> {d.findUsOnMap}
            </span>
            <div className="flex-grow w-full h-full rounded-xl overflow-hidden border border-slate-200 relative min-h-[300px]">
              
              {/* Responsive Google Maps Iframe, pointing to Kara-Suu Osh Region Kyrgyzstan */}
              <iframe
                title="Kara-Suu Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48633.26760851897!2d72.84654904595232!3d40.697475133621484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bd90a424a1b02b%3A0xe6bf4ea6727cb347!2sKara-Suu%2C%20Kyrgyzstan!5e0!3m2!1sen!2skg!4v1718105000000!5m2!1sen!2skg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
