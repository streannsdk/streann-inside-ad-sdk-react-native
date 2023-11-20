//
//  File.swift
//  
//
//  Created by Igor Parnadjiev on 25.9.23.
//

import Foundation
import GoogleInteractiveMediaAds

class InsideAdViewController: UIViewController {
//  private var videoView: UIView!
  private var contentPlayhead: IMAAVPlayerContentPlayhead?
  private let adsLoader = IMAAdsLoader(settings: nil)
  private var adsManager: IMAAdsManager?
  private var geoModel: GeoIp?
  private var insideAdHelper = InsideAdHelper()
  
  var screen = ""
//  var viewSize = CGSize()
  
  //Delegates
  var insideAdCallbackDelegate: InsideAdCallbackDelegate
  
  init(insideAdCallbackDelegate: InsideAdCallbackDelegate) {
    self.insideAdCallbackDelegate = insideAdCallbackDelegate
    super.init(nibName: nil, bundle: nil)
//    self.viewSize = self.view.bounds.size
  }
  
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  // MARK: - View controller lifecycle methods
  override func viewDidLoad() {
    super.viewDidLoad()
    
//    videoView = UIView(frame: CGRect(x: 0, y: 0, width: viewSize.width, height: viewSize.height))
//    self.view.addSubview(videoView)
    adsLoader.delegate = self
//    setupView()
  }
  
  override func viewDidAppear(_ animated: Bool) {
    requestAds(screen: self.screen)
  }
  
  //Setup the new constraints on device rotation
//  override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
//    super.traitCollectionDidChange(previousTraitCollection)
//    videoView.frame = CGRect(origin: .zero, size: view.bounds.size)
//  }
  
  //View constraints setup
//  private func setupView() {
//    videoView.translatesAutoresizingMaskIntoConstraints = false
//    NSLayoutConstraint.activate([
//      videoView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
//      videoView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
//      videoView.topAnchor.constraint(equalTo: view.topAnchor),
//      videoView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
//    ])
//  }
  
  // MARK: IMA integration methods
  func requestAds(screen: String) {
    if Constants.ResellerInfo.apiKey == "" {
      insideAdCallbackDelegate.insideAdCallbackReceived(data: Logger.log("Api Key is required. Please implement the initializeSdk method."))
      return
    }
    if Constants.ResellerInfo.baseUrl == "" {
      insideAdCallbackDelegate.insideAdCallbackReceived(data: Logger.log("Base Url is required. Please implement the initializeSdk method."))
      return
    }
    SDKAPI.getGeoIpUrl { geoIpUrl, error in
      if let geoIpUrl {
        SDKAPI.getGeoIp(fromUrl: geoIpUrl.geoIpUrl) { geoIp, error in
          if let geoIp {
            SDKAPI.getCampaign(countryCode: geoIp.countryCode ?? "", screen: screen) { campaignAppModel, error in
              if let campaignAppModel {
                DispatchQueue.main.async {
                  if let url = campaignAppModel.url {
                    //Populate macros
                    let adTagUrl = self.insideAdHelper.populateVastFrom(adUrl: url, geoModel: geoIp, playerSize: self.view.frame.size)
                    
                    // Create ad display container for ad rendering.
                    let adDisplayContainer = IMAAdDisplayContainer(
                      adContainer: self.view, viewController: self, companionSlots: nil)
                    
                    // Create an ad request with our ad tag, display container, and optional user context.
                    let request = IMAAdsRequest(
                      adTagUrl: adTagUrl,
                      adDisplayContainer: adDisplayContainer,
                      contentPlayhead: self.contentPlayhead,
                      userContext: nil)
                    self.adsLoader.requestAds(with: request)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

//IMA Delegate methods
extension InsideAdViewController:IMAAdsLoaderDelegate, IMAAdsManagerDelegate {
  // MARK: - IMAAdsLoaderDelegate
  func adsManagerAdPlaybackReady(_ adsManager: IMAAdsManager) {
      adsManager.start()
  }
  
  func adsLoader(_ loader: IMAAdsLoader, adsLoadedWith adsLoadedData: IMAAdsLoadedData) {
      // Grab the instance of the IMAAdsManager and set ourselves as the delegate.
      adsManager = adsLoadedData.adsManager
      adsManager?.delegate = self
      
      // Create ads rendering settings and tell the SDK to use the in-app browser.
      let adsRenderingSettings = IMAAdsRenderingSettings()
      adsRenderingSettings.linkOpenerPresentingController = self
      
      // Initialize the ads manager.
      adsManager?.initialize(with: adsRenderingSettings)
  }
  
  func adsLoader(_ loader: IMAAdsLoader, failedWith adErrorData: IMAAdLoadingErrorData) {
      insideAdCallbackDelegate.insideAdCallbackReceived(data: adErrorData.adError.message ?? "nil")
      print("Error loading ads: \(adErrorData.adError.message ?? "nil")")
    self.dismiss(animated: true)
  }
  
  // MARK: - IMAAdsManagerDelegate
  func adsManager(_ adsManager: IMAAdsManager, didReceive event: IMAAdEvent) {
      if event.type == IMAAdEventType.LOADED {
          // When the SDK notifies us that ads have been loaded, play them.
          adsManager.start()
      }
      insideAdCallbackDelegate.insideAdCallbackReceived(data: Logger.log(event.typeString))
    if event.typeString == "All Ads Completed" || event.typeString == "The VAST response document is empty" {
      self.dismiss(animated: true)
    }
  }
  
  func adsManager(_ adsManager: IMAAdsManager, didReceive error: IMAAdError) {
      // Something went wrong with the ads manager after ads were loaded. Log the error and play the
      // content.
      insideAdCallbackDelegate.insideAdCallbackReceived(data: error.message ?? "nil")
      print("AdsManager error: \(error.message ?? "nil")")
    self.dismiss(animated: true)
  }
  
  func adsManagerDidRequestContentPause(_ adsManager: IMAAdsManager) {
      // The SDK is going to play ads, so pause the content.
  }
  
  func adsManagerDidRequestContentResume(_ adsManager: IMAAdsManager) {
      // The SDK is done playing ads (at least for now), so resume the content.
  }
}
