import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import HomeScreen from '../screens/HomeScreen';
import ShareHotspotScreen from '../screens/ShareHotspotScreen';
import ReceiveHotspotScreen from '../screens/ReceiveHotspotScreen';
import UsageStatsScreen from '../screens/UsageStatsScreen';
import UserInfoScreen from '../screens/UserInfoScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ShareHotspot" component={ShareHotspotScreen} />
          <Stack.Screen name="ReceiveHotspot" component={ReceiveHotspotScreen} />
          <Stack.Screen name="UsageStats" component={UsageStatsScreen} />
          <Stack.Screen name="UserInfo" component={UserInfoScreen} options={{ title: "User Info" }} />
        </>
      ) : (
        <Stack.Screen name="Login" getComponent={() => require('../LoginScreen').default} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
