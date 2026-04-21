// src/screens/SettingsScreen.tsx
// CAPABILITY: Drawer navigation — second drawer-only screen.

import React, { useState } from 'react';
import {
  View, Text, Switch, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,
} from 'react-native';

interface SettingRowProps {
  label: string;
  subtitle?: string;
  value: boolean;
  onToggle: (val: boolean) => void;
}

function SettingRow({ label, subtitle, value, onToggle }: SettingRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <Text style={styles.rowLabel}>{label}</Text>
        {subtitle ? <Text style={styles.rowSub}>{subtitle}</Text> : null}
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#E0E0E0', true: '#9FE1CB' }}
        thumbColor={value ? '#0F6E56' : '#FFF'}
      />
    </View>
  );
}

export function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode,       setDarkMode]       = useState(false);
  const [biometrics,     setBiometrics]     = useState(false);
  const [newsletter,     setNewsletter]     = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <Text style={styles.sectionHeader}>Preferences</Text>
        <View style={styles.card}>
          <SettingRow label="Push notifications" subtitle="Order updates and deals" value={notifications} onToggle={setNotifications} />
          <View style={styles.divider} />
          <SettingRow label="Dark mode"           subtitle="Switch to dark theme"    value={darkMode}       onToggle={setDarkMode} />
          <View style={styles.divider} />
          <SettingRow label="Newsletter"           subtitle="Weekly deals by email"   value={newsletter}     onToggle={setNewsletter} />
        </View>

        <Text style={styles.sectionHeader}>Security</Text>
        <View style={styles.card}>
          <SettingRow label="Biometric login" subtitle="Use Face ID or fingerprint" value={biometrics} onToggle={setBiometrics} />
        </View>

        <Text style={styles.sectionHeader}>Account</Text>
        <View style={styles.card}>
          {['Edit profile', 'Change password', 'Delete account'].map((item, i, arr) => (
            <View key={item}>
              <TouchableOpacity style={styles.linkRow} activeOpacity={0.7}>
                <Text style={[styles.linkText, item === 'Delete account' && styles.danger]}>
                  {item}
                </Text>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
              {i < arr.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Reached via Drawer navigation</Text>
        </View>

        <Text style={styles.version}>ShopFlow v1.0.0 — Group 1</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: '#F7F8FA' },
  content:       { padding: 20, gap: 8, paddingBottom: 40 },
  sectionHeader: { fontSize: 12, fontWeight: '600', color: '#888', letterSpacing: 0.5, marginTop: 16, marginBottom: 6, paddingHorizontal: 4 },
  card: {
    backgroundColor: '#FFF', borderRadius: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 2,
    overflow: 'hidden',
  },
  row:           { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  rowText:       { flex: 1 },
  rowLabel:      { fontSize: 15, color: '#1A1A1A' },
  rowSub:        { fontSize: 12, color: '#888', marginTop: 2 },
  divider:       { height: 0.5, backgroundColor: '#F0F0F0', marginHorizontal: 16 },
  linkRow:       { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  linkText:      { flex: 1, fontSize: 15, color: '#1A1A1A' },
  danger:        { color: '#DC2626' },
  chevron:       { fontSize: 20, color: '#CCC' },
  badge: {
    backgroundColor: '#FAEEDA', borderRadius: 8,
    paddingVertical: 8, paddingHorizontal: 14,
    alignSelf: 'center', marginTop: 8,
  },
  badgeText:     { fontSize: 12, color: '#633806', fontWeight: '500' },
  version:       { fontSize: 12, color: '#CCC', textAlign: 'center', marginTop: 16 },
});
