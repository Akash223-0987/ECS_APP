import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function AnalyticsScreen() {
  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [2, 3, 2.5, 4, 3.5, 5, 4] }],
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{ data: [20, 45, 28, 80, 99] }],
  };

  const pieData = [
    { name: 'AC', population: 40, color: '#2E7D32', legendFontColor: '#000', legendFontSize: 14 },
    { name: 'Fan', population: 25, color: '#0288D1', legendFontColor: '#000', legendFontSize: 14 },
    { name: 'Lights', population: 35, color: '#FFB300', legendFontColor: '#000', legendFontSize: 14 },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#F5F5F5',
    backgroundGradientTo: '#F5F5F5',
    color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.sectionTitle}>Daily Usage</Text>
        <LineChart
          data={lineData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />

        <Text style={styles.sectionTitle}>Monthly Savings</Text>
       <BarChart
  data={{
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        data: [30, 45, 28, 80],
      },
    ],
  }}
  width={screenWidth - 32}
  height={220}
  yAxisLabel=""
  yAxisSuffix="kWh"
  fromZero={true}
  chartConfig={chartConfig}
  style={styles.chart}
/>


        <Text style={styles.sectionTitle}>Appliance Breakdown</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="16"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#000', marginBottom: 8, marginTop: 16 },
  chart: { borderRadius: 12, marginBottom: 16 },
});
