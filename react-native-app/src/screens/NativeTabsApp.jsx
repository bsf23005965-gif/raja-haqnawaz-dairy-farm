import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import LivestockScreen from './LivestockScreen';
import AIConsultantScreen from './AIConsultantScreen';
import ContactScreen from './ContactScreen';
import LocationScreen from './LocationScreen';

const Tab = createBottomTabNavigator();

export default function NativeTabsApp() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#121212" />
      <View style={styles.outerContainer}>
        <View
          style={[
            styles.responsiveContainer,
            {
              width: '100%',
              maxWidth: isMobile ? '100%' : 900,
              height: Platform.OS === 'web' ? '100vh' : '100%',
            },
          ]}
        >
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={({ route }) => ({
                headerStyle: {
                  backgroundColor: '#121212',
                  borderBottomColor: '#27272a',
                  borderBottomWidth: 1,
                  elevation: 0,
                  shadowOpacity: 0,
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                  fontWeight: '900',
                  fontSize: 16,
                  letterSpacing: 0.5,
                },
                tabBarStyle: {
                  backgroundColor: '#121212',
                  borderTopColor: '#27272a',
                  borderTopWidth: 1,
                  height: Platform.OS === 'ios' ? 84 : 64,
                  paddingBottom: Platform.OS === 'ios' ? 24 : 8,
                  paddingTop: 8,
                },
                tabBarActiveTintColor: '#4ade80',
                tabBarInactiveTintColor: '#9ca3af',
                tabBarLabelStyle: {
                  fontSize: 10,
                  fontWeight: '700',
                },
                tabBarIcon: ({ focused, color }) => {
                  let iconName = 'home';
                  if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Livestock') {
                    iconName = focused ? 'paw' : 'paw-outline';
                  } else if (route.name === 'AI') {
                    iconName = focused ? 'sparkles' : 'sparkles-outline';
                  } else if (route.name === 'About') {
                    iconName = focused ? 'ribbon' : 'ribbon-outline';
                  } else if (route.name === 'Contact') {
                    iconName = focused ? 'call' : 'call-outline';
                  } else if (route.name === 'Location') {
                    iconName = focused ? 'location' : 'location-outline';
                  }
                  return <Ionicons name={iconName} size={22} color={color} />;
                },
              })}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Haqnawaz Farm' }}
              />
              <Tab.Screen
                name="Livestock"
                component={LivestockScreen}
                options={{ title: 'Livestock (33)' }}
              />
              <Tab.Screen
                name="AI"
                component={AIConsultantScreen}
                options={{ title: 'AI Doctor' }}
              />
              <Tab.Screen
                name="About"
                component={AboutScreen}
                options={{ title: 'About Farm' }}
              />
              <Tab.Screen
                name="Contact"
                component={ContactScreen}
                options={{ title: 'Contact Us' }}
              />
              <Tab.Screen
                name="Location"
                component={LocationScreen}
                options={{ title: 'Farm Location' }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  outerContainer: {
    flex: 1,
    width: '100%',
    height: Platform.OS === 'web' ? '100vh' : '100%',
    backgroundColor: '#09090b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  responsiveContainer: {
    flex: 1,
    backgroundColor: '#121212',
    alignSelf: 'center',
    borderLeftWidth: Platform.OS === 'web' ? 1 : 0,
    borderRightWidth: Platform.OS === 'web' ? 1 : 0,
    borderColor: '#27272a',
    overflow: 'hidden',
  },
});
