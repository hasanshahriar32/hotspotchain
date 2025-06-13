import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to HotspotApp!</Text>
    <Button title="Share Hotspot" onPress={() => navigation.navigate('ShareHotspot')} />
    <Button title="Receive Hotspot" onPress={() => navigation.navigate('ReceiveHotspot')} />
    <Button title="Usage Stats" onPress={() => navigation.navigate('UsageStats')} />
    <Button title="Sign Out" onPress={() => auth().signOut()} />
  </View>
);

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

export default HomeScreen;
