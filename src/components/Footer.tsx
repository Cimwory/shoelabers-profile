import React from 'react';
import { StoreSettings } from '../types';


interface FooterProps {
  settings: StoreSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings:_settings }) => {
  return (
    <footer className="bg-[#050914] border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              SL
            </div>
            <div>
              <div className="font-display font-bold text-white text-sm tracking-tight">
                SHOELABERS SNEAKER CARE
              </div>
              <div className="text-[11px] text-slate-400">
                Layanan Cuci, Restorasi & Online Order Tracking
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium">
            <a href="#beranda" className="hover:text-white transition-colors">Beranda</a>
            <a href="#tracking" className="hover:text-white transition-colors">Lacak Pesanan</a>
            <a href="#layanan" className="hover:text-white transition-colors">Layanan & Harga</a>
            <a href="#portofolio" className="hover:text-white transition-colors">Portofolio</a>
            <a href="#lokasi" className="hover:text-white transition-colors">Kontak</a>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Shoelabers Sneaker Care. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Powered by Supabase Cloud & Dedicated for Sneaker Lovers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
