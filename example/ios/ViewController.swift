//
//  ViewController.swift
//  AwesomeModuleExample
//
//  Created by Igor Parnadjiev on 16.10.23.
//

import UIKit
import React
import GoogleInteractiveMediaAds

@objc(RNShare)
class RNShare: RCTViewManager, InsideAdCallbackDelegate {
  private let sdkEventEmitter: SDKEventEmitter? = .shared
  
  @objc override static func requiresMainQueueSetup() -> Bool {
    return true
  }

//  let start = InsideAdSdk()//.initializeSdk("https://inside-ads.services.c1.streann.com", value: "559ff7ade4b0d0aff40888dd")

  override func view() -> UIView! {
//    start.initializeSdk("https://inside-ads.services.c1.streann.com", value: "559ff7ade4b0d0aff40888dd")
        let adViewController = InsideAdViewController(insideAdCallbackDelegate: self)
    let RCTController = RCTPresentedViewController()
    adViewController.insideAdCallbackDelegate = self
    adViewController.modalPresentationStyle = .fullScreen
    RCTController?.present(adViewController, animated: true, completion: nil)
    return adViewController.view
  }
  
  func insideAdCallbackReceived(data: String) {
    sdkEventEmitter?.sendEvent(withName: data, body: nil)
    print(data)
  }
}

@objc(SDKEventEmitter)
class SDKEventEmitter: RCTEventEmitter {

  public static var shared: SDKEventEmitter?

    override init() {
        super.init()
      SDKEventEmitter.shared = self
    }

    override func supportedEvents() -> [String]! {
        return [
            "No Ads VAST response after one or more Wrappers",
            "Error loading ads: No Ads VAST response after one or more Wrappers",
            "StreannInsideAdSDK Log: Loaded",
            "StreannInsideAdSDK Log: Started",
            "StreannInsideAdSDK Log: Pause",
            "StreannInsideAdSDK Log: First Quartile",
            "StreannInsideAdSDK Log: Midpoint",
            "StreannInsideAdSDK Log: Third Quartile",
            "StreannInsideAdSDK Log: Complete",
            "StreannInsideAdSDK Log: All Ads Completed"
        ]
    }
}
