# HotspotApp Requirements Document

## 1. Project Overview

A pure React Native Android application (no Expo) for token-based hotspot sharing, with Clerk authentication. The app enables users to share and receive hotspots, tracks usage via a VPN/proxy mechanism, and simulates token flow between users.

## 2. Features

- **Authentication**: Firebase Auth integration for user sign-in/sign-up.
- **Hotspot Sharing**: Enable/disable Android hotspot from the app (native module).
- **Hotspot Receiving**: Connect to WiFi hotspot and monitor usage.
- **VPN/Proxy Service**: Use Android VpnService (native module) to intercept and measure network usage for both sharer and receiver.
- **Token Simulation**: Simulate token flow based on usage (demo only).
- **UI/UX**: Simple screens for login, home, sharing/receiving status, and usage stats.

## 3. Technical Requirements

- **React Native CLI** (not Expo)
- **TypeScript**
- **Android only**
- **Firebase Auth** for authentication
- **Custom Native Modules**:
  - Hotspot control (enable/disable)
  - VPN/proxy service (start/stop, usage stats)
- **Permissions**:
  - ACCESS_WIFI_STATE
  - CHANGE_WIFI_STATE
  - ACCESS_NETWORK_STATE
  - INTERNET
  - ACCESS_FINE_LOCATION
  - CHANGE_NETWORK_STATE
  - FOREGROUND_SERVICE
- **Demo/Simulation**: UI to show simulated token flow and usage stats

## 4. Workflow Log

- [2025-06-13] Initialized requirements document.
- [2025-06-13] Issue: React Native CLI doesn't allow initializing directly in current directory with "."
- [2025-06-13] Solution: Initialize in temp folder, then move files to current directory
- [2025-06-13] Next: Initialize React Native project with TypeScript template.
- [2025-06-13] Issue: Clerk does not support pure React Native CLI (only Expo or web)
- [2025-06-13] Solution: Switch authentication provider to Firebase Auth (pure React Native supported)
- [2025-06-13] Next: Integrate Firebase Auth for authentication (sign-in/sign-up) in React Native CLI project.
- [2025-06-13] App running on Android device/emulator.
- [2025-06-13] Global routing system implemented with navigation/AppNavigator.tsx.
- [2025-06-13] Main app screens scaffolded: Home, ShareHotspot, ReceiveHotspot, UsageStats.
- [2025-06-13] Next: Plan and document Android native modules for hotspot control and VPN/proxy usage tracking, and UI for simulated token flow.
- [2025-06-13] TypeScript interfaces and stubs created for HotspotModule and VpnProxyModule in native/ directory.
- [2025-06-13] Next: Integrate these modules into the ShareHotspot and ReceiveHotspot screens, and prepare for native Android implementation.
- [2025-06-13] UsageStats component and UsageStatsScreen created for modular usage stats and token simulation UI.
- [2025-06-13] AppNavigator updated to use UsageStatsScreen for UsageStats route.
- [2025-06-13] Next: Prepare for native Android implementation of HotspotModule and VpnProxyModule.
- [2025-06-13] Project structure refactored: all screens in screens/, navigation centralized in navigation/AppNavigator.tsx, unused imports removed.
- [2025-06-13] Next: Plan Android native implementation for HotspotModule and VpnProxyModule (Java/Kotlin, permissions, integration).
- [2025-06-13] Native code stubs created: HotspotModule.java, VpnProxyModule.java, HotspotVpnPackage.java.
- [2025-06-13] HotspotVpnPackage registered in MainApplication.kt for React Native integration.
- [2025-06-13] Next: Test React Native UI with native stubs and verify integration.

## 5. Native Module & System Integration Plan

### Hotspot Control (Android Native Module)

- Use Android's WifiManager and ConnectivityManager APIs to enable/disable hotspot programmatically (requires custom Java/Kotlin module).
- Permissions: CHANGE_WIFI_STATE, ACCESS_WIFI_STATE, CHANGE_NETWORK_STATE, INTERNET, and possibly WRITE_SETTINGS (for some Android versions).
- Expose methods to React Native:
  - enableHotspot(ssid, password)
  - disableHotspot()
  - getHotspotStatus()

### VPN/Proxy Service (Android Native Module)

- Use Android's VpnService API to create a local VPN for traffic monitoring and control.
- Permissions: BIND_VPN_SERVICE, FOREGROUND_SERVICE, INTERNET.
- Expose methods to React Native:
  - startVpnProxy()
  - stopVpnProxy()
  - getUsageStats()
- The VPN service will be used by both sharer and receiver to monitor and simulate data/token flow.

## 6. Android Native Implementation Plan

### HotspotModule (Java/Kotlin)

- Create a new Java/Kotlin class `HotspotModule` in `android/app/src/main/java/com/hotspotapptemp/`.
- Extend `ReactContextBaseJavaModule` and implement methods:
  - `enableHotspot(ssid, password)`
  - `disableHotspot()`
  - `getHotspotStatus()`
- Use `WifiManager` and `ConnectivityManager` for hotspot control.
- Handle runtime permissions and Android version compatibility.
- Export methods to React Native via `@ReactMethod`.

### VpnProxyModule (Java/Kotlin)

- Create a new Java/Kotlin class `VpnProxyModule` in `android/app/src/main/java/com/hotspotapptemp/`.
- Extend `ReactContextBaseJavaModule` and implement methods:
  - `startVpnProxy()`
  - `stopVpnProxy()`
  - `getUsageStats()`
- Use Android's `VpnService` to create a local VPN for traffic monitoring.
- Track sent/received bytes for usage stats.
- Export methods to React Native via `@ReactMethod`.

### Integration Steps

- Register both modules in the app's package.
- Ensure all required permissions are declared in `AndroidManifest.xml`.
- Test stub methods with React Native UI before implementing full logic.

---

This document will be updated as the workflow progresses and requirements evolve.
