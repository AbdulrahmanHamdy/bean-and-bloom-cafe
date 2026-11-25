export type MenuCategory = 'all' | 'coffee' | 'cold-drinks' | 'confectionery' | 'breakfast';

export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'cold-drinks' | 'confectionery' | 'breakfast';
  price: string;
  numericPrice: number;
  description: string;
  tag?: string;
  badge?: string;
  image: string;
  calories?: string;
  isHouseSignature?: boolean;
  notes?: string;
}

export interface ReservationData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  zone: 'Indoor Cozy Lounge' | 'Outdoor Sun Patio' | 'Barista Counter';
  notes?: string;
}

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
