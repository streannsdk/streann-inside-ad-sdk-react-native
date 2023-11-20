#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTComponent.h>
#import <React/RCTDevLoadingView.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(AwesomeModule, NSObject)

RCT_EXTERN_METHOD(multiply:(float)a withB:(float)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end

@interface RCT_EXTERN_MODULE(InsideAdSdk, NSObject)
RCT_EXTERN_METHOD(initializeSdk:(NSString*)baseUrl value:(NSString*)value)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end

@interface RCT_EXTERN_MODULE(SDKEventEmitter, RCTEventEmitter)

RCT_EXTERN_METHOD(supportedEvents)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end


// @interface RCT_EXTERN_MODULE(RNShare, NSObject)
// RCT_EXTERN_METHOD(open:(NSDictionary *)options)
// @end

@interface RCT_EXTERN_MODULE(RNShare, RCTViewManager)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
