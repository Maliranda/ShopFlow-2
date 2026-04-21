// src/screens/ProductListScreen.tsx
// CAPABILITY: Stack navigation — mid-level stack screen.
// CAPABILITY: Parameter passing — RECEIVES categoryId from CategoryList,
//             SENDS productId params onward to ProductDetail.

import React, { useLayoutEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ShopStackParamList, Product } from '../types';
import { getProductsByCategory } from '../data/mockData';
import { StarRating } from '../components/StarRating';

type Props = NativeStackScreenProps<ShopStackParamList, 'ProductList'>;

export function ProductListScreen({ route, navigation }: Props) {
  // CAPABILITY: Receiving params — route.params is fully typed by ShopStackParamList
  const { categoryId, categoryName } = route.params;

  // Set the header title dynamically from params
  useLayoutEffect(() => {
    navigation.setOptions({ title: categoryName });
  }, [navigation, categoryName]);

  const products = getProductsByCategory(categoryId);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.75}
      onPress={() =>
        // CAPABILITY: Parameter passing — passes 5 typed params to ProductDetail
        navigation.navigate('ProductDetail', {
          productId:    item.id,
          productName:  item.name,
          productPrice: item.price,
          productImage: item.emoji,
          categoryName,
        })
      }
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <StarRating rating={item.rating} reviewCount={item.reviewCount} />
        <View style={styles.tagsRow}>
          {item.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.priceBlock}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.count}>{products.length} products</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#F7F8FA' },
  count:       { fontSize: 13, color: '#888', paddingHorizontal: 4, marginBottom: 8 },
  list:        { padding: 16, gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  emoji:       { fontSize: 36 },
  info:        { flex: 1, gap: 4 },
  name:        { fontSize: 15, fontWeight: '600', color: '#1A1A1A' },
  tagsRow:     { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 2 },
  tag: {
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  tagText:     { fontSize: 11, color: '#555' },
  priceBlock:  { alignItems: 'flex-end', gap: 4 },
  price:       { fontSize: 16, fontWeight: '700', color: '#0F6E56' },
  arrow:       { fontSize: 20, color: '#AAA' },
});
