import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Transaction, ServicePackage, StoreSettings, Outlet } from '../types';

export const SUPABASE_URL = 'https://tcjgqyytzpmicuribqok.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_mZr4c4JL4-15JtofSX6vQw_x5Gc6-aQ';

let supabaseClient: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseClient;
};

// 2 Active Outlets (Surabaya & Gresik)
export const DEFAULT_OUTLETS: Outlet[] = [
  {
    id: 'surabaya',
    city: 'Surabaya',
    name: 'Outlet Surabaya (Keputih)',
    address: 'City Home Regency D4 Keputih, Sukolilo, Surabaya',
    phone: '081357859310',
    formattedPhone: '+62 813-5785-9310',
    hours: 'Senin — Minggu (09:00 - 21:00 WIB)',
    mapsUrl: 'https://maps.google.com/?q=' + encodeURIComponent('City Home Regency D4 Keputih, Sukolilo, Surabaya'),
    isPrimary: true,
  },
  {
    id: 'gresik',
    city: 'Gresik',
    name: 'Outlet Gresik (Manyar)',
    address: 'Jl. Amuntai No.12, Ponganganrejo, Yosowilangun, Kec. Manyar, Kabupaten Gresik, Jawa Timur 61151',
    phone: '081216242094',
    formattedPhone: '+62 812-1624-2094',
    hours: 'Senin — Minggu (09:00 - 21:00 WIB)',
    mapsUrl: 'https://maps.google.com/?q=' + encodeURIComponent('Jl. Amuntai No.12, Ponganganrejo, Yosowilangun, Kec. Manyar, Kabupaten Gresik, Jawa Timur 61151'),
    isPrimary: false,
  },
];

// Fallback Preset Packages if offline
export const DEFAULT_PACKAGES: ServicePackage[] = [
  {
    id: 'pkg-1',
    name: 'Fast Clean',
    price: 25000,
    description: 'Pembersihan kilat bagian upper dan midsole untuk sepatu kotor ringan harian. Cocok untuk Anda yang butuh cepat!',
    duration: '1 Hari (24 Jam)',
    category: 'cleaning',
    isPopular: false,
  },
  {
    id: 'pkg-2',
    name: 'Deep Clean Regular',
    price: 35000,
    description: 'Pembersihan menyeluruh mencakup Upper, Midsole, Outsole, Insole, Laces, plus Anti-Bakteri & Deodorizer.',
    duration: '2-3 Hari',
    category: 'cleaning',
    isPopular: true,
  },
  {
    id: 'pkg-3',
    name: 'Deep Clean One Day',
    price: 50000,
    description: 'Layanan Deep Clean kilat prioritas selesai dalam 24 jam dengan teknik pengeringan suhu khusus tanpa merusak lem.',
    duration: 'One Day (24 Jam)',
    category: 'cleaning',
    isPopular: false,
  },
  {
    id: 'pkg-4',
    name: 'Unyellowing Treatment',
    price: 60000,
    description: 'Treatment kimia khusus untuk menghilangkan noda kuning pada sol sepatu karet (oxidized boost/midsole) menjadi putih cerah kembali.',
    duration: '3-4 Hari',
    category: 'treatment',
    isPopular: true,
  },
  {
    id: 'pkg-5',
    name: 'Suede & Leather Care',
    price: 65000,
    description: 'Perawatan material khusus kulit asli dan suede menggunakan conditioner alami untuk melembapkan dan menjaga kelembutan bahan.',
    duration: '3 Hari',
    category: 'treatment',
    isPopular: false,
  },
  {
    id: 'pkg-6',
    name: 'Repaint & Restorasi Sol',
    price: 120000,
    description: 'Pengecatan ulang warna asli atau custom color pada upper/midsole serta reglue sol lepas dengan lem standar pabrik.',
    duration: '4-6 Hari',
    category: 'repair',
    isPopular: false,
  },
];

// Fallback Store Settings
export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'SHOELABERS SNEAKER CARE',
  storePhone: '081357859310',
  storeAddress: 'City Home Regency D4 Keputih, Sukolilo, Surabaya',
  instagram: '@shoelabers',
  qrisUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020101021126580014ID.LINKAJA.WWW01189360000201100000005204581253033605802ID5910SHOELABERS6008SURABAYA62070703A0163045A1A',
  receiptFooterMessage: 'Sepatu yang tidak diambil dalam 30 hari di luar tanggung jawab manajemen Shoelabers. Terima kasih atas kepercayaan Anda!',
  outlets: DEFAULT_OUTLETS,
};

