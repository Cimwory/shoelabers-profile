import React from 'react';
import { MapPin, Clock, Instagram, MessageCircle, ExternalLink, Navigation } from 'lucide-react';
import { StoreSettings } from '../types';
import { getWhatsAppLink } from '../services/supabase';
import { SpotlightCard } from './ui/SpotlightCard';
import { DecryptedText } from './ui/DecryptedText';

interface LocationContactProps {
  settings: StoreSettings;
}

export const LocationContact: React.FC<LocationContactProps> = ({ settings }) => {
  return (
    <section id="lokasi" className="py-20 bg-[#070b16] relative pb-28 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Info Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-mono">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <DecryptedText text="OUTLET & WORKSHOP // AMUNTAI NO 12" speed={35} />
            </div>

            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Kunjungi Outlet Kami di <span className="text-gradient-blue">Surabaya</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Drop sepatu Anda langsung ke toko kami atau hubungi tim customer service untuk konsultasi kondisi sepatu, estimasi pengerjaan, dan request antar-jemput.
            </p>

            {/* Info Items with SpotlightCard */}
            <div className="space-y-3 pt-2">
              <SpotlightCard
                spotlightColor="rgba(59, 130, 246, 0.2)"
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Alamat Outlet</div>
                  <div className="text-sm font-bold text-white">{settings.storeAddress}</div>
                  <div className="text-xs text-slate-400 mt-0.5">Surabaya, Jawa Timur, Indonesia</div>
                </div>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(16, 185, 129, 0.2)"
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Jam Operasional</div>
                  <div className="text-sm font-bold text-white">Senin — Minggu (09:00 - 21:00 WIB)</div>
                  <div className="text-xs text-emerald-400 mt-0.5">🟢 Buka Setiap Hari Tanpa Libur</div>
                </div>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(16, 185, 129, 0.2)"
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">WhatsApp Hotline</div>
                  <div className="text-sm font-bold text-white font-mono">{settings.storePhone}</div>
                  <div className="text-xs text-slate-400 mt-0.5">Respon Cepat & Konsultasi Foto Sepatu</div>
                </div>
              </SpotlightCard>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={getWhatsAppLink(settings.storePhone, 'Halo Shoelabers! Saya ingin konsultasi cuci sepatu.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition-transform"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat WhatsApp Kasir</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(settings.storeAddress + ' Surabaya')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-slate-600 font-bold text-xs flex items-center gap-2 transition-colors"
              >
                <Navigation className="w-4 h-4 text-blue-400" />
                <span>Buka Rute Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Maps Card & Staff Portal */}
          <div className="lg:col-span-6">
            <SpotlightCard
              spotlightColor="rgba(59, 130, 246, 0.3)"
              className="rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-6"
            >
              <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-950 via-[#0a1226] to-slate-950 border border-blue-900/40 p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    MAPS LOCATION
                  </span>
                  <Instagram className="w-5 h-5 text-slate-400" />
                </div>

                <div className="space-y-1">
                  <div className="text-xl font-bold text-white">{settings.storeName}</div>
                  <div className="text-xs text-slate-300">{settings.storeAddress}</div>
                  <div className="text-xs font-mono text-blue-400">{settings.instagram}</div>
                </div>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(settings.storeAddress + ' Surabaya')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-bold font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Petunjuk Arah Menuju Toko</span>
                </a>
              </div>

              {/* Staff Portal / Web Nota Link */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-200">Akses Staf Kasir / Admin</div>
                  <div className="text-[11px] text-slate-400">Masuk ke web sistem nota & pembuatan transaksi kasir</div>
                </div>
                <a
                  href="https://nota-shoelabers.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 text-xs font-mono font-bold border border-slate-700 flex items-center gap-1.5"
                >
                  <span>Portal Kasir</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </SpotlightCard>
          </div>

        </div>

      </div>
    </section>
  );
};
