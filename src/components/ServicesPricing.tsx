import React, { useState, useEffect } from 'react';
import { Sparkles, Check, Clock, MessageCircle } from 'lucide-react';
import { ServicePackage, StoreSettings } from '../types';
import { fetchServicePackages, formatRupiah, getWhatsAppLink } from '../services/supabase';

interface ServicesPricingProps {
  settings: StoreSettings;
}

export const ServicesPricing: React.FC<ServicesPricingProps> = ({ settings }) => {
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'cleaning' | 'treatment' | 'repair'>('all');

  useEffect(() => {
    fetchServicePackages().then((data) => setPackages(data));
  }, []);

  const categories = [
    { key: 'all', label: 'Semua Layanan' },
    { key: 'cleaning', label: 'Pembersihan (Cleaning)' },
    { key: 'treatment', label: 'Treatment Khusus' },
    { key: 'repair', label: 'Restorasi & Repair' },
  ];

  const filtered = activeCategory === 'all'
    ? packages
    : packages.filter((p) => p.category === activeCategory);

  return (
    <section id="layanan" className="py-20 bg-[#070b16] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>DAFTAR HARGA & MENU TREATMENT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Layanan Terbaik untuk <span className="text-gradient-blue">Semua Jenis Sepatu</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Harga transparan tanpa biaya tersembunyi. Setiap treatment menggunakan chemical khusus sesuai bahan sepatu Anda.
          </p>
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

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
                pkg.isPopular
                  ? 'bg-gradient-to-b from-[#0f1d3d] to-[#0a1226] border-2 border-blue-500/70 shadow-2xl shadow-blue-600/20 ring-1 ring-blue-500/40'
                  : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Popular Badge */}
              {pkg.isPopular && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-md">
                  ★ PALING DIMINATI
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-blue-400 font-semibold tracking-wider">
                      {pkg.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{pkg.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-1 rounded-md">
                    <Clock className="w-3 h-3 text-blue-400" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    {formatRupiah(pkg.price)}
                  </div>
                  <span className="text-[11px] text-slate-400">per pasang sepatu</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                  {pkg.description}
                </p>

                {/* Features List */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
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
                    <span>100% Garansi cuci ulang jika kurang bersih</span>
                  </div>
                </div>
              </div>

              {/* Booking CTA Button */}
              <div className="pt-6">
                <a
                  href={getWhatsAppLink(
                    settings.storePhone,
                    `Halo Shoelabers, saya ingin booking treatment ${pkg.name} seharga ${formatRupiah(pkg.price)}. Apakah slot pengerjaan tersedia?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                    pkg.isPopular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pesan Treatment Ini</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
