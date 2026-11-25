import type { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // Confectionery & Artisan Treats (inspired by the user's rich chocolate cookie reference)
  {
    id: 'c1',
    name: 'Molten Caramel Chocolate Chunk Cookie',
    category: 'confectionery',
    price: '95 EGP',
    numericPrice: 95,
    description: 'Crispy outer crust, molten Belgian dark chocolate center, topped with slow-drizzled sea salt caramel.',
    tag: 'House Special',
    badge: 'Warmth & Delight',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
    calories: '420 kcal',
    isHouseSignature: true,
    notes: 'Baked fresh every 45 minutes in our Cairo ovens.'
  },
  {
    id: 'c2',
    name: 'Triple Fudge Brownie Tart',
    category: 'confectionery',
    price: '110 EGP',
    numericPrice: 110,
    description: 'Dark Valrhona ganache layered inside a buttery roasted almond sablé crust with gold leaf flakes.',
    tag: 'Chef Favorite',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    calories: '380 kcal',
    isHouseSignature: true
  },
  {
    id: 'c3',
    name: 'Pistachio Rose Brioche Knot',
    category: 'confectionery',
    price: '85 EGP',
    numericPrice: 85,
    description: 'Fluffy golden brioche infused with Damascus rose water and generous Sicilian pistachio cream.',
    tag: 'Signature',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    calories: '340 kcal'
  },
  {
    id: 'c4',
    name: 'Burnt Basque Honey Cheesecake',
    category: 'confectionery',
    price: '125 EGP',
    numericPrice: 125,
    description: 'Caramelized rustic crust with an ultra-creamy, molten cheese interior scented with organic clover honey.',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    calories: '410 kcal'
  },

  // Coffee & Hot Drinks
  {
    id: 'k1',
    name: 'Bean & Bloom Spanish Cortado',
    category: 'coffee',
    price: '75 EGP',
    numericPrice: 75,
    description: 'Equal parts Ethiopian single origin espresso and silky condensed milk, served in crystal glassware.',
    tag: 'Signature',
    badge: 'Artisan Pour',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    calories: '140 kcal',
    isHouseSignature: true
  },
  {
    id: 'k2',
    name: 'Cairo Cardamom Velvet Flat White',
    category: 'coffee',
    price: '80 EGP',
    numericPrice: 80,
    description: 'Micro-foamed whole milk poured over double ristretto, kissed with freshly ground green cardamom.',
    tag: 'Local Touch',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    calories: '120 kcal',
    isHouseSignature: true
  },
  {
    id: 'k3',
    name: 'Single Origin V60 Pour Over',
    category: 'coffee',
    price: '90 EGP',
    numericPrice: 90,
    description: 'Rotating seasonal microlots from Yirgacheffe and Huila. Clean floral aroma with bright citrus notes.',
    tag: 'Specialty',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    calories: '5 kcal'
  },
  {
    id: 'k4',
    name: 'Warm Belgian Hazelnut Mocha',
    category: 'coffee',
    price: '85 EGP',
    numericPrice: 85,
    description: 'Steamed milk, roasted hazelnut paste, and 70% dark Belgian cocoa blended with smooth espresso.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    calories: '260 kcal'
  },

  // Cold Drinks & Refreshers
  {
    id: 'd1',
    name: 'Salted Caramel Cold Foam Brew',
    category: 'cold-drinks',
    price: '90 EGP',
    numericPrice: 90,
    description: '18-hour slow steeped cold brew topped with thick velvety salted caramel cream foam.',
    tag: 'Crowd Favorite',
    badge: 'Chilled Craft',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    calories: '180 kcal',
    isHouseSignature: true
  },
  {
    id: 'd2',
    name: 'Iced Matcha Lavender Blossom',
    category: 'cold-drinks',
    price: '95 EGP',
    numericPrice: 95,
    description: 'Ceremonial grade Uji matcha whisked fresh over oat milk and subtle French lavender reduction.',
    tag: 'Zen Pick',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    calories: '130 kcal'
  },
  {
    id: 'd3',
    name: 'Hibiscus Pomegranate Tonic',
    category: 'cold-drinks',
    price: '70 EGP',
    numericPrice: 70,
    description: 'Egyptian organic karkadeh infused with cold-pressed pomegranate juice, sparkling water, and fresh mint.',
    tag: 'Refreshing',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    calories: '90 kcal'
  },

  // Breakfast & Artisanal Bakes
  {
    id: 'b1',
    name: 'Smashed Avocado & Whipped Feta Sourdough',
    category: 'breakfast',
    price: '135 EGP',
    numericPrice: 135,
    description: 'Toasted country sourdough topped with ripe Hass avocado, whipped Greek feta, dukkah spice, and poached farm egg.',
    tag: 'Brunch Icon',
    badge: 'Morning Joy',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    calories: '450 kcal',
    isHouseSignature: true
  },
  {
    id: 'b2',
    name: 'Truffle Scrambled Brioche Bun',
    category: 'breakfast',
    price: '145 EGP',
    numericPrice: 145,
    description: 'Silky French scrambled eggs with white truffle oil, caramelized shallots, and sharp aged cheddar in toasted brioche.',
    tag: 'Chef Choice',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    calories: '490 kcal'
  },
  {
    id: 'b3',
    name: 'Berry Acai & Granola Bloom Bowl',
    category: 'breakfast',
    price: '120 EGP',
    numericPrice: 120,
    description: 'Organic acai smoothie base, house-baked honey oat granola, chia seeds, fresh blueberries, and raw honey drizzle.',
    tag: 'Healthy',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80',
    calories: '320 kcal'
  }
];

export const CAFE_INFO = {
  name: 'Bean & Bloom Café',
  tagline: 'A little coffee, a lot of happiness.',
  address: '24 El-Gezira Street, Zamalek, Cairo, Egypt',
  phone: '+20 100 234 5678',
  whatsapp: '+201002345678',
  whatsappLink: 'https://wa.me/201002345678?text=Hello%20Bean%20%26%20Bloom%20Caf%C3%A9!%20I%20would%20like%20to%20inquire%20about...',
  email: 'hello@beanandbloomcafe.com',
  hours: {
    weekdays: '7:30 AM – 11:30 PM',
    weekends: '8:00 AM – 12:30 AM',
  },
  socials: {
    instagram: 'https://instagram.com/beanandbloom.cairo',
    facebook: 'https://facebook.com/beanandbloom.cairo'
  }
};
