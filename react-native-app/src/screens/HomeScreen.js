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
import { BRANDING, FARM_CONTACT } from '../constants/farmContact';
import { ALL_33_ANIMALS } from '../data/animals';

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 640 && width < 1024;
  const isWide = width >= 768;

  const featured = ALL_33_ANIMALS.slice(0, 4);

  const openCall = () => {
    Linking.openURL(`tel:${FARM_CONTACT.phone}`);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('Assalam-o-Alaikum Raja Haqnawaz Farm! I want information about livestock available at your farm.');
    Linking.openURL(`whatsapp://send?phone=${FARM_CONTACT.internationalWhatsapp}&text=${text}`);
  };

  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${FARM_CONTACT.latitude},${FARM_CONTACT.longitude}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[
        styles.content,
        isDesktop ? { paddingHorizontal: 32, paddingVertical: 24 } : null
      ]}
      showsVerticalScrollIndicator={true}
      nestedScrollEnabled={true}
    >
      {/* Top Farm Heritage Badge & Branding Header */}
      <View style={isWide ? styles.brandHeaderWide : styles.brandHeaderMobile}>
        <View style={{ flex: 1 }}>
          <View style={styles.headerBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#4ade80" style={{ marginRight: 6 }} />
            <Text style={styles.headerBadgeText}>ESTABLISHED 1994 • 30+ YEARS EXPERIENCE</Text>
          </View>
          <Text style={[styles.farmTitle, isDesktop && { fontSize: 28 }]}>{BRANDING.brandName}</Text>
          <Text style={styles.farmTagline}>{BRANDING.tagline}</Text>
        </View>
        <View style={isWide ? styles.urduHeaderWide : styles.urduHeaderMobile}>
          <Text style={styles.farmUrdu}>{FARM_CONTACT.farmAddressUrdu}</Text>
          <Text style={styles.districtBadge}>ضلع خوشاب، پنجاب</Text>
        </View>
      </View>

      {/* Hero Showcase Card - Responsive: Side-by-side on wide screens, stacked on mobile */}
      <View style={[styles.heroBox, isWide && styles.heroBoxWide]}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&auto=format&fit=crop' }}
          style={[styles.heroImage, isWide && styles.heroImageWide]}
          resizeMode="cover"
        />
        <View style={[styles.heroOverlay, isWide && styles.heroOverlayWide]}>
          <View style={styles.badgeRow}>
            <Text style={styles.heroBadge}>Live Certified Herd: {ALL_33_ANIMALS.length} Animals</Text>
            <Text style={styles.a2Pill}>100% A2 Pure Bloodlines</Text>
          </View>
          
          <Text style={[styles.heroHeading, isDesktop && { fontSize: 22 }]}>
            Premium Dairy & Pedigree Breeding Cattle
          </Text>
          
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color="#4ade80" style={{ marginRight: 6 }} />
            <Text style={styles.heroLocation}>{FARM_CONTACT.farmAddress}</Text>
          </View>

          <View style={[styles.heroButtonsContainer, isWide && styles.heroButtonsWide]}>
            <TouchableOpacity 
              style={[styles.primaryBtn, isWide && { flex: 1, marginBottom: 0, marginRight: 10 }]} 
              onPress={() => navigation.navigate('Livestock')}
            >
              <Text style={styles.primaryBtnText}>Browse All 33 Livestock</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 6 }} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.secondaryBtn, isWide && { flex: 1 }]} 
              onPress={openCall}
            >
              <Ionicons name="call" size={16} color="#4ade80" style={{ marginRight: 6 }} />
              <Text style={styles.secondaryBtnText}>Call Farm ({FARM_CONTACT.displayPhone})</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* AI CONSULTANT PROMINENT BANNER */}
      <TouchableOpacity 
        style={styles.aiFeatureBanner}
        onPress={() => navigation.navigate('AI')}
        activeOpacity={0.85}
      >
        <View style={styles.aiFeatureLeft}>
          <View style={styles.aiFeatureIconBox}>
            <Ionicons name="sparkles" size={24} color="#4ade80" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>AI LIVESTOCK CONSULTANT • لائیو ڈیری ڈاکٹر</Text>
            </View>
            <Text style={styles.aiFeatureTitle}>Smart Dairy & Veterinary AI</Text>
            <Text style={styles.aiFeatureSub}>
              Ask cattle health, feed charts, milk yield & vaccination questions
            </Text>
          </View>
        </View>
        <View style={styles.aiFeatureAction}>
          <Text style={styles.aiActionText}>Ask Doctor</Text>
          <Ionicons name="arrow-forward" size={14} color="#052e16" />
        </View>
      </TouchableOpacity>

      {/* QUICK ACTIONS GRID: 4 columns on Tablet/Laptop, 2x2 on Mobile */}
      <View style={styles.quickGrid}>
        <TouchableOpacity 
          style={[styles.quickCard, { width: isWide ? '23.5%' : '48%' }]} 
          onPress={() => navigation.navigate('About')}
        >
          <Text style={styles.quickEmoji}>🏛️</Text>
          <Text style={styles.quickCardTitle}>About Farm</Text>
          <Text style={styles.quickCardSub}>30+ Years Story</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.quickCard, { width: isWide ? '23.5%' : '48%' }]} 
          onPress={() => navigation.navigate('Livestock')}
        >
          <Text style={styles.quickEmoji}>🐄</Text>
          <Text style={styles.quickCardTitle}>Livestock</Text>
          <Text style={styles.quickCardSub}>33 Cattle</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.quickCard, { width: isWide ? '23.5%' : '48%' }]} 
          onPress={() => navigation.navigate('Contact')}
        >
          <Text style={styles.quickEmoji}>📞</Text>
          <Text style={styles.quickCardTitle}>Contact Us</Text>
          <Text style={styles.quickCardSub}>Call & WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.quickCard, { width: isWide ? '23.5%' : '48%' }]} 
          onPress={() => navigation.navigate('Location')}
        >
          <Text style={styles.quickEmoji}>📍</Text>
          <Text style={styles.quickCardTitle}>Farm Location</Text>
          <Text style={styles.quickCardSub}>Khushab GPS</Text>
        </TouchableOpacity>
      </View>

      {/* 1. ABOUT FARM SECTION */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="ribbon" size={20} color="#f59e0b" style={{ marginRight: 8 }} />
          <Text style={styles.sectionTitle}>ABOUT RAJA HAQNAWAZ DAIRY FARM</Text>
        </View>

        <Text style={styles.paragraph}>
          Founded in 1994 by <Text style={styles.boldWhite}>Raja Haqnawaz</Text>, our dairy farm situated at Naseem Colony near Imambargah, Jauharabad, District Khushab is Punjab's premier hub for pure A2 Sahiwal cows, championship Nili-Ravi buffaloes, and certified pedigree bulls.
        </Text>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>30+</Text>
            <Text style={styles.statLabel}>Years Trust</Text>
          </View>
          <View style={[styles.statBox, { marginHorizontal: 8 }]}>
            <Text style={styles.statNum}>{ALL_33_ANIMALS.length}</Text>
            <Text style={styles.statLabel}>Total Cattle</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>100%</Text>
            <Text style={styles.statLabel}>A2 Pure Milk</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.outlineBtn} onPress={() => navigation.navigate('About')}>
          <Text style={styles.outlineBtnText}>Read Full About Farm Story</Text>
          <Ionicons name="arrow-forward" size={14} color="#4ade80" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>

      {/* FEATURED ANIMALS SECTION - Responsive: 4-col grid on wide, horizontal scroll on mobile */}
      <View style={styles.sectionHeaderRow}>
        <View>
          <Text style={styles.sectionHeading}>FEATURED LIVESTOCK</Text>
          <Text style={styles.sectionSubHeading}>Handpicked champion milkers & pedigree breeding bulls</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Livestock')}>
          <Text style={styles.viewAllText}>View All ({ALL_33_ANIMALS.length}) →</Text>
        </TouchableOpacity>
      </View>

      {isWide ? (
        <View style={styles.featuredGridWide}>
          {featured.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.animalCardWide, { width: isDesktop ? '23.5%' : '48.5%' }]}
              onPress={() => navigation.navigate('Livestock')}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.animalCardImage} />
              <View style={styles.animalCardBody}>
                <View style={styles.breedBadge}>
                  <Text style={styles.breedBadgeText}>{item.breed} • {item.type}</Text>
                </View>
                <Text style={styles.animalName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.animalPrice}>PKR {item.price.toLocaleString('en-PK')}</Text>
                <Text style={styles.animalMilk}>
                  🥛 {item.milkProductionPerDay > 0 ? `${item.milkProductionPerDay} L/Day` : 'Breeding Stud'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {featured.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.animalCard}
              onPress={() => navigation.navigate('Livestock')}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.animalCardImage} />
              <View style={styles.animalCardBody}>
                <View style={styles.breedBadge}>
                  <Text style={styles.breedBadgeText}>{item.breed} • {item.type}</Text>
                </View>
                <Text style={styles.animalName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.animalPrice}>PKR {item.price.toLocaleString('en-PK')}</Text>
                <Text style={styles.animalMilk}>
                  🥛 {item.milkProductionPerDay > 0 ? `${item.milkProductionPerDay} L/Day` : 'Breeding Stud'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* 2. CONTACT & 3. LOCATION SECTIONS - Responsive: 2-columns on wide, stacked on mobile */}
      <View style={isWide ? styles.bottomRowWide : null}>
        {/* Contact Section */}
        <View style={[styles.sectionCard, styles.contactCard, isWide && { width: '48.8%', marginBottom: 0 }]}>
          <Ionicons name="headset" size={28} color="#4ade80" />
          <Text style={styles.contactTitle}>Need Help? Contact Raja Haqnawaz</Text>
          <Text style={styles.contactSub}>
            Have inquiries about livestock selection, milk records, or delivery? Contact us directly.
          </Text>

          <TouchableOpacity style={styles.whatsappBtn} onPress={openWhatsApp}>
            <Ionicons name="logo-whatsapp" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.btnTextWhite}>WhatsApp ({FARM_CONTACT.displayWhatsapp})</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.phoneBtn} onPress={openCall}>
            <Ionicons name="call" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.btnTextWhite}>Direct Call ({FARM_CONTACT.displayPhone})</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Contact')}>
            <Text style={styles.linkButtonText}>View Complete Contact Details →</Text>
          </TouchableOpacity>
        </View>

        {/* Location Section */}
        <View style={[styles.sectionCard, styles.locationCard, isWide && { width: '48.8%', marginBottom: 0 }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="location" size={20} color="#4ade80" style={{ marginRight: 8 }} />
            <Text style={styles.sectionTitle}>FARM LOCATION (فارم کا پتہ)</Text>
          </View>

          <Text style={styles.boldWhite}>{FARM_CONTACT.farmAddress}</Text>
          <Text style={styles.urduAddressText}>{FARM_CONTACT.farmAddressUrdu}</Text>
          <Text style={styles.textMuted}>GPS: 32.2855° N, 72.3289° E • Near Khushab Bypass</Text>
          <Text style={styles.textMuted}>Visiting Hours: 6:00 AM - 9:00 PM (Daily)</Text>

          <TouchableOpacity style={styles.mapBtn} onPress={openMaps}>
            <Ionicons name="navigate" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.btnTextWhite}>Open In Google Maps Directions</Text>
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
    paddingBottom: 120,
    flexGrow: 1,
  },
  brandHeaderMobile: {
    marginBottom: 8,
  },
  brandHeaderWide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  urduHeaderWide: {
    alignItems: 'flex-end',
  },
  urduHeaderMobile: {
    marginTop: 6,
  },
  districtBadge: {
    color: '#9ca3af',
    fontSize: 11,
    marginTop: 2,
    textAlign: 'right',
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: '#166534',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 8,
  },
  headerBadgeText: {
    color: '#4ade80',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  farmTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  farmTagline: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 3,
  },
  farmUrdu: {
    fontSize: 14,
    color: '#86efac',
    marginTop: 4,
    textAlign: 'right',
    fontWeight: '600',
  },
  heroBox: {
    borderRadius: 18,
    overflow: 'hidden',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#27272a',
    backgroundColor: '#1c1c1e',
  },
  heroBoxWide: {
    flexDirection: 'row',
    minHeight: 280,
  },
  heroImage: {
    width: '100%',
    height: 190,
  },
  heroImageWide: {
    width: '45%',
    height: '100%',
    minHeight: 280,
  },
  heroOverlay: {
    padding: 16,
    backgroundColor: '#1c1c1e',
  },
  heroOverlayWide: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  heroBadge: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  a2Pill: {
    backgroundColor: '#052e16',
    color: '#4ade80',
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#166534',
  },
  heroHeading: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 14,
  },
  heroLocation: {
    color: '#9ca3af',
    fontSize: 12,
    flex: 1,
  },
  heroButtonsContainer: {
    marginTop: 4,
  },
  heroButtonsWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryBtn: {
    backgroundColor: '#15803d',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  secondaryBtn: {
    backgroundColor: '#27272a',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: '#4ade80',
    fontWeight: '700',
    fontSize: 12,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  quickCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
    marginBottom: 10,
  },
  quickEmoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  quickCardTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  quickCardSub: {
    color: '#9ca3af',
    fontSize: 10,
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  paragraph: {
    color: '#d1d5db',
    fontSize: 12,
    lineHeight: 18,
  },
  boldWhite: {
    color: '#fff',
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 14,
    marginBottom: 14,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#27272a',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statNum: {
    color: '#4ade80',
    fontSize: 18,
    fontWeight: '900',
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 10,
    marginTop: 2,
    fontWeight: '600',
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: '#3f3f46',
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineBtnText: {
    color: '#4ade80',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 22,
    marginBottom: 10,
  },
  sectionHeading: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sectionSubHeading: {
    color: '#9ca3af',
    fontSize: 11,
    marginTop: 2,
  },
  viewAllText: {
    color: '#4ade80',
    fontSize: 12,
    fontWeight: '700',
  },
  horizontalScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  featuredGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  animalCardWide: {
    backgroundColor: '#1c1c1e',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#27272a',
    marginBottom: 16,
  },
  animalCard: {
    width: 200,
    backgroundColor: '#1c1c1e',
    borderRadius: 14,
    overflow: 'hidden',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  animalCardImage: {
    width: '100%',
    height: 130,
  },
  animalCardBody: {
    padding: 10,
  },
  breedBadge: {
    backgroundColor: '#27272a',
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 4,
  },
  breedBadgeText: {
    color: '#4ade80',
    fontSize: 9,
    fontWeight: '700',
  },
  animalName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  animalPrice: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
  },
  animalMilk: {
    color: '#9ca3af',
    fontSize: 10,
    marginTop: 2,
  },
  bottomRowWide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  contactCard: {
    backgroundColor: '#1c1c1e',
    alignItems: 'center',
    textAlign: 'center',
  },
  contactTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 8,
  },
  contactSub: {
    color: '#9ca3af',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 14,
    lineHeight: 16,
  },
  whatsappBtn: {
    backgroundColor: '#15803d',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  phoneBtn: {
    backgroundColor: '#27272a',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  btnTextWhite: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  linkButton: {
    paddingVertical: 4,
  },
  linkButtonText: {
    color: '#4ade80',
    fontSize: 11,
    fontWeight: '600',
  },
  locationCard: {
    backgroundColor: '#1c1c1e',
  },
  urduAddressText: {
    color: '#86efac',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
    fontWeight: '600',
  },
  textMuted: {
    color: '#9ca3af',
    fontSize: 11,
    marginTop: 2,
  },
  mapBtn: {
    backgroundColor: '#15803d',
    borderRadius: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  aiFeatureBanner: {
    backgroundColor: '#052e16',
    borderWidth: 1.5,
    borderColor: '#16a34a',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  aiFeatureLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  aiFeatureIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#14532d',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  aiBadge: {
    backgroundColor: '#166534',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  aiBadgeText: {
    color: '#86efac',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  aiFeatureTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  aiFeatureSub: {
    color: '#a7f3d0',
    fontSize: 11,
    marginTop: 2,
  },
  aiFeatureAction: {
    backgroundColor: '#4ade80',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  aiActionText: {
    color: '#052e16',
    fontSize: 12,
    fontWeight: '800',
  },
});
