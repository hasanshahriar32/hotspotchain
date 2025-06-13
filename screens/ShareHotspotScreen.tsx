import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import HotspotModule from '../native/HotspotModule';
import VpnProxyModule from '../native/VpnProxyModule';

const ShareHotspotScreen = () => {
  const [hotspotStatus, setHotspotStatus] = useState<string>('UNKNOWN');
  const [vpnRunning, setVpnRunning] = useState(false);

  const handleEnableHotspot = async () => {
    try {
      const result = await HotspotModule.enableHotspot('HotspotApp', 'password123');
      if (result) setHotspotStatus('ENABLED');
    } catch {
      setHotspotStatus('UNKNOWN');
    }
  };
  const handleDisableHotspot = async () => {
    try {
      const result = await HotspotModule.disableHotspot();
      if (result) setHotspotStatus('DISABLED');
    } catch {
      setHotspotStatus('UNKNOWN');
    }
  };
  const handleStartVpn = async () => {
    try {
      const result = await VpnProxyModule.startVpnProxy();
      setVpnRunning(result);
    } catch {
      setVpnRunning(false);
    }
  };
  const handleStopVpn = async () => {
    try {
      const result = await VpnProxyModule.stopVpnProxy();
      setVpnRunning(!result);
    } catch {
      setVpnRunning(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotspot Sharing (Demo)</Text>
      <Text>Status: {hotspotStatus}</Text>
      <Button title="Enable Hotspot" onPress={handleEnableHotspot} />
      <Button title="Disable Hotspot" onPress={handleDisableHotspot} />
      <Text>VPN/Proxy: {vpnRunning ? 'Running' : 'Stopped'}</Text>
      <Button title="Start VPN/Proxy" onPress={handleStartVpn} />
      <Button title="Stop VPN/Proxy" onPress={handleStopVpn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default ShareHotspotScreen;
