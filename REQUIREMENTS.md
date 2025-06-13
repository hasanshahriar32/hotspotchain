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

---

This document will be updated as the workflow progresses and requirements evolve.
