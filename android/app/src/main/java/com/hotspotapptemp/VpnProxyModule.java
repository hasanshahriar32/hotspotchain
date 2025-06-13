package com.hotspotapptemp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class VpnProxyModule extends ReactContextBaseJavaModule {
    public VpnProxyModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "VpnProxyModule";
    }

    @ReactMethod
    public void startVpnProxy(Promise promise) {
        // TODO: Implement VPN/proxy start logic
        promise.resolve(true); // Stub: always resolves true
    }

    @ReactMethod
    public void stopVpnProxy(Promise promise) {
        // TODO: Implement VPN/proxy stop logic
        promise.resolve(true); // Stub: always resolves true
    }

    @ReactMethod
    public void getUsageStats(Promise promise) {
        // TODO: Implement usage stats logic
        // Stub: returns 0 bytes sent/received
        com.facebook.react.bridge.WritableMap map = new com.facebook.react.bridge.WritableNativeMap();
        map.putInt("sent", 0);
        map.putInt("received", 0);
        promise.resolve(map);
    }
}
