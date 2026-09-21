import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FARM_CONTACT } from '../constants/farmContact';

export default function ContactScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const isDesktop = width >= 1024;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Assalam-o-Alaikum Raja Haqnawaz Dairy Farm! My name is ${name || 'Buyer'}. I want to inquire about livestock cattle.`);
    Linking.openURL(`whatsapp://send?phone=${FARM_CONTACT.internationalWhatsapp}&text=${text}`);
  };

  const openCall = () => {
    Linking.openURL(`tel:${FARM_CONTACT.phone}`);
  };

  const handleSendInquiry = () => {
    if (!name || !phone) {
      Alert.alert('Required Fields', 'Please enter your name and phone number.');
      return;
    }
    const text = encodeURIComponent(`*NEW INQUIRY FROM MOBILE APP*\nName: ${name}\nPhone: ${phone}\nMessage: ${message || 'Inquiring about dairy animals'}`);
    Linking.openURL(`whatsapp://send?phone=${FARM_CONTACT.internationalWhatsapp}&text=${text}`);
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
        <Text style={[styles.heading, isDesktop && { fontSize: 26 }]}>Get In Touch With Farm</Text>
        <Text style={styles.subheading}>Direct hotline to Raja Haqnawaz Dairy Farm management in District Khushab</Text>
      </View>

      <View style={isWide ? styles.twoColumnLayout : null}>
        {/* Left Column: Direct Info & Addresses */}
        <View style={isWide ? styles.leftCol : null}>
          {/* Direct Contact Action Cards */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.whatsappCard} onPress={openWhatsApp}>
              <Ionicons name="logo-whatsapp" size={28} color="#fff" />
              <Text style={styles.actionTitle}>WhatsApp</Text>
              <Text style={styles.actionSub}>{FARM_CONTACT.displayWhatsapp}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.phoneCard} onPress={openCall}>
              <Ionicons name="call" size={28} color="#4ade80" />
              <Text style={styles.actionTitle}>Direct Call</Text>
              <Text style={styles.actionSub}>{FARM_CONTACT.displayPhone}</Text>
            </TouchableOpacity>
          </View>

          {/* Official Address Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="location" size={20} color="#4ade80" style={{ marginRight: 8 }} />
              <Text style={styles.cardTitle}>Farm Physical Address</Text>
            </View>
            <Text style={styles.cardText}>{FARM_CONTACT.farmAddress}</Text>
            <Text style={styles.urduText}>{FARM_CONTACT.farmAddressUrdu}</Text>
            
            <View style={styles.infoPill}>
              <Ionicons name="time" size={14} color="#f59e0b" style={{ marginRight: 6 }} />
              <Text style={styles.mutedText}>Daily Visiting Hours: 6:00 AM to 9:00 PM</Text>
            </View>
          </View>

          {/* Direct Assistance Note */}
          <View style={[styles.card, { backgroundColor: '#18181b' }]}>
            <Text style={styles.noteTitle}>Direct Consultation</Text>
            <Text style={styles.noteDesc}>
              For live video tours of available Sahiwal cows and Nili-Ravi buffaloes, please message us on WhatsApp with your specific requirements.
            </Text>
          </View>
        </View>

        {/* Right Column: Inquiry Form */}
        <View style={isWide ? styles.rightCol : null}>
          <View style={[styles.card, styles.formCard]}>
            <Text style={styles.cardTitle}>Send Quick Inquiry</Text>
            <Text style={styles.formSub}>Fill this form to directly open WhatsApp with your details</Text>
            
            <Text style={styles.inputLabel}>Your Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Muhammad Ali"
              placeholderTextColor="#71717a"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.inputLabel}>Mobile / WhatsApp Number</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 0300 1234567"
              placeholderTextColor="#71717a"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text style={styles.inputLabel}>Inquiry Message</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="I am looking for a Sahiwal cow producing 18L milk..."
              placeholderTextColor="#71717a"
              multiline
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
            />

            <TouchableOpacity style={styles.submitBtn} onPress={handleSendInquiry}>
              <Ionicons name="paper-plane" size={16} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.submitBtnText}>Send Inquiry Via WhatsApp</Text>
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
    fontSize: 22,
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
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  whatsappCard: {
    width: '48.5%',
    backgroundColor: '#15803d',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  phoneCard: {
    width: '48.5%',
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  actionTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 6,
  },
  actionSub: {
    color: '#d1d5db',
    fontSize: 11,
    marginTop: 2,
  },
  card: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#27272a',
    marginBottom: 16,
  },
  formCard: {
    marginBottom: 0,
  },
  formSub: {
    color: '#9ca3af',
    fontSize: 11,
    marginTop: 2,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  cardText: {
    color: '#e5e7eb',
    fontSize: 13,
    lineHeight: 20,
  },
  urduText: {
    color: '#86efac',
    fontSize: 13,
    marginTop: 6,
    textAlign: 'right',
    fontWeight: '600',
  },
  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27272a',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 10,
  },
  mutedText: {
    color: '#d1d5db',
    fontSize: 11,
    fontWeight: '500',
  },
  noteTitle: {
    color: '#4ade80',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  noteDesc: {
    color: '#9ca3af',
    fontSize: 11,
    lineHeight: 17,
  },
  inputLabel: {
    color: '#9ca3af',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#27272a',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#3f3f46',
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: '#15803d',
    borderRadius: 12,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});
