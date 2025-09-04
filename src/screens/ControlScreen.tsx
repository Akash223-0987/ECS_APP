// src/screens/ControlScreen.tsx
import React, { useContext } from 'react';
import {
  SafeAreaView, View, Text, StyleSheet, ScrollView, Switch,
  TouchableOpacity, TextInput, FlatList, Dimensions
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import Section from '../components/Section';
import { ThemeContext } from '../../App';

const { width } = Dimensions.get('window');

const ControlScreen: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const logItems = [
    { id: '1', title: 'Manual Override: Lights', time: 'Today, 10:10' },
    { id: '2', title: 'Auto → Manual: AC', time: 'Today, 08:32' },
    { id: '3', title: 'Fan Speed set to High', time: 'Yesterday, 21:04' }
  ];

  const renderLog = ({ item }: any) => (
    <View style={[styles.logItem, { borderColor: colors.border }]}>
      <Ionicons name="time" size={16} color={colors.accent} />
      <View style={{ marginLeft: 8 }}>
        <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>{item.title}</Text>
        <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{item.time}</Text>
      </View>
    </View>
  );

  // 8x8 thermal grid placeholders
  const cellSize = (width - 32 - 16) / 8; // container padding minus small gap

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {/* Mode Switcher */}
        <Section colors={colors} title="Mode">
          <View style={styles.rowSpace}>
            <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>Auto / Manual</Text>
            <Switch value={true} onChange={() => {}} thumbColor="#fff" trackColor={{ false: colors.border, true: colors.primary }} />
          </View>
        </Section>

        {/* Appliance Controls */}
        <Section colors={colors} title="Lights">
          <View style={styles.rowSpace}>
            <Text style={{ color: colors.textPrimary }}>Power</Text>
            <Switch value={true} onChange={() => {}} thumbColor="#fff" trackColor={{ false: colors.border, true: colors.primary }} />
          </View>
          <Text style={{ color: colors.textSecondary, marginTop: 10 }}>Dimmer</Text>
          <Slider
            value={0.6}
            minimumValue={0}
            maximumValue={1}
            onValueChange={() => {}}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.border}
          />
        </Section>

        <Section colors={colors} title="Fan">
          <View style={styles.rowSpace}>
            <Text style={{ color: colors.textPrimary }}>Power</Text>
            <Switch value={false} onChange={() => {}} thumbColor="#fff" trackColor={{ false: colors.border, true: colors.primary }} />
          </View>
          <Text style={{ color: colors.textSecondary, marginTop: 10, marginBottom: 8 }}>Speed</Text>
          <View style={styles.row}>
            {['Low', 'Med', 'High'].map((s, i) => (
              <TouchableOpacity key={i} style={[styles.segment, { borderColor: colors.primary, backgroundColor: i === 2 ? colors.primary : 'transparent' }]}>
                <Text style={{ color: i === 2 ? '#fff' : colors.primary, fontWeight: '700' }}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Section>

        <Section colors={colors} title="AC">
          <View style={styles.rowSpace}>
            <Text style={{ color: colors.textPrimary }}>Power</Text>
            <Switch value={true} onChange={() => {}} thumbColor="#fff" trackColor={{ false: colors.border, true: colors.primary }} />
          </View>

          <Text style={{ color: colors.textSecondary, marginTop: 10 }}>Temperature: 24°C</Text>
          <Slider
            value={24}
            minimumValue={16}
            maximumValue={30}
            onValueChange={() => {}}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.border}
          />

          <Text style={{ color: colors.textSecondary, marginTop: 10, marginBottom: 8 }}>Mode</Text>
          <View style={styles.row}>
            {['Cool', 'Dry', 'Fan'].map((m, i) => (
              <TouchableOpacity key={i} style={[styles.modeBtn, { borderColor: colors.accent, backgroundColor: i === 0 ? colors.accent : 'transparent' }]}>
                <Text style={{ color: i === 0 ? '#fff' : colors.accent, fontWeight: '700' }}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Section>

        {/* Timer / Scheduler */}
        <Section colors={colors} title="Timer / Scheduler">
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={{ color: colors.textSecondary, marginBottom: 6 }}>Time (HH:MM)</Text>
              <TextInput
                placeholder="07:30"
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
                accessibilityLabel="Time input"
                editable={false}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={{ color: colors.textSecondary, marginBottom: 6 }}>Action</Text>
              <TextInput
                placeholder="Turn ON AC"
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
                accessibilityLabel="Action dropdown"
                editable={false}
              />
            </View>
          </View>
          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]}>
            <Text style={styles.primaryBtnText}>Add Schedule</Text>
          </TouchableOpacity>
        </Section>

        {/* Override Log */}
        <Section colors={colors} title="Override Log">
          <FlatList
            data={logItems}
            keyExtractor={(item) => item.id}
            renderItem={renderLog}
            scrollEnabled={false}
          />
        </Section>

        {/* Sensor View - Thermal Grid */}
        <Section colors={colors} title="Sensor View (Thermal Map)">
          <View style={[styles.gridWrap, { gap: 2 }]}>
            {Array.from({ length: 64 }).map((_, i) => (
              <View
                key={i}
                style={{
                  width: cellSize,
                  height: cellSize,
                  borderRadius: 4,
                  backgroundColor: i % 5 === 0 ? colors.secondary : colors.border
                }}
                accessibilityLabel={`thermal cell ${i + 1}`}
              />
            ))}
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  rowSpace: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  segment: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center', borderWidth: 1, marginRight: 8 },
  modeBtn: { paddingVertical: 10, borderRadius: 10, alignItems: 'center', borderWidth: 1, marginRight: 8, minWidth: 80 },
  input: { borderWidth: 1, borderRadius: 10, padding: 12 },
  primaryBtn: { marginTop: 12, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  logItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1 },
  gridWrap: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }
});

export default ControlScreen;
