import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Award, Compass, Heart, FileCheck, ShieldCheck, Eye, X, FileText, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { dictionaries } from '../dictionary';
import { TundukIcon, KyrgyzOrnamentBorder } from './OrnamentDesigns';

interface AboutUsProps {
  language: Language;
}

interface Certificate {
  id: string;
  titleRu: string;
  titleKg: string;
  issuerRu: string;
  issuerKg: string;
  number: string;
  dateRu: string;
  dateKg: string;
  statusRu: string;
  statusKg: string;
  detailsRu: string;
  detailsKg: string;
}

const certificates: Certificate[] = [
  {
    id: 'halal',
    titleRu: 'Сертификат «Халяль» (Адал)',
    titleKg: '«Халал» (Адал) сертификаты',
    issuerRu: 'Центр развития халяль-индустрии Кыргызской Республики',
    issuerKg: 'Кыргыз Республикасынын Халал демилгелерин колдоо борбору',
    number: '№ HALAL-KG-0943',
    dateRu: 'Действует до 12.01.2028',
    dateKg: 'Жарактуулук мөөнөтү: 12.01.2028-ж. чейин',
    statusRu: 'Действующий',
    statusKg: 'Кабыл алынган / Жигердүү',
    detailsRu: 'Подтверждает полное соответствие производственных процессов, сырья и готовой продукции исламским стандартам чистоты и халяльности.',
    detailsKg: 'Сүт азыктарын даярдоо технологиясы, чийки заттар жана даяр өнүмдөрдүн баары толук тазалыкты жана шарият талаптарын сактаганын тастыктайт.'
  },
  {
    id: 'eac',
    titleRu: 'Декларация о соответствии ЕАС',
    titleKg: 'ЕАС шайкештик декларациясы',
    issuerRu: 'Евразийский Экономический Союз (Реестр ЕАЭС)',
    issuerKg: 'Евразиялык Экономикалык Биримдик (ЕАЭБ реестри)',
    number: '№ KG-042/08.Д.001928',
    dateRu: 'Действует до 24.11.2028',
    dateKg: 'Жарактуулук мөөнөтү: 24.11.2028-ж. чейин',
    statusRu: 'Зарегистрировано в реестре',
    statusKg: 'Реестрде катталган',
    detailsRu: 'Свидетельствует о соответствии молочной продукции техническим регламентам Таможенного союза ТР ТС 033/2013 «О безопасности молока и молочной продукции».',
    detailsKg: 'Сүт азыктарынын Салыктык Биримдиктин ТР ТС 033/2013 «Сүт жана сүт азыктарынын коопсуздугу жөнүндө» техникалык регламентине шайкештигин кепилдейт.'
  },
  {
    id: 'license',
    titleRu: 'Государственная Лицензия',
    titleKg: 'Мамлекеттик Лицензия',
    issuerRu: 'Министерство сельского хозяйства и пищевой промышленности КР',
    issuerKg: 'КР Айыл чарба жана тамак-аш өнөр жай министрлиги',
    number: 'Лицензия № 04231-МП',
    dateRu: 'Бессрочная лицензия',
    dateKg: 'Мөөнөтсүз берилген',
    statusRu: 'Официальный статус',
    statusKg: 'Расмий уруксат кабыл алынган',
    detailsRu: 'Официальное разрешение на промышленную переработку молока, производство и реализацию традиционной молочной продукции.',
    detailsKg: 'Кыргыз Республикасынын аймагында жана экспортко сүт азыктарын өндүрүү жана дүң-чек сатуу иш-аракеттерин жүргүзүүгө расмий мамлекеттик уруксат.'
  },
  {
    id: 'sanitary',
    titleRu: 'Санитарно-эпидемиологическое заключение',
    titleKg: 'Санитардык-эпидемиологиялык корутунду',
    issuerRu: 'Департамент госсанэпиднадзора Министерства Здравоохранения КР',
    issuerKg: 'КР Саламаттык сактоо министрлигинин Мамлекеттик санэпидкөзөмөл департаменти',
    number: '№ 22.09.04.000.Т.00125',
    dateRu: 'Выдано: 18.05.2026',
    dateKg: 'Берилген күнү: 18.05.2026-ж.',
    statusRu: 'Соответствует нормам',
    statusKg: 'Баардык ченемдерге жооп берет',
    detailsRu: 'Подтверждает соответствие производственных цехов в Кара-Суу всем жестким санитарно-гигиеническим стандартам и требованиям пищевой безопасности.',
    detailsKg: 'Кара-Суудагы өндүрүш цехтеринин жана шаймандарынын тазалык, санитардык-гигиеналык стандарттарга жана коопсуздукка толук жооп берерин күбөлөндүрөт.'
  }
];

