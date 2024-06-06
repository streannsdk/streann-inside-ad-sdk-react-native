package com.streann.insidead

import InsideAdReactNativeFragment
import android.util.Log
import android.view.Choreographer
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.annotations.ReactPropGroup

class InsideAdReactNativeViewManager(
    private val reactContext: ReactApplicationContext
    ) : ViewGroupManager<FrameLayout>(){
    private val TAG = "InsideAdStreann"
    override fun getName() = REACT_CLASS
    private var propWidth: Int? = null
    private var propHeight: Int? = null
    private var propScreen: String = "";
    private var propIsAdMuted: Boolean = false

    /**
     * Return a FrameLayout which will later hold the Fragment
     */
    override fun createViewInstance(reactContext: ThemedReactContext) =
        FrameLayout(reactContext)

    /**
     * Map the "create" command to an integer
     */
    //TODO requestAd
    override fun getCommandsMap() = mapOf("create" to COMMAND_CREATE)

  override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
    return MapBuilder.of(
      "progress",
      MapBuilder.of("registrationName", "adEvents")
    );
//    return mapOf(
//      "topChange" to mapOf(
//        "phasedRegistrationNames" to mapOf(
//          "bubbled" to "onChange"
//        )
//      )
//    )
  }

    /**
     * Handle "create" command (called from JS) and call createFragment method
     */
    override fun receiveCommand(
        root: FrameLayout,
        commandId: String,
        args: ReadableArray?
    ) {
        super.receiveCommand(root, commandId, args)
        val reactNativeViewId = requireNotNull(args).getInt(0)

        when (commandId.toInt()) {
            COMMAND_CREATE -> createFragment(root, reactNativeViewId)
        }
    }

    @ReactPropGroup(names = ["width", "height"], customType = "Style")
    fun setStyle(view: FrameLayout, index: Int, value: Int) {
      Log.d(TAG, "PROPS:" + value )
        if (index == 0) propWidth = value
        if (index == 1) propHeight = value
    }

    @ReactProp(name = "screen")
    fun setScreen(view: FrameLayout, value: String){
        Log.d(TAG, "PROPS Screen: $value"  )
        propScreen = value
    }

    @ReactProp(name = "isAdMuted")
    fun setIsMuted(view: FrameLayout, value: Boolean){
      Log.d(TAG, "PROPS isAdMuted: $value"  )
      propIsAdMuted = value
    }
    /**
     * Replace your React Native view with a custom fragment
     */
     
    private fun createFragment(root: FrameLayout?, reactNativeViewId: Int) {
    if (root == null) {
        Log.e(TAG, "createFragment: root FrameLayout is null")
        return
    }
    if (root.id == View.NO_ID) {
        root.id = View.generateViewId()
    }
    setupLayout(root)
    val myFragment = InsideAdReactNativeFragment()
    myFragment.initialize(reactContext, propScreen, propIsAdMuted)
    val activity = reactContext.currentActivity as FragmentActivity
    activity.supportFragmentManager
        .beginTransaction()
        .replace(root.id, myFragment, reactNativeViewId.toString())
        .commit()
}

    private fun setupLayout(view: View) {
        Choreographer.getInstance().postFrameCallback(object: Choreographer.FrameCallback {
            override fun doFrame(frameTimeNanos: Long) {
                manuallyLayoutChildren(view)
                view.viewTreeObserver.dispatchOnGlobalLayout()
                Choreographer.getInstance().postFrameCallback(this)
            }
        })
    }

    /**
     * Layout all children properly
     */
    private fun manuallyLayoutChildren(view: View) {
        // propWidth and propHeight coming from react-native props
        val width = requireNotNull(propWidth)
        val height = requireNotNull(propHeight)

        // view.setBackgroundColor(Color.parseColor("#00000000"))
        view.measure(
            View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
            View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY))

        view.layout(0, 0, width, height)
    }

    companion object {
        private const val REACT_CLASS = "InsideAdViewManager"
        private const val COMMAND_CREATE = 1
    }
}
