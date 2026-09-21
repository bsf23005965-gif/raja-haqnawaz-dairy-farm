import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FARM_CONTACT } from '../constants/farmContact';

export default function AIConsultantScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: 'Assalam-o-Alaikum! I am the AI Livestock & Dairy Consultant at Raja Haqnawaz Dairy Farm. How can I help you regarding cattle health, milk yield, feeding plans, or animal selection today?',
      time: 'Just now',
    },
  ]);

  const quickQuestions = [
    'Sahiwal cow high milk diet chart',
    'Nili-Ravi buffalo winter feed & care',
    'Symptoms of Mastitis (ساڑو) and cure',
    'Best vaccination schedule for Punjab',
    'How to visit Raja Haqnawaz farm in Jauharabad',
  ];

  const getKnowledgeResponse = (q) => {
    const lower = q.toLowerCase();
    if (lower.includes('diet') || lower.includes('feed') || lower.includes('خوراک') || lower.includes('چارہ')) {
      return 'For optimal milk production in Sahiwal & Friesian cows: Provide 30-35 kg green fodder (Barseem/Lucerne/Maize silage) + 1 kg concentrated wanda (18% protein) per 2.5 kg milk yield. Ensure mineral mixture (50g daily) and 24/7 clean fresh water.';
    } else if (lower.includes('mastitis') || lower.includes('ساڑو') || lower.includes('teat')) {
      return 'Mastitis (ساڑو) Alert: Symptoms include swollen teats, blood clots in milk, or hot udder. Immediate Action: Strip out milk completely, apply ice packs to reduce swelling, avoid dirty bedding, and immediately consult our farm veterinarian. You can also call our farm office at 0300-6072070.';
    } else if (lower.includes('nili') || lower.includes('buffalo') || lower.includes('بھینس')) {
      return 'Nili-Ravi Buffalo Care: Pure Nili-Ravi buffaloes thrive on high TDN silage, cottonseed cake (khal), and wheat straw (bhoosa). Regular deworming every 3 months and bath twice daily increases milk output by 15-20%.';
    } else if (lower.includes('vaccine') || lower.includes('ٹیکہ') || lower.includes('fmd') || lower.includes('hs')) {
      return 'Recommended Punjab Vaccination Schedule:\n1. FMD (منہ کھر): Twice a year (March & September)\n2. HS (گل گھوٹو): May/June before monsoon\n3. Anthrax: Yearly in endemic zones\n4. Black Quarter (چوڑیا): Annual pre-monsoon.';
    } else if (lower.includes('visit') || lower.includes('location') || lower.includes('buy') || lower.includes('قیمت')) {
      return 'You are welcome to visit Raja Haqnawaz Dairy Farm at Naseem Colony near Imambargah, Jauharabad, District Khushab! Visiting hours are 7 days a week, 6:00 AM to 9:00 PM. Call Raja Haqnawaz at 0300-6072070.';
    }
    return 'Thank you for your inquiry. At Raja Haqnawaz Dairy Farm, our livestock specialists recommend keeping pure bloodlines, proper biosecure housing, balanced TMR feed, and seasonal vaccinations. For custom animal evaluation, you can call us directly at 0300-6072070.';
  };

  const handleSend = (customText) => {
    const question = customText || inputQuery;
    if (!question.trim()) return;

    const userMsg = {
      sender: 'user',
      text: question,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    setTimeout(() => {
      const response = getKnowledgeResponse(question);
      const aiMsg = {
        sender: 'ai',
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatHistory((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 600);
  };

  const callFarm = () => {
    Linking.openURL(`tel:${FARM_CONTACT.phone}`);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('Assalam-o-Alaikum Raja Haqnawaz Farm! I need advice from your livestock expert regarding cattle health/purchase.');
    Linking.openURL(`whatsapp://send?phone=${FARM_CONTACT.internationalWhatsapp}&text=${text}`);
  };

  return (
    <View style={styles.container}>
      {/* Header Banner */}
      <View style={styles.topBanner}>
        <View style={styles.badgeRow}>
          <View style={styles.onlineBadge}>
            <View style={styles.dot} />
            <Text style={styles.badgeText}>AI VET ASSISTANT ONLINE</Text>
          </View>
          <TouchableOpacity style={styles.callBtn} onPress={callFarm}>
            <Ionicons name="call" size={12} color="#fff" style={{ marginRight: 4 }} />
            <Text style={styles.callBtnText}>Emergency Vet</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bannerTitle}>Smart Dairy & Livestock Consultant</Text>
        <Text style={styles.bannerDesc}>
          Trained on Raja Haqnawaz Farm pedigree data, Sahiwal cow management, and Nili-Ravi dairy farming.
        </Text>
      </View>

      {/* Quick Prompts */}
      <View style={styles.quickBox}>
        <Text style={styles.quickTitle}>Quick Questions / فوری سوالات:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickScroll}>
          {quickQuestions.map((q, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.chip}
              onPress={() => handleSend(q)}
            >
              <Text style={styles.chipText}>{q}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Chat Messages */}
      <ScrollView
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={true}
      >
        {chatHistory.map((item, idx) => (
          <View
            key={idx}
            style={[
              styles.msgBubble,
              item.sender === 'user' ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <View style={styles.senderHeader}>
              <Ionicons
                name={item.sender === 'user' ? 'person-circle' : 'sparkles'}
                size={16}
                color={item.sender === 'user' ? '#93c5fd' : '#4ade80'}
                style={{ marginRight: 4 }}
              />
              <Text style={styles.senderName}>
                {item.sender === 'user' ? 'You' : 'Raja Haqnawaz AI Vet'}
              </Text>
              <Text style={styles.msgTime}>{item.time}</Text>
            </View>
            <Text style={styles.msgText}>{item.text}</Text>
          </View>
        ))}

        {loading && (
          <View style={[styles.msgBubble, styles.aiBubble, { flexDirection: 'row', alignItems: 'center' }]}>
            <ActivityIndicator size="small" color="#4ade80" style={{ marginRight: 8 }} />
            <Text style={styles.loadingText}>Analyzing dairy knowledge...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input Field */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ask about cattle health, milk yield, feed..."
          placeholderTextColor="#71717a"
          value={inputQuery}
          onChangeText={setInputQuery}
          onSubmitEditing={() => handleSend()}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={() => handleSend()}>
          <Ionicons name="send" size={18} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.waBtn} onPress={openWhatsApp} title="WhatsApp Vet">
          <Ionicons name="logo-whatsapp" size={18} color="#4ade80" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  topBanner: {
    padding: 14,
    backgroundColor: '#18181b',
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: '#166534',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ade80',
    marginRight: 6,
  },
  badgeText: {
    color: '#4ade80',
    fontSize: 9,
    fontWeight: '800',
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc2626',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  callBtnText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  bannerDesc: {
    color: '#a1a1aa',
    fontSize: 11,
    marginTop: 2,
  },
  quickBox: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#121212',
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },
  quickTitle: {
    color: '#71717a',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  quickScroll: {
    flexDirection: 'row',
  },
  chip: {
    backgroundColor: '#27272a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#3f3f46',
  },
  chipText: {
    color: '#e4e4e7',
    fontSize: 11,
    fontWeight: '600',
  },
  chatArea: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  chatContent: {
    padding: 14,
    paddingBottom: 20,
  },
  msgBubble: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    maxWidth: '88%',
  },
  aiBubble: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#166534',
    alignSelf: 'flex-end',
  },
  senderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderName: {
    color: '#d4d4d8',
    fontSize: 10,
    fontWeight: '700',
    flex: 1,
  },
  msgTime: {
    color: '#71717a',
    fontSize: 9,
  },
  msgText: {
    color: '#f4f4f5',
    fontSize: 13,
    lineHeight: 18,
  },
  loadingText: {
    color: '#a1a1aa',
    fontSize: 12,
    fontStyle: 'italic',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#18181b',
    borderTopWidth: 1,
    borderTopColor: '#27272a',
  },
  input: {
    flex: 1,
    backgroundColor: '#27272a',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#3f3f46',
  },
  sendBtn: {
    backgroundColor: '#16a34a',
    padding: 10,
    borderRadius: 12,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waBtn: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: '#166534',
    padding: 10,
    borderRadius: 12,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
