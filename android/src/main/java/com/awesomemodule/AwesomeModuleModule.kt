package com.awesomemodule

import android.util.Log
import androidx.lifecycle.ViewModelProvider
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.streann.insidead.InsideAdReactNativeFragment
import com.streann.insidead.InsideAdView
import com.streann.insidead.callbacks.InsideAdCallback

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
