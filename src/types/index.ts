export type OrderStatus = 'DITERIMA' | 'PENCUCIAN' | 'PENGERINGAN' | 'QUALITY_CHECK' | 'SELESAI';
export type PaymentStatus = 'LUNAS' | 'BELUM_LUNAS';
export type PaymentMethod = 'CASH' | 'TRANSFER' | 'QRIS';

export interface ShoeItem {
  id: string;
  brand: string;
  model: string;
  color?: string;
  packageId: string;
  packageName: string;
  price: number;
  beforePhotos?: string[];
  afterPhotos?: string[];
  notes?: string;
}

export interface Transaction {
  id: string;
  transactionNumber: string;
  customerName: string;
  customerPhone: string;
  transactionDate: string;
  completionDate?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  total: number;
  notes?: string;
  transferReceiptPath?: string;
  shoes: ShoeItem[];
  createdAt: string;
  userEmail?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: string;
  category: 'cleaning' | 'treatment' | 'repair';
  isPopular?: boolean;
}

export interface Outlet {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  formattedPhone: string;
  hours: string;
  mapsUrl: string;
  isPrimary?: boolean;
}

export interface StoreSettings {
  storeName: string;
  storePhone: string;
  storeAddress: string;
  instagram: string;
  qrisUrl?: string;
  receiptFooterMessage: string;
  outlets: Outlet[];
}
