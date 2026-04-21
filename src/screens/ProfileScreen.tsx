// src/screens/ProfileScreen.tsx
// CAPABILITY: Drawer navigation — accessible ONLY via the side drawer.
// This screen is NOT reachable from tabs or stack — only the drawer menu.

import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView,
} from 'react-native';
import { useContext } from 'react';
import { DrawerContext } from '../navigation/DrawerContext';
import { useCart } from '../data/CartContext';

const STATS = [
  { label: 'Orders',    value: '12' },
  { label: 'Wishlist',  value: '3'  },
  { label: 'Reviews',   value: '7'  },
];

export function ProfileScreen() {
  const { openDrawer } = useContext(DrawerContext);
  const { totalItems, totalPrice } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Avatar */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SF</Text>
          </View>
          <Text style={styles.name}>ShopFlow User</Text>
          <Text style={styles.email}>user@shopflow.app</Text>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {STATS.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Cart summary */}
        <View style={styles.cartSummary}>
          <Text style={styles.sectionLabel}>Current cart</Text>
          <Text style={styles.cartText}>
            {totalItems === 0
              ? 'Cart is empty'
              : `${totalItems} items — $${totalPrice.toFixed(2)}`}
          </Text>
        </View>

        <Text style={styles.sectionLabel}>Navigate via drawer</Text>
        <View style={styles.linkList}>
          <TouchableOpacity
            style={styles.link}
            onPress={openDrawer}
          >
            <Text style={styles.linkText}>☰  Open side menu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Reached via Drawer navigation</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#F7F8FA' },
  content:      { padding: 24, gap: 24 },
  avatarWrap:   { alignItems: 'center', gap: 6, paddingTop: 8 },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#0F6E56',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 4,
  },
  avatarText:   { color: '#FFF', fontSize: 24, fontWeight: '700' },
  name:         { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
  email:        { fontSize: 13, color: '#888' },
  statsRow:     { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1, alignItems: 'center',
    backgroundColor: '#FFF', borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 2,
  },
  statValue:    { fontSize: 24, fontWeight: '800', color: '#0F6E56' },
  statLabel:    { fontSize: 12, color: '#888', marginTop: 2 },
  cartSummary: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 2,
  },
  sectionLabel: { fontSize: 12, fontWeight: '600', color: '#888', letterSpacing: 0.5, marginBottom: 8 },
  cartText:     { fontSize: 16, fontWeight: '600', color: '#1A1A1A' },
  linkList:     { gap: 8 },
  link: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 2,
  },
  linkText:     { fontSize: 15, color: '#1A1A1A', fontWeight: '500' },
  badge: {
    backgroundColor: '#FAEEDA', borderRadius: 8,
    paddingVertical: 8, paddingHorizontal: 14, alignSelf: 'center',
  },
  badgeText:    { fontSize: 12, color: '#633806', fontWeight: '500' },
});
