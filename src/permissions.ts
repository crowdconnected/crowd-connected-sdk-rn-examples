import { Platform, PermissionsAndroid } from 'react-native'

// Cross-platform helper to request location (and bluetooth where appropriate) permissions.
// Uses react-native-permissions when available on iOS for better UX; falls back to
// PermissionsAndroid on Android. This file is defensive: it will not crash if
// 'react-native-permissions' isn't installed, but installing it is recommended.

export async function requestLocationPermissions(): Promise<boolean> {
  if (Platform.OS === 'android') {
    try {
      const fine = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission',
          message: 'App needs access to your location for indoor positioning',
          buttonPositive: 'OK',
        }
      )

      // background permission is separate on Android 10+ (Q)
      let backgroundGranted = true
      if (PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION) {
        try {
          backgroundGranted = (await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
            {
              title: 'Background location',
              message: 'App needs background location to continue positioning when not in foreground',
              buttonPositive: 'OK',
            }
          )) === PermissionsAndroid.RESULTS.GRANTED
        } catch (e) {
          backgroundGranted = true
        }
      }

      // Newer Android versions use separate bluetooth scan/connect permissions (API 31+). Try to request them if available.
      let bluetoothGranted = true
      if ((PermissionsAndroid.PERMISSIONS as any).BLUETOOTH_SCAN) {
        try {
          bluetoothGranted = (await PermissionsAndroid.request((PermissionsAndroid.PERMISSIONS as any).BLUETOOTH_SCAN, {
            title: 'Bluetooth scan',
            message: 'App needs Bluetooth permission for device discovery',
            buttonPositive: 'OK',
          })) === PermissionsAndroid.RESULTS.GRANTED
        } catch (e) {
          bluetoothGranted = true
        }
      }

      return fine === PermissionsAndroid.RESULTS.GRANTED && backgroundGranted && bluetoothGranted
    } catch (e) {
      console.warn('requestLocationPermissions(android) failed', e)
      return false
    }
  }

  // iOS: prefer react-native-permissions if available (handles 'limited' state etc)
  try {
    // require at runtime to avoid hard dependency
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const rnp = require('react-native-permissions')
    const { request, PERMISSIONS, RESULTS } = rnp
    const res = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    return res === RESULTS.GRANTED || res === RESULTS.LIMITED
  } catch (e) {
    // react-native-permissions not available; rely on Info.plist and assume user will be prompted
    console.warn('react-native-permissions not installed — ensure NSLocationWhenInUseUsageDescription is present in Info.plist')
    return true
  }
}

export default {
  requestLocationPermissions,
}
