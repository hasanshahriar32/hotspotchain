import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Button, Text } from 'react-native-paper';
import HotspotModule from '../native/HotspotModule';
import VpnProxyModule from '../native/VpnProxyModule';
import TopRightMenu from '../components/TopRightMenu';

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
      <TopRightMenu />
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Hotspot Sharing (Demo)</Title>
          <Text>Status: {hotspotStatus}</Text>
          <Button mode="contained" icon="wifi" style={styles.button} onPress={handleEnableHotspot}>
            Enable Hotspot
          </Button>
          <Button mode="outlined" icon="wifi-off" style={styles.button} onPress={handleDisableHotspot}>
            Disable Hotspot
          </Button>
          <Text style={styles.vpnStatus}>VPN/Proxy: {vpnRunning ? 'Running' : 'Stopped'}</Text>
          <Button mode="contained" icon="vpn" style={styles.button} onPress={handleStartVpn}>
            Start VPN/Proxy
          </Button>
          <Button mode="outlined" icon="vpn-off" style={styles.button} onPress={handleStopVpn}>
            Stop VPN/Proxy
          </Button>
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
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default ShareHotspotScreen;
