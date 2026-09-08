import React, { useState } from 'react';
import { Search, Sparkles, ShieldCheck, Zap, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { StoreSettings } from '../types';
import { DecryptedText } from './ui/DecryptedText';
import { ShinyText } from './ui/ShinyText';
import { SpotlightCard } from './ui/SpotlightCard';
import { CountUp } from './ui/CountUp';

interface HeroProps {
  settings: StoreSettings;
  onSearch: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ settings, onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      const el = document.getElementById('tracking');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="beranda" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Pill with React Bits DecryptedText */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-mono shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <DecryptedText text="PREMIUM SNEAKER CARE // SURABAYA & GRESIK" speed={35} />
            </div>

            {/* Headline with React Bits ShinyText */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.15]">
              Kembalikan Kilau &{' '}
              <ShinyText text="Kebersihan Sepatu" shineColor="#93c5fd" className="text-gradient-blue" />{' '}
              Kesayangan Anda.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
              Treatment cuci sepatu profesional dengan formula pembersih premium ber-pH seimbang.
              Dilengkapi <strong className="text-emerald-400 font-semibold">layanan Free Pick-Up antar-jemput</strong>,
              garansi cuci ulang, serta <strong className="text-blue-400 font-semibold">sistem pelacakan status real-time</strong>.
            </p>

            {/* Real-time Tracking Quick Search Bar */}
            <div className="p-3 sm:p-3.5 rounded-3xl bg-[#0f172a]/95 border border-blue-900/60 shadow-2xl backdrop-blur-xl max-w-xl mx-auto lg:mx-0">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Masukkan No. Nota atau No. WhatsApp..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lacak Status</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Trust Badges Row with React Bits SpotlightCard & CountUp */}
            <div className="pt-6 sm:pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4.5 max-w-2xl sm:max-w-3xl mx-auto lg:mx-0 text-left">
              <SpotlightCard
                spotlightColor="rgba(59, 130, 246, 0.3)"
                className="p-4 sm:p-4.5 rounded-2xl sm:rounded-3xl bg-[#0b1328]/90 border border-slate-800/90 shadow-lg hover:border-blue-500/40 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>One Day</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight my-0.5">
                  <CountUp to={24} suffix=" Jam" />
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">Layanan kilat 24 jam</div>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(16, 185, 129, 0.3)"
                className="p-4 sm:p-4.5 rounded-2xl sm:rounded-3xl bg-[#0b1328]/90 border border-slate-800/90 shadow-lg hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Garansi</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight my-0.5">
                  <CountUp to={100} suffix="%" />
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">Cuci ulang gratis</div>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(245, 158, 11, 0.3)"
                className="p-4 sm:p-4.5 rounded-2xl sm:rounded-3xl bg-[#0b1328]/90 border border-slate-800/90 shadow-lg hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs mb-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>Rating</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight my-0.5">
                  <CountUp to={5} prefix="4.9 / " />
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">500+ Reviews</div>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(168, 85, 247, 0.3)"
                className="p-4 sm:p-4.5 rounded-2xl sm:rounded-3xl bg-[#0b1328]/90 border border-slate-800/90 shadow-lg hover:border-purple-500/40 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-purple-400 font-bold text-xs mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Sneakers</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight my-0.5">
                  <CountUp to={1500} suffix="+" />
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">Telah tertangani</div>
              </SpotlightCard>
            </div>
          </div>

          {/* Right Hero Column: Sneaker Visual with React Bits SpotlightCard */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-indigo-500/20 rounded-3xl blur-2xl -z-10" />

              <SpotlightCard
                spotlightColor="rgba(59, 130, 246, 0.35)"
                className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0f1b36] to-[#0a1024] border border-blue-500/40 p-6 shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono text-xs text-emerald-300 font-bold uppercase">
                      Live Laundry Queue
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                    2 Outlet: Surabaya & Gresik
                  </span>
                </div>

                {/* Sneaker Preview Image */}
                <div className="relative h-56 rounded-2xl overflow-hidden bg-[#070b14] border border-slate-800 flex items-center justify-center group">
                  <img
                    src="/images/shoe_1_after_0.png"
                    alt="Pristine Sneaker Clean"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Deep Clean & Unyellowing</div>
                      <div className="text-[10px] font-mono text-emerald-400">Hasil Selesai • Siap Diambil</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      100% Bersih
                    </span>
                  </div>
                </div>

                {/* 2 Outlets Mini Stat */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                  {settings.outlets?.map((outlet, idx) => (
                    <div
                      key={outlet.id}
                      className={`flex items-center justify-between ${
                        idx > 0 ? 'border-t border-slate-800/60 pt-2' : ''
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-slate-400 text-[10px] font-mono">
                          Cabang {outlet.city}:
                        </div>
                        <div className="font-semibold text-slate-200 text-[11px] truncate">
                          {outlet.address}
                        </div>
                      </div>
                      <a
                        href={outlet.mapsUrl || '#lokasi'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 font-mono text-[11px] underline font-bold flex-shrink-0"
                      >
                        Peta &rarr;
                      </a>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
