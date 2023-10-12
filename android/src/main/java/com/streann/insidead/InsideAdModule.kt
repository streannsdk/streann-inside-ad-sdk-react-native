package com.streann.insidead

import android.util.Log
import com.facebook.react.bridge.*

class InsideAdModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private lateinit var insideAdView: InsideAdView;
  private val LOGTAG = "InsideAdStreann"
  private var context: ReactApplicationContext;
  init {
    context = reactContext;
  }
  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun initializeSdk(apiKey: String){
    Log.i(LOGTAG, "initializeSdk: ")
    InsideAdSdk.initializeSdk(
      apiKey,
    )
  }

  companion object {
    const val NAME = "InsideAdModule"
  }
}
