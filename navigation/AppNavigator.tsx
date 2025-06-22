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

const headerTitles: Record<string, string> = {
  Home: 'Home',
  ShareHotspot: 'Share Hotspot',
  ReceiveHotspot: 'Receive Hotspot',
  UsageStats: 'Usage Stats',
  UserInfo: 'User Info',
};

function CustomHeader({ title }: { title: string }) {
  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
      <TopRightMenu />
    </Appbar.Header>
  );
}

const screenOptions = (route: any) => ({
  header: () => <CustomHeader title={headerTitles[route.name] || ''} />,
});

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
          <Stack.Screen name="Home" component={HomeScreen} options={screenOptions({ name: 'Home' })} />
          <Stack.Screen name="ShareHotspot" component={ShareHotspotScreen} options={screenOptions({ name: 'ShareHotspot' })} />
          <Stack.Screen name="ReceiveHotspot" component={ReceiveHotspotScreen} options={screenOptions({ name: 'ReceiveHotspot' })} />
          <Stack.Screen name="UsageStats" component={UsageStatsScreen} options={screenOptions({ name: 'UsageStats' })} />
          <Stack.Screen name="UserInfo" component={UserInfoScreen} options={screenOptions({ name: 'UserInfo' })} />
        </>
      ) : (
        <Stack.Screen name="Login" getComponent={() => require('../LoginScreen').default} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
