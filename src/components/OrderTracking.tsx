import React, { useState, useEffect } from 'react';
import { 
  Search, Clock, AlertCircle, 
  MessageCircle, Calendar, 
  Package, ZoomIn, X, RefreshCw
} from 'lucide-react';
import { Transaction, OrderStatus, StoreSettings } from '../types';
import { searchTransaction, formatRupiah, formatDateTime, getWhatsAppLink } from '../services/supabase';
import confetti from 'canvas-confetti';

// React Bits UI Components
import { SpotlightCard } from './ui/SpotlightCard';
import { ShinyText } from './ui/ShinyText';
import { DecryptedText } from './ui/DecryptedText';

interface OrderTrackingProps {
  initialQuery?: string;
  settings: StoreSettings;
}

const STATUS_STEPS: { key: OrderStatus; label: string; desc: string }[] = [
  { key: 'DITERIMA', label: '1. Diterima', desc: 'Sepatu masuk & didata teknisi' },
  { key: 'PENCUCIAN', label: '2. Pencucian', desc: 'Treatment deep clean khusus' },
  { key: 'PENGERINGAN', label: '3. Pengeringan', desc: 'Mesin suhu khusus anti-rusak' },
  { key: 'QUALITY_CHECK', label: '4. Quality Check', desc: 'Inspeksi & finishing wangi' },
  { key: 'SELESAI', label: '5. Selesai', desc: 'Siap diambil di outlet' },
];

