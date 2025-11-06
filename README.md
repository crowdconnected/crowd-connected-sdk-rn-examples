# CrowdConnected SDK - React Native Integration ExampleThis is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).



This project demonstrates how to integrate the **CrowdConnected SDK** into a React Native application for both iOS and Android platforms. The SDK provides indoor positioning services using IPS (Indoor Positioning System), GPS, and Bluetooth beacon technology.# Getting Started



![iOS Demo](docs/ios-demo.png) ![Android Demo](docs/android-demo.png)> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.



## 📋 Table of Contents## Step 1: Start Metro



- [Prerequisites](#prerequisites)First, you will need to run **Metro**, the JavaScript build tool for React Native.

- [Installation](#installation)

- [SDK Integration Guide](#sdk-integration-guide)To start the Metro dev server, run the following command from the root of your React Native project:

  - [Step 1: Install Dependencies](#step-1-install-dependencies)

  - [Step 2: iOS Setup](#step-2-ios-setup)```sh

  - [Step 3: Android Setup](#step-3-android-setup)# Using npm

  - [Step 4: Create TypeScript Bridge](#step-4-create-typescript-bridge)npm start

  - [Step 5: Implement Permissions](#step-5-implement-permissions)

  - [Step 6: Use the SDK](#step-6-use-the-sdk)# OR using Yarn

- [Running the Example App](#running-the-example-app)yarn start

- [API Reference](#api-reference)```

- [Troubleshooting](#troubleshooting)

## Step 2: Build and run your app

## Prerequisites

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

Before you begin, ensure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide. You'll need:

### Android

- **Node.js** >= 20

- **React Native** 0.82+```sh

- **iOS**: Xcode 14+, CocoaPods# Using npm

- **Android**: Android Studio, JDK 11+npm run android

- **CrowdConnected Account**: App Key, Token, and Secret from [CrowdConnected Console](https://console.crowdconnected.com)

# OR using Yarn

## Installationyarn android

```

```bash

# Clone the repository### iOS

git clone https://github.com/crowdconnected/crowd-connected-sdk-rn-examples.git

cd crowd-connected-sdk-rn-examplesFor iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).



# Install dependenciesThe first time you create a new project, run the Ruby bundler to install CocoaPods itself:

npm install

```sh

# iOS only: Install CocoaPodsbundle install

bundle install```

cd ios && bundle exec pod install && cd ..

```Then, and every time you update your native dependencies, run:



## SDK Integration Guide```sh

bundle exec pod install

Follow these steps to integrate CrowdConnected SDK into your own React Native project.```



### Step 1: Install DependenciesFor more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).



Install the required React Native packages:```sh

# Using npm

```bashnpm run ios

npm install react-native-permissions react-native-safe-area-context

```# OR using Yarn

yarn ios

### Step 2: iOS Setup```



#### 2.1 Add CrowdConnected SDK to PodfileIf everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.



Edit `ios/Podfile` and add the CrowdConnected pods. First, set up permissions using `react-native-permissions`:This is one way to run your app — you can also build it directly from Android Studio or Xcode.



```ruby## Step 3: Modify your app

# Add this function at the top of your Podfile

def node_require(script)Now that you have successfully run the app, let's make changes!

  require Pod::Executable.execute_command('node', ['-p',

    "require.resolve(Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

      '#{script}',

      {paths: [process.argv[1]]},When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

    )", __dir__]).strip

end- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).

- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

node_require('react-native/scripts/react_native_pods.rb')

node_require('react-native-permissions/scripts/setup.rb')## Congratulations! :tada:



platform :ios, '14.0'You've successfully run and modified your React Native App. :partying_face:

prepare_react_native_project!

### Now what?

# Setup required permissions

setup_permissions([- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).

  'Bluetooth',              # Required for Bluetooth beacon scanning- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

  'LocationAccuracy',       # For precise location

  'LocationAlways',         # Required for background location tracking# Troubleshooting

  'LocationWhenInUse',      # Required for foreground location

])If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.



target 'YourAppName' do# Learn More

  config = use_native_modules!

To learn more about React Native, take a look at the following resources:

  use_react_native!(

    :path => config[:reactNativePath],- [React Native Website](https://reactnative.dev) - learn more about React Native.

    :app_path => "#{Pod::Config.instance.installation_root}/.."- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.

  )- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.

- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.

  # No need to explicitly add CrowdConnected pods here- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

  # They will be added via Swift Package Manager

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
3. Add the following packages:
   - `https://github.com/crowdconnected/crowdconnected-core-ios` (version 2.1.x)
   - `https://github.com/crowdconnected/crowdconnected-ips-ios` (version 2.1.x)
   - `https://github.com/crowdconnected/crowdconnected-geo-ios` (version 2.1.x)
   - `https://github.com/crowdconnected/crowdconnected-corebluetooth-ios` (version 2.1.x)

#### 2.3 Configure Info.plist

Add the following keys to `ios/YourAppName/Info.plist`:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Using location for positioning</string>

<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>App needs location access to provide positioning services even when in the background</string>

<key>NSLocationAlwaysUsageDescription</key>
<string>App needs location access to provide positioning services even when in the background</string>

<key>NSBluetoothAlwaysUsageDescription</key>
<string>App needs Bluetooth access to detect nearby beacons for indoor positioning</string>

<key>NSBluetoothPeripheralUsageDescription</key>
<string>App needs Bluetooth access to detect nearby beacons for indoor positioning</string>

<key>UIBackgroundModes</key>
<array>
  <string>location</string>
  <string>bluetooth-central</string>
</array>
```

#### 2.4 Create Swift Bridge Files

Create `ios/CrowdConnectedSdk.swift`:

```swift
import Foundation
import React
import CrowdConnectedCore
import CrowdConnectedGeo
import CrowdConnectedIPS
import CrowdConnectedCoreBluetooth

@objc(CrowdConnectedSdk)
class CrowdConnectedSdk: RCTEventEmitter {
  
  override func supportedEvents() -> [String]! {
    return [
      "CrowdConnectedSdkLocationUpdated",
      "CrowdConnectedSdkStartUpSuccess",
      "CrowdConnectedSdkStartUpFailure",
      "CrowdConnectedSdkRuntimeError"
    ]
  }
  
  @objc override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc func getVersion(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    resolve(CrowdConnected.getVersion())
  }
  
  @objc func getDeviceId(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    resolve(CrowdConnected.shared.deviceID)
  }
  
  @objc func start(_ settingsMap: NSDictionary) {
    let ips = settingsMap["ips"] as? Bool ?? false
    let geo = settingsMap["geo"] as? Bool ?? false
    let bluetooth = settingsMap["bluetooth"] as? Bool ?? false
    let background = settingsMap["background"] as? Bool ?? false
    let appKey = settingsMap["appKey"] as? String
    let token = settingsMap["token"] as? String
    let secret = settingsMap["secret"] as? String
    
    guard let appKey = appKey, let token = token, let secret = secret else {
      sendStartUpFailure("Invalid credentials or missing required keys")
      return
    }
    
    var trackingMode = CrowdConnectedCore.LocationTrackingMode.foregroundOnly
    if ips { CrowdConnectedIPS.activate() }
    if geo { CrowdConnectedGeo.activate() }
    if bluetooth { CrowdConnectedCoreBluetooth.activate() }
    if background { trackingMode = .foregroundAndBackground }
    
    let credentials = SDKCredentials(appKey: appKey, token: token, secret: secret)
    CrowdConnected.shared.delegate = self
    CrowdConnected.shared.start(credentials: credentials, trackingMode: trackingMode) {[weak self] deviceId, result in
      guard let self else { return }
      if case .success = result {
        self.sendStartUpSuccess()
      } else {
        self.sendStartUpFailure(result.description)
      }
    }
  }
  
  @objc func stop() {
    CrowdConnected.shared.stop()
  }
  
  @objc func setAlias(_ aliasKey: NSString, aliasValue: NSString) {
    CrowdConnected.shared.setAlias(key: aliasKey as String, value: aliasValue as String)
  }
  
  fileprivate func sendLocation(_ location: Location) {
    var body: [String: Any?] = [
      "xMetres": location.xMeters,
      "yMetres": location.yMeters,
      "latitude": location.latitude,
      "longitude": location.longitude,
      "xPixels": location.pixelCoordinates?.xPixels ?? 0,
      "yPixels": location.pixelCoordinates?.yPixels ?? 0,
      "surfaceId": location.surfaceID,
      "floor": location.floor,
      "locationType": location.type,
      "quality": location.quality,
      "timestamp": Int(location.timestamp),
    ]
    sendEvent(withName: "CrowdConnectedSdkLocationUpdated", body: body)
  }
  
  fileprivate func sendStartUpSuccess() {
    sendEvent(withName: "CrowdConnectedSdkStartUpSuccess", body: nil)
  }
  
  fileprivate func sendStartUpFailure(_ reason: String?) {
    sendEvent(withName: "CrowdConnectedSdkStartUpFailure", body: ["reason": reason])
  }

  fileprivate func sendRuntimeError(_ error: Error) {
    sendEvent(withName: "CrowdConnectedSdkRuntimeError", body: ["error": error.localizedDescription])
  }
}

extension CrowdConnectedSdk: CrowdConnectedDelegate {
  func didUpdateLocation(_ locations: [CrowdConnectedCore.Location]) {
    if let location = locations.last {
      sendLocation(location)
    }
  }
}
```

Create `ios/CrowdConnectedSdkBridge.m`:

```objc
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(CrowdConnectedSdk, RCTEventEmitter)

RCT_EXTERN_METHOD(getVersion:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getDeviceId:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(start:(NSDictionary *)settingsMap)

RCT_EXTERN_METHOD(stop)

RCT_EXTERN_METHOD(setAlias:(NSString *)aliasKey
                  aliasValue:(NSString *)aliasValue)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
```

Create `ios/YourAppName-Bridging-Header.h`:

```objc
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
```

### Step 3: Android Setup

#### 3.1 Add SDK Dependencies

Edit `android/app/build.gradle` and add the CrowdConnected SDK dependencies:

```gradle
dependencies {
    implementation("com.facebook.react:react-android")
    
    // CrowdConnected SDK
    implementation("net.crowdconnected.android.core:android-core:2.1.2")
    implementation("net.crowdconnected.android.ips:android-ips:2.1.2")
    implementation("net.crowdconnected.android.geo:android-geo:2.1.2")
    implementation("net.crowdconnected.android.background:android-background:2.1.2")
    
    // ... other dependencies
}
```

#### 3.2 Configure AndroidManifest.xml

Add required permissions to `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
  <uses-permission android:name="android.permission.BLUETOOTH" />
  <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />

  <application
    android:name=".MainApplication"
    ...>
    <!-- Your activities -->
  </application>
</manifest>
```

#### 3.3 Create Kotlin Native Module

Create `android/app/src/main/java/com/yourapp/CrowdConnectedSdkModule.kt`:

```kotlin
package com.yourapp

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import net.crowdconnected.android.background.BackgroundModule
import net.crowdconnected.android.core.ConfigurationBuilder
import net.crowdconnected.android.core.CrowdConnected
import net.crowdconnected.android.core.StatusCallback
import net.crowdconnected.android.geo.GeoModule
import net.crowdconnected.android.ips.IPSModule

class CrowdConnectedSdkModule(private val reactContext: ReactApplicationContext) : 
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "CrowdConnectedSdkModule"

    private fun sendEvent(eventName: String, params: WritableMap?) {
        try {
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
        } catch (e: Exception) {
            // no-op if emission fails
        }
    }

    @ReactMethod
    fun getVersion(promise: Promise) {
        try {
            promise.resolve(CrowdConnected.getLibraryVersion())
        } catch (e: Exception) {
            promise.reject("E_GET_VERSION", e)
        }
    }

    @ReactMethod
    fun getDeviceId(promise: Promise) {
        try {
            promise.resolve(CrowdConnected.getInstance()?.deviceId)
        } catch (e: Exception) {
            promise.reject("E_GET_DEVICE_ID", e)
        }
    }

    @ReactMethod
    fun start(settingsMap: ReadableMap?) {
        try {
            settingsMap?.let {
                val ips = it.getBoolean("ips")
                val geo = it.getBoolean("geo")
                val background = it.getBoolean("background")
                val appKey = it.getString("appKey")
                val token = it.getString("token")
                val secret = it.getString("secret")

                val configurationBuilder = ConfigurationBuilder()
                    .withAppKey(appKey)
                    .withToken(token)
                    .withSecret(secret)
                    .withStatusCallback(object : StatusCallback {
                        override fun onStartUpFailure(reason: String?) {
                            sendEvent("CrowdConnectedSdkStartUpFailure",
                                Arguments.createMap().apply { putString("reason", reason) })
                        }

                        override fun onStartUpSuccess() {
                            sendEvent("CrowdConnectedSdkStartUpSuccess", null)
                            CrowdConnected.getInstance()?.registerPositionCallback { location ->
                                val params = Arguments.createMap().apply {
                                    putDouble("xMetres", location.xMetres)
                                    putDouble("yMetres", location.yMetres)
                                    putDouble("latitude", location.latitude)
                                    putDouble("longitude", location.longitude)
                                    putDouble("timestamp", location.timestamp.toDouble())
                                    location.surfaceId?.let { putString("surfaceId", it) }
                                    location.floor?.let { putInt("floor", it) }
                                }
                                sendEvent("CrowdConnectedSdkLocationUpdated", params)
                            }
                        }

                        override fun onRuntimeError(reason: String?) {
                            sendEvent("CrowdConnectedSdkRuntimeError",
                                Arguments.createMap().apply { putString("reason", reason) })
                        }
                    })

                if (ips) configurationBuilder.addModule(IPSModule())
                if (geo) configurationBuilder.addModule(GeoModule())
                if (background) configurationBuilder.addModule(BackgroundModule())
                
                CrowdConnected.start(MainApplication.application, configurationBuilder.build())
            }
        } catch (e: Exception) {
            sendEvent("CrowdConnectedSdkRuntimeError",
                Arguments.createMap().apply { putString("reason", e.message) })
        }
    }

    @ReactMethod
    fun stop() {
        CrowdConnected.getInstance()?.deregisterPositionCallback()
        CrowdConnected.getInstance()?.stop()
    }

    @ReactMethod
    fun setAlias(aliasKey: String, aliasValue: String) {
        CrowdConnected.getInstance()?.setAlias(aliasKey, aliasValue)
    }
}
```

Create `android/app/src/main/java/com/yourapp/CrowdConnectedSdkPackage.kt`:

```kotlin
package com.yourapp

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class CrowdConnectedSdkPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(CrowdConnectedSdkModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
```

Register the package in `MainApplication.kt`:

```kotlin
import com.facebook.react.PackageList

class MainApplication : Application(), ReactApplication {
    override val reactHost: ReactHost by lazy {
        getDefaultReactHost(
            context = applicationContext,
            packageList = PackageList(this).packages.apply {
                add(CrowdConnectedSdkPackage())
            },
        )
    }
    
    companion object {
        lateinit var application: MainApplication
    }
    
    override fun onCreate() {
        super.onCreate()
        application = this
    }
}
```

### Step 4: Create TypeScript Bridge

Create `CrowdConnectedSdk.ts` in your project root:

```typescript
import { NativeModules, NativeEventEmitter, EmitterSubscription } from 'react-native'

const NativeModule = NativeModules.CrowdConnectedSdkModule ?? NativeModules.CrowdConnectedSdk
const emitter = NativeModule ? new NativeEventEmitter(NativeModule) : null

export type SDKLocation = {
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

const onLocation = (listener: (loc: SDKLocation) => void): EmitterSubscription => {
  return emitter!.addListener('CrowdConnectedSdkLocationUpdated', listener)
}

const onStartUpSuccess = (listener: () => void): EmitterSubscription => {
  return emitter!.addListener('CrowdConnectedSdkStartUpSuccess', listener)
}

const onStartUpFailure = (listener: (err: { reason?: string }) => void): EmitterSubscription => {
  return emitter!.addListener('CrowdConnectedSdkStartUpFailure', listener)
}

const onRuntimeError = (listener: (err: { reason?: string }) => void): EmitterSubscription => {
  return emitter!.addListener('CrowdConnectedSdkRuntimeError', listener)
}

export default {
  getVersion: (): Promise<string> => NativeModule.getVersion(),
  getDeviceId: (): Promise<string | null> => NativeModule.getDeviceId(),
  start: (settings: {
    ips?: boolean
    geo?: boolean
    bluetooth?: boolean
    background?: boolean
    appKey: string
    token: string
    secret: string
  }) => NativeModule.start(settings),
  stop: () => NativeModule.stop(),
  setAlias: (key: string, value: string) => NativeModule.setAlias(key, value),
  onLocation,
  onStartUpSuccess,
  onStartUpFailure,
  onRuntimeError,
}
```

### Step 5: Implement Permissions

Create `src/permissions.ts`:

```typescript
import { Platform, PermissionsAndroid } from 'react-native'

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
      
      let backgroundGranted = true
      if (PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION) {
        backgroundGranted = (await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          {
            title: 'Background location',
            message: 'App needs background location to continue positioning when not in foreground',
            buttonPositive: 'OK',
          }
        )) === PermissionsAndroid.RESULTS.GRANTED
      }

      let bluetoothGranted = true
      if ((PermissionsAndroid.PERMISSIONS as any).BLUETOOTH_SCAN) {
        bluetoothGranted = (await PermissionsAndroid.request(
          (PermissionsAndroid.PERMISSIONS as any).BLUETOOTH_SCAN,
          {
            title: 'Bluetooth scan',
            message: 'App needs Bluetooth permission for device discovery',
            buttonPositive: 'OK',
          }
        )) === PermissionsAndroid.RESULTS.GRANTED
      }

      return fine === PermissionsAndroid.RESULTS.GRANTED && backgroundGranted && bluetoothGranted
    } catch (e) {
      return false
    }
  }

  // iOS: use react-native-permissions
  try {
    const { request, PERMISSIONS, RESULTS } = require('react-native-permissions')
    const res = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    return res === RESULTS.GRANTED || res === RESULTS.LIMITED
  } catch (e) {
    return true // Assume granted if permissions library not available
  }
}

export default { requestLocationPermissions }
```

### Step 6: Use the SDK

Example usage in `App.tsx`:

```tsx
import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import CrowdConnectedSdk, { SDKLocation } from './CrowdConnectedSdk'
import Permissions from './src/permissions'

function App() {
  const [location, setLocation] = useState<SDKLocation | null>(null)
  const [sdkStatus, setSdkStatus] = useState<'idle' | 'running'>('idle')

  useEffect(() => {
    // Subscribe to SDK events
    const locationSub = CrowdConnectedSdk.onLocation(setLocation)
    const successSub = CrowdConnectedSdk.onStartUpSuccess(() => {
      console.log('SDK started successfully')
      setSdkStatus('running')
    })
    const failureSub = CrowdConnectedSdk.onStartUpFailure((err) => {
      console.error('SDK startup failed:', err.reason)
    })

    return () => {
      locationSub.remove()
      successSub.remove()
      failureSub.remove()
    }
  }, [])

  const handleStart = async () => {
    const granted = await Permissions.requestLocationPermissions()
    if (!granted) {
      console.error('Permissions denied')
      return
    }

    await CrowdConnectedSdk.start({
      ips: true,
      geo: true,
      bluetooth: true,
      background: true,
      appKey: 'YOUR_APP_KEY',
      token: 'YOUR_TOKEN',
      secret: 'YOUR_SECRET',
    })
  }

  const handleStop = async () => {
    await CrowdConnectedSdk.stop()
    setSdkStatus('idle')
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>CrowdConnected SDK</Text>
      
      {sdkStatus === 'idle' ? (
        <Button title="Start SDK" onPress={handleStart} />
      ) : (
        <Button title="Stop SDK" onPress={handleStop} />
      )}
      
      {location && (
        <View style={{ marginTop: 20 }}>
          <Text>Latitude: {location.latitude.toFixed(6)}</Text>
          <Text>Longitude: {location.longitude.toFixed(6)}</Text>
          <Text>X (meters): {location.xMetres.toFixed(2)}</Text>
          <Text>Y (meters): {location.yMetres.toFixed(2)}</Text>
          {location.floor && <Text>Floor: {location.floor}</Text>}
        </View>
      )}
    </View>
  )
}

export default App
```

## Running the Example App

### iOS

```bash
# Install dependencies
npm install
cd ios && bundle exec pod install && cd ..

# Run the app
npm run ios
```

### Android

```bash
# Install dependencies
npm install

# Run the app
npm run android
```

If everything is set up correctly, you should see the app running with location tracking capabilities.

## API Reference

### `CrowdConnectedSdk.start(settings)`

Starts the CrowdConnected SDK with the provided configuration.

**Parameters:**
- `settings.appKey` (string, required): Your app key from CrowdConnected Console
- `settings.token` (string, required): Your token from CrowdConnected Console
- `settings.secret` (string, required): Your secret from CrowdConnected Console
- `settings.ips` (boolean, optional): Enable Indoor Positioning System
- `settings.geo` (boolean, optional): Enable GPS positioning
- `settings.bluetooth` (boolean, optional): Enable Bluetooth beacon scanning
- `settings.background` (boolean, optional): Enable background location tracking

**Returns:** Promise<void>

### `CrowdConnectedSdk.stop()`

Stops the SDK and all location tracking.

**Returns:** Promise<void>

### `CrowdConnectedSdk.getVersion()`

Returns the SDK version.

**Returns:** Promise<string>

### `CrowdConnectedSdk.getDeviceId()`

Returns the device ID assigned by CrowdConnected.

**Returns:** Promise<string | null>

### `CrowdConnectedSdk.setAlias(key, value)`

Sets a custom alias for the device.

**Parameters:**
- `key` (string): The alias key
- `value` (string): The alias value

**Returns:** Promise<void>

### Event Listeners

#### `onLocation(callback)`

Subscribes to location updates from the SDK.

**Parameters:**
- `callback` (function): Function that receives `SDKLocation` object

**Returns:** EmitterSubscription

**Location Object:**
```typescript
{
  xMetres: number        // X coordinate in meters
  yMetres: number        // Y coordinate in meters
  latitude: number       // Latitude (WGS84)
  longitude: number      // Longitude (WGS84)
  timestamp: number      // Unix timestamp
  surfaceId?: string     // Surface/floor identifier
  floor?: number         // Floor number
  xPixels: number        // X coordinate in pixels
  yPixels: number        // Y coordinate in pixels
  locationType?: string  // Type of location fix
  quality?: number       // Quality indicator
}
```

#### `onStartUpSuccess(callback)`

Called when SDK starts successfully.

**Parameters:**
- `callback` (function): Function called on successful startup

**Returns:** EmitterSubscription

#### `onStartUpFailure(callback)`

Called when SDK fails to start.

**Parameters:**
- `callback` (function): Function that receives error object with `reason` property

**Returns:** EmitterSubscription

#### `onRuntimeError(callback)`

Called when runtime errors occur.

**Parameters:**
- `callback` (function): Function that receives error object with `reason` property

**Returns:** EmitterSubscription

## Troubleshooting

### iOS Issues

**Problem**: Build fails with "No such module 'CrowdConnectedCore'"
- **Solution**: Make sure you've added the Swift packages via Xcode and run `pod install`

**Problem**: Location not updating
- **Solution**: Check Info.plist has all required location permission descriptions and background modes enabled

**Problem**: "Undefined symbol" errors
- **Solution**: Clean build folder (Cmd+Shift+K) and rebuild

### Android Issues

**Problem**: SDK not starting
- **Solution**: Verify all dependencies are correctly added in `build.gradle` with matching versions

**Problem**: Permissions not requested
- **Solution**: Check AndroidManifest.xml has all required permissions declared

**Problem**: App crashes on start
- **Solution**: Ensure `MainApplication.application` is properly initialized in `onCreate()`

### General Issues

**Problem**: "Native module not linked"
- **Solution**: 
  - For iOS: Run `cd ios && pod install && cd ..` and rebuild
  - For Android: Clean and rebuild the project (`./gradlew clean`)
  - Check that the native module is properly registered in MainApplication

**Problem**: No location updates received
- **Solution**: 
  - Ensure all permissions are granted (check app settings)
  - Verify credentials (appKey, token, secret) are correct
  - Check network connectivity
  - Enable both IPS and GEO modules

**Problem**: Background tracking not working
- **Solution**:
  - iOS: Ensure `UIBackgroundModes` includes `location` and `bluetooth-central` in Info.plist
  - Android: Ensure `ACCESS_BACKGROUND_LOCATION` permission is granted

For more help, visit:
- [CrowdConnected Documentation](https://docs.crowdconnected.com)
- [GitHub Issues](https://github.com/crowdconnected/crowd-connected-sdk-rn-examples/issues)
- Contact support@crowdconnected.com

## Learn More

- [CrowdConnected Documentation](https://docs.crowdconnected.com)
- [CrowdConnected Console](https://console.crowdconnected.com)
- [React Native Documentation](https://reactnative.dev)
- [React Native Permissions](https://github.com/zoontek/react-native-permissions)

## License

See the [LICENSE](LICENSE) file for details.
