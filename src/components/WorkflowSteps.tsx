import React from 'react';
import { PackageOpen, Camera, Search, Sparkles } from 'lucide-react';

export const WorkflowSteps: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: PackageOpen,
      title: 'Drop Sepatu di Outlet',
      desc: 'Bawa sepatu kotor Anda ke outlet Shoelabers di Jl. Amuntai No 12 atau request layanan pick-up kurir kami.',
    },
    {
      num: '02',
      icon: Camera,
      title: 'Nota & Foto Awal',
      desc: 'Teknisi menginspeksi kondisi sepatu, mengambil foto before, dan menerbitkan Nomor Nota Digital.',
    },
    {
      num: '03',
      icon: Search,
      title: 'Pantau via Tracking Online',
      desc: 'Cek tahapan pencucian, pengeringan, dan quality check langsung dari website ini secara transparan.',
    },
    {
      num: '04',
      icon: Sparkles,
      title: 'Ambil & Siap Dipakai',
      desc: 'Sepatu selesai dikerjakan, bersih maksimal, wangi anti-bakteri, dan siap melangkah bersama Anda!',
    },
  ];

  return (
    <section className="py-20 bg-[#070b16] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-mono">
            <span>ALUR MUDAH & CEPAT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Cara Menggunakan <span className="text-gradient-blue">Layanan Shoelabers</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Hanya 4 langkah mudah dari sepatu kotor hingga bersih maksimal seperti baru.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 relative space-y-3"
              >
                <div className="font-mono text-3xl font-extrabold text-blue-500/20">
                  {s.num}
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
