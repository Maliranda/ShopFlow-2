# ShopFlow — Group 1: Navigation Patterns

A mini e-commerce app demonstrating all 5 required React Navigation capabilities.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start Expo dev server
npx expo start

# 3. Open on device
#    → Scan the QR code with Expo Go (iOS or Android)
#    → Press 'a' for Android emulator
#    → Press 'i' for iOS simulator (requires Xcode)
```

---

## Capabilities demonstrated

| # | Capability | Where |
|---|-----------|-------|
| 1 | **Stack navigation + screen transitions** | `App.tsx` → `ShopStack`, all 3 stack screens |
| 2 | **Bottom tab navigation** | `App.tsx` → `MainTabs`, Shop / Cart / Wishlist tabs |
| 3 | **Drawer navigation (side menu)** | `App.tsx` → `RootDrawer`, Profile + Settings |
| 4 | **Parameter passing between screens** | `CategoryListScreen` → `ProductListScreen` → `ProductDetailScreen` |
| 5 | **Nested navigators (stack inside tabs inside drawer)** | `App.tsx` — ShopStack is a component used as a Tab.Screen |

---

## Architecture

```
App.tsx
└─ <NavigationContainer>          ← provides navigation context to entire tree
   └─ DrawerNavigator             ← CAPABILITY 3: drawer navigation
      ├─ "Main" → MainTabs()
      │   └─ BottomTabNavigator   ← CAPABILITY 2: tab navigation
      │       ├─ "Shop" → ShopStack()   ← CAPABILITY 5: nested navigators
      │       │   └─ StackNavigator    ← CAPABILITY 1: stack + transitions
      │       │       ├─ CategoryListScreen
      │       │       ├─ ProductListScreen   ← receives { categoryId, categoryName }
      │       │       └─ ProductDetailScreen ← receives { productId, productName, ... }
      │       ├─ "Cart"     → CartScreen
      │       └─ "Wishlist" → WishlistScreen
      ├─ "Profile"  → ProfileScreen   (drawer only)
      └─ "Settings" → SettingsScreen  (drawer only)
```

### Parameter flow (CAPABILITY 4)

```
CategoryListScreen
  navigation.navigate('ProductList', { categoryId, categoryName })
    ↓
ProductListScreen  [receives via route.params]
  navigation.navigate('ProductDetail', { productId, productName, productPrice, productImage, categoryName })
    ↓
ProductDetailScreen  [receives all 5 params via route.params]
```

---

## Project structure

```
ShopFlow/
├── App.tsx                        ← root: all 3 navigators composed here
├── app.json                       ← Expo config
├── package.json
├── tsconfig.json
├── babel.config.js
└── src/
    ├── types.ts                   ← all TypeScript types + ParamLists
    ├── data/
    │   ├── mockData.ts            ← 5 categories, 20 products
    │   └── CartContext.tsx        ← global cart state (Context + useReducer)
    ├── screens/
    │   ├── CategoryListScreen.tsx ← stack root, sends params
    │   ├── ProductListScreen.tsx  ← receives + re-sends params
    │   ├── ProductDetailScreen.tsx← receives params, displays them
    │   ├── CartScreen.tsx         ← tab screen, reads cart context
    │   ├── WishlistScreen.tsx     ← tab screen
    │   ├── ProfileScreen.tsx      ← drawer-only screen
    │   └── SettingsScreen.tsx     ← drawer-only screen
    └── components/
        └── StarRating.tsx         ← reusable rating component
```

---

## TypeScript

- All navigator param lists defined in `src/types.ts`
- Every screen component typed with `NativeStackScreenProps<ParamList, 'ScreenName'>`
- `route.params` is fully typed — no `any` anywhere in the codebase
- Strict mode enabled in `tsconfig.json`

---

## Team roles

| Person | Responsibility |
|--------|---------------|
| **Person 1** | Project setup, `App.tsx`, `types.ts`, navigator composition |
| **Person 2** | `CategoryListScreen`, `ProductListScreen`, `ProductDetailScreen`, param passing |
| **Person 3** | `CartScreen`, `WishlistScreen`, `CartContext.tsx`, tab bar styling |
| **Person 4** | `ProfileScreen`, `SettingsScreen`, `StarRating`, `mockData.ts`, README, demo prep |

---

## Demo flow

1. Open app → show 3 bottom tabs (tab navigation)
2. Tap a category → product list (stack push, back button appears)
3. Tap a product → detail screen (stack push, show params debug box)
4. Swipe right or tap hamburger → drawer opens (drawer navigation)
5. Tap Profile → show it's only reachable via drawer
6. Show `App.tsx` → walk through the nested structure

---

## Key packages

| Package | Purpose |
|---------|---------|
| `@react-navigation/native` | Core NavigationContainer + hooks |
| `@react-navigation/stack` | Stack navigator with transitions |
| `@react-navigation/bottom-tabs` | Bottom tab navigator |
| `@react-navigation/drawer` | Drawer (side menu) navigator |
| `react-native-screens` | Native screen components for performance |
| `react-native-safe-area-context` | Safe area insets on all devices |
| `react-native-gesture-handler` | Required by drawer navigator |
| `react-native-reanimated` | Required by drawer + custom transitions |
