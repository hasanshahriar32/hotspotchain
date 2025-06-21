import * as React from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  UserInfo: undefined;
  // add other routes here if needed
};

const TopRightMenu: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [visible, setVisible] = React.useState(false);

  return (
    <Appbar.Header>
      <Appbar.Content title="HotspotApp" />
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={<Appbar.Action icon="account-circle" color="white" onPress={() => setVisible(true)} />}>
        <Menu.Item onPress={() => { setVisible(false); navigation.navigate('UserInfo'); }} title="Profile" />
      </Menu>
    </Appbar.Header>
  );
};

export default TopRightMenu;
