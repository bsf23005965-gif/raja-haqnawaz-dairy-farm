import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Linking,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ALL_33_ANIMALS } from '../data/animals';
import { FARM_CONTACT } from '../constants/farmContact';

export default function LivestockScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const numCols = width >= 1024 ? 3 : width >= 640 ? 2 : 1;
  const isDesktop = width >= 1024;

  const [search, setSearch] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('All');

  const breeds = ['All', 'Sahiwal', 'Nili Ravi', 'Cholistani', 'Buffalo', 'Cow'];

  const filteredAnimals = ALL_33_ANIMALS.filter((animal) => {
    const matchesSearch = animal.name.toLowerCase().includes(search.toLowerCase()) ||
                          animal.breed.toLowerCase().includes(search.toLowerCase()) ||
                          animal.id.toLowerCase().includes(search.toLowerCase());
    
    if (selectedBreed === 'All') return matchesSearch;
    if (selectedBreed === 'Cow') return matchesSearch && animal.type === 'Cow';
    if (selectedBreed === 'Buffalo') return matchesSearch && animal.type === 'Buffalo';
    return matchesSearch && animal.breed.toLowerCase().includes(selectedBreed.toLowerCase());
  });

  const inquireAnimal = (item) => {
    const text = encodeURIComponent(`Assalam-o-Alaikum! I am interested in ${item.name} (${item.id}) priced at PKR ${item.price.toLocaleString('en-PK')} from Raja Haqnawaz Dairy Farm.`);
    Linking.openURL(`whatsapp://send?phone=${FARM_CONTACT.internationalWhatsapp}&text=${text}`);
  };

  const cardWidth = numCols === 3 ? '31.8%' : numCols === 2 ? '48.5%' : '100%';

  const renderItem = ({ item }) => (
    <View style={[styles.card, { width: cardWidth }]}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.cardBody}>
        <View style={styles.badgeRow}>
          <View style={styles.breedTag}>
            <Text style={styles.breedTagText}>{item.breed} • {item.type}</Text>
          </View>
          <Text style={styles.idText}>{item.id}</Text>
        </View>

        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>

        <View style={styles.metricsRow}>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Weight</Text>
            <Text style={styles.metricValue}>{item.weight} kg</Text>
          </View>
          <View style={[styles.metric, { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#3f3f46' }]}>
            <Text style={styles.metricLabel}>Milk Yield</Text>
            <Text style={styles.metricValue}>{item.milkProductionPerDay > 0 ? `${item.milkProductionPerDay} L/Day` : 'Breeder'}</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Age</Text>
            <Text style={styles.metricValue}>{item.age} Years</Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <View>
            <Text style={styles.priceLabel}>Verified Price</Text>
            <Text style={styles.priceText}>PKR {item.price.toLocaleString('en-PK')}</Text>
          </View>

          <TouchableOpacity style={styles.inquireBtn} onPress={() => inquireAnimal(item)}>
            <Ionicons name="logo-whatsapp" size={16} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.inquireBtnText}>Inquire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar & Header */}
      <View style={styles.topControls}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#9ca3af" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by breed, name, or tag..."
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={breeds}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const isSelected = selectedBreed === item;
              return (
                <TouchableOpacity
                  style={[styles.tab, isSelected && styles.activeTab]}
                  onPress={() => setSelectedBreed(item)}
                >
                  <Text style={[styles.tabText, isSelected && styles.activeTabText]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>

      {/* Count Indicator */}
      <View style={styles.countRow}>
        <Text style={styles.countText}>
          Showing <Text style={styles.countBold}>{filteredAnimals.length}</Text> of {ALL_33_ANIMALS.length} livestock animals
        </Text>
        <Text style={styles.gridInfoText}>
          {numCols === 3 ? 'Desktop 3-Column View' : numCols === 2 ? 'Tablet 2-Column View' : 'Mobile List View'}
        </Text>
      </View>

      {/* Main Animals FlatList with Dynamic Columns */}
      <FlatList
        key={numCols}
        numColumns={numCols}
        columnWrapperStyle={numCols > 1 ? styles.columnWrapper : undefined}
        data={filteredAnimals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          isDesktop && { paddingBottom: 110 }
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  topControls: {
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 13,
  },
  filterTabs: {
    marginTop: 10,
    marginBottom: 4,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: '#1c1c1e',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  activeTab: {
    backgroundColor: '#15803d',
    borderColor: '#22c55e',
  },
  tabText: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },
  countRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  countText: {
    color: '#9ca3af',
    fontSize: 12,
  },
  countBold: {
    color: '#4ade80',
    fontWeight: '700',
  },
  gridInfoText: {
    color: '#71717a',
    fontSize: 11,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: 90,
  },
  card: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#27272a',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 170,
  },
  cardBody: {
    padding: 14,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  breedTag: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: '#166534',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  breedTagText: {
    color: '#4ade80',
    fontSize: 10,
    fontWeight: '700',
  },
  idText: {
    color: '#9ca3af',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  name: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  description: {
    color: '#9ca3af',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    backgroundColor: '#27272a',
    borderRadius: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  metric: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    color: '#9ca3af',
    fontSize: 9,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  metricValue: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
  },
  priceLabel: {
    color: '#9ca3af',
    fontSize: 10,
  },
  priceText: {
    color: '#f59e0b',
    fontSize: 14,
    fontWeight: '800',
  },
  inquireBtn: {
    backgroundColor: '#15803d',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inquireBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});
