import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FARM_CONTACT } from '../constants/farmContact';

export default function LocationScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const isDesktop = width >= 1024;

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${FARM_CONTACT.latitude},${FARM_CONTACT.longitude}`;
    Linking.openURL(url);
  };

  const openNavigationDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${FARM_CONTACT.latitude},${FARM_CONTACT.longitude}`;
    Linking.openURL(url);
  };

  const openCall = () => {
    Linking.openURL(`tel:${FARM_CONTACT.phone}`);
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[
        styles.content,
        isDesktop && { paddingHorizontal: 32, paddingVertical: 24 }
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.heading, isDesktop && { fontSize: 24 }]}>Farm Location & Directions</Text>
        <Text style={styles.subheading}>Direct navigation to Raja Haqnawaz Dairy Farm in District Khushab, Punjab</Text>
      </View>

      <View style={isWide ? styles.twoColumnLayout : null}>
        {/* Left Column: GPS & Map Actions */}
        <View style={isWide ? styles.leftCol : null}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="location" size={24} color="#4ade80" style={{ marginRight: 8 }} />
              <Text style={styles.title}>Farm Physical Location</Text>
            </View>

            <Text style={styles.farmName}>Raja Haqnawaz Dairy Farm</Text>
            <Text style={styles.address}>{FARM_CONTACT.farmAddress}</Text>
            <Text style={styles.urduAddress}>{FARM_CONTACT.farmAddressUrdu}</Text>

            <View style={styles.gpsBox}>
              <Text style={styles.gpsLabel}>GPS Coordinates:</Text>
              <Text style={styles.gpsValue}>
                {FARM_CONTACT.latitude}° N, {FARM_CONTACT.longitude}° E
              </Text>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={openNavigationDirections}>
              <Ionicons name="navigate" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.btnText}>Start GPS Navigation</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn} onPress={openGoogleMaps}>
              <Ionicons name="map" size={18} color="#4ade80" style={{ marginRight: 8 }} />
              <Text style={styles.secondaryBtnText}>View On Google Maps</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Right Column: Directions & Visiting Steps */}
        <View style={isWide ? styles.rightCol : null}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>How To Reach Us</Text>

            <View style={styles.step}>
              <Text style={styles.stepNum}>1</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>From Sargodha / Mianwali Road</Text>
                <Text style={styles.stepDesc}>Take the Jauharabad main bypass exit towards Naseem Colony.</Text>
              </View>
            </View>

            <View style={styles.step}>
              <Text style={styles.stepNum}>2</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Prominent Landmark</Text>
                <Text style={styles.stepDesc}>Located right near the historic Naseem Colony Central Imambargah.</Text>
              </View>
            </View>

            <View style={styles.step}>
              <Text style={styles.stepNum}>3</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Gate Entry</Text>
                <Text style={styles.stepDesc}>Ask security or local residents for "Raja Haqnawaz Dairy Farm Main Gate".</Text>
              </View>
            </View>

            <View style={styles.visitingCard}>
              <Ionicons name="time" size={16} color="#f59e0b" style={{ marginRight: 8 }} />
              <Text style={styles.visitingText}>Visiting Timings: 6:00 AM - 9:00 PM (Monday to Sunday)</Text>
            </View>

            <TouchableOpacity style={styles.callGuideBtn} onPress={openCall}>
              <Ionicons name="call" size={16} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.btnText}>Call Farm For Gate Assistance ({FARM_CONTACT.displayPhone})</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  content: {
    padding: 16,
    paddingBottom: 90,
  },
  header: {
    marginBottom: 16,
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
  subheading: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 4,
  },
  twoColumnLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftCol: {
    width: '48.5%',
  },
  rightCol: {
    width: '48.5%',
  },
  card: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#27272a',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  farmName: {
    color: '#4ade80',
    fontSize: 15,
    fontWeight: '800',
  },
  address: {
    color: '#e5e7eb',
    fontSize: 13,
    marginTop: 4,
    lineHeight: 19,
  },
  urduAddress: {
    color: '#86efac',
    fontSize: 13,
    marginTop: 6,
    textAlign: 'right',
    fontWeight: '600',
  },
  gpsBox: {
    backgroundColor: '#27272a',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    marginBottom: 14,
  },
  gpsLabel: {
    color: '#9ca3af',
    fontSize: 10,
  },
  gpsValue: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'monospace',
    marginTop: 3,
  },
  primaryBtn: {
    backgroundColor: '#15803d',
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  secondaryBtn: {
    backgroundColor: '#27272a',
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: '#4ade80',
    fontSize: 13,
    fontWeight: '700',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 14,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#15803d',
    color: '#fff',
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    marginRight: 12,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  stepDesc: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  visitingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27272a',
    padding: 10,
    borderRadius: 10,
    marginTop: 6,
    marginBottom: 12,
  },
  visitingText: {
    color: '#d1d5db',
    fontSize: 11,
    fontWeight: '500',
  },
  callGuideBtn: {
    backgroundColor: '#27272a',
    borderRadius: 10,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
