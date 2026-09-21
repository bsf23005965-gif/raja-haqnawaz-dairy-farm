import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FARM_CONTACT } from '../constants/farmContact';

export default function AboutScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const isDesktop = width >= 1024;

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
      {/* Banner Card */}
      <View style={[styles.bannerContainer, isWide && { minHeight: 240 }]}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=800&auto=format&fit=crop' }}
          style={[styles.bannerImage, isWide && { height: 260 }]}
          resizeMode="cover"
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.badge}>FOUNDED 1994 • DISTRICT KHUSHAB, PUNJAB</Text>
          <Text style={[styles.bannerTitle, isDesktop && { fontSize: 24 }]}>Raja Haqnawaz Dairy Farm</Text>
          <Text style={styles.bannerSub}>30+ Years Legacy of Pedigree Dairy & Cattle Excellence</Text>
        </View>
      </View>

      <Text style={styles.urduTitle}>
        راجہ حق نواز ڈیری فارم — 30 سالہ قابل اعتماد نام
      </Text>

      {/* 3 Pillars Grid: Responsive on tablet/desktop */}
      <View style={isWide ? styles.cardsGridWide : null}>
        {/* 1. History & Vision */}
        <View style={[styles.card, isDesktop ? { width: '31.8%' } : isWide ? { width: '48.5%' } : null]}>
          <View style={styles.cardHeaderIcon}>
            <Ionicons name="time" size={20} color="#4ade80" style={{ marginRight: 8 }} />
            <Text style={styles.cardHeading}>1. Our Heritage & History</Text>
          </View>
          <Text style={styles.text}>
            Established in 1994 by <Text style={styles.bold}>Raja Haqnawaz</Text>, our farm began with a clear mission: to preserve and elevate the indigenous dairy cattle breeds of Pakistan. Located at Naseem Colony near Imambargah, Jauharabad, District Khushab, Punjab, the farm has evolved into one of the region's most reputable dairy breeding facilities.
          </Text>
          <Text style={styles.text}>
            Over three decades, we have continuously selected the highest-yielding Sahiwal cows and champion Nili-Ravi buffaloes, combining traditional care with modern veterinary nutrition.
          </Text>
        </View>

        {/* 2. Cattle Breeds */}
        <View style={[styles.card, isDesktop ? { width: '31.8%' } : isWide ? { width: '48.5%' } : null]}>
          <View style={styles.cardHeaderIcon}>
            <Ionicons name="sparkles" size={20} color="#f59e0b" style={{ marginRight: 8 }} />
            <Text style={styles.cardHeading}>2. Specialized Breeds</Text>
          </View>
          <Text style={styles.text}>
            • <Text style={styles.bold}>Pure Sahiwal Cows:</Text> Revered worldwide for heat tolerance, docility, and natural high butterfat A2 beta-casein milk.
          </Text>
          <Text style={styles.text}>
            • <Text style={styles.bold}>Championship Nili-Ravi Buffaloes:</Text> Known as the "Black Gold of Pakistan", producing 16 to 22 liters of thick, creamy milk daily.
          </Text>
          <Text style={styles.text}>
            • <Text style={styles.bold}>Cholistani & Red Sindhi:</Text> Highly adaptable, disease-resistant indigenous dairy breeds suitable for all regional climates.
          </Text>
        </View>

        {/* 3. Bio-Security */}
        <View style={[styles.card, isDesktop ? { width: '31.8%' } : isWide ? { width: '100%', marginTop: 16 } : null]}>
          <View style={styles.cardHeaderIcon}>
            <Ionicons name="shield-checkmark" size={20} color="#38bdf8" style={{ marginRight: 8 }} />
            <Text style={styles.cardHeading}>3. Bio-Security & Care</Text>
          </View>
          <Text style={styles.text}>
            All animals undergo strict bi-annual vaccination against Foot & Mouth Disease (FMD), Hemorrhagic Septicemia (HS), and Blackquarter (BQ). Every animal sold is accompanied by a certified milk record and health guarantee.
          </Text>
          <Text style={styles.text}>
            We invite prospective dairy farmers and breeders to visit our farm in Jauharabad and inspect our live herd in person.
          </Text>

          <TouchableOpacity style={styles.callBtn} onPress={openCall}>
            <Ionicons name="call" size={16} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.callBtnText}>Speak With Farm Manager ({FARM_CONTACT.displayPhone})</Text>
          </TouchableOpacity>
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
  bannerContainer: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#27272a',
    backgroundColor: '#1c1c1e',
  },
  bannerImage: {
    width: '100%',
    height: 180,
  },
  bannerOverlay: {
    padding: 16,
    backgroundColor: '#1c1c1e',
  },
  badge: {
    color: '#f59e0b',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 4,
  },
  bannerSub: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 2,
  },
  urduTitle: {
    color: '#86efac',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
    marginTop: 14,
    marginBottom: 8,
  },
  cardsGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  card: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#27272a',
    marginTop: 12,
  },
  cardHeaderIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardHeading: {
    color: '#4ade80',
    fontSize: 15,
    fontWeight: '800',
  },
  text: {
    color: '#d1d5db',
    fontSize: 12,
    lineHeight: 19,
    marginBottom: 8,
  },
  bold: {
    color: '#fff',
    fontWeight: '700',
  },
  callBtn: {
    backgroundColor: '#15803d',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  callBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});
