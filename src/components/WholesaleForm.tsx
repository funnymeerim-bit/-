import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Mail, Building2, User2, NotepadText, Navigation, CheckCircle2, TrendingUp, Truck, ShieldCheck } from 'lucide-react';
import { Language, WholesaleInquiry } from '../types';
import { dictionaries } from '../dictionary';
import { TundukIcon } from './OrnamentDesigns';

interface WholesaleFormProps {
  language: Language;
}

export const WholesaleForm: React.FC<WholesaleFormProps> = ({ language }) => {
  const d = dictionaries[language];
  const [formData, setFormData] = useState<WholesaleInquiry>({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    productInterest: '',
    quantity: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const productOptions = language === 'RU' 
    ? ['Курут Классический', 'Шербет сливочный/травяной', 'Ала-Тоо Сары Май', 'Айран Домашний', 'Густой Каймак', 'Кымыз Тоолук', 'Другая молочная продукция (Опт)']
    : ['Колго жасалган Салттуу Курут', 'Сүттүү Шербет', 'Ала-Тоо Сары Майы', 'Тоолук Коюу Айран', 'Накта Тоолук Каймак', 'Бийик Тоо Кымызы', 'Башка сүт азыктары'];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.companyName.trim()) newErrors.companyName = language === 'RU' ? 'Введите название компании' : 'Ишкананын аталышын жазыңыз';
    if (!formData.contactName.trim()) newErrors.contactName = language === 'RU' ? 'Как к вам обращаться?' : 'Байланышуучу адамдын аты';
    if (!formData.phone.trim()) {
      newErrors.phone = language === 'RU' ? 'Введите номер телефона' : 'Телефон номерин жазыңыз';
    } else if (!/^\+?[0-9\s\-()]{9,16}$/.test(formData.phone)) {
      newErrors.phone = language === 'RU' ? 'Некорректный формат телефона' : 'Телефон номери ката жазылды';
    }
    
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'RU' ? 'Некорректный email' : 'Электрондук почта туура эмес';
    }
    if (!formData.productInterest) newErrors.productInterest = language === 'RU' ? 'Выберите продукт' : 'Тиешелүү азыкты тандаңыз';
    if (!formData.quantity.trim()) newErrors.quantity = language === 'RU' ? 'Укажите планируемый объем' : 'Болжолдуу көлөмдү жазыңыз';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        companyName: '',
        contactName: '',
        phone: '',
        email: '',
        productInterest: '',
        quantity: '',
        message: '',
      });
    }, 1500);
  };

  const handleWhatsAppRedirect = () => {
    const whatsappText = encodeURIComponent(
      language === 'RU'
        ? 'Здравствуйте! Я интересуюсь оптовым заказом традиционной молочной продукции Ала-Тоо Амир из Кара-Суу.'
        : 'Саламатсызбы! Ала-Тоо Амир өндүрүшүнүн сүт азыктарын дүңүнөн сатып алуу боюнча суранычым бар эле.'
    );
    window.open(`https://wa.me/996772458899?text=${whatsappText}`, '_blank');
  };

  return (
    <section id="wholesale" className="py-20 bg-[#1A3A5C] text-white relative overflow-hidden">
      {/* Decorative background tunduk and ornament */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4A017] z-10" />
      <div className="absolute right-0 top-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TundukIcon size={30} className="text-[#D4A017]" />
            <span className="text-[#D4A017] font-bold text-xs uppercase tracking-widest">{d.forWholesalers}</span>
            <TundukIcon size={30} className="text-[#D4A017]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDF6E3] mb-4">
            {d.wholesaleTitle}
          </h2>
          <p className="font-sans text-slate-300 text-sm sm:text-base">
            {d.wholesaleSubtitle}
          </p>
        </div>

        {/* 2-Column Split: Benefits vs Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Benefits List (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-[#122A44] border-l-4 border-[#D4A017] p-6 rounded-r-xl shadow-lg">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#D4A017] mb-3">
                {language === 'RU' ? 'Почему мы?' : 'Эмне үчүн бизди тандашат?'}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {language === 'RU' 
                  ? '«Ала-Тоо Амир» производит молочную продукцию высокого качества со всеми сертификатами соответствия и лабораторным контролем.' 
                  : '«Ала-Тоо Амир» сүт азыктары толук баардык сапат күбөлүгүнө ээ жана заманбап лабораториянын көзөмөлүндө таза даярдалат.'}
              </p>
            </div>

            {/* Benefit Card item 1 */}
            <div className="flex gap-4">
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4A017] text-[#1A3A5C]">
                <TrendingUp size={24} className="stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#FDF6E3]">{d.wholesaleBenefit1}</h4>
                <p className="text-sm text-slate-300 leading-relaxed mt-1">{d.wholesaleBenefit1Desc}</p>
              </div>
            </div>

            {/* Benefit Card item 2 */}
            <div className="flex gap-4">
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#8B1A1A] text-white">
                <Truck size={24} className="stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#FDF6E3]">{d.wholesaleBenefit2}</h4>
                <p className="text-sm text-slate-300 leading-relaxed mt-1">{d.wholesaleBenefit2Desc}</p>
              </div>
            </div>

            {/* Benefit Card item 3 */}
            <div className="flex gap-4">
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#FDF6E3] text-[#1A3A5C]">
                <ShieldCheck size={24} className="stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#FDF6E3]">{d.wholesaleBenefit3}</h4>
                <p className="text-sm text-slate-300 leading-relaxed mt-1">{d.wholesaleBenefit3Desc}</p>
              </div>
            </div>

            {/* Direct WhatsApp Call manager Button */}
            <div className="pt-4 border-t border-slate-700/60">
              <p className="text-slate-300 text-xs font-sans mb-3 font-semibold">
                {language === 'RU' ? 'Есть срочный вопрос? Свяжитесь напрямую:' : 'Шашылыш сурооңуз барбы? Түз байланышыңыз:'}
              </p>
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full sm:w-auto px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm"
                id="wholesale-whatsapp-trigger"
              >
                <MessageSquare className="animate-bounce" size={16} />
                <span>{d.contactManager}</span>
              </button>
            </div>

          </div>

          {/* Column 2: Inquiry Interactive Form (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#122A44] p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-2xl relative">
            
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 px-4"
                  id="wholesale-form-success"
                >
                  <CheckCircle2 size={64} className="text-[#D4A017] mx-auto mb-6" />
                  <h3 className="font-serif text-2xl font-bold text-[#FDF6E3] mb-4">
                    {language === 'RU' ? 'Заявка принята!' : 'Кабыл алынды!'}
                  </h3>
                  <p className="font-sans text-slate-300 text-sm leading-relaxed mb-6">
                    {d.formSuccessMessage}
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-6 py-2.5 bg-slate-800 text-xs border border-slate-600 rounded-lg text-slate-300 hover:text-white transition-all cursor-pointer"
                  >
                    {language === 'RU' ? 'Отправить еще одну' : 'Жаңы сурам баштоо'}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmitInquiry}
                  className="space-y-4"
                  id="wholesale-inquiry-form"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Company Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5 label-company">
                        <Building2 size={12} className="text-[#D4A017]" />
                        {d.formCompanyName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className={`w-full bg-[#1A3A5C] text-white placeholder-slate-500 text-sm py-2.5 px-3 rounded-lg border focus:outline-none transition-all ${
                          errors.companyName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-600 focus:border-[#D4A017]'
                        }`}
                        placeholder={language === 'RU' ? 'ОсОО "Ала-Тоо Опт"' : 'ЖЧК "Береке"'}
                        id="form-company"
                      />
                      {errors.companyName && <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.companyName}</p>}
                    </div>

                    {/* Contact Person */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                        <User2 size={12} className="text-[#D4A017]" />
                        {d.formContactName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        className={`w-full bg-[#1A3A5C] text-white placeholder-slate-500 text-sm py-2.5 px-3 rounded-lg border focus:outline-none transition-all ${
                          errors.contactName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-600 focus:border-[#D4A017]'
                        }`}
                        placeholder={language === 'RU' ? 'Аскар Асанов' : 'Ариет Касымов'}
                        id="form-contact"
                      />
                      {errors.contactName && <p className="text-red-500 text-[10px] mt-1">{errors.contactName}</p>}
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                        <MessageSquare size={12} className="text-[#D4A017]" />
                        {d.formPhone} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full bg-[#1A3A5C] text-white placeholder-slate-500 text-sm py-2.5 px-3 rounded-lg border focus:outline-none transition-all ${
                          errors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-600 focus:border-[#D4A017]'
                        }`}
                        placeholder="+996 (555) 12-34-56"
                        id="form-phone"
                      />
                      {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                        <Mail size={12} className="text-[#D4A017]" />
                        {d.formEmail}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-[#1A3A5C] text-white placeholder-slate-500 text-sm py-2.5 px-3 rounded-lg border focus:outline-none transition-all ${
                          errors.email ? 'border-red-500' : 'border-slate-600 focus:border-[#D4A017]'
                        }`}
                        placeholder="opt@example.kg"
                        id="form-email"
                      />
                      {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Product of interest */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                        <NotepadText size={12} className="text-[#D4A017]" />
                        {d.formProductInterest} <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="productInterest"
                        value={formData.productInterest}
                        onChange={handleInputChange}
                        className={`w-full bg-[#1A3A5C] text-white text-sm py-2.5 px-3 rounded-lg border focus:outline-none transition-all ${
                          errors.productInterest ? 'border-red-500' : 'border-slate-600 focus:border-[#D4A017]'
                        }`}
                        id="form-product-select"
                      >
                        <option value="">
                          {language === 'RU' ? '-- Выберите товар --' : '-- Продукту тандаңыз --'}
                        </option>
                        {productOptions.map((opt, id) => (
                          <option key={id} value={opt} className="bg-[#1A3A5C] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.productInterest && <p className="text-red-500 text-[10px] mt-1">{errors.productInterest}</p>}
                    </div>

                    {/* Quantity volume requirement */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                        <Navigation size={12} className="text-[#D4A017]" />
                        {d.formQuantity} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className={`w-full bg-[#1A3A5C] text-white placeholder-slate-500 text-sm py-2.5 px-3 rounded-lg border focus:outline-none transition-all ${
                          errors.quantity ? 'border-red-500' : 'border-slate-600 focus:border-[#D4A017]'
                        }`}
                        placeholder={language === 'RU' ? 'Например, 50 кг в неделю' : 'Жумасына 100 литр сыяктуу'}
                        id="form-qty"
                      />
                      {errors.quantity && <p className="text-red-500 text-[10px] mt-1">{errors.quantity}</p>}
                    </div>

                  </div>

                  {/* Message comment */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {d.formMessage}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-[#1A3A5C] text-white placeholder-slate-500 text-sm py-2.5 px-3 rounded-lg border border-slate-600 focus:border-[#D4A017] focus:outline-none transition-all resize-none"
                      placeholder={language === 'RU' ? 'Ваши особые пожелания к упаковке или доставке...' : 'Таңгактоо же жеткирүү сунуштарыңыз...'}
                      id="form-message"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 bg-[#D4A017] hover:bg-[#D4A017]/90 text-[#1A3A5C] font-extrabold uppercase text-xs tracking-widest rounded-xl transition-all shadow-xl hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      id="form-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          <span>{language === 'RU' ? 'Отправка...' : 'Жөнөтүлүүдө...'}</span>
                        </>
                      ) : (
                        <span>{d.formSubmit}</span>
                      )}
                    </button>
                  </div>

                </motion.form>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
