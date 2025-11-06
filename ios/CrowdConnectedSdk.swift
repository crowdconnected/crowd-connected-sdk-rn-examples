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
  
  // settingsMap is expected to be an NSDictionary coming from JS
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
    if ips {
      CrowdConnectedIPS.activate()
    }
    if geo {
      CrowdConnectedGeo.activate()
    }
    if bluetooth {
      CrowdConnectedCoreBluetooth.activate()
    }
    if background {
      trackingMode = .foregroundAndBackground
    }
    
    let credentials = SDKCredentials(appKey: appKey, token: token, secret: secret)
    CrowdConnected.shared.delegate = self
    CrowdConnected.shared.start(credentials: credentials, trackingMode: trackingMode) {[weak self] deviceId, result in
      guard let self else { return }
      if case .success = result {
        self.sendStartUpSuccess()
        print("SDK started with device ID: \(deviceId ?? "unknown")")
      } else {
        self.sendStartUpFailure(result.description)
        print("SDK failed to start: \(result)")
      }
    }
  }
  
  @objc func stop() {
    CrowdConnected.shared.stop()
  }
  
  @objc func setAlias(_ aliasKey: NSString, aliasValue: NSString) {
    CrowdConnected.shared.setAlias(key: aliasKey as String, value: aliasValue as String)
  }
  
  // Helpers to send events from callbacks
  fileprivate func sendLocation(_ location: Location) {
    var body: [String: Any?] = [
      "xMetres": location.xMeters,
      "yMetres": location.yMeters,
      "latitude": location.latitude,
      "longitude": location.longitude,
      "xPixels": location.pixelCoordinates?.xPixels,
      "yPixels": location.pixelCoordinates?.yPixels,
      "surfaceId": location.surfaceID,
      "floor": location.floor,
      "locationType": location.type,
      "quality": location.quality,
      "timestamp": Int(location.timestamp),
    ]
    if let pixelCoordinates = location.pixelCoordinates {
      body["xPixels"] = pixelCoordinates.xPixels
      body["yPixels"] = pixelCoordinates.yPixels
    }
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
