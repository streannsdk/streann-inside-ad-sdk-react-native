package com.streann.insidead

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.streann.insidead.callbacks.InsideAdCallback

class InsideAdReactNativeFragment: Fragment() {
    private val TAG = "InsideAdReactNative"
    private lateinit var insideAdView: InsideAdView;

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        super.onCreateView(inflater, container, savedInstanceState)
        insideAdView = InsideAdView(requireNotNull(context))
        setupInsideAdView()
        return insideAdView
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        // do any logic that should happen in an `onCreate` method, e.g:
        // customView.onCreate(savedInstanceState);
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
        insideAdView.requestAd("559ff7ade4b0d0aff40888dd", object : InsideAdCallback {
            override fun insideAdReceived() {
                Log.i(TAG, "insideAdReceived: ")
            }

            override fun insideAdBuffering() {
                Log.i(TAG, "insideAdBuffering: ")
            }

            override fun insideAdLoaded() {
                Log.i(TAG, "insideAdLoaded: ")
            }

            override fun insideAdPlay() {
                Log.i(TAG, "insideAdPlay: ")
            }

            override fun insideAdResume() {
                Log.i(TAG, "insideAdResume: ")
            }

            override fun insideAdPause() {
                Log.i(TAG, "insideAdPause: ")
            }

            override fun insideAdStop() {
                Log.i(TAG, "insideAdStop: ")
            }

            override fun insideAdError() {
                Log.i(TAG, "insideAdError: ")
            }

            override fun insideAdError(error: String) {
                Log.i(TAG, "insideAdError: $error")
            }

            override fun insideAdVolumeChanged(level: Float) {
                Log.i(TAG, "insideAdVolumeChanged: $level")
            }
        })
    }
}