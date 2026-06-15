import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Plus, Minus, Flame, Star, ShoppingBag, Percent } from 'lucide-react';
import { Product, Language, ProductType } from '../types';
import { productsData } from '../productsData';
import { dictionaries } from '../dictionary';
import { TundukIcon } from './OrnamentDesigns';

interface ProductsCatalogProps {
  language: Language;
  onAddToCart: (product: Product, quantity: number, isWholesale: boolean) => void;
}

export const ProductsCatalog: React.FC<ProductsCatalogProps> = ({
  language,
  onAddToCart,
}) => {
  const d = dictionaries[language];
  const [activeFilter, setActiveFilter] = useState<ProductType>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>(
    productsData.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );
  const [successAnimationId, setSuccessAnimationId] = useState<string | null>(null);

  const incrementQty = (id: string) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrementQty = (id: string) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, prev[id] - 1),
    }));
  };

  const triggerAddedFeedback = (id: string) => {
    setSuccessAnimationId(id);
    setTimeout(() => {
      setSuccessAnimationId(null);
    }, 1800);
  };

  const handleAddToCartClick = (product: Product) => {
    const qty = quantities[product.id] || 1;
    const isWholesale = product.isWholesaleAvailable && product.minWholesaleQty !== undefined && qty >= product.minWholesaleQty;
    onAddToCart(product, qty, isWholesale);
    triggerAddedFeedback(product.id);
  };

  // Filter products logic
  const filteredProducts = productsData.filter((product) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'fresh') return product.category === 'fresh' || product.category === 'butter';
    if (activeFilter === 'dried') return product.category === 'dried';
    if (activeFilter === 'wholesale') return product.isWholesaleAvailable;
    return true;
  });

  return (
    <section id="products" className="py-20 bg-[#F0F6FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Group & Filter Tabs in side-by-side Minimalist structure */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-slate-200 pb-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TundukIcon size={20} className="text-[#D4A017]" />
              <span className="text-[#8B1A1A] font-bold text-[10px] uppercase tracking-widest">{d.products}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A3A5C]">
              {language === 'RU' ? 'Наши продукты' : 'Биздин өнүмдөр'}{' '}
              <span className="text-[#D4A017] font-normal italic text-lg ml-2">
                {language === 'RU' ? '/ Биздин өнүмдөр' : '/ Наши продукты'}
              </span>
            </h2>
          </div>

          {/* Filter Navigation Tabs */}
          <div className="flex flex-wrap gap-4 sm:gap-6 text-xs font-bold uppercase tracking-widest" id="catalog-filters">
            {[
              { id: 'all', label: d.filterAll },
              { id: 'fresh', label: d.filterFresh },
              { id: 'dried', label: d.filterDried },
              { id: 'wholesale', label: d.filterWholesale },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as ProductType)}
                className={`transition-all duration-155 cursor-pointer pb-2 hover:opacity-100 ${
                  activeFilter === tab.id
                    ? 'text-[#1A3A5C] border-b-2 border-[#D4A017]'
                    : 'text-[#1A3A5C]/40 hover:text-[#1A3A5C]'
                }`}
                id={`filter-tab-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8" id="products-grid-list">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const currentQty = quantities[product.id] || 1;
              const hasWholesaleWhistle = product.isWholesaleAvailable && product.minWholesaleQty;
              const qualifiesForWholesale = hasWholesaleWhistle && currentQty >= (product.minWholesaleQty || 999);
              const remainingForWholesale = hasWholesaleWhistle ? Math.max(0, (product.minWholesaleQty || 0) - currentQty) : 0;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#FDF6E3] rounded-none overflow-hidden border border-[#1A3A5C]/10 flex flex-col group relative"
                  id={`product-card-${product.id}`}
                >
                  
                  {/* Image Holder & Badges */}
                  <div className="h-56 w-full overflow-hidden bg-white relative rounded-none">
                    <img
                      src={product.image}
                      alt={language === 'RU' ? product.nameRu : product.nameKg}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient for labels */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                    {/* Stock status badge */}
                    {product.availability === 'limited' && (
                      <span className="absolute top-3 left-3 bg-[#8B1A1A] text-white text-[9px] font-bold uppercase py-0.5 px-2 rounded-none z-10 flex items-center gap-1">
                        <Flame size={9} className="fill-current animate-pulse text-[#D4A017]" />
                        {language === 'RU' ? 'Мало' : 'Аз калды'}
                      </span>
                    )}

                    {/* Wholesale discount announcement badge */}
                    {product.isWholesaleAvailable && (
                      <span className="absolute top-3 right-3 bg-[#D4A017] text-white text-[9px] font-extrabold uppercase py-0.5 px-2 rounded-none z-10 flex items-center gap-1">
                        <Percent size={9} />
                        {language === 'RU' ? 'ОПТ' : 'ДҮҢ'}
                      </span>
                    )}

                    {/* Category Label Overlay */}
                    <span className="absolute bottom-2 left-3 text-[9px] font-sans font-bold uppercase tracking-wider text-amber-200">
                      {product.category === 'dried' && d.catDried}
                      {product.category === 'fresh' && d.catFresh}
                      {product.category === 'butter' && d.catButter}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Name Bilingual */}
                      <h3 className="font-serif text-base font-bold text-[#1A3A5C] leading-snug mb-1 group-hover:text-[#8B1A1A] transition-colors">
                        {language === 'RU' ? product.nameRu : product.nameKg}
                      </h3>
                      
                      {/* Volume & Weight + Rating star */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 font-sans font-medium">
                        <span>{language === 'RU' ? product.volumeRu : product.volumeKg}</span>
                        <div className="flex items-center gap-1 text-[#D4A017]">
                          <Star size={12} className="fill-current" />
                          <span className="font-semibold text-slate-700 text-xs">{product.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Description translated */}
                      <p className="text-[11px] text-slate-600 font-sans leading-relaxed mb-4 line-clamp-3">
                        {language === 'RU' ? product.descriptionRu : product.descriptionKg}
                      </p>
                    </div>

                    {/* Pricing & Control Block */}
                    <div>
                      <div className="border-t border-slate-200/60 pt-3 flex items-baseline justify-between mb-3">
                        {/* Unit Price */}
                        <div>
                          {qualifiesForWholesale ? (
                            <div className="flex flex-col">
                              <span className="line-through text-[10px] text-slate-400">
                                {product.price} {d.somSymbol}
                              </span>
                              <span className="text-lg font-bold text-[#8B1A1A] flex items-center gap-1 leading-none">
                                {product.wholesalePrice} <span className="text-[10px]">{d.somSymbol}</span>
                                <span className="text-[8px] uppercase bg-[#8B1A1A] text-white px-1 font-bold rounded-none">опт</span>
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col">
                              <span className="text-lg font-bold text-[#1A3A5C] leading-none">
                                {product.price} <span className="text-xs font-semibold">{d.somSymbol}</span>
                              </span>
                              {hasWholesaleWhistle && (
                                <span className="text-[9px] text-slate-500 font-sans mt-0.5">
                                  {d.wholesaleBadge} {product.minWholesaleQty} {product.category === 'dried' ? 'кг' : 'шт'} / {product.wholesalePrice} {d.somSymbol}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center bg-white rounded-none p-1 border border-slate-200/80">
                          <button
                            onClick={() => decrementQty(product.id)}
                            className="p-1 text-slate-500 hover:text-[#1A3A5C] hover:bg-slate-100 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="w-6 text-center font-sans font-bold text-xs text-[#1A3A5C]" id={`quantity-val-${product.id}`}>
                            {currentQty}
                          </span>
                          <button
                            onClick={() => incrementQty(product.id)}
                            className="p-1 text-slate-500 hover:text-[#1A3A5C] hover:bg-slate-100 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>

                      {/* Bulk price helpful visual hint */}
                      {hasWholesaleWhistle && remainingForWholesale > 0 && (
                        <div className="bg-amber-50/50 text-[9px] text-amber-800 font-medium p-1 w-full rounded-none mb-3 text-center border border-amber-200/50">
                          {language === 'RU' 
                            ? `Еще ${remainingForWholesale} шт. до цены Опт` 
                            : `Дүң баа үчүн дагы ${remainingForWholesale} даана`}
                        </div>
                      )}

                      {/* Buy now button */}
                      <button
                        onClick={() => handleAddToCartClick(product)}
                        disabled={product.availability === 'out_of_stock'}
                        className={`w-full py-2.5 px-3 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          successAnimationId === product.id
                            ? 'bg-[#8B1A1A] text-white'
                            : 'bg-[#1A3A5C] hover:bg-[#122A44] text-white'
                        }`}
                        id={`add-to-cart-action-${product.id}`}
                      >
                        {successAnimationId === product.id ? (
                          <>
                            <Check size={11} className="stroke-[3]" />
                            <span>{d.added}!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={11} />
                            <span>{d.addToCart}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
