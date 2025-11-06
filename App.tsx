/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import CrowdConnectedSdk, { SDKLocation } from './CrowdConnectedSdk';
import Permissions from './src/permissions';

type SDKStatus = 'idle' | 'requesting-permissions' | 'starting' | 'running' | 'error';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';

  const [sdkStatus, setSdkStatus] = useState<SDKStatus>('idle');
  const [sdkVersion, setSdkVersion] = useState<string>('');
  const [deviceId, setDeviceId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [permissionsGranted, setPermissionsGranted] = useState<boolean>(false);
  const [location, setLocation] = useState<SDKLocation | null>(null);
  const [locationUpdates, setLocationUpdates] = useState<number>(0);
  const [startupMessage, setStartupMessage] = useState<string>('');

  useEffect(() => {
    // Get SDK version on mount
    CrowdConnectedSdk.getVersion()
      .then(version => setSdkVersion(version))
      .catch(err => console.warn('Failed to get SDK version:', err));

    // Subscribe to SDK events
    const locationSub = CrowdConnectedSdk.onLocation(loc => {
      setLocation(loc);
      setLocationUpdates(prev => prev + 1);
    });

    const successSub = CrowdConnectedSdk.onStartUpSuccess(() => {
      setSdkStatus('running');
      setStartupMessage('SDK started successfully');
      // Get device ID after successful start
      CrowdConnectedSdk.getDeviceId()
        .then(id => setDeviceId(id || 'N/A'))
        .catch(() => setDeviceId('N/A'));
    });

    const failureSub = CrowdConnectedSdk.onStartUpFailure(err => {
      setSdkStatus('error');
      setErrorMessage(`Startup failed: ${err.reason || 'unknown'}`);
    });

    const errorSub = CrowdConnectedSdk.onRuntimeError(err => {
      setErrorMessage(`Runtime error: ${err.reason || 'unknown'}`);
    });

    return () => {
      locationSub.remove();
      successSub.remove();
      failureSub.remove();
      errorSub.remove();
    };
  }, []);

  const handleRequestPermissions = async () => {
    setSdkStatus('requesting-permissions');
    setErrorMessage('');
    try {
      const ok = await Permissions.requestLocationPermissions();
      setPermissionsGranted(ok);
      if (!ok) {
        setSdkStatus('error');
        setErrorMessage('Permissions denied. Please grant location and bluetooth permissions.');
      } else {
        setSdkStatus('idle');
      }
    } catch (err) {
      setSdkStatus('error');
      setErrorMessage(`Permission request failed: ${err}`);
    }
  };

  const handleStartSDK = async () => {
    setSdkStatus('starting');
    setErrorMessage('');
    setStartupMessage('');
    try {
      await CrowdConnectedSdk.start({
        ips: true,
        geo: true,
        bluetooth: true,
        background: true,
        appKey: 'APP_KEY_EXAMPLE_123456',
        token: 'APP_TOKEN_EXAMPLE_123456',
        secret: 'APP_SECRET_EXAMPLE_123456',
      });
      // Status will be updated by the onStartUpSuccess event
    } catch (err: any) {
      setSdkStatus('error');
      setErrorMessage(`Failed to start SDK: ${err?.message || err}`);
    }
  };

  const handleStopSDK = async () => {
    try {
      await CrowdConnectedSdk.stop();
      setSdkStatus('idle');
      setStartupMessage('SDK stopped');
      setLocation(null);
      setLocationUpdates(0);
    } catch (err: any) {
      setErrorMessage(`Failed to stop SDK: ${err?.message || err}`);
    }
  };

  const backgroundColor = isDarkMode ? '#000' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#000';
  const cardBackground = isDarkMode ? '#1c1c1e' : '#f2f2f7';
  const borderColor = isDarkMode ? '#38383a' : '#c6c6c8';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={[styles.content, { paddingTop: safeAreaInsets.top }]}
    >
      <Text style={[styles.title, { color: textColor }]}>CrowdConnected SDK</Text>

      {/* SDK Info Card */}
      <View style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
        <Text style={[styles.cardTitle, { color: textColor }]}>SDK Info</Text>
        <Text style={[styles.infoText, { color: textColor }]}>Version: {sdkVersion || 'Loading...'}</Text>
        <Text style={[styles.infoText, { color: textColor }]}>Device ID: {deviceId || 'Not available'}</Text>
        <View style={styles.statusRow}>
          <Text style={[styles.infoText, { color: textColor }]}>Status: </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(sdkStatus) }]}>
            <Text style={styles.statusText}>{sdkStatus.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      {startupMessage ? (
        <View style={[styles.card, { backgroundColor: '#d4edda', borderColor: '#c3e6cb' }]}>
          <Text style={[styles.messageText, { color: '#155724' }]}>{startupMessage}</Text>
        </View>
      ) : null}

      {errorMessage ? (
        <View style={[styles.card, { backgroundColor: '#f8d7da', borderColor: '#f5c6cb' }]}>
          <Text style={[styles.messageText, { color: '#721c24' }]}>{errorMessage}</Text>
        </View>
      ) : null}

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        {sdkStatus === 'idle' && !permissionsGranted && (
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleRequestPermissions}
          >
            <Text style={styles.buttonText}>Request Permissions</Text>
          </TouchableOpacity>
        )}

        {sdkStatus === 'requesting-permissions' && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={[styles.loadingText, { color: textColor }]}>Requesting permissions...</Text>
          </View>
        )}

        {permissionsGranted && sdkStatus === 'idle' && (
          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={handleStartSDK}
          >
            <Text style={styles.buttonText}>Start SDK</Text>
          </TouchableOpacity>
        )}

        {sdkStatus === 'starting' && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#34C759" />
            <Text style={[styles.loadingText, { color: textColor }]}>Starting SDK...</Text>
          </View>
        )}

        {sdkStatus === 'running' && (
          <TouchableOpacity
            style={[styles.button, styles.dangerButton]}
            onPress={handleStopSDK}
          >
            <Text style={styles.buttonText}>Stop SDK</Text>
          </TouchableOpacity>
        )}

        {sdkStatus === 'error' && (
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => {
              setSdkStatus('idle');
              setErrorMessage('');
            }}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Location Updates Card */}
      {sdkStatus === 'running' && (
        <View style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
          <Text style={[styles.cardTitle, { color: textColor }]}>
            Location Updates ({locationUpdates})
          </Text>
          {location ? (
            <View style={styles.locationData}>
              <Text style={[styles.locationLabel, { color: textColor }]}>Coordinates:</Text>
              <Text style={[styles.locationValue, { color: textColor }]}>
                Lat: {location.latitude.toFixed(6)}, Lon: {location.longitude.toFixed(6)}
              </Text>
              <Text style={[styles.locationLabel, { color: textColor }]}>Position (meters):</Text>
              <Text style={[styles.locationValue, { color: textColor }]}>
                X: {location.xMetres.toFixed(2)}, Y: {location.yMetres.toFixed(2)}
              </Text>
              {location.surfaceId && (
                <>
                  <Text style={[styles.locationLabel, { color: textColor }]}>Surface ID:</Text>
                  <Text style={[styles.locationValue, { color: textColor }]}>{location.surfaceId}</Text>
                </>
              )}
              {location.floor !== undefined && (
                <>
                  <Text style={[styles.locationLabel, { color: textColor }]}>Floor:</Text>
                  <Text style={[styles.locationValue, { color: textColor }]}>{location.floor}</Text>
                </>
              )}
              {location.locationType && (
                <>
                  <Text style={[styles.locationLabel, { color: textColor }]}>Type:</Text>
                  <Text style={[styles.locationValue, { color: textColor }]}>{location.locationType}</Text>
                </>
              )}
              <Text style={[styles.locationLabel, { color: textColor }]}>Timestamp:</Text>
              <Text style={[styles.locationValue, { color: textColor }]}>
                {new Date(location.timestamp).toLocaleTimeString()}
              </Text>
            </View>
          ) : (
            <Text style={[styles.infoText, { color: textColor }]}>Waiting for location updates...</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

function getStatusColor(status: SDKStatus): string {
  switch (status) {
    case 'idle':
      return '#8E8E93';
    case 'requesting-permissions':
      return '#FF9500';
    case 'starting':
      return '#FF9500';
    case 'running':
      return '#34C759';
    case 'error':
      return '#FF3B30';
    default:
      return '#8E8E93';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 6,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    marginVertical: 16,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  successButton: {
    backgroundColor: '#34C759',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  locationData: {
    marginTop: 8,
  },
  locationLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
  },
  locationValue: {
    fontSize: 14,
    marginTop: 2,
    marginLeft: 8,
  },
});

export default App;
