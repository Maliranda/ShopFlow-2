// src/components/StarRating.tsx
// Reusable component. Shows star rating + review count.
// Accepts `large` prop for ProductDetail hero display.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StarRatingProps {
  rating: number;
  reviewCount: number;
  large?: boolean;
}

export function StarRating({ rating, reviewCount, large = false }: StarRatingProps) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  const stars =
    '★'.repeat(full) +
    (half ? '½' : '') +
    '☆'.repeat(empty);

  return (
    <View style={styles.row}>
      <Text style={[styles.stars, large && styles.starsLarge]}>{stars}</Text>
      <Text style={[styles.count, large && styles.countLarge]}>
        {rating.toFixed(1)} ({reviewCount.toLocaleString()})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row:         { flexDirection: 'row', alignItems: 'center', gap: 4 },
  stars:       { fontSize: 13, color: '#F59E0B', letterSpacing: 1 },
  starsLarge:  { fontSize: 18 },
  count:       { fontSize: 12, color: '#888' },
  countLarge:  { fontSize: 14 },
});