export const OrderTracking: React.FC<OrderTrackingProps> = ({ initialQuery = '', settings }) => {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Transaction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [zoomedPhoto, setZoomedPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = async (searchKeyword: string) => {
    if (!searchKeyword.trim()) return;
    setLoading(true);
    setError(null);

    const { data, error: err } = await searchTransaction(searchKeyword);
    setLoading(false);

    if (err) {
      setError(err);
      setResult(null);
    } else if (data) {
      setResult(data);
      setError(null);
      if (data.status === 'SELESAI') {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
        });
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  const getCurrentStepIndex = (status: OrderStatus): number => {
    const idx = STATUS_STEPS.findIndex((s) => s.key === status);
    return idx !== -1 ? idx : 0;
  };

  const currentStep = result ? getCurrentStepIndex(result.status) : 0;

  return (
    <section id="tracking" className="py-20 bg-[#070c17]/90 relative border-y border-slate-800/80">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with React Bits DecryptedText */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-mono">
            <Search className="w-3.5 h-3.5 text-blue-400" />
            <DecryptedText text="REAL-TIME CLOUD TRACKING // SUPABASE" speed={35} />
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Lacak Status <span className="text-gradient-blue">Cucian Sepatu</span> Anda
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Masukkan Nomor Nota (misal: <span className="font-mono text-blue-400 font-bold">SL-2026-228</span>),
            nomor WhatsApp, atau nama Anda untuk melihat proses pencucian secara transparan.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearchSubmit} className="relative flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Masukkan No. Nota atau No. WhatsApp..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#0f172a] border border-blue-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 font-mono shadow-xl transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Memeriksa...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Cari Sekarang</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold mb-0.5">Pesanan Tidak Ditemukan</div>
              <div className="text-rose-300/90 text-xs">{error}</div>
            </div>
          </div>
        )}

        {/* Tracking Result Card wrapped with React Bits SpotlightCard */}
        {result && (
          <SpotlightCard
            spotlightColor="rgba(59, 130, 246, 0.25)"
            className="rounded-3xl bg-[#0c1427] border border-blue-500/40 shadow-2xl overflow-hidden animate-fadeIn"
          >
            {/* Card Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-blue-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    {result.transactionNumber}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold ${
                      result.status === 'SELESAI'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {result.status === 'SELESAI' ? (
                      <ShinyText text="✨ SELESAI SIAP DIAMBIL" shineColor="#a7f3d0" />
                    ) : (
                      '⚡ SEDANG DIKERJAKAN'
                    )}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {result.customerName}
                </h3>
              </div>

              {/* Status Badge & Payment */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[11px] text-slate-400 font-mono">Status Pembayaran</div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold font-mono ${
                      result.paymentStatus === 'LUNAS'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {result.paymentStatus} ({formatRupiah(result.total)})
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Step Progress Tracker */}
            <div className="p-6 sm:p-8 bg-slate-900/40 border-b border-slate-800">
              <div className="mb-4 text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Tahapan Pengerjaan Sepatu (Real-Time)</span>
              </div>

              {/* Steps Progress Bar */}
              <div className="relative">
                <div className="hidden md:block absolute top-5 left-8 right-8 h-1 bg-slate-800 -z-0">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-700"
                    style={{
                      width: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                  {STATUS_STEPS.map((step, idx) => {
                    const isDone = idx <= currentStep;
                    const isCurrent = idx === currentStep;

                    return (
                      <div
                        key={step.key}
                        className={`p-3 rounded-2xl border transition-all ${
                          isCurrent
                            ? 'bg-blue-950/80 border-blue-400 shadow-lg shadow-blue-500/20 scale-[1.02]'
                            : isDone
                            ? 'bg-slate-900/90 border-emerald-500/40 text-slate-200'
                            : 'bg-slate-900/30 border-slate-800/80 text-slate-500 opacity-60'
                        }`}
                      >
                        <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                              isCurrent
                                ? 'bg-blue-500 text-white animate-bounce'
                                : isDone
                                ? 'bg-emerald-500 text-slate-950'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            {isDone ? '✓' : idx + 1}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{step.label}</div>
                            <div className="text-[11px] text-slate-400 leading-tight">{step.desc}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Note */}
              <div className="mt-5 p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>
                    Masuk: <strong>{formatDateTime(result.transactionDate)}</strong>
                  </span>
                </div>
                {result.completionDate && (
                  <div className="font-mono text-emerald-400 font-semibold">
                    Estimasi Selesai: {formatDateTime(result.completionDate)}
                  </div>
                )}
              </div>
            </div>

            {/* Shoes Details in the Order */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold font-mono text-slate-200 flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-400" />
                  <span>Daftar Sepatu ({result.shoes.length} Pasang)</span>
                </h4>
                <span className="text-xs text-slate-400 font-mono">
                  Metode: {result.paymentMethod}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.shoes.map((shoe, idx) => (
                  <div
                    key={shoe.id || idx}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                          Sepatu #{idx + 1}
                        </span>
                        <h5 className="text-sm font-bold text-white mt-1">
                          {shoe.brand} {shoe.model}
                        </h5>
                        {shoe.color && (
                          <div className="text-xs text-slate-400">Warna: {shoe.color}</div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-emerald-400 font-mono">
                          {formatRupiah(shoe.price)}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          {shoe.packageName}
                        </span>
                      </div>
                    </div>

                    {shoe.notes && (
                      <div className="p-2.5 rounded-lg bg-slate-950/60 text-xs text-slate-300 border border-slate-800/80">
                        <span className="text-slate-400 font-semibold">Catatan: </span>
                        {shoe.notes}
                      </div>
                    )}

                    {/* Before & After Photo Evidence */}
                    {((shoe.beforePhotos && shoe.beforePhotos.length > 0) ||
                      (shoe.afterPhotos && shoe.afterPhotos.length > 0)) && (
                      <div className="space-y-2 pt-2 border-t border-slate-800/80">
                        <div className="text-[11px] font-mono text-slate-400">
                          Dokumentasi Pengerjaan:
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {shoe.beforePhotos && shoe.beforePhotos.length > 0 && (
                            <div className="space-y-1">
                              <span className="text-[10px] text-amber-400 font-mono">Foto Awal (Before)</span>
                              <div
                                onClick={() => setZoomedPhoto(shoe.beforePhotos![0])}
                                className="relative h-24 rounded-lg overflow-hidden bg-black/50 border border-slate-800 cursor-pointer group"
                              >
                                <img
                                  src={shoe.beforePhotos[0]}
                                  alt="Before Clean"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <ZoomIn className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            </div>
                          )}

                          {shoe.afterPhotos && shoe.afterPhotos.length > 0 && (
                            <div className="space-y-1">
                              <span className="text-[10px] text-emerald-400 font-mono">Foto Selesai (After)</span>
                              <div
                                onClick={() => setZoomedPhoto(shoe.afterPhotos![0])}
                                className="relative h-24 rounded-lg overflow-hidden bg-black/50 border border-slate-800 cursor-pointer group"
                              >
                                <img
                                  src={shoe.afterPhotos[0]}
                                  alt="After Clean"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <ZoomIn className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-400 font-sans">
                  Ada pertanyaan mengenai pesanan Anda? Hubungi kasir Shoelabers secara langsung.
                </div>

                <a
                  href={getWhatsAppLink(
                    settings.storePhone,
                    `Halo Shoelabers! Saya ingin menanyakan pesanan dengan Nomor Nota: ${result.transactionNumber} atas nama ${result.customerName}. Apakah sudah bisa diambil?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konfirmasi via WhatsApp</span>
                </a>
              </div>
            </div>
          </SpotlightCard>
        )}

      </div>

      {/* Full Resolution Photo Modal */}
      {zoomedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoomedPhoto(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomedPhoto(null)}
              className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={zoomedPhoto}
              alt="Zoomed Shoe Photo"
              className="w-full max-h-[80vh] object-contain rounded-2xl border border-slate-700 shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
