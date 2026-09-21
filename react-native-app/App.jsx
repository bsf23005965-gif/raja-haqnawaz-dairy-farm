import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import NativeTabsApp from './src/screens/NativeTabsApp';

// Use the native React Native screens instead of the remote WebView app
const USE_WEBVIEW_APP = true;

// Live deployed application URL
// Kept here in case you want to switch back to WebView later.
const APP_URL = 'http://10.110.181.172:3000';

export default function App() {
  if (!USE_WEBVIEW_APP) {
    return <NativeTabsApp />;
  }

  return <WebViewWrapper />;
}

function WebViewWrapper() {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Android hardware back button handler
  useEffect(() => {
    if (Platform.OS === 'android') {
      const onBackPress = () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }

        return false;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }
  }, [canGoBack]);

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#0a0a0a" />

      <SafeAreaView
        style={styles.container}
        edges={['top', 'bottom', 'left', 'right']}
      >
        <WebView
          ref={webViewRef}
          source={{ uri: APP_URL }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          allowsBackForwardNavigationGestures={true}
          pullToRefreshEnabled={true}
          startInLoadingState={true}
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack);
          }}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => setHasError(true)}
        />

        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#10b981" />

            <Text style={styles.loaderTitle}>
              Raja Haqnawaz Dairy Farm
            </Text>

            <Text style={styles.loaderSubtitle}>
              Connecting to live livestock portal...
            </Text>
          </View>
        )}

        {hasError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>📡</Text>

            <Text style={styles.errorTitle}>
              Connection Failed
            </Text>

            <Text style={styles.errorSubtitle}>
              Unable to reach Raja Haqnawaz Dairy Farm. Please verify your
              internet connection.
            </Text>

            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => {
                setHasError(false);
                setIsLoading(true);
                webViewRef.current?.reload();
              }}
            >
              <Text style={styles.retryButtonText}>
                Tap to Retry
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },

  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },

  webview: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },

  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  loaderTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    letterSpacing: 0.5,
  },

  loaderSubtitle: {
    color: '#34d399',
    fontSize: 13,
    marginTop: 6,
    fontWeight: '600',
  },

  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    zIndex: 20,
  },

  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },

  errorTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  errorSubtitle: {
    color: '#9ca3af',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },

  retryButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 3,
  },

  retryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});