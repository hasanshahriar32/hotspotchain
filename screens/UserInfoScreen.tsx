import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Text, Button, Avatar } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import TopRightMenu from '../components/TopRightMenu';

const LeftIcon = (props: any) => <Avatar.Icon {...props} icon="account" />;

const UserInfoScreen = ({ navigation }: { navigation: any }) => {
  const user = auth().currentUser;

  if (!user) {
    return (
      <View style={styles.container}>
        <TopRightMenu />
        <Card style={styles.card}>
          <Card.Content>
            <Text>No user is logged in.</Text>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopRightMenu />
      <Card style={styles.card}>
        <Card.Title title="User Info" left={LeftIcon} />
        <Card.Content>
          <Title style={styles.title}>{user.displayName || 'User'}</Title>
          <Text>Email: {user.email}</Text>
          <Text>UID: {user.uid}</Text>
          {user.phoneNumber && <Text>Phone: {user.phoneNumber}</Text>}
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate('Home')}>Back to Home</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#f6f6f6' },
  card: { width: '100%', padding: 16, borderRadius: 16, elevation: 4 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
});

export default UserInfoScreen;
