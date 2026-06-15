/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductsCatalog } from './components/ProductsCatalog';
import { AboutUs } from './components/AboutUs';
import { WholesaleForm } from './components/WholesaleForm';
import { PaymentDemo } from './components/PaymentDemo';
import { ContactMap } from './components/ContactMap';
import { ChatbotWidget } from './components/ChatbotWidget';
import { Footer } from './components/Footer';
import { Language, CartItem, Product } from './types';
import { FeltTextureOverlay } from './components/OrnamentDesigns';

export default function App() {
  const [language, setLanguage] = useState<Language>('KG'); // Default to Kyrgyz as requested
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('ala_too_amir_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error('Error loading cart state from localStorage:', e);
    }
  }, []);

  // Save cart to localStorage on changes
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    try {
      localStorage.setItem('ala_too_amir_cart', JSON.stringify(updatedCart));
    } catch (e) {
      console.error('Error saving cart state to localStorage:', e);
    }
  };

  // Add to Cart handler
  const handleAddToCart = (product: Product, quantity: number, isWholesale: boolean) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.product.id === product.id);
      let newItems = [...prevItems];

      if (existingItemIndex > -1) {
        // Update existing item quantity
        const currentQty = newItems[existingItemIndex].quantity + quantity;
        const autoWholesaleStatus = product.isWholesaleAvailable && product.minWholesaleQty && currentQty >= product.minWholesaleQty;
        
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: currentQty,
          isWholesaleOrder: !!autoWholesaleStatus,
        };
      } else {
        // Add new item
        newItems.push({
          product,
          quantity,
          isWholesaleOrder: isWholesale,
        });
      }

      saveCartToStorage(newItems);
      return newItems;
    });
  };

  // Update item quantity in Cart
  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) => {
        if (item.product.id === productId) {
          const autoWholesaleStatus = item.product.isWholesaleAvailable && item.product.minWholesaleQty && newQuantity >= item.product.minWholesaleQty;
          return {
            ...item,
            quantity: newQuantity,
            isWholesaleOrder: !!autoWholesaleStatus,
          };
        }
        return item;
      });
      saveCartToStorage(newItems);
      return newItems;
    });
  };

  // Remove item from Cart
  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.product.id !== productId);
      saveCartToStorage(newItems);
      return newItems;
    });
  };

  // Clear entire Cart (on successful transaction checkout)
  const handleClearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('ala_too_amir_cart');
    } catch (e) {
      console.error('Error clearing cart state from localStorage:', e);
    }
  };

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const isHome = id === 'home';
    const element = document.getElementById(isHome ? 'home' : id);
    if (element) {
      const headerOffset = 80; // height of our sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F6FF] flex flex-col font-sans transition-colors duration-300 relative">
      
      {/* Defs/Filters for Felt texture overlays */}
      <FeltTextureOverlay />

      {/* Sticky bilingual Navigation Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
        scrollToSection={scrollToSection}
      />

      {/* Hero Section with panoramic Ala-Too views */}
      <Hero
        language={language}
        onBuyNowClick={() => scrollToSection('products')}
        onWholesalerClick={() => scrollToSection('wholesale')}
      />

      {/* Clean Minimalism Scrolling Banner Ticker */}
      <div className="h-7 w-full flex overflow-hidden bg-[#8B1A1A] border-y border-[#D4A017]/30 relative z-10 antialiased select-none">
        <div className="animate-marquee-slow py-1">
          <div className="flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap">
            <span>◆ ТРАДИЦИИ АЛА-ТОО</span>
            <span>◆ НАТУРАЛЬНЫЙ СОСТАВ</span>
            <span>◆ СДЕЛАНО В КАРА-СУУ</span>
            <span>◆ 100% QUALITY</span>
            <span>◆ ТРАДИЦИИ АЛА-ТОО</span>
            <span>◆ НАТУРАЛЬНЫЙ СОСТАВ</span>
            <span>◆ СДЕЛАНО В КАРА-СУУ</span>
            <span>◆ 100% QUALITY</span>
            <span>◆ ТРАДИЦИИ АЛА-ТОО</span>
            <span>◆ НАТУРАЛЬНЫЙ СОСТАВ</span>
            <span>◆ СДЕЛАНО В КАРА-СУУ</span>
            <span>◆ 100% QUALITY</span>
          </div>
        </div>
      </div>

      {/* Main Grid Products Catalog Section */}
      <ProductsCatalog
        language={language}
        onAddToCart={handleAddToCart}
      />

      {/* About Section - Creamy Kyrgyz tradition family story */}
      <AboutUs language={language} />

      {/* Wholesale Section - Bold deep mountain blue page */}
      <WholesaleForm language={language} />

      {/* Interactive Contact points & Embedded Google Map */}
      <ContactMap language={language} />

      {/* Floating Chatbot assistant widget */}
      <ChatbotWidget language={language} />

      {/* Footer block */}
      <Footer
        language={language}
        scrollToSection={scrollToSection}
      />

      {/* Sidebar Shopping Cart & Online Payments checkout popup */}
      <PaymentDemo
        language={language}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
