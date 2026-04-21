// App.tsx
// Navigation structure:
//   Custom DrawerLayout (no reanimated required)
//     └─ BottomTabNavigator
//          └─ StackNavigator (nested inside "Shop" tab)
//
// CAPABILITY: Drawer navigation — implemented with React Native's built-in
// DrawerLayoutAndroid on Android, and a custom Animated.View panel on iOS.
// No react-native-reanimated or @react-navigation/drawer needed.

import 'react-native-gesture-handler';
import React, { useRef, useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  Animated, Dimensions, TouchableWithoutFeedback,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { CartProvider, useCart } from './src/data/CartContext';
import type { MainTabParamList, ShopStackParamList } from './src/types';
import { DrawerContext } from './src/navigation/DrawerContext';

import { CategoryListScreen }  from './src/screens/CategoryListScreen';
import { ProductListScreen }   from './src/screens/ProductListScreen';
import { ProductDetailScreen } from './src/screens/ProductDetailScreen';
import { CartScreen }          from './src/screens/CartScreen';
import { WishlistScreen }      from './src/screens/WishlistScreen';
import { ProfileScreen }       from './src/screens/ProfileScreen';
import { SettingsScreen }      from './src/screens/SettingsScreen';

const DRAWER_WIDTH = 260;

const Tab   = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<ShopStackParamList>();

// ─── CAPABILITY: Stack navigation + screen transitions ───────────────────────
function ShopStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle:      { backgroundColor: '#0F6E56' },
        headerTintColor:  '#FFFFFF',
        headerTitleStyle: { fontWeight: '600' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="CategoryList"  component={CategoryListScreen}  options={{ title: 'Shop' }} />
      <Stack.Screen name="ProductList"   component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

// ─── CAPABILITY: Bottom tab navigation ───────────────────────────────────────
function MainTabs() {
  const { totalItems } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor:   '#0F6E56',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { borderTopWidth: 0.5, borderTopColor: '#E0E0E0' },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Shop')     iconName = focused ? 'storefront' : 'storefront-outline';
          if (route.name === 'Cart')     iconName = focused ? 'cart'       : 'cart-outline';
          if (route.name === 'Wishlist') iconName = focused ? 'heart'      : 'heart-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* CAPABILITY: Nested navigator — ShopStack lives inside this Tab.Screen */}
      <Tab.Screen name="Shop"     component={ShopStack} options={{ title: 'Shop' }} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#0F6E56' },
          headerTintColor: '#FFF',
          title: 'My Cart',
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#0F6E56' },
          headerTintColor: '#FFF',
          title: 'Wishlist',
        }}
      />
    </Tab.Navigator>
  );
}

// ─── CAPABILITY: Drawer navigation ───────────────────────────────────────────
// Custom Animated drawer — works on iOS and Android, no reanimated needed.
type DrawerScreen = 'Main' | 'Profile' | 'Settings';

function CustomDrawer() {
  const [activeScreen, setActiveScreen] = useState<DrawerScreen>('Main');
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
    Animated.parallel([
      Animated.timing(translateX,    { toValue: 0,   duration: 250, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0.5, duration: 250, useNativeDriver: true }),
    ]).start();
  }, [translateX, overlayOpacity]);

  const closeDrawer = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateX,    { toValue: -DRAWER_WIDTH, duration: 220, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0,            duration: 220, useNativeDriver: true }),
    ]).start(() => setDrawerOpen(false));
  }, [translateX, overlayOpacity]);

  const navigate = (screen: DrawerScreen) => {
    setActiveScreen(screen);
    closeDrawer();
  };

  const renderScreen = () => {
    if (activeScreen === 'Profile')  return <ProfileScreen />;
    if (activeScreen === 'Settings') return <SettingsScreen />;
    return <MainTabs />;
  };

  const drawerItems: { screen: DrawerScreen; label: string; icon: string }[] = [
    { screen: 'Main',     label: 'Home',     icon: '🏠' },
    { screen: 'Profile',  label: 'Profile',  icon: '👤' },
    { screen: 'Settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
      <View style={styles.root}>
        {/* ── Header bar ── */}
        <SafeAreaView style={styles.headerSafe}>
          <View style={styles.header}>
            <TouchableOpacity onPress={openDrawer} style={styles.menuBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="menu" size={26} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {activeScreen === 'Main' ? 'ShopFlow' : activeScreen}
            </Text>
            <View style={{ width: 40 }} />
          </View>
        </SafeAreaView>

        {/* ── Main content ── */}
        <View style={styles.content}>
          {renderScreen()}
        </View>

        {/* ── Overlay (tap to close) ── */}
        {drawerOpen && (
          <TouchableWithoutFeedback onPress={closeDrawer}>
            <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
          </TouchableWithoutFeedback>
        )}

        {/* ── Drawer panel ── */}
        <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.drawerHeader}>
              <View style={styles.drawerAvatar}>
                <Text style={styles.drawerAvatarText}>SF</Text>
              </View>
              <Text style={styles.drawerName}>ShopFlow</Text>
              <Text style={styles.drawerSub}>user@shopflow.app</Text>
            </View>
            <View style={styles.drawerDivider} />
            {drawerItems.map((item) => (
              <TouchableOpacity
                key={item.screen}
                style={[styles.drawerItem, activeScreen === item.screen && styles.drawerItemActive]}
                onPress={() => navigate(item.screen)}
              >
                <Text style={styles.drawerItemIcon}>{item.icon}</Text>
                <Text style={[styles.drawerItemLabel, activeScreen === item.screen && styles.drawerItemLabelActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </SafeAreaView>
        </Animated.View>
      </View>
    </DrawerContext.Provider>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <CustomDrawer />
      </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  root:             { flex: 1, backgroundColor: '#F7F8FA' },
  headerSafe:       { backgroundColor: '#0F6E56' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: '#0F6E56',
  },
  menuBtn:          { width: 40, alignItems: 'flex-start' },
  headerTitle:      { color: '#FFF', fontSize: 18, fontWeight: '700' },
  content:          { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 10,
  },
  drawer: {
    position: 'absolute', top: 0, left: 0, bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#F9F9F9',
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  drawerHeader:     { padding: 20, paddingTop: 24, gap: 4 },
  drawerAvatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: '#0F6E56',
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  drawerAvatarText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  drawerName:       { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  drawerSub:        { fontSize: 12, color: '#888' },
  drawerDivider:    { height: 0.5, backgroundColor: '#E0E0E0', marginHorizontal: 16, marginBottom: 8 },
  drawerItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 20, paddingVertical: 14,
    borderRadius: 10, marginHorizontal: 8, marginVertical: 2,
  },
  drawerItemActive:      { backgroundColor: '#E1F5EE' },
  drawerItemIcon:        { fontSize: 18 },
  drawerItemLabel:       { fontSize: 15, color: '#444', fontWeight: '500' },
  drawerItemLabelActive: { color: '#0F6E56', fontWeight: '700' },
});
