// Bridge to expose Swift module to React Native

// Import React headers robustly: prefer modular imports but fall back to local headers
#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#elif __has_include("React/RCTBridgeModule.h")
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"
#elif __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#import "RCTEventEmitter.h"
#else
// React headers not found - make sure React is installed via CocoaPods and open the .xcworkspace
#endif

// Only declare the extern module and methods if React headers are available
#if __has_include(<React/RCTBridgeModule.h>) || __has_include("React/RCTBridgeModule.h") || __has_include("RCTBridgeModule.h")
@interface RCT_EXTERN_MODULE(CrowdConnectedSdk, RCTEventEmitter)

RCT_EXTERN_METHOD(getVersion:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getDeviceId:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(start:(NSDictionary *)settings)

RCT_EXTERN_METHOD(stop)

RCT_EXTERN_METHOD(setAlias:(NSString *)aliasKey aliasValue:(NSString *)aliasValue)

@end
#endif
