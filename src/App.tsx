import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OrderTracking } from './components/OrderTracking';
import { BeforeAfterShowcase } from './components/BeforeAfterShowcase';
import { ServicesPricing } from './components/ServicesPricing';
import { WhyUs } from './components/WhyUs';
import { WorkflowSteps } from './components/WorkflowSteps';
import { Testimonials } from './components/Testimonials';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { StoreSettings } from './types';
import { fetchStoreSettings, DEFAULT_STORE_SETTINGS, getWhatsAppLink } from './services/supabase';

// React Bits UI Components
import { AuroraBackground } from './components/ui/AuroraBackground';
import { Dock, DockItemData } from './components/ui/Dock';
import { Home, Search, Tag, Sparkles, Shield, MapPin, MessageCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [activeTrackingQuery, setActiveTrackingQuery] = useState<string>('');

  useEffect(() => {
    fetchStoreSettings().then((data) => setSettings(data));
  }, []);

  const handleQuickTrackingSearch = (query: string) => {
    setActiveTrackingQuery(query);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (id === 'tracking') {
        setTimeout(() => {
          const input = el.querySelector('input');
          if (input) input.focus();
        }, 400);
      }
    }
  };

  // React Bits macOS Floating Dock Actions
  const dockItems: DockItemData[] = [
    {
      id: 'dock-home',
      icon: <Home className="w-5 h-5 text-blue-400" />,
      label: 'Beranda',
      onClick: () => scrollToSection('beranda'),
    },
    {
      id: 'dock-tracking',
      icon: <Search className="w-5 h-5 text-emerald-400" />,
      label: 'Lacak Nota',
      onClick: () => scrollToSection('tracking'),
      badge: <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />,
    },
    {
      id: 'dock-services',
      icon: <Tag className="w-5 h-5 text-indigo-400" />,
      label: 'Harga & Layanan',
      onClick: () => scrollToSection('layanan'),
    },
    {
      id: 'dock-showcase',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      label: 'Portofolio',
      onClick: () => scrollToSection('portofolio'),
    },
    {
      id: 'dock-why',
      icon: <Shield className="w-5 h-5 text-purple-400" />,
      label: 'Keunggulan',
      onClick: () => scrollToSection('keunggulan'),
    },
    {
      id: 'dock-location',
      icon: <MapPin className="w-5 h-5 text-rose-400" />,
      label: 'Lokasi Outlet',
      onClick: () => scrollToSection('lokasi'),
    },
    {
      id: 'dock-wa',
      icon: <MessageCircle className="w-5 h-5 text-emerald-500" />,
      label: 'WhatsApp Kasir',
      onClick: () => {
        window.open(
          getWhatsAppLink(settings.storePhone, 'Halo Shoelabers, mau tanya seputar cuci sepatu!'),
          '_blank'
        );
      },
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* React Bits Ambient Aurora Background */}
      <AuroraBackground showGrid={true} />

      {/* Top Navbar */}
      <Navbar settings={settings} onOpenTracking={() => scrollToSection('tracking')} />

      {/* Hero Section */}
      <Hero settings={settings} onSearch={handleQuickTrackingSearch} />

      {/* Real-time Order Tracking Module */}
      <OrderTracking initialQuery={activeTrackingQuery} settings={settings} />

      {/* Interactive Before & After Showcase Slider */}
      <BeforeAfterShowcase />

      {/* Services & Dynamic Pricing */}
      <ServicesPricing settings={settings} />

      {/* Why Choose Us */}
      <WhyUs />

      {/* 4 Step Workflow */}
      <WorkflowSteps />

      {/* Customer Reviews & Testimonials */}
      <Testimonials />

      {/* Outlet Location & Contact */}
      <LocationContact settings={settings} />

      {/* Footer */}
      <Footer settings={settings} />

      {/* React Bits Interactive Floating Dock (macOS Style Magnification) */}
      <Dock items={dockItems} distance={120} baseItemSize={44} magnification={62} />
    </div>
  );
};

export default App;
