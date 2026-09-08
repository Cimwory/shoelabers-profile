import React, { useState } from 'react';
import {
  Sparkles,
  MoveHorizontal,
  CheckCircle,
  ZoomIn,
  X,
  SlidersHorizontal,
  Columns2,
  Layers,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { DecryptedText } from './ui/DecryptedText';

export interface ShowcaseItem {
  id: string;
  title: string;
  shoeType: string;
  treatment: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  isRealShopPhoto?: boolean;
  tags?: string[];
}

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'sc-real-nike',
    title: 'Deep Clean & Shape Reset Nike Suede & Mesh',
    shoeType: 'Nike Running / Lifestyle Suede & Mesh',
    treatment: 'Deep Clean Treatment + Shoe Tree Shape Maintain',
    beforeImg: '/images/BEFORE.jpg',
    afterImg: '/images/AFTER.jpg',
    description:
      'Kotoran daki debu jalanan pada material kombinasi suede lembut dan breathable mesh dibersihkan mendalam. Midsole dan tali dibersihkan tuntas, serta dipasangi shoe tree agar kontur bentuk sepatu kembali proporsional dan tidak kempot.',
    isRealShopPhoto: true,
    tags: ['Suede & Mesh Safe', 'Midsole Brightening', 'Shoe Tree Insertion'],
  },
  {
    id: 'sc-real-skechers',
    title: "Pembersihan Menyeluruh Skechers Slip-Ins Knit",
    shoeType: "Skechers Slip-Ins D'Lux Walker (Knit)",
    treatment: 'Deep Clean Knit Fabric & Foam Outsole',
    beforeImg: '/images/BEFORE_2.jpg',
    afterImg: '/images/AFTER_2.jpg',
    description:
      'Bahan rajut elastis yang berdebu kotor dibersihkan dengan foam cleaner khusus tanpa merusak kelenturan collar Slip-Ins. Midsole foam kembali putih cerah dan bagian insole disterilisasi anti-bakteri & bau.',
    isRealShopPhoto: true,
    tags: ['Knit Safe Cleaning', 'Heel Structure Safe', 'Odor Neutralizer'],
  },
  {
    id: 'sc-canvas',
    title: 'Restorasi Noda Lumpur & Canvas Sneaker',
    shoeType: 'Canvas / Daily Sneakers',
    treatment: 'Deep Clean Regular',
    beforeImg: '/images/shoe_1_before_0.png',
    afterImg: '/images/shoe_1_after_0.png',
    description:
      'Pembersihan mendalam mengangkat noda lumpur membandel pada upper kanvas dan midsole tanpa merusak serat kain.',
    isRealShopPhoto: false,
    tags: ['Stain Removal', 'Color Shield'],
  },
  {
    id: 'sc-sport',
    title: 'Pembersihan Noda Minyak & Dust Outsole',
    shoeType: 'Sport Running / Mesh',
    treatment: 'Fast Clean + Odor Neutralizer',
    beforeImg: '/images/shoe_2_before_0.png',
    afterImg: '/images/shoe_2_after_0.png',
    description:
      'Proses pembersihan kilat 24 jam mengembalikan kecerahan warna upper dan menghilangkan aroma tak sedap dengan formula anti-bakteri.',
    isRealShopPhoto: false,
    tags: ['Fast 24H', 'Anti-Bacterial'],
  },
];

