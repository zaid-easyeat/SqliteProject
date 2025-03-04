import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';
import {createTable, insertUser, getUsers, deleteUser} from '../../db';

const HomeScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    createTable();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const userList = await getUsers();
    setUsers(userList);
  };

  const addUser = async () => {
    if (name && age) {
      await insertUser(name, parseInt(age));
      setName('');
      setAge('');
      fetchUsers();
    }
  };

  const removeUser = async id => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>SQLite User List</Text>
      <TextInput
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
        style={{borderBottomWidth: 1, marginBottom: 10}}
      />
      <TextInput
        placeholder="Enter Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={{borderBottomWidth: 1, marginBottom: 10}}
      />
      <Button title="Add User" onPress={addUser} />

      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text>
              {item.name} - {item.age} years
            </Text>
            <Button title="Delete" onPress={() => removeUser(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
