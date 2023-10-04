package com.awesomemodule

import com.facebook.react.bridge.*

class AwesomeModuleModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private lateinit var insideAdView: InsideAdView;
  private val TAG = "InsideAdReactNative"
  private var context: ReactApplicationContext;
  init {
    context = reactContext;
  }
  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  fun multiply(a: Double, b: Double, promise: Promise) {
    promise.resolve(a * b)
  }

  companion object {
    const val NAME = "AwesomeModule"
  }
}
