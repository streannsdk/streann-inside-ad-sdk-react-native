//
//  File.swift
//  
//
//  Created by Igor Parnadjiev on 29.9.23.
//

import Foundation
import SwiftUI
import React
import UIKit

//Initiliaze the InsideAdPlayer with reseller and user data
@objc(InsideAdSdk)
class InsideAdSdk: NSObject {
 
 
  
//  @objc override static func requiresMainQueueSetup() -> Bool {
//      return false
//  }
//  @objc override init() {
//     super.init()
//   }
  var baseUrl: String!
  var value: String!
//  var siteUrl: String? = nil
//  var storeUrl: String? = nil
//  var descriptionUrl: String? = nil
//  var userBirthYear: Int? = nil
//  var userGender: String? = nil
  
  @objc
  func initializeSdk(_ baseUrl: String, value: String) {
    self.baseUrl = baseUrl
    self.value = value

    Constants.ResellerInfo.baseUrl = baseUrl
    Constants.ResellerInfo.apiKey = value
    print("func initializeSdk")
  }
//  func initializeSdk(baseUrl: String, apiKey: String,
//                            siteUrl: String,
//                            storeUrl: String,
//                            descriptionUrl: String,
//                     userBirthYear: Int,
//                     userGender: String) {
//    self.baseUrl = baseUrl
//    self.apiKey = apiKey
//    self.siteUrl = siteUrl
//    self.storeUrl = storeUrl
//    self.descriptionUrl = descriptionUrl
//    self.userBirthYear = userBirthYear
//    self.userGender = userGender
//    
//    Constants.ResellerInfo.baseUrl = baseUrl as String
//    Constants.ResellerInfo.apiKey = apiKey as String
//    Constants.ResellerInfo.siteUrl = siteUrl 
//    Constants.ResellerInfo.storeUrl = storeUrl 
//    Constants.ResellerInfo.descriptionUrl = descriptionUrl 
//    Constants.UserInfo.userBirthYear = userBirthYear
//    Constants.UserInfo.userGender = userGender 
//  }
}

//@objc(MyModule)
//class MyModule: NSObject {
//  
//  var name: String!
//  var value: Int!
//  
//  @objc
//  func construct(_ name: String, value: Int) {
//    self.name = name
//    self.value = value
//  }
//}
