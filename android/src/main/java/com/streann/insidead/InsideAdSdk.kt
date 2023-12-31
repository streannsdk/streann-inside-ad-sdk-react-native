package com.streann.insidead

import android.content.SharedPreferences
import com.streann.insidead.models.GeoIp

object InsideAdSdk {

  internal var apiKey: String = ""
  internal var apiToken: String = ""
  internal var baseUrl: String = ""
  internal var bundleId: String? = ""
  internal var appName: String? = ""
  internal var appVersion: String? = ""
  internal var appDomain: String? = ""
  internal var siteUrl: String? = ""
  internal var storeUrl: String? = ""
  internal var descriptionUrl: String? = ""
  internal var userBirthYear: Int? = 0
  internal var userGender: String? = ""
  internal var adId: String? = ""
  internal var adLimitTracking: Int? = 0
  internal var playerWidth: Int = 0
  internal var playerHeight: Int = 0
  internal var isAdMuted: Boolean? = false
  internal var geoIp: GeoIp? = null
  internal var appPreferences: SharedPreferences? = null
  internal var intervalInMinutes: Long? = null
  internal var startAfterSeconds: Long? = null
  internal var showCloseButtonAfterSeconds: Long? = null
  internal var durationInSeconds: Long? = null

  fun initializeSdk(
    apiKey: String, apiToken: String, baseUrl: String, appDomain: String? = "",
    siteUrl: String? = "", storeUrl: String? = "", descriptionUrl: String? = "",
    userBirthYear: Int? = 0, userGender: String? = ""
  ) {
    this.apiKey = apiKey
    this.apiToken = apiToken
    this.baseUrl = baseUrl
    this.appDomain = appDomain
    this.siteUrl = siteUrl
    this.storeUrl = storeUrl
    this.descriptionUrl = descriptionUrl
    this.userBirthYear = userBirthYear
    this.userGender = userGender
  }

}
