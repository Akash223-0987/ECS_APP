// src/screens/ProfileScreen.tsx
import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Section from '../components/Section';
import { ThemeContext } from '../../App';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 55, paddingHorizontal:23, paddingBottom: 40 }}>
        {/* User Info */}
        <Section colors={colors} title="User">
          <View style={styles.row}>
            <View style={[styles.avatar, { backgroundColor: colors.border }]}>
              <Ionicons name="person" size={40} color={colors.textSecondary} />
            </View>
            <View style={{ marginLeft: 12 }}>
              <Text style={{ color: colors.textPrimary, fontWeight: '700', fontSize: 16 }}>user</Text>
              <Text style={{ color: colors.textSecondary }}>user@example.com</Text>
            </View>
          </View>
        </Section>

        {/* Usage History */}
        <Section colors={colors} title="Usage History">
          <Text style={{ color: colors.textSecondary }}>
            • Last 30 days: 142 kWh {'\n'}
            • Average daily: 4.7 kWh {'\n'}
            • Best day: 3.1 kWh
          </Text>
        </Section>

        {/* Multi-User */}
        <Section colors={colors} title="Household Members">
          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]}>
            <Text style={styles.primaryBtnText}>Add User</Text>
          </TouchableOpacity>
        </Section>

        {/* Feedback */}
        {/* <Section colors={colors} title="Feedback">
          <View style={{ gap: 8 }}>
            <View style={[styles.textArea, { borderColor: colors.border }]}>
              <Text style={{ color: colors.textSecondary }}>Write your feedback here…</Text>
            </View>
            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.primaryBtnText, { color: '#000' }]}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Section> */}

        {/* Logout */}
        <Section colors={colors} title="Account">
          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.danger }]}>
            <Text style={styles.primaryBtnText}>Logout</Text>
          </TouchableOpacity>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  primaryBtn: { paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  textArea: { borderWidth: 1, borderRadius: 10, padding: 50, height: 100, justifyContent: 'flex-start' }
});

export default ProfileScreen;
