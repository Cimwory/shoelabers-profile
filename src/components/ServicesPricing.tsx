import React, { useState, useEffect } from 'react';
import { Sparkles, Check, Clock, MessageCircle, MapPin, Truck, AlertCircle } from 'lucide-react';
import { ServicePackage, StoreSettings } from '../types';
import { fetchServicePackages, formatRupiah, getWhatsAppLink } from '../services/supabase';

// React Bits UI Components
import { SpotlightCard } from './ui/SpotlightCard';
import { ShinyText } from './ui/ShinyText';
import { DecryptedText } from './ui/DecryptedText';

interface ServicesPricingProps {
  settings: StoreSettings;
}

export const ServicesPricing: React.FC<ServicesPricingProps> = ({ settings }) => {
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'cleaning' | 'treatment' | 'repair'>('all');
  const [selectedOutletId, setSelectedOutletId] = useState<string>('surabaya');

  const currentOutlet = settings.outlets?.find((o) => o.id === selectedOutletId) || settings.outlets?.[0] || {
    id: 'surabaya',
    city: 'Surabaya',
    name: 'Outlet Surabaya (Keputih)',
    address: 'City Home Regency D4 Keputih, Sukolilo, Surabaya',
    phone: '081357859310',
    formattedPhone: '+62 813-5785-9310',
    hours: 'Senin — Minggu (09:00 - 21:00 WIB)',
    mapsUrl: '',
  };

  useEffect(() => {
    fetchServicePackages().then((data) => setPackages(data));
  }, []);

  const categories = [
    { key: 'all', label: 'Semua Layanan' },
    { key: 'cleaning', label: 'Pembersihan (Cleaning)' },
    { key: 'treatment', label: 'Treatment Khusus' },
    { key: 'repair', label: 'Restorasi & Repair (Belum Tersedia)' },
  ];

  const filtered = activeCategory === 'all'
    ? packages
    : packages.filter((p) => p.category === activeCategory);

  return (
    <section id="layanan" className="py-20 bg-[#070b16]/80 relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with React Bits DecryptedText */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <DecryptedText text="DAFTAR HARGA & MENU // TRANSPARAN" speed={35} />
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Layanan Terbaik untuk <span className="text-gradient-blue">Semua Jenis Sepatu</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Harga transparan tanpa biaya tersembunyi. Setiap treatment menggunakan chemical khusus sesuai bahan sepatu Anda.
          </p>
        </div>

        {/* Branch Booking Outlet Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-5">
          <span className="text-xs font-mono text-slate-400">Pilih Cabang Booking:</span>
          <div className="inline-flex p-1 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner">
            <button
              onClick={() => setSelectedOutletId('surabaya')}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedOutletId === 'surabaya'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40 border border-blue-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Surabaya (Sukolilo)</span>
            </button>
            <button
              onClick={() => setSelectedOutletId('gresik')}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedOutletId === 'gresik'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40 border border-blue-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Gresik (Manyar)</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Notice for Restorasi & Repair */}
        {activeCategory === 'repair' && (
          <div className="max-w-3xl mx-auto mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-3 shadow-lg">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div className="leading-relaxed">
              <strong className="text-amber-300">Pemberitahuan Layanan: </strong>
              Mohon maaf, saat ini kami belum menyediakan restorasi dan repair. Layanan ini sedang dalam tahap persiapan dan pengembangan.
            </div>
          </div>
        )}

        {/* Pricing Cards Grid with React Bits SpotlightCard & ShinyText */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-5 items-stretch">
          {filtered.map((pkg) => (
            <SpotlightCard
              key={pkg.id}
              spotlightColor={pkg.isPopular ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.15)'}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col transition-all duration-300 hover:scale-[1.02] ${
                pkg.isPopular
                  ? 'bg-gradient-to-b from-[#0f1d3d] to-[#0a1226] border-2 border-blue-500 shadow-2xl shadow-blue-600/20 ring-1 ring-blue-500/40'
                  : 'bg-slate-900/70 border border-slate-800 hover:border-slate-700 shadow-lg'
              }`}
              innerClassName="flex flex-col h-full justify-between"
            >
              {/* Symmetrical Centered Popular Badge with React Bits ShinyText */}
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 border border-blue-400/80 text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-xl shadow-blue-600/40 flex items-center gap-1.5 whitespace-nowrap z-20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <ShinyText text="★ PALING DIMINATI" shineColor="#ffffff" />
                </div>
              )}

              <div className="space-y-4 flex-1 flex flex-col">
                {/* Category & Duration Header */}
                <div className="flex items-center justify-between gap-2">
                  {pkg.category === 'repair' ? (
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30">
                      BELUM TERSEDIA
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono uppercase text-blue-400 font-bold tracking-wider px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/30">
                      {pkg.category}
                    </span>
                  )}
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60 flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                {/* Package Name */}
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{pkg.name}</h3>
                </div>

                {/* Price Display */}
                {pkg.category === 'repair' ? (
                  <div className="pt-1 pb-1">
                    <div className="text-lg sm:text-xl font-bold text-amber-400 font-mono tracking-tight flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      <span>Belum Tersedia</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">dalam tahap persiapan</span>
                  </div>
                ) : (
                  <div className="pt-1 pb-1">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                      {formatRupiah(pkg.price)}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">per pasang sepatu</span>
                  </div>
                )}

                {/* Standardized description / notice */}
                {pkg.category === 'repair' ? (
                  <div className="min-h-[44px] flex items-center">
                    <p className="text-xs text-amber-300/90 font-mono bg-amber-500/10 border border-amber-500/20 p-2 rounded-xl w-full">
                      ⚠️ (Kami belum menyediakan restorasi dan repair)
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-300 leading-relaxed font-sans min-h-[44px] line-clamp-2">
                    {pkg.description}
                  </p>
                )}

                {/* Features List */}
                <div className="pt-3.5 border-t border-slate-800/80 space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Pembersihan bahan teliti & anti-luntur</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Parfum wangi & disinfektan anti-bakteri</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Live status tracking via website</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="text-emerald-300 font-medium">Melayani FREE Pick-Up & Delivery (S&K)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>100% Garansi cuci ulang jika kurang bersih</span>
                  </div>
                </div>
              </div>

              {/* Booking WhatsApp CTA Button pinned at the exact bottom */}
              <div className="mt-auto pt-6">
                {pkg.category === 'repair' ? (
                  <div className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-slate-800/60 text-slate-400 border border-slate-700/60 cursor-not-allowed">
                    <AlertCircle className="w-4 h-4 text-amber-400/80 flex-shrink-0" />
                    <span>(Kami Belum Menyediakan Restorasi & Repair)</span>
                  </div>
                ) : (
                  <a
                    href={getWhatsAppLink(
                      currentOutlet.phone,
                      `Halo Shoelabers Cabang ${currentOutlet.city}, saya ingin booking treatment ${pkg.name} seharga ${formatRupiah(pkg.price)} di outlet ${currentOutlet.city}. Apakah slot pengerjaan tersedia?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                      pkg.isPopular
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400/50 hover:scale-[1.01]'
                        : 'bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700 hover:border-slate-600 hover:scale-[1.01]'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Chat Kasir ({currentOutlet.city})</span>
                  </a>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Free Pick-Up & Delivery Highlight Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-blue-950/90 via-[#0a1532] to-indigo-950/90 border border-blue-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 mx-auto md:mx-0">
              <Truck className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold uppercase mb-1">
                ★ LAYANAN ANTAR JEMPUT
              </div>
              <h3 className="text-base sm:text-xl font-bold text-white">
                Melayani <span className="text-gradient-blue">FREE Pick-Up & Delivery</span> Langsung ke Rumah Anda
              </h3>
              <p className="text-xs text-slate-300 font-sans mt-0.5 max-w-2xl leading-relaxed">
                Sibuk dan tidak sempat drop sepatu ke outlet? Tim teknisi Shoelabers siap menjemput dan mengantar kembali sepatu Anda untuk wilayah <strong className="text-blue-400">Surabaya & Gresik</strong> (Syarat & Ketentuan berlaku).
              </p>
            </div>
          </div>

          <a
            href={getWhatsAppLink(
              currentOutlet.phone,
              `Halo Shoelabers Cabang ${currentOutlet.city}! Saya ingin pesan cuci sepatu dengan layanan FREE Pick-Up ke alamat saya.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 whitespace-nowrap hover:scale-[1.02] transition-transform flex-shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>Chat Kasir Request Free Pick-Up</span>
          </a>
        </div>

      </div>
    </section>
  );
};
