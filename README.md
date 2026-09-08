# Shoelabers Sneaker Care — Web Profile & Real-Time Order Tracking

Website profil toko, portofolio pengerjaan, dan sistem tracking pesanan cuci sepatu real-time untuk **Shoelabers Sneaker Care (Surabaya)**, terintegrasi langsung dengan database **Supabase Cloud** yang tersinkronisasi dengan web nota/kasir Shoelabers.

---

## Fitur Utama

1. **Real-Time Order Tracking (Fitur Inti)**:
   - Pencarian status pesanan menggunakan **Nomor Nota** (contoh: `SL-2026-228`), **Nomor WhatsApp**, atau **Nama Pelanggan**.
   - Stepper Timeline Interaktif:
     - `1. DITERIMA` (Sepatu masuk ke outlet & didokumentasikan)
     - `2. PENCUCIAN` (Treatment & chemical deep clean khusus)
     - `3. PENGERINGAN` (Pengeringan suhu terkontrol tanpa merusak lem)
     - `4. QUALITY_CHECK` (Inspeksi detail & finishing wangi anti-bakteri)
     - `5. SELESAI` (Siap diambil atau diantar)
   - Status Pembayaran: Lunas / Belum Lunas beserta rincian biaya.
   - Rincian Sepatu: Menampilkan brand, tipe sepatu, paket treatment, catatan teknisi, dan **dokumentasi foto Before & After**.
   - Tombol Cepat WhatsApp untuk konfirmasi pengambilan ke kasir.

2. **Portofolio Before & After Interaktif**:
   - Slider perbandingan interaktif dua sisi (*interactive split-image comparison slider*).
   - Menampilkan bukti nyata transformasi sepatu kotor/menguning menjadi bersih maksimal.

3. **Katalog Layanan & Daftar Harga Dinamis**:
   - Terhubung langsung dengan tabel `service_packages` di Supabase.
   - Filter kategori: Fast Clean, Deep Clean Regular, Deep Clean One Day, Unyellowing Treatment, Suede & Leather Care, Repaint & Restorasi Sol.
   - Tombol booking langsung terhubung ke WhatsApp dengan pesan otomatis terformat.

4. **Keunggulan & Alur Pengerjaan (Why Us & How It Works)**:
   - 4 Pilar keunggulan: Eco-Cleaner Formula, Online Tracking, Teknisi Berpengalaman, dan 100% Garansi Cuci Ulang.
   - 4 Langkah mudah bagi pelanggan baru.

5. **Testimoni Pelanggan & Ulasan Sosial**:
   - Ulasan sneakerheads, mahasiswa, dan pelanggan setia dengan rating 4.9/5.0.

6. **Lokasi Toko, Jam Buka & Portal Staf**:
   - Terintegrasi dengan tabel `store_settings` (Jl. Amuntai No 12, Surabaya).
   - Jam operasional: Setiap Hari (09.00 - 21.00 WIB).
   - Tautan rute Google Maps & akses ke Web Kasir internal.

---

## Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Glassmorphism & Neon Glow
- **Database**: Supabase Cloud (`@supabase/supabase-js`)
  - Tabel: `transactions`, `service_packages`, `store_settings`
- **Icons**: Lucide React
- **Animations**: Canvas Confetti & Smooth Transitions

---

## Cara Menjalankan Project

```bash
# 1. Masuk ke direktori
cd "C:\Users\KINDY\Documents\shoelbaersdb"

# 2. Jalankan development server
npm run dev

# 3. Build untuk produksi
npm run build
```

Website development server default berjalan di: `http://localhost:5174`
