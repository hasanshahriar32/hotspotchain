import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import LoginScreen from '../LoginScreen';
import { View, StyleSheet, Text, Button } from 'react-native';

const Stack = createNativeStackNavigator();

const HomeScreen = () => (
  <View style={styles.container}>
    <Text>Welcome to HotspotApp!</Text>
    <Button title="Sign Out" onPress={() => auth().signOut()} />
  </View>
);

const AppNavigator = () => {
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default AppNavigator;
