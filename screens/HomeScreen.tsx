import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import TopRightMenu from '../components/TopRightMenu';

const HomeScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <TopRightMenu />
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Welcome to HotspotApp!</Title>
        <Button mode="contained" icon="wifi" style={styles.button} onPress={() => navigation.navigate('ShareHotspot')}>
          Share Hotspot
        </Button>
        <Button mode="contained" icon="wifi-strength-2" style={styles.button} onPress={() => navigation.navigate('ReceiveHotspot')}>
          Receive Hotspot
        </Button>
        <Button mode="contained" icon="chart-bar" style={styles.button} onPress={() => navigation.navigate('UsageStats')}>
          Usage Stats
        </Button>
        <Button mode="outlined" icon="logout" style={styles.button} onPress={() => auth().signOut()}>
          Sign Out
        </Button>
      </Card.Content>
    </Card>
  </View>
);

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
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginVertical: 8,
  },
});

export default HomeScreen;
