export interface FoodItem {
  id: number;
  name: string;
  image: string;
  price: string;
  rating: number;
  reviews: number;
  description: string;
  category?: string;
}

export interface Chef {
  id: number;
  name: string;
  image: string;
}

export interface NavLink {
  id: number;
  title: string;
  href: string;
}
