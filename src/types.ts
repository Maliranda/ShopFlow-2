// src/types.ts
// Navigation parameter lists for all 3 navigators.
// Every screen prop must be typed using these — no `any` allowed.

// ─── Drawer (root) ───────────────────────────────────────────────────────────
export type RootDrawerParamList = {
  /** Houses the bottom tabs */
  Main: undefined;
  Profile: undefined;
  Settings: undefined;
};

// ─── Bottom Tabs ─────────────────────────────────────────────────────────────
export type MainTabParamList = {
  /** "Shop" tab contains a nested Stack navigator */
  Shop: undefined;
  Cart: undefined;
  Wishlist: undefined;
};

// ─── Shop Stack (nested inside the "Shop" tab) ───────────────────────────────
export type ShopStackParamList = {
  CategoryList: undefined;
  ProductList: {
    categoryId: string;
    categoryName: string;
  };
  ProductDetail: {
    productId: string;
    productName: string;
    productPrice: number;
    productImage: string;
    categoryName: string;
  };
};

// ─── Data models ─────────────────────────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  emoji: string;
  productCount: number;
  color: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  emoji: string;
  description: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
