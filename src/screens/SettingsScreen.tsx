// src/screens/SettingsScreen.tsx
import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, Text, Switch, StyleSheet, TouchableOpacity, View } from 'react-native';
import Section from '../components/Section';
import Slider from '@react-native-community/slider';
import { ThemeContext } from '../../App';

const SettingsScreen: React.FC = () => {
  const { colors, dark, toggleDark } = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {/* Device Management */}
        <Section colors={colors} title="Device Management">
          <View style={styles.row}>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary }]}>
              <Text style={styles.actionBtnText}>Add Device</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.actionBtnText, { color: '#000' }]}>Remove Device</Text>
            </TouchableOpacity>
          </View>
        </Section>

        {/* Notifications */}
        <Section colors={colors} title="Notifications">
          {[
            { label: 'Usage Alerts', value: true },
            { label: 'Occupancy Alerts', value: false },
            { label: 'Tips & Suggestions', value: true }
          ].map((n, i) => (
            <View key={i} style={styles.rowSpace}>
              <Text style={{ color: colors.textPrimary }}>{n.label}</Text>
              <Switch value={n.value} onChange={() => {}} thumbColor="#fff" trackColor={{ false: colors.border, true: colors.primary }} />
            </View>
          ))}
        </Section>

        {/* Integration */}
        <Section colors={colors} title="Integration">
          <View style={styles.rowSpace}>
            <Text style={{ color: colors.textPrimary }}>Cloud Sync</Text>
            <Switch value={true} onChange={() => {}} thumbColor="#fff" trackColor={{ false: colors.border, true: colors.primary }} />
          </View>
          <View style={[styles.rowSpace, { marginTop: 8 }]}>
            <Text style={{ color: colors.textPrimary }}>Bluetooth</Text>
            <Switch value={true} onChange={() => {}} thumbColor="#fff" trackColor={{ false: colors.border, true: colors.primary }} />
          </View>
        </Section>

        {/* Sensitivity */}
        <Section colors={colors} title="Sensitivity">
          <Text style={{ color: colors.textSecondary, marginBottom: 6 }}>Motion Sensitivity</Text>
          <Slider value={0.7} minimumValue={0} maximumValue={1} minimumTrackTintColor={colors.primary} maximumTrackTintColor={colors.border} />
          <Text style={{ color: colors.textSecondary, marginTop: 12, marginBottom: 6 }}>Light Threshold</Text>
          <Slider value={0.4} minimumValue={0} maximumValue={1} minimumTrackTintColor={colors.primary} maximumTrackTintColor={colors.border} />
        </Section>

        {/* Units & Themes */}
        <Section colors={colors} title="Units & Themes">
          <View style={styles.rowSpace}>
            <Text style={{ color: colors.textPrimary }}>Dark Mode</Text>
            <Switch value={dark} onValueChange={toggleDark} thumbColor="#fff" trackColor={{ false: colors.border, true: colors.primary }} />
          </View>
          <View style={[styles.rowSpace, { marginTop: 8 }]}>
            <Text style={{ color: colors.textPrimary }}>Units (Metric/Imperial)</Text>
            <Switch value={true} onChange={() => {}} thumbColor="#fff" trackColor={{ false: colors.border, true: colors.primary }} />
          </View>
        </Section>

        {/* Security */}
        <Section colors={colors} title="Security">
          <View style={styles.row}>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.accent }]}>
              <Text style={styles.actionBtnText}>Change PIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary }]}>
              <Text style={styles.actionBtnText}>Biometrics</Text>
            </TouchableOpacity>
          </View>
        </Section>

        {/* About */}
        <Section colors={colors} title="About">
          <Text style={{ color: colors.textSecondary }}>
            NeuroWatt v1.0.0 — Smart occupancy-aware energy UI mock. No data is collected in this static demo.
          </Text>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rowSpace: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  actionBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginRight: 8 },
  actionBtnText: { color: '#fff', fontWeight: '700' }
});

export default SettingsScreen;
