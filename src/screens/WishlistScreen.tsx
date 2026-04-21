// src/screens/WishlistScreen.tsx
// Bottom tab screen. Shows a static wishlist for demo purposes.
// In a real app this would use a WishlistContext similar to CartContext.

import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { PRODUCTS } from '../data/mockData';
import type { Product } from '../types';
import { useCart } from '../data/CartContext';

// Pre-seed wishlist with 3 items for demo
const INITIAL_WISHLIST = [PRODUCTS[0], PRODUCTS[4], PRODUCTS[8]];

export function WishlistScreen() {
  const [wishlist, setWishlist] = useState<Product[]>(INITIAL_WISHLIST);
  const { addToCart } = useCart();

  const remove = (id: string) => setWishlist((prev) => prev.filter((p) => p.id !== id));

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Text style={styles.emoji}>{item.emoji}</Text>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => addToCart(item)}
          activeOpacity={0.8}
        >
          <Text style={styles.cartBtnText}>+ Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => remove(item.id)}>
          <Text style={styles.heart}>♥</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (wishlist.length === 0) {
    return (
      <SafeAreaView style={styles.empty}>
        <Text style={styles.emptyEmoji}>🤍</Text>
        <Text style={styles.emptyTitle}>Wishlist is empty</Text>
        <Text style={styles.emptySubtitle}>Tap ♥ to save items here.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.count}>{wishlist.length} saved items</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: '#F7F8FA' },
  count:         { fontSize: 13, color: '#888', marginBottom: 8, paddingHorizontal: 4 },
  list:          { padding: 16, gap: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  emoji:         { fontSize: 32 },
  info:          { flex: 1 },
  name:          { fontSize: 14, fontWeight: '600', color: '#1A1A1A', marginBottom: 4 },
  price:         { fontSize: 14, fontWeight: '700', color: '#0F6E56' },
  actions:       { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cartBtn: {
    backgroundColor: '#0F6E56',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  cartBtnText:   { color: '#FFF', fontSize: 12, fontWeight: '600' },
  heart:         { fontSize: 22, color: '#E86F6F' },
  empty:         { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyEmoji:    { fontSize: 56, marginBottom: 8 },
  emptyTitle:    { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
  emptySubtitle: { fontSize: 14, color: '#888' },
});
