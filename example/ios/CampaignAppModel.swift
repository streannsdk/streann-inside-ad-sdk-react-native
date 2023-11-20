//
//  CampaignAppModel.swift
//  AwesomeModuleExample
//
//  Created by Igor Parnadjiev on 16.10.23.
//

import Foundation

class CampaignAppModel: Codable {
    var properties: [Properties]?
    var adType: String?
    var url: String?
    var campaignId: String?
    var adId: String?
    var placementId: String?
}

class Properties: Codable {
    var additionalProp1: String?
    var additionalProp2: String?
    var additionalProp3: String?
}
