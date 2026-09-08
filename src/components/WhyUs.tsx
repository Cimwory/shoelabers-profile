import React from 'react';
import { ShieldCheck, Zap, Sparkles, Smartphone, Award } from 'lucide-react';
import { SpotlightCard } from './ui/SpotlightCard';
import { DecryptedText } from './ui/DecryptedText';

export const WhyUs: React.FC = () => {
  const points = [
    {
      icon: Sparkles,
      title: 'Formula Ramah Bahan & Eco-Friendly',
      desc: 'Kami menggunakan sabun khusus sneaker ber-pH balance alami tanpa deterjen keras. Warna tidak pudar, lem tidak rapuh, dan material kanvas/suede tetap awet.',
      badge: 'Bahan Premium',
      color: 'rgba(59, 130, 246, 0.25)',
    },
    {
      icon: Smartphone,
      title: 'Transparansi Real-Time Tracking',
      desc: 'Pertama dan terlengkap di Surabaya & Gresik! Cek status pengerjaan sepatu dari HP Anda secara real-time. Tidak perlu repot bertanya berulang kali ke admin.',
      badge: 'Live Status Cloud',
      color: 'rgba(16, 185, 129, 0.25)',
    },
    {
      icon: Zap,
      title: 'One Day Service (Layanan Kilat)',
      desc: 'Butuh sepatu bersih mendadak untuk acara, kerja, atau kencan besok? Layanan kilat 24 jam siap mengeringkan sepatu secara sempurna tanpa bau apek.',
      badge: '24 Jam Jadi',
      color: 'rgba(245, 158, 11, 0.25)',
    },
    {
      icon: ShieldCheck,
      title: '100% Garansi Cuci Ulang',
      desc: 'Kepuasan Anda adalah prioritas utama. Jika sepatu dirasa masih belum bersih saat Anda terima, teknisi kami siap mencuci ulang gratis tanpa biaya tambahan.',
      badge: 'Garansi Puas',
      color: 'rgba(168, 85, 247, 0.25)',
    },
  ];

  return (
    <section id="keunggulan" className="py-20 bg-[#080d1a] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with React Bits DecryptedText */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-mono">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            <DecryptedText text="STANDAR LAYANAN // 100% GARANSI" speed={35} />
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Mengapa Sneakerheads Memilih <span className="text-gradient-blue">Shoelabers</span>?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Kombinasi ketelitian tangan teknisi ahli, formula chemical aman, dan teknologi tracking modern.
          </p>
        </div>

        {/* 4 Pillars Grid with React Bits SpotlightCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p, idx) => {
            const Icon = p.icon;
            return (
              <SpotlightCard
                key={idx}
                spotlightColor={p.color}
                className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300 space-y-3 hover:shadow-xl hover:shadow-blue-500/10 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  {p.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {p.desc}
                </p>
              </SpotlightCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};
