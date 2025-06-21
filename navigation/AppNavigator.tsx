import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import HomeScreen from '../screens/HomeScreen';
import ShareHotspotScreen from '../screens/ShareHotspotScreen';
import ReceiveHotspotScreen from '../screens/ReceiveHotspotScreen';
import UsageStatsScreen from '../screens/UsageStatsScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import { Appbar } from 'react-native-paper';
import TopRightMenu from '../components/TopRightMenu';

const Stack = createNativeStackNavigator();

const customHeaders = {
  Home: () => <Appbar.Header><Appbar.Content title="Home" /><TopRightMenu /></Appbar.Header>,
  ShareHotspot: () => <Appbar.Header><Appbar.Content title="Share Hotspot" /><TopRightMenu /></Appbar.Header>,
  ReceiveHotspot: () => <Appbar.Header><Appbar.Content title="Receive Hotspot" /><TopRightMenu /></Appbar.Header>,
  UsageStats: () => <Appbar.Header><Appbar.Content title="Usage Stats" /><TopRightMenu /></Appbar.Header>,
  UserInfo: () => <Appbar.Header><Appbar.Content title="User Info" /><TopRightMenu /></Appbar.Header>,
};

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
          <Stack.Screen name="Home" component={HomeScreen} options={{ header: customHeaders.Home }} />
          <Stack.Screen name="ShareHotspot" component={ShareHotspotScreen} options={{ header: customHeaders.ShareHotspot }} />
          <Stack.Screen name="ReceiveHotspot" component={ReceiveHotspotScreen} options={{ header: customHeaders.ReceiveHotspot }} />
          <Stack.Screen name="UsageStats" component={UsageStatsScreen} options={{ header: customHeaders.UsageStats }} />
          <Stack.Screen name="UserInfo" component={UserInfoScreen} options={{ header: customHeaders.UserInfo }} />
        </>
      ) : (
        <Stack.Screen name="Login" getComponent={() => require('../LoginScreen').default} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
