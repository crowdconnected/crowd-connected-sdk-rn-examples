import { NativeModules, NativeEventEmitter, EmitterSubscription } from 'react-native'

// Android exports the module as 'CrowdConnectedSdkModule' (module.getName())
// iOS (Swift) exports it as 'CrowdConnectedSdk' (see @objc annotation).
const NativeModule: any = NativeModules.CrowdConnectedSdkModule ?? NativeModules.CrowdConnectedSdk

if (!NativeModule) {
  // eslint-disable-next-line no-console
  console.warn('CrowdConnected native module is not linked. NativeModules contains:', Object.keys(NativeModules))
}

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

const noopSubscription = (): { remove: () => void } => ({ remove: () => {} })

const onLocation = (listener: (loc: SDKLocation) => void): { remove: () => void } | EmitterSubscription => {
  if (!emitter) {
    console.warn('CrowdConnectedSdk emitter not available; cannot subscribe to location events')
    return noopSubscription()
  }
  return emitter.addListener('CrowdConnectedSdkLocationUpdated', listener)
}

const onStartUpSuccess = (listener: () => void): { remove: () => void } | EmitterSubscription => {
  if (!emitter) {
    console.warn('CrowdConnectedSdk emitter not available; cannot subscribe to startup success events')
    return noopSubscription()
  }
  return emitter.addListener('CrowdConnectedSdkStartUpSuccess', listener)
}

const onStartUpFailure = (listener: (err: { reason?: string }) => void): { remove: () => void } | EmitterSubscription => {
  if (!emitter) {
    console.warn('CrowdConnectedSdk emitter not available; cannot subscribe to startup failure events')
    return noopSubscription()
  }
  return emitter.addListener('CrowdConnectedSdkStartUpFailure', listener)
}

const onRuntimeError = (listener: (err: { reason?: string }) => void): { remove: () => void } | EmitterSubscription => {
  if (!emitter) {
    console.warn('CrowdConnectedSdk emitter not available; cannot subscribe to runtime error events')
    return noopSubscription()
  }
  return emitter.addListener('CrowdConnectedSdkRuntimeError', listener)
}

export default {
  getVersion: (): Promise<string> => {
    if (!NativeModule) return Promise.reject(new Error('CrowdConnected native module not linked'))
    return NativeModule.getVersion()
  },
  getDeviceId: (): Promise<string | null> => {
    if (!NativeModule) return Promise.reject(new Error('CrowdConnected native module not linked'))
    return NativeModule.getDeviceId()
  },
  start: (settings?: { ips?: boolean; geo?: boolean; bluetooth?: boolean; background?: boolean; appKey?: string; token?: string; secret?: string }) => {
    if (!NativeModule) return Promise.reject(new Error('CrowdConnected native module not linked'))
    return NativeModule.start(settings || {})
  },
  stop: () => {
    if (!NativeModule) return Promise.reject(new Error('CrowdConnected native module not linked'))
    return NativeModule.stop()
  },
  setAlias: (key: string, value: string) => {
    if (!NativeModule) return Promise.reject(new Error('CrowdConnected native module not linked'))
    return NativeModule.setAlias(key, value)
  },
  onLocation,
  onStartUpSuccess,
  onStartUpFailure,
  onRuntimeError,
}
