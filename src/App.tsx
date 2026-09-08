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
import { fetchStoreSettings, DEFAULT_STORE_SETTINGS } from './services/supabase';

export const App: React.FC = () => {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [activeTrackingQuery, setActiveTrackingQuery] = useState<string>('');

  useEffect(() => {
    fetchStoreSettings().then((data) => setSettings(data));
  }, []);

  const handleQuickTrackingSearch = (query: string) => {
    setActiveTrackingQuery(query);
  };

  const scrollToTracking = () => {
    const el = document.getElementById('tracking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const input = el.querySelector('input');
      if (input) input.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar settings={settings} onOpenTracking={scrollToTracking} />

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
    </div>
  );
};

export default App;
