import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';

export default function App() {
  const [Contact, setContact] = useState({});

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      if (data.length > 0) {
        setContact(data);
      }
    }
  }

  return (
    <View style={styles.container} >
      <Button title="Get contacts" onPress={getContacts} />
      <View>
        <FlatList
          data={Contact}
          renderItem={({ item }) =>
          <Text>{item.name} {item.phoneNumbers[0].number}</Text>
      } 
      />
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
});