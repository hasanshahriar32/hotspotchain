import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import VpnProxyModule from '../native/VpnProxyModule';

const ReceiveHotspotScreen = () => {
  const [vpnRunning, setVpnRunning] = useState(false);
  const [usage, setUsage] = useState<{ sent: number; received: number }>({ sent: 0, received: 0 });

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
  const handleGetUsage = async () => {
    try {
      const stats = await VpnProxyModule.getUsageStats();
      setUsage(stats);
    } catch {
      setUsage({ sent: 0, received: 0 });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotspot Receiving (Demo)</Text>
      <Text>VPN/Proxy: {vpnRunning ? 'Running' : 'Stopped'}</Text>
      <Button title="Start VPN/Proxy" onPress={handleStartVpn} />
      <Button title="Stop VPN/Proxy" onPress={handleStopVpn} />
      <Button title="Get Usage Stats" onPress={handleGetUsage} />
      <Text>Sent: {usage.sent} bytes</Text>
      <Text>Received: {usage.received} bytes</Text>
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

export default ReceiveHotspotScreen;
