import React, { useState, useEffect, useRef } from 'react';
import { Search, MessageCircle, Menu, X, ChevronRight, ChevronDown, MapPin } from 'lucide-react';
import { StoreSettings } from '../types';
import { getWhatsAppLink } from '../services/supabase';

interface NavbarProps {
  settings: StoreSettings;
  onOpenTracking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ settings, onOpenTracking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [waDropdownOpen, setWaDropdownOpen] = useState(false);
  const waDropdownRef = useRef<HTMLDivElement>(null);

  const surabayaOutlet = settings.outlets?.find((o) => o.id === 'surabaya') || {
    phone: '081357859310',
    formattedPhone: '+62 813-5785-9310',
    city: 'Surabaya',
    address: 'City Home Regency D4 Keputih, Sukolilo',
  };

  const gresikOutlet = settings.outlets?.find((o) => o.id === 'gresik') || {
    phone: '081216242094',
    formattedPhone: '+62 812-1624-2094',
    city: 'Gresik',
    address: 'Jl. Amuntai No.12, Yosowilangun, Manyar',
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (waDropdownRef.current && !waDropdownRef.current.contains(event.target as Node)) {
        setWaDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
          ? 'bg-[#080d1a]/95 backdrop-blur-md border-b border-blue-900/30 shadow-xl shadow-black/40 py-2.5 sm:py-3'
          : 'bg-gradient-to-b from-[#080d1a] to-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#beranda" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <img
              src="/logo.png"
              alt="Shoelabers Logo"
              className="w-full h-full object-cover rounded-[10px]"
              onError={(e) => {
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
              <span>Surabaya & Gresik • Buka 09:00 - 21:00</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1.5 bg-[#0f172a]/90 border border-slate-800/90 rounded-full px-5 py-2 backdrop-blur-md shadow-inner">
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

        {/* Upbar Quick Action Cards (Desktop & Tablet) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Card 1: Lacak Pesanan */}
          <button
            onClick={onOpenTracking}
            className="h-11 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-[#0b1328]/95 hover:bg-[#0f1a38] border border-blue-500/40 hover:border-blue-400/80 text-left transition-all shadow-lg shadow-blue-600/10 hover:shadow-blue-500/25 group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all flex-shrink-0">
              <Search className="w-3.5 h-3.5" />
            </div>
            <div className="text-left pr-1">
              <div className="text-[9px] font-mono uppercase text-blue-400 font-bold leading-none">Cek Nota</div>
              <div className="text-xs font-bold text-white leading-tight mt-0.5 whitespace-nowrap">Lacak Pesanan</div>
            </div>
          </button>

          {/* Card 2: Chat WhatsApp with Branch Dropdown */}
          <div className="relative" ref={waDropdownRef}>
            <button
              onClick={() => setWaDropdownOpen(!waDropdownOpen)}
              className="h-11 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-[#0b1328]/95 hover:bg-[#0d1f35] border border-emerald-500/40 hover:border-emerald-400/80 text-left transition-all shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/25 group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-500 group-hover:text-white transition-all flex-shrink-0">
                <MessageCircle className="w-3.5 h-3.5" />
              </div>
              <div className="text-left pr-1">
                <div className="text-[9px] font-mono uppercase text-emerald-400 font-bold leading-none">Konsultasi</div>
                <div className="text-xs font-bold text-white leading-tight mt-0.5 whitespace-nowrap">Chat WhatsApp</div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform ${waDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Floating Dropdown Card for 2 Outlets */}
            {waDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 p-3 rounded-2xl bg-[#0a1224]/98 border border-emerald-500/40 shadow-2xl shadow-black/80 backdrop-blur-2xl z-50 animate-fadeIn space-y-2">
                <div className="text-[10px] font-mono text-slate-400 px-2 pt-1 font-bold flex items-center justify-between border-b border-slate-800 pb-2">
                  <span>PILIH KASIR CABANG:</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Online
                  </span>
                </div>
                
                {/* Surabaya Option */}
                <a
                  href={getWhatsAppLink(
                    surabayaOutlet.phone,
                    'Halo Shoelabers Surabaya! Saya ingin konsultasi cuci sepatu untuk Cabang Surabaya.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setWaDropdownOpen(false)}
                  className="p-3 rounded-xl bg-slate-900/90 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between group transition-all"
                >
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>Cabang Surabaya</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 font-sans">Keputih, Sukolilo</div>
                    <div className="text-[11px] font-mono text-emerald-400 font-bold mt-1">{surabayaOutlet.formattedPhone}</div>
                  </div>
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                </a>

                {/* Gresik Option */}
                <a
                  href={getWhatsAppLink(
                    gresikOutlet.phone,
                    'Halo Shoelabers Gresik! Saya ingin konsultasi cuci sepatu untuk Cabang Gresik.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setWaDropdownOpen(false)}
                  className="p-3 rounded-xl bg-slate-900/90 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between group transition-all"
                >
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>Cabang Gresik</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 font-sans">Manyar, Yosowilangun</div>
                    <div className="text-[11px] font-mono text-emerald-400 font-bold mt-1">{gresikOutlet.formattedPhone}</div>
                  </div>
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Quick Actions + Hamburger Toggle */}
        <div className="flex xl:hidden items-center gap-2">
          {/* Mobile Quick Action Buttons in Upbar */}
          <button
            onClick={onOpenTracking}
            className="sm:hidden w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 flex items-center justify-center cursor-pointer shadow-sm"
            aria-label="Lacak Pesanan"
            title="Lacak Pesanan"
          >
            <Search className="w-4 h-4 text-blue-400" />
          </button>

          <div className="relative sm:hidden" ref={waDropdownRef}>
            <button
              onClick={() => setWaDropdownOpen(!waDropdownOpen)}
              className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Chat WhatsApp"
              title="Chat WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
            </button>

            {/* Mobile Popover */}
            {waDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 p-2.5 rounded-2xl bg-[#0a1224]/98 border border-emerald-500/40 shadow-2xl z-50 space-y-2">
                <div className="text-[10px] font-mono text-slate-400 px-1 font-bold">PILIH CABANG:</div>
                <a
                  href={getWhatsAppLink(surabayaOutlet.phone, 'Halo Shoelabers Surabaya, mau tanya cuci sepatu dong!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setWaDropdownOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-bold text-white"
                >
                  <div>
                    <div>Cabang Surabaya</div>
                    <div className="text-[10px] text-emerald-400 font-mono font-normal">{surabayaOutlet.formattedPhone}</div>
                  </div>
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                </a>
                <a
                  href={getWhatsAppLink(gresikOutlet.phone, 'Halo Shoelabers Gresik, mau tanya cuci sepatu dong!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setWaDropdownOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-bold text-white"
                >
                  <div>
                    <div>Cabang Gresik</div>
                    <div className="text-[10px] text-emerald-400 font-mono font-normal">{gresikOutlet.formattedPhone}</div>
                  </div>
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                </a>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-3 px-4 pb-5 pt-2 bg-[#0a1022]/98 border-b border-blue-900/40 backdrop-blur-2xl animate-fadeIn space-y-4">
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

          <div className="pt-3 border-t border-slate-800 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracking();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#0f1b36] border border-blue-500/40 text-blue-300 text-xs font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <Search className="w-4 h-4 text-blue-400" />
              <span>Lacak Cucian Real-Time (Cek Nota)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={getWhatsAppLink(surabayaOutlet.phone, 'Halo Shoelabers Surabaya, mau tanya cuci sepatu dong!')}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-white text-xs font-bold flex flex-col items-center justify-center text-center gap-1 shadow-md"
              >
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="text-[11px]">WA Surabaya</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">0813-5785-9310</span>
              </a>

              <a
                href={getWhatsAppLink(gresikOutlet.phone, 'Halo Shoelabers Gresik, mau tanya cuci sepatu dong!')}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-white text-xs font-bold flex flex-col items-center justify-center text-center gap-1 shadow-md"
              >
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="text-[11px]">WA Gresik</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">0812-1624-2094</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
