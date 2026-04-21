// src/screens/CartScreen.tsx
// Bottom tab screen — no stack, no params needed.
// Uses useCart() hook from CartContext to read/modify cart state.

import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Alert,
} from 'react-native';
import type { CartItem } from '../types';
import { useCart } from '../data/CartContext';

export function CartScreen() {
  const { items, totalItems, totalPrice, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;
    Alert.alert(
      'Order placed!',
      `${totalItems} items for $${totalPrice.toFixed(2)}. Thanks for shopping with ShopFlow!`,
      [{ text: 'OK', onPress: clearCart }]
    );
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.card}>
      <Text style={styles.emoji}>{item.product.emoji}</Text>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.product.name}</Text>
        <Text style={styles.price}>${item.product.price.toFixed(2)} × {item.quantity}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.lineTotal}>
          ${(item.product.price * item.quantity).toFixed(2)}
        </Text>
        <TouchableOpacity
          onPress={() => removeFromCart(item.product.id)}
          style={styles.removeBtn}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.empty}>
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Add items from the Shop tab.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total ({totalItems} items)</Text>
          <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout} activeOpacity={0.8}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#F7F8FA' },
  list:           { padding: 16, gap: 10 },
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
  emoji:          { fontSize: 32 },
  info:           { flex: 1 },
  name:           { fontSize: 14, fontWeight: '600', color: '#1A1A1A', marginBottom: 4 },
  price:          { fontSize: 13, color: '#666' },
  right:          { alignItems: 'flex-end', gap: 6 },
  lineTotal:      { fontSize: 15, fontWeight: '700', color: '#0F6E56' },
  removeBtn:      { backgroundColor: '#FEE2E2', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  removeText:     { fontSize: 11, color: '#DC2626', fontWeight: '500' },
  footer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },
  totalRow:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel:     { fontSize: 15, color: '#555' },
  totalPrice:     { fontSize: 22, fontWeight: '800', color: '#0F6E56' },
  checkoutBtn: {
    backgroundColor: '#0F6E56',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutText:   { color: '#FFF', fontSize: 16, fontWeight: '700' },
  empty:          { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyEmoji:     { fontSize: 56, marginBottom: 8 },
  emptyTitle:     { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
  emptySubtitle:  { fontSize: 14, color: '#888' },
});