// Search Transaction by Number, Phone, or Name
export const searchTransaction = async (query: string): Promise<{ data: Transaction | null; error: string | null }> => {
  const trimmed = query.trim();
  if (!trimmed) {
    return { data: null, error: 'Silakan masukkan nomor nota, nomor HP, atau nama pemesan.' };
  }

  try {
    const client = getSupabase();
    
    // 1. Try exact or partial transaction_number
    let { data, error } = await client
      .from('transactions')
      .select('*')
      .ilike('transaction_number', `%${trimmed}%`)
      .order('created_at', { ascending: false })
      .limit(1);

    // 2. If not found, try customer_phone
    if (!data || data.length === 0) {
      const cleanPhone = trimmed.replace(/[^0-9]/g, '');
      if (cleanPhone.length >= 4) {
        const phoneQuery = await client
          .from('transactions')
          .select('*')
          .ilike('customer_phone', `%${cleanPhone}%`)
          .order('created_at', { ascending: false })
          .limit(1);
        data = phoneQuery.data;
        error = phoneQuery.error;
      }
    }

    // 3. If not found, try customer_name
    if (!data || data.length === 0) {
      const nameQuery = await client
        .from('transactions')
        .select('*')
        .ilike('customer_name', `%${trimmed}%`)
        .order('created_at', { ascending: false })
        .limit(1);
      data = nameQuery.data;
      error = nameQuery.error;
    }

    if (error) {
      console.error('Supabase query error:', error);
      return { data: null, error: `Gagal mencari data: ${error.message}` };
    }

    if (!data || data.length === 0) {
      return { data: null, error: `Pesanan dengan kata kunci "${trimmed}" tidak ditemukan. Pastikan nomor nota atau nomor HP sudah benar.` };
    }

    const row = data[0];
    const trx: Transaction = {
      id: row.id,
      transactionNumber: row.transaction_number,
      customerName: row.customer_name,
      customerPhone: row.customer_phone,
      transactionDate: row.transaction_date,
      completionDate: row.completion_date,
      status: row.status,
      paymentStatus: row.payment_status,
      paymentMethod: row.payment_method,
      subtotal: Number(row.subtotal || 0),
      discount: Number(row.discount || 0),
      total: Number(row.total || 0),
      notes: row.notes,
      transferReceiptPath: row.transfer_receipt_path,
      shoes: Array.isArray(row.shoes) ? row.shoes : [],
      createdAt: row.created_at,
      userEmail: row.user_email,
    };

    return { data: trx, error: null };
  } catch (err: any) {
    console.error('Fetch error:', err);
    return { data: null, error: err?.message || 'Terjadi gangguan jaringan saat memuat data.' };
  }
};

// Fetch Service Packages
export const fetchServicePackages = async (): Promise<ServicePackage[]> => {
  try {
    const client = getSupabase();
    const { data, error } = await client
      .from('service_packages')
      .select('*')
      .order('price', { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_PACKAGES;
    }

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      price: Number(item.price),
      description: item.description || '',
      duration: item.duration || '2-3 Hari',
      category: item.category || 'cleaning',
      isPopular: Boolean(item.is_popular),
    }));
  } catch (err) {
    console.warn('Using default service packages due to network error', err);
    return DEFAULT_PACKAGES;
  }
};

// Fetch Store Settings
export const fetchStoreSettings = async (): Promise<StoreSettings> => {
  try {
    const client = getSupabase();
    const { data, error } = await client
      .from('store_settings')
      .select('*')
      .limit(1)
      .single();

    if (error || !data) {
      return DEFAULT_STORE_SETTINGS;
    }

    return {
      storeName: data.store_name || DEFAULT_STORE_SETTINGS.storeName,
      storePhone: data.store_phone || DEFAULT_STORE_SETTINGS.storePhone,
      storeAddress: data.store_address || DEFAULT_STORE_SETTINGS.storeAddress,
      instagram: data.instagram || DEFAULT_STORE_SETTINGS.instagram,
      qrisUrl: data.qris_url || DEFAULT_STORE_SETTINGS.qrisUrl,
      receiptFooterMessage: data.receipt_footer_message || DEFAULT_STORE_SETTINGS.receiptFooterMessage,
      outlets: DEFAULT_OUTLETS,
    };
  } catch (err) {
    console.warn('Using default store settings', err);
    return DEFAULT_STORE_SETTINGS;
  }
};

// Utility formatters
export const formatRupiah = (val: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val);
};

export const formatDateTime = (dateStr?: string): string => {
  if (!dateStr) return '-';
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateStr;
  }
};

export const getWhatsAppLink = (phone: string, message: string): string => {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  }
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
};
