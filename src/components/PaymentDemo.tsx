import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, CreditCard, Check, AlertCircle, FileSpreadsheet, QrCode } from 'lucide-react';
import { Language, CartItem, Product } from '../types';
import { dictionaries } from '../dictionary';

interface PaymentDemoProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const PaymentDemo: React.FC<PaymentDemoProps> = ({
  language,
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const d = dictionaries[language];

  const [paymentMethod, setPaymentMethod] = useState<'mbank' | 'optima' | 'visa' | 'cash'>('mbank');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [checkoutErrors, setCheckoutErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState<any>(null);

  // Calculate pricing based on individual item wholesale threshold
  const subtotal = cartItems.reduce((sum, item) => {
    const isWholesale = item.product.isWholesaleAvailable && item.product.minWholesaleQty && item.quantity >= item.product.minWholesaleQty;
    const activePrice = isWholesale ? (item.product.wholesalePrice || item.product.price) : item.product.price;
    return sum + (activePrice * item.quantity);
  }, 0);

  const discountAmount = paymentMethod === 'mbank' ? Math.round(subtotal * 0.05) : 0; // 5% bonus discount for MBank!
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleValidate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) {
      errs.name = language === 'RU' ? 'Представьтесь, пожалуйста' : 'Атыңызды жазыңыз';
    }
    if (!customerPhone.trim()) {
      errs.phone = language === 'RU' ? 'Введите телефон для связи' : 'Телефон номериңизди жазыңыз';
    } else if (!/^\+?[0-9\s\-()]{9,16}$/.test(customerPhone)) {
      errs.phone = language === 'RU' ? 'Неверный формат телефона' : 'Телефон номери ката жазылды';
    }
    setCheckoutErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!handleValidate()) return;

    setIsProcessing(true);
    // Simulate transaction delay
    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderId = 'AT-' + Math.floor(100000 + Math.random() * 90000);
      setReceiptDetails({
        orderId: generatedOrderId,
        date: new Date().toLocaleDateString(language === 'RU' ? 'ru-RU' : 'ky-KG') + ' в ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        name: customerName,
        phone: customerPhone,
        items: [...cartItems],
        total: finalTotal,
        paymentType: paymentMethod,
        discount: discountAmount,
      });
      setShowReceipt(true);
      onClearCart();
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDF6E3] border-l-2 border-[#D4A017] shadow-2xl flex flex-col h-full relative text-[#1A3A5C]">
          
          {/* Header */}
          <div className="px-4 py-6 bg-[#1A3A5C] text-white flex items-center justify-between border-b-2 border-[#D4A017]">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#D4A017]" />
              <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight">
                {d.cart} ({cartItems.length})
              </h3>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full cursor-pointer"
              id="close-cart-drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Core scrollable content based on view state */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            
            {showReceipt ? (
              // ---------------- RECEIPT DEMO STATE ----------------
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-5 rounded-2xl border border-dashed border-slate-300 shadow-lg relative overflow-hidden font-mono text-xs text-slate-800 mt-2"
                id="receipt-printout"
              >
                {/* Decorative cut details */}
                <div className="absolute top-0 inset-x-0 h-1 flex justify-around">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <span key={i} className="w-2 h-2 bg-[#FDF6E3] rounded-full -mt-1 block shrink-0" />
                  ))}
                </div>

                <div className="text-center pt-4 mb-4 pb-4 border-b border-dashed border-slate-200">
                  <span className="font-serif text-base font-bold text-[#1A3A5C] block uppercase tracking-wider">
                    {d.brandName}
                  </span>
                  <p className="text-[10px] text-slate-500 font-sans font-medium mt-1">
                    Кыргызстан, Ош облусу, Кара-Суу району
                  </p>
                  <p className="text-[10px] text-slate-500 font-sans mt-0.5">
                    {d.contactHoursText}
                  </p>
                </div>

                <div className="space-y-1 mb-4 text-[11px]">
                  <p><strong>Чек/Заказ:</strong> {receiptDetails?.orderId}</p>
                  <p><strong>Дата/Убакыт:</strong> {receiptDetails?.date}</p>
                  <p><strong>Клиент:</strong> {receiptDetails?.name}</p>
                  <p><strong>Телефон:</strong> {receiptDetails?.phone}</p>
                  <p>
                    <strong>Способ оплаты: </strong> 
                    {receiptDetails?.paymentType === 'mbank' && '💵 MBank (Online)'}
                    {receiptDetails?.paymentType === 'optima' && '💵 Optima24 (Online)'}
                    {receiptDetails?.paymentType === 'visa' && '💳 VISA/Mastercard'}
                    {receiptDetails?.paymentType === 'cash' && '🚚 Наличными при получении'}
                  </p>
                </div>

                {/* Items loop */}
                <div className="border-t border-b border-dashed border-slate-300 py-3 mb-4 space-y-2">
                  {receiptDetails?.items.map((item: any) => {
                    const isWhol = item.product.isWholesaleAvailable && item.product.minWholesaleQty && item.quantity >= item.product.minWholesaleQty;
                    const price = isWhol ? item.product.wholesalePrice : item.product.price;
                    return (
                      <div key={item.product.id} className="flex justify-between items-start text-[11px]">
                        <span className="max-w-[180px] truncate">
                          {language === 'RU' ? item.product.nameRu : item.product.nameKg} {isWhol && '(ОПТ)'}
                        </span>
                        <span>
                          {item.quantity} x {price} = {item.quantity * price} {d.somSymbol}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className="space-y-1 text-right text-[11px] mb-6">
                  {receiptDetails?.discount > 0 && (
                    <p className="text-green-600">
                      Скидка MBank 5%: -{receiptDetails?.discount} {d.somSymbol}
                    </p>
                  )}
                  <p className="text-sm font-black text-[#1A3A5C]">
                    {d.total}: {receiptDetails?.total} {d.somSymbol}
                  </p>
                </div>

                {/* Kyrgyz Stamp "PAID / ТӨЛӨНДҮ" */}
                <div className="flex justify-center my-4 overflow-hidden">
                  <div className="border-4 border-double border-red-500 text-red-500 font-extrabold rotate-[-8deg] uppercase tracking-wider py-1.5 px-6 rounded text-sm text-center font-serif opacity-85 select-none">
                    <p>АЛА-ТОО АМИР</p>
                    <p className="text-xs font-sans font-bold">ОПЛАЧЕНО • ТӨЛӨНДҮ</p>
                  </div>
                </div>

                <div className="text-center text-slate-500 text-[10px] space-y-2 mt-4">
                  <p className="font-sans font-semibold">
                    {d.formSuccessMessage}
                  </p>
                  <button
                    onClick={() => {
                      setShowReceipt(false);
                      setReceiptDetails(null);
                      onClose();
                    }}
                    className="w-full mt-2 py-2.5 bg-[#1A3A5C] text-white hover:bg-slate-800 text-xs font-semibold rounded-lg font-sans transition-colors cursor-pointer"
                  >
                    {language === 'RU' ? 'Вернуться к сайту' : 'Башкы бетке кайтуу'}
                  </button>
                </div>
              </motion.div>
            ) : cartItems.length === 0 ? (
              // ---------------- EMPTY CART STATE ----------------
              <div className="text-center py-20 px-4 space-y-4" id="empty-cart-view">
                <ShoppingBag size={56} className="text-slate-300 mx-auto stroke-[1.5]" />
                <h4 className="font-serif text-lg font-bold text-slate-600">{d.emptyCart}</h4>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-[#D4A017] text-[#1A3A5C] font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md cursor-pointer"
                >
                  {language === 'RU' ? 'Перейти к покупкам' : 'Азыктарды көрүү'}
                </button>
              </div>
            ) : (
              // ---------------- FILLED CART & CHECKOUT FORM ----------------
              <div className="space-y-6" id="cart-items-list-container">
                
                {/* Cart Items List */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {language === 'RU' ? 'Выбранные продукты' : 'Тандалган азыктар'}
                  </span>
                  
                  {cartItems.map((item) => {
                    const isWholesaleActive = item.product.isWholesaleAvailable && item.product.minWholesaleQty && item.quantity >= item.product.minWholesaleQty;
                    const activePrice = isWholesaleActive ? (item.product.wholesalePrice || item.product.price) : item.product.price;
                    const remainingToWholesale = item.product.minWholesaleQty ? Math.max(0, item.product.minWholesaleQty - item.quantity) : 0;

                    return (
                      <div 
                        key={item.product.id} 
                        className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex gap-3 items-start relative overflow-hidden"
                      >
                        
                        {/* Tiny product thumb */}
                        <img 
                          src={item.product.image} 
                          alt={item.product.nameRu} 
                          className="w-14 h-14 object-cover rounded-lg border border-slate-100"
                        />
                        
                        {/* Item Details */}
                        <div className="flex-grow min-w-0">
                          <h4 className="font-serif text-sm font-bold text-[#1A3A5C] truncate">
                            {language === 'RU' ? item.product.nameRu : item.product.nameKg}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-sans font-medium mb-1.5 flex items-center justify-between">
                            <span>{language === 'RU' ? item.product.volumeRu : item.product.volumeKg}</span>
                            {isWholesaleActive && (
                              <span className="text-[10px] font-bold text-red-600 bg-red-50 py-0.5 px-1.5 rounded uppercase">
                                Дүң баа ({d.wholesaleBadge})
                              </span>
                            )}
                          </p>
                          
                          {/* Price & Quantity Controls Row */}
                          <div className="flex items-center justify-between">
                            
                            {/* Quantity buttons */}
                            <div className="flex items-center bg-slate-100 rounded-sm p-0.5 border border-slate-200">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 text-slate-500 hover:text-[#1A3A5C]"
                                aria-label="Subtract item"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-[#1A3A5C]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 text-slate-500 hover:text-[#1A3A5C]"
                                aria-label="Add item"
                              >
                                <Plus size={10} />
                              </button>
                            </div>

                            {/* Total calculated price for row */}
                            <div className="text-right">
                              <span className="text-sm font-bold text-[#1A3A5C]">
                                {activePrice * item.quantity} {d.somSymbol}
                              </span>
                            </div>

                          </div>

                          {/* Wholesale mini alert widget inside item */}
                          {!isWholesaleActive && item.product.isWholesaleAvailable && remainingToWholesale > 0 && (
                            <div className="text-[9px] text-amber-700 bg-amber-50 rounded mt-1.5 p-1 font-sans text-center border border-amber-100/50">
                              {language === 'RU' 
                                ? `Добавьте ${remainingToWholesale} шт., чтобы включить Опт!` 
                                : `Дүң баа алуу үчүн дагы ${remainingToWholesale} шт. кошуңуз!`}
                            </div>
                          )}

                        </div>

                        {/* Remove item button */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-300 hover:text-red-500 shrink-0 p-1 cursor-pointer absolute top-2 right-2 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>

                      </div>
                    );
                  })}
                </div>

                {/* ONLINE PAYMENT SYSTEM PLACEHOLDER */}
                <div className="border-t border-slate-200 pt-4" id="checkout-payment-box">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    {language === 'RU' ? 'Оплата Онлайн' : 'Кабыл алынган онлайн төлөмдөр'}
                  </span>
                  
                  {/* Payment selector buttons with authentic icons */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    
                    {/* MBank */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mbank')}
                      className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        paymentMethod === 'mbank'
                          ? 'border-[3px] border-green-500 bg-green-50 text-green-950 font-bold'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                      id="opt-pay-mbank"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-black text-xs">
                        MB
                      </div>
                      <span className="text-[10px] leading-tight text-center">{d.paymentMbank}</span>
                      <span className="text-[8px] bg-green-600 text-white px-1 py-0.2 rounded font-sans uppercase">Бонус -5%</span>
                    </button>

                    {/* Optima Bank */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('optima')}
                      className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        paymentMethod === 'optima'
                          ? 'border-[3px] border-[#8B1A1A] bg-red-50 text-[#8B1A1A] font-bold'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                      id="opt-pay-optima"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#8B1A1A] text-white flex items-center justify-center font-bold text-[9px]">
                        O24
                      </div>
                      <span className="text-[10px] leading-tight text-center">{d.paymentOptima}</span>
                    </button>

                    {/* VISA */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('visa')}
                      className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        paymentMethod === 'visa'
                          ? 'border-[3px] border-blue-600 bg-blue-50 text-blue-900 font-bold'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                      id="opt-pay-visa"
                    >
                      <CreditCard size={20} className="text-blue-600 stroke-[2]" />
                      <span className="text-[10px] leading-tight text-center">{d.paymentVisa}</span>
                    </button>

                    {/* Cash */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        paymentMethod === 'cash'
                          ? 'border-[3px] border-[#D4A017] bg-amber-50 text-amber-900 font-bold'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                      id="opt-pay-cash"
                    >
                      <span className="text-base">🚚</span>
                      <span className="text-[10px] leading-tight text-center">{d.paymentCash}</span>
                    </button>

                  </div>

                  {/* Payment detail advice */}
                  <div className="bg-[#1A3A5C]/5 p-3 rounded-lg text-[10px] text-slate-600 flex items-start gap-2 border border-[#1A3A5C]/10 mb-4">
                    <AlertCircle size={14} className="text-[#8B1A1A] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#1A3A5C]">
                        {paymentMethod === 'mbank' && 'Оплата через MBank:'}
                        {paymentMethod === 'optima' && 'Оплата через Optima24:'}
                        {paymentMethod === 'visa' && 'Оплата картой Visa/Mastercard:'}
                        {paymentMethod === 'cash' && 'Доставка курьером:'}
                      </p>
                      <p className="mt-0.5 leading-snug">
                        {paymentMethod === 'mbank' && 'Получите дополнительную скидку 5%! Оплата произойдет мгновенно при выставлении счета на ваш номер.'}
                        {paymentMethod === 'optima' && 'Перевод на кошелек Оптима Банка. Чек подтверждения будет переслан на ваш телефон.'}
                        {paymentMethod === 'visa' && 'Поддерживаются карты Elcart, Visa любого банка КР. Без комиссий.'}
                        {paymentMethod === 'cash' && 'Оплата при получении товара курьеру в Оше, Бишкеке или Кара-Суу после проверки.'}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Client Details fields form */}
                <form onSubmit={handleCheckoutSubmit} className="space-y-3.5 border-t border-slate-200 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    {language === 'RU' ? 'Данные доставки' : 'Жеткирүү маалыматы'}
                  </span>

                  {/* Full Name */}
                  <div>
                    <input
                      type="text"
                      className={`w-full bg-white text-sm py-2.5 px-3 rounded-lg border focus:outline-none transition-all ${
                        checkoutErrors.name ? 'border-red-500' : 'border-slate-300 focus:border-[#D4A017]'
                      }`}
                      placeholder={language === 'RU' ? 'Ваше ФИО' : 'Аты-жөнүңүз'}
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (checkoutErrors.name) setCheckoutErrors(prev => ({ ...prev, name: '' }));
                      }}
                      id="checkout-name"
                    />
                    {checkoutErrors.name && (
                      <p className="text-red-500 text-[10px] mt-1">{checkoutErrors.name}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <input
                      type="tel"
                      className={`w-full bg-white text-sm py-2.5 px-3 rounded-lg border focus:outline-none transition-all ${
                        checkoutErrors.phone ? 'border-red-500' : 'border-slate-300 focus:border-[#D4A017]'
                      }`}
                      placeholder={language === 'RU' ? 'Телефон (например +996...)' : 'Телефон номериңиз (+996...)'}
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value);
                        if (checkoutErrors.phone) setCheckoutErrors(prev => ({ ...prev, phone: '' }));
                      }}
                      id="checkout-phone"
                    />
                    {checkoutErrors.phone && (
                      <p className="text-red-500 text-[10px] mt-1">{checkoutErrors.phone}</p>
                    )}
                  </div>

                  {/* Summary Totals Sheet Block */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>{d.subtotal}:</span>
                      <span>{subtotal} {d.somSymbol}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-green-600 font-bold">
                        <span>Бонус скидка MBank (5%):</span>
                        <span>-{discountAmount} {d.somSymbol}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-serif text-sm font-bold border-t border-slate-100 pt-1.5 text-[#1A3A5C]">
                      <span>{d.total}:</span>
                      <span>{finalTotal} {d.somSymbol}</span>
                    </div>
                  </div>

                  {/* Submit checkout payment button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 rounded-xl bg-[#8B1A1A] hover:bg-[#8B1A1A]/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    id="submit-payment-checkout"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                        <span>{language === 'RU' ? 'Обработка транзакции...' : 'Төлөм текшерилүүдө...'}</span>
                      </>
                    ) : (
                      <>
                        <Check size={14} className="stroke-[3]" />
                        <span>{d.paymentSubmit}</span>
                      </>
                    )}
                  </button>
                </form>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
