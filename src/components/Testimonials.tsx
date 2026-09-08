import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Dimas Kurniawan',
      role: 'Sneaker Collector Surabaya',
      shoe: 'Nike Air Jordan 1 Lost & Found',
      content: 'Sol sepatu yang menguning parah berhasil putih kembali setelah di-treatment unyellowing di Shoelabers! Pengerjaan rapi dan yang paling keren bisa dilacak langsung dari web.',
      rating: 5,
    },
    {
      name: 'Nabila Putri',
      role: 'Mahasiswa PENS',
      shoe: 'Converse 70s Parchment',
      content: 'Paket Fast Clean-nya beneran one day service! Sepatu kanvas putih saya yang kena noda becek jadi kinclong wangi lagi pas mau dipakai sidang.',
      rating: 5,
    },
    {
      name: 'Kevin Santoso',
      role: 'Pegawai Swasta',
      shoe: 'Adidas Samba OG & New Balance 550',
      content: 'Bahan suede di NB saya nggak kaku sama sekali setelah dicuci. Wanginya enak dan tahan lama. Sudah jadi langganan tetap tiap bulan!',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-[#080d1a] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-mono">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.9 DARI 500+ ULASAN GOOGLE & INSTAGRAM</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Apa Kata <span className="text-gradient-blue">Pelanggan Setia Kami</span>?
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 relative space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-700" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans italic">
                  "{r.content}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{r.name}</div>
                  <div className="text-[11px] text-slate-500">{r.role}</div>
                </div>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-900/50">
                  {r.shoe}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
