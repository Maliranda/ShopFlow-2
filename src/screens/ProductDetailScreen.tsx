// src/screens/ProductDetailScreen.tsx
// CAPABILITY: Stack navigation — leaf screen of ShopStack.
// CAPABILITY: Parameter passing — RECEIVES all params from ProductList.

import React, { useLayoutEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ShopStackParamList } from '../types';
import { getProductById } from '../data/mockData';
import { useCart } from '../data/CartContext';
import { StarRating } from '../components/StarRating';

type Props = NativeStackScreenProps<ShopStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route, navigation }: Props) {
  // CAPABILITY: Receiving params — destructure all 5 typed params
  const { productId, productName, productPrice, productImage, categoryName } =
    route.params;

  const { addToCart } = useCart();

  // Fetch full product data using the passed productId
  const product = getProductById(productId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: productName });
  }, [navigation, productName]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    Alert.alert('Added to cart', `${productName} was added to your cart.`);
  };

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>{productImage}</Text>
      </View>

      {/* Breadcrumb — shows param chain */}
      <Text style={styles.breadcrumb}>Shop › {categoryName} › {productName}</Text>

      {/* Name + rating */}
      <Text style={styles.name}>{product.name}</Text>
      <StarRating rating={product.rating} reviewCount={product.reviewCount} large />

      {/* Tags */}
      <View style={styles.tagsRow}>
        {product.tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Description */}
      <Text style={styles.sectionLabel}>About this product</Text>
      <Text style={styles.description}>{product.description}</Text>

      {/* Params debug box — useful for the demo presentation */}
      <View style={styles.paramsBox}>
        <Text style={styles.paramsTitle}>📦 Params received (route.params)</Text>
        <Text style={styles.paramLine}>productId: "{productId}"</Text>
        <Text style={styles.paramLine}>productName: "{productName}"</Text>
        <Text style={styles.paramLine}>productPrice: {productPrice}</Text>
        <Text style={styles.paramLine}>categoryName: "{categoryName}"</Text>
      </View>

      {/* Price + CTA */}
      <View style={styles.footer}>
        <Text style={styles.price}>${productPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart} activeOpacity={0.8}>
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#F7F8FA' },
  content:      { padding: 20, paddingBottom: 40 },
  center:       { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorText:    { fontSize: 16, color: '#888' },
  hero: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  heroEmoji:    { fontSize: 80 },
  breadcrumb:   { fontSize: 12, color: '#AAA', marginBottom: 8 },
  name:         { fontSize: 24, fontWeight: '700', color: '#1A1A1A', marginBottom: 8 },
  tagsRow:      { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10, marginBottom: 20 },
  tag: {
    backgroundColor: '#E8F5F0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText:      { fontSize: 12, color: '#0F6E56', fontWeight: '500' },
  sectionLabel: { fontSize: 13, fontWeight: '600', color: '#888', letterSpacing: 0.5, marginBottom: 6 },
  description:  { fontSize: 15, color: '#444', lineHeight: 22, marginBottom: 24 },
  paramsBox: {
    backgroundColor: '#1A1A2E',
    borderRadius: 10,
    padding: 14,
    marginBottom: 24,
  },
  paramsTitle:  { fontSize: 12, color: '#7EC8A4', fontWeight: '600', marginBottom: 8 },
  paramLine:    { fontSize: 11, color: '#A8D8C0', fontFamily: 'Courier', lineHeight: 18 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  price:        { fontSize: 28, fontWeight: '800', color: '#0F6E56' },
  addBtn: {
    flex: 1,
    backgroundColor: '#0F6E56',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addBtnText:   { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
