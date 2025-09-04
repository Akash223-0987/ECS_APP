import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>NeuroWatt</Text>
          <View>
            <Text style={styles.roomName}>Living Room</Text>
            <Text style={styles.connected}>Connected</Text>
          </View>
          <Text style={styles.battery}>🔋 50%</Text>
        </View>

        {/* Live Occupancy */}
        <View style={styles.card}>
          <Ionicons
            name="person"
            size={40}
            color="#2E7D32"
            style={{ marginBottom: 8 }}
          />
          <Text style={styles.cardTitle}>Occupied by 2 people</Text>
          <Text style={styles.subText}>Last motion: 5 min ago</Text>
        </View>

        {/* Appliance Cards */}
        <View>
          {['AC', 'Fan', 'Lights'].map((appliance, index) => (
            <View key={index} style={styles.applianceCard}>
              <Text style={styles.applianceTitle}>{appliance}</Text>
              <Text style={styles.applianceStatus}>
                {appliance === 'Lights' ? 'OFF' : 'ON'}
              </Text>
              <Text style={styles.subText}>2.3A / 500W</Text>
              <Text style={styles.modeBadge}>
                {appliance === 'AC' ? 'Auto' : 'Manual'}
              </Text>
            </View>
          ))}
        </View>

        {/* Energy Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Energy Summary</Text>
          <ProgressChart
            data={{ data: [0.5, 0.25] }} // Usage 50%, Savings 25%
            width={screenWidth - 60}
            height={180}
            strokeWidth={12}
            radius={40}
            chartConfig={{
              backgroundGradientFrom: '#F5F5F5',
              backgroundGradientTo: '#F5F5F5',
              color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
            }}
            hideLegend={false}
          />
          <Text style={styles.subText}>Usage: 5 kWh, Savings: 25%</Text>
          <Text style={styles.tip}>💡 Tip: Turn off unused appliances!</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Auto Mode</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Manual Override</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          🌤 25°C outside - Adjust AC?
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFB300',
  },
  roomName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  connected: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  battery: {
    fontSize: 14,
    color: '#757575',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#757575',
  },
  applianceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  applianceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  applianceStatus: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  modeBadge: {
    marginTop: 4,
    fontSize: 12,
    color: '#0288D1',
    fontWeight: 'bold',
  },
  tip: {
    marginTop: 8,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#0288D1',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#2E7D32',
    marginHorizontal: 6,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginTop: 12,
  },
});
