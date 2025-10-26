// src/screens/ControlScreen.tsx
'use client'
import React, { useContext, useState, useEffect } from 'react';
import {
  SafeAreaView, View, Text, StyleSheet, ScrollView, Switch,
  TouchableOpacity, TextInput, FlatList, Dimensions, Alert
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Section from '../components/Section';
import { ThemeContext } from '../../App';

const { width } = Dimensions.get('window');

// Replace with your ESP32 IP address
const ESP32_IP = '192.168.1.100'; // Change this to your ESP32's IP
const BASE_URL = `http://${ESP32_IP}`;

interface DeviceStatus {
  ledState: boolean;
  autoMode: boolean;
  motionDetected: boolean;
}

const ControlScreen: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const [status, setStatus] = useState<DeviceStatus>({
    ledState: false,
    autoMode: true,
    motionDetected: false
  });
  const [loading, setLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState(ESP32_IP);

  const fetchStatus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/status`);
      setStatus(response.data);
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  const controlLight = async (state: 'on' | 'off') => {
    setLoading(true);
    try {
      await axios.get(`${BASE_URL}/control?state=${state}`);
      await fetchStatus(); // Refresh status after control
    } catch (error) {
      Alert.alert('Error', 'Failed to control light. Check ESP32 connection.');
      console.error('Error controlling light:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAutoMode = async () => {
    setLoading(true);
    try {
      await axios.get(`${BASE_URL}/toggle`);
      await fetchStatus();
    } catch (error) {
      Alert.alert('Error', 'Failed to toggle mode.');
      console.error('Error toggling mode:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch status every 3 seconds
    const interval = setInterval(fetchStatus, 3000);
    fetchStatus(); // Initial fetch
    
    return () => clearInterval(interval);
  }, []);

  const logItems = [
    { id: '1', title: `Manual Override: Lights ${status.ledState ? 'ON' : 'OFF'}`, time: 'Just now' },
    { id: '2', title: `Mode: ${status.autoMode ? 'Auto' : 'Manual'}`, time: 'Just now' },
    { id: '3', title: `Motion: ${status.motionDetected ? 'Detected' : 'No motion'}`, time: 'Just now' }
  ];

  const renderLog = ({ item }: any) => (
    <View style={[styles.logItem, { borderColor: colors.border }]}>
      <Ionicons name="time" size={16} color={colors.accent} />
      <View style={{ marginLeft: 8, flex: 1 }}>
        <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>{item.title}</Text>
        <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingTop: 55, paddingHorizontal: 23, paddingBottom: 40 }}>

        {/* IP Configuration */}
        <Section colors={colors} title="Device Configuration">
          <Text style={{ color: colors.textSecondary, marginBottom: 6 }}>ESP32 IP Address</Text>
          <TextInput
            value={ipAddress}
            onChangeText={setIpAddress}
            placeholder="192.168.1.100"
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
            accessibilityLabel="ESP32 IP address"
          />
          <TouchableOpacity 
            style={[styles.primaryBtn, { backgroundColor: colors.primary, marginTop: 8 }]}
            onPress={fetchStatus}
          >
            <Text style={styles.primaryBtnText}>Update Connection</Text>
          </TouchableOpacity>
        </Section>

        {/* Mode Switcher */}
        <Section colors={colors} title="Mode">
          <View style={styles.rowSpace}>
            <View>
              <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>
                {status.autoMode ? 'Auto Mode' : 'Manual Mode'}
              </Text>
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
                Motion: {status.motionDetected ? 'Detected' : 'No motion'}
              </Text>
            </View>
            <Switch 
              value={status.autoMode} 
              onValueChange={toggleAutoMode}
              disabled={loading}
              thumbColor="#fff" 
              trackColor={{ false: colors.border, true: colors.primary }} 
            />
          </View>
        </Section>

        {/* Light Control */}
        <Section colors={colors} title="Light Control">
          <View style={styles.rowSpace}>
            <Text style={{ color: colors.textPrimary }}>Power</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={[
                  styles.controlBtn,
                  { backgroundColor: status.ledState ? colors.primary : colors.border }
                ]}
                onPress={() => controlLight('on')}
                disabled={loading}
              >
                <Text style={[styles.controlBtnText, { color: status.ledState ? '#fff' : colors.textSecondary }]}>
                  ON
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.controlBtn,
                  { backgroundColor: !status.ledState ? colors.danger : colors.border }
                ]}
                onPress={() => controlLight('off')}
                disabled={loading}
              >
                <Text style={[styles.controlBtnText, { color: !status.ledState ? '#fff' : colors.textSecondary }]}>
                  OFF
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={[styles.statusIndicator, { backgroundColor: status.ledState ? colors.success : colors.danger }]}>
            <Ionicons 
              name={status.ledState ? "bulb" : "bulb-outline"} 
              size={24} 
              color="#fff" 
            />
            <Text style={styles.statusText}>
              Light is {status.ledState ? 'ON' : 'OFF'}
            </Text>
          </View>
        </Section>

        {/* Quick Actions */}
        <Section colors={colors} title="Quick Actions">
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.quickBtn, { backgroundColor: colors.primary }]}
              onPress={() => controlLight('on')}
              disabled={loading}
            >
              <Ionicons name="sunny" size={20} color="#fff" />
              <Text style={styles.quickBtnText}>Turn On</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickBtn, { backgroundColor: colors.danger }]}
              onPress={() => controlLight('off')}
              disabled={loading}
            >
              <Ionicons name="moon" size={20} color="#fff" />
              <Text style={styles.quickBtnText}>Turn Off</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickBtn, { backgroundColor: colors.accent }]}
              onPress={toggleAutoMode}
              disabled={loading}
            >
              <Ionicons name="repeat" size={20} color="#fff" />
              <Text style={styles.quickBtnText}>Auto Mode</Text>
            </TouchableOpacity>
          </View>
        </Section>

        {/* Status Log */}
        <Section colors={colors} title="Status Log">
          <FlatList
            data={logItems}
            keyExtractor={(item) => item.id}
            renderItem={renderLog}
            scrollEnabled={false}
          />
        </Section>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  rowSpace: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  input: { borderWidth: 1, borderRadius: 10, padding: 12 },
  primaryBtn: { paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  logItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1 },
  controlBtn: { 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 8, 
    marginLeft: 8 
  },
  controlBtnText: { fontWeight: '700', fontSize: 14 },
  statusIndicator: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 12, 
    borderRadius: 8, 
    marginTop: 12,
    justifyContent: 'center'
  },
  statusText: { color: '#fff', fontWeight: '700', marginLeft: 8 },
  quickBtn: { 
    flex: 1, 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginHorizontal: 4 
  },
  quickBtnText: { color: '#fff', fontWeight: '600', fontSize: 12, marginTop: 4 }
});

export default ControlScreen;