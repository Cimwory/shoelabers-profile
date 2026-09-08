import React, { useState } from 'react';
import { Sparkles, MoveHorizontal, CheckCircle } from 'lucide-react';
import { DecryptedText } from './ui/DecryptedText';

interface ShowcaseItem {
  id: string;
  title: string;
  shoeType: string;
  treatment: string;
  beforeImg: string;
  afterImg: string;
  description: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'sc-1',
    title: 'Restorasi Noda Lumpur & Canvas Sneaker',
    shoeType: 'Canvas / Daily Sneakers',
    treatment: 'Deep Clean Regular',
    beforeImg: '/images/shoe_1_before_0.png',
    afterImg: '/images/shoe_1_after_0.png',
    description: 'Pembersihan mendalam mengangkat noda lumpur membandel pada upper kanvas dan midsole tanpa merusak serat kain.',
  },
  {
    id: 'sc-2',
    title: 'Pembersihan Noda Minyak & Dust Outsole',
    shoeType: 'Sport Running / Mesh',
    treatment: 'Fast Clean + Odor Neutralizer',
    beforeImg: '/images/shoe_2_before_0.png',
    afterImg: '/images/shoe_2_after_0.png',
    description: 'Proses pembersihan kilat 24 jam mengembalikan kecerahan warna upper dan menghilangkan aroma tak sedap dengan formula anti-bakteri.',
  },
];

export const BeforeAfterShowcase: React.FC = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100

  const current = SHOWCASE_ITEMS[activeItem] || SHOWCASE_ITEMS[0];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  };

  return (
    <section id="portofolio" className="py-20 bg-[#080d1a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with React Bits DecryptedText */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <DecryptedText text="TRANSFORMASI SEPATU // PROVEN RESULTS" speed={35} />
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Portofolio & <span className="text-gradient-blue">Transformasi Sepatu</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Geser slider ke kiri dan ke kanan untuk melihat perbandingan langsung antara kondisi awal kotor dan hasil bersih maksimal dari Shoelabers.
          </p>
        </div>

        {/* Item Selector Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {SHOWCASE_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(idx);
                setSliderPos(50);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeItem === idx
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Kasus #{idx + 1}: {item.shoeType}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Slider */}
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-blue-900/50 shadow-2xl bg-black select-none">
            
            <div
              className="relative h-[340px] sm:h-[440px] w-full cursor-ew-resize overflow-hidden"
              onMouseMove={handleSliderMove}
              onTouchMove={handleSliderMove}
            >
              {/* After Image (Background full) */}
              <img
                src={current.afterImg}
                alt="After Clean"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold backdrop-blur-md shadow-lg">
                ✨ SETELAH (AFTER)
              </div>

              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src={current.beforeImg}
                  alt="Before Clean"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-lg bg-slate-950/90 border border-slate-700 text-slate-300 text-xs font-mono font-bold backdrop-blur-md shadow-lg">
                  ❌ SEBELUM (BEFORE)
                </div>
              </div>

              {/* Draggable Divider Line & Knob */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-30 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-blue-600 border-2 border-white shadow-xl flex items-center justify-center text-white">
                  <MoveHorizontal className="w-4 h-4 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Showcase Caption */}
            <div className="p-5 sm:p-6 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-blue-400 font-mono uppercase">
                    {current.treatment}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400">{current.shoeType}</span>
                </div>
                <h4 className="text-base font-bold text-white">{current.title}</h4>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">{current.description}</p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-2 rounded-xl flex-shrink-0">
                <CheckCircle className="w-4 h-4" />
                <span>Tekstur & Warna Terjaga</span>
              </div>
            </div>

          </div>

          <div className="text-center text-[11px] font-mono text-slate-500 mt-3">
            💡 Geser handle di atas gambar untuk melihat perubahan before/after secara interaktif.
          </div>
        </div>

      </div>
    </section>
  );
};
