import React, { useState } from 'react';
import { MapPin, Clock, Instagram, MessageCircle, ExternalLink, Navigation, CheckCircle2, Truck } from 'lucide-react';
import { StoreSettings } from '../types';
import { getWhatsAppLink } from '../services/supabase';
import { SpotlightCard } from './ui/SpotlightCard';
import { DecryptedText } from './ui/DecryptedText';

interface LocationContactProps {
  settings: StoreSettings;
}

export const LocationContact: React.FC<LocationContactProps> = ({ settings }) => {
  const outlets = settings.outlets && settings.outlets.length > 0 ? settings.outlets : [
    {
      id: 'surabaya',
      city: 'Surabaya',
      name: 'Outlet Surabaya (Keputih)',
      address: 'City Home Regency D4 Keputih, Sukolilo, Surabaya',
      phone: '081357859310',
      formattedPhone: '+62 813-5785-9310',
      hours: 'Senin — Minggu (09:00 - 21:00 WIB)',
      mapsUrl: 'https://maps.google.com/?q=' + encodeURIComponent('City Home Regency D4 Keputih, Sukolilo, Surabaya'),
      isPrimary: true,
    },
    {
      id: 'gresik',
      city: 'Gresik',
      name: 'Outlet Gresik (Manyar)',
      address: 'Jl. Amuntai No.12, Ponganganrejo, Yosowilangun, Kec. Manyar, Kabupaten Gresik, Jawa Timur 61151',
      phone: '081216242094',
      formattedPhone: '+62 812-1624-2094',
      hours: 'Senin — Minggu (09:00 - 21:00 WIB)',
      mapsUrl: 'https://maps.google.com/?q=' + encodeURIComponent('Jl. Amuntai No.12, Ponganganrejo, Yosowilangun, Kec. Manyar, Kabupaten Gresik, Jawa Timur 61151'),
      isPrimary: false,
    },
  ];

  const [activeTab, setActiveTab] = useState<'all' | 'surabaya' | 'gresik'>('all');

  const displayedOutlets = activeTab === 'all' 
    ? outlets 
    : outlets.filter((o) => o.id === activeTab);

  return (
    <section id="lokasi" className="py-20 bg-[#070b16] relative pb-28 sm:pb-32 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-mono">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <DecryptedText text="OUTLET & WORKSHOP // 2 CABANG AKTIF" speed={35} />
          </div>

          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Kunjungi Outlet Kami di <span className="text-gradient-blue">Surabaya & Gresik</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Drop sepatu kotor Anda langsung di store terdekat atau hubungi tim customer service cabang Anda untuk konsultasi treatment, estimasi selesai, dan request antar-jemput.
          </p>

          {/* Branch Filter Tabs */}
          <div className="flex items-center justify-center gap-2 pt-3">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Semua Cabang (2)
            </button>
            <button
              onClick={() => setActiveTab('surabaya')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'surabaya'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Surabaya</span>
            </button>
            <button
              onClick={() => setActiveTab('gresik')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'gresik'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Gresik</span>
            </button>
          </div>
        </div>

        {/* 2 Symmetrical Outlet Cards Grid */}
        <div className={`grid grid-cols-1 ${displayedOutlets.length > 1 ? 'lg:grid-cols-2' : 'max-w-2xl mx-auto'} gap-8 mb-12`}>
          {displayedOutlets.map((outlet) => (
            <SpotlightCard
              key={outlet.id}
              spotlightColor="rgba(59, 130, 246, 0.25)"
              className="rounded-3xl p-6 sm:p-8 bg-[#0b1224]/90 border border-slate-800 hover:border-blue-500/50 shadow-2xl transition-all duration-300"
              innerClassName="flex flex-col h-full justify-between"
            >
              <div className="space-y-6">
                {/* Header Badge & City Tag */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>CABANG {outlet.city.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Buka Hari Ini</span>
                  </div>
                </div>

                {/* Outlet Name & Headline */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {outlet.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-sans">
                    {outlet.id === 'surabaya' 
                      ? 'Melayani area Keputih, Sukolilo, Mulyorejo, ITS, UNAIR, Rungkut & sekitarnya.'
                      : 'Melayani area Manyar, Yosowilangun, GKB (Gresik Kota Baru), Kebomas & sekitarnya.'}
                  </p>
                </div>

                {/* Detailed Info Cards */}
                <div className="space-y-3">
                  {/* Address */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/90 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 font-mono">Alamat Lengkap Outlet</div>
                      <div className="text-xs sm:text-sm font-semibold text-white leading-relaxed mt-0.5">
                        {outlet.address}
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/90 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 font-mono">Jam Operasional Toko</div>
                      <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                        {outlet.hours}
                      </div>
                      <div className="text-[11px] text-emerald-400 mt-0.5">
                        Melayani Drop-Off & Delivery Setiap Hari
                      </div>
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/90 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 font-mono">WhatsApp Kasir ({outlet.city})</div>
                      <div className="text-sm font-bold text-white font-mono mt-0.5">
                        {outlet.formattedPhone}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Fast Response & Konsultasi Foto Sepatu
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Coverage Perks */}
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-300">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/70 border border-slate-700/60">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Drop-off di Outlet
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/70 border border-slate-700/60 text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    FREE Pick-Up & Delivery
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/70 border border-slate-700/60">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Free Konsultasi
                  </span>
                </div>
              </div>

              {/* Symmetrical Dual Action Buttons */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
                <a
                  href={getWhatsAppLink(
                    outlet.phone,
                    `Halo Shoelabers Cabang ${outlet.city}! Saya ingin tanya treatment & antar-jemput cuci sepatu.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Chat Kasir {outlet.city}</span>
                </a>

                <a
                  href={outlet.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700 hover:border-slate-600 font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Rute Google Maps</span>
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Quick Additional Bar: Instagram & Free Pick-Up Service */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SpotlightCard
            spotlightColor="rgba(244, 63, 94, 0.15)"
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Instagram Resmi</div>
                <div className="text-xs font-mono text-blue-400">{settings.instagram}</div>
              </div>
            </div>
            <a
              href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono font-semibold border border-slate-700 flex items-center gap-1 transition-colors"
            >
              <span>Follow</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.2)"
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Layanan Free Pick-Up</div>
                <div className="text-[11px] text-emerald-400 font-mono">Antar-Jemput Gratis (S&K)</div>
              </div>
            </div>
            <a
              href={getWhatsAppLink(
                settings.storePhone,
                'Halo Shoelabers! Saya ingin request layanan Free Pick-Up & Delivery untuk cuci sepatu saya.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-white text-xs font-mono font-bold border border-emerald-500/30 flex items-center gap-1.5 transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Request Pick-Up</span>
            </a>
          </SpotlightCard>
        </div>

      </div>
    </section>
  );
};

