# CrowdConnected SDK - React Native Integration Example

This project demonstrates how to integrate the **CrowdConnected SDK** into a React Native application for both iOS and Android platforms. The SDK provides indoor positioning services using IPS (Indoor Positioning System), GPS, and Bluetooth beacon technology.

![iOS Demo](docs/ios-demo.png) ![Android Demo](docs/android-demo.png)

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [SDK Integration Guide](#sdk-integration-guide)
  - [Step 1: Install Dependencies](#step-1-install-dependencies)
  - [Step 2: iOS Setup](#step-2-ios-setup)
  - [Step 3: Android Setup](#step-3-android-setup)
  - [Step 4: Create TypeScript Bridge](#step-4-create-typescript-bridge)
  - [Step 5: Implement Permissions](#step-5-implement-permissions)
  - [Step 6: Use the SDK](#step-6-use-the-sdk)
- [Running the Example App](#running-the-example-app)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide. You'll need:

- **Node.js** >= 20
- **React Native** 0.82+
- **iOS**: Xcode 14+, CocoaPods
- **Android**: Android Studio, JDK 11+
- **CrowdConnected Account**: App Key, Token, and Secret from [CrowdConnected Console](https://console.crowdconnected.com)

## Installation

```bash
# Clone the repository
git clone https://github.com/crowdconnected/crowd-connected-sdk-rn-examples.git
cd crowd-connected-sdk-rn-examples

# Install dependencies
npm install

# iOS only: Install CocoaPods
bundle install
cd ios && bundle exec pod install && cd ..
```

## SDK Integration Guide

Follow these steps to integrate CrowdConnected SDK into your own React Native project.

### Step 1: Install Dependencies

Install the required React Native packages:

```bash
npm install react-native-permissions react-native-safe-area-context
```

### Step 2: iOS Setup

#### 2.1 Add CrowdConnected SDK to Podfile

Edit `ios/Podfile` and configure permissions:

```ruby
# Add this function at the top of your Podfile
def node_require(script)
  require Pod::Executable.execute_command('node', ['-p',
    "require.resolve(
      '#{script}',
      {paths: [process.argv[1]]},
    )", __dir__]).strip
end

node_require('react-native/scripts/react_native_pods.rb')
node_require('react-native-permissions/scripts/setup.rb')

platform :ios, '14.0'
prepare_react_native_project!

# Setup required permissions
setup_permissions([
  'Bluetooth',
  'LocationAccuracy',
  'LocationAlways',
  'LocationWhenInUse',
])

target 'YourAppName' do
  config = use_native_modules!

  use_react_native!(
    :path => config[:reactNativePath],
    :app_path => "#{Pod::Config.instance.installation_root}/.."
  )

  post_install do |installer|
    react_native_post_install(
      installer,
      config[:reactNativePath],
      :mac_catalyst_enabled => false
    )
  end
end
```

#### 2.2 Add CrowdConnected SDK via Xcode

1. Open your `.xcworkspace` file in Xcode
2. Go to **File > Add Package Dependencies**
3. Add these packages (version 2.1.x):
   - `https://github.com/crowdconnected/crowdconnected-core-ios`
   - `https://github.com/crowdconnected/crowdconnected-ips-ios`
   - `https://github.com/crowdconnected/crowdconnected-geo-ios`
   - `https://github.com/crowdconnected/crowdconnected-corebluetooth-ios`

#### 2.3 Configure Info.plist

Add these keys to `ios/YourAppName/Info.plist`:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Using location for positioning</string>

<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>App needs location access for positioning services</string>

<key>NSBluetoothAlwaysUsageDescription</key>
<string>App needs Bluetooth for indoor positioning</string>

<key>UIBackgroundModes</key>
<array>
  <string>location</string>
  <string>bluetooth-central</string>
</array>
```

#### 2.4 Create Native Bridge Files

See the existing files in this project:
- `ios/CrowdConnectedSdk.swift`
- `ios/CrowdConnectedSdkBridge.m`
- `ios/ccsdkrnexample-Bridging-Header.h`

### Step 3: Android Setup

#### 3.1 Add Dependencies to build.gradle

```gradle
dependencies {
    implementation("com.facebook.react:react-android")
    
    // CrowdConnected SDK
    implementation("net.crowdconnected.android.core:android-core:2.1.2")
    implementation("net.crowdconnected.android.ips:android-ips:2.1.2")
    implementation("net.crowdconnected.android.geo:android-geo:2.1.2")
    implementation("net.crowdconnected.android.background:android-background:2.1.2")
}
```

#### 3.2 Configure AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
```

#### 3.3 Create Native Modules

See the existing files in this project:
- `android/app/src/main/java/com/ccsdkrnexample/CrowdConnectedSdkModule.kt`
- `android/app/src/main/java/com/ccsdkrnexample/CrowdConnectedSdkPackage.kt`

### Step 4: Create TypeScript Bridge

See `CrowdConnectedSdk.ts` in the project root for the complete implementation.

### Step 5: Implement Permissions

See `src/permissions.ts` for cross-platform permission handling.

### Step 6: Use the SDK

Example usage:

```typescript
import CrowdConnectedSdk from './CrowdConnectedSdk'
import Permissions from './src/permissions'

// Request permissions
const granted = await Permissions.requestLocationPermissions()

// Start SDK
await CrowdConnectedSdk.start({
  ips: true,
  geo: true,
  bluetooth: true,
  background: true,
  appKey: 'YOUR_APP_KEY',
  token: 'YOUR_TOKEN',
  secret: 'YOUR_SECRET',
})

// Subscribe to location updates
CrowdConnectedSdk.onLocation((location) => {
  console.log('Location:', location.latitude, location.longitude)
})
```

## Running the Example App

### iOS

```bash
npm install
cd ios && bundle exec pod install && cd ..
npm run ios
```

### Android

```bash
npm install
npm run android
```

## API Reference

### `CrowdConnectedSdk.start(settings)`

Starts the SDK with configuration.

**Parameters:**
- `settings.appKey` (string, required)
- `settings.token` (string, required)
- `settings.secret` (string, required)
- `settings.ips` (boolean, optional)
- `settings.geo` (boolean, optional)
- `settings.bluetooth` (boolean, optional)
- `settings.background` (boolean, optional)

### `CrowdConnectedSdk.stop()`

Stops the SDK and all tracking.

### `CrowdConnectedSdk.getVersion()`

Returns SDK version as Promise<string>.

### `CrowdConnectedSdk.getDeviceId()`

Returns device ID as Promise<string | null>.

### `CrowdConnectedSdk.setAlias(key, value)`

Sets a custom alias for the device.

### Event Listeners

- `onLocation(callback)` - Location updates
- `onStartUpSuccess(callback)` - SDK started successfully
- `onStartUpFailure(callback)` - SDK startup failed
- `onRuntimeError(callback)` - Runtime errors

**Location Object:**
```typescript
{
  xMetres: number
  yMetres: number
  latitude: number
  longitude: number
  timestamp: number
  surfaceId?: string
  floor?: number
  xPixels: number
  yPixels: number
  locationType?: string
  quality?: number
}
```

## Troubleshooting

### iOS Issues

**Build fails with "No such module"**
- Run `cd ios && pod install && cd ..`
- Add Swift packages via Xcode

**Location not updating**
- Check Info.plist has all required permissions
- Verify background modes are enabled

### Android Issues

**SDK not starting**
- Verify dependencies in build.gradle
- Check AndroidManifest.xml permissions

**App crashes**
- Ensure MainApplication.application is initialized

### General Issues

**Native module not linked**
- iOS: Run `pod install` and rebuild
- Android: Clean and rebuild

**No location updates**
- Check permissions are granted
- Verify credentials are correct
- Ensure both IPS and GEO are enabled

## Learn More

- [CrowdConnected Documentation](https://docs.crowdconnected.com)
- [CrowdConnected Console](https://console.crowdconnected.com)
- [React Native Documentation](https://reactnative.dev)

## License

See the [LICENSE](LICENSE) file for details.
