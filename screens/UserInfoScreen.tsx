import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

const UserInfoScreen = ({ navigation: _navigation }: { navigation: any }) => {
  const user = auth().currentUser;

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No user is logged in.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Info</Text>
      <Text>Email: {user.email}</Text>
      <Text>UID: {user.uid}</Text>
      {user.displayName && <Text>Name: {user.displayName}</Text>}
      {user.phoneNumber && <Text>Phone: {user.phoneNumber}</Text>}
      <Button title="Back to Home" onPress={() => _navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
});

export default UserInfoScreen;
