// src/screens/CategoryListScreen.tsx
// CAPABILITY: Stack navigation — this is the root screen of ShopStack.
// CAPABILITY: Parameter passing — navigates to ProductList WITH params.

import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ShopStackParamList, Category } from '../types';
import { CATEGORIES } from '../data/mockData';

type Props = NativeStackScreenProps<ShopStackParamList, 'CategoryList'>;

export function CategoryListScreen({ navigation }: Props) {
  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      activeOpacity={0.75}
      onPress={() =>
        // CAPABILITY: Parameter passing — sends categoryId and categoryName
        navigation.navigate('ProductList', {
          categoryId:   item.id,
          categoryName: item.name,
        })
      }
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <View style={styles.cardText}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.productCount}>{item.productCount} products</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Browse by category</Text>
      </View>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    letterSpacing: 0.3,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 18,
    gap: 14,
  },
  emoji: {
    fontSize: 32,
  },
  cardText: {
    flex: 1,
  },
  categoryName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  productCount: {
    fontSize: 13,
    color: '#555',
  },
  arrow: {
    fontSize: 22,
    color: '#555',
    fontWeight: '300',
  },
});
