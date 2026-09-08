import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, Menu, X, ChevronRight } from 'lucide-react';
import { StoreSettings } from '../types';
import { getWhatsAppLink } from '../services/supabase';

interface NavbarProps {
  settings: StoreSettings;
  onOpenTracking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ settings, onOpenTracking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { href: string; label: string; badge?: string }[] = [
    { href: '#beranda', label: 'Beranda' },
    { href: '#layanan', label: 'Layanan & Harga' },
    { href: '#portofolio', label: 'Portofolio' },
    { href: '#keunggulan', label: 'Keunggulan' },
    { href: '#lokasi', label: 'Lokasi & Kontak' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080d1a]/95 backdrop-blur-md border-b border-blue-900/30 shadow-xl shadow-black/40 py-3'
          : 'bg-gradient-to-b from-[#080d1a] to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#beranda" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <img
              src="/logo.png"
              alt="Shoelabers Logo"
              className="w-full h-full object-cover rounded-[10px]"
              onError={(e) => {
                // Fallback icon if logo image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="font-display font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
              <span>SHOELABERS</span>
              <span className="text-blue-400 text-xs font-mono px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/30">
                SNEAKER CARE
              </span>
            </div>
            <div className="font-mono text-[10px] text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Buka Hari Ini (09:00 - 21:00 WIB)</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#0f172a]/90 border border-slate-800/90 rounded-full px-5 py-2 backdrop-blur-md shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-blue-600/20 transition-all flex items-center gap-1.5"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-[9px] font-mono font-bold bg-blue-500 text-white px-1.5 py-0.2 rounded-full animate-pulse">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Quick Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenTracking}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-white text-xs font-semibold transition-all shadow-sm hover:shadow-blue-500/20 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-blue-400" />
            <span>Lacak Pesanan</span>
          </button>

          <a
            href={getWhatsAppLink(
              settings.storePhone,
              'Halo Shoelabers! Saya ingin konsultasi / drop sepatu untuk cuci. Apakah bisa dibantu?'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/25 hover:scale-[1.02]"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-4 pb-4 pt-2 bg-[#0a1022]/98 border-b border-blue-900/40 backdrop-blur-xl animate-fadeIn space-y-3">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-blue-600/20 hover:text-blue-300 flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.badge ? (
                  <span className="text-[10px] font-mono bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold">
                    {link.badge}
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                )}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracking();
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Lacak Cucian Real-Time</span>
            </button>
            <a
              href={getWhatsAppLink(settings.storePhone, 'Halo Shoelabers, mau tanya cuci sepatu dong!')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Admin</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
