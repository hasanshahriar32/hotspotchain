import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface UsageStatsProps {
  sent: number;
  received: number;
  tokensTransferred: number;
}

const UsageStats: React.FC<UsageStatsProps> = ({ sent, received, tokensTransferred }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Usage & Token Flow (Demo)</Text>
    <Text>Sent: {sent} bytes</Text>
    <Text>Received: {received} bytes</Text>
    <Text>Tokens Transferred: {tokensTransferred}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
  },
});

export default UsageStats;
