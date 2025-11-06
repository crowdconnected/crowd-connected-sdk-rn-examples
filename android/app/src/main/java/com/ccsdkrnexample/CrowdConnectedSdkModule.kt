    package com.ccsdkrnexample

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import net.crowdconnected.android.background.BackgroundModule
import net.crowdconnected.android.core.ConfigurationBuilder
import net.crowdconnected.android.core.CrowdConnected
import net.crowdconnected.android.core.StatusCallback
import net.crowdconnected.android.geo.GeoModule
import net.crowdconnected.android.ips.IPSModule

class CrowdConnectedSdkModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "CrowdConnectedSdkModule"

    private fun sendEvent(eventName: String, params: WritableMap?) {
        try {
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
        } catch (e: Exception) {
            // no-op if emission fails
        }
    }

    @ReactMethod
    fun getVersion(promise: Promise) {
        try {
            promise.resolve(CrowdConnected.getLibraryVersion())
        } catch (e: Exception) {
            promise.reject("E_GET_VERSION", e)
        }
    }

    @ReactMethod
    fun getDeviceId(promise: Promise) {
        try {
            promise.resolve(CrowdConnected.getInstance()?.deviceId)
        } catch (e: Exception) {
            promise.reject("E_GET_DEVICE_ID", e)
        }
    }

    @ReactMethod
    fun start(settingsMap: ReadableMap?) {
        try {
            settingsMap?.let {
                var ips = false
                var geo = false
                var bluetooth = false
                var background = false
                var appKey: String? = null
                var token: String? = null
                var secret: String? = null
                if (it.hasKey("ips")) ips = it.getBoolean("ips")
                if (it.hasKey("geo")) geo = it.getBoolean("geo")
                if (it.hasKey("bluetooth")) bluetooth = it.getBoolean("bluetooth")
                if (it.hasKey("background")) background = it.getBoolean("background")
                if (it.hasKey("appKey")) appKey = it.getString("appKey")
                if (it.hasKey("token")) token = it.getString("token")
                if (it.hasKey("secret")) secret = it.getString("secret")

                if (appKey.isNullOrEmpty() || token.isNullOrEmpty() || secret.isNullOrEmpty()) {
                    sendEvent(
                        "CrowdConnectedSdkStartUpFailure",
                        Arguments.createMap()
                            .apply { putString("reason", "Missing required parameters") })
                }

                if (!ips && !geo) {
                    sendEvent(
                        "CrowdConnectedSdkStartUpFailure",
                        Arguments.createMap()
                            .apply { putString("reason", "IPS or GEO must be enabled") })
                }
                val configurationBuilder = ConfigurationBuilder()
                    .withAppKey(appKey)
                    .withToken(token)
                    .withSecret(secret)
                    .withStatusCallback(object : StatusCallback {
                        override fun onStartUpFailure(reason: String?) {
                            sendEvent(
                                "CrowdConnectedSdkStartUpFailure",
                                Arguments.createMap().apply { putString("reason", reason) })
                        }

                        override fun onStartUpSuccess() {
                            sendEvent("CrowdConnectedSdkStartUpSuccess", null)
                            CrowdConnected.getInstance()?.registerPositionCallback { location ->
                                val params = Arguments.createMap().apply {
                                    putDouble("xMetres", location.xMetres)
                                    putDouble("yMetres", location.yMetres)
                                    putDouble("latitude", location.latitude)
                                    putDouble("longitude", location.longitude)
                                    putDouble("xPixels", location.xPixels)
                                    putDouble("yPixels", location.yPixels)
                                    putDouble("timestamp", location.timestamp.toDouble())
                                    location.surfaceId?.let { putString("surfaceId", it) }
                                    location.floor?.let { putInt("floor", it) }
                                    location.locationType?.let { putString("locationType", it.toString()) }
                                    location.quality?.let { putInt("quality", it) }
                                }
                                sendEvent("CrowdConnectedSdkLocationUpdated", params)
                            }
                        }

                        override fun onRuntimeError(reason: String?) {
                            sendEvent(
                                "CrowdConnectedSdkRuntimeError",
                                Arguments.createMap().apply { putString("reason", reason) })
                        }
                    })

                if (ips) {
                    configurationBuilder.addModule(IPSModule())
                }
                if (geo) {
                    configurationBuilder.addModule(GeoModule())
                }
                if (background) {
                    // Consider how to best get the drawable resource if not hardcoding
                    // R.drawable.ic_launcher_foreground. Maybe pass it in or use a context.
                    configurationBuilder.withServiceNotificationInfo(
                        "Service Notification Text", // You might want to make this configurable
                        com.facebook.react.R.drawable.ic_resume // This R import might need adjustment based on file location
                    )
                    configurationBuilder.addModule(BackgroundModule())
                }
                CrowdConnected.start(
                    MainApplication.application,
                    configurationBuilder.build()
                )
            }
        } catch (e: Exception) {
            // best-effort: emit error event
            sendEvent(
                "CrowdConnectedSdkRuntimeError",
                Arguments.createMap().apply { putString("reason", e.message) })
        }
    }

    @ReactMethod
    fun stop() {
        CrowdConnected.getInstance()?.deregisterPositionCallback()
        CrowdConnected.getInstance()?.stop()
    }

    @ReactMethod
    fun setAlias(aliasKey: String, aliasValue: String) {
        CrowdConnected.getInstance()?.setAlias(aliasKey, aliasValue)
    }
}
