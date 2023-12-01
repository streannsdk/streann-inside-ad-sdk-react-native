package com.streann.insidead

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.streann.insidead.callbacks.InsideAdCallback
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.streann.insidead.models.InsideAd

class InsideAdReactNativeFragment(reactContext: ReactContext, screen: String, propIsAdMuted: Boolean) : Fragment() {
    private val TAG = "InsideAdStreann"
    private lateinit var insideAdView: InsideAdView;
    private val reactContext1:ReactContext
    private val screenAd = screen
    private  val isAdMuted = propIsAdMuted
    init {
      reactContext1 = reactContext;
    }
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        super.onCreateView(inflater, container, savedInstanceState)
        insideAdView = InsideAdView(requireNotNull(context))

        return insideAdView
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        // do any logic that should happen in an `onCreate` method, e.g:
        // customView.onCreate(savedInstanceState);
      setupInsideAdView()
    }

    override fun onPause() {
        super.onPause()
        // do any logic that should happen in an `onPause` method
        // e.g.: customView.onPause();
    }

    override fun onResume() {
        super.onResume()
        // do any logic that should happen in an `onResume` method
        // e.g.: customView.onResume();
    }

    override fun onDestroy() {
        super.onDestroy()
        // do any logic that should happen in an `onDestroy` method
        // e.g.: customView.onDestroy();
    }

    private fun setupInsideAdView() {
        insideAdView.requestAd(screenAd, isAdMuted,
          insideAdCallback = object : InsideAdCallback {

          override fun insideAdReceived(insideAd: InsideAd) {
            Log.i(TAG, "insideAdReceived: $insideAd")
            onReceiveNativeEvent("insideAdReceived: $insideAd")
          }

            override fun insideAdLoaded() {
                Log.i(TAG, "insideAdLoaded: ")
              onReceiveNativeEvent("insideAdLoaded")
            }

            override fun insideAdPlay() {
                Log.i(TAG, "insideAdPlay: ")
              onReceiveNativeEvent("insideAdPlay")
            }

            override fun insideAdStop() {
                Log.i(TAG, "insideAdStop: ")
                onReceiveNativeEvent("insideAdStop")
            }

            override fun insideAdSkipped() {
              Log.i(TAG, "insideAdSkipped")
              onReceiveNativeEvent("insideAdSkipped")
//              insideAdView?.stopAd()
            }

            override fun insideAdClicked() {
              Log.i(TAG, "insideAdClicked")
              onReceiveNativeEvent("insideAdClicked")
            }

            override fun insideAdError(error: String) {
                Log.i(TAG, "insideAdError: $error")
              onReceiveNativeEvent("insideAdError: $error")
            }

            override fun insideAdVolumeChanged(level: Int) {
                Log.i(TAG, "insideAdVolumeChanged: $level")
              onReceiveNativeEvent("insideAdVolumeChanged: $level")
            }
        })
    }
  fun onReceiveNativeEvent(eventName: String) {
    val event = Arguments.createMap().apply {
      putString("event", eventName)
    }
    reactContext1
      .getJSModule(RCTEventEmitter::class.java)
      .receiveEvent(id, "progress", event)
  }

}