export const BeforeAfterShowcase: React.FC = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side' | 'accordion'>('slider');
  const [zoomedModal, setZoomedModal] = useState<{
    isOpen: boolean;
    itemIndex: number;
    showAfter: boolean;
  } | null>(null);

  const current = SHOWCASE_ITEMS[activeItem] || SHOWCASE_ITEMS[0];

  const handleSliderMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  };

  const openLightbox = (itemIndex: number, showAfter: boolean = true) => {
    setZoomedModal({
      isOpen: true,
      itemIndex,
      showAfter,
    });
  };

  const zoomedItem = zoomedModal ? SHOWCASE_ITEMS[zoomedModal.itemIndex] : null;

  return (
    <section id="portofolio" className="py-20 sm:py-24 bg-[#080d1a] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-mono shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <DecryptedText text="DOKUMENTASI NYATA // REAL RESULTS" speed={35} />
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Portofolio & <span className="text-gradient-blue">Transformasi Sepatu</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Dokumentasi foto asli sebelum dan sesudah pencucian oleh tim teknisi Shoelabers. Lihat detail kebersihan upper, midsole, dan pemeliharaan bentuk sepatu.
          </p>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <div className="p-1 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-1 shadow-md">
            <button
              onClick={() => setViewMode('slider')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'slider'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Slider Interaktif</span>
            </button>

            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'side-by-side'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>

            <button
              onClick={() => setViewMode('accordion')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'accordion'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Accordion Gallery</span>
            </button>
          </div>
        </div>

        {/* Item Selector Tabs (Visible in Slider & Side-by-Side modes) */}
        {viewMode !== 'accordion' && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {SHOWCASE_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(idx);
                  setSliderPos(50);
                }}
                className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeItem === idx
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {item.isRealShopPhoto && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
                <span>
                  Kasus #{idx + 1}: {item.shoeType.split('/')[0].trim()}
                </span>
                {item.isRealShopPhoto && (
                  <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Foto Asli
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* 1. SLIDER INTERAKTIF MODE */}
        {viewMode === 'slider' && (
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden border border-blue-900/60 shadow-2xl bg-black select-none">
              
              <div
                className="relative h-[340px] sm:h-[480px] w-full cursor-ew-resize overflow-hidden"
                onMouseMove={handleSliderMove}
                onTouchMove={handleSliderMove}
              >
                {/* After Image (Full background) */}
                <img
                  src={current.afterImg}
                  alt="Hasil Sesudah Cuci"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold backdrop-blur-md shadow-lg flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SETELAH (AFTER)</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(activeItem, true);
                    }}
                    className="p-1.5 rounded-xl bg-black/70 border border-slate-700 text-slate-300 hover:text-white pointer-events-auto cursor-pointer"
                    title="Perbesar Foto After"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                {/* Before Image (Clipped via clipPath) */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img
                    src={current.beforeImg}
                    alt="Kondisi Sebelum Cuci"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-700 text-slate-300 text-xs font-mono font-bold backdrop-blur-md shadow-lg">
                      ❌ SEBELUM (BEFORE)
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(activeItem, false);
                      }}
                      className="p-1.5 rounded-xl bg-black/70 border border-slate-700 text-slate-300 hover:text-white pointer-events-auto cursor-pointer"
                      title="Perbesar Foto Before"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Draggable Divider Line & Knob */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] z-30 pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-blue-600 border-2 border-white shadow-2xl flex items-center justify-center text-white">
                    <MoveHorizontal className="w-4 h-4 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Showcase Caption */}
              <div className="p-5 sm:p-6 bg-[#0a1122] border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-blue-400 font-mono uppercase tracking-wide">
                      {current.treatment}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400">{current.shoeType}</span>
                    {current.isRealShopPhoto && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        Dokumentasi Workshop Shoelabers
                      </span>
                    )}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white">{current.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    {current.description}
                  </p>

                  {/* Badges */}
                  {current.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {current.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-mono"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-2 rounded-xl">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Warna & Bahan Aman</span>
                  </div>
                  <button
                    onClick={() => openLightbox(activeItem, true)}
                    className="flex items-center gap-1.5 text-xs font-mono text-blue-300 hover:text-white bg-blue-900/30 border border-blue-500/30 hover:border-blue-400 px-3 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Perbesar Resolusi</span>
                  </button>
                </div>
              </div>

            </div>

            <div className="text-center text-[11px] font-mono text-slate-500 mt-3 flex items-center justify-center gap-2">
              <MoveHorizontal className="w-3.5 h-3.5 text-blue-400" />
              <span>Geser handle ke kiri & kanan untuk melihat transformasi sebelum & sesudah.</span>
            </div>
          </div>
        )}

        {/* 2. SIDE-BY-SIDE MODE */}
        {viewMode === 'side-by-side' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Before Card */}
              <div
                onClick={() => openLightbox(activeItem, false)}
                className="group relative rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 shadow-xl cursor-pointer hover:border-slate-700 transition-all"
              >
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <img
                    src={current.beforeImg}
                    alt="Sebelum Cuci"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-slate-950/90 border border-slate-700 text-slate-300 text-xs font-mono font-bold shadow-md">
                    ❌ SEBELUM (BEFORE)
                  </div>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-xl bg-black/80 text-white text-xs font-mono flex items-center gap-1.5 border border-white/20">
                      <ZoomIn className="w-3.5 h-3.5" /> Klik untuk perbesar
                    </span>
                  </div>
                </div>
                <div className="p-4 border-t border-slate-800 text-xs">
                  <div className="font-mono text-slate-400 font-bold mb-1">KONDISI AWAL:</div>
                  <p className="text-slate-300">
                    Kotoran debu, lumpur, atau minyak menempel pada bagian upper dan midsole sepatu.
                  </p>
                </div>
              </div>

              {/* After Card */}
              <div
                onClick={() => openLightbox(activeItem, true)}
                className="group relative rounded-3xl overflow-hidden bg-slate-900/90 border border-emerald-500/40 shadow-xl cursor-pointer hover:border-emerald-500 transition-all ring-1 ring-emerald-500/30"
              >
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <img
                    src={current.afterImg}
                    alt="Setelah Cuci"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 text-xs font-mono font-bold shadow-md">
                    ✨ SETELAH (AFTER)
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-black/70 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                    100% Selesai
                  </div>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-950/90 text-emerald-200 text-xs font-mono flex items-center gap-1.5 border border-emerald-500/40">
                      <ZoomIn className="w-3.5 h-3.5" /> Klik untuk perbesar
                    </span>
                  </div>
                </div>
                <div className="p-4 border-t border-slate-800 text-xs bg-emerald-950/10">
                  <div className="font-mono text-emerald-400 font-bold mb-1">HASIL SHOELABERS:</div>
                  <p className="text-slate-300">{current.description}</p>
                </div>
              </div>

            </div>

            {/* Treatment Summary Bar */}
            <div className="p-5 rounded-2xl bg-[#0a1122] border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-white text-sm sm:text-base">{current.title}</h4>
                <div className="text-xs text-blue-400 font-mono mt-0.5">{current.treatment}</div>
              </div>
              <button
                onClick={() => openLightbox(activeItem, true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-blue-600/30"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Lihat Lightbox Fullscreen</span>
              </button>
            </div>
          </div>
        )}

        {/* 3. ACCORDION GALLERY MODE */}
        {viewMode === 'accordion' && (
          <div className="max-w-4xl mx-auto space-y-3">
            {SHOWCASE_ITEMS.map((item, idx) => {
              const isExpanded = activeItem === idx;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'bg-[#0d162d] border-blue-500/60 shadow-xl shadow-blue-950/40 ring-1 ring-blue-500/30'
                      : 'bg-slate-900/70 border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  {/* Accordion Header Row */}
                  <button
                    onClick={() => setActiveItem(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 transition-colors ${
                          isExpanded
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        #{idx + 1}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm sm:text-base text-white truncate">
                            {item.title}
                          </h4>
                          {item.isRealShopPhoto && (
                            <span className="hidden sm:inline-block text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              Foto Workshop Asli
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 font-mono truncate">{item.treatment}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                        {isExpanded ? 'Tutup Detail' : 'Buka Foto'}
                      </span>
                      <ChevronRight
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                          isExpanded ? 'rotate-90 text-blue-400' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-slate-800/80 space-y-4 animate-fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {/* Before Mini */}
                        <div
                          onClick={() => openLightbox(idx, false)}
                          className="group relative rounded-2xl overflow-hidden bg-black border border-slate-800 h-52 sm:h-64 cursor-pointer"
                        >
                          <img
                            src={item.beforeImg}
                            alt="Before"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-lg bg-slate-950/90 text-slate-300 text-[10px] font-mono font-bold">
                            ❌ SEBELUM (BEFORE)
                          </div>
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-2.5 py-1 rounded-lg bg-black/80 text-white text-[11px] font-mono flex items-center gap-1">
                              <ZoomIn className="w-3 h-3" /> Perbesar Foto
                            </span>
                          </div>
                        </div>

                        {/* After Mini */}
                        <div
                          onClick={() => openLightbox(idx, true)}
                          className="group relative rounded-2xl overflow-hidden bg-black border border-emerald-500/40 h-52 sm:h-64 cursor-pointer"
                        >
                          <img
                            src={item.afterImg}
                            alt="After"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-lg bg-emerald-950/90 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                            ✨ SETELAH (AFTER)
                          </div>
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-950/90 text-emerald-300 text-[11px] font-mono flex items-center gap-1 border border-emerald-500/40">
                              <ZoomIn className="w-3 h-3" /> Perbesar Foto
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                        {item.description}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags?.map((t, tidx) => (
                            <span
                              key={tidx}
                              className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            setViewMode('slider');
                            setSliderPos(50);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5" />
                          <span>Buka di Slider Interaktif</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Lightbox / Zoom Modal */}
      {zoomedModal && zoomedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setZoomedModal(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] rounded-3xl bg-[#090e1a] border border-blue-500/40 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 bg-[#0a1224]">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {zoomedItem.title}
                </h3>
                <p className="text-xs text-blue-400 font-mono mt-0.5">
                  {zoomedItem.treatment} • {zoomedItem.shoeType}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setZoomedModal(null)}
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Toggle Between Before & After */}
            <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-800/80 flex items-center justify-center gap-2">
              <button
                onClick={() =>
                  setZoomedModal({ ...zoomedModal, showAfter: false })
                }
                className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  !zoomedModal.showAfter
                    ? 'bg-rose-950 border border-rose-500/50 text-rose-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ❌ Lihat Foto Sebelum (Before)
              </button>

              <button
                onClick={() =>
                  setZoomedModal({ ...zoomedModal, showAfter: true })
                }
                className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  zoomedModal.showAfter
                    ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ✨ Lihat Foto Sesudah (After)
              </button>
            </div>

            {/* Full Image Container */}
            <div className="relative flex-1 min-h-[300px] sm:min-h-[480px] bg-black flex items-center justify-center p-2 overflow-hidden">
              <img
                src={zoomedModal.showAfter ? zoomedItem.afterImg : zoomedItem.beforeImg}
                alt={zoomedModal.showAfter ? 'Foto Sesudah' : 'Foto Sebelum'}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />

              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-slate-700 text-xs font-mono text-white">
                {zoomedModal.showAfter ? '✨ Hasil Selesai (After)' : '❌ Kondisi Awal (Before)'}
              </div>
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 bg-[#0a1224] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <p className="text-slate-300 max-w-2xl">{zoomedItem.description}</p>
              <button
                onClick={() => setZoomedModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-bold text-xs cursor-pointer flex-shrink-0"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