export const AboutUs: React.FC<AboutUsProps> = ({ language }) => {
  const d = dictionaries[language];
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="about" className="py-20 bg-[#FDF6E3] text-[#1A3A5C] relative overflow-hidden">
      {/* Repeating Ornament strip at top to lock in style */}
      <KyrgyzOrnamentBorder className="bg-[#8B1A1A]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
        
        {/* Header Title Grid */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TundukIcon size={28} className="text-[#8B1A1A]" />
            <span className="text-[#8B1A1A] font-extrabold text-xs uppercase tracking-widest">{d.aboutUs}</span>
            <TundukIcon size={28} className="text-[#8B1A1A]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A3A5C] mb-4">
            {d.aboutSubtitle}
          </h2>
          <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full" />
        </div>

        {/* Story content section split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-center mb-20">
          
          {/* Text block */}
          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-700">
            <h3 className="font-serif text-2xl font-bold text-[#8B1A1A] mb-4">
              {d.aboutTitle}
            </h3>
            
            <p className="font-sans">
              {d.aboutTextParagraph1}
            </p>

            <blockquote className="border-l-4 border-[#8B1A1A] pl-4 py-1 italic font-serif text-[#1A3A5C] bg-[#F0F6FF]/60 p-4 rounded-r-xl">
              {language === 'RU'
                ? '«Молоко, взятое у самой природы, превращается в здоровье вашей семьи через теплоту наших рук».'
                : '«Ала-Тоонун накта керемети болгон сүт даамы — колубуздун жылуулугу аркылуу Сиздин үй-бүлөңүздүн ден соолугуна айланат».'}
            </blockquote>

            <p className="font-sans">
              {d.aboutTextParagraph2}
            </p>

            <p className="font-sans font-semibold text-[#1A3A5C]">
              {d.aboutTextParagraph3}
            </p>
          </div>

          {/* Graphical/Photo frame block */}
          <div className="relative group">
            {/* Soft decorative golden back boundary frame */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#D4A017] to-[#8B1A1A] opacity-25 blur-lg group-hover:opacity-40 transition duration-1000" />
            
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl p-3 border border-slate-200">
              <img
                src="/src/assets/images/kyrgyz_dairy_products_1781253983506.jpg"
                alt="Kyrgyz Traditional Table with Kurut and butter"
                className="w-full h-auto rounded-xl object-cover aspect-[4/3] shadow-md"
                referrerPolicy="no-referrer"
              />
              {/* Tunduk overlay badge directly on photo */}
              <div className="absolute bottom-6 right-6 bg-[#FDF6E3] p-3 rounded-full border border-[#D4A017] shadow-xl flex items-center justify-center">
                <TundukIcon size={44} className="text-[#8B1A1A]" />
              </div>
            </div>

            {/* Minor family quote card */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-[#8B1A1A] text-[#FDF6E3] p-4 rounded-xl shadow-lg border border-[#D4A017] max-w-[240px] hidden sm:block">
              <div className="flex gap-2 items-start">
                <Heart size={16} className="text-[#D4A017] shrink-0 fill-current mt-0.5" />
                <p className="text-xs font-serif leading-tight">
                  {language === 'RU'
                    ? 'Три поколения мастеров в Кара-Суу'
                    : 'Кара-Суу куттуу жеринде үч муун өткөн чеберлик'}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 3-Column Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-slate-200">
          
          {/* Card 1: 100% natural */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md text-center hover:scale-[1.02] transition-transform">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#F0F6FF] text-[#1A3A5C] mb-5 border border-slate-100">
              <Leaf size={24} className="text-green-600" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#1A3A5C] mb-2">{d.valueNatural}</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{d.valueNaturalDesc}</p>
          </div>

          {/* Card 2: Traditional Recipes */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md text-center hover:scale-[1.02] transition-transform">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FDF6E3] text-[#8B1A1A] mb-5 border border-[#D4A017]/30">
              <Compass size={24} className="text-[#8B1A1A]" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#8B1A1A] mb-2">{d.valueTraditional}</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{d.valueTraditionalDesc}</p>
          </div>

          {/* Card 3: Freshness Guarantee */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md text-center hover:scale-[1.02] transition-transform">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1A3A5C]/5 text-[#1A3A5C] mb-5 border border-slate-100">
              <Award size={24} className="text-[#D4A017]" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#1A3A5C] mb-2">{d.valueQuality}</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{d.valueQualityDesc}</p>
          </div>

        </div>

        {/* Licenses & Certificates Section */}
        <div className="mt-24 pt-16 border-t border-slate-200" id="licenses-and-certificates">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A3A5C] mb-3">
              {language === 'RU' ? 'Лицензии и Сертификаты' : 'Лицензиялар жана Сертификаттар'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'RU' 
                ? 'Вся наша продукция сертифицирована в соответствии со стандартами качества Кыргызской Республики и ЕАЭС. Мы гарантируем 100% экологическую чистоту.' 
                : 'Биздин баардык өнүмдөр Кыргыз Республикасынын жана ЕАЭБдин сапат стандарттарына толук жооп берет. Биз 100% экологиялык тазалыкка кепилдик беребиз.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="certificates-grid">
            {certificates.map((cert) => (
              <div 
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="bg-white rounded-2xl p-5 border border-[#D4A017]/25 hover:border-[#8B1A1A] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group relative flex flex-col justify-between"
                id={`cert-card-${cert.id}`}
              >
                {/* Decorative Kyrgyz Ribbon on card border */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8B1A1A] via-[#D4A017] to-[#8B1A1A] rounded-t-2xl" />
                
                <div>
                  <div className="flex justify-between items-start mb-4 mt-2">
                    <span className="p-2.5 rounded-xl bg-[#FDF6E3] text-[#8B1A1A] group-hover:bg-[#8B1A1A] group-hover:text-white transition-colors duration-300">
                      {cert.id === 'halal' ? (
                        <ShieldCheck size={22} />
                      ) : cert.id === 'eac' ? (
                        <FileCheck size={22} />
                      ) : cert.id === 'license' ? (
                        <Award size={22} />
                      ) : (
                        <FileText size={22} />
                      )}
                    </span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                      {language === 'RU' ? 'Активен' : 'Жигердүү'}
                    </span>
                  </div>

                  <h4 className="font-serif text-sm font-bold text-[#1A3A5C] group-hover:text-[#8B1A1A] transition-colors duration-300 leading-snug line-clamp-2">
                    {language === 'RU' ? cert.titleRu : cert.titleKg}
                  </h4>
                  
                  <p className="text-[11px] text-slate-505 mt-2 line-clamp-3 leading-relaxed">
                    {language === 'RU' ? cert.detailsRu : cert.detailsKg}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-400">
                    {cert.number}
                  </span>
                  <span className="text-[11px] font-bold text-[#8B1A1A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {language === 'RU' ? 'Открыть' : 'Көрүү'}
                    <Eye size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Lightbox Modal with official-looking certificate replica */}
        <AnimatePresence>
          {selectedCert && (
            <div className="fixed inset-0 bg-[#1A3A5C]/80 backdrop-blur-md z-50 flex items-center justify-center p-4" id="certificate-lightbox-overlay" onClick={() => setSelectedCert(null)}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-[#D4A017] relative"
                onClick={(e) => e.stopPropagation()}
                id="certificate-lightbox-modal"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/85 text-slate-700 hover:bg-[#8B1A1A] hover:text-white transition-colors cursor-pointer border border-slate-200 shadow-md z-10"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                {/* Certificate Visual Body */}
                <div className="p-8 sm:p-10 bg-[#FAF6EA] relative border-8 border-white overflow-hidden">
                  
                  {/* Outer Kyrgyz Ornament Gold Grid Line */}
                  <div className="absolute inset-2 border-2 border-dashed border-[#D4A017]/40 pointer-events-none rounded-xl" />
                  
                  {/* Subtle watermarked Tunduk in central background */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none text-[#8B1A1A]">
                    <TundukIcon size={380} />
                  </div>

                  <div className="text-center relative z-10 space-y-4">
                    {/* Official-looking header banner */}
                    <div className="flex flex-col items-center gap-1">
                      <TundukIcon size={46} className="text-[#8B1A1A]" />
                      <div className="text-[10px] font-serif tracking-[0.2em] text-[#8B1A1A] uppercase font-bold sm:block hidden">
                        Кыргыз Республикасы ◆ Сүт азыктарын көзөмөлдөө
                      </div>
                      <div className="text-[8px] font-sans tracking-widest text-[#1A3A5C] uppercase">
                        {language === 'RU' ? 'Официальный реестр сертификации' : 'Расмий тастыктоо реестри'}
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4A017]/50 to-transparent my-2" />

                    {/* Big Certificate Title */}
                    <div className="space-y-1">
                      <h4 className="font-serif text-[#8B1A1A] text-xs sm:text-sm font-bold uppercase tracking-widest">
                        {language === 'RU' ? 'Документ о соответствии' : 'Шайкештик жөнүндө күбөлүк'}
                      </h4>
                      <h3 className="font-serif text-lg sm:text-xl font-extrabold text-[#1A3A5C] leading-snug">
                        {language === 'RU' ? selectedCert.titleRu : selectedCert.titleKg}
                      </h3>
                      <p className="font-mono text-xs font-bold text-[#D4A017] uppercase tracking-wider mt-1">
                        {selectedCert.number}
                      </p>
                    </div>

                    {/* Issuer details */}
                    <div className="space-y-2 max-w-lg mx-auto bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-[#D4A017]/20 shadow-inner">
                      <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        {language === 'RU' ? 'Орган, выдавший сертификат:' : 'Тастыктоочу орган:'}
                      </div>
                      <p className="font-serif text-xs font-bold text-[#1A3A5C] leading-snug">
                        {language === 'RU' ? selectedCert.issuerRu : selectedCert.issuerKg}
                      </p>
                    </div>

                    {/* Main certificate description content */}
                    <div className="text-xs text-slate-700 leading-relaxed max-w-lg mx-auto text-center px-4">
                      {language === 'RU' ? selectedCert.detailsRu : selectedCert.detailsKg}
                    </div>

                    {/* Meta info: Date & Status */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-lg mx-auto pt-4 border-t border-[#D4A017]/30 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 font-sans">
                        <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                        <span className="font-medium text-slate-800">
                          {language === 'RU' ? selectedCert.statusRu : selectedCert.statusKg}
                        </span>
                      </div>
                      <div className="font-sans font-medium text-[#8B1A1A]">
                        {language === 'RU' ? selectedCert.dateRu : selectedCert.dateKg}
                      </div>
                    </div>

                    {/* Footer stamps / Verification */}
                    <div className="flex items-center justify-between pt-6 max-w-lg mx-auto">
                      {/* Round Official Blue Wax Seal Stamp */}
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-16 rounded-full border-4 border-dashed border-blue-600/60 bg-blue-50 flex items-center justify-center relative rotate-[-12deg] shadow-md select-none">
                          <div className="absolute inset-1 rounded-full border border-blue-600 text-blue-600 flex flex-col items-center justify-center p-1 text-[5px] font-bold text-center leading-[6px] uppercase font-sans">
                            <span className="text-[4px]">★ АЛА-ТОО ★</span>
                            <span>АМИР</span>
                            <span>ӨНДҮРҮШҮ</span>
                          </div>
                        </div>
                        <div className="text-left text-[9px] text-slate-600 font-sans leading-tight">
                          <p className="font-bold text-slate-700">{language === 'RU' ? 'Подпись председателя' : 'Кол коюучу өкүл'}</p>
                          <p className="italic font-bold">Амирбеков К. А.</p>
                          <p className="text-[8px] text-slate-400">г. Кара-Суу, КР</p>
                        </div>
                      </div>

                      {/* Mock QR Code verification */}
                      <div className="flex flex-col items-center gap-1 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                        <div className="w-12 h-12 flex flex-col gap-1 justify-between select-none">
                          <div className="flex justify-between h-3">
                            <span className="w-3 h-3 bg-slate-800 rounded-[1.5px]" />
                            <span className="w-1.5 h-1 bg-slate-800" />
                            <span className="w-3 h-3 bg-slate-800 rounded-[1.5px]" />
                          </div>
                          <div className="flex justify-between items-center h-2.5">
                            <span className="w-2 h-1.5 bg-slate-800" />
                            <span className="w-4 h-2 bg-slate-800" />
                            <span className="w-2 h-1 bg-slate-800" />
                          </div>
                          <div className="flex justify-between h-3">
                            <span className="w-3 h-3 bg-slate-800 rounded-[1.5px]" />
                            <span className="w-2.5 h-2 bg-slate-850" />
                            <span className="w-2 h-1.5 bg-slate-800" />
                          </div>
                        </div>
                        <span className="text-[7px] font-mono text-slate-400 uppercase tracking-widest leading-none">VERIFIED</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer close option */}
                <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => setSelectedCert(null)}
                    className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-200 hover:bg-[#8B1A1A] hover:text-white text-slate-700 transition-colors shadow-sm cursor-pointer"
                  >
                    {language === 'RU' ? 'Закрыть окно' : 'Жабуу'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
