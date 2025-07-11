import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import UsageStats from '../components/UsageStats';
import VpnProxyModule from '../native/VpnProxyModule';

const UsageStatsScreen = () => {
  const [usage, setUsage] = useState<{ sent: number; received: number }>({ sent: 0, received: 0 });
  const [tokens, setTokens] = useState(0);

  const handleSimulateUsage = async () => {
    // Simulate usage and token flow
    try {
      const stats = await VpnProxyModule.getUsageStats();
      setUsage(stats);
      // Simulate token transfer: 1 token per 1000 bytes sent
      setTokens(Math.floor(stats.sent / 1000));
    } catch {
      setUsage({ sent: 0, received: 0 });
      setTokens(0);
    }
  };

  return (
    <View style={styles.container}>
      <UsageStats sent={usage.sent} received={usage.received} tokensTransferred={tokens} />
      <Button mode="contained" icon="refresh" onPress={handleSimulateUsage} style={styles.button}>
        Simulate Usage & Token Flow
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
  button: {
    marginTop: 16,
    width: '100%',
  },
});

export default UsageStatsScreen;
