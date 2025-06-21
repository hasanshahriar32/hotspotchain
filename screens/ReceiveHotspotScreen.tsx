import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Button, Text } from 'react-native-paper';
import VpnProxyModule from '../native/VpnProxyModule';
import TopRightMenu from '../components/TopRightMenu';

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
      <TopRightMenu />
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Hotspot Receiving (Demo)</Title>
          <Text style={styles.vpnStatus}>VPN/Proxy: {vpnRunning ? 'Running' : 'Stopped'}</Text>
          <Button mode="contained" icon="vpn" style={styles.button} onPress={handleStartVpn}>
            Start VPN/Proxy
          </Button>
          <Button mode="outlined" icon="vpn-off" style={styles.button} onPress={handleStopVpn}>
            Stop VPN/Proxy
          </Button>
          <Button mode="contained" icon="chart-bar" style={styles.button} onPress={handleGetUsage}>
            Get Usage Stats
          </Button>
          <Text style={styles.usageText}>Sent: {usage.sent} bytes</Text>
          <Text style={styles.usageText}>Received: {usage.received} bytes</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    padding: 16,
    borderRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginVertical: 8,
  },
  vpnStatus: {
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
  },
  usageText: {
    marginTop: 4,
    textAlign: 'center',
  },
});

export default ReceiveHotspotScreen;
