export type ProductCategory = 
  | 'Smartphones'
  | 'Laptops'
  | 'Gaming'
  | 'Headphones'
  | 'Smart Watches'
  | 'Accessories'
  | 'Monitors'
  | 'Cameras'
  | 'Computer Accessories';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages?: string[];
  description: string;
  features: string[];
  specs: ProductSpec[];
  inStock: boolean;
  stockCount: number;
  isPopular?: boolean;
  isSpecialOffer?: boolean;
  colors?: string[];
  brand: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  itemCount: number;
  icon: string;
  tagline: string;
  image: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  avatar: string;
  productName?: string;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: 'card' | 'apple_pay' | 'google_pay' | 'cash_on_delivery';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  notes?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'google' | 'email';
  isGoogleVerified?: boolean;
  tier: string;
  points: number;
  joinedDate: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  isAdmin?: boolean;
  role?: 'admin' | 'user';
}

export const SOLE_ADMIN_EMAIL = 'tavadzeluka520@gmail.com';
export const SOLE_ADMIN_NAME = 'Luka Tavadze';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  source?: string;
}
